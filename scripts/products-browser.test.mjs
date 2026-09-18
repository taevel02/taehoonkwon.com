import assert from "node:assert/strict";
import test from "node:test";

// Run after starting the built Remix server and Chrome with --remote-debugging-port=9222.
// Override the defaults with PRODUCTS_TEST_SITE and PRODUCTS_TEST_CDP.

const site = process.env.PRODUCTS_TEST_SITE || "http://127.0.0.1:3217";
const cdp = process.env.PRODUCTS_TEST_CDP || "http://127.0.0.1:9222";

async function connect() {
  const targets = await (await fetch(`${cdp}/json`)).json();
  const target = targets.find((item) => item.type === "page");
  assert.ok(target, "Chrome DevTools page target is required");
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });
  let nextId = 0;
  const pending = new Map();
  socket.addEventListener("message", ({ data }) => {
    const message = JSON.parse(data);
    if (!message.id || !pending.has(message.id)) return;
    pending.get(message.id)(message);
    pending.delete(message.id);
  });
  const send = (method, params = {}) => {
    const id = ++nextId;
    const result = new Promise((resolve) => pending.set(id, resolve));
    socket.send(JSON.stringify({ id, method, params }));
    return result;
  };
  const evaluate = async (expression) => {
    const response = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    assert.equal(response.result?.exceptionDetails, undefined, JSON.stringify(response.result?.exceptionDetails));
    return response.result?.result?.value;
  };
  return { send, evaluate, close: () => socket.close() };
}

async function waitFor(check, message) {
  for (let attempt = 0; attempt < 40; attempt++) {
    if (await check()) return;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  assert.fail(message);
}

async function press({ send, evaluate }, text) {
  const rect = await evaluate(`(() => {
    const button = [...document.querySelectorAll("button,a")].find((element) => element.textContent?.trim() === ${JSON.stringify(text)} && element.getBoundingClientRect().width > 0);
    if (!button) return null;
    button.scrollIntoView({ block: "center" });
    const box = button.getBoundingClientRect();
    return { x: box.left + box.width / 2, y: box.top + box.height / 2, hit: document.elementFromPoint(box.left + box.width / 2, box.top + box.height / 2)?.textContent?.trim(), viewport: [innerWidth, innerHeight] };
  })()`);
  assert.ok(rect, `button ${text} must exist`);
  assert.equal(rect.hit, text, `pointer for ${text} landed on ${rect.hit} in ${rect.viewport}`);
  await send("Input.dispatchMouseEvent", { type: "mousePressed", x: rect.x, y: rect.y, button: "left", clickCount: 1 });
  await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: rect.x, y: rect.y, button: "left", clickCount: 1 });
}

test("products navigation, About, and font command", async () => {
  const browser = await connect();
  const { send, evaluate } = browser;
  try {
    await send("Page.enable");
    await send("Emulation.setDeviceMetricsOverride", { width: 375, height: 812, deviceScaleFactor: 1, mobile: true });
    await send("Page.navigate", { url: `${site}/en/products/font/yeomil-mono` });
    await waitFor(async () => (await evaluate("document.querySelector('h1')?.textContent")) === "Yeomil Mono", "font page did not load");

    await new Promise((resolve) => setTimeout(resolve, 800));
    await press(browser, "EN");
    assert.equal(await evaluate("location.pathname"), "/en/products/font/yeomil-mono", "selecting the active language must not toggle");
    await press(browser, "KO");
    await waitFor(async () => (await evaluate("location.pathname")) === "/products/font/yeomil-mono" && (await evaluate("document.documentElement.lang")) === "ko", `KO navigation failed: ${await evaluate("location.pathname")}`);
    await press(browser, "EN");
    await waitFor(async () => (await evaluate("location.pathname")) === "/en/products/font/yeomil-mono" && (await evaluate("document.documentElement.lang")) === "en", "EN navigation failed");

    await waitFor(async () => (await evaluate("!!document.querySelector(\"summary\") && [...document.querySelectorAll(\"a\")].some(x => x.textContent?.trim() === \"Taehoon Kwon\")")) === true, "mobile header did not load");
    const header = await evaluate(`(() => {
      const brand = [...document.querySelectorAll("a")].find(x => x.textContent?.trim() === "Taehoon Kwon");
      const locale = [...document.querySelectorAll("[role=group]")].find(x => x.getBoundingClientRect().width > 0);
      const menu = document.querySelector("summary");
      return { brandRight: brand.getBoundingClientRect().right, localeLeft: locale.getBoundingClientRect().left, localeRight: locale.getBoundingClientRect().right, menuLeft: menu.getBoundingClientRect().left, pageWidth: document.documentElement.scrollWidth, viewport: innerWidth };
    })()`);
    assert.ok(header.brandRight < header.localeLeft && header.localeRight < header.menuLeft, "mobile header controls overlap");
    assert.equal(header.pageWidth, header.viewport, "mobile header overflows");

    await send("Page.navigate", { url: `${site}/en/about` });
    await waitFor(async () => (await evaluate("document.querySelector('h1')?.textContent")) === "Taehoon (Theo) Kwon", "About page did not load");
    await send("Page.navigate", { url: `${site}/en` });
    await waitFor(async () => (await evaluate("document.querySelector('h1')?.textContent")) === "Taehoon Kwon", "home page did not load");

    await send("Page.navigate", { url: `${site}/en/products/font/yeomil-mono` });
    await waitFor(async () => (await evaluate("document.querySelector('h1')?.textContent")) === "Yeomil Mono", "font page did not reload");
    await new Promise((resolve) => setTimeout(resolve, 800));
    await send("Browser.grantPermissions", { origin: site, permissions: ["clipboardReadWrite", "clipboardSanitizedWrite"] });
    await press(browser, "Copy command");
    await waitFor(async () => (await evaluate("[...document.querySelectorAll('button')].some(x => x.textContent?.trim() === 'Copied')")) === true, `copy did not report success: ${JSON.stringify(await evaluate("({buttons:[...document.querySelectorAll(\"button\")].map(x=>x.textContent?.trim()),status:document.querySelector(\"[role=status]\")?.textContent,secure:isSecureContext})"))}`);
    assert.equal(await evaluate("navigator.clipboard.readText()"), "curl -fsSL https://raw.githubusercontent.com/taevel02/yeomil-mono/main/install.sh | bash", "clipboard contents");
    assert.equal(await evaluate("document.documentElement.scrollWidth <= innerWidth"), true, "mobile horizontal overflow");
  } finally {
    browser.close();
  }
});

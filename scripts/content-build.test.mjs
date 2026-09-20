import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function markdownFiles(directory) {
  return (await readdir(directory, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => path.join(directory, entry.name));
}

test("Korean article collections contain valid frontmatter", async () => {
  const collections = [
    path.join(projectRoot, "articles/archives/ko"),
    path.join(projectRoot, "articles/scuba/ko"),
  ];
  for (const directory of collections) {
    const files = await markdownFiles(directory);
    assert.ok(files.length > 0, `${directory} must contain articles`);
    const source = await readFile(files[0], "utf8");
    assert.match(source, /^---\n[\s\S]*?^id:\s*.+$/m);
    assert.match(source, /^title:\s*.+$/m);
    assert.match(source, /^date:\s*.+$/m);
    assert.match(source, /^category:\s*.+$/m);
  }
});

test("site surfaces keep the shared publishing behavior", async () => {
  const productPage = await readFile(path.join(projectRoot, "src/pages/products/[type]/[slug].astro"), "utf8");
  assert.match(productPage, /code\.textContent = "복사됨"/);
  assert.doesNotMatch(productPage, /id="copy-status"/);

  const archivesPage = await readFile(path.join(projectRoot, "src/pages/archives/index.astro"), "utf8");
  const scubaPage = await readFile(path.join(projectRoot, "src/pages/scuba/index.astro"), "utf8");
  assert.match(archivesPage, /CategoryFilter/);
  assert.match(scubaPage, /CategoryFilter/);

  const homePage = await readFile(path.join(projectRoot, "src/pages/index.astro"), "utf8");
  assert.match(homePage, /바다를 곁에 두고/);
  assert.match(homePage, /aria-hidden="true"/);

  const layout = await readFile(path.join(projectRoot, "src/layouts/BaseLayout.astro"), "utf8");
  assert.match(layout, /katex\/dist\/katex\.min\.css/);
});

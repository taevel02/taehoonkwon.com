import { useState } from "react";

export function YeomilSpecimen({ lang }: { lang: "ko" | "en" }) {
  const [sample, setSample] = useState("");
  const [size, setSize] = useState(28);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const command = "curl -fsSL https://raw.githubusercontent.com/taevel02/yeomil-mono/main/install.sh | bash";
  const display = sample || (lang === "ko" ? "한글과 English, 0123456789" : "English and 한글, 0123456789");

  async function copyCommand() {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(command);
      setCopyStatus("copied");
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = command;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      try {
        textArea.select();
        setCopyStatus(document.execCommand("copy") ? "copied" : "failed");
      } catch {
        setCopyStatus("failed");
      } finally {
        textArea.remove();
      }
    }
  }

  return (
    <div className="space-y-10">
      <section aria-labelledby="specimen-title" className="border-t pt-8">
        <h2 id="specimen-title" className="mb-4 text-xl font-medium">
          {lang === "ko" ? "서체 체험" : "Try the font"}
        </h2>
        <div className="border rounded-md overflow-hidden">
          <div className="flex flex-col gap-4 border-b bg-muted/40 p-4 sm:flex-row sm:items-center">
            <label className="flex-1">
              <span className="sr-only">{lang === "ko" ? "미리보기 문장" : "Preview text"}</span>
              <input
                className="w-full bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-primary"
                value={sample}
                onChange={(event) => setSample(event.target.value)}
                placeholder={lang === "ko" ? "미리 볼 문장을 입력하세요" : "Type to preview the font"}
              />
            </label>
            <label className="flex items-center gap-3 text-sm">
              <span>{lang === "ko" ? "크기" : "Size"}</span>
              <input type="range" min="16" max="72" value={size} onChange={(event) => setSize(Number(event.target.value))} className="w-28 accent-primary" />
              <output className="w-11 text-right tabular-nums">{size}px</output>
            </label>
          </div>
          <div className="space-y-6 p-4 sm:p-6">
            {([300, 400, 700] as const).map((weight) => (
              <div key={weight}>
                <p className="mb-2 text-xs text-muted-foreground">{weight === 300 ? "Light" : weight === 400 ? "Regular" : "Bold"} · {weight}</p>
                <p style={{ fontFamily: "'Yeomil Mono', monospace", fontWeight: weight, fontSize: size, lineHeight: 1.45 }} className="break-all">{display}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section aria-labelledby="install-title" className="border-t pt-8">
        <h2 id="install-title" className="mb-4 text-xl font-medium">{lang === "ko" ? "설치" : "Install"}</h2>
        <p className="mb-3 text-sm text-muted-foreground">{lang === "ko" ? "macOS·Linux 설치 명령" : "macOS and Linux install command"}</p>
        <div className="flex flex-col gap-3 rounded-md border bg-muted/40 p-4 sm:flex-row sm:items-center">
          <code className="min-w-0 flex-1 overflow-x-auto text-xs sm:text-sm">{command}</code>
          <button type="button" onClick={copyCommand} className="min-h-11 shrink-0 rounded-md border px-4 text-sm active:scale-[.97] focus-visible:ring-2 focus-visible:ring-primary">
            {copyStatus === "copied" ? (lang === "ko" ? "복사됨" : "Copied") : (lang === "ko" ? "명령 복사" : "Copy command")}
          </button>
        </div>
        <p role="status" aria-live="polite" className="mt-2 text-sm">
          {copyStatus === "failed" ? (lang === "ko" ? "복사할 수 없습니다. 명령을 직접 선택해 복사하세요." : "Copy failed. Select the command and copy it manually.") : ""}
        </p>
      </section>
    </div>
  );
}

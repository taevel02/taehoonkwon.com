import React, { useState } from "react";
import { LoaderFunctionArgs, MetaFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { RiTerminalBoxLine, RiDownloadLine, RiFileCopyLine, RiCheckLine, RiGithubFill, RiRefreshLine } from "@remixicon/react";
import blogConfig from "blog.config";

import { getLanguage, getLocalizedPath } from "~/utils/i18n";
import { generateMeta } from "~/utils/seo";
import { pathJoin } from "~/utils/string";

interface Translations {
  title: string;
  tagline: string;
  badgeTerminal: string;
  badgeUnified: string;
  badgeOfl: string;
  introText: string;
  featureTitle: string;
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;
  playgroundTitle: string;
  playgroundSubtitle: string;
  playgroundPlaceholder: string;
  controlSize: string;
  controlWeight: string;
  controlLineHeight: string;
  controlTextInputPlaceholder: string;
  alignDemoTitle: string;
  alignDemoDesc: string;
  installTitle: string;
  installCurl: string;
  installManual: string;
  installManualDesc: string;
  downloadZip: string;
  githubRepo: string;
  copied: string;
  reset: string;
}

const translations: Record<"ko" | "en", Translations> = {
  ko: {
    title: "여밀 모노 (Yeomil Mono)",
    tagline: "개발자를 위한, 완벽한 균형의 CJK-영문 고정폭 서체",
    badgeTerminal: "터미널 및 IDE 최적화",
    badgeUnified: "Geist + Pretendard 결합",
    badgeOfl: "SIL OFL 1.1 라이선스",
    introText: "여밀 모노(Yeomil Mono)는 가독성과 정렬이 중요한 개발자 터미널 및 IDE 환경을 위해 만들어진 한글-영문 통합 고정폭 서체입니다. 영문의 기하학적 아름다움을 담은 Geist Mono와 한글의 실용적인 구조를 지닌 Pretendard를 정교하게 결합하여, 한글 글리프가 깨지거나 세로 정렬이 어긋나는 현상을 완벽하게 해결했습니다.",
    featureTitle: "주요 특징",
    feature1Title: "1. 가로 메트릭(Horizontal Metrics) 정렬",
    feature1Desc: "일반적인 고정폭 서체에서 한글과 영문 혼용 시 발생하는 세로 오정렬과 글리프 잘림 현상을 정밀하게 조율하여, 터미널에서도 줄바꿈과 띄어쓰기가 완벽한 비율(한글 2 : 영문 1)로 렌더링됩니다.",
    feature2Title: "2. Geist Mono & Pretendard의 결합",
    feature2Desc: "Vercel의 Geist Mono가 주는 모던하고 샤프한 영문 숫자 폰트와, 한국어 웹 환경의 표준이 된 Pretendard의 깔끔하고 가독성 높은 한글 구조를 결합해 최고의 코딩 경험을 선사합니다.",
    feature3Title: "3. 개발 친화적 글자 구별",
    feature3Desc: "숫자 0과 알파벳 O, 숫자 1과 소문자 l 및 대문자 I 등 코딩 시 혼동하기 쉬운 글리프들을 명확하게 구분할 수 있도록 최적화되어 있습니다.",
    playgroundTitle: "폰트 플레이그라운드",
    playgroundSubtitle: "글자 크기와 굵기를 조절하며 여밀 모노를 자유롭게 입력해 보세요.",
    playgroundPlaceholder: "여밀 모노는 한글과 영문이 완벽하게 2:1로 정렬되는 고정폭 폰트입니다.",
    controlSize: "크기",
    controlWeight: "굵기",
    controlLineHeight: "줄 높이",
    controlTextInputPlaceholder: "여기에 문장을 입력하여 서체를 테스트해보세요...",
    alignDemoTitle: "완벽한 2:1 고정폭 정렬 데모",
    alignDemoDesc: "한글 한 글자의 너비는 정확히 영문/기호 두 글자의 너비와 일치합니다. 아래의 아스키 그리드 표에서 완벽한 정렬을 눈으로 직접 확인해 보세요.",
    installTitle: "설치 및 다운로드",
    installCurl: "1. curl 설치 (macOS / Linux)",
    installManual: "2. 직접 다운로드 (수동 설치)",
    installManualDesc: "GitHub Releases 페이지에서 TTF 또는 OTF 서체 파일을 압축 파일 형태로 다운로드할 수 있습니다.",
    downloadZip: "서체 파일 다운로드 (.zip)",
    githubRepo: "GitHub 저장소 방문하기",
    copied: "복사됨!",
    reset: "초기화",
  },
  en: {
    title: "Yeomil Mono",
    tagline: "A perfectly balanced CJK-Latin monospace font for developers",
    badgeTerminal: "Optimized for Terminals & IDEs",
    badgeUnified: "Geist Mono + Pretendard",
    badgeOfl: "SIL OFL 1.1 License",
    introText: "Yeomil Mono is a unified CJK-Latin monospace font crafted specifically for developer terminals and IDE environments where readability and alignment are crucial. By aligning the horizontal metrics of Geist Mono (Latin) and Pretendard (Hangul), it ensures that CJK characters render reliably without clipping or vertical misalignment.",
    featureTitle: "Key Features",
    feature1Title: "1. Horizontal Metrics Alignment",
    feature1Desc: "Carefully calibrates the vertical and horizontal metrics of Hangul and Latin characters. In developer terminals, they align in a perfect 2:1 ratio (Hangul : Latin) without text clipping.",
    feature2Title: "2. Best of Both Worlds",
    feature2Desc: "Combines the sharp, geometric beauty of Vercel's Geist Mono for English/numbers with the practical, highly-readable structures of Pretendard for Korean glyphs.",
    feature3Title: "3. Developer-Friendly Distinguishability",
    feature3Desc: "Optimized to clearly differentiate commonly confused characters, such as zero (0) vs. capital letter O, and number one (1) vs. lowercase l vs. uppercase I.",
    playgroundTitle: "Font Playground",
    playgroundSubtitle: "Change font size, weight and type custom text to test Yeomil Mono.",
    playgroundPlaceholder: "Yeomil Mono is a monospace font that aligns Hangul and Latin in a perfect 2:1 ratio.",
    controlSize: "Size",
    controlWeight: "Weight",
    controlLineHeight: "Line Height",
    controlTextInputPlaceholder: "Type something here to preview the font...",
    alignDemoTitle: "Perfect 2:1 Monospace Grid Alignment",
    alignDemoDesc: "One Hangul character occupies exactly the width of two Latin characters or symbols. Notice the perfect alignment inside the ASCII grid below.",
    installTitle: "Installation & Download",
    installCurl: "1. Install via curl (macOS / Linux)",
    installManual: "2. Manual Download",
    installManualDesc: "Download compiled font files (TTF/OTF) as a zip file from the GitHub Releases page.",
    downloadZip: "Download Font Zip (.zip)",
    githubRepo: "Visit GitHub Repository",
    copied: "Copied!",
    reset: "Reset",
  }
};

const ALIGN_GRID = `┌────────────────────────────────────────┐
│  Yeomil Mono Grid Test (40 Width)      │
├────────────────────────────────────────┤
│  여밀모노는한글과영문의너비를정밀하게조율  │
│  abcdefghijklmnopqrstuvwxyzabcdefghij  │
│  ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJ  │
│  123456789012345678901234567890123456  │
│  !@#$%^&*()_+{}|:"<>?[];',./!@#$%^&*()  │
├────────────────────────────────────────┤
│  한글한글한글한글한글한글한글한글한글  │
│  EnglishEnglishEnglishEnglishEnglishE  │
└────────────────────────────────────────┘`;

export async function loader({ request, params }: LoaderFunctionArgs) {
  const lang = getLanguage(request, params.lang);
  const url = new URL(request.url);

  const redirectPath = getLocalizedPath(url.pathname, lang);
  if (redirectPath) {
    return redirect(redirectPath + url.search);
  }

  return { lang };
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const lang = data?.lang === "en" ? "en" : "ko";
  const isKo = lang === "ko";
  
  return generateMeta({
    title: [isKo ? "여밀 모노 서체 소개" : "Yeomil Mono Font", blogConfig.seo[lang].title],
    description: isKo 
      ? "개발자 터미널 및 IDE 환경을 위해 디자인된 Geist Mono와 Pretendard 결합 고정폭 폰트, 여밀 모노를 소개합니다." 
      : "Introducing Yeomil Mono, a unified CJK-Latin monospace font optimized for developer terminals and IDEs, combining Geist Mono and Pretendard.",
    site: blogConfig.site,
    url: pathJoin(blogConfig.site, isKo ? "yeomil-mono" : "en/yeomil-mono"),
  });
};

export default function YeomilMonoPage() {
  const { lang } = useLoaderData<typeof loader>();
  const isEn = lang === "en";
  const t = translations[isEn ? "en" : "ko"];

  const [customText, setCustomText] = useState("");
  const [fontSize, setFontSize] = useState(32);
  const [copied, setCopied] = useState(false);

  const curlCommand = "curl -fsSL https://raw.githubusercontent.com/taevel02/yeomil-mono/main/install.sh | bash";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(curlCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  const displayText = customText || t.playgroundPlaceholder;

  return (
    // Apply Yeomil Mono to the entire page via inline style & font-mono class
    <article 
      style={{ fontFamily: "'Yeomil Mono', ui-monospace, monospace" }} 
      className="animate-fade-in pb-16 font-mono text-zinc-900 dark:text-zinc-100"
    >
      {/* Header section */}
      <header className="mb-10 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          {t.title}
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-lg mb-4">
          {t.tagline}
        </p>
        
        {/* Badges */}
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300">
            {t.badgeTerminal}
          </span>
          <span className="px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300">
            {t.badgeUnified}
          </span>
          <span className="px-2.5 py-1 rounded bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300">
            {t.badgeOfl}
          </span>
        </div>
      </header>

      {/* Intro Description */}
      <section className="mb-12">
        <p className="leading-relaxed text-base">
          {t.introText}
        </p>
      </section>

      {/* Key Features Grid */}
      <section className="mb-16">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <RiTerminalBoxLine className="w-5 h-5 text-primary" />
          {t.featureTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
            <h3 className="text-sm font-bold mb-3">
              {t.feature1Title}
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {t.feature1Desc}
            </p>
          </div>
          <div className="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
            <h3 className="text-sm font-bold mb-3">
              {t.feature2Title}
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {t.feature2Desc}
            </p>
          </div>
          <div className="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
            <h3 className="text-sm font-bold mb-3">
              {t.feature3Title}
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {t.feature3Desc}
            </p>
          </div>
        </div>
      </section>

      {/* Playground Area (Google Fonts Specimen Style - Light background matching blog config) */}
      <section className="mb-16">
        <div className="mb-6">
          <h2 className="text-xl font-bold">{t.playgroundTitle}</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{t.playgroundSubtitle}</p>
        </div>

        {/* Playground Box - Uses background matching parent container */}
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden bg-zinc-50/40 dark:bg-zinc-900/20 shadow-sm">
          {/* Editor Header Toolbar - Google Fonts specimen bar style */}
          <div className="bg-zinc-50 dark:bg-zinc-900 px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 text-sm justify-between">
            {/* Real-time Text Input Field */}
            <div className="flex-1">
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder={t.controlTextInputPlaceholder}
                className="w-full bg-transparent border-none text-zinc-800 dark:text-zinc-200 focus:outline-none placeholder-zinc-400 dark:placeholder-zinc-600"
              />
            </div>
            
            {/* Control Sliders */}
            <div className="flex items-center gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-500">{t.controlSize}</span>
                <input 
                  type="range" 
                  min="16" 
                  max="72" 
                  value={fontSize} 
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-24 sm:w-32 accent-primary h-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg cursor-pointer"
                />
                <span className="text-xs text-zinc-600 dark:text-zinc-400 w-8 text-right">{fontSize}px</span>
              </div>
              
              {customText && (
                <button 
                  onClick={() => setCustomText("")}
                  className="p-1 rounded text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                  title={t.reset}
                >
                  <RiRefreshLine className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Large Specimen Multiweight Rendering */}
          <div className="p-8 space-y-12">
            {/* Sample: Light 300 */}
            <div className="border-b border-zinc-100 dark:border-zinc-900 pb-8">
              <div className="text-xs text-zinc-400 mb-3 flex items-center justify-between">
                <span>Yeomil Mono Light</span>
                <span>300</span>
              </div>
              <p
                style={{
                  fontSize: `${fontSize}px`,
                  fontWeight: 300,
                  lineHeight: 1.4,
                  wordBreak: "break-all",
                }}
                className="text-zinc-800 dark:text-zinc-200 transition-all duration-100"
              >
                {displayText}
              </p>
            </div>

            {/* Sample: Regular 400 */}
            <div className="border-b border-zinc-100 dark:border-zinc-900 pb-8">
              <div className="text-xs text-zinc-400 mb-3 flex items-center justify-between">
                <span>Yeomil Mono Regular</span>
                <span>400</span>
              </div>
              <p
                style={{
                  fontSize: `${fontSize}px`,
                  fontWeight: 400,
                  lineHeight: 1.4,
                  wordBreak: "break-all",
                }}
                className="text-zinc-800 dark:text-zinc-200 transition-all duration-100"
              >
                {displayText}
              </p>
            </div>

            {/* Sample: Bold 700 */}
            <div className="pb-4">
              <div className="text-xs text-zinc-400 mb-3 flex items-center justify-between">
                <span>Yeomil Mono Bold</span>
                <span>700</span>
              </div>
              <p
                style={{
                  fontSize: `${fontSize}px`,
                  fontWeight: 700,
                  lineHeight: 1.4,
                  wordBreak: "break-all",
                }}
                className="text-zinc-855 dark:text-zinc-100 transition-all duration-100"
              >
                {displayText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Alignment details */}
      <section className="mb-16">
        <h2 className="text-xl font-bold mb-3">{t.alignDemoTitle}</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">{t.alignDemoDesc}</p>
        <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 overflow-x-auto">
          <pre 
            className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-300 leading-relaxed whitespace-pre"
          >
            {ALIGN_GRID}
          </pre>
        </div>
      </section>

      {/* Installation / Download */}
      <section className="border-t border-zinc-200 dark:border-zinc-800 pt-12">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <RiDownloadLine className="w-6 h-6 text-primary" />
          {t.installTitle}
        </h2>

        <div className="space-y-8">
          {/* Curl Command - Light background matching specimen design */}
          <div>
            <h3 className="text-base font-bold mb-3">{t.installCurl}</h3>
            <div className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 text-zinc-800 dark:text-zinc-200 px-4 py-3 rounded-lg overflow-x-auto relative">
              <code className="text-xs sm:text-sm flex-1 whitespace-nowrap pr-12">
                {curlCommand}
              </code>
              <button
                onClick={handleCopy}
                className="absolute right-3 p-1.5 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition"
                title="Copy command"
              >
                {copied ? <RiCheckLine className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <RiFileCopyLine className="w-4 h-4" />}
              </button>
            </div>
            {copied && (
              <span className="text-xs text-emerald-600 dark:text-emerald-400 mt-1.5 block animate-pulse">
                {t.copied}
              </span>
            )}
          </div>

          {/* Direct Download & Github */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold mb-2">{t.installManual}</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
                  {t.installManualDesc}
                </p>
              </div>
              <a
                href="https://github.com/taevel02/yeomil-mono/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:hover:bg-zinc-100 text-zinc-50 dark:text-zinc-900 text-sm font-medium transition"
              >
                <RiDownloadLine className="w-4 h-4" />
                {t.downloadZip}
              </a>
            </div>

            <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold mb-2">GitHub Repository</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
                  {isEn 
                    ? "Check out the source code, open issues, and contribute to the Yeomil Mono project on GitHub."
                    : "여밀 모노의 소스 코드 확인 및 버그 제보, 기여를 위해 깃허브 저장소를 방문해 보세요."}
                </p>
              </div>
              <a
                href="https://github.com/taevel02/yeomil-mono"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-800 dark:text-zinc-200 text-sm font-medium transition"
              >
                <RiGithubFill className="w-4 h-4" />
                {t.githubRepo}
              </a>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

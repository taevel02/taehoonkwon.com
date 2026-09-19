export type ProductType = "app" | "web" | "font";
export type ProductLanguage = "ko" | "en";

type Localized = Record<ProductLanguage, string>;

export type Product = {
  slug: string;
  type: ProductType;
  name: string;
  tagline: Localized;
  description: Localized;
  features: Array<{ title: Localized; description: Localized }>;
  primaryLink: { href: string; label: Localized };
  secondaryLink?: { href: string; label: Localized };
  support?: {
    email: string;
    instructions: Localized;
    sections?: Array<{ heading: Localized; body: Localized }>;
  };
  privacy?: { updated: string; sections: Array<{ heading: Localized; body: Localized }> };
};

export const products: Product[] = [
  {
    slug: "dockpinch",
    type: "app",
    name: "DockPinch",
    tagline: {
      ko: "macOS를 위한 오프라인 문서·이미지 최적화 도구",
      en: "An offline document and image optimizer for macOS",
    },
    description: {
      ko: "Dock 아이콘, Studio 창, Finder Quick Action에서 PDF와 이미지를 빠르게 최적화합니다. 모든 처리는 Mac 안에서 이루어집니다.",
      en: "Optimize PDFs and images from the Dock, Studio window, or Finder Quick Action. Every operation runs locally on your Mac.",
    },
    features: [
      {
        title: { ko: "완전한 오프라인 처리", en: "Fully offline" },
        description: { ko: "파일을 서버로 보내지 않고 Mac 안에서 처리", en: "Process files locally without sending them to a server" },
      },
      {
        title: { ko: "문서와 이미지", en: "Documents and images" },
        description: { ko: "PDF, PNG, JPEG, HEIC, TIFF, WebP, AVIF 지원", en: "Supports PDF, PNG, JPEG, HEIC, TIFF, WebP, and AVIF" },
      },
      {
        title: { ko: "Dock에서 바로 실행", en: "Drop into the Dock" },
        description: { ko: "파일이나 폴더를 DockPinch 아이콘으로 드래그해 즉시 시작", en: "Drag files or folders onto the DockPinch icon to start instantly" },
      },
    ],
    primaryLink: {
      href: "https://github.com/taevel02/DockPinch",
      label: { ko: "소스 코드", en: "Source code" },
    },
    support: {
      email: "support@taehoonkwon.com",
      instructions: {
        ko: "DockPinch 사용 중 문제가 있거나 App Store 구매·복원에 도움이 필요하면 아래 이메일로 문의해주세요.",
        en: "If you need help with DockPinch or an App Store purchase or restore, contact us by email below.",
      },
      sections: [
        {
          heading: { ko: "지원 환경", en: "Requirements" },
          body: { ko: "macOS 15.0 이상, Apple Silicon Mac을 지원합니다.", en: "DockPinch requires macOS 15.0 or later and is optimized for Apple Silicon Macs." },
        },
        {
          heading: { ko: "무료 및 Pro", en: "Free and Pro" },
          body: { ko: "무료 버전은 하루 5개까지 단일 파일을 처리합니다. DockPinch Pro는 일회성 구매로 무제한 처리, 여러 파일 및 폴더 처리, 고급 압축 옵션을 제공합니다.", en: "The free version processes up to five single files per day. DockPinch Pro is a one-time purchase that unlocks unlimited processing, batches and folders, and advanced compression options." },
        },
        {
          heading: { ko: "파일 처리", en: "File handling" },
          body: { ko: "PDF와 이미지는 Mac 안에서 처리됩니다. 원본 삭제를 선택한 경우에도 출력 파일이 생성되고 경로가 다를 때만 원본을 휴지통으로 이동합니다.", en: "PDFs and images are processed on your Mac. When delete original is enabled, the original moves to the Trash only after a distinct output file has been created." },
        },
      ],
    },
    privacy: {
      updated: "2026-09-19",
      sections: [
        {
          heading: { ko: "수집하는 정보", en: "Information we collect" },
          body: { ko: "DockPinch는 파일, 파일 이름, 파일 내용, 사용량 정보를 서버로 수집하거나 전송하지 않습니다. 앱에는 광고 SDK와 자체 analytics가 없습니다.", en: "DockPinch does not collect or send files, file names, file contents, or usage information to a server. The app has no advertising SDK or first-party analytics." },
        },
        {
          heading: { ko: "파일 접근", en: "File access" },
          body: { ko: "사용자가 선택하거나 Downloads 접근을 허용한 파일만 읽고 씁니다. 다른 폴더는 사용자가 권한을 부여한 경우에만 접근합니다.", en: "DockPinch reads and writes only files selected by the user or covered by Downloads access. Other folders are accessed only after the user grants permission." },
        },
        {
          heading: { ko: "로컬 저장 데이터", en: "Local data" },
          body: { ko: "설정, 무료 사용량, 폴더 접근 권한 bookmark는 Mac에만 저장됩니다. 이 데이터는 DockPinch 기능 제공을 위해 사용됩니다.", en: "Settings, free usage counts, and folder access bookmarks are stored only on your Mac and are used to provide DockPinch features." },
        },
        {
          heading: { ko: "결제", en: "Purchases" },
          body: { ko: "DockPinch Pro 결제와 구매 복원은 Apple StoreKit을 통해 처리됩니다. 결제 정보는 DockPinch가 보관하지 않습니다.", en: "DockPinch Pro purchases and restoration are handled by Apple StoreKit. DockPinch does not store payment information." },
        },
        {
          heading: { ko: "문의", en: "Contact" },
          body: { ko: "지원 문의는 사용자가 직접 보낸 이메일에 포함된 정보만 처리합니다. 문의: support@taehoonkwon.com", en: "For support requests, we process only the information you choose to include in your email. Contact: support@taehoonkwon.com" },
        },
      ],
    },
  },
  {
    slug: "alpha-signals",
    type: "web",
    name: "Alpha Signals",
    tagline: {
      ko: "미국 주식 시장을 읽는 데이터 기반 리포트",
      en: "Data-driven reports on the US stock market",
    },
    description: {
      ko: "미국 주식 시장의 주요 소식과 시그널을 정리해 제공하는 웹서비스입니다. 리포트와 아카이브는 Alpha Signals 공식 사이트에서 볼 수 있습니다.",
      en: "A web service that organizes key US market news and signals. Read the reports and archive on the Alpha Signals website.",
    },
    features: [
      {
        title: { ko: "Alpha Signal", en: "Alpha Signal" },
        description: { ko: "시장의 주요 소식과 시그널을 담은 리포트", en: "Reports covering key market news and signals" },
      },
      {
        title: { ko: "Premarket", en: "Premarket" },
        description: { ko: "개장 전 시장 정보를 확인하는 공간", en: "Market information before the opening bell" },
      },
      {
        title: { ko: "리포트 아카이브", en: "Report archive" },
        description: { ko: "지난 리포트를 날짜별로 탐색", en: "Browse previous reports by date" },
      },
    ],
    primaryLink: {
      href: "https://www.alphasignals.cloud/",
      label: { ko: "Alpha Signals 방문", en: "Visit Alpha Signals" },
    },
  },
  {
    slug: "yeomil-mono",
    type: "font",
    name: "Yeomil Mono",
    tagline: {
      ko: "개발자를 위한 한글·영문 고정폭 서체",
      en: "A Korean–Latin monospace font for developers",
    },
    description: {
      ko: "터미널과 IDE에서 한글과 영문을 함께 읽고 정렬하기 위해 Geist Mono와 Pretendard를 결합한 서체입니다. 아래에서 직접 입력해 보고 설치할 수 있습니다.",
      en: "A font combining Geist Mono and Pretendard for legible, aligned Korean and Latin text in terminals and IDEs. Try it below, then install it.",
    },
    features: [
      {
        title: { ko: "한글·영문 정렬", en: "Korean–Latin alignment" },
        description: { ko: "두 문자 체계의 폭과 높이를 터미널에 맞게 조율", en: "Metrics tuned for mixed-script text in terminals" },
      },
      {
        title: { ko: "세 가지 굵기", en: "Three weights" },
        description: { ko: "Light, Regular, Bold 제공", en: "Light, Regular, and Bold included" },
      },
      {
        title: { ko: "오픈 소스", en: "Open source" },
        description: { ko: "SIL OFL 1.1 라이선스로 배포", en: "Distributed under the SIL OFL 1.1 license" },
      },
    ],
    primaryLink: {
      href: "https://github.com/taevel02/yeomil-mono/releases",
      label: { ko: "서체 다운로드", en: "Download font" },
    },
    secondaryLink: {
      href: "https://github.com/taevel02/yeomil-mono",
      label: { ko: "소스 코드", en: "Source code" },
    },
  },
];

export function getProduct(type: string | undefined, slug: string | undefined) {
  return products.find((product) => product.type === type && product.slug === slug);
}

export function productPath(product: Product, lang: ProductLanguage) {
  return `${lang === "en" ? "/en" : ""}/products/${product.type}/${product.slug}`;
}

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
  support?: { email: string; instructions: Localized };
  privacy?: { updated: string; sections: Array<{ heading: Localized; body: Localized }> };
};

export const products: Product[] = [
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

/**
 * @see {@link https://github.com/nasa-gcn/remix-seo/blob/main/src/robotstxt/index.ts}
 */

export type RobotsPolicy = {
  type: "allow" | "disallow" | "sitemap" | "crawlDelay" | "userAgent";
  value: string;
};

export type RobotsConfig = {
  appendOnDefaultPolicies?: boolean;
  headers?: HeadersInit;
};

const typeTextMap = {
  userAgent: "User-agent",
  allow: "Allow",
  disallow: "Disallow",
  sitemap: "Sitemap",
  crawlDelay: "Crawl-delay",
};

const defaultPolicies: RobotsPolicy[] = [
  {
    type: "userAgent",
    value: "*",
  },
  {
    type: "allow",
    value: "/",
  },
];

export function generateRobotsTxt(
  policies: RobotsPolicy[] = [],
  { appendOnDefaultPolicies = true, headers }: RobotsConfig = {}
) {
  const policiesToUse = appendOnDefaultPolicies
    ? [...defaultPolicies, ...policies]
    : policies;
  const robotText = getRobotsText(policiesToUse);
  const bytes = new TextEncoder().encode(robotText).byteLength;

  return new Response(robotText, {
    headers: {
      ...headers,
      "Content-Type": "text/plain",
      "Content-Length": String(bytes),
    },
  });
}

function getRobotsText(policies: RobotsPolicy[]): string {
  return policies.reduce((acc, policy) => {
    const { type, value } = policy;
    return `${acc}${typeTextMap[type]}: ${value}\n`;
  }, "");
}

import type { MetaDescriptor, ServerBuild } from "@remix-run/node";
import blogConfig from "blog.config";

// --- META GENERATOR ---

interface GenerateMetaOptions {
  title: string[];
  description: string;
  image?: string;
  author?: string;
  site?: string;
  url?: string;
  logo?: string;
}

const DELIMITER = " | ";

export function generateMeta({
  title,
  description,
  image = "",
  author = "",
  url = "",
  logo = "",
}: GenerateMetaOptions): MetaDescriptor[] {
  let ogImage = image;
  if (!ogImage && title.length > 0) {
    const ogTitle = title[0];
    const ogSubtitle = title.length > 1 ? title[1] : "";
    const cleanSite = blogConfig.site.endsWith("/")
      ? blogConfig.site.slice(0, -1)
      : blogConfig.site;
    ogImage = `${cleanSite}/resource/og?title=${encodeURIComponent(ogTitle)}&subtitle=${encodeURIComponent(ogSubtitle || description)}`;
  }

  return [
    { title: title.join(DELIMITER) },
    { name: "description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:title", content: title[0] },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: ogImage },
    { property: "og:logo", content: logo },
    { name: "twitter:title", content: title[0] },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: ogImage },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:creator", content: `@${author}` },
    { name: "twitter:site", content: `@${author}` },
  ];
}

// --- ROBOTS.TXT GENERATOR ---

export type RobotsPolicy = {
  type: "allow" | "disallow" | "sitemap" | "crawlDelay" | "userAgent";
  value: string;
};

export type RobotsConfig = {
  appendOnDefaultPolicies?: boolean;
  headers?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

const typeTextMap = {
  userAgent: "User-agent",
  allow: "Allow",
  disallow: "Disallow",
  sitemap: "Sitemap",
  crawlDelay: "Crawl-delay",
};

const defaultPolicies: RobotsPolicy[] = [
  { type: "userAgent", value: "*" },
  { type: "allow", value: "/" },
];

export function generateRobotsTxt(
  policies: RobotsPolicy[] = [],
  { appendOnDefaultPolicies = true, headers }: RobotsConfig = {},
) {
  const policiesToUse = appendOnDefaultPolicies
    ? [...defaultPolicies, ...policies]
    : policies;

  const robotText = policiesToUse.reduce((acc, policy) => {
    return `${acc}${typeTextMap[policy.type]}: ${policy.value}\n`;
  }, "");

  const bytes = new TextEncoder().encode(robotText).byteLength;

  return new Response(robotText, {
    headers: {
      ...headers,
      "Content-Type": "text/plain",
      "Content-Length": String(bytes),
    },
  });
}

// --- RSS GENERATOR ---

export type RssEntry = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  author?: string;
  guid?: string;
};

export function generateRss(
  origin: string,
  {
    title,
    description,
    link,
    entries,
  }: { title: string; description: string; link: string; entries: RssEntry[] },
): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${title}</title>
      <description>${description}</description>
      <link>${link}</link>
      <language>ko</language>
      <ttl>60</ttl>
      <atom:link href="https://${origin}/rss.xml" rel="self" type="application/rss+xml" />
      ${entries
        .map(
          (entry) => `
            <item>
              <title><![CDATA[${entry.title}]]></title>
              <description><![CDATA[${entry.description}]]></description>
              <pubDate>${entry.pubDate}</pubDate>
              <link>${entry.link}</link>
              ${entry.guid ? `<guid isPermaLink="false">${entry.guid}</guid>` : ""}
            </item>`,
        )
        .join("")}
    </channel>
  </rss>`;
}

// --- SITEMAP GENERATOR ---

export type SitemapEntry = {
  route: string;
  lastmod?: string;
  changefreq?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: 0.0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1.0;
};

export type SEOHandle = {
  getSitemapEntries?: (
    request: Request,
  ) =>
    | Promise<Array<SitemapEntry | null> | null>
    | Array<SitemapEntry | null>
    | null;
};

export type PickSitemapOptions = {
  siteUrl: string;
  headers?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export async function generateSitemap(
  request: Request,
  routes: ServerBuild["routes"],
  options: PickSitemapOptions,
) {
  const { siteUrl, headers } = options;
  const sitemap = await getSitemapXml(request, routes, { siteUrl });
  const bytes = new TextEncoder().encode(sitemap).byteLength;

  return new Response(sitemap, {
    headers: {
      ...headers,
      "Content-Type": "application/xml",
      "Content-Length": String(bytes),
    },
  });
}

function removeTrailingSlash(s: string) {
  return s.endsWith("/") ? s.slice(0, -1) : s;
}

async function getSitemapXml(
  request: Request,
  routes: ServerBuild["routes"],
  options: { siteUrl: string },
) {
  const { siteUrl } = options;

  function getEntry({
    route,
    lastmod,
    changefreq,
    priority = 0.7,
  }: SitemapEntry) {
    return `
      <url>
        <loc>${siteUrl}${route}</loc>
        ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}
        ${changefreq ? `<changefreq>${changefreq}</changefreq>` : ""}
        ${typeof priority === "number" ? `<priority>${priority}</priority>` : ""}
      </url>
    `.trim();
  }

  const rawSitemapEntries = (
    await Promise.all(
      Object.entries(routes).map(async ([id, routeEntry]) => {
        const mod = (routeEntry as any).module; // eslint-disable-line @typescript-eslint/no-explicit-any
        if (id === "root" || !mod) return;

        const handle = mod.handle as SEOHandle | undefined;
        if (handle?.getSitemapEntries) {
          return handle.getSitemapEntries(request);
        }

        if (!("default" in mod)) return;

        const manifestEntry = routes[id];
        if (!manifestEntry) return;

        let parentId = manifestEntry.parentId;
        let parent = parentId ? routes[parentId] : null;

        let path;
        if (manifestEntry.path) {
          path = removeTrailingSlash(manifestEntry.path);
        } else if (manifestEntry.index) {
          path = "";
        } else {
          return;
        }

        while (parent) {
          const parentPath = parent.path
            ? removeTrailingSlash(parent.path)
            : "";
          path = `${parentPath}/${path}`;
          parentId = parent.parentId;
          parent = parentId ? routes[parentId] : null;
        }

        if (path.includes(":")) return;

        return { route: removeTrailingSlash(path) };
      }),
    )
  )
    .flatMap((z) => z)
    .filter(Boolean) as SitemapEntry[];

  const sitemapEntries: Array<SitemapEntry> = [];
  const routeSet = new Set<string>();

  for (const entry of rawSitemapEntries) {
    if (!routeSet.has(entry.route)) {
      sitemapEntries.push(entry);
      routeSet.add(entry.route);
    }
  }

  return `
    <?xml version="1.0" encoding="UTF-8"?>
      <urlset
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
      >
        ${sitemapEntries.map(getEntry).join("")}
      </urlset>
    `.trim();
}

// --- SCHEMA GENERATORS ---

export function getArticleSchema({
  title,
  description,
  date,
  author = "태훈",
  url,
  image = "",
}: {
  title: string;
  description: string;
  date: string;
  author?: string;
  url: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    author: {
      "@type": "Person",
      name: author,
    },
    datePublished: date,
    url: url,
    image: image ? [image] : undefined,
  };
}

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  if (!faqs || faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

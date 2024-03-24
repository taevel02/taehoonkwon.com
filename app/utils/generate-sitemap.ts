export function generateSitemap(urls: string[]): string {
  const urlsAsXml = urls
    .map(
      (url) => `
        <url>
          <loc>${url}</loc>
          <priority>0.8</priority>
        </url>
      `
    )
    .join("\n");

  return `
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
    >
      ${urlsAsXml}
    </urlset>
  `;
}

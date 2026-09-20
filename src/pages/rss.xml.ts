import { getCollection } from "astro:content";

export async function GET() {
  const [archives, scuba] = await Promise.all([getCollection("archives"), getCollection("scuba")]);
  const entries = [...archives.map((entry) => ({ ...entry, path: "archives" })), ...scuba.map((entry) => ({ ...entry, path: "scuba" }))].sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  const body = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Taehoon Kwon</title><link>https://taehoonkwon.com</link><description>글과 사랑, 그리고 행복을 추구합니다.</description>${entries.map((entry) => `<item><title><![CDATA[${entry.data.title}]]></title><link>https://taehoonkwon.com/${entry.path}/${entry.data.id}</link><guid>https://taehoonkwon.com/${entry.path}/${entry.data.id}</guid><pubDate>${entry.data.date.toUTCString()}</pubDate></item>`).join("")}</channel></rss>`;
  return new Response(body, { headers: { "Content-Type": "application/rss+xml" } });
}

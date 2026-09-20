import { getCollection } from "astro:content";
import { products } from "../data/products";

export async function GET() {
  const [archives, scuba] = await Promise.all([getCollection("archives"), getCollection("scuba")]);
  const urls = ["/", "/archives", "/scuba", "/products", ...archives.map((entry) => `/archives/${entry.data.id}`), ...scuba.map((entry) => `/scuba/${entry.data.id}`), ...products.flatMap((product) => [`/products/${product.type}/${product.slug}`, ...(product.support ? [`/products/${product.type}/${product.slug}/support`] : []), ...(product.privacy ? [`/products/${product.type}/${product.slug}/privacy`] : [])])];
  const body = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((url) => `<url><loc>https://taehoonkwon.com${url}</loc></url>`).join("")}</urlset>`;
  return new Response(body, { headers: { "Content-Type": "application/xml" } });
}

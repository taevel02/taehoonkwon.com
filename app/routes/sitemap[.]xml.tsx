import { LoaderFunction } from "@remix-run/node";

import { articleAPI } from "~/api/article";
import { generateSitemap } from "~/utils/generate-sitemap";

import blogConfig from "blog.config";

const routes = ["archives"];

export const loader: LoaderFunction = async () => {
  const articles = await articleAPI.getArticles();

  const sitemap = generateSitemap([
    "https://taehoonkwon.com",
    ...routes.map((route) => `https://${blogConfig.origin}/${route}`),
    ...articles.map(
      (article) => `https://${blogConfig.origin}/archives/${article.id}`
    ),
  ]);

  return new Response(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml;",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "public, max-age=600, s-maxage=86400",
    },
  });
};

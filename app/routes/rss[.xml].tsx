import { LoaderFunction } from "@remix-run/node";

import { articleAPI } from "~/api/article";
import { generateRss } from "~/utils/seo";

import blogConfig from "blog.config";

export const loader: LoaderFunction = async () => {
  const articles = await articleAPI.getArticles("ko");

  const feed = generateRss(blogConfig.origin, {
    title: blogConfig.seo.ko.title,
    description: blogConfig.seo.ko.description,
    link: `https://${blogConfig.origin}`,
    entries: articles.map((article) => ({
      description: article.subtitle ?? "",
      pubDate: new Date(article.lastUpdatedAt).toUTCString(),
      title: article.title,
      link: `https://${blogConfig.origin}/archives/${article.id}`,
      guid: `https://${blogConfig.origin}/archives/${article.id}`,
    })),
  });

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=2419200",
    },
  });
};

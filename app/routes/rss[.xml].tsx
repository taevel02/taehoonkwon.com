import { LoaderFunction } from "@remix-run/node";

import { articleAPI } from "~/api/article";
import { generateRss } from "~/utils/seo";

import blogConfig from "blog.config";

export const loader: LoaderFunction = async () => {
  const [koArchives, enArchives, koScuba, enScuba] = await Promise.all([
    articleAPI.getArticles("ko", null, "archives"),
    articleAPI.getArticles("en", null, "archives"),
    articleAPI.getArticles("ko", null, "scuba"),
    articleAPI.getArticles("en", null, "scuba"),
  ]);

  const entries = [
    ...koArchives.map((article) => ({
      description: article.subtitle ?? "",
      pubDate: new Date(article.lastUpdatedAt).toUTCString(),
      title: article.title,
      link: `https://${blogConfig.origin}/archives/${article.id}`,
      guid: `https://${blogConfig.origin}/archives/${article.id}`,
    })),
    ...enArchives.map((article) => ({
      description: article.subtitle ?? "",
      pubDate: new Date(article.lastUpdatedAt).toUTCString(),
      title: article.title,
      link: `https://${blogConfig.origin}/en/archives/${article.id}`,
      guid: `https://${blogConfig.origin}/en/archives/${article.id}`,
    })),
    ...koScuba.map((article) => ({
      description: article.subtitle ?? "",
      pubDate: new Date(article.lastUpdatedAt).toUTCString(),
      title: article.title,
      link: `https://${blogConfig.origin}/scuba/${article.id}`,
      guid: `https://${blogConfig.origin}/scuba/${article.id}`,
    })),
    ...enScuba.map((article) => ({
      description: article.subtitle ?? "",
      pubDate: new Date(article.lastUpdatedAt).toUTCString(),
      title: article.title,
      link: `https://${blogConfig.origin}/en/scuba/${article.id}`,
      guid: `https://${blogConfig.origin}/en/scuba/${article.id}`,
    })),
  ];

  const sortedEntries = entries.sort((a, b) => {
    return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
  });

  const feed = generateRss(blogConfig.origin, {
    title: blogConfig.seo.ko.title,
    description: blogConfig.seo.ko.description,
    link: `https://${blogConfig.origin}`,
    entries: sortedEntries,
  });

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=2419200",
    },
  });
};

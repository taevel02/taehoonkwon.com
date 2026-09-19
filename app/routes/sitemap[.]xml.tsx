// eslint-disable-next-line import/no-unresolved
import { routes } from "virtual:remix/server-build";
import { LoaderFunctionArgs } from "@remix-run/node";
import { articleAPI } from "~/api/article.server";
import type { Article } from "~/types/articles";
import { generateSitemap } from "~/utils/seo";
import type { SitemapEntry } from "~/utils/seo";

function getArticleEntries(
  articles: Article[],
  basePath: string,
): SitemapEntry[] {
  return articles.map((article) => ({
    route: `${basePath}/${article.id}`,
    lastmod: article.lastUpdatedAt,
    priority: 0.8,
  }));
}

export async function loader({ request }: LoaderFunctionArgs) {
  const [koArchives, enArchives, koScuba, enScuba] = await Promise.all([
    articleAPI.getArticles("ko", null, "archives"),
    articleAPI.getArticles("en", null, "archives"),
    articleAPI.getArticles("ko", null, "scuba"),
    articleAPI.getArticles("en", null, "scuba"),
  ]);

  const entries = [
    ...getArticleEntries(koArchives, "/archives"),
    ...getArticleEntries(enArchives, "/en/archives"),
    ...getArticleEntries(koScuba, "/scuba"),
    ...getArticleEntries(enScuba, "/en/scuba"),
  ];

  return generateSitemap(request, routes, {
    siteUrl: "https://taehoonkwon.com",
    entries,
  });
}

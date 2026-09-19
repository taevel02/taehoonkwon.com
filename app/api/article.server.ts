import dayjs from "dayjs";

import articleCatalog from "~/generated/articles.server";
import type { Article } from "~/types/articles";

function getCollection(folder: string, lang: string): Article[] {
  return articleCatalog[folder]?.[lang] ?? [];
}

async function getArticles(
  lang: string,
  category?: string | null,
  folder: string = "archives",
): Promise<Article[]> {
  const articles = [...getCollection(folder, lang)].sort((a, b) => {
    const dateA = dayjs(a.lastUpdatedAt);
    const dateB = dayjs(b.lastUpdatedAt);
    return dateB.unix() - dateA.unix();
  });

  return category
    ? articles.filter((article) => article.category === category)
    : articles;
}

async function getArticle(
  lang: string,
  id: string,
  folder: string = "archives",
): Promise<Article | null> {
  return getCollection(folder, lang).find((article) => article.id === id) ?? null;
}

export const articleAPI = {
  getArticles,
  getArticle,
};

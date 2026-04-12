import blogConfig from "blog.config";
import path from "path";
import fs from "fs-extra";
import { Article } from "~/types/articles";

import dayjs from "dayjs";

const DIRNAME = path.resolve();

const articlesDir = (folder: string, lang: string, file: string) =>
  path.join(DIRNAME, blogConfig.content.generatedDirectory, folder, lang, file);

async function getArticles(
  lang: string,
  category?: string | null,
  folder: string = "archives",
): Promise<Article[]> {
  try {
    const manifestFile = await fs.readJSON(
      articlesDir(folder, lang, "manifest.json"),
    );
    const articles = JSON.parse(manifestFile.articles) as Article[];

    const sortedArticles = articles.sort((a, b) => {
      const dateA = dayjs(a.lastUpdatedAt);
      const dateB = dayjs(b.lastUpdatedAt);
      return dateB.unix() - dateA.unix();
    });

    if (category) {
      return sortedArticles.filter((article) => article.category === category);
    }

    return sortedArticles;
  } catch {
    return [];
  }
}

async function getArticle(
  lang: string,
  id: string,
  folder: string = "archives",
): Promise<Article | null> {
  try {
    return await fs.readJSON(articlesDir(folder, lang, `${id}.json`));
  } catch {
    console.error(`Article not found: ${id} in ${folder}/${lang}`);
    return null;
  }
}

export const articleAPI = {
  getArticles,
  getArticle,
};

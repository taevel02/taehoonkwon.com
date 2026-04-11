import blogConfig from "blog.config";
import path from "path";
import fs from "fs-extra";
import { Article } from "~/types/articles";

const DIRNAME = path.resolve();

const articlesDir = (lang: string, file: string) =>
  path.join(DIRNAME, blogConfig.archives.generatedDirectory, lang, file);

async function getArticles(lang: string, category?: string | null): Promise<Article[]> {
  try {
    const manifestFile = await fs.readJSON(articlesDir(lang, "manifest.json"));
    const articles = JSON.parse(manifestFile.articles) as Article[];

    const sortedArticles = articles.sort((a, b) => {
      return (
        new Date(b.lastUpdatedAt).getTime() - new Date(a.lastUpdatedAt).getTime()
      );
    });

    if (category) {
      return sortedArticles.filter((article) => article.category === category);
    }

    return sortedArticles;
  } catch {
    return [];
  }
}

async function getArticle(lang: string, id: string): Promise<Article | null> {
  try {
    return await fs.readJSON(articlesDir(lang, `${id}.json`));
  } catch {
    console.error(`Article not found: ${id} in ${lang}`);
    return null;
  }
}

export const articleAPI = {
  getArticles,
  getArticle,
};

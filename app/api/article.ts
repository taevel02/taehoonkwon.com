import blogConfig from "blog.config";
import path from "path";
import fs from "fs-extra";
import { Article } from "~/types/articles";

const DIRNAME = path.resolve();

const articlesDir = (file: string) =>
  path.join(DIRNAME, blogConfig.archives.generatedDirectory, file);

async function getArticles(): Promise<Article[]> {
  const manifestFile = await fs.readJSON(articlesDir("/manifest.json"));
  const articles = JSON.parse(manifestFile.articles) as Article[];

  const sortedArticles = articles.sort((a, b) => {
    return (
      new Date(b.lastUpdatedAt).getTime() - new Date(a.lastUpdatedAt).getTime()
    );
  });

  return sortedArticles;
}

async function getArticle(id: string): Promise<Article | null> {
  try {
    return await fs.readJSON(articlesDir(`${id}.json`));
  } catch {
    console.error("Article not found", id);
    return null;
  }
}

export const articleAPI = {
  getArticles,
  getArticle,
};

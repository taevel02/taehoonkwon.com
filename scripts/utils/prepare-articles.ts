import path from "path";
import fs from "fs-extra";
import fm from "front-matter";
import { globby } from "globby";

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkFrontmatter from "remark-frontmatter";
import rehypeStringify from "rehype-stringify";
import rehypeShiki from "@shikijs/rehype";
import sharp from "sharp";
import { visit } from "unist-util-visit";
import blogConfig from "~/../blog.config";

import { Article, ArticleCategory, ArticleFrontMatter } from "~/types/articles";

export async function prepareArticles({
  from: baseDirectory,
  to: destination,
}: {
  from: string;
  to: string;
}) {
  const markdownFiles = await globby("**/*.md", { cwd: baseDirectory });

  const manifest: Article[] = [];

  await Promise.all(
    markdownFiles.map(async (file) => {
      const text = await readFileToString(baseDirectory, file);
      const article = await buildArticle(text, file);

      if (article !== null) {
        manifest.push(article);
        console.log("Content Generated: ", article.title);
        await fs.outputJson(`${destination}/${article.id}.json`, article);
      }
    })
  );

  const imageFiles = await globby(blogConfig.image.extensions, { cwd: baseDirectory });
  
  await Promise.all(
    imageFiles.map(async (file) => {
      const rawPath = path.join(baseDirectory, file);
      const fileName = path.parse(file).name;
      const fileDir = path.dirname(file);
      const destDir = path.join(path.resolve(), "public", "images", "articles", fileDir);
      
      await fs.ensureDir(destDir);
      
      const destPath = path.join(destDir, `${fileName}.webp`);
      await sharp(rawPath)
        .webp({ quality: 80 })
        .toFile(destPath);
      
      console.log(`Image Optimized: ${file} -> ${destPath}`);
    })
  );

  await fs.outputJson(`${destination}/manifest.json`, {
    articles: JSON.stringify(manifest),
  });
}

async function buildArticle(text: string, file: string) {
  const result = await parseMarkdown<ArticleFrontMatter>(text, file);

  if (result === null) {
    console.warn("Invalid frontmatter", text.substring(0, 30));
    return null;
  }

  const { html, attr } = result;

  if (new Date(attr.date).toString() === "Invalid Date") {
    console.warn("Invalid date", attr.date);
    return null;
  }

  const article: Article = {
    id: attr.id,
    title: attr.title,
    subtitle: attr.subtitle,
    lastUpdatedAt: attr.date,
    category: attr.category as ArticleCategory,
    thumbnail: attr.thumbnail,
    content: html,
  };

  return article;
}

async function readFileToString(...args: string[]): Promise<string> {
  const data = await fs.readFile(path.join(...args), "utf-8");
  return data;
}

async function parseMarkdown<T>(text: string, filePath: string) {
  const frontmatter = fm<T>(text);

  if (frontmatter === null) return null;

  const attr = frontmatter.attributes;
  const html = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(() => (tree) => {
      visit(tree, "element", (node: any) => {
        if (node.tagName === "img" && node.properties?.src) {
          const src = node.properties.src as string;
          if (!src.startsWith("http") && !src.startsWith("data:") && !src.startsWith("/")) {
            const relativeSrc = src.replace(/^\.\//, "");
            const parsed = path.parse(relativeSrc);
            const fileDir = path.dirname(filePath);
            const newSrc = `/images/articles/${fileDir}/${parsed.name}.webp`;
            node.properties.src = newSrc.replace(/\/\//g, '/');
          }
        }
      });
    })
    .use(rehypeShiki, {
      themes: {
        light: "vitesse-light",
        dark: "vitesse-dark",
      },
    })
    .use(rehypeStringify)
    .use(remarkFrontmatter, ["yaml", "toml"])
    .process(text)
    .then((value) => String(value));

  return {
    attr: { ...attr },
    html,
  };
}

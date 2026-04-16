import path from "path";
import fs from "fs-extra";
import fm from "front-matter";
import { globby } from "globby";
import dayjs from "dayjs";

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import remarkFrontmatter from "remark-frontmatter";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";
import rehypeShiki from "@shikijs/rehype";
import sharp from "sharp";
import { visit } from "unist-util-visit";

import { Article, ArticleCategory, ArticleFrontMatter } from "~/types/articles";

import blogConfig from "~/../blog.config";

export async function prepareArticles({
  from: baseDirectory,
  to: destination,
}: {
  from: string;
  to: string;
}) {
  // Clear old generated files to prevent stale content (e.g., old numeric ID files)
  await fs.emptyDir(destination);

  const markdownFiles = await globby("**/*.md", { cwd: baseDirectory });

  // Map of category to language to an array of articles
  const manifests: Record<string, Record<string, Article[]>> = {};

  await Promise.all(
    markdownFiles.map(async (file) => {
      const parts = file.split(path.sep);
      let entryCategory = "archives";
      let lang = "ko";

      if (parts.length >= 3) {
        entryCategory = parts[0];
        lang = parts[1];
      } else if (parts.length === 2) {
        lang = parts[0];
      }

      const text = await readFileToString(baseDirectory, file);
      const article = await buildArticle(text, file, lang);

      if (article !== null) {
        if (!manifests[entryCategory]) {
          manifests[entryCategory] = {};
        }
        if (!manifests[entryCategory][lang]) {
          manifests[entryCategory][lang] = [];
        }
        manifests[entryCategory][lang].push(article);
        console.log(
          `Content Generated [${entryCategory}/${lang}]: `,
          article.title,
        );
        await fs.outputJson(
          path.join(destination, entryCategory, lang, `${article.id}.json`),
          article,
        );
      }
    }),
  );

  const imageFiles = await globby(blogConfig.image.extensions, {
    cwd: baseDirectory,
  });

  await Promise.all(
    imageFiles.map(async (file) => {
      const rawPath = path.join(baseDirectory, file);
      const fileName = path.parse(file).name;
      const fileDir = path.dirname(file);
      const destDir = path.join(path.resolve(), ".generated", fileDir);

      await fs.ensureDir(destDir);

      const destPath = path.join(destDir, `${fileName}.webp`);
      await sharp(rawPath).webp({ quality: 80 }).toFile(destPath);

      console.log(`Image Optimized: ${file} -> ${destPath}`);
    }),
  );

  // Write separate manifest per category and language
  await Promise.all(
    Object.entries(manifests).flatMap(([category, langManifests]) =>
      Object.entries(langManifests).map(async ([lang, articles]) => {
        await fs.outputJson(
          path.join(destination, category, lang, "manifest.json"),
          {
            articles: JSON.stringify(articles),
          },
        );
      }),
    ),
  );
}

async function buildArticle(text: string, file: string, lang: string) {
  const result = await parseMarkdown<ArticleFrontMatter>(text, file);

  if (result === null) {
    console.warn("Invalid frontmatter", text.substring(0, 30));
    return null;
  }

  const { html, attr } = result;

  // Try parsing multiple formats
  let date = dayjs(attr.date);
  if (!date.isValid() && typeof attr.date === "string") {
    // Attempt DD-MM-YYYY manually if dayjs fails
    const match = attr.date.match(/^(\d{2})-(\d{2})-(\d{4})$/);
    if (match) {
      date = dayjs(`${match[3]}-${match[2]}-${match[1]}`);
    }
  }

  if (!date.isValid()) {
    console.warn(`Invalid date format in ${file}:`, attr.date);
    return null;
  }

  // Normalize to YYYY-MM-DD for internal storage and consistent sorting
  const normalizedDate = date.format("YYYY-MM-DD");

  const article: Article = {
    id: attr.id,
    lang,
    title: attr.title,
    subtitle: attr.subtitle,
    lastUpdatedAt: normalizedDate,
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
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeKatex)
    .use(() => (tree) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      visit(tree, "element", (node: any) => {
        if (node.tagName === "img" && node.properties?.src) {
          const src = node.properties.src as string;
          if (
            !src.startsWith("http") &&
            !src.startsWith("data:") &&
            !src.startsWith("/")
          ) {
            // Resolve the image path relative to the markdown file within the articles directory
            const resolvedPath = path.join(path.dirname(filePath), src);
            const parsed = path.parse(resolvedPath);
            const newSrc = `/.generated/${parsed.dir}/${parsed.name}.webp`;
            node.properties.src = newSrc.replace(/\/\//g, "/");
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

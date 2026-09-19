import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalogPath = path.join(projectRoot, "app/generated/articles.json");
const assetDirectory = path.join(projectRoot, "public/generated");

test("prepare emits bundled article data and public image assets", async () => {
  const catalog = JSON.parse(await readFile(catalogPath, "utf8"));
  const collections = [
    catalog.archives?.ko,
    catalog.archives?.en,
    catalog.scuba?.ko,
    catalog.scuba?.en,
  ];

  for (const articles of collections) {
    assert.ok(Array.isArray(articles) && articles.length > 0);
  }

  const articleWithImage = collections
    .flat()
    .find((article) => article.content.includes("<img"));
  assert.ok(articleWithImage);
  assert.match(articleWithImage.content, /src="\/generated\//);
  assert.doesNotMatch(articleWithImage.content, /src="\/\.generated\//);

  const assets = await readdir(assetDirectory, { recursive: true });
  assert.ok(assets.some((file) => file.endsWith(".webp")));
});

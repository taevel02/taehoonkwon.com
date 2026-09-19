import path from "path";

import blogConfig from "../blog.config.ts";
import { prepareArticles } from "./utils/prepare-articles.ts";

const DIRNAME = path.resolve();

async function main() {
  await Promise.all([
    prepareArticles({
      from: path.join(DIRNAME, blogConfig.content.contentDirectory),
      dataFile: path.join(DIRNAME, blogConfig.content.generatedDataFile),
      assetDirectory: path.join(
        DIRNAME,
        blogConfig.content.generatedAssetDirectory,
      ),
    }),
  ]);
}

main().catch((error) => {
  console.error("Article preparation failed", error);
  process.exitCode = 1;
});

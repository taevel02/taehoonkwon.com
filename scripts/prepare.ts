import path from "path";

import blogConfig from "../blog.config.ts";
import { prepareArticles } from "./utils/prepare-articles.ts";

const DIRNAME = path.resolve();

async function main() {
  await Promise.all([
    prepareArticles({
      from: path.join(DIRNAME, blogConfig.content.contentDirectory),
      to: path.join(DIRNAME, blogConfig.content.generatedDirectory),
    }),
  ]);
}

main().catch((error) => {
  console.error("Article preparation failed", error);
  process.exitCode = 1;
});

import path from "path";

import blogConfig from "../blog.config.ts";
import { prepareArticles } from "./utils/prepare-articles.ts";

const DIRNAME = path.resolve();

(async () => {
  await Promise.all([
    prepareArticles({
      from: path.join(DIRNAME, blogConfig.archives.contentDirectory),
      to: path.join(DIRNAME, blogConfig.archives.generatedDirectory),
    }),
  ]);
})();

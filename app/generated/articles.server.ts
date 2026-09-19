import type { ArticleCatalog } from "~/types/articles";

const generatedCatalogs = import.meta.glob<ArticleCatalog>("./articles.json", {
  eager: true,
  import: "default",
});

const articleCatalog = generatedCatalogs["./articles.json"];

if (!articleCatalog) {
  throw new Error("Article catalog is missing. Run the prepare script first.");
}

export default articleCatalog;

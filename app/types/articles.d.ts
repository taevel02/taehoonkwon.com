export type ArticleCategory = "essay" | "retrospect";

export interface Article {
  id: string;
  lang: string;
  title: string;
  subtitle?: string;
  lastUpdatedAt: string;
  category: ArticleCategory;
  thumbnail?: string;
  content: string;
}

export interface ArticleFrontMatter {
  id: string;
  lang?: string;
  title: string;
  subtitle?: string;
  date: string;
  category: string;
  thumbnail?: string;
}

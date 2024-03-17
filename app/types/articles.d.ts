export type ArticleCategory = "essay" | "retrospect" | "tech";

export interface Article {
  id: string;
  title: string;
  subtitle?: string;
  lastUpdatedAt: string;
  category: ArticleCategory;
  thumbnail?: string;
  content: string;
}

export interface ArticleFrontMatter {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  category: string;
  thumbnail?: string;
}

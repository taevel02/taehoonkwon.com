export const ARCHIVE_CATEGORIES = ["essay", "retrospect"] as const;
export type ArchiveCategory = (typeof ARCHIVE_CATEGORIES)[number];

export const SCUBA_CATEGORIES = [
  "knowledge",
  "skill",
  "environment",
  "technical",
] as const;
export type ScubaCategory = (typeof SCUBA_CATEGORIES)[number];

export type ArticleCategory = ArchiveCategory | ScubaCategory;

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

import { getCollection } from "astro:content";

export const archiveCategories = ["essay", "retrospect"] as const;
export const scubaCategories = ["knowledge", "skill", "environment", "technical", "tips"] as const;

export async function getArticles(collection: "archives" | "scuba", category?: string) {
  const entries = await getCollection(collection);
  return entries
    .filter((entry) => !category || entry.data.category === category)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("ko-KR", { dateStyle: "long" }).format(date);
}

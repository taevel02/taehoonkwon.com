import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const articleSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  date: z.coerce.date(),
  category: z.string(),
  thumbnail: z.string().optional(),
});

const archives = defineCollection({
  loader: glob({ base: "./articles", pattern: "archives/ko/**/*.md" }),
  schema: articleSchema,
});

const scuba = defineCollection({
  loader: glob({ base: "./articles", pattern: "scuba/ko/**/*.md" }),
  schema: articleSchema,
});

export const collections = { archives, scuba };

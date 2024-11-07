import { MetaFunction, json } from "@remix-run/node";
import {
  Link,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "@remix-run/react";
import { useEffect, useState } from "react";

import { articleAPI } from "~/api/article";

import { formatDate } from "~/utils/format-date";
import { generateMeta } from "~/utils/generate-meta";

import blogConfig from "blog.config";

export const meta: MetaFunction = () => {
  return generateMeta({
    title: ["ARCHIVES", blogConfig.seo.title],
    description: blogConfig.seo.description,
  });
};

export async function loader() {
  return json(await articleAPI.getArticles());
}

export default function ArchivesPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const articles = useLoaderData<typeof loader>();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get("category")
  );

  const filteredArticles = selectedCategory
    ? articles.filter((article) => article.category === selectedCategory)
    : articles;

  const categories = Array.from(
    new Set(articles.map((article) => article.category))
  );

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    navigate(category ? `?category=${category}` : "");
  };

  useEffect(() => {
    const category = searchParams.get("category");
    if (category !== selectedCategory) {
      setSelectedCategory(category);
    }
  }, [searchParams, selectedCategory]);

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={() => handleCategoryChange(null)}
          className={`mr-3 ${selectedCategory === null ? "text-primary" : ""}`}
        >
          all
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`mr-3 ${
              selectedCategory === category ? "text-primary" : ""
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <ul className="transition-all duration-700 ease-in-out">
        {filteredArticles.map(
          ({ id, title, subtitle, lastUpdatedAt, category }, index) => (
            <li
              key={index}
              className="group block py-4 border-b-[0.1em] first:pt-0 last:pb-0 last:border-0"
            >
              <Link to={`/archives/${id}`} prefetch="intent">
                <p className="mb-2 text-sm text-primary underline">
                  {category}
                </p>
                <p className="text-xl group-hover:underline">{title}</p>
                <p className="mb-4 text-sm font-light">{subtitle}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(lastUpdatedAt)}
                </p>
              </Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

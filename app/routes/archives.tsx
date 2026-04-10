import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { articleAPI } from "~/api/article";

import { formatDate } from "~/utils/format-date";
import { generateMeta } from "~/utils/seo";
import { pathJoin } from "~/utils/string";

import blogConfig from "blog.config";

export const meta: MetaFunction = () => {
  return generateMeta({
    title: ["ARCHIVES", blogConfig.seo.title],
    description: blogConfig.seo.description,
    site: blogConfig.site,
    url: pathJoin(blogConfig.site, "archives"),
  });
};

const categories = ["retrospect", "essay"] as const;

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const selectedCategory = url.searchParams.get("category");
  const articles = await articleAPI.getArticles(selectedCategory);
  return { articles, selectedCategory };
}

export default function ArchivesPage() {
  const { articles, selectedCategory } = useLoaderData<typeof loader>();

  return (
    <div>
      <div className="mb-6 flex gap-4">
        <Link
          to="/archives"
          prefetch="intent"
          viewTransition
          className={`inline-block transition-colors ${
            !selectedCategory
              ? "text-primary font-medium"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          all
        </Link>
        {categories.map((category) => (
          <Link
            key={category}
            to={`/archives?category=${category}`}
            prefetch="intent"
            viewTransition
            className={`inline-block transition-colors ${
              selectedCategory === category
                ? "text-primary font-medium"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {category}
          </Link>
        ))}
      </div>
      <ul>
        {articles.map(({ id, title, subtitle, lastUpdatedAt, category }) => (
          <li
            key={id}
            className="group block py-4 border-b-[0.1em] first:pt-0 last:pb-0 last:border-0"
          >
            <Link to={`/archives/${id}`} prefetch="intent" viewTransition>
              <p className="mb-2 text-sm text-primary underline">{category}</p>
              <p className="text-xl group-hover:underline">{title}</p>
              <p className="mb-4 text-sm font-light">{subtitle}</p>
              <p className="text-xs text-muted-foreground">
                {formatDate(lastUpdatedAt)}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

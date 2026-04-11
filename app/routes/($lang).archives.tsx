import { LoaderFunctionArgs, MetaFunction, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { articleAPI } from "~/api/article";
import { getLanguage, getLocalizedPath } from "~/utils/i18n";
import { formatDate } from "~/utils/format-date";
import { generateMeta } from "~/utils/seo";
import { pathJoin } from "~/utils/string";

import blogConfig from "blog.config";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const lang = data?.lang === "en" ? "en" : "ko";
  return generateMeta({
    title: ["ARCHIVES", blogConfig.seo[lang].title],
    description: blogConfig.seo[lang].description,
    site: blogConfig.site,
    url: pathJoin(blogConfig.site, lang === "ko" ? "archives" : "en/archives"),
  });
};

const categories = ["retrospect", "essay"] as const;

export async function loader({ request, params }: LoaderFunctionArgs) {
  const lang = getLanguage(request, params.lang);
  const url = new URL(request.url);

  const redirectPath = getLocalizedPath(url.pathname, lang);
  if (redirectPath) {
    return redirect(redirectPath + url.search);
  }

  const selectedCategory = url.searchParams.get("category");
  const articles = await articleAPI.getArticles(lang, selectedCategory);
  return { articles, selectedCategory, lang };
}

export default function ArchivesPage() {
  const { articles, selectedCategory, lang } = useLoaderData<typeof loader>();
  const prefix = lang === "ko" ? "" : `/${lang}`;

  return (
    <div>
      <div className="mb-6 flex gap-4">
        <Link
          to={`${prefix}/archives`}
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
            to={`${prefix}/archives?category=${category}`}
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
            <Link
              to={`${prefix}/archives/${id}`}
              prefetch="intent"
              viewTransition
            >
              <p className="mb-2 text-sm text-primary underline">{category}</p>
              <p className="text-xl group-hover:underline">{title}</p>
              <p className="mb-4 text-sm font-light">{subtitle}</p>
              <p className="text-xs text-muted-foreground">
                {formatDate(lastUpdatedAt, lang)}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

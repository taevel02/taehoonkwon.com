import { LoaderFunctionArgs, MetaFunction, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import blogConfig from "blog.config";

import { articleAPI } from "~/api/article";

import { getLanguage, getLocalizedPath } from "~/utils/i18n";
import { generateMeta } from "~/utils/seo";
import { pathJoin } from "~/utils/string";

import { CategoryNav } from "~/components/CategoryNav";
import { ArticleListItem } from "~/components/ArticleListItem";
import { EmptyState } from "~/components/EmptyState";

import { ARCHIVE_CATEGORIES } from "~/types/articles";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const lang = data?.lang === "en" ? "en" : "ko";
  return generateMeta({
    title: ["ARCHIVES", blogConfig.seo[lang].title],
    description: blogConfig.seo[lang].description,
    site: blogConfig.site,
    url: pathJoin(blogConfig.site, lang === "ko" ? "archives" : "en/archives"),
  });
};

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
  const baseUrl = `${prefix}/archives`;

  return (
    <div>
      <CategoryNav
        categories={ARCHIVE_CATEGORIES}
        selectedCategory={selectedCategory}
        baseUrl={baseUrl}
      />
      {articles.length === 0 ? (
        <EmptyState
          title={lang === "ko" ? "글이 없습니다" : "No articles found"}
          description={
            selectedCategory
              ? lang === "ko"
                ? `'${selectedCategory}' 카테고리에 아직 등록된 글이 없습니다.`
                : `There are no articles in the '${selectedCategory}' category yet.`
              : lang === "ko"
                ? "아직 등록된 글이 없습니다."
                : "No articles have been posted yet."
          }
          action={
            selectedCategory ? (
              <Link
                to={baseUrl}
                className="text-primary hover:underline"
                viewTransition
              >
                {lang === "ko" ? "모든 카테고리 보기" : "View all categories"}
              </Link>
            ) : undefined
          }
        />
      ) : (
        <ul className="animate-fade-in">
          {articles.map((article) => (
            <ArticleListItem
              key={article.id}
              article={article}
              baseUrl={baseUrl}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

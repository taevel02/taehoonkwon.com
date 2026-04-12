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

import { SCUBA_CATEGORIES } from "~/types/articles";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const lang = data?.lang === "en" ? "en" : "ko";
  return generateMeta({
    title: ["SCUBA", blogConfig.seo[lang].title],
    description: "Scuba diving educational content and sessions.",
    site: blogConfig.site,
    url: pathJoin(blogConfig.site, lang === "ko" ? "scuba" : "en/scuba"),
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
  // Fetch from 'scuba' folder
  const articles = await articleAPI.getArticles(
    lang,
    selectedCategory,
    "scuba",
  );
  return { articles, selectedCategory, lang };
}

export default function ScubaPage() {
  const { articles, selectedCategory, lang } = useLoaderData<typeof loader>();
  const prefix = lang === "ko" ? "" : `/${lang}`;
  const baseUrl = `${prefix}/scuba`;

  return (
    <div>
      <div className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-serif font-medium">SCUBA DIVING</h1>
        <p className="text-muted-foreground mt-2">
          {lang === "ko"
            ? "스쿠버 다이빙과 관련된 지식과 경험을 공유합니다."
            : "Sharing knowledge and experiences related to scuba diving."}
        </p>
      </div>

      <CategoryNav
        categories={SCUBA_CATEGORIES}
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

import { LoaderFunctionArgs, MetaFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import blogConfig from "blog.config";

import { articleAPI } from "~/api/article";
import { getLanguage, getLocalizedPath } from "~/utils/i18n";
import { generateMeta } from "~/utils/seo";
import { pathJoin, clamp, toPlainText } from "~/utils/string";
import invariant from "~/utils/invariant";

import { ArticleHeader } from "~/components/ArticleHeader";

import "~/styles/article.css";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const { id, title } = data?.article ?? {};
  const lang = data?.lang === "en" ? "en" : "ko";

  if (!id || !title) return [];

  const description = clamp(toPlainText(data?.article.content ?? ""));

  return generateMeta({
    title: [title, "ARCHIVES", blogConfig.seo[lang].title],
    description: description || blogConfig.seo[lang].description,
    author: blogConfig.author,
    site: blogConfig.site,
    url: pathJoin(
      blogConfig.site,
      lang === "ko" ? "archives" : "en/archives",
      id.toString(),
    ),
    image: pathJoin(
      blogConfig.site,
      `resource/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(data?.article.subtitle || "")}`,
    ),
  });
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  const lang = getLanguage(request, params.lang);
  const id = params.id;
  invariant(id !== undefined, "'id' is required");

  const url = new URL(request.url);

  const redirectPath = getLocalizedPath(url.pathname, lang);
  if (redirectPath) {
    return redirect(redirectPath + url.search);
  }

  const [article] = await Promise.all([articleAPI.getArticle(lang, id)]);
  if (article === null) return redirect("/404");

  return { article, lang };
}

export default function ArchivePage() {
  const {
    article: { category, title, subtitle, lastUpdatedAt, content },
    lang,
  } = useLoaderData<typeof loader>();

  return (
    <div className="animate-fade-in">
      <ArticleHeader
        title={title}
        subtitle={subtitle}
        category={category}
        date={lastUpdatedAt}
        lang={lang}
      />
      <article dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

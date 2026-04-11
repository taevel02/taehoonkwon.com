import {
  type LoaderFunctionArgs,
  MetaFunction,
  redirect,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { articleAPI } from "~/api/article";

import { Badge } from "~/components/ui/Badge";

import { formatDate } from "~/utils/format-date";
import invariant from "~/utils/invariant";
import { generateMeta } from "~/utils/seo";
import { pathJoin, clamp, toPlainText } from "~/utils/string";

import blogConfig from "blog.config";
import "~/styles/article.css";

import { getLanguage } from "~/utils/i18n";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const { id, title } = data?.article ?? {};
  const lang = data?.lang === "en" ? "en" : "ko";

  if (!id || !title) return [];

  const description = clamp(toPlainText(data?.article.content ?? ""));

  return generateMeta({
    title: [title, blogConfig.seo[lang].title],
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
  // Auto-redirect exclusively to /en/archives/:id for non-Korean users accessing the root
  if (lang === "en" && !params.lang && url.pathname.startsWith("/archives/")) {
    return redirect(`/en${url.pathname}${url.search}`);
  }

  const [article] = await Promise.all([articleAPI.getArticle(lang, id)]);
  if (article === null) return redirect("/404");

  return { article, lang };
}

export default function ArchivePage() {
  const {
    article: { category, title, subtitle, lastUpdatedAt, content },
  } = useLoaderData<typeof loader>();

  return (
    <div>
      <div className="mb-20">
        <div className="flex flex-row items-center gap-2">
          <Badge variant="outline">{category}</Badge>
          {subtitle && (
            <h2 className="text-xs text-muted-foreground">{subtitle}</h2>
          )}
        </div>
        <h1 className="block text-4xl leading-relaxed font-medium font-serif mt-2 text-wrap">
          {title}
        </h1>
        <span className="block text-right text-sm text-muted-foreground">
          {formatDate(lastUpdatedAt)}
        </span>
      </div>
      <article dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

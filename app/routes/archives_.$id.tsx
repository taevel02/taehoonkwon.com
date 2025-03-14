import {
  type LoaderFunctionArgs,
  json,
  MetaFunction,
  redirect,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { articleAPI } from "~/api/article";

import { Badge } from "~/components/ui/Badge";

import { generateMeta } from "~/utils/generate-meta";
import { formatDate } from "~/utils/format-date";
import invariant from "~/utils/invariant";
import { pathJoin } from "~/utils/path";

import blogConfig from "blog.config";
import "~/styles/article.css";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const { id, title } = data?.article ?? {};
  invariant(id !== undefined, "'id' is required");
  invariant(title !== undefined, "'title' is required");

  return generateMeta({
    title: [title, blogConfig.seo.title],
    description:
      data?.article.content.slice(0, 500) ?? blogConfig.seo.description,
    author: blogConfig.author,
    site: blogConfig.site,
    url: pathJoin(blogConfig.site, "archives", id.toString()),
  });
};

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.id;
  invariant(id !== undefined, "'id' is required");

  const [article] = await Promise.all([articleAPI.getArticle(id)]);
  if (article === null) return redirect("/404");

  return json({ article });
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

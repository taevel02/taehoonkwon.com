import {
  type LoaderFunctionArgs,
  json,
  MetaFunction,
  redirect,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import blogConfig from "blog.config";

import { articleAPI } from "~/api/article";

import { Badge } from "~/components/ui/Badge";

import { generateMeta } from "~/utils/meta/generate-meta";
import { formatDate } from "~/utils/formatDate";
import invariant from "~/utils/invariant";

import "~/styles/article.css";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const { title } = data?.article ?? {};
  invariant(title !== undefined, "'title' is required");

  return generateMeta({
    title: [title, blogConfig.seo.title],
    description: blogConfig.seo.description,
    image: blogConfig.image.main,
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

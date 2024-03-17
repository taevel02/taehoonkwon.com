import { MetaFunction, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import blogConfig from "blog.config";

import { articleAPI } from "~/api/article";

import { formatDate } from "~/utils/formatDate";
import { generateMeta } from "~/utils/meta/generate-meta";
import { pathJoin } from "~/utils/path";

export const meta: MetaFunction = () => {
  return generateMeta({
    title: ["ARCHIVES", blogConfig.seo.title],
    description: blogConfig.seo.description,
    image: pathJoin(blogConfig.site, blogConfig.image.main),
  });
};

export const loader = async () => {
  return json(await articleAPI.getArticles());
};

export default function ArchivesPage() {
  const articles = useLoaderData<typeof loader>();

  return (
    <div>
      <ul>
        {articles.map(
          ({ id, title, subtitle, lastUpdatedAt, category }, index) => (
            <li
              key={index}
              className="group block py-4 border-b-[0.1em] first:pt-0 last:pb-0 last:border-0"
            >
              <Link to={`/archives/${id}`} prefetch="intent">
                <p className="mb-2 text-sm text-blue-300 underline">
                  {category}
                </p>
                <p className="text-xl group-hover:underline">{title}</p>
                <p className="mb-4 text-sm font-light">{subtitle}</p>
                <p className="text-xs text-gray-400">
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

import { MetaFunction, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import blogConfig from "blog.config";
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
  return json({
    archives: [{ id: "1", title: "First post" }],
  });
};

export default function ArchivesPage() {
  const { archives } = useLoaderData<typeof loader>();

  return (
    <div className="">
      <p className="text-wrap">Coming soon...</p>
      <ul>
        {archives.map((post, index) => (
          <li key={index}>
            <Link
              to={`/archives/${post.id}`}
              className="text-blue-600"
              prefetch="intent"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

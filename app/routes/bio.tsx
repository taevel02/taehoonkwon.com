import { MetaFunction } from "@remix-run/node";
import blogConfig from "blog.config";
import { generateMeta } from "~/utils/meta/generate-meta";
import { pathJoin } from "~/utils/path";

export const meta: MetaFunction = () => {
  return generateMeta({
    title: ["BIO", blogConfig.seo.title],
    description: blogConfig.seo.description,
    image: pathJoin(blogConfig.site, blogConfig.image.main),
  });
};

export default function BioPage() {
  return (
    <div className="">
      <h1 className="text-3xl font-medium mb-6">Bio</h1>
      <p className="text-wrap">{blogConfig.bio}</p>
    </div>
  );
}

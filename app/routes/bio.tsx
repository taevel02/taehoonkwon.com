import { MetaFunction } from "@remix-run/node";

import { generateMeta } from "~/utils/generate-meta";

import blogConfig from "blog.config";

export const meta: MetaFunction = () => {
  return generateMeta({
    title: ["BIO", blogConfig.seo.title],
    description: blogConfig.seo.description,
  });
};

export default function BioPage() {
  return (
    <div className="">
      <h1 className="text-3xl font-medium mb-6">Bio</h1>
      <p
        className="text-wrap [&>a]:text-primary"
        dangerouslySetInnerHTML={{ __html: blogConfig.bio }}
      />
    </div>
  );
}

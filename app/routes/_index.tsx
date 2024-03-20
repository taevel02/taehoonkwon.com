import { MetaFunction } from "@remix-run/node";

import Contact from "~/components/Contact";
import { generateMeta } from "~/utils/generate-meta";

import blogConfig from "blog.config";

export const meta: MetaFunction = () => {
  return generateMeta({
    title: ["ABOUT", blogConfig.seo.title],
    description: blogConfig.seo.description,
  });
};

export default function Index() {
  return (
    <div className="">
      <h1 className="text-3xl font-medium mb-6">
        권태훈 (Taehoon Kwon, 權泰勳)
      </h1>
      <Contact />
      <p
        className="text-wrap"
        dangerouslySetInnerHTML={{ __html: blogConfig.hero }}
      />
    </div>
  );
}

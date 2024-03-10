import { MetaFunction } from "@remix-run/node";
import blogConfig from "blog.config";
import { generateMeta } from "~/utils/meta/generate-meta";
import { pathJoin } from "~/utils/path";

export const meta: MetaFunction = () => {
  return generateMeta({
    title: ["ABOUT", blogConfig.seo.title],
    description: blogConfig.seo.description,
    image: pathJoin(blogConfig.site, blogConfig.image.main),
  });
};

export default function Index() {
  return (
    <div className="">
      <h1 className="text-3xl font-medium mb-6">
        권태훈 (Taehoon Kwon, 權泰勳)
      </h1>
      {/* <Contact /> */}
      <p className="text-wrap">{blogConfig.hero}</p>
    </div>
  );
}

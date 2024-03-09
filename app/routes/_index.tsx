import { type MetaFunction } from "@remix-run/node";
import blogConfig from "blog.config";
import { generateMeta } from "~/utils/meta/generate-meta";
import { pathJoin } from "~/utils/path";

export const meta: MetaFunction = () => {
  return generateMeta({
    title: [blogConfig.seo.title],
    description: blogConfig.seo.description,
    image: pathJoin(blogConfig.site, blogConfig.image.main),
  });
};

export default function Index() {
  return (
    <div className="">
      <h6 className="text-2xl font-medium">권태훈 (Taehoon Kwon, 權泰勳)</h6>
      {/* <Contact /> */}
      {/* <Hero /> */}
    </div>
  );
}

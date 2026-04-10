import { generateRobotsTxt } from "~/utils/seo";

export function loader() {
  return generateRobotsTxt([
    { type: "sitemap", value: "https://taehoonkwon.com/sitemap.xml" },
  ]);
}

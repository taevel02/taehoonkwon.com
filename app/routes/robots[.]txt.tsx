import { generateRobotsTxt } from "~/utils/generate-robotstxt";

export function loader() {
  return generateRobotsTxt([
    { type: "sitemap", value: "https://taehoonkwon.com/sitemap.xml" },
  ]);
}

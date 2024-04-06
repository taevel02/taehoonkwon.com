import { routes } from "@remix-run/dev/server-build";
import { LoaderFunctionArgs } from "@remix-run/node";
import { generateSitemap } from "~/utils/generate-sitemap";

export function loader({ request }: LoaderFunctionArgs) {
  return generateSitemap(request, routes, {
    siteUrl: "https://taehoonkwon.com",
  });
}

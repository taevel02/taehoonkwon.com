import { routes } from "virtual:remix/server-build";
import { LoaderFunctionArgs } from "@remix-run/node";
import { generateSitemap } from "~/utils/seo";

export function loader({ request }: LoaderFunctionArgs) {
  return generateSitemap(request, routes, {
    siteUrl: "https://taehoonkwon.com",
  });
}

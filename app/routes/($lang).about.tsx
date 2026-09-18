import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { getLanguage } from "~/utils/i18n";

export function loader({ request, params }: LoaderFunctionArgs) {
  const lang = getLanguage(request, params.lang);
  const url = new URL(request.url);
  return redirect(`${lang === "en" ? "/en" : "/"}${url.search}`);
}

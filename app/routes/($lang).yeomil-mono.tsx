import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { getLanguage } from "~/utils/i18n";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const lang = getLanguage(request, params.lang);
  const url = new URL(request.url);
  return redirect(`${lang === "en" ? "/en" : ""}/products/font/yeomil-mono${url.search}`, 301);
}

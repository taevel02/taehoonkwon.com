import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

export function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const lang = url.searchParams.get("lang");
  if (lang !== "ko" && lang !== "en") {
    throw new Response("Not Found", { status: 404 });
  }

  const next = url.searchParams.get("next") || "/";
  if (!next.startsWith("/") || next.startsWith("//") || next.includes("\\")) {
    throw new Response("Invalid destination", { status: 400 });
  }

  return redirect(next, {
    headers: {
      "Set-Cookie": `lang=${lang}; Path=/; Max-Age=31536000; SameSite=Lax; HttpOnly`,
    },
  });
}

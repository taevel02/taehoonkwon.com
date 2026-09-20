import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import blogConfig from "blog.config";

import Contact from "~/components/Contact";
import { getLanguage, getLocalizedPath } from "~/utils/i18n";
import { generateMeta } from "~/utils/seo";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const lang = getLanguage(request, params.lang);
  const url = new URL(request.url);
  const localized = getLocalizedPath(url.pathname);
  if (localized) return redirect(localized + url.search);
  return { lang };
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const lang = data?.lang === "en" ? "en" : "ko";
  return generateMeta({
    title: ["ABOUT", blogConfig.seo[lang].title],
    description: blogConfig.seo[lang].description,
    author: blogConfig.author,
    url: lang === "ko" ? blogConfig.site : `${blogConfig.site}/en`,
  });
};

export default function AboutPage() {
  const { lang } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1 className="mb-6 text-3xl font-medium">
        {lang === "ko" ? "권태훈 (權泰勳)" : "Taehoon (Theo) Kwon"}
      </h1>
      <Contact />
      <p className="mt-8 text-wrap leading-relaxed [&_a]:text-primary" dangerouslySetInnerHTML={{ __html: blogConfig.about[lang] }} />
    </div>
  );
}

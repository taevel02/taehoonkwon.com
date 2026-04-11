import { LoaderFunctionArgs, MetaFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Contact from "~/components/Contact";
import { generateMeta } from "~/utils/seo";
import blogConfig from "blog.config";
import { getLanguage } from "~/utils/i18n";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const lang = getLanguage(request, params.lang);

  const url = new URL(request.url);
  // Auto-redirect exclusively to /en for non-Korean users accessing the root
  if (lang === "en" && !params.lang && url.pathname === "/") {
    return redirect(`/en`);
  }

  return { lang };
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const lang = data?.lang === "en" ? "en" : "ko";
  return generateMeta({
    title: ["ABOUT", blogConfig.seo[lang].title],
    description: blogConfig.seo[lang].description,
  });
};

export default function Index() {
  const { lang } = useLoaderData<typeof loader>();
  const l = lang === "en" ? "en" : "ko";

  return (
    <div className="">
      <h1 className="text-3xl font-medium mb-6">
        {l === "ko" ? "권태훈 (Taehoon Kwon, 權泰勳)" : "Taehoon Kwon"}
      </h1>
      <Contact />
      <p
        className="text-wrap mt-8 leading-relaxed [&_a]:text-primary"
        dangerouslySetInnerHTML={{ __html: blogConfig.about[l] }}
      />
    </div>
  );
}

import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import blogConfig from "blog.config";
import { products, productPath } from "~/products/catalog";
import { getLanguage, getLocalizedPath } from "~/utils/i18n";
import { generateMeta } from "~/utils/seo";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const lang = getLanguage(request, params.lang);
  const url = new URL(request.url);
  const localized = getLocalizedPath(url.pathname, lang);
  if (localized) return redirect(localized + url.search);
  return { lang };
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const lang = data?.lang === "en" ? "en" : "ko";
  return generateMeta({
    title: [blogConfig.seo[lang].title],
    description: lang === "ko" ? "Taehoon Kwon이 만드는 앱, 웹서비스, 글" : "Apps, web services, and writing by Taehoon Kwon",
    author: blogConfig.author,
    url: lang === "ko" ? blogConfig.site : `${blogConfig.site}/en`,
  });
};

export default function HomePage() {
  const { lang } = useLoaderData<typeof loader>();
  const prefix = lang === "en" ? "/en" : "";
  return (
    <div className="pb-16">
      <header className="mb-12 border-b pb-10">
        <h1 className="text-3xl font-medium sm:text-4xl">Taehoon Kwon</h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
          {lang === "ko" ? "앱과 웹서비스를 만들고, 배운 것을 글로 남깁니다." : "I build apps and web services, and write about what I learn."}
        </p>
      </header>
      <section aria-labelledby="products-heading">
        <div className="mb-4 flex items-baseline justify-between gap-3">
          <h2 id="products-heading" className="text-xl font-medium">Products</h2>
          <Link to={`${prefix}/products`} className="text-sm text-primary focus-visible:ring-2 focus-visible:ring-primary">{lang === "ko" ? "모두 보기" : "View all"} ↗</Link>
        </div>
        <ul className="divide-y border-y">
          {products.map((product) => (
            <li key={product.slug}>
              <Link to={productPath(product, lang)} className="block py-5 focus-visible:ring-2 focus-visible:ring-primary">
                <span className="text-xs uppercase text-muted-foreground">{product.type === "web" ? "Web service" : product.type === "font" ? "Font" : "App"}</span>
                <h3 className="mt-1 text-lg font-medium">{product.name}</h3>
                <p className="mt-1 text-muted-foreground">{product.tagline[lang]}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <nav aria-label={lang === "ko" ? "다른 주제" : "Other topics"} className="mt-10 flex gap-6 text-sm">
        <Link to={`${prefix}/archives`} className="text-primary">Writing ↗</Link>
        <Link to={`${prefix}/scuba`} className="text-primary">Scuba ↗</Link>
        <Link to={`${prefix}/about`} className="text-primary">About ↗</Link>
      </nav>
    </div>
  );
}

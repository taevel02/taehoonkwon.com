import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import blogConfig from "blog.config";
import { products, productPath } from "~/products/catalog";
import { getLanguage, getLocalizedPath } from "~/utils/i18n";
import { generateMeta } from "~/utils/seo";

export const handle = {
  getSitemapEntries: () => [
    { route: "/products" },
    { route: "/en/products" },
  ],
};

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
    title: ["Products", blogConfig.seo[lang].title],
    description: lang === "ko" ? "Taehoon Kwon이 만든 앱, 웹서비스, 서체" : "Apps, web services, and fonts by Taehoon Kwon",
    url: `${blogConfig.site}${lang === "en" ? "/en" : ""}/products`,
  });
};

export default function ProductsPage() {
  const { lang } = useLoaderData<typeof loader>();
  return (
    <div className="pb-16">
      <header className="mb-8 border-b pb-5">
        <h1 className="text-3xl font-medium">Products</h1>
        <p className="mt-2 text-muted-foreground">{lang === "ko" ? "만들고 운영하는 제품들" : "Products I make and maintain"}</p>
      </header>
      <ul className="divide-y">
        {products.map((product) => (
          <li key={product.slug}>
            <Link to={productPath(product, lang)} className="group block py-6 focus-visible:ring-2 focus-visible:ring-primary">
              <span className="text-xs uppercase text-muted-foreground">{product.type === "web" ? "Web service" : product.type === "font" ? "Font" : "App"}</span>
              <div className="mt-1 flex items-baseline justify-between gap-4">
                <h2 className="text-xl font-medium group-hover:text-primary">{product.name}</h2>
                <span aria-hidden="true">↗</span>
              </div>
              <p className="mt-2 text-muted-foreground leading-relaxed">{product.tagline[lang]}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

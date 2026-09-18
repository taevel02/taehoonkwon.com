import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import blogConfig from "blog.config";
import { getProduct, productPath, products } from "~/products/catalog";
import { getLanguage, getLocalizedPath } from "~/utils/i18n";
import { generateMeta } from "~/utils/seo";

export const handle = {
  getSitemapEntries: () => products.flatMap((product) => {
    if (product.type !== "app") return [];
    return (["ko", "en"] as const).flatMap((lang) => [
      product.support && { route: `${productPath(product, lang)}/support` },
      product.privacy && { route: `${productPath(product, lang)}/privacy` },
    ].filter((entry) => entry !== undefined));
  }),
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  const lang = getLanguage(request, params.lang);
  const product = getProduct(params.type, params.slug);
  const document = params.document;
  if (!product || product.type !== "app" ||
      (document !== "support" && document !== "privacy") ||
      !product[document]) {
    throw new Response("Not Found", { status: 404 });
  }
  const url = new URL(request.url);
  const localized = getLocalizedPath(url.pathname, lang);
  if (localized) return redirect(localized + url.search);
  return { lang, product, document };
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return [];
  const title = data.document === "support" ? "Support" : "Privacy Policy";
  return generateMeta({
    title: [title, data.product.name, blogConfig.seo[data.lang].title],
    description: `${data.product.name} ${title}`,
    url: `${blogConfig.site}${productPath(data.product, data.lang)}/${data.document}`,
  });
};

export default function ProductDocumentPage() {
  const { lang, product, document } = useLoaderData<typeof loader>();
  const title = document === "support" ? "Support" : "Privacy Policy";
  return (
    <article className="pb-16">
      <Link to={productPath(product, lang)} className="text-sm text-muted-foreground hover:text-primary">← {product.name}</Link>
      <h1 className="my-8 border-b pb-5 text-3xl font-medium">{title}</h1>
      {document === "support" && product.support ? (
        <div className="space-y-5 leading-8">
          <p>{product.support.instructions[lang]}</p>
          <a className="text-primary underline" href={`mailto:${product.support.email}`}>{product.support.email}</a>
        </div>
      ) : product.privacy ? (
        <div className="space-y-8 leading-8">
          <p className="text-sm text-muted-foreground">{lang === "ko" ? "최종 수정" : "Last updated"}: {product.privacy.updated}</p>
          {product.privacy.sections.map((section) => (
            <section key={section.heading.en}>
              <h2 className="mb-2 text-xl font-medium">{section.heading[lang]}</h2>
              <p>{section.body[lang]}</p>
            </section>
          ))}
        </div>
      ) : null}
    </article>
  );
}

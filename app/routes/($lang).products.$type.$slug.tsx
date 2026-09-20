import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import blogConfig from "blog.config";
import { getProduct, productPath, products } from "~/products/catalog";
import { ProductDetail } from "~/products/ProductDetail";
import { getLanguage, getLocalizedPath } from "~/utils/i18n";
import { generateMeta } from "~/utils/seo";

export const handle = {
  getSitemapEntries: () => products.flatMap((product) => [
    { route: productPath(product, "ko") },
    { route: productPath(product, "en") },
  ]),
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  const lang = getLanguage(request, params.lang);
  const product = getProduct(params.type, params.slug);
  if (!product) throw new Response("Not Found", { status: 404 });
  const url = new URL(request.url);
  const localized = getLocalizedPath(url.pathname);
  if (localized) return redirect(localized + url.search);
  return { lang, product };
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return [];
  return generateMeta({
    title: [data.product.name, blogConfig.seo[data.lang].title],
    description: data.product.description[data.lang],
    url: `${blogConfig.site}${productPath(data.product, data.lang)}`,
  });
};

export default function ProductPage() {
  const { lang, product } = useLoaderData<typeof loader>();
  return <ProductDetail product={product} lang={lang} />;
}

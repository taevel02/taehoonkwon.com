import { Link } from "@remix-run/react";
import { productPath, type Product, type ProductLanguage } from "./catalog";
import { YeomilSpecimen } from "./YeomilSpecimen";

const typeNames = {
  ko: { app: "앱", web: "웹서비스", font: "서체" },
  en: { app: "App", web: "Web service", font: "Font" },
};

export function ProductDetail({ product, lang }: { product: Product; lang: ProductLanguage }) {
  const prefix = lang === "en" ? "/en" : "";

  return (
    <article className="pb-16">
      <Link to={`${prefix}/products`} className="inline-block mb-8 text-sm text-muted-foreground hover:text-primary focus-visible:ring-2 focus-visible:ring-primary">
        ← {lang === "ko" ? "모든 제품" : "All products"}
      </Link>
      <header className="mb-10 border-b pb-8">
        <p className="mb-3 text-sm text-muted-foreground">{typeNames[lang][product.type]}</p>
        <h1 className="mb-3 text-3xl font-medium sm:text-4xl">{product.name}</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">{product.tagline[lang]}</p>
      </header>
      <p className="mb-10 leading-8">{product.description[lang]}</p>
      <section aria-labelledby="features-title" className="mb-10">
        <h2 id="features-title" className="mb-4 text-xl font-medium">{lang === "ko" ? "주요 내용" : "Highlights"}</h2>
        <ul className="divide-y border-y">
          {product.features.map((feature) => (
            <li key={feature.title.en} className="py-4 sm:grid sm:grid-cols-[11rem_1fr] sm:gap-4">
              <h3 className="font-medium">{feature.title[lang]}</h3>
              <p className="mt-1 text-muted-foreground sm:mt-0">{feature.description[lang]}</p>
            </li>
          ))}
        </ul>
      </section>
      {product.slug === "yeomil-mono" && <YeomilSpecimen lang={lang} />}
      <section aria-labelledby="links-title" className="mt-10 border-t pt-8">
        <h2 id="links-title" className="mb-4 text-xl font-medium">{lang === "ko" ? "이용하기" : "Get started"}</h2>
        <div className="flex flex-wrap gap-3">
          {[product.primaryLink, product.secondaryLink].filter((link) => link !== undefined).map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-md border px-4 text-sm hover:border-primary active:scale-[.97] focus-visible:ring-2 focus-visible:ring-primary">
              {link.label[lang]} ↗
            </a>
          ))}
        </div>
      </section>
      {product.type === "app" && (product.support || product.privacy) && (
        <nav aria-label={lang === "ko" ? "앱 문서" : "App documents"} className="mt-8 flex gap-5 border-t pt-5 text-sm">
          {product.support && <Link to={`${productPath(product, lang)}/support`} className="text-primary">{lang === "ko" ? "지원" : "Support"}</Link>}
          {product.privacy && <Link to={`${productPath(product, lang)}/privacy`} className="text-primary">{lang === "ko" ? "개인정보 보호" : "Privacy Policy"}</Link>}
        </nav>
      )}
    </article>
  );
}

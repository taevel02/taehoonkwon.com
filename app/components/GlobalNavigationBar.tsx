import type { ReactNode } from "react";
import { Link, NavLink, useLocation } from "@remix-run/react";

export function GlobalNavigationBar() {
  const location = useLocation();
  const lang = location.pathname === "/en" || location.pathname.startsWith("/en/") ? "en" : "ko";
  const prefix = lang === "en" ? "/en" : "";
  const links = [
    { to: `${prefix}/products`, label: "Products" },
    { to: `${prefix}/archives`, label: "Writing" },
    { to: `${prefix}/scuba`, label: "Scuba" },
    { to: prefix || "/", label: "About" },
  ];

  function languageHref(target: "ko" | "en") {
    const current = location.pathname.replace(/^\/(en|ko)(?=\/|$)/, "") || "/";
    const destination = target === "en" ? (current === "/" ? "/en" : `/en${current}`) : current;
    return `/set-language?lang=${target}&next=${encodeURIComponent(destination + location.search + location.hash)}`;
  }

  const nextLanguage = lang === "ko" ? "en" : "ko";
  const languageControl = (
    <a
      href={languageHref(nextLanguage)}
      aria-label={lang === "ko" ? "Switch to English" : "한국어로 전환"}
      className="inline-flex shrink-0 rounded-full bg-muted p-1 text-xs focus-visible:ring-2 focus-visible:ring-primary active:scale-[.97]"
    >
      {(["ko", "en"] as const).map((target) => (
        <span
          key={target}
          aria-hidden="true"
          className={`flex min-h-9 min-w-10 items-center justify-center rounded-full px-2 font-medium ${lang === target ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
        >
          {target.toUpperCase()}
        </span>
      ))}
    </a>
  );

  return (
    <nav aria-label={lang === "ko" ? "주 메뉴" : "Main navigation"} className="relative mt-6 mb-10 sm:mt-7 sm:mb-14">
      <div className="hidden items-center justify-between gap-4 sm:flex">
        <ul className="flex list-none items-center gap-5 p-0 leading-10 md:gap-8">
          {links.map((link) => <NavItem key={link.label} to={link.to}>{link.label}</NavItem>)}
        </ul>
        {languageControl}
      </div>
      <div className="flex items-center justify-between gap-3 sm:hidden">
        <Link to={prefix || "/"} className="min-w-0 truncate text-sm font-semibold tracking-tight focus-visible:ring-2 focus-visible:ring-primary">Taehoon Kwon</Link>
        <div className="flex shrink-0 items-center gap-2">
          {languageControl}
          <details key={location.pathname} className="group">
            <summary aria-label={lang === "ko" ? "메뉴" : "Menu"} className="flex size-11 cursor-pointer list-none items-center justify-center rounded-xl border bg-background active:scale-[.96] focus-visible:ring-2 focus-visible:ring-primary [&::-webkit-details-marker]:hidden">
              <span aria-hidden="true" className="flex w-4 flex-col gap-1">
                <span className="h-px w-4 bg-foreground group-open:translate-y-[2.5px] group-open:rotate-45" />
                <span className="h-px w-4 bg-foreground group-open:-translate-y-[2.5px] group-open:-rotate-45" />
              </span>
            </summary>
            <ul className="absolute inset-x-0 top-full z-20 mt-3 list-none overflow-hidden rounded-[14px] border bg-background py-2">
              {links.map((link, index) => (
                <li key={link.label} className="border-b last:border-b-0">
                  <NavLink to={link.to} className="flex min-h-[52px] items-center justify-between px-4 py-3 text-[17px] font-medium focus-visible:ring-2 focus-visible:ring-primary">
                    <span>{link.label}</span>
                    <span className="text-xs font-normal tabular-nums text-muted-foreground">0{index + 1}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>
    </nav>
  );
}

function NavItem({ to, children }: { to: string; children: ReactNode }) {
  return <li className="text-base uppercase"><NavLink prefetch="render" to={to} viewTransition className="focus-visible:ring-2 focus-visible:ring-primary">{children}</NavLink></li>;
}

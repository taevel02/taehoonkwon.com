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
    { to: `${prefix}/about`, label: "About" },
  ];

  function languageHref(target: "ko" | "en") {
    const current = location.pathname.replace(/^\/(en|ko)(?=\/|$)/, "") || "/";
    const destination = target === "en" ? (current === "/" ? "/en" : `/en${current}`) : current;
    return `/set-language?lang=${target}&next=${encodeURIComponent(destination + location.search + location.hash)}`;
  }

  const languageControl = (
    <div role="group" aria-label={lang === "ko" ? "언어 선택" : "Language"} className="inline-flex shrink-0 rounded-full bg-muted p-1 text-xs">
      {(["ko", "en"] as const).map((target) => (
        <a
          key={target}
          href={languageHref(target)}
          aria-current={lang === target ? "true" : undefined}
          className={`flex min-h-9 min-w-10 items-center justify-center rounded-full px-2 font-medium focus-visible:ring-2 focus-visible:ring-primary active:scale-[.97] ${lang === target ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
        >
          {target.toUpperCase()}
        </a>
      ))}
    </div>
  );

  return (
    <nav aria-label={lang === "ko" ? "주 메뉴" : "Main navigation"} className="relative mt-7 mb-14">
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
            <summary aria-label={lang === "ko" ? "메뉴" : "Menu"} className="flex size-11 cursor-pointer list-none items-center justify-center rounded-full border active:scale-[.96] focus-visible:ring-2 focus-visible:ring-primary [&::-webkit-details-marker]:hidden">
              <span aria-hidden="true" className="flex w-4 flex-col gap-1">
                <span className="h-px w-4 bg-foreground group-open:translate-y-[2.5px] group-open:rotate-45" />
                <span className="h-px w-4 bg-foreground group-open:-translate-y-[2.5px] group-open:-rotate-45" />
              </span>
            </summary>
            <ul className="absolute inset-x-0 top-full z-20 mt-3 list-none border-y bg-background px-0 py-2 shadow-sm">
              {links.map((link, index) => (
                <li key={link.label} className="border-b last:border-b-0">
                  <NavLink to={link.to} className="flex min-h-14 items-center justify-between px-2 text-lg font-medium focus-visible:ring-2 focus-visible:ring-primary">
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

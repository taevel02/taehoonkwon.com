import React from "react";
import { NavLink, useParams, useLocation } from "@remix-run/react";

export function GlobalNavigationBar() {
  const { lang } = useParams();
  const location = useLocation();
  const l = lang === "en" ? "en" : "ko";
  const prefix = l === "ko" ? "" : `/${lang}`;

  const toggleLanguage = (targetLang: string) => {
    if (targetLang === l) return;

    // Set explicit preference cookie
    document.cookie = `lang=${targetLang}; path=/; max-age=31536000; SameSite=Lax`;

    // Strip any leading /en or /ko from the path
    const pathSegments = location.pathname.split("/").filter(Boolean);
    if (
      pathSegments.length > 0 &&
      (pathSegments[0] === "en" || pathSegments[0] === "ko")
    ) {
      pathSegments.shift();
    }

    const pathWithoutLang = "/" + pathSegments.join("/");
    const dest =
      targetLang === "en"
        ? pathWithoutLang === "/"
          ? "/en"
          : `/en${pathWithoutLang}`
        : pathWithoutLang;

    window.location.href = dest + location.search;
  };

  return (
    <nav className="flex flex-row justify-between items-center mt-8 mb-16">
      <ul className="inline-flex items-center gap-4 sm:gap-8 p-0 list-none leading-10 max-[320px]:gap-2">
        <GNBLink to={prefix || "/"}>About</GNBLink>
        <GNBLink to={`${prefix}/archives`}>Archives</GNBLink>
        <GNBLink to={`${prefix}/scuba`}>Scuba</GNBLink>
      </ul>

      <button
        onClick={() => toggleLanguage(l === "en" ? "ko" : "en")}
        className="flex bg-[#f3f4f6] rounded-full p-1 text-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
      >
        <span
          className={`px-3 py-1.5 rounded-full transition-colors ${
            l === "ko"
              ? "bg-white shadow-sm font-medium text-black"
              : "text-gray-500 hover:text-gray-900"
          }`}
        >
          KO
        </span>
        <span
          className={`px-3 py-1.5 rounded-full transition-colors ${
            l === "en"
              ? "bg-white shadow-sm font-medium text-black"
              : "text-gray-500 hover:text-gray-900"
          }`}
        >
          EN
        </span>
      </button>
    </nav>
  );
}

function GNBLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li className="text-base uppercase max-[320px]:text-sm">
      <NavLink prefetch="render" to={to} viewTransition>
        {children}
      </NavLink>
    </li>
  );
}

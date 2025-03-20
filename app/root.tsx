import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/remix";

import { GlobalNavigationBar } from "./components/GlobalNavigationBar";
import { Footer } from "./components/Footer";

import { GoogleAnalyticsScripts } from "./utils/google-analytics";

import globalStyles from "./styles/globals.css";
import articleStyles from "./styles/article.css";

import blogConfig from "blog.config";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: globalStyles },
  { rel: "stylesheet", href: articleStyles },
  {
    rel: "stylesheet",
    href: "https://hangeul.pstatic.net/hangeul_static/css/maru-buri.css",
  },
  {
    rel: "stylesheet",
    href: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css",
  },
  {
    rel: "icon",
    href: "/favicon.ico",
  },
  {
    rel: "sitemap",
    type: "application/xml",
    href: "/sitemap.xml",
  },
  {
    rel: "alternate",
    type: "application/rss+xml",
    href: "/rss.xml",
  },
];

export default function App() {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:site_name" content={blogConfig.seo.name}></meta>
        <Meta />
        <Links />
        <GoogleAnalyticsScripts id={blogConfig.ga.id} />
      </head>
      <body>
        <Layout>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container max-w-(--breakpoint-md) overflow-auto">
      <GlobalNavigationBar />
      {children}
      <Footer />
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  function parseError(error: unknown) {
    if (isRouteErrorResponse(error)) {
      return `${error.status} ${error.statusText}`;
    }
    if (error instanceof Error) {
      return error.message;
    }

    return "Unknown Error";
  }

  return (
    <html lang="ko">
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <Layout>
          <h1 className="font-medium mt-6 mb-6 text-[18pt]">
            {parseError(error)}
          </h1>
        </Layout>
        <Scripts />
      </body>
    </html>
  );
}

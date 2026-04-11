import type { LinksFunction } from "@remix-run/node";
import {
  Links,
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

import globalStyles from "./styles/globals.css?url";
import articleStyles from "./styles/article.css?url";

import blogConfig from "../blog.config";

export const links: LinksFunction = () => [
  {
    rel: "preconnect",
    href: "https://www.googletagmanager.com",
    crossOrigin: "anonymous",
  },
  { rel: "stylesheet", href: globalStyles },
  { rel: "stylesheet", href: articleStyles },
  {
    rel: "icon",
    href: "/favicon.ico",
  },
  {
    rel: "apple-touch-icon",
    href: "/apple-touch-icon.png",
  },
  {
    rel: "manifest",
    href: "/manifest.webmanifest",
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
        <meta property="og:site_name" content={blogConfig.seo.ko.name}></meta>
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

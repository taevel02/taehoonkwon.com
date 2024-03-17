import { cssBundleHref } from "@remix-run/css-bundle";
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

import { GlobalNavigationBar } from "./components/GlobalNavigationBar";
import { Footer } from "./components/Footer";

import styles from "./styles/globals.css";
import "./styles/reset.css";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: styles },
  {
    rel: "stylesheet",
    href: "https://cdn.jsdelivr.net/npm/@fontsource/nanum-myeongjo/index.min.css",
  },
  {
    rel: "stylesheet",
    href: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css",
  },
  {
    rel: "icon",
    href: "/favicon.ico",
  },
];

export default function App() {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Layout>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <Analytics />
      </body>
    </html>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container max-w-screen-md overflow-auto">
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
          <h1>{parseError(error)}</h1>
        </Layout>
        <Scripts />
      </body>
    </html>
  );
}

import React from "react";
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
import { RiAlertLine } from "@remixicon/react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/remix";

import { GlobalNavigationBar } from "~/components/GlobalNavigationBar";
import { Footer } from "~/components/Footer";
import { EmptyState } from "~/components/EmptyState";

import { GoogleAnalyticsScripts } from "~/utils/google-analytics";

import globalStyles from "~/styles/globals.css?url";
import articleStyles from "~/styles/article.css?url";

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
  const is404 = isRouteErrorResponse(error) && error.status === 404;

  return (
    <html lang="ko">
      <head>
        <title>{is404 ? "Page Not Found" : "Oops!"}</title>
        <Meta />
        <Links />
      </head>
      <body>
        <Layout>
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <EmptyState
              icon={<RiAlertLine className="w-12 h-12" />}
              title={
                is404 ? "페이지를 찾을 수 없습니다" : "문제가 발생했습니다"
              }
              description={
                is404
                  ? "존재하지 않는 페이지이거나, 이동되었을 수 있습니다."
                  : "요청을 처리하는 중에 예상치 못한 오류가 발생했습니다."
              }
              action={
                <button
                  onClick={() => (window.location.href = "/")}
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                >
                  홈으로 돌아가기
                </button>
              }
            />
          </div>
        </Layout>
        <Scripts />
      </body>
    </html>
  );
}

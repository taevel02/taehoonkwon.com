import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import {
  PreventFlashOnWrongTheme,
  ThemeProvider,
  useTheme,
} from "remix-themes";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/remix";

import { GlobalNavigationBar } from "./components/GlobalNavigationBar";
import { Footer } from "./components/Footer";

import { themeSessionResolver } from "./sessions.server";

import styles from "./styles/globals.css";

import { GoogleAnalyticsScripts } from "./utils/google-analytics";
import cn from "./utils/cn";

import "./styles/reset.css";
import blogConfig from "blog.config";

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

export async function loader({ request }: LoaderFunctionArgs) {
  const { getTheme } = await themeSessionResolver(request);

  return { theme: getTheme() };
}

export default function AppWithProviders() {
  const data = useLoaderData<typeof loader>();

  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
      <App />
    </ThemeProvider>
  );
}

export function App() {
  const data = useLoaderData<typeof loader>();
  const [theme] = useTheme();

  return (
    <html lang="ko" className={cn(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
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

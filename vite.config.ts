import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

const customRemix = (options?: Parameters<typeof remix>[0]) => {
  const plugins = remix(options);
  const remixPlugin = plugins
    .flat()
    .find((p) => p && p.name === "remix") as any;
  if (remixPlugin && remixPlugin.config) {
    const originalConfig = remixPlugin.config;
    const originalHandler =
      typeof originalConfig === "function"
        ? originalConfig
        : originalConfig.handler;

    if (originalHandler) {
      const wrappedHandler = async function (this: any, config: any, env: any) {
        const resolved = await originalHandler.call(this, config, env);
        if (resolved && "esbuild" in resolved) {
          delete resolved.esbuild;
        }
        return resolved;
      };

      if (typeof originalConfig === "function") {
        remixPlugin.config = wrappedHandler;
      } else {
        remixPlugin.config.handler = wrappedHandler;
      }
    }
  }
  return plugins;
};

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2,webp}"],
        runtimeCaching: [
          {
            urlPattern: ({ request }) =>
              request.destination === "document" ||
              request.destination === "image",
            handler: "NetworkFirst",
            options: { cacheName: "content-cache" },
          },
          {
            urlPattern: ({ request }) =>
              request.destination === "script" ||
              request.destination === "style" ||
              request.destination === "font",
            handler: "CacheFirst",
            options: {
              cacheName: "assets-cache",
              expiration: { maxEntries: 100, maxAgeSeconds: 30 * 24 * 60 * 60 },
            },
          },
        ],
      },
      manifest: {
        name: "Taehoon Kwon",
        short_name: "Taehoon",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "/favicon.ico",
            sizes: "64x64 32x32 24x24 16x16",
            type: "image/x-icon",
          },
        ],
      },
    }),
    customRemix({
      ignoredRouteFiles: ["**/*.css"],
      future: {
        v3_fetcherPersist: true,
        v3_lazyRouteDiscovery: true,
        v3_relativeSplatPath: true,
        v3_singleFetch: true,
        v3_throwAbortReason: true,
      },
    }),
  ],
});

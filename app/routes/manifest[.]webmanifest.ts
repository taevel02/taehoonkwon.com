import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  const manifest = {
    name: "Taehoon Kwon",
    short_name: "Taehoon",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "64x64 32x32 24x24 16x16",
        type: "image/x-icon",
      },
    ],
  };

  return new Response(JSON.stringify(manifest), {
    headers: {
      "Cache-Control": "public, max-age=600",
      "Content-Type": "application/manifest+json",
    },
  });
};

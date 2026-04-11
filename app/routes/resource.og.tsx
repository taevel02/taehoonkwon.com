import { ImageResponse } from "@vercel/og";
import type { LoaderFunctionArgs } from "@remix-run/node";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const title = url.searchParams.get("title") || "Taehoon Kwon";
  const subtitle = url.searchParams.get("subtitle") || "taehoonkwon.com";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        padding: "80px",
        fontFamily: "sans-serif",
        border: "20px solid #222",
      }}
    >
      <div
        style={{
          fontSize: 72,
          fontWeight: 800,
          color: "#111",
          lineHeight: 1.2,
          wordBreak: "keep-all",
        }}
      >
        {title}
      </div>
      {subtitle && (
        <div
          style={{
            fontSize: 40,
            fontWeight: 400,
            color: "#666",
            marginTop: "30px",
          }}
        >
          {subtitle}
        </div>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "auto",
          fontSize: 32,
          fontWeight: 600,
          color: "#3b82f6",
        }}
      >
        taehoonkwon.com
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
};

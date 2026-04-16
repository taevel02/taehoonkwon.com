export type Language = "en" | "ko";
export const LANGUAGES: Language[] = ["ko", "en"];

export function getLanguage(request: Request, langParam?: string): Language {
  // 1. Explicit path segment (URL) - This MUST win to make links shareable
  if (langParam) {
    if (langParam === "en" || langParam === "ko") {
      return langParam as Language;
    }
    // If a lang param was provided but it's not supported, it's a 404
    throw new Response("Not Found", { status: 404 });
  }

  // 2. User Preference (Cookie) - TRUMPS GeoIP and Headers
  const cookieHeader = request.headers.get("Cookie");
  if (cookieHeader) {
    const lang = cookieHeader
      .split(";")
      .map((c) => c.trim())
      .find((c) => c.startsWith("lang="))
      ?.split("=")[1];

    if (lang === "en" || lang === "ko") {
      return lang as Language;
    }
  }

  // 3. Detect from Vercel / Cloudflare edge geolocation headers
  const country =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    "";

  if (country === "KR") {
    return "ko";
  }

  // 4. Fallback to accept-language header
  const acceptLanguage = request.headers.get("accept-language") || "";
  if (acceptLanguage.includes("ko")) {
    return "ko";
  }

  // Default to English
  return "en";
}

/**
 * Logic to determine if we should redirect based on the detected language.
 */
export function getLocalizedPath(
  pathname: string,
  lang: Language,
): string | null {
  const isEnPath =
    pathname.startsWith("/en") &&
    (pathname.length === 3 || pathname[3] === "/");
  const isKoPath =
    pathname.startsWith("/ko") &&
    (pathname.length === 3 || pathname[3] === "/");

  // Redirect to /en if preference is English but we are on a non-prefixed path
  if (lang === "en" && !isEnPath && !isKoPath) {
    return pathname === "/" ? "/en" : `/en${pathname}`;
  }

  // Optional: Redirect /en to root if preference is Korean?
  // Only if they aren't explicitly on /en? This is tricky.
  // For now, let's stick to the current logic which is safe.

  return null;
}

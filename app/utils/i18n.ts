export function getLanguage(request: Request, langParam?: string) {
  // If explicitly requested via path segment
  if (langParam === "en" || langParam === "ko") {
    return langParam;
  }

  // 1. User Preference (Cookie)
  const cookieHeader = request.headers.get("Cookie");
  if (cookieHeader) {
    const match = cookieHeader.match(/lang=(en|ko)/);
    if (match) {
      return match[1];
    }
  }

  // 2. Detect from Vercel / Cloudflare edge geolocation headers
  const country =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    "";

  if (country) {
    return country === "KR" ? "ko" : "en";
  }

  // 3. Fallback to accept-language header
  const acceptLanguage = request.headers.get("accept-language") || "";
  if (acceptLanguage.includes("ko")) {
    return "ko";
  }

  // Default to English for all other countries
  return "en";
}

export type Language = "en" | "ko";
export const LANGUAGES: Language[] = ["ko", "en"];

export function getLanguage(request: Request, langParam?: string): Language {
  if (langParam && langParam !== "en" && langParam !== "ko") {
    throw new Response("Not Found", { status: 404 });
  }

  return "ko";
}

/**
 * Logic to determine if we should redirect based on the detected language.
 */
export function getLocalizedPath(pathname: string): string | null {
  const unprefixedPath = pathname.replace(/^\/(en|ko)(?=\/|$)/, "") || "/";
  if (unprefixedPath !== pathname) {
    return unprefixedPath;
  }
  return null;
}

import { createClient } from "@supabase/supabase-js";

/**
 * Supabase Client Utility (Modern Standard for Remix)
 *
 * Updated to be more robust against missing env variables during build/init.
 */

declare global {
  interface Window {
    ENV: {
      SUPABASE_URL: string;
      SUPABASE_PUBLISHABLE_KEY: string;
    };
  }
}

const getEnv = () => {
  const isServer = typeof window === "undefined";
  const url = isServer ? process.env.SUPABASE_URL : window.ENV?.SUPABASE_URL;

  const key = isServer
    ? process.env.SUPABASE_PUBLISHABLE_KEY
    : window.ENV?.SUPABASE_PUBLISHABLE_KEY;

  return { url, key };
};

// Singleton instance
let supabaseInstance: ReturnType<typeof createClient> | null = null;

export const getSupabase = () => {
  if (supabaseInstance) return supabaseInstance;

  const { url, key } = getEnv();

  if (!url || !key) {
    // Return a dummy client or throw a more descriptive error only when accessed
    console.error(
      "Supabase URL or Key is missing. Please check your environment variables.",
    );
    return createClient("https://missing-url.supabase.co", "missing-key");
  }

  supabaseInstance = createClient(url, key);
  return supabaseInstance;
};

// Export as a getter for backward compatibility or direct use
export const supabase = getSupabase();

// /src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

/**
 * Defensive env handling + boot-time logging.
 * This prints in the browser console (visible on Netlify too).
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Don’t throw — surface a clear error in UI and console.
  // Netlify builds can fail to inject env if names don’t start with VITE_.
  // Also, local dev needs a .env with these keys.
  // eslint-disable-next-line no-console
  console.error("❌ Missing Supabase env vars. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
}

export const supabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "");

// Tiny helper to log connection info in places where we query.
export function logSupabaseBoot(tag = "supabase:init") {
  // eslint-disable-next-line no-console
  console.log(`🔌 ${tag}`, {
    urlPresent: Boolean(supabaseUrl),
    keyPresent: Boolean(supabaseAnonKey),
    supabaseUrl,
  });
}

import { createClient } from "@supabase/supabase-js";

// ⬇️ Replace these with your actual values from Supabase Project Settings → API
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a single supabase client for your app
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

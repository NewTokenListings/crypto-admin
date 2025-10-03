// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

// Load environment variables (must start with VITE_ for Vite to expose them)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Check your .env file.')
}

// Create a single supabase client for your whole app
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

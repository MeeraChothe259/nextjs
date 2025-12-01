// utils/supabase.js
// This file initializes the client using environment variables.

import { createClient } from '@supabase/supabase-js';

// Get environment variables from the .env.local file
// NEXT_PUBLIC_ is necessary to expose them to the client-side code
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if keys are defined (Good practice for error handling)
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables. Check your .env.local file.');
}

// Create and export the Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
// utils/supabase-server.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Missing Supabase credentials for server client.');
}

// Initialize client with Service Role Key for full database access (Server-side ONLY)
export const supabaseServer = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
        // Disable session storage as we are using it for an API route
        persistSession: false 
    }
});
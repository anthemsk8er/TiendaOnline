

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// It's recommended to use environment variables for this in a real project
const supabaseUrl = 'https://uylwgmvnlnnkkvjqirhx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5bHdnbXZubG5ua2t2anFpcmh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzMTk2MjMsImV4cCI6MjA2ODg5NTYyM30.Z970_N_nEI_DVCV43a8c5vI_9lDOGYuslFLRZjy-RbU';

let supabase: SupabaseClient<Database> | null = null;

// A simple check to see if the credentials look like valid, non-placeholder values.
if (supabaseUrl && supabaseUrl.startsWith('https://') && supabaseKey && supabaseKey.startsWith('eyJ')) {
    try {
        supabase = createClient<Database>(supabaseUrl, supabaseKey);
    } catch (e) {
        console.error("Error creating Supabase client:", e);
        supabase = null; // Ensure supabase is null on error
    }
}

// If supabase is still null, it means the credentials were bad or an error occurred.
if (!supabase) {
    // This console.warn is important for the developer to see.
    console.warn("Supabase credentials are not set or are invalid in lib/supabaseClient.ts. The ProductsGrid component will fall back to mock data.");
}

export { supabase };
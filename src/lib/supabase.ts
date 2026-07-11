import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ghfuagyvtjvjlaaanwsn.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdoZnVhZ3l2dGp2amxhYWFud3NuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwNjQzNjQsImV4cCI6MjA5ODY0MDM2NH0.rNQdR6l_76wgpMFf_C_2yvcxxW2wXV_K934H2iC5nCE';

// Create a client using the configured or fallback keys
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

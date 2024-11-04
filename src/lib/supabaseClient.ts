import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://napmnlicyjqaxxpwglxk.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hcG1ubGljeWpxYXh4cHdnbHhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA1NzgzMDUsImV4cCI6MjA0NjE1NDMwNX0.hxe5NTQ3OFWbx6q79E7zuvnCjKjFDVoPh6PVGGFP1gg';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'X-Client-Info': 'puppypack-web'
    }
  }
});
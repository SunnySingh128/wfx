import { createClient } from '@supabase/supabase-js';
import { env } from './env.js';

let supabaseInstance = null;
let isMockDb = false;

if (!env.supabaseUrl || env.supabaseUrl.includes('mockproject.supabase.co')) {
  console.log('[Database] Using Local In-Memory Mock Database (Supabase URL is offline or mock)');
  isMockDb = true;
} else {
  try {
    supabaseInstance = createClient(env.supabaseUrl, env.supabaseAnonKey, {
      auth: { persistSession: false }
    });
    console.log('[Database] Supabase client initialized successfully.');
  } catch (err) {
    console.error('[Database] Failed to initialize Supabase client. Falling back to local mock.', err.message);
    isMockDb = true;
  }
}

export const supabase = supabaseInstance;
export { isMockDb };

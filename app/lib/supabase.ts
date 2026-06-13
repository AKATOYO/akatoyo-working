import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Error handling wrapper
export const safeSupabaseCall = async <T,>(operation: () => Promise<T>): Promise<T> => {
  try {
    return await operation();
  } catch (error) {
    console.error('Supabase error:', error);
    throw error;
  }
};

// Rate limiting
let lastCallTime = 0;
const RATE_LIMIT_DELAY = 100; // ms between calls

export const rateLimitedSupabaseCall = async <T,>(operation: () => Promise<T>): Promise<T> => {
  const now = Date.now();
  if (now - lastCallTime < RATE_LIMIT_DELAY) {
    await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_DELAY - (now - lastCallTime)));
  }
  lastCallTime = Date.now();
  return operation();
};

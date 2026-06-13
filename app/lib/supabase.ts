import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// 1. Cliente único de Supabase con tipado explícito
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)

// 2. Wrapper para el manejo seguro de errores con tipado estricto
export const safeSupabaseCall = async <T>(operation: () => Promise<T>): Promise<T> => {
  try {
    return await operation();
  } catch (error: unknown) {
    console.error('Supabase error:', error);
    throw error;
  }
};

// 3. Control de Rate Limiting con cola asíncrona segura
let lastCallTime: number = 0;
const RATE_LIMIT_DELAY: number = 100; // ms de espera mínima entre llamadas

export const rateLimitedSupabaseCall = async <T>(operation: () => Promise<T>): Promise<T> => {
  const now: number = Date.now();
  const timePassed: number = now - lastCallTime;

  if (timePassed < RATE_LIMIT_DELAY) {
    const delayTime: number = RATE_LIMIT_DELAY - timePassed;
    await new Promise<void>((resolve) => setTimeout(resolve, delayTime));
  }
  
  // Registramos el tiempo justo antes de ejecutar la operación
  lastCallTime = Date.now();
  return operation();
};

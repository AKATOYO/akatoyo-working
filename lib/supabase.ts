import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Cliente único de Supabase con tipado explícito para habilitar el autocompletado
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)

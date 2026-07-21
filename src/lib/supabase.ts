import { createClient } from '@supabase/supabase-js'

// Những biến môi trường này sẽ được cung cấp từ Supabase Dashboard
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

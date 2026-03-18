import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export type Plan = 'basic' | 'premium' | 'inlove'

export interface LovePage {
  id: string
  slug: string
  plan: Plan
  person_name: string
  partner_name: string
  start_date: string
  message: string
  photos: string[]
  playlist_url?: string
  date_ideas?: string[]
  active: boolean
  expires_at?: string
  created_at: string
  paid: boolean
  customer_email: string
}

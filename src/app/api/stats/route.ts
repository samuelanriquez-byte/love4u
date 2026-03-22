import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const { count } = await supabaseAdmin
    .from('love_pages')
    .select('*', { count: 'exact', head: true })
    .eq('paid', true)
    .gte('created_at', today.toISOString())

  return NextResponse.json({ today: count || 0 })
}

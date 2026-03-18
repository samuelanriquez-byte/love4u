import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { sendConfirmationEmail } from '@/lib/email'
import { getRandomDateIdeas } from '@/lib/date-ideas'

// Este endpoint es llamado manualmente por el admin para activar una página
// después de verificar el pago en USDT
export async function POST(req: NextRequest) {
  try {
    const { pageId, adminSecret } = await req.json()

    if (adminSecret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { data: page } = await supabaseAdmin
      .from('love_pages')
      .select()
      .eq('id', pageId)
      .single()

    if (!page) {
      return NextResponse.json({ error: 'Página no encontrada' }, { status: 404 })
    }

    const dateIdeas =
      page.plan === 'inlove' ? getRandomDateIdeas(3).map((idea: object) => JSON.stringify(idea)) : null

    await supabaseAdmin
      .from('love_pages')
      .update({ paid: true, active: true, date_ideas: dateIdeas })
      .eq('id', pageId)

    await sendConfirmationEmail({
      to: page.customer_email,
      personName: page.person_name,
      partnerName: page.partner_name,
      slug: page.slug,
      plan: page.plan,
      dateIdeas: page.date_ideas,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Error confirmando USDT:', error)
    return NextResponse.json({ error: 'Error' }, { status: 500 })
  }
}

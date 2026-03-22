import { NextRequest, NextResponse } from 'next/server'
import { captureOrder } from '@/lib/paypal'
import { supabaseAdmin } from '@/lib/supabase'
import { sendConfirmationEmail } from '@/lib/email'
import { getRandomDateIdeas } from '@/lib/date-ideas'

export async function POST(req: NextRequest) {
  try {
    const { orderId, pageId } = await req.json()

    // Capturar el pago en PayPal
    const capture = await captureOrder(orderId)

    // Aceptar COMPLETED a nivel orden o a nivel capture individual
    const captureStatus = capture.status ||
      capture.purchase_units?.[0]?.payments?.captures?.[0]?.status

    if (captureStatus !== 'COMPLETED') {
      return NextResponse.json({ error: 'Pago no completado', captureStatus, captureName: capture.name }, { status: 400 })
    }

    // Obtener la página para saber el plan
    const { data: page } = await supabaseAdmin
      .from('love_pages')
      .select()
      .eq('id', pageId)
      .single()

    if (!page) {
      return NextResponse.json({ error: 'Página no encontrada' }, { status: 404 })
    }

    // Generar ideas de citas si es plan in-love
    const dateIdeas =
      page.plan === 'inlove' ? getRandomDateIdeas(3).map((idea: object) => JSON.stringify(idea)) : null

    // Activar la página
    await supabaseAdmin
      .from('love_pages')
      .update({ paid: true, active: true, date_ideas: dateIdeas })
      .eq('id', pageId)

    // Enviar email de confirmación
    let emailError = null
    try {
      await sendConfirmationEmail({
        to: page.customer_email,
        personName: page.person_name,
        partnerName: page.partner_name,
        slug: page.slug,
        plan: page.plan,
        dateIdeas: page.date_ideas,
      })
    } catch (err: any) {
      emailError = err?.message || String(err)
      console.error('Error enviando email:', emailError)
    }

    return NextResponse.json({ ok: true, slug: page.slug, emailError })
  } catch (error) {
    console.error('Error capturando pago:', error)
    return NextResponse.json({ error: 'Error procesando el pago' }, { status: 500 })
  }
}

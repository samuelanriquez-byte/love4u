import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase'
import { sendConfirmationEmail } from '@/lib/email'
import { getRandomDateIdeas } from '@/lib/date-ideas'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('Webhook signature error:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const { pageId, plan } = session.metadata!

    // Generar ideas de citas si es plan in-love
    const dateIdeas = plan === 'inlove'
      ? getRandomDateIdeas(3).map(idea => JSON.stringify(idea))
      : null

    // Activar la página
    const { data: page, error } = await supabaseAdmin
      .from('love_pages')
      .update({
        paid: true,
        active: true,
        date_ideas: dateIdeas,
      })
      .eq('id', pageId)
      .select()
      .single()

    if (error) {
      console.error('Error activating page:', error)
      return NextResponse.json({ error: 'Error activating page' }, { status: 500 })
    }

    // Enviar email de confirmación
    await sendConfirmationEmail({
      to: page.customer_email,
      personName: page.person_name,
      partnerName: page.partner_name,
      slug: page.slug,
      plan: page.plan,
      dateIdeas: page.date_ideas,
    })
  }

  return NextResponse.json({ received: true })
}

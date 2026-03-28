import { NextRequest, NextResponse } from 'next/server'
import { createOrder } from '@/lib/paypal'
import { PLANS } from '@/lib/plans'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.love4u.app'

export async function POST(req: NextRequest) {
  try {
    const { plan, pageId } = await req.json()
    const planData = PLANS[plan as keyof typeof PLANS]

    if (!planData) {
      return NextResponse.json({ error: 'Plan inválido' }, { status: 400 })
    }

    const order = await createOrder({
      amount: planData.price,
      description: `Love4U — Plan ${planData.name}`,
      pageId,
      returnUrl: `${BASE_URL}/gracias/${pageId}`,
      cancelUrl: `${BASE_URL}/crear`,
    })

    if (!order.id) {
      console.error('PayPal order error:', JSON.stringify(order))
      return NextResponse.json({ error: 'No se pudo crear la orden de pago.' }, { status: 400 })
    }

    const rawApprovalUrl = order.links?.find((l: any) => l.rel === 'approve')?.href
    const approvalUrl = rawApprovalUrl ? `${rawApprovalUrl}&fundingSource=card` : null

    return NextResponse.json({ approvalUrl })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Error al generar el link de pago' }, { status: 500 })
  }
}

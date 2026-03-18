import { NextRequest, NextResponse } from 'next/server'
import { PLANS } from '@/lib/plans'

const PAYPAL_ME = 'https://paypal.me/samuelanriquez'

export async function POST(req: NextRequest) {
  try {
    const { plan } = await req.json()
    const planData = PLANS[plan as keyof typeof PLANS]

    if (!planData) {
      return NextResponse.json({ error: 'Plan inválido' }, { status: 400 })
    }

    const url = `${PAYPAL_ME}/${planData.price}USD`
    return NextResponse.json({ url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Error al generar el link de pago' }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'

// Este endpoint ya no se usa (migrado a PayPal.me + USDT)
export async function POST() {
  return NextResponse.json({ ok: true })
}

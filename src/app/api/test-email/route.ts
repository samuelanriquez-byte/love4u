import { NextRequest, NextResponse } from 'next/server'
import { sendConfirmationEmail } from '@/lib/email'

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email') || 'test@example.com'
  try {
    await sendConfirmationEmail({
      to: email,
      personName: 'Samuel',
      partnerName: 'Valentina',
      slug: 'test-slug',
      plan: 'basic',
    })
    return NextResponse.json({ ok: true, message: `Email enviado a ${email}` })
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error?.message || String(error) }, { status: 500 })
  }
}

import nodemailer from 'nodemailer'
import QRCode from 'qrcode'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

interface SendConfirmationEmailParams {
  to: string
  personName: string
  partnerName: string
  slug: string
  plan: string
  dateIdeas?: string[] | null
}

export async function sendConfirmationEmail({
  to,
  personName,
  partnerName,
  slug,
  plan,
  dateIdeas,
}: SendConfirmationEmailParams) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const pageUrl = `${baseUrl}/p/${slug}`

  // Generar QR como data URL
  const qrDataUrl = await QRCode.toDataURL(pageUrl, {
    width: 300,
    margin: 2,
    color: { dark: '#e91e8c', light: '#ffffff' },
  })

  const planNames: Record<string, string> = {
    basic: 'Básico',
    premium: 'Premium',
    inlove: 'In-Love',
  }

  let dateIdeasHtml = ''
  if (plan === 'inlove' && dateIdeas && dateIdeas.length > 0) {
    const ideas = dateIdeas.map((idea: string) => JSON.parse(idea))
    dateIdeasHtml = `
      <div style="margin-top: 30px; background: #fff5f7; border-radius: 16px; padding: 24px; border: 1px solid #ffd6e7;">
        <h3 style="color: #e91e8c; margin: 0 0 16px; font-family: Georgia, serif;">✨ Tus 3 ideas de citas románticas</h3>
        ${ideas.map((idea: { title: string; description: string }) => `
          <div style="margin-bottom: 16px; padding: 12px; background: white; border-radius: 12px;">
            <p style="font-weight: bold; color: #2d1b2e; margin: 0 0 4px;">${idea.title}</p>
            <p style="color: #666; margin: 0; font-size: 14px;">${idea.description}</p>
          </div>
        `).join('')}
      </div>
    `
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #fff5f7;">

      <div style="text-align: center; padding: 30px 0;">
        <h1 style="font-family: Georgia, serif; font-size: 36px; color: #e91e8c; margin: 0;">Love4U 💕</h1>
        <p style="color: #999; font-size: 14px;">El regalo más especial para tu amor</p>
      </div>

      <div style="background: white; border-radius: 24px; padding: 32px; border: 1px solid #ffd6e7; margin-bottom: 24px;">
        <h2 style="font-family: Georgia, serif; color: #2d1b2e; margin: 0 0 8px;">
          ¡Listo, ${personName}! 🎉
        </h2>
        <p style="color: #666; margin: 0 0 24px;">
          Tu regalo para <strong>${partnerName}</strong> ya está disponible.
          Compartí el link o el QR y dejá que la magia haga lo suyo. 💌
        </p>

        <div style="background: linear-gradient(135deg, #e91e8c, #ff6b9d); border-radius: 16px; padding: 20px; text-align: center; margin-bottom: 24px;">
          <p style="color: rgba(255,255,255,0.8); font-size: 12px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 1px;">
            Link de la página
          </p>
          <a href="${pageUrl}" style="color: white; font-size: 18px; font-weight: bold; text-decoration: none; word-break: break-all;">
            ${pageUrl}
          </a>
        </div>

        <div style="text-align: center; margin-bottom: 24px;">
          <p style="color: #666; font-size: 14px; margin: 0 0 12px;">📱 O compartí este QR:</p>
          <img src="${qrDataUrl}" alt="QR Code" style="width: 180px; height: 180px; border-radius: 12px;" />
        </div>

        <div style="background: #fff5f7; border-radius: 12px; padding: 16px; text-align: center;">
          <p style="color: #999; font-size: 12px; margin: 0;">
            Plan: <strong style="color: #e91e8c;">${planNames[plan] || plan}</strong>
          </p>
        </div>
      </div>

      ${dateIdeasHtml}

      <div style="text-align: center; padding: 20px; color: #ccc; font-size: 12px;">
        <p>¿Necesitás ayuda? Escribinos por WhatsApp o a soporte@love4u.app</p>
        <p style="margin: 0;">Hecho con 💕 por Love4U</p>
      </div>

    </body>
    </html>
  `

  await transporter.sendMail({
    from: `Love4U 💕 <${process.env.GMAIL_USER}>`,
    to,
    subject: `💕 Tu regalo para ${partnerName} está listo — Love4U`,
    html,
  })
}

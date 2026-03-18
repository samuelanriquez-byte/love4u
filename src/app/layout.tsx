import type { Metadata } from 'next'
import { Playfair_Display, Lato } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
})

const lato = Lato({
  variable: '--font-lato',
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'Love4U — Regalos digitales para enamorados',
  description: 'Crea una página web romántica y personalizada para tu pareja. Con fotos, música y mensajes únicos. El regalo perfecto para enamorados.',
  keywords: 'regalo romántico, página web pareja, regalo digital, enamorados, aniversario',
  openGraph: {
    title: 'Love4U — Regalos digitales para enamorados',
    description: 'El regalo más especial que puedes darle a tu pareja. Con fotos, música y un mensaje único. 💕',
    type: 'website',
    url: 'https://love4u-three.vercel.app',
    images: [
      {
        url: 'https://love4u-three.vercel.app/og-love.png',
        width: 1200,
        height: 630,
        alt: 'Love4U — Regalos digitales para enamorados',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Love4U — Regalos digitales para enamorados',
    description: 'El regalo más especial que puedes darle a tu pareja.',
    images: ['https://love4u-three.vercel.app/og-love.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${playfair.variable} ${lato.variable} antialiased`} style={{ fontFamily: 'var(--font-lato), sans-serif' }}>
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  )
}

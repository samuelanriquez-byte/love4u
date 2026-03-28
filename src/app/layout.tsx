import type { Metadata } from 'next'
import { Playfair_Display, Lato } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Script from 'next/script'

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
    url: 'https://www.love4u.app',
    images: [
      {
        url: 'https://www.love4u.app/api/og',
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
    images: ['https://www.love4u.app/api/og'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-14272359414" />
        <Script id="ga-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-14272359414');
        `}</Script>
      </head>
      <body className={`${playfair.variable} ${lato.variable} antialiased`} style={{ fontFamily: 'var(--font-lato), sans-serif' }}>
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  )
}

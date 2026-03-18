'use client'
import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

function GraciasContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token') // PayPal order ID
  const pageId = searchParams.get('pageId')
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading')

  useEffect(() => {
    if (!token || !pageId) {
      setStatus('ok') // Pago USDT — ya se avisó por WhatsApp
      return
    }

    fetch('/api/capturar-pago', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId: token, pageId }),
    })
      .then(r => r.json())
      .then(d => setStatus(d.ok ? 'ok' : 'error'))
      .catch(() => setStatus('error'))
  }, [token, pageId])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">💳</div>
          <p className="text-gray-500">Confirmando tu pago...</p>
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">😔</div>
          <h1 className="text-2xl font-bold mb-2">Algo salió mal</h1>
          <p className="text-gray-500 mb-6">No pudimos confirmar tu pago. Contactanos por WhatsApp.</p>
          <Link href="/crear" className="gradient-love text-white px-8 py-3 rounded-full font-semibold">
            Intentar de nuevo
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="text-center max-w-lg">
        <div className="pulse-heart text-8xl mb-6">💝</div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
          ¡Tu regalo está <span className="gradient-text">listo!</span>
        </h1>
        <p className="text-gray-600 text-lg mb-4 leading-relaxed">
          En unos minutos recibirás un email con el <strong>link de la página</strong> y el <strong>QR exclusivo</strong> para compartir con tu amor. 💌
        </p>
        <p className="text-gray-400 text-sm mb-8">
          Revisá tu carpeta de spam si no lo recibís en 5 minutos.
        </p>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-pink-100 mb-8">
          <h3 className="font-bold text-gray-700 mb-3">¿Qué sigue?</h3>
          <div className="space-y-3 text-left">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📧</span>
              <p className="text-gray-600 text-sm">Revisá tu email para encontrar el link y QR de la página.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">📱</span>
              <p className="text-gray-600 text-sm">Imprimí el QR o envialo por WhatsApp para sorprender a tu amor.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">💕</span>
              <p className="text-gray-600 text-sm">¡Disfrutá la reacción de tu pareja!</p>
            </div>
          </div>
        </div>

        <Link
          href="/"
          className="border-2 border-pink-400 text-pink-500 px-8 py-3 rounded-full font-semibold hover:bg-pink-50 transition-all"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}

export default function GraciasPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
        <GraciasContent />
      </Suspense>
    </>
  )
}

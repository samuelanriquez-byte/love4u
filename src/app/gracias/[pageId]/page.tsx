'use client'
import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

function GraciasContent({ pageId }: { pageId: string }) {
    const searchParams = useSearchParams()
    const token = searchParams.get('token') // PayPal order ID
  const [status, setStatus] = useState<'loading' | 'ok' | 'error' | 'instrument_declined'>('loading')
    const [slug, setSlug] = useState<string | null>(null)
    const [paypalRedirectUrl, setPaypalRedirectUrl] = useState<string | null>(null)

  useEffect(() => {
        if (!token || !pageId) {
                setStatus('error')
                return
        }

                fetch('/api/capturar-pago', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ orderId: token, pageId }),
                })
          .then(r => r.json())
          .then(d => {
                    if (d.ok) {
                                setSlug(d.slug)
                                setStatus('ok')
                    } else if (d.error === 'INSTRUMENT_DECLINED' && d.redirectUrl) {
                                setPaypalRedirectUrl(d.redirectUrl)
                                setStatus('instrument_declined')
                    } else {
                                setStatus('error')
                    }
          })
          .catch(() => setStatus('error'))
  }, [token, pageId])

  if (status === 'loading') {
        return (
                <div className="min-h-screen flex items-center justify-center">
                        <div className="text-center">
                                  <div className="text-5xl mb-4">💳</div>div>
                                  <p className="text-gray-500">Confirmando tu pago...</p>p>
                        </div>div>
                </div>div>
              )
  }
  
    if (status === 'instrument_declined') {
          return (
                  <div className="min-h-screen flex items-center justify-center px-4 pt-20">
                          <div className="text-center max-w-md">
                                    <div className="text-6xl mb-4">💳</div>div>
                                    <h1 className="text-2xl font-bold mb-2">Método de pago rechazado</h1>h1>
                                    <p className="text-gray-500 mb-6">Tu banco o tarjeta no pudo procesar el pago. Por favor, intentá con otro método de pago.</p>p>
                                    <a
                                                  href={paypalRedirectUrl!}
                                                  className="gradient-love text-white px-8 py-3 rounded-full font-semibold inline-block mb-4"
                                                >
                                                Reintentar con otro método
                                    </a>a>
                                    <br />
                                    <Link href="/crear" className="text-sm text-gray-400 hover:text-pink-400 transition-colors">
                                                ← Crear un nuevo regalo
                                    </Link>Link>
                          </div>div>
                  </div>div>
                )
    }
  
    if (status === 'error') {
          return (
                  <div className="min-h-screen flex items-center justify-center px-4 pt-20">
                          <div className="text-center max-w-md">
                                    <div className="text-6xl mb-4">😔</div>div>
                                    <h1 className="text-2xl font-bold mb-2">Algo salió mal</h1>h1>
                                    <p className="text-gray-500 mb-6">No pudimos confirmar tu pago. Contactanos por WhatsApp.</p>p>
                                    <Link href="/crear" className="gradient-love text-white px-8 py-3 rounded-full font-semibold">
                                                Intentar de nuevo
                                    </Link>Link>
                          </div>div>
                  </div>div>
                )
    }
  
    return (
          <div className="min-h-screen flex items-center justify-center px-4 pt-20">
                <div className="text-center max-w-lg">
                        <div className="pulse-heart text-8xl mb-6">💝</div>div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
                                  ¡Tu regalo está <span className="gradient-text">listo!</span>span>
                        </h1>h1>
                        <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                                  En unos minutos recibirás un email con el <strong>link de la página</strong>strong> y el <strong>QR exclusivo</strong>strong> para compartir con tu amor. 💌
                        </p>p>
                        <p className="text-gray-400 text-sm mb-8">
                                  Revisá tu carpeta de spam si no lo recibís en 5 minutos.
                        </p>p>
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-pink-100 mb-6">
                                  <h3 className="font-bold text-gray-700 mb-4">¿Qué sigue?</h3>h3>
                                  <div className="space-y-4 text-left">
                                              <div className="flex items-start gap-3">
                                                            <span className="text-2xl">📧</span>span>
                                                            <div>
                                                                            <p className="text-gray-700 text-sm font-medium">Revisá tu email</p>p>
                                                                            <p className="text-gray-400 text-xs">Enviamos el link y el QR exclusivo a tu casilla.</p>p>
                                                            </div>div>
                                              </div>div>
                                              <div className="flex items-start gap-3">
                                                            <span className="text-2xl">📱</span>span>
                                                            <div>
                                                                            <p className="text-gray-700 text-sm font-medium">Compartí el QR</p>p>
                                                                            <p className="text-gray-400 text-xs">Imprimilo o envialo por WhatsApp para sorprender a tu amor.</p>p>
                                                            </div>div>
                                              </div>div>
                                              <div className="flex items-start gap-3">
                                                            <span className="text-2xl">💕</span>span>
                                                            <div>
                                                                            <p className="text-gray-700 text-sm font-medium">¡Disfrutá el momento!</p>p>
                                                                            <p className="text-gray-400 text-xs">Ver la reacción de tu pareja no tiene precio.</p>p>
                                                            </div>div>
                                              </div>div>
                                  </div>div>
                        </div>div>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
                                  <a
                                                href={`https://wa.me/?text=${encodeURIComponent(`Mirá el regalo que te hice 💕 https://www.love4u.app/p/${slug}`)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-[#25D366] text-white px-6 py-3 rounded-full font-semibold text-sm hover:opacity-90 transition-all"
                                              >
                                              📲 Compartir por WhatsApp
                                  </a>a>
                                  <Link href="/crear" className="border-2 border-pink-400 text-pink-500 px-6 py-3 rounded-full font-semibold text-sm hover:bg-pink-50 transition-all">
                                              Crear otro regalo
                                  </Link>Link>
                        </div>div>
                        <Link href="/" className="text-sm text-gray-400 hover:text-pink-400 transition-colors">
                                  ← Volver al inicio
                        </Link>Link>
                </div>div>
          </div>div>
        )
}

export default async function GraciasPage({ params }: { params: Promise<{ pageId: string }> }) {
    const { pageId } = await params
        return (
              <>
                    <Navbar />
                    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>div>}>
                            <GraciasContent pageId={pageId} />
                    </Suspense>Suspense>
              </>>
            )
}</></div>

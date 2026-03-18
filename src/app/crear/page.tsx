'use client'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { PLANS } from '@/lib/plans'
import { Upload, Music, Heart } from 'lucide-react'
import Navbar from '@/components/Navbar'

const USDT_WALLET = '0x839078eF6505dE73b7593C48a5C11AF59D57146A'
const PAYPAL_ME = 'https://paypal.me/samuelanriquez'

type PlanKey = keyof typeof PLANS

const planEmojis: Record<PlanKey, string> = { basic: '💌', premium: '💎', inlove: '🔥' }

function CrearForm() {
  const searchParams = useSearchParams()
  const initialPlan = (searchParams.get('plan') as PlanKey) || 'basic'

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [payMethod, setPayMethod] = useState<'paypal' | 'usdt'>('paypal')
  const [paid, setPaid] = useState(false)
  const [savedPageId, setSavedPageId] = useState<string | null>(null)
  const [form, setForm] = useState({
    plan: initialPlan,
    person_name: '',
    partner_name: '',
    start_date: '',
    message: '',
    customer_email: '',
    playlist_url: '',
    photos: [] as File[],
    photosPreviews: [] as string[],
  })

  const selectedPlan = PLANS[form.plan]

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handlePhotos(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []).slice(0, selectedPlan.photos)
    const previews = files.map(f => URL.createObjectURL(f))
    setForm(prev => ({ ...prev, photos: files, photosPreviews: previews }))
  }

  async function handleSubmit() {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('plan', form.plan)
      formData.append('person_name', form.person_name)
      formData.append('partner_name', form.partner_name)
      formData.append('start_date', form.start_date)
      formData.append('message', form.message)
      formData.append('customer_email', form.customer_email)
      if (form.playlist_url) formData.append('playlist_url', form.playlist_url)
      form.photos.forEach((photo, i) => formData.append(`photo_${i}`, photo))

      const res = await fetch('/api/crear-pagina', { method: 'POST', body: formData })
      if (!res.ok) throw new Error()
      const { pageId } = await res.json()
      setSavedPageId(pageId)

      // Abrir PayPal.me o mostrar USDT
      if (payMethod === 'paypal') {
        window.open(`${PAYPAL_ME}/${selectedPlan.price}USD`, '_blank')
      }
      setPaid(true)
    } catch {
      alert('Ocurrió un error. Por favor intentá de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const isStep1Valid = !!(form.person_name && form.partner_name && form.start_date && form.message && form.photos.length > 0)
  const isStep2Valid = !!(form.customer_email && form.customer_email.includes('@'))

  return (
    <div className="min-h-screen pt-24 pb-12 px-4" style={{ background: 'linear-gradient(135deg, #fff5f7 0%, #fff0f3 100%)' }}>
      <div className="max-w-xl mx-auto">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-1" style={{ fontFamily: 'var(--font-playfair)' }}>
            Crear mi <span className="gradient-text">regalo</span>
          </h1>
          <p className="text-gray-400 text-sm">Paso {step} de 2</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2].map(s => (
            <div key={s} className="flex items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                s <= step ? 'gradient-love text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                {s < step ? '✓' : s}
              </div>
              {s < 2 && <div className={`w-24 h-1 mx-1 rounded ${s < step ? 'bg-pink-400' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-7 shadow-sm border border-pink-100">

          {/* PASO 1: Datos + plan */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-center" style={{ fontFamily: 'var(--font-playfair)' }}>
                Personalizá tu regalo ✍️
              </h2>

              {/* Selector de plan compacto */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Plan elegido</label>
                <div className="flex gap-2">
                  {(Object.entries(PLANS) as [PlanKey, typeof PLANS[PlanKey]][]).map(([key, plan]) => (
                    <button
                      key={key}
                      onClick={() => setForm(f => ({ ...f, plan: key }))}
                      className={`flex-1 py-2 px-2 rounded-xl text-xs font-semibold border-2 transition-all ${
                        form.plan === key
                          ? 'border-pink-400 bg-pink-50 text-pink-600'
                          : 'border-gray-200 text-gray-400 hover:border-pink-200'
                      }`}
                    >
                      {planEmojis[key]} {plan.name}
                      <div className="font-bold text-sm mt-0.5">${plan.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Nombres */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Tu nombre</label>
                  <input
                    name="person_name"
                    value={form.person_name}
                    onChange={handleChange}
                    placeholder="Ej: Juan"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-pink-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Nombre de tu amor</label>
                  <input
                    name="partner_name"
                    value={form.partner_name}
                    onChange={handleChange}
                    placeholder="Ej: María"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-pink-400 transition-colors"
                  />
                </div>
              </div>

              {/* Fecha */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">¿Cuándo comenzó su historia? 💕</label>
                <input
                  type="date"
                  name="start_date"
                  value={form.start_date}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-pink-400 transition-colors"
                />
              </div>

              {/* Mensaje */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Tu mensaje para {form.partner_name || 'tu amor'} 💌
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Escribí algo desde el corazón..."
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-pink-400 transition-colors resize-none"
                />
              </div>

              {/* Fotos */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  <Upload className="inline w-4 h-4 mr-1" />
                  Fotos (hasta {selectedPlan.photos})
                </label>
                <input type="file" accept="image/*" multiple onChange={handlePhotos} className="hidden" id="photos-input" />
                <label
                  htmlFor="photos-input"
                  className="block border-2 border-dashed border-pink-200 rounded-2xl p-4 text-center cursor-pointer hover:border-pink-400 transition-colors"
                >
                  {form.photosPreviews.length > 0 ? (
                    <div className="flex flex-wrap gap-2 justify-center">
                      {form.photosPreviews.map((src, i) => (
                        <img key={i} src={src} alt="" className="w-16 h-16 object-cover rounded-xl" />
                      ))}
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-400 text-sm">Tocá para subir fotos</p>
                      <p className="text-gray-300 text-xs mt-0.5">Máx. {selectedPlan.photos} fotos</p>
                    </div>
                  )}
                </label>
              </div>

              {/* Playlist (solo premium e inlove) */}
              {(form.plan === 'premium' || form.plan === 'inlove') && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    <Music className="inline w-4 h-4 mr-1" />
                    Playlist de Spotify (opcional)
                  </label>
                  <input
                    name="playlist_url"
                    value={form.playlist_url}
                    onChange={handleChange}
                    placeholder="https://open.spotify.com/playlist/..."
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-pink-400 transition-colors"
                  />
                </div>
              )}

              <button
                onClick={() => setStep(2)}
                disabled={!isStep1Valid}
                className="w-full gradient-love text-white py-3 rounded-full font-semibold hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continuar →
              </button>
            </div>
          )}

          {/* PASO 2: Email + resumen + pago */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-center" style={{ fontFamily: 'var(--font-playfair)' }}>
                ¡Casi listo! 🎁
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Tu email</label>
                <input
                  type="email"
                  name="customer_email"
                  value={form.customer_email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-pink-400 transition-colors"
                />
                <p className="text-xs text-gray-400 mt-1">Aquí recibirás el link y el QR de la página.</p>
              </div>

              {/* Resumen */}
              <div className="bg-pink-50 rounded-2xl p-4 border border-pink-100 text-sm">
                <h3 className="font-bold text-gray-700 mb-3">Resumen del regalo</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Plan</span>
                    <span className="font-medium">{planEmojis[form.plan]} {selectedPlan.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Para</span>
                    <span className="font-medium">{form.partner_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Fotos</span>
                    <span className="font-medium">{form.photos.length} foto{form.photos.length !== 1 ? 's' : ''}</span>
                  </div>
                  {form.plan === 'inlove' && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Ideas de citas</span>
                      <span className="font-medium text-green-500">✓ Incluidas</span>
                    </div>
                  )}
                  <div className="border-t border-pink-200 pt-2 flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold gradient-text text-base">${selectedPlan.price} USD</span>
                  </div>
                </div>
              </div>

              {/* Selector método de pago */}
              {!paid && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Método de pago</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setPayMethod('paypal')}
                      className={`py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                        payMethod === 'paypal' ? 'border-blue-400 bg-blue-50 text-blue-600' : 'border-gray-200 text-gray-400'
                      }`}
                    >
                      🅿️ PayPal
                    </button>
                    <button
                      onClick={() => setPayMethod('usdt')}
                      className={`py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                        payMethod === 'usdt' ? 'border-green-400 bg-green-50 text-green-600' : 'border-gray-200 text-gray-400'
                      }`}
                    >
                      💚 USDT (BEP20)
                    </button>
                  </div>
                </div>
              )}

              {/* Post-pago: instrucciones */}
              {paid && savedPageId && (
                <div className={`rounded-2xl p-4 space-y-3 border ${payMethod === 'paypal' ? 'bg-blue-50 border-blue-200' : 'bg-green-50 border-green-200'}`}>
                  <h3 className={`font-bold text-sm ${payMethod === 'paypal' ? 'text-blue-700' : 'text-green-700'}`}>
                    {payMethod === 'paypal' ? '✅ ¡Se abrió PayPal!' : '✅ ¡Instrucciones de pago USDT!'}
                  </h3>

                  {payMethod === 'usdt' && (
                    <>
                      <p className="text-xs text-green-600">Enviá exactamente <strong>${selectedPlan.price} USDT</strong> en red <strong>BNB Smart Chain (BEP20)</strong> a:</p>
                      <div className="bg-white rounded-xl p-3 break-all text-xs font-mono text-gray-700 select-all border border-green-200">
                        {USDT_WALLET}
                      </div>
                    </>
                  )}

                  {payMethod === 'paypal' && (
                    <p className="text-xs text-blue-600">
                      Completá el pago de <strong>${selectedPlan.price} USD</strong> en la ventana de PayPal que se abrió.
                    </p>
                  )}

                  <p className="text-xs text-gray-500">
                    Una vez pagado, envianos el comprobante por WhatsApp y activamos tu página en minutos. 🚀
                  </p>
                  <a
                    href={`https://wa.me/+542664944337?text=Hola! Hice el pago por Love4U (${payMethod === 'paypal' ? 'PayPal' : 'USDT'}). ID: ${savedPageId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-[#25D366] text-white py-2.5 rounded-full text-sm font-bold text-center hover:opacity-90 transition-all"
                  >
                    📲 Enviar comprobante por WhatsApp
                  </a>
                </div>
              )}

              {!paid && (
                <button
                  onClick={handleSubmit}
                  disabled={!isStep2Valid || loading}
                  className="w-full gradient-love text-white py-3.5 rounded-full font-bold text-base hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Procesando...</>
                  ) : (
                    <><Heart className="w-5 h-5" /> Pagar ${selectedPlan.price} USD</>
                  )}
                </button>
              )}

              <div className="flex items-center justify-between">
                {!paid && (
                  <button onClick={() => setStep(1)} className="text-sm text-gray-400 hover:text-pink-500 transition-colors">
                    ← Atrás
                  </button>
                )}
                <p className="text-xs text-gray-400 ml-auto">🔒 Pago 100% seguro</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function CrearPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
        <CrearForm />
      </Suspense>
    </>
  )
}

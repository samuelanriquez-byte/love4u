'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: '¿Cuánto tarda en estar lista mi página?',
    answer: 'En menos de 5 minutos después de confirmar el pago recibirás el link y el QR en tu email.',
  },
  {
    question: '¿Puedo editar la página después de crearla?',
    answer: 'Por ahora las páginas son estáticas una vez creadas. Si necesitás hacer cambios, contactanos por WhatsApp.',
  },
  {
    question: '¿Qué pasa cuando vence el plan básico?',
    answer: 'La página deja de estar disponible al año. El plan Premium e In-Love duran de por vida.',
  },
  {
    question: '¿La otra persona puede ver que fue creada en Love4U?',
    answer: 'La página tiene nuestro logo discretamente. Si querés una versión sin marca, contactanos.',
  },
  {
    question: '¿Qué es la canción del plan Premium?',
    answer: 'Podés incluir el link de un video de YouTube — su canción favorita, la que los representa, o cualquier tema especial. Se reproduce directamente en la página.',
  },
  {
    question: '¿Cuáles son las 3 ideas de citas del plan In-Love?',
    answer: 'Son 3 ideas de citas románticas personalizadas que te enviamos por email al momento de la compra, para que tengan planes especiales juntos.',
  },
  {
    question: '¿Los pagos son seguros?',
    answer: 'Sí. Usamos PayPal, una de las plataformas de pago más seguras del mundo. Podés pagar con tarjeta de crédito, débito o saldo PayPal.',
  },
  {
    question: '¿Qué formas de pago aceptan?',
    answer: 'Aceptamos PayPal (con tarjeta de crédito, débito o saldo PayPal). El proceso es rápido, seguro y sin complicaciones.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Preguntas <span className="gradient-text">frecuentes</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden border border-pink-100"
            >
              <button
                className="w-full text-left px-6 py-5 flex items-center justify-between hover:bg-pink-50 transition-colors"
                onClick={() => setOpen(open === index ? null : index)}
              >
                <span className="font-medium text-gray-800 pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-pink-400 flex-shrink-0 transition-transform ${open === index ? 'rotate-180' : ''}`}
                />
              </button>
              {open === index && (
                <div className="px-6 pb-5">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const steps = [
  {
    number: '01',
    emoji: '💌',
    title: 'Elige tu plan',
    description: 'Seleccioná el plan que más se adapte a lo que querés regalar.',
  },
  {
    number: '02',
    emoji: '✍️',
    title: 'Personalizá el regalo',
    description: 'Subí fotos, escribí tu mensaje, elegí la música y la fecha especial de su historia.',
  },
  {
    number: '03',
    emoji: '💳',
    title: 'Realizá el pago',
    description: 'Pago seguro con PayPal o USDT. Proceso rápido y sin complicaciones.',
  },
  {
    number: '04',
    emoji: '📱',
    title: 'Recibí tu página + QR',
    description: 'En minutos recibís por email el link de la página y un QR exclusivo para imprimir o compartir.',
  },
  {
    number: '05',
    emoji: '🎁',
    title: '¡Sorprendé a tu amor!',
    description: 'Comparti el QR o el link y dejá que la magia haga lo suyo. 💕',
  },
]

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 px-4 bg-gradient-to-b from-white to-pink-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            ¿Cómo <span className="gradient-text">funciona?</span>
          </h2>
          <p className="text-gray-600 text-lg">Simple, rápido y lleno de amor.</p>
        </div>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-6 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 gradient-love rounded-2xl flex items-center justify-center text-white font-bold text-sm">
                  {step.number}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{step.emoji}</span>
                  <h3 className="text-xl font-semibold" style={{ fontFamily: 'var(--font-playfair)' }}>
                    {step.title}
                  </h3>
                </div>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

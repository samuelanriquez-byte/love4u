import Link from 'next/link'
import { PLANS } from '@/lib/plans'
import { Check } from 'lucide-react'

const planEmojis = {
  basic: '💌',
  premium: '💎',
  inlove: '🔥',
}

const planColors = {
  basic: 'border-pink-200',
  premium: 'border-pink-400 ring-2 ring-pink-400',
  inlove: 'border-red-400',
}

const planBadge = {
  basic: null,
  premium: 'Más popular',
  inlove: 'Más completo',
}

export default function Pricing() {
  return (
    <section id="planes" className="py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Elige tu <span className="gradient-text">regalo perfecto</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Desde un gesto simple hasta la experiencia más completa. Todos incluyen una página única con QR para compartir.
          </p>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-3 gap-6 md:gap-8">
          {(Object.entries(PLANS) as [keyof typeof PLANS, typeof PLANS[keyof typeof PLANS]][]).map(([key, plan]) => (
            <div
              key={key}
              className={`relative bg-white rounded-3xl p-8 border-2 card-hover ${planColors[key]}`}
            >
              {planBadge[key] && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="gradient-love text-white text-sm font-semibold px-4 py-1 rounded-full">
                    {planBadge[key]}
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <div className="text-5xl mb-3">{planEmojis[key]}</div>
                <h3 className="text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-playfair)' }}>
                  {plan.name}
                </h3>
                <p className="text-gray-400 text-sm">{plan.duration}</p>
                <div className="mt-4">
                  <span className="text-5xl font-bold gradient-text" style={{ fontFamily: 'var(--font-playfair)' }}>
                    ${plan.price}
                  </span>
                  <span className="text-gray-400 ml-1">USD</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-pink-500 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/crear?plan=${key}`}
                className={`block text-center py-3 px-6 rounded-full font-semibold transition-all ${
                  key === 'premium'
                    ? 'gradient-love text-white hover:opacity-90'
                    : 'border-2 border-pink-400 text-pink-500 hover:bg-pink-50'
                }`}
              >
                Elegir {plan.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const examples = [
  {
    from: 'Mateo',
    to: 'Luciana',
    date: '14 Feb 2022',
    days: 762,
    message: 'Desde el primer día supe que eras vos. Gracias por hacer de cada momento algo mágico.',
    color: 'from-[#2a001a] to-[#0d0010]',
    accent: '#ff6b9d',
  },
  {
    from: 'Agustín',
    to: 'Camila',
    date: '20 Sep 2021',
    days: 908,
    message: 'Sos mi lugar favorito en el mundo. Te amo más que ayer y menos que mañana. 💕',
    color: 'from-[#001a2a] to-[#000d1a]',
    accent: '#6bb5ff',
  },
  {
    from: 'Nicolás',
    to: 'Valentina',
    date: '1 Mar 2023',
    days: 382,
    message: 'No necesito el mundo entero, con tenerte a vos me alcanza y me sobra.',
    color: 'from-[#1a001a] to-[#0d000d]',
    accent: '#c96bff',
  },
]

function MiniLovePage({ ex }: { ex: typeof examples[0] }) {
  return (
    <div
      className="rounded-3xl overflow-hidden flex-shrink-0 w-72 shadow-xl border border-white/10 hover:scale-[1.02] transition-transform duration-300"
      style={{ background: `linear-gradient(160deg, ${ex.color.replace('from-', '').replace(' to-', ', ')})` }}
    >
      <div className="p-6">
        {/* Header */}
        <div className="text-center mb-5">
          <div className="text-4xl mb-3">💝</div>
          <p style={{ color: ex.accent, fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '4px' }}>
            Un regalo de
          </p>
          <p className="text-white font-bold text-xl" style={{ fontFamily: 'var(--font-playfair)' }}>
            {ex.from}
          </p>
          <p style={{ color: ex.accent, fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', margin: '4px 0' }}>
            para
          </p>
          <p className="font-bold text-lg" style={{ fontFamily: 'var(--font-playfair)', color: ex.accent }}>
            {ex.to}
          </p>
        </div>

        {/* Contador */}
        <div
          className="rounded-2xl p-3 text-center mb-4"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <p style={{ color: ex.accent, fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }}>
            💕 Desde el {ex.date}
          </p>
          <p className="text-white font-bold text-3xl" style={{ fontFamily: 'var(--font-playfair)' }}>
            {ex.days.toLocaleString('es-AR')}
          </p>
          <p style={{ color: ex.accent, fontSize: '10px' }}>días juntos</p>
        </div>

        {/* Foto placeholder */}
        <div
          className="rounded-2xl mb-4 flex items-center justify-center"
          style={{
            height: '100px',
            background: `linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))`,
            border: `1px solid ${ex.accent}30`,
          }}
        >
          <span className="text-4xl opacity-30">🌹</span>
        </div>

        {/* Mensaje */}
        <div
          className="rounded-2xl p-4"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <p style={{ color: ex.accent, fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
            💌 Mensaje especial
          </p>
          <p
            className="text-white italic text-sm leading-relaxed"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            &ldquo;{ex.message}&rdquo;
          </p>
          <p className="text-right mt-2 text-xs" style={{ color: ex.accent }}>— {ex.from} 💕</p>
        </div>
      </div>
    </div>
  )
}

export default function Showcase() {
  return (
    <section className="py-20 overflow-hidden" style={{ background: 'linear-gradient(180deg, #fff5f7 0%, #ffeef3 100%)' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-pink-400 text-sm uppercase tracking-widest mb-3">Ejemplos reales</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Así queda el <span className="gradient-text">regalo</span>
          </h2>
          <p className="text-gray-500 text-lg">
            Cada página es única. Esto es lo que ve tu pareja al abrir el link. 💕
          </p>
        </div>

        {/* Cards — scroll horizontal en mobile, flex en desktop */}
        <div className="flex gap-6 overflow-x-auto pb-4 justify-start lg:justify-center" style={{ scrollbarWidth: 'none' }}>
          {examples.map((ex, i) => (
            <MiniLovePage key={i} ex={ex} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <a
            href="/crear"
            className="inline-block gradient-love text-white px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-all transform hover:scale-105 shadow-lg"
          >
            Crear el mío ahora ✨
          </a>
        </div>
      </div>
    </section>
  )
}

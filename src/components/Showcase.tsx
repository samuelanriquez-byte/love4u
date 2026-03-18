'use client'

const examples = [
  {
    from: 'Mateo',
    to: 'Luciana',
    date: '14 Feb 2022',
    days: 762,
    message: 'Desde el primer día supe que eras vos. Gracias por hacer de cada momento algo mágico.',
    bg: 'linear-gradient(160deg, #0d0010 0%, #2a001a 50%, #1a000d 100%)',
    accent: '#ff6b9d',
    glow: 'rgba(233,30,140,0.35)',
    rotate: '-2deg',
  },
  {
    from: 'Agustín',
    to: 'Camila',
    date: '20 Sep 2021',
    days: 908,
    message: 'Sos mi lugar favorito en el mundo. Te amo más que ayer y menos que mañana. 💕',
    bg: 'linear-gradient(160deg, #00101a 0%, #001e2e 50%, #000d1a 100%)',
    accent: '#6bb5ff',
    glow: 'rgba(107,181,255,0.25)',
    rotate: '0deg',
  },
  {
    from: 'Nicolás',
    to: 'Valentina',
    date: '1 Mar 2023',
    days: 382,
    message: 'No necesito el mundo entero, con tenerte a vos me alcanza y me sobra. 🌹',
    bg: 'linear-gradient(160deg, #0d000d 0%, #1e0028 50%, #0d000d 100%)',
    accent: '#c96bff',
    glow: 'rgba(201,107,255,0.25)',
    rotate: '2deg',
  },
]

function ShowcaseCard({ ex, index }: { ex: typeof examples[0]; index: number }) {
  return (
    <div
      style={{
        flex: '0 0 280px',
        borderRadius: '28px',
        background: ex.bg,
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: `0 24px 64px ${ex.glow}, 0 4px 16px rgba(0,0,0,0.4)`,
        transform: `rotate(${ex.rotate})`,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        overflow: 'hidden',
        position: 'relative',
      }}
      onMouseEnter={e => {
        ;(e.currentTarget as HTMLElement).style.transform = 'rotate(0deg) scale(1.03)'
        ;(e.currentTarget as HTMLElement).style.boxShadow = `0 32px 80px ${ex.glow}, 0 8px 24px rgba(0,0,0,0.5)`
      }}
      onMouseLeave={e => {
        ;(e.currentTarget as HTMLElement).style.transform = `rotate(${ex.rotate})`
        ;(e.currentTarget as HTMLElement).style.boxShadow = `0 24px 64px ${ex.glow}, 0 4px 16px rgba(0,0,0,0.4)`
      }}
    >
      {/* Glow interno */}
      <div style={{
        position: 'absolute',
        top: '-60px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${ex.glow} 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div style={{ padding: '28px 24px', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '36px', marginBottom: '12px' }}>💝</div>
          <p style={{ color: ex.accent, fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', margin: '0 0 6px', opacity: 0.8 }}>
            Un regalo de
          </p>
          <p style={{ color: 'white', fontFamily: 'var(--font-playfair)', fontSize: '22px', fontWeight: 'bold', margin: '0 0 4px', textShadow: `0 0 20px ${ex.glow}` }}>
            {ex.from}
          </p>
          <p style={{ color: ex.accent, fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', margin: '0 0 4px', opacity: 0.8 }}>
            para
          </p>
          <p style={{ color: ex.accent, fontFamily: 'var(--font-playfair)', fontSize: '20px', fontWeight: 'bold', margin: 0 }}>
            {ex.to}
          </p>
        </div>

        {/* Contador */}
        <div style={{
          background: 'rgba(255,255,255,0.07)',
          border: `1px solid ${ex.accent}30`,
          borderRadius: '16px',
          padding: '14px',
          textAlign: 'center',
          marginBottom: '16px',
        }}>
          <p style={{ color: ex.accent, fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 6px', opacity: 0.8 }}>
            💕 Desde el {ex.date}
          </p>
          <p style={{ color: 'white', fontFamily: 'var(--font-playfair)', fontSize: '36px', fontWeight: 'bold', margin: '0 0 2px', lineHeight: 1 }}>
            {ex.days.toLocaleString('es-AR')}
          </p>
          <p style={{ color: ex.accent, fontSize: '11px', margin: 0, opacity: 0.8 }}>días juntos</p>
        </div>

        {/* Foto placeholder */}
        <div style={{
          borderRadius: '14px',
          marginBottom: '16px',
          height: '90px',
          background: `linear-gradient(135deg, ${ex.accent}15, rgba(255,255,255,0.03))`,
          border: `1px solid ${ex.accent}20`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{ fontSize: '28px', opacity: 0.35 }}>🌹</span>
        </div>

        {/* Mensaje */}
        <div style={{
          background: 'rgba(255,255,255,0.06)',
          border: `1px solid ${ex.accent}20`,
          borderRadius: '14px',
          padding: '14px',
        }}>
          <p style={{ color: ex.accent, fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 8px', opacity: 0.8 }}>
            💌 Mensaje especial
          </p>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-playfair)', fontSize: '12px', lineHeight: '1.7', fontStyle: 'italic', margin: '0 0 8px' }}>
            &ldquo;{ex.message}&rdquo;
          </p>
          <p style={{ color: ex.accent, fontSize: '10px', textAlign: 'right', margin: 0, opacity: 0.8 }}>
            — {ex.from} 💕
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Showcase() {
  return (
    <section style={{ padding: '96px 0', background: 'linear-gradient(180deg, #fff5f7 0%, #fce4ec 100%)', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>

        {/* Título */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <p style={{ color: '#e91e8c', fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '12px', fontWeight: 600 }}>
            Ejemplos reales
          </p>
          <h2
            style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 'bold', margin: '0 0 16px', color: '#1a0010' }}
          >
            Así queda el{' '}
            <span style={{
              background: 'linear-gradient(135deg, #e91e8c, #ff6b9d)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              regalo
            </span>
          </h2>
          <p style={{ color: '#9e6070', fontSize: '17px', margin: 0 }}>
            Esto es exactamente lo que ve tu pareja al abrir el link. 💕
          </p>
        </div>

        {/* Cards */}
        <div style={{
          display: 'flex',
          gap: '28px',
          overflowX: 'auto',
          paddingBottom: '24px',
          paddingTop: '12px',
          justifyContent: 'center',
          scrollbarWidth: 'none',
          alignItems: 'center',
        }}>
          {examples.map((ex, i) => (
            <ShowcaseCard key={i} ex={ex} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <a
            href="/crear"
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #e91e8c 0%, #ff6b9d 50%, #ff8fab 100%)',
              color: 'white',
              padding: '16px 36px',
              borderRadius: '999px',
              fontSize: '17px',
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 8px 32px rgba(233,30,140,0.35)',
              transition: 'opacity 0.2s',
            }}
          >
            Crear el mío ahora ✨
          </a>
          <p style={{ color: '#c49aaa', fontSize: '13px', marginTop: '12px' }}>
            Lista en menos de 5 minutos · Desde $10 USD
          </p>
        </div>
      </div>
    </section>
  )
}

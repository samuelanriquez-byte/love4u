import Link from 'next/link'

function PhoneMockup() {
  return (
    <div className="relative flex justify-center items-center">
      {/* Glow detrás del teléfono */}
      <div
        className="absolute rounded-full blur-3xl opacity-30"
        style={{
          width: '320px',
          height: '320px',
          background: 'radial-gradient(circle, #e91e8c, #ff8fab)',
        }}
      />

      {/* Cuerpo del teléfono */}
      <div
        className="relative z-10 rounded-[44px] shadow-2xl overflow-hidden"
        style={{
          width: '260px',
          height: '520px',
          background: '#0d0010',
          border: '8px solid #1a0015',
          boxShadow: '0 40px 80px rgba(233,30,140,0.25), 0 0 0 1px rgba(255,255,255,0.08)',
        }}
      >
        {/* Notch */}
        <div
          className="absolute top-3 left-1/2 -translate-x-1/2 z-20 rounded-full"
          style={{ width: '72px', height: '20px', background: '#1a0015' }}
        />

        {/* Pantalla — mini versión de la love page */}
        <div
          className="w-full h-full overflow-hidden flex flex-col items-center pt-10 px-3 pb-4"
          style={{ background: 'linear-gradient(160deg, #0d0010 0%, #2a001a 50%, #1a000d 100%)' }}
        >
          {/* Partículas decorativas mini */}
          <div className="absolute top-14 left-4 text-xs opacity-20 float" style={{ animationDelay: '0s' }}>💕</div>
          <div className="absolute top-20 right-4 text-xs opacity-20 float" style={{ animationDelay: '0.6s' }}>✨</div>
          <div className="absolute bottom-20 left-3 text-xs opacity-20 float" style={{ animationDelay: '1.2s' }}>🌹</div>

          {/* Corazón */}
          <div className="pulse-heart text-3xl mb-2">💝</div>

          {/* De / Para */}
          <p className="text-pink-400 text-center mb-0.5" style={{ fontSize: '7px', letterSpacing: '2px' }}>
            UN REGALO DE
          </p>
          <p
            className="text-white font-bold text-center mb-0.5"
            style={{ fontSize: '16px', fontFamily: 'var(--font-playfair)', textShadow: '0 0 20px rgba(255,107,157,0.5)' }}
          >
            Sebastián
          </p>
          <p className="text-pink-400 text-center mb-0.5" style={{ fontSize: '7px', letterSpacing: '2px' }}>PARA</p>
          <p
            className="font-bold text-center mb-3"
            style={{ fontSize: '14px', fontFamily: 'var(--font-playfair)', color: '#ff6b9d' }}
          >
            Valentina
          </p>

          {/* Counter */}
          <div
            className="w-full rounded-2xl p-2 mb-3 text-center"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <p className="text-pink-400 mb-1" style={{ fontSize: '6px', letterSpacing: '1.5px' }}>💕 JUNTOS DESDE EL 14 FEB 2022</p>
            <div className="flex justify-center gap-2">
              {[['847', 'días'], ['14', 'hrs'], ['32', 'min'], ['07', 'seg']].map(([v, l]) => (
                <div key={l} className="flex flex-col items-center">
                  <span className="text-white font-bold" style={{ fontSize: '11px', fontFamily: 'var(--font-playfair)' }}>{v}</span>
                  <span className="text-pink-400" style={{ fontSize: '5px', letterSpacing: '0.5px' }}>{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Foto placeholder */}
          <div
            className="w-full rounded-2xl mb-3 relative overflow-hidden"
            style={{ height: '110px', background: 'linear-gradient(135deg, #3d0030 0%, #1a0015 100%)' }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl opacity-30">🌹</span>
            </div>
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)' }}
            />
            {/* Dots */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className="rounded-full"
                  style={{
                    width: i === 0 ? '12px' : '5px',
                    height: '5px',
                    background: i === 0 ? '#ff6b9d' : 'rgba(255,255,255,0.3)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Mensaje */}
          <div
            className="w-full rounded-2xl p-2"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <p className="text-pink-400 mb-1" style={{ fontSize: '6px', letterSpacing: '1.5px' }}>💌 MENSAJE ESPECIAL</p>
            <p
              className="text-white italic leading-relaxed"
              style={{ fontSize: '7.5px', fontFamily: 'var(--font-playfair)', lineHeight: '1.5' }}
            >
              &ldquo;Cada día a tu lado es el más feliz de mi vida. Te amo más que ayer y menos que mañana.&rdquo;
            </p>
            <p className="text-pink-400 text-right mt-1" style={{ fontSize: '6px' }}>— Sebastián 💕</p>
          </div>
        </div>
      </div>

      {/* Badge flotante "Vista previa" */}
      <div
        className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-semibold text-white shadow-lg"
        style={{ background: 'linear-gradient(135deg, #e91e8c, #ff6b9d)', whiteSpace: 'nowrap' }}
      >
        ✨ Así ve tu amor el regalo
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl opacity-10 float" style={{ animationDelay: '0s' }}>💕</div>
        <div className="absolute top-40 right-20 text-5xl opacity-10 float" style={{ animationDelay: '0.5s' }}>❤️</div>
        <div className="absolute bottom-40 left-20 text-4xl opacity-10 float" style={{ animationDelay: '1s' }}>🌹</div>
        <div className="absolute bottom-20 right-10 text-6xl opacity-10 float" style={{ animationDelay: '1.5s' }}>💖</div>
        <div className="absolute top-1/2 left-5 text-3xl opacity-10 float" style={{ animationDelay: '2s' }}>✨</div>
        <div className="absolute top-1/3 right-5 text-3xl opacity-10 float" style={{ animationDelay: '0.8s' }}>💫</div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-12">
        {/* Layout dos columnas en desktop */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">

          {/* Columna izquierda — texto */}
          <div className="flex-1 text-center lg:text-left max-w-xl">
            <div className="pulse-heart text-7xl mb-6 block lg:hidden text-center">💝</div>
            <div className="pulse-heart text-7xl mb-6 hidden lg:block">💝</div>

            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              El regalo más{' '}
              <span className="gradient-text">especial</span>
              <br />para tu amor
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Crea una página web romántica y personalizada con fotos, música y mensajes únicos.
              Un regalo digital que dura para siempre. 💌
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-10">
              <Link
                href="/crear"
                className="gradient-love text-white px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-all transform hover:scale-105 shadow-lg"
              >
                Crear mi regalo ahora ✨
              </Link>
              <Link
                href="#planes"
                className="border-2 border-pink-400 text-pink-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-pink-50 transition-all"
              >
                Ver planes
              </Link>
            </div>

            {/* Estadísticas */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 text-center mb-10">
              <div>
                <p className="text-3xl font-bold gradient-text" style={{ fontFamily: 'var(--font-playfair)' }}>+100</p>
                <p className="text-sm text-gray-500">parejas felices</p>
              </div>
              <div>
                <p className="text-3xl font-bold gradient-text" style={{ fontFamily: 'var(--font-playfair)' }}>3</p>
                <p className="text-sm text-gray-500">planes disponibles</p>
              </div>
              <div>
                <p className="text-3xl font-bold gradient-text" style={{ fontFamily: 'var(--font-playfair)' }}>∞</p>
                <p className="text-sm text-gray-500">amor garantizado</p>
              </div>
            </div>

            {/* Testimoniales */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { name: 'Valentina M.', text: '¡Mi novio lloró cuando lo vio! Fue el regalo más lindo.', stars: 5 },
                { name: 'Carlos R.', text: 'Super fácil de hacer y quedó hermoso. 100% recomendado.', stars: 5 },
                { name: 'Sofía L.', text: 'La playlist fue un detalle increíble. Ella no podía creerlo 💕', stars: 5 },
              ].map((t, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-pink-100 text-left">
                  <p className="text-yellow-400 text-sm mb-1">{'★'.repeat(t.stars)}</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-2">&ldquo;{t.text}&rdquo;</p>
                  <p className="text-pink-500 text-xs font-semibold">— {t.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Columna derecha — mock de teléfono */}
          <div className="flex-shrink-0 pb-6">
            <PhoneMockup />
          </div>

        </div>
      </div>
    </section>
  )
}

import Link from 'next/link'

function PhoneMockup() {
  return (
    <div className="relative flex justify-center items-center" style={{ paddingTop: '48px', paddingBottom: '48px', paddingLeft: '24px', paddingRight: '24px' }}>
      {/* Glow detrás del teléfono */}
      <div
        className="absolute rounded-full blur-3xl opacity-25 pointer-events-none"
        style={{
          width: '340px',
          height: '340px',
          background: 'radial-gradient(circle, #e91e8c, #ff8fab)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Notificación flotante — arriba a la izquierda del teléfono */}
      <div
        className="absolute z-20 flex items-center gap-2 bg-white rounded-2xl px-3 py-2 shadow-xl border border-pink-100"
        style={{
          top: '10px',
          left: '-10px',
          minWidth: '190px',
          animation: 'float 3s ease-in-out infinite',
        }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm"
          style={{ background: 'linear-gradient(135deg, #e91e8c, #ff6b9d)' }}
        >
          💌
        </div>
        <div>
          <p className="text-gray-800 font-semibold text-xs leading-tight">¡Valentina abrió tu regalo!</p>
          <p className="text-gray-400 text-xs">hace un momento</p>
        </div>
      </div>

      {/* Badge de reacción — abajo a la derecha */}
      <div
        className="absolute z-20 flex items-center gap-1.5 bg-white rounded-2xl px-3 py-2 shadow-xl border border-pink-100"
        style={{
          bottom: '24px',
          right: '-8px',
          animation: 'float 3.5s ease-in-out infinite',
          animationDelay: '1s',
        }}
      >
        <span className="text-base">😭</span>
        <span className="text-base">❤️</span>
        <p className="text-gray-700 font-semibold text-xs">¡Lloré de amor!</p>
      </div>

      {/* Cuerpo del teléfono — rotado levemente */}
      <div
        style={{
          transform: 'rotate(4deg)',
          transformOrigin: 'center center',
        }}
      >
        <div
          className="relative rounded-[40px] overflow-hidden"
          style={{
            width: '240px',
            height: '480px',
            background: '#0d0010',
            border: '7px solid #1a0015',
            boxShadow: '0 40px 80px rgba(233,30,140,0.3), 0 8px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)',
          }}
        >
          {/* Notch */}
          <div
            className="absolute top-2.5 left-1/2 -translate-x-1/2 z-20 rounded-full"
            style={{ width: '64px', height: '18px', background: '#1a0015' }}
          />

          {/* Pantalla */}
          <div
            className="w-full h-full flex flex-col items-center pt-9 px-3 pb-3 overflow-hidden"
            style={{ background: 'linear-gradient(160deg, #0d0010 0%, #2a001a 50%, #1a000d 100%)' }}
          >
            {/* Partículas */}
            <div className="absolute top-12 left-3 text-xs opacity-20 float" style={{ animationDelay: '0s' }}>💕</div>
            <div className="absolute top-18 right-3 text-xs opacity-20 float" style={{ animationDelay: '0.7s' }}>✨</div>

            {/* Corazón */}
            <div className="pulse-heart text-2xl mb-1.5">💝</div>

            {/* Nombres */}
            <p className="text-pink-400 text-center" style={{ fontSize: '6px', letterSpacing: '2px', marginBottom: '2px' }}>
              UN REGALO DE
            </p>
            <p
              className="text-white font-bold text-center"
              style={{ fontSize: '15px', fontFamily: 'var(--font-playfair)', textShadow: '0 0 20px rgba(255,107,157,0.5)', marginBottom: '2px' }}
            >
              Sebastián
            </p>
            <p className="text-pink-400 text-center" style={{ fontSize: '6px', letterSpacing: '2px', marginBottom: '2px' }}>PARA</p>
            <p
              className="font-bold text-center"
              style={{ fontSize: '13px', fontFamily: 'var(--font-playfair)', color: '#ff6b9d', marginBottom: '10px' }}
            >
              Valentina
            </p>

            {/* Contador */}
            <div
              className="w-full rounded-xl p-2 text-center"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '8px' }}
            >
              <p className="text-pink-400" style={{ fontSize: '5.5px', letterSpacing: '1.5px', marginBottom: '4px' }}>
                💕 JUNTOS DESDE EL 14 FEB 2022
              </p>
              <div className="flex justify-center gap-3">
                {[['847', 'días'], ['14', 'hrs'], ['32', 'min'], ['07', 'seg']].map(([v, l]) => (
                  <div key={l} className="flex flex-col items-center">
                    <span className="text-white font-bold" style={{ fontSize: '12px', fontFamily: 'var(--font-playfair)' }}>{v}</span>
                    <span className="text-pink-400" style={{ fontSize: '5px' }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Foto */}
            <div
              className="w-full rounded-xl relative overflow-hidden"
              style={{ height: '95px', background: 'linear-gradient(135deg, #3d0030 0%, #1a0015 100%)', marginBottom: '8px', flexShrink: 0 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl opacity-25">🌹</span>
              </div>
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)' }} />
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                {[0, 1, 2].map(i => (
                  <div key={i} className="rounded-full" style={{ width: i === 0 ? '12px' : '4px', height: '4px', background: i === 0 ? '#ff6b9d' : 'rgba(255,255,255,0.3)' }} />
                ))}
              </div>
            </div>

            {/* Mensaje */}
            <div
              className="w-full rounded-xl p-2"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <p className="text-pink-400" style={{ fontSize: '5.5px', letterSpacing: '1.5px', marginBottom: '4px' }}>💌 MENSAJE ESPECIAL</p>
              <p
                className="text-white italic"
                style={{ fontSize: '7px', fontFamily: 'var(--font-playfair)', lineHeight: '1.6' }}
              >
                &ldquo;Cada día a tu lado es el más feliz de mi vida. Te amo más que ayer y menos que mañana.&rdquo;
              </p>
              <p className="text-pink-400 text-right" style={{ fontSize: '5.5px', marginTop: '3px' }}>— Sebastián 💕</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl opacity-10 float" style={{ animationDelay: '0s' }}>💕</div>
        <div className="absolute top-40 right-20 text-5xl opacity-10 float" style={{ animationDelay: '0.5s' }}>❤️</div>
        <div className="absolute bottom-40 left-20 text-4xl opacity-10 float" style={{ animationDelay: '1s' }}>🌹</div>
        <div className="absolute bottom-20 right-10 text-6xl opacity-10 float" style={{ animationDelay: '1.5s' }}>💖</div>
        <div className="absolute top-1/2 left-5 text-3xl opacity-10 float" style={{ animationDelay: '2s' }}>✨</div>
        <div className="absolute top-1/3 right-5 text-3xl opacity-10 float" style={{ animationDelay: '0.8s' }}>💫</div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">

          {/* Columna izquierda */}
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
                Ver precios
              </Link>
            </div>

            {/* Estadísticas */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 text-center mb-10">
              <div>
                <p className="text-3xl font-bold gradient-text" style={{ fontFamily: 'var(--font-playfair)' }}>+10.000</p>
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

          {/* Columna derecha — mock teléfono */}
          <div className="flex-shrink-0 hidden lg:flex items-center justify-center">
            <PhoneMockup />
          </div>

        </div>
      </div>
    </section>
  )
}

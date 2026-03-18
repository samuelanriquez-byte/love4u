import Link from 'next/link'

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

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="pulse-heart text-7xl mb-6">💝</div>
        <h1
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          El regalo más{' '}
          <span className="gradient-text">especial</span>
          <br />para tu amor
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Crea una página web romántica y personalizada con fotos, música y mensajes únicos.
          Un regalo digital que dura para siempre. 💌
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
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
        <div className="flex flex-wrap justify-center gap-8 text-center mb-12">
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            { name: 'Valentina M.', text: '¡Mi novio lloró cuando lo vio! Fue el regalo más lindo que le pude dar.', stars: 5 },
            { name: 'Carlos R.', text: 'Super fácil de hacer y quedó hermoso. Lo recomiendo 100%.', stars: 5 },
            { name: 'Sofía L.', text: 'La playlist fue un detalle increíble. Ella no podía creerlo 💕', stars: 5 },
          ].map((t, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-pink-100 text-left">
              <p className="text-yellow-400 text-sm mb-1">{'★'.repeat(t.stars)}</p>
              <p className="text-gray-600 text-sm leading-relaxed mb-2">"{t.text}"</p>
              <p className="text-pink-500 text-xs font-semibold">— {t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

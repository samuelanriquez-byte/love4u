'use client'
import { useState, useEffect } from 'react'
import { LovePage } from '@/lib/supabase'

function getDaysTogether(startDate: string) {
  const start = new Date(startDate)
  const now = new Date()
  const diff = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  return diff
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function LovePageView({ page }: { page: LovePage }) {
  const [currentPhoto, setCurrentPhoto] = useState(0)
  const [showMessage, setShowMessage] = useState(false)
  const days = getDaysTogether(page.start_date)

  useEffect(() => {
    const timer = setTimeout(() => setShowMessage(true), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #1a0010 0%, #2d0020 30%, #1a0010 100%)' }}>
      {/* Partículas decorativas */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {['💕', '✨', '🌹', '💫', '❤️', '🌸'].map((emoji, i) => (
          <div
            key={i}
            className="absolute text-2xl opacity-20 float"
            style={{
              left: `${10 + i * 15}%`,
              top: `${10 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          >
            {emoji}
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div
          className={`text-center mb-10 transition-all duration-1000 ${showMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="pulse-heart text-6xl mb-4">💝</div>
          <p className="text-pink-300 text-sm uppercase tracking-widest mb-2">Un regalo especial de</p>
          <h1
            className="text-4xl md:text-6xl font-bold text-white mb-2"
            style={{ fontFamily: 'var(--font-playfair)', textShadow: '0 0 30px rgba(255,107,157,0.5)' }}
          >
            {page.person_name}
          </h1>
          <p className="text-pink-300 text-sm uppercase tracking-widest">para</p>
          <h2
            className="text-3xl md:text-5xl font-bold mt-1"
            style={{
              fontFamily: 'var(--font-playfair)',
              background: 'linear-gradient(135deg, #ff6b9d, #ffb3c6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {page.partner_name}
          </h2>
        </div>

        {/* Contador de días */}
        <div
          className={`bg-white/10 backdrop-blur-sm rounded-3xl p-6 mb-8 text-center border border-white/20 transition-all duration-1000 delay-300 ${showMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="text-pink-300 text-sm mb-2">Juntos desde el {formatDate(page.start_date)}</p>
          <div className="flex items-center justify-center gap-4">
            <div>
              <p className="text-5xl font-bold text-white" style={{ fontFamily: 'var(--font-playfair)' }}>
                {days.toLocaleString('es-AR')}
              </p>
              <p className="text-pink-300 text-sm">días juntos 💕</p>
            </div>
          </div>
        </div>

        {/* Galería de fotos */}
        {page.photos && page.photos.length > 0 && (
          <div
            className={`mb-8 transition-all duration-1000 delay-500 ${showMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="relative rounded-3xl overflow-hidden aspect-square bg-black/20">
              <img
                src={page.photos[currentPhoto]}
                alt={`Foto ${currentPhoto + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Overlay gradiente */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Thumbnails */}
            {page.photos.length > 1 && (
              <div className="flex gap-3 mt-3 justify-center flex-wrap">
                {page.photos.map((photo, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPhoto(i)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      i === currentPhoto ? 'border-pink-400 scale-110' : 'border-white/20'
                    }`}
                  >
                    <img src={photo} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Mensaje */}
        <div
          className={`bg-white/10 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-white/20 transition-all duration-1000 delay-700 ${showMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="text-pink-300 text-sm uppercase tracking-widest mb-4">💌 Mensaje especial</p>
          <p
            className="text-white text-lg leading-relaxed italic"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            &ldquo;{page.message}&rdquo;
          </p>
          <p className="text-pink-300 mt-4 text-right">— {page.person_name} 💕</p>
        </div>

        {/* Playlist */}
        {page.playlist_url && (
          <div
            className={`mb-8 transition-all duration-1000 delay-900 ${showMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <p className="text-pink-300 text-sm uppercase tracking-widest mb-3 text-center">🎵 Nuestra playlist</p>
            <div className="rounded-2xl overflow-hidden">
              <iframe
                src={page.playlist_url.replace('spotify.com/', 'spotify.com/embed/')}
                width="100%"
                height="152"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="border-0"
              />
            </div>
          </div>
        )}

        {/* Ideas de citas (plan inlove) */}
        {page.date_ideas && page.date_ideas.length > 0 && (
          <div
            className={`mb-8 transition-all duration-1000 delay-1000 ${showMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <p className="text-pink-300 text-sm uppercase tracking-widest mb-4 text-center">✨ Ideas para su próxima cita</p>
            <div className="space-y-4">
              {page.date_ideas.map((idea: string, i: number) => {
                const parsed = JSON.parse(idea)
                return (
                  <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                    <h4 className="text-white font-bold mb-1">{parsed.title}</h4>
                    <p className="text-pink-200 text-sm">{parsed.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Footer de la página */}
        <div
          className={`text-center mt-12 transition-all duration-1000 delay-1000 ${showMessage ? 'opacity-100' : 'opacity-0'}`}
        >
          <p className="text-pink-400 text-xs">Hecho con 💕 en</p>
          <p className="text-white font-bold text-lg" style={{ fontFamily: 'var(--font-playfair)' }}>Love4U</p>
        </div>
      </div>
    </div>
  )
}

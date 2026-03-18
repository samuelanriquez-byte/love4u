'use client'
import { useState, useEffect } from 'react'
import { LovePage } from '@/lib/supabase'

function getTimeTogether(startDate: string) {
  const start = new Date(startDate)
  const now = new Date()
  const diff = now.getTime() - start.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  return { days, hours, minutes, seconds }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const PARTICLES = ['💕', '✨', '🌹', '💫', '❤️', '🌸', '💗', '⭐']

export default function LovePageView({ page }: { page: LovePage }) {
  const [currentPhoto, setCurrentPhoto] = useState(0)
  const [visible, setVisible] = useState(false)
  const [time, setTime] = useState(getTimeTogether(page.start_date))

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeTogether(page.start_date))
    }, 1000)
    return () => clearInterval(interval)
  }, [page.start_date])

  const prevPhoto = () => setCurrentPhoto(i => (i === 0 ? page.photos.length - 1 : i - 1))
  const nextPhoto = () => setCurrentPhoto(i => (i === page.photos.length - 1 ? 0 : i + 1))

  return (
    <div
      className="min-h-screen relative"
      style={{ background: 'linear-gradient(160deg, #0d0010 0%, #2a001a 40%, #1a000d 70%, #0d0010 100%)' }}
    >
      {/* Partículas flotantes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {PARTICLES.map((emoji, i) => (
          <div
            key={i}
            className="absolute float"
            style={{
              left: `${5 + i * 12}%`,
              top: `${8 + (i % 4) * 22}%`,
              fontSize: `${1.2 + (i % 3) * 0.4}rem`,
              opacity: 0.12 + (i % 3) * 0.04,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${3.5 + i * 0.3}s`,
            }}
          >
            {emoji}
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-xl mx-auto px-4 py-14 pb-20">

        {/* HEADER */}
        <div
          className="text-center mb-10"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.9s ease, transform 0.9s ease',
          }}
        >
          <div className="pulse-heart text-7xl mb-6 block">💝</div>
          <p className="text-pink-400 text-xs uppercase tracking-[0.25em] mb-3 font-light">
            Un regalo especial de
          </p>
          <h1
            className="text-5xl md:text-6xl font-bold text-white mb-3 leading-tight"
            style={{
              fontFamily: 'var(--font-playfair)',
              textShadow: '0 0 40px rgba(255,107,157,0.4)',
            }}
          >
            {page.person_name}
          </h1>
          <p className="text-pink-400 text-xs uppercase tracking-[0.25em] mb-3 font-light">para</p>
          <h2
            className="text-4xl md:text-5xl font-bold leading-tight"
            style={{
              fontFamily: 'var(--font-playfair)',
              background: 'linear-gradient(135deg, #ff6b9d 0%, #ffb3c6 50%, #ff6b9d 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {page.partner_name}
          </h2>
        </div>

        {/* CONTADOR EN VIVO */}
        <div
          className="rounded-3xl p-6 mb-8 text-center border border-white/10"
          style={{
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(16px)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s',
          }}
        >
          <p className="text-pink-400 text-xs uppercase tracking-widest mb-4">
            💕 Juntos desde el {formatDate(page.start_date)}
          </p>
          <div className="grid grid-cols-4 gap-3">
            {[
              { value: time.days.toLocaleString('es-AR'), label: 'días' },
              { value: String(time.hours).padStart(2, '0'), label: 'horas' },
              { value: String(time.minutes).padStart(2, '0'), label: 'min' },
              { value: String(time.seconds).padStart(2, '0'), label: 'seg' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center">
                <span
                  className="text-3xl md:text-4xl font-bold text-white"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  {value}
                </span>
                <span className="text-pink-400 text-xs uppercase tracking-wider mt-1">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* GALERÍA */}
        {page.photos && page.photos.length > 0 && (
          <div
            className="mb-8"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.9s ease 0.4s, transform 0.9s ease 0.4s',
            }}
          >
            <div className="relative rounded-3xl overflow-hidden bg-black/30 shadow-2xl">
              {/* Foto principal */}
              <div className="aspect-[4/3] relative">
                <img
                  src={page.photos[currentPhoto]}
                  alt={`Foto ${currentPhoto + 1}`}
                  className="w-full h-full object-cover"
                  style={{ transition: 'opacity 0.3s ease' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Flechas de navegación */}
                {page.photos.length > 1 && (
                  <>
                    <button
                      onClick={prevPhoto}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-all"
                    >
                      ‹
                    </button>
                    <button
                      onClick={nextPhoto}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-all"
                    >
                      ›
                    </button>
                    {/* Indicadores */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
                      {page.photos.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentPhoto(i)}
                          className="transition-all"
                          style={{
                            width: i === currentPhoto ? '20px' : '6px',
                            height: '6px',
                            borderRadius: '3px',
                            background: i === currentPhoto ? '#ff6b9d' : 'rgba(255,255,255,0.4)',
                          }}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {page.photos.length > 1 && (
              <div className="flex gap-2 mt-3 justify-center flex-wrap">
                {page.photos.map((photo, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPhoto(i)}
                    className="w-14 h-14 rounded-xl overflow-hidden transition-all"
                    style={{
                      border: i === currentPhoto ? '2px solid #ff6b9d' : '2px solid rgba(255,255,255,0.15)',
                      transform: i === currentPhoto ? 'scale(1.1)' : 'scale(1)',
                    }}
                  >
                    <img src={photo} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* MENSAJE */}
        <div
          className="rounded-3xl p-8 mb-8 border border-white/10"
          style={{
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(16px)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.9s ease 0.6s, transform 0.9s ease 0.6s',
          }}
        >
          <p className="text-pink-400 text-xs uppercase tracking-widest mb-5">💌 Mensaje especial</p>
          <p
            className="text-white text-lg leading-relaxed italic"
            style={{ fontFamily: 'var(--font-playfair)', lineHeight: '1.8' }}
          >
            &ldquo;{page.message}&rdquo;
          </p>
          <div className="flex items-center justify-end gap-2 mt-5">
            <span className="text-pink-300 text-sm">— {page.person_name}</span>
            <span className="text-lg">💕</span>
          </div>
        </div>

        {/* PLAYLIST */}
        {page.playlist_url && (
          <div
            className="mb-8"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.9s ease 0.8s, transform 0.9s ease 0.8s',
            }}
          >
            <p className="text-pink-400 text-xs uppercase tracking-widest mb-3 text-center">🎵 Nuestra playlist</p>
            <div
              className="rounded-2xl overflow-hidden border border-white/10"
              style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)' }}
            >
              <iframe
                src={page.playlist_url.replace('spotify.com/', 'spotify.com/embed/')}
                width="100%"
                height="152"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="border-0 block"
              />
            </div>
          </div>
        )}

        {/* IDEAS DE CITAS */}
        {page.date_ideas && page.date_ideas.length > 0 && (
          <div
            className="mb-8"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.9s ease 1s, transform 0.9s ease 1s',
            }}
          >
            <p className="text-pink-400 text-xs uppercase tracking-widest mb-4 text-center">
              ✨ Ideas para su próxima cita
            </p>
            <div className="space-y-3">
              {page.date_ideas.map((idea: string, i: number) => {
                let parsed: { title: string; description: string }
                try {
                  parsed = JSON.parse(idea)
                } catch {
                  parsed = { title: `Cita ${i + 1}`, description: idea }
                }
                return (
                  <div
                    key={i}
                    className="rounded-2xl p-5 border border-white/10"
                    style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)' }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                        style={{ background: 'linear-gradient(135deg, #e91e8c, #ff6b9d)' }}
                      >
                        {i + 1}
                      </span>
                      <h4 className="text-white font-semibold text-sm">{parsed.title}</h4>
                    </div>
                    <p className="text-pink-200 text-sm leading-relaxed pl-8">{parsed.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* FOOTER */}
        <div
          className="text-center mt-14"
          style={{
            opacity: visible ? 1 : 0,
            transition: 'opacity 1s ease 1.2s',
          }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10"
            style={{ background: 'rgba(255,255,255,0.05)' }}
          >
            <span className="text-pink-400 text-xs">Hecho con</span>
            <span className="text-base">💕</span>
            <span className="text-white text-xs font-semibold" style={{ fontFamily: 'var(--font-playfair)' }}>
              Love4U
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

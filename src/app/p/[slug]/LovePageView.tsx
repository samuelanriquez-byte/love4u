'use client'
import { useState, useEffect } from 'react'
import { LovePage } from '@/lib/supabase'

function getTimeTogether(startDate: string) {
  const diff = Date.now() - new Date(startDate).getTime()
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('es-AR', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

const PARTICLES = ['💕', '✨', '🌹', '💫', '❤️', '🌸', '💗', '⭐']

// ── Pantalla de apertura ──────────────────────────────────────────────────────
function OpeningScreen({ partnerName, personName, onOpen }: {
  partnerName: string
  personName: string
  onOpen: () => void
}) {
  const [closing, setClosing] = useState(false)
  const [burst, setBurst] = useState(false)

  function handleOpen() {
    setBurst(true)
    setTimeout(() => setClosing(true), 300)
    setTimeout(() => onOpen(), 900)
  }

  return (
    <div
      className={closing ? 'fade-out-up' : ''}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(160deg, #0d0010 0%, #2a001a 45%, #1a000d 100%)',
        padding: '24px',
      }}
    >
      {/* Partículas flotantes */}
      {PARTICLES.map((emoji, i) => (
        <div
          key={i}
          className="float"
          style={{
            position: 'absolute',
            left: `${8 + i * 11}%`,
            top: `${10 + (i % 4) * 20}%`,
            fontSize: `${1.2 + (i % 3) * 0.5}rem`,
            opacity: 0.1 + (i % 3) * 0.04,
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${3.5 + i * 0.3}s`,
            pointerEvents: 'none',
          }}
        >
          {emoji}
        </div>
      ))}

      {/* Glow */}
      <div style={{
        position: 'absolute',
        width: '400px', height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(233,30,140,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Contenido central */}
      <div className="rise-in" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        {/* Sobre animado */}
        <div
          className={burst ? 'heart-burst' : 'shimmer'}
          style={{ fontSize: '80px', marginBottom: '32px', display: 'block', cursor: 'pointer' }}
          onClick={handleOpen}
        >
          💌
        </div>

        <p style={{
          color: 'rgba(255,143,171,0.7)',
          fontSize: '12px',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          marginBottom: '12px',
        }}>
          Tenés un regalo especial
        </p>

        <h1 style={{
          color: 'white',
          fontFamily: 'var(--font-playfair)',
          fontSize: 'clamp(2.2rem, 8vw, 3.5rem)',
          fontWeight: 'bold',
          margin: '0 0 8px',
          textShadow: '0 0 40px rgba(255,107,157,0.4)',
          lineHeight: 1.2,
        }}>
          {partnerName}
        </h1>

        <p style={{
          color: 'rgba(255,143,171,0.6)',
          fontSize: '14px',
          marginBottom: '48px',
        }}>
          de parte de <span style={{ color: '#ff8fab', fontWeight: 600 }}>{personName}</span>
        </p>

        {/* Botón abrir */}
        <button
          onClick={handleOpen}
          style={{
            background: 'linear-gradient(135deg, #e91e8c, #ff6b9d)',
            color: 'white',
            border: 'none',
            padding: '16px 40px',
            borderRadius: '999px',
            fontSize: '17px',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(233,30,140,0.4)',
            transition: 'transform 0.2s, opacity 0.2s',
            letterSpacing: '0.3px',
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          Abrir mi regalo 💝
        </button>

        <p style={{
          color: 'rgba(255,143,171,0.35)',
          fontSize: '11px',
          marginTop: '16px',
          letterSpacing: '1px',
        }}>
          Tocá para ver tu sorpresa
        </p>
      </div>
    </div>
  )
}

// ── Página de amor ────────────────────────────────────────────────────────────
export default function LovePageView({ page }: { page: LovePage }) {
  const [opened, setOpened] = useState(false)
  const [visible, setVisible] = useState(false)
  const [currentPhoto, setCurrentPhoto] = useState(0)
  const [time, setTime] = useState(getTimeTogether(page.start_date))

  useEffect(() => {
    if (!opened) return
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [opened])

  useEffect(() => {
    if (!opened) return
    const interval = setInterval(() => setTime(getTimeTogether(page.start_date)), 1000)
    return () => clearInterval(interval)
  }, [opened, page.start_date])

  const prevPhoto = () => setCurrentPhoto(i => (i === 0 ? page.photos.length - 1 : i - 1))
  const nextPhoto = () => setCurrentPhoto(i => (i === page.photos.length - 1 ? 0 : i + 1))

  return (
    <>
      {!opened && (
        <OpeningScreen
          partnerName={page.partner_name}
          personName={page.person_name}
          onOpen={() => setOpened(true)}
        />
      )}

      {/* Página de amor — se monta desde el inicio pero invisible hasta que abren */}
      <div
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(160deg, #0d0010 0%, #2a001a 40%, #1a000d 70%, #0d0010 100%)',
          opacity: opened ? 1 : 0,
          transition: 'opacity 0.8s ease 0.2s',
        }}
      >
        {/* Partículas */}
        <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
          {PARTICLES.map((emoji, i) => (
            <div key={i} className="float" style={{
              position: 'absolute',
              left: `${5 + i * 12}%`,
              top: `${8 + (i % 4) * 22}%`,
              fontSize: `${1.2 + (i % 3) * 0.4}rem`,
              opacity: 0.12 + (i % 3) * 0.04,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${3.5 + i * 0.3}s`,
            }}>
              {emoji}
            </div>
          ))}
        </div>

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '580px', margin: '0 auto', padding: '56px 16px 80px' }}>

          {/* HEADER */}
          <div style={{
            textAlign: 'center', marginBottom: '40px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.9s ease, transform 0.9s ease',
          }}>
            <div className="pulse-heart" style={{ fontSize: '72px', marginBottom: '24px', display: 'block' }}>💝</div>
            <p style={{ color: '#ff8fab', fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '12px', opacity: 0.8 }}>
              Un regalo especial de
            </p>
            <h1 style={{
              color: 'white', fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(2.5rem, 8vw, 3.5rem)', fontWeight: 'bold',
              margin: '0 0 8px', textShadow: '0 0 40px rgba(255,107,157,0.4)', lineHeight: 1.2,
            }}>
              {page.person_name}
            </h1>
            <p style={{ color: '#ff8fab', fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', margin: '0 0 8px', opacity: 0.8 }}>para</p>
            <h2 style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(2rem, 7vw, 3rem)', fontWeight: 'bold', margin: 0,
              color: '#ff6b9d', lineHeight: 1.2,
            }}>
              {page.partner_name}
            </h2>
          </div>

          {/* CONTADOR */}
          <div style={{
            background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)',
            borderRadius: '24px', padding: '20px', marginBottom: '24px',
            border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center',
            opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.9s ease 0.15s, transform 0.9s ease 0.15s',
          }}>
            <p style={{ color: '#ff8fab', fontSize: '9px', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '16px', opacity: 0.8 }}>
              💕 Juntos desde el {formatDate(page.start_date)}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
              {[
                { value: time.days.toLocaleString('es-AR'), label: 'días' },
                { value: String(time.hours).padStart(2, '0'), label: 'horas' },
                { value: String(time.minutes).padStart(2, '0'), label: 'min' },
                { value: String(time.seconds).padStart(2, '0'), label: 'seg' },
              ].map(({ value, label }) => (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ color: 'white', fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.6rem, 5vw, 2.2rem)', fontWeight: 'bold', lineHeight: 1 }}>
                    {value}
                  </span>
                  <span style={{ color: '#ff8fab', fontSize: '9px', letterSpacing: '1px', marginTop: '4px', opacity: 0.7 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* GALERÍA */}
          {page.photos && page.photos.length > 0 && (
            <div style={{
              marginBottom: '24px',
              opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s',
            }}>
              <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', background: 'rgba(0,0,0,0.3)' }}>
                <div style={{ aspectRatio: '4/3', position: 'relative' }}>
                  <img src={page.photos[currentPhoto]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)' }} />
                </div>

                {page.photos.length > 1 && (
                  <>
                    <button onClick={prevPhoto} style={{
                      position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
                      width: '36px', height: '36px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)',
                      background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', color: 'white',
                      fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>‹</button>
                    <button onClick={nextPhoto} style={{
                      position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                      width: '36px', height: '36px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)',
                      background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', color: 'white',
                      fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>›</button>
                    <div style={{ position: 'absolute', bottom: '12px', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '6px' }}>
                      {page.photos.map((_, i) => (
                        <button key={i} onClick={() => setCurrentPhoto(i)} style={{
                          width: i === currentPhoto ? '20px' : '6px', height: '6px',
                          borderRadius: '3px', border: 'none', cursor: 'pointer',
                          background: i === currentPhoto ? '#ff6b9d' : 'rgba(255,255,255,0.4)',
                          transition: 'all 0.3s',
                        }} />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {page.photos.length > 1 && (
                <div style={{ display: 'flex', gap: '8px', marginTop: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  {page.photos.map((photo, i) => (
                    <button key={i} onClick={() => setCurrentPhoto(i)} style={{
                      width: '52px', height: '52px', borderRadius: '12px', overflow: 'hidden', padding: 0,
                      border: i === currentPhoto ? '2px solid #ff6b9d' : '2px solid rgba(255,255,255,0.15)',
                      transform: i === currentPhoto ? 'scale(1.1)' : 'scale(1)',
                      transition: 'all 0.2s', cursor: 'pointer',
                    }}>
                      <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* MENSAJE */}
          <div style={{
            background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)',
            borderRadius: '24px', padding: '28px 24px', marginBottom: '24px',
            border: '1px solid rgba(255,255,255,0.1)',
            opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.9s ease 0.45s, transform 0.9s ease 0.45s',
          }}>
            <p style={{ color: '#ff8fab', fontSize: '9px', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '16px', opacity: 0.8 }}>
              💌 Mensaje especial
            </p>
            <p style={{
              color: 'white', fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(1rem, 3vw, 1.15rem)', lineHeight: 1.85, fontStyle: 'italic', margin: '0 0 16px',
            }}>
              &ldquo;{page.message}&rdquo;
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
              <span style={{ color: '#ff8fab', fontSize: '13px' }}>— {page.person_name}</span>
              <span style={{ fontSize: '16px' }}>💕</span>
            </div>
          </div>

          {/* CANCIÓN */}
          {page.playlist_url && (
            <div style={{
              marginBottom: '24px',
              opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.9s ease 0.6s, transform 0.9s ease 0.6s',
            }}>
              <p style={{ color: '#ff8fab', fontSize: '9px', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '12px', textAlign: 'center', opacity: 0.8 }}>
                🎵 Nuestra canción
              </p>
              <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                <iframe
                  src={(() => {
                    const url = page.playlist_url
                    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
                    return match ? `https://www.youtube.com/embed/${match[1]}` : ''
                  })()}
                  width="100%" height="200"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  style={{ border: 'none', display: 'block' }}
                />
              </div>
            </div>
          )}

          {/* IDEAS DE CITAS */}
          {page.date_ideas && page.date_ideas.length > 0 && (
            <div style={{
              marginBottom: '24px',
              opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.9s ease 0.75s, transform 0.9s ease 0.75s',
            }}>
              <p style={{ color: '#ff8fab', fontSize: '9px', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '16px', textAlign: 'center', opacity: 0.8 }}>
                ✨ Ideas para su próxima cita
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {page.date_ideas.map((idea: string, i: number) => {
                  let parsed: { title: string; description: string }
                  try { parsed = JSON.parse(idea) } catch { parsed = { title: `Cita ${i + 1}`, description: idea } }
                  return (
                    <div key={i} style={{
                      background: 'rgba(255,255,255,0.06)', borderRadius: '16px', padding: '16px 18px',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                        <span style={{
                          width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0,
                          background: 'linear-gradient(135deg, #e91e8c, #ff6b9d)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: 'white', fontSize: '11px', fontWeight: 'bold',
                        }}>{i + 1}</span>
                        <span style={{ color: 'white', fontWeight: 600, fontSize: '14px' }}>{parsed.title}</span>
                      </div>
                      <p style={{ color: 'rgba(255,180,200,0.75)', fontSize: '13px', lineHeight: 1.6, margin: '0 0 0 32px' }}>
                        {parsed.description}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* FOOTER */}
          <div style={{
            textAlign: 'center', marginTop: '48px',
            opacity: visible ? 1 : 0, transition: 'opacity 1s ease 0.9s',
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '999px', padding: '8px 20px',
            }}>
              <span style={{ color: '#ff8fab', fontSize: '12px' }}>Hecho con</span>
              <span style={{ fontSize: '14px' }}>💕</span>
              <span style={{ color: 'white', fontSize: '13px', fontWeight: 600, fontFamily: 'var(--font-playfair)' }}>Love4U</span>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

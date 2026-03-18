import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const from = searchParams.get('from') || ''
  const to = searchParams.get('to') || ''

  const isPersonalized = from && to

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(160deg, #0d0010 0%, #2a001a 45%, #1a000d 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Círculos decorativos de fondo */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            left: '-120px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(233,30,140,0.2) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            right: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,107,157,0.15) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '700px',
            height: '700px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(233,30,140,0.08) 0%, transparent 65%)',
          }}
        />

        {/* Emojis decorativos */}
        <div style={{ position: 'absolute', top: '40px', left: '60px', fontSize: '48px', opacity: 0.2 }}>💕</div>
        <div style={{ position: 'absolute', top: '80px', right: '80px', fontSize: '40px', opacity: 0.2 }}>❤️</div>
        <div style={{ position: 'absolute', bottom: '60px', left: '100px', fontSize: '36px', opacity: 0.15 }}>🌹</div>
        <div style={{ position: 'absolute', bottom: '50px', right: '60px', fontSize: '44px', opacity: 0.2 }}>💫</div>
        <div style={{ position: 'absolute', top: '200px', left: '30px', fontSize: '30px', opacity: 0.12 }}>✨</div>
        <div style={{ position: 'absolute', top: '180px', right: '40px', fontSize: '32px', opacity: 0.12 }}>🌸</div>

        {/* Contenido principal */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}>
          <div style={{ fontSize: '80px', marginBottom: '24px' }}>💝</div>

          {isPersonalized ? (
            <>
              <p style={{ color: '#ff8fab', fontSize: '22px', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '16px', fontFamily: 'serif' }}>
                Un regalo especial de
              </p>
              <h1 style={{ color: 'white', fontSize: '72px', fontFamily: 'serif', fontWeight: 'bold', margin: '0 0 12px', textShadow: '0 0 40px rgba(255,107,157,0.5)' }}>
                {from}
              </h1>
              <p style={{ color: '#ff8fab', fontSize: '22px', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '16px', fontFamily: 'serif' }}>
                para
              </p>
              <h2
                style={{
                  fontSize: '58px',
                  fontFamily: 'serif',
                  fontWeight: 'bold',
                  margin: 0,
                  background: 'linear-gradient(135deg, #ff6b9d, #ffb3c6)',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {to}
              </h2>
            </>
          ) : (
            <>
              <h1
                style={{
                  fontSize: '80px',
                  fontFamily: 'serif',
                  fontWeight: 'bold',
                  margin: '0 0 20px',
                  color: 'white',
                  textShadow: '0 0 40px rgba(255,107,157,0.5)',
                  textAlign: 'center',
                }}
              >
                Love4U
              </h1>
              <p
                style={{
                  fontSize: '30px',
                  fontFamily: 'serif',
                  color: '#ff8fab',
                  margin: '0 0 8px',
                  textAlign: 'center',
                }}
              >
                El regalo más especial para tu amor
              </p>
              <p style={{ fontSize: '22px', color: 'rgba(255,180,200,0.6)', margin: 0, letterSpacing: '2px' }}>
                Fotos · Música · Mensaje único
              </p>
            </>
          )}
        </div>

        {/* Badge inferior */}
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '999px',
            padding: '8px 20px',
          }}
        >
          <span style={{ fontSize: '18px' }}>💕</span>
          <span style={{ color: 'rgba(255,180,200,0.8)', fontSize: '16px', fontFamily: 'serif', letterSpacing: '2px' }}>
            love4u
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}

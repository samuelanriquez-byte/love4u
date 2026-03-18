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
        }}
      >
        {/* Glow central */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '600px',
            height: '600px',
            marginTop: '-300px',
            marginLeft: '-300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(233,30,140,0.12) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Emojis decorativos */}
        <div style={{ position: 'absolute', top: '50px', left: '70px', fontSize: '50px', opacity: 0.18, display: 'flex' }}>💕</div>
        <div style={{ position: 'absolute', top: '90px', right: '90px', fontSize: '42px', opacity: 0.18, display: 'flex' }}>❤️</div>
        <div style={{ position: 'absolute', bottom: '70px', left: '110px', fontSize: '38px', opacity: 0.14, display: 'flex' }}>🌹</div>
        <div style={{ position: 'absolute', bottom: '60px', right: '70px', fontSize: '46px', opacity: 0.18, display: 'flex' }}>💫</div>
        <div style={{ position: 'absolute', top: '220px', left: '40px', fontSize: '32px', opacity: 0.12, display: 'flex' }}>✨</div>
        <div style={{ position: 'absolute', top: '200px', right: '50px', fontSize: '34px', opacity: 0.12, display: 'flex' }}>🌸</div>

        {/* Contenido */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0px',
            zIndex: 10,
          }}
        >
          <div style={{ fontSize: '72px', marginBottom: '20px', display: 'flex' }}>💝</div>

          {isPersonalized ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <p style={{
                color: '#ff8fab',
                fontSize: '20px',
                letterSpacing: '5px',
                textTransform: 'uppercase',
                margin: '0 0 4px',
                fontFamily: 'serif',
                display: 'flex',
              }}>
                Un regalo especial de
              </p>
              <p style={{
                color: 'white',
                fontSize: '80px',
                fontFamily: 'serif',
                fontWeight: 'bold',
                margin: '0 0 4px',
                textShadow: '0 0 40px rgba(255,107,157,0.5)',
                display: 'flex',
              }}>
                {from}
              </p>
              <p style={{
                color: '#ff8fab',
                fontSize: '20px',
                letterSpacing: '5px',
                textTransform: 'uppercase',
                margin: '0 0 4px',
                fontFamily: 'serif',
                display: 'flex',
              }}>
                para
              </p>
              <p style={{
                color: '#ff6b9d',
                fontSize: '64px',
                fontFamily: 'serif',
                fontWeight: 'bold',
                margin: '0',
                display: 'flex',
              }}>
                {to}
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0px' }}>
              <p style={{
                fontSize: '88px',
                fontFamily: 'serif',
                fontWeight: 'bold',
                color: 'white',
                margin: '0 0 16px',
                textShadow: '0 0 40px rgba(255,107,157,0.5)',
                display: 'flex',
              }}>
                Love4U
              </p>
              <p style={{
                fontSize: '30px',
                fontFamily: 'serif',
                color: '#ff8fab',
                margin: '0 0 10px',
                display: 'flex',
              }}>
                El regalo más especial para tu amor
              </p>
              <p style={{
                fontSize: '20px',
                color: 'rgba(255,180,200,0.55)',
                margin: 0,
                letterSpacing: '3px',
                display: 'flex',
              }}>
                Fotos · Música · Mensaje único
              </p>
            </div>
          )}
        </div>

        {/* Badge inferior */}
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '999px',
            padding: '8px 22px',
          }}
        >
          <span style={{ fontSize: '18px', display: 'flex' }}>💕</span>
          <span style={{ color: 'rgba(255,180,200,0.75)', fontSize: '16px', fontFamily: 'serif', letterSpacing: '3px', display: 'flex' }}>
            love4u
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}

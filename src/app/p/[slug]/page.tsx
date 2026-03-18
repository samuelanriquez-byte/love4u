import { supabaseAdmin } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import LovePageView from './LovePageView'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { data } = await supabaseAdmin
    .from('love_pages')
    .select('partner_name, person_name')
    .eq('slug', slug)
    .eq('paid', true)
    .single()

  if (!data) return { title: 'Love4U' }

  const title = `💕 ${data.person_name} te tiene un regalo especial`
  const description = `Abrí para ver el regalo que ${data.person_name} preparó para vos. Solo para vos. 💌`
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://love4u-three.vercel.app'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${baseUrl}/p/${slug}`,
      images: [
        {
          url: `${baseUrl}/og-love.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/og-love.png`],
    },
  }
}

export default async function LovePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const { data: page } = await supabaseAdmin
    .from('love_pages')
    .select('*')
    .eq('slug', slug)
    .eq('paid', true)
    .eq('active', true)
    .single()

  if (!page) return notFound()

  // Verificar si expiró (plan básico)
  if (page.expires_at && new Date(page.expires_at) < new Date()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50">
        <div className="text-center p-8">
          <p className="text-6xl mb-4">💔</p>
          <h1 className="text-2xl font-bold text-gray-700 mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
            Esta página ya no está disponible
          </h1>
          <p className="text-gray-500">El período de este regalo ha vencido.</p>
        </div>
      </div>
    )
  }

  return <LovePageView page={page} />
}

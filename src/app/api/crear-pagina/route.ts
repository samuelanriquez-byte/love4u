import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { nanoid } from 'nanoid'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const plan = formData.get('plan') as string
    const person_name = formData.get('person_name') as string
    const partner_name = formData.get('partner_name') as string
    const start_date = formData.get('start_date') as string
    const message = formData.get('message') as string
    const customer_email = formData.get('customer_email') as string
    const playlist_url = formData.get('playlist_url') as string | null

    // Subir fotos a Supabase Storage
    const photoUrls: string[] = []
    let i = 0
    while (formData.has(`photo_${i}`)) {
      const photo = formData.get(`photo_${i}`) as File
      const ext = photo.name.split('.').pop()
      const fileName = `${nanoid()}.${ext}`

      const { error } = await supabaseAdmin.storage
        .from('love-photos')
        .upload(fileName, photo, { contentType: photo.type })

      if (!error) {
        const { data: { publicUrl } } = supabaseAdmin.storage
          .from('love-photos')
          .getPublicUrl(fileName)
        photoUrls.push(publicUrl)
      }
      i++
    }

    const slug = nanoid(10)

    // Calcular expiración para plan básico
    let expires_at: string | null = null
    if (plan === 'basic') {
      const expiry = new Date()
      expiry.setFullYear(expiry.getFullYear() + 1)
      expires_at = expiry.toISOString()
    }

    const { data, error } = await supabaseAdmin
      .from('love_pages')
      .insert({
        slug,
        plan,
        person_name,
        partner_name,
        start_date,
        message,
        customer_email,
        playlist_url: playlist_url || null,
        photos: photoUrls,
        paid: false,
        active: false,
        expires_at,
      })
      .select('id')
      .single()

    if (error) throw error

    return NextResponse.json({ pageId: data.id, slug })
  } catch (error) {
    console.error('Error creating page:', error)
    return NextResponse.json({ error: 'Error al crear la página' }, { status: 500 })
  }
}

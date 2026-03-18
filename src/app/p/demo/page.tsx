import LovePageView from '../[slug]/LovePageView'
import { LovePage } from '@/lib/supabase'

const demoPage: LovePage = {
  id: 'demo',
  slug: 'demo',
  plan: 'premium',
  person_name: 'Sebastián',
  partner_name: 'Valentina',
  start_date: '2022-02-14',
  message: 'Desde el primer día que te vi supe que algo especial estaba pasando. Gracias por llenar mi vida de risas, de abrazos y de momentos que no cambiaría por nada. Sos mi lugar favorito en el mundo. Te amo hoy, mañana y siempre. 💕',
  photos: [],
  playlist_url: '',
  date_ideas: [],
  active: true,
  paid: true,
  customer_email: 'demo@love4u.app',
  created_at: '2024-01-01',
}

export const metadata = {
  title: '💕 Así se ve tu regalo — Love4U',
  description: 'Página de demostración de Love4U',
}

export default function DemoPage() {
  return <LovePageView page={demoPage} />
}

export const PLANS = {
  basic: {
    name: 'Básico',
    price: 10,
    priceEur: 9,
    photos: 3,
    duration: '1 año',
    features: ['Hasta 3 fotos', 'Mensaje personalizado', 'Fecha de inicio', 'Link + QR exclusivo', 'Válido por 1 año'],
  },
  premium: {
    name: 'Premium',
    price: 15,
    priceEur: 14,
    photos: 7,
    duration: 'De por vida',
    features: ['Hasta 7 fotos', 'Mensaje personalizado', 'Fecha de inicio', 'Link + QR exclusivo', 'Playlist de Spotify', 'Válido de por vida'],
  },
  inlove: {
    name: 'In-Love',
    price: 17.5,
    priceEur: 16,
    photos: 7,
    duration: 'De por vida',
    features: ['Hasta 7 fotos', 'Mensaje personalizado', 'Fecha de inicio', 'Link + QR exclusivo', 'Playlist de Spotify', '3 ideas de citas románticas', 'Válido de por vida'],
  },
} as const

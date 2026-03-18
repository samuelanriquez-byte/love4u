export const DATE_IDEAS = [
  {
    title: '🌅 Amanecer juntos',
    description: 'Despiértense antes del amanecer, preparen café y vean salir el sol desde algún lugar especial.',
  },
  {
    title: '🍕 Noche de chef en casa',
    description: 'Elijan una receta nueva juntos, cocínenla en pareja y disfruten la cena con velas y música.',
  },
  {
    title: '🎨 Clase de arte improvisada',
    description: 'Consigan pinturas y un lienzo, pongan música y pinten algo que los represente como pareja.',
  },
  {
    title: '🌟 Noche de estrellas',
    description: 'Lleven una manta a un lugar oscuro, recuéstense y pasen la noche contando estrellas y hablando de sueños.',
  },
  {
    title: '💌 Cartas del futuro',
    description: 'Escriban cartas para leerlas en 1 año y guárdenlas en un sobre sellado en un lugar especial.',
  },
  {
    title: '🚂 Viaje a lo desconocido',
    description: 'Agarren el primer transporte disponible sin destino fijo y descubran juntos adónde los lleva.',
  },
  {
    title: '🎬 Cine en casa de película favorita',
    description: 'Cada uno elige su película favorita, preparen pochoclos caseros y tienen una maratón nocturna.',
  },
  {
    title: '🌊 Día de playa o río',
    description: 'Escapen a la naturaleza, lleven comida casera y desconéctense del mundo solo con música y el sonido del agua.',
  },
  {
    title: '📸 Sesión de fotos juntos',
    description: 'Recorran la ciudad y tómense fotos en lugares significativos para ambos, como si fueran fotógrafos.',
  },
  {
    title: '🎭 Noche de juegos de mesa',
    description: 'Elijan sus juegos favoritos, preparen snacks y pasen la noche riendo y compitiendo.',
  },
]

export function getRandomDateIdeas(count = 3): typeof DATE_IDEAS {
  const shuffled = [...DATE_IDEAS].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

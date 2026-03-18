import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-6xl mb-4">💔</p>
        <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
          Página no encontrada
        </h1>
        <p className="text-gray-500 mb-6">Esta página no existe o fue eliminada.</p>
        <Link href="/" className="gradient-love text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity">
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}

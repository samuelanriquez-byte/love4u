'use client'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-pink-100">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold gradient-text" style={{ fontFamily: 'var(--font-playfair)' }}>
          Love4U 💕
        </Link>
        <div className="flex items-center gap-6">
          <Link href="#planes" className="text-gray-600 hover:text-pink-500 transition-colors text-sm font-medium">
            Precios
          </Link>
          <Link href="/#como-funciona" className="text-gray-600 hover:text-pink-500 transition-colors text-sm font-medium">
            Cómo funciona
          </Link>
          <Link
            href="/crear"
            className="gradient-love text-white px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Crear mi regalo
          </Link>
        </div>
      </div>
    </nav>
  )
}

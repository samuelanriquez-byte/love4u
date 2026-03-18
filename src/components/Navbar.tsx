'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-pink-100">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold gradient-text"
          style={{ fontFamily: 'var(--font-playfair)' }}
          onClick={() => setOpen(false)}
        >
          Love4U 💕
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="#planes" className="text-gray-600 hover:text-pink-500 transition-colors text-sm font-medium">
            Precios
          </Link>
          <Link href="#como-funciona" className="text-gray-600 hover:text-pink-500 transition-colors text-sm font-medium">
            Cómo funciona
          </Link>
          <Link
            href="/crear"
            className="gradient-love text-white px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Crear mi regalo
          </Link>
        </div>

        {/* Mobile: botón CTA + hamburguesa */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            href="/crear"
            className="gradient-love text-white px-4 py-2 rounded-full text-xs font-semibold hover:opacity-90"
            onClick={() => setOpen(false)}
          >
            Crear regalo ✨
          </Link>
          <button
            onClick={() => setOpen(v => !v)}
            className="text-gray-600 hover:text-pink-500 transition-colors p-1"
            aria-label="Menú"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-white border-t border-pink-100 px-4 py-4 flex flex-col gap-4 shadow-lg">
          <Link
            href="#planes"
            className="text-gray-700 font-medium text-sm py-2 border-b border-pink-50"
            onClick={() => setOpen(false)}
          >
            💰 Precios
          </Link>
          <Link
            href="#como-funciona"
            className="text-gray-700 font-medium text-sm py-2 border-b border-pink-50"
            onClick={() => setOpen(false)}
          >
            ❓ Cómo funciona
          </Link>
          <Link
            href="#faq"
            className="text-gray-700 font-medium text-sm py-2"
            onClick={() => setOpen(false)}
          >
            💬 Preguntas frecuentes
          </Link>
        </div>
      )}
    </nav>
  )
}

'use client'
import { useState } from 'react'

interface PageRow {
  id: string
  slug: string
  plan: string
  person_name: string
  partner_name: string
  customer_email: string
  paid: boolean
  active: boolean
  created_at: string
  expires_at: string | null
}

export default function AdminPage() {
  const [secret, setSecret] = useState('')
  const [input, setInput] = useState('')
  const [pages, setPages] = useState<PageRow[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function fetchPages(s: string) {
    const res = await fetch('/api/admin/pages', {
      headers: { Authorization: `Bearer ${s}` },
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.pages as PageRow[]
  }

  async function login() {
    setLoading(true)
    setError('')
    const result = await fetchPages(input)
    if (!result) {
      setError('Contraseña incorrecta.')
      setLoading(false)
      return
    }
    setPages(result)
    setSecret(input)
    setLoading(false)
  }

  async function refresh() {
    const result = await fetchPages(secret)
    if (result) setPages(result)
  }

  if (!secret) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="bg-gray-900 rounded-2xl p-8 w-full max-w-sm border border-gray-800">
          <h1 className="text-white text-2xl font-bold mb-6 text-center">🔒 Admin Love4U</h1>
          <input
            type="password"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && login()}
            placeholder="Contraseña admin"
            className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 mb-4 outline-none border border-gray-700 focus:border-pink-500"
          />
          {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
          <button
            onClick={login}
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white"
            style={{ background: 'linear-gradient(135deg, #e91e8c, #ff6b9d)' }}
          >
            {loading ? 'Verificando...' : 'Entrar'}
          </button>
        </div>
      </div>
    )
  }

  const pending = pages.filter(p => !p.paid)
  const active = pages.filter(p => p.paid && p.active)

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">💝 Panel Admin — Love4U</h1>
          <button
            onClick={refresh}
            className="text-sm text-gray-400 hover:text-white border border-gray-700 px-4 py-2 rounded-xl"
          >
            ↻ Actualizar
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Pendientes de pago', value: pending.length, color: '#f59e0b' },
            { label: 'Páginas activas', value: active.length, color: '#10b981' },
            { label: 'Total pedidos', value: pages.length, color: '#e91e8c' },
          ].map(s => (
            <div key={s.label} className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
              <p className="text-3xl font-bold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-gray-400 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Pendientes */}
        {pending.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 text-yellow-400">⏳ Pendientes de pago</h2>
            <div className="space-y-3">
              {pending.map(p => <PageCard key={p.id} page={p} />)}
            </div>
          </div>
        )}

        {/* Activas */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-green-400">✅ Páginas activas ({active.length})</h2>
          {active.length === 0 ? (
            <p className="text-gray-600 text-sm">No hay páginas activas aún.</p>
          ) : (
            <div className="space-y-3">
              {active.map(p => <PageCard key={p.id} page={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function PageCard({ page }: { page: PageRow }) {
  const PLAN_LABEL: Record<string, string> = { basic: 'Básico', premium: 'Premium', inlove: 'In-Love' }
  const PLAN_COLOR: Record<string, string> = { basic: '#6b7280', premium: '#8b5cf6', inlove: '#e91e8c' }

  return (
    <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800 flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
            style={{ background: PLAN_COLOR[page.plan] || '#6b7280' }}
          >
            {PLAN_LABEL[page.plan] || page.plan}
          </span>
          {page.paid && page.active && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-green-900 text-green-400 border border-green-800">
              Activa
            </span>
          )}
          {!page.paid && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-900 text-yellow-400 border border-yellow-800">
              Sin pago
            </span>
          )}
        </div>
        <p className="text-white font-medium">
          {page.person_name} → {page.partner_name}
        </p>
        <p className="text-gray-500 text-sm truncate">{page.customer_email}</p>
        <p className="text-gray-600 text-xs mt-1">
          Creada: {new Date(page.created_at).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
          {page.expires_at && ` · Vence: ${new Date(page.expires_at).toLocaleDateString('es-AR')}`}
        </p>
      </div>
      {page.paid && (
        <a
          href={`/p/${page.slug}`}
          target="_blank"
          className="text-sm text-pink-400 hover:text-pink-300 border border-pink-900 px-3 py-1.5 rounded-lg transition-colors flex-shrink-0"
        >
          Ver página
        </a>
      )}
    </div>
  )
}

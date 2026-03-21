# Love4U

SaaS de regalos digitales románticos para enamorados. Mercado hispanohablante (Argentina principalmente).

## Qué es
Plataforma para crear páginas web románticas personalizadas como regalo para parejas. Similar a locoporti.com.ar.

## Stack
- Next.js 14 + TypeScript + Tailwind CSS
- Supabase (DB + storage de fotos)
- Stripe (pagos)
- Resend (emails con QR code)
- nanoid (slugs únicos)

## Planes
- Básico ($10 USD): 3 fotos, 1 año de duración
- Premium ($15 USD): 7 fotos, de por vida + playlist Spotify
- In-Love ($17.50 USD): igual que Premium + 3 ideas de citas por email

## Flujo principal
Elige plan → Formulario (fotos, mensaje, fecha) → Paga con Stripe → Recibe email con link + QR → Sorprende a su pareja

## Estructura clave
- `src/app/page.tsx` — Landing page
- `src/app/crear/page.tsx` — Formulario de 3 pasos
- `src/app/p/[slug]/page.tsx` — Página que ve el destinatario
- `src/app/gracias/page.tsx` — Página post-pago
- `src/app/api/crear-pagina/route.ts` — Crea borrador en Supabase
- `src/app/api/checkout/route.ts` — Genera sesión de Stripe
- `src/app/api/webhook/route.ts` — Activa la página al confirmar pago
- `src/lib/email.ts` — Envío de email con QR
- `src/lib/date-ideas.ts` — 10 ideas de citas (se eligen 3 al azar)
- `supabase-schema.sql` — Schema de base de datos

## Estado actual
Pendiente de configurar servicios externos:
- Supabase: crear proyecto, ejecutar SQL schema, crear bucket "love-photos"
- Stripe: obtener keys, configurar webhook para `checkout.session.completed`
- Resend: obtener API key, verificar dominio

## Componentes landing
- `src/components/Hero.tsx`
- `src/components/Pricing.tsx`
- `src/components/HowItWorks.tsx`
- `src/components/Showcase.tsx`
- `src/components/FAQ.tsx`
- `src/components/Navbar.tsx`
- `src/components/Footer.tsx`

# Love4U

SaaS de regalos digitales románticos para enamorados. Mercado hispanohablante (México y España principalmente).

## Qué es
Plataforma para crear páginas web románticas personalizadas como regalo para parejas.

## Stack
- Next.js 14 + TypeScript + Tailwind CSS
- Supabase (DB + storage de fotos)
- PayPal REST API (pagos)
- Nodemailer/Gmail (emails con QR code)
- nanoid (slugs únicos)
- Google Analytics G-14272359414

## Planes
- Básico ($9 USD / 9€): 3 fotos, 1 año de duración
- Premium ($14 USD / 14€): 7 fotos, de por vida + canción de YouTube
- In-Love ($16 USD / 16€): igual que Premium + 3 ideas de citas por email

## Flujo principal
Elige plan → Formulario (fotos, mensaje, fecha, canción YouTube) → Paga con PayPal → Recibe email con link + QR → Sorprende a su pareja

## Estructura clave
- `src/app/page.tsx` — Landing page
- `src/app/crear/page.tsx` — Formulario de 3 pasos
- `src/app/p/[slug]/page.tsx` — Página que ve el destinatario
- `src/app/gracias/[pageId]/page.tsx` — Página post-pago (captura el pago de PayPal)
- `src/app/admin/page.tsx` — Panel admin (protegido con ADMIN_SECRET via header Authorization)
- `src/app/api/crear-pagina/route.ts` — Crea borrador en Supabase + sube fotos
- `src/app/api/checkout/route.ts` — Genera orden PayPal
- `src/app/api/capturar-pago/route.ts` — Captura pago PayPal, activa página, envía email
- `src/app/api/admin/pages/route.ts` — Lista páginas (requiere Authorization: Bearer <ADMIN_SECRET>)
- `src/lib/email.ts` — Envío de email con QR
- `src/lib/date-ideas.ts` — 10 ideas de citas (se eligen 3 al azar)
- `src/lib/plans.ts` — Definición de planes y precios
- `supabase-schema.sql` — Schema de base de datos

## Variables de entorno requeridas
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_SECRET=
PAYPAL_ENV=production          # o "sandbox" para pruebas
GMAIL_USER=
GMAIL_APP_PASSWORD=
ADMIN_SECRET=
NEXT_PUBLIC_BASE_URL=https://www.love4u.app
```

## Estado actual
- PayPal: esperando aprobación Live de cuenta Argentina (1-3 días). PAYPAL_ENV en Vercel actualmente en sandbox.
- NEXT_PUBLIC_BASE_URL: cambiar a https://www.love4u.app cuando se active PayPal Live
- Supabase: configurado y funcionando
- Gmail: configurado y funcionando
- Google Analytics: instalado (G-14272359414)

## Componentes landing
- `src/components/Hero.tsx`
- `src/components/Pricing.tsx`
- `src/components/HowItWorks.tsx`
- `src/components/Showcase.tsx`
- `src/components/FAQ.tsx`
- `src/components/Navbar.tsx`
- `src/components/Footer.tsx`

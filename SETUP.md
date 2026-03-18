# Love4U — Guía de configuración

## 1. Supabase
1. Crear cuenta en supabase.com
2. Nuevo proyecto
3. Ir a SQL Editor y ejecutar `supabase-schema.sql`
4. Ir a Storage > New bucket > nombre: `love-photos` > marcar como Public
5. Copiar las keys en `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

## 2. Stripe
1. Crear cuenta en stripe.com
2. Ir a Developers > API Keys
3. Copiar en `.env.local`:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
4. Para el webhook (en producción):
   - Stripe Dashboard > Webhooks > Add endpoint
   - URL: `https://tudominio.com/api/webhook`
   - Evento: `checkout.session.completed`
   - Copiar el signing secret en `STRIPE_WEBHOOK_SECRET`

## 3. Resend (emails)
1. Crear cuenta en resend.com
2. Verificar tu dominio (o usar el sandbox para pruebas)
3. Copiar API Key en `NEXT_PUBLIC_RESEND_API_KEY`
4. Cambiar el `from` en `src/lib/email.ts` por tu email verificado

## 4. Correr localmente
```bash
cd love4u
npm run dev
```
Abrir http://localhost:3000

## 5. Deploy en Vercel
1. Push a GitHub
2. Conectar repo en vercel.com
3. Agregar todas las variables de entorno
4. Cambiar `NEXT_PUBLIC_BASE_URL` a tu dominio de producción

## Planes y precios
| Plan     | Precio | Fotos | Duración   | Extras                    |
|----------|--------|-------|------------|---------------------------|
| Básico   | $10    | 3     | 1 año      | —                         |
| Premium  | $15    | 7     | De por vida| Playlist Spotify          |
| In-Love  | $17.50 | 7     | De por vida| Playlist + 3 ideas citas  |

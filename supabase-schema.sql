-- Tabla principal de páginas de amor
CREATE TABLE love_pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  plan TEXT NOT NULL CHECK (plan IN ('basic', 'premium', 'inlove')),
  person_name TEXT NOT NULL,
  partner_name TEXT NOT NULL,
  start_date DATE NOT NULL,
  message TEXT NOT NULL,
  photos TEXT[] DEFAULT '{}',
  playlist_url TEXT,
  date_ideas TEXT[],
  active BOOLEAN DEFAULT FALSE,
  paid BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMPTZ,
  customer_email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_love_pages_slug ON love_pages(slug);
CREATE INDEX idx_love_pages_customer_email ON love_pages(customer_email);

-- RLS: solo el admin puede leer/escribir
ALTER TABLE love_pages ENABLE ROW LEVEL SECURITY;

-- Política: acceso público solo para páginas activas y pagas (para la ruta /p/[slug])
CREATE POLICY "Public can view active paid pages"
  ON love_pages FOR SELECT
  USING (active = TRUE AND paid = TRUE);

-- Storage bucket para fotos
-- Crear en Supabase Dashboard > Storage > New bucket: "love-photos" (public)

-- Nails Visage Academia — Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─── COURSES ─────────────────────────────────────────────
create table courses (
  id              uuid primary key default uuid_generate_v4(),
  category        text not null check (category in ('manicure', 'pestanas_cejas')),
  name            text not null,
  slug            text not null unique,
  normal_price    integer not null,
  offer_price     integer not null,
  duration_text   text not null,
  deposit_amount  integer not null,
  includes        text[] not null default '{}',
  temario         jsonb not null default '[]',
  notes           text,
  active          boolean not null default true,
  image_url       text,
  created_at      timestamptz not null default now()
);

-- ─── SESSIONS ────────────────────────────────────────────
create table sessions (
  id               uuid primary key default uuid_generate_v4(),
  course_id        uuid not null references courses(id) on delete cascade,
  start_date       date not null,
  end_date         date not null,
  total_spots      integer not null default 8,
  available_spots  integer not null default 8,
  status           text not null default 'open' check (status in ('open', 'closed')),
  created_at       timestamptz not null default now()
);

-- ─── RESERVATIONS ────────────────────────────────────────
create table reservations (
  id                      uuid primary key default uuid_generate_v4(),
  session_id              uuid not null references sessions(id) on delete restrict,
  student_name            text not null,
  phone                   text not null,
  email                   text not null,
  amount_paid             integer not null,
  payment_status          text not null default 'pending' check (payment_status in ('pending', 'approved', 'rejected')),
  mercadopago_payment_id  text,
  created_at              timestamptz not null default now()
);

-- ─── ADMIN USERS ─────────────────────────────────────────
create table admin_users (
  id            uuid primary key default uuid_generate_v4(),
  email         text not null unique,
  name          text not null,
  password_hash text not null,
  created_at    timestamptz not null default now()
);

-- ─── ROW LEVEL SECURITY ──────────────────────────────────
-- Public can read active courses and open sessions (for the site)
alter table courses enable row level security;
alter table sessions enable row level security;
alter table reservations enable row level security;
alter table admin_users enable row level security;

create policy "public read active courses"
  on courses for select
  using (active = true);

create policy "public read open sessions"
  on sessions for select
  using (status = 'open' and available_spots > 0);

-- Service role bypasses RLS (used by admin panel and webhooks)
-- No additional policies needed — supabaseAdmin uses service role key

-- ─── INDEXES ─────────────────────────────────────────────
create index idx_courses_category on courses(category);
create index idx_courses_slug on courses(slug);
create index idx_sessions_course_id on sessions(course_id);
create index idx_sessions_start_date on sessions(start_date);
create index idx_reservations_session_id on reservations(session_id);
create index idx_reservations_payment_status on reservations(payment_status);
create index idx_reservations_created_at on reservations(created_at desc);

-- ─── FUNCTION: decrement spots (called by webhook) ───────
create or replace function decrement_spots(session_id uuid)
returns void language plpgsql as $$
begin
  update sessions
  set available_spots = greatest(0, available_spots - 1)
  where id = session_id;
end;
$$;

-- ─── SEED DATA — 16 COURSES ──────────────────────────────
insert into courses (category, name, slug, normal_price, offer_price, duration_text, deposit_amount, includes, temario, notes, active) values

-- MANICURE
('manicure', 'Manicure Profesional', 'manicure-profesional', 260000, 240000,
  '3 días intensivos de 10:00 a 18:00', 60000,
  ARRAY['Certificado', 'Materiales en clases', 'Manual impreso', 'Lista de proveedores', 'Descuentos en tiendas', 'Asesoría post curso', 'Snack', 'Retiro seguro de todas las técnicas'],
  '[
    {"title": "Manicure completa y torno", "bullets": ["Anatomía y enfermedades", "Uso de torno (técnica mixta)", "Esterilización de materiales"]},
    {"title": "Esmaltado Semipermanente", "bullets": ["Preparación de las uñas", "Nivelación y esmaltado", "Degradé, francesa y encapsulado", "Ojo de gato y efectos magnéticos"]},
    {"title": "Polygel", "bullets": ["Preparación de las uñas", "Postura de moldes", "Manejo y aplicación", "Correcto limado", "Encapsulado y baby boomer", "Cristalería"]},
    {"title": "Acrílico", "bullets": ["Preparación de las uñas", "Postura de moldes", "Manejo y aplicación", "Correcto limado", "Encapsulado y baby boomer", "Técnica reversa y flores 3D", "Cristalería"]},
    {"title": "Soft gel", "bullets": ["Preparación de las uñas", "Aplicación de tips", "Correcto limado", "Esmaltado, francesa y degradé", "Encapsulado y cristalería"]}
  ]', null, true),

('manicure', 'Manicure Integral', 'manicure-integral', 190000, 180000,
  '2 días intensivos de 10:00 a 18:00', 40000,
  ARRAY['Certificado', 'Materiales en clases', 'Manual impreso', 'Lista de proveedores', 'Descuentos en tiendas', 'Asesoría post curso', 'Snack', 'Retiro seguro de todas las técnicas'],
  '[
    {"title": "Manicure completa y torno", "bullets": ["Anatomía y enfermedades", "Uso de torno (técnica mixta)", "Esterilización de materiales"]},
    {"title": "Polygel", "bullets": ["Preparación de las uñas", "Postura de moldes", "Manejo y aplicación", "Correcto limado", "Encapsulado y baby boomer", "Cristalería"]},
    {"title": "Esmaltado Semipermanente", "bullets": ["Preparación de las uñas", "Nivelación y esmaltado", "Degradé, francesa y encapsulado", "Ojo de gato y efectos magnéticos"]},
    {"title": "Acrílico", "bullets": ["Preparación de las uñas", "Postura de moldes", "Manejo y aplicación", "Correcto limado", "Encapsulado y baby boomer", "Técnica reversa y flores 3D", "Cristalería"]}
  ]', null, true),

('manicure', 'Manicure Esencial', 'manicure-esencial', 195000, 185000,
  '2 días intensivos de 10:00 a 18:00', 45000,
  ARRAY['Certificado', 'Materiales en clases', 'Manual impreso', 'Lista de proveedores', 'Descuentos en tiendas', 'Asesoría post curso', 'Snack', 'Retiro seguro de todas las técnicas'],
  '[
    {"title": "Manicure completa y torno", "bullets": ["Anatomía y enfermedades", "Uso de torno (técnica mixta)", "Esterilización de materiales"]},
    {"title": "Polygel", "bullets": ["Preparación de las uñas", "Postura de moldes", "Manejo y aplicación", "Correcto limado", "Encapsulado y baby boomer", "Cristalería"]},
    {"title": "Esmaltado Semipermanente", "bullets": ["Preparación de las uñas", "Nivelación y esmaltado", "Degradé, francesa y encapsulado", "Ojo de gato y efectos magnéticos"]},
    {"title": "Soft gel", "bullets": ["Preparación de las uñas", "Aplicación de tips", "Correcto limado", "Esmaltado, francesa y degradé", "Encapsulado y cristalería"]}
  ]', null, true),

('manicure', 'Esmaltado Permanente + Acrílico', 'esmaltado-permanente-acrilico', 120000, 110000,
  '1 día intensivo de 10:00 a 18:00', 30000,
  ARRAY['Certificado', 'Materiales en clases', 'Manual impreso', 'Lista de proveedores', 'Descuentos en tiendas', 'Asesoría post curso', 'Snack', 'Retiro seguro de ambas técnicas'],
  '[
    {"title": "Manicure completa y torno", "bullets": ["Anatomía y enfermedades", "Uso de torno (técnica mixta)", "Esterilización de materiales"]},
    {"title": "Acrílico", "bullets": ["Preparación de las uñas", "Postura de moldes", "Manejo y aplicación", "Correcto limado", "Encapsulado y baby boomer", "Técnica reversa y flores 3D", "Cristalería"]},
    {"title": "Esmaltado Semipermanente", "bullets": ["Preparación de las uñas", "Nivelación y esmaltado", "Degradé, francesa y encapsulado", "Ojo de gato y efectos magnéticos"]}
  ]', null, true),

('manicure', 'Esmaltado Permanente + Polygel', 'esmaltado-permanente-polygel', 120000, 110000,
  '1 día intensivo de 10:00 a 18:00', 30000,
  ARRAY['Certificado', 'Materiales en clases', 'Manual impreso', 'Lista de proveedores', 'Descuentos en tiendas', 'Asesoría post curso', 'Snack', 'Retiro seguro de ambas técnicas'],
  '[
    {"title": "Manicure completa y torno", "bullets": ["Anatomía y enfermedades", "Uso de torno (técnica mixta)", "Esterilización de materiales"]},
    {"title": "Polygel", "bullets": ["Preparación de las uñas", "Postura de moldes", "Manejo y aplicación", "Correcto limado", "Encapsulado y baby boomer", "Cristalería"]},
    {"title": "Esmaltado Semipermanente", "bullets": ["Preparación de las uñas", "Nivelación y esmaltado", "Degradé, francesa y encapsulado", "Ojo de gato y efectos magnéticos"]}
  ]', null, true),

('manicure', 'Esmaltado Permanente + Soft Gel', 'esmaltado-permanente-soft-gel', 120000, 110000,
  '1 día intensivo de 10:00 a 18:00', 30000,
  ARRAY['Certificado', 'Materiales en clases', 'Manual impreso', 'Lista de proveedores', 'Descuentos en tiendas', 'Asesoría post curso', 'Snack', 'Retiro seguro de ambas técnicas'],
  '[
    {"title": "Manicure completa y torno", "bullets": ["Anatomía y enfermedades", "Uso de torno (técnica mixta)", "Esterilización de materiales"]},
    {"title": "Soft gel", "bullets": ["Preparación de las uñas", "Aplicación de tips", "Correcto limado", "Esmaltado, francesa y degradé", "Encapsulado y cristalería"]},
    {"title": "Esmaltado Semipermanente", "bullets": ["Preparación de las uñas", "Nivelación y esmaltado", "Degradé, francesa y encapsulado", "Ojo de gato y efectos magnéticos"]}
  ]', null, true),

('manicure', 'Soft Gel Inicial', 'soft-gel-inicial', 100000, 90000,
  '1 día intensivo de 10:00 a 17:30', 30000,
  ARRAY['Certificado', 'Materiales en clases', 'Manual impreso', 'Lista de proveedores', 'Descuentos en tiendas', 'Asesoría post curso', 'Snack', 'Retiro seguro'],
  '[
    {"title": "Manicure completa y torno", "bullets": ["Anatomía y enfermedades", "Uso de torno (técnica mixta)", "Esterilización de materiales"]},
    {"title": "Soft gel", "bullets": ["Preparación de las uñas", "Aplicación de tips", "Correcto limado", "Esmaltado, francesa y degradé", "Encapsulado y cristalería"]}
  ]', null, true),

('manicure', 'Acrílico Inicial', 'acrilico-inicial', 100000, 90000,
  '1 día intensivo de 10:00 a 17:30', 30000,
  ARRAY['Certificado', 'Materiales en clases', 'Manual impreso', 'Lista de proveedores', 'Descuentos en tiendas', 'Asesoría post curso', 'Snack', 'Retiro seguro'],
  '[
    {"title": "Manicure completa y torno", "bullets": ["Anatomía y enfermedades", "Uso de torno (técnica mixta)", "Esterilización de materiales"]},
    {"title": "Acrílico", "bullets": ["Preparación de las uñas", "Postura de moldes", "Manejo y aplicación", "Correcto limado", "Encapsulado y baby boomer", "Técnica reversa y flores 3D", "Cristalería"]}
  ]', null, true),

('manicure', 'Polygel Inicial', 'polygel-inicial', 100000, 90000,
  '1 día intensivo de 10:00 a 17:30', 30000,
  ARRAY['Certificado', 'Materiales en clases', 'Manual impreso', 'Lista de proveedores', 'Descuentos en tiendas', 'Asesoría post curso', 'Snack', 'Retiro seguro'],
  '[
    {"title": "Manicure completa y torno", "bullets": ["Anatomía y enfermedades", "Uso de torno (técnica mixta)", "Esterilización de materiales"]},
    {"title": "Polygel", "bullets": ["Preparación de las uñas", "Postura de moldes", "Manejo y aplicación", "Correcto limado", "Encapsulado y baby boomer", "Cristalería"]}
  ]', null, true),

-- Placeholder inactivo
('manicure', 'Esmaltado Permanente Inicial', 'esmaltado-permanente-inicial', 0, 0,
  'Por definir', 0,
  ARRAY[]::text[], '[]', null, false),

-- PESTAÑAS Y CEJAS
('pestanas_cejas', 'Integral Pestañas y Cejas', 'integral-pestanas-cejas', 285000, 260000,
  '3 días intensivos de 10:00 a 18:00', 60000,
  ARRAY['Certificado', 'Materiales profesionales en clases', 'Manual de apoyo impreso', 'Lista de insumos con descuento en tiendas', 'Asesoría post curso', 'Snack'],
  '[
    {"title": "Teoría y Bioseguridad", "bullets": ["Preparación y sanitización", "Contraindicaciones", "Ficha técnica y consentimiento"]},
    {"title": "Extensión de Pestañas", "bullets": ["Técnicas: clásica, volumen, rímel", "Efectos: closed fans, máscara, f. tecnológicas", "Diseño de mirada: ojo de gato, muñeca, ardilla"]},
    {"title": "Lash lifting y Técnica coreana", "bullets": ["Tipos y curvaturas de bigudíes", "Técnica de acople", "Aplicación correcta", "Tinte, nutrición y bótox", "Técnica reversa"]},
    {"title": "Diseño de cejas perfectas", "bullets": ["Visagismo (brow mapping)", "Epilación con hilo y cera", "Laminado (brow lamination)", "Técnica ombré y pigmentación (henna y refectocil)"]},
    {"title": "Práctica avanzada", "bullets": ["Direccionamiento y mapping", "Uso y aplicación de adhesivo", "Retoque y retiro", "Correcto empalme"]}
  ]', 'Práctica full en modelos reales', true),

('pestanas_cejas', 'Extensión y Cejas', 'extension-cejas', 195000, 185000,
  '2 días intensivos de 10:00 a 18:00', 55000,
  ARRAY['Certificado', 'Materiales profesionales en clases', 'Manual de apoyo impreso', 'Lista de insumos con descuento en tiendas', 'Asesoría post curso', 'Snack'],
  '[
    {"title": "Teoría y Bioseguridad", "bullets": ["Preparación y sanitización", "Contraindicaciones", "Ficha técnica y consentimiento"]},
    {"title": "Extensión de Pestañas", "bullets": ["Técnicas: clásica, volumen, rímel", "Efectos: closed fans, máscara, f. tecnológicas", "Diseño de mirada: ojo de gato, muñeca, ardilla"]},
    {"title": "Diseño de cejas perfectas", "bullets": ["Visagismo (brow mapping)", "Epilación con hilo y cera", "Laminado (brow lamination)", "Técnica ombré y pigmentación (henna y refectocil)"]},
    {"title": "Práctica avanzada", "bullets": ["Direccionamiento y mapping", "Uso y aplicación de adhesivo", "Retoque y retiro", "Correcto empalme"]}
  ]', 'Práctica full en modelos reales', true),

('pestanas_cejas', 'Extensión y Lifting + Técnica Coreana', 'extension-lifting-coreana', 195000, 185000,
  '2 días intensivos de 10:00 a 18:00', 55000,
  ARRAY['Certificado', 'Materiales profesionales en clases', 'Manual de apoyo impreso', 'Lista de insumos con descuento en tiendas', 'Asesoría post curso', 'Snack'],
  '[
    {"title": "Teoría, anatomía y bioseguridad", "bullets": ["Anatomía de las pestañas", "Sanitización de materiales", "Contraindicaciones", "Ficha técnica y consentimiento"]},
    {"title": "Extensión de Pestañas", "bullets": ["Técnicas: clásica, volumen, rímel", "Efectos: closed fans, máscara, f. tecnológicas", "Diseño de mirada: ojo de gato, muñeca, ardilla"]},
    {"title": "Lash lifting y Técnica coreana", "bullets": ["Tipos y curvaturas de bigudíes", "Técnica de acople", "Aplicación correcta", "Tinte, nutrición y bótox", "Técnica reversa"]},
    {"title": "Práctica avanzada", "bullets": ["Direccionamiento y mapping", "Uso y aplicación de adhesivo", "Retoque y retiro", "Correcto empalme"]}
  ]', 'Práctica full en modelos reales', true),

('pestanas_cejas', 'Extensión de Pestañas', 'extension-pestanas', 135000, 125000,
  '1 día intensivo de 10:00 a 18:00', 55000,
  ARRAY['Certificado', 'Materiales profesionales en clases', 'Manual de apoyo impreso', 'Lista de insumos con descuento en tiendas', 'Asesoría post curso', 'Snack'],
  '[
    {"title": "Teoría, anatomía y bioseguridad", "bullets": ["Anatomía de las pestañas", "Sanitización de materiales", "Contraindicaciones", "Ficha técnica y consentimiento"]},
    {"title": "Técnicas y efectos", "bullets": ["Técnicas: clásica, volumen, rímel", "Efectos: closed fans, máscara, f. tecnológicas"]},
    {"title": "Diseño de mirada", "bullets": ["Personalización", "Mapeo de estructuras comerciales", "Efecto ojo de gato, muñeca y ardilla"]},
    {"title": "Práctica avanzada", "bullets": ["Direccionamiento y mapping", "Uso y aplicación de adhesivo", "Retoque y retiro", "Correcto empalme"]}
  ]', 'Práctica full en modelos reales y maniquí', true),

('pestanas_cejas', 'Cejas Perfectas', 'cejas-perfectas', 120000, 110000,
  '1 día intensivo de 10:00 a 17:30', 55000,
  ARRAY['Certificado', 'Materiales profesionales en clases', 'Manual de apoyo impreso', 'Lista de insumos con descuento en tiendas', 'Asesoría post curso', 'Snack'],
  '[
    {"title": "Teoría, anatomía y bioseguridad", "bullets": ["Anatomía de las cejas", "Bioseguridad", "Marcas del mercado", "Manejo de materiales profesionales"]},
    {"title": "Técnicas y efectos", "bullets": ["Técnicas: clásica, volumen, rímel", "Efectos: closed fans, máscara, f. tecnológicas"]},
    {"title": "Diseño de mirada", "bullets": ["Personalización", "Mapeo de estructuras comerciales", "Efecto ojo de gato, muñeca y ardilla"]},
    {"title": "Práctica avanzada", "bullets": ["Direccionamiento y mapping", "Uso y aplicación de adhesivo", "Retoque y retiro", "Correcto empalme"]}
  ]', 'Práctica full en modelos reales y maniquí', true),

('pestanas_cejas', 'Lifting + Técnica Coreana', 'lifting-tecnica-coreana', 120000, 110000,
  '1 día intensivo de 10:00 a 17:30', 30000,
  ARRAY['Certificado', 'Materiales profesionales en clases', 'Manual de apoyo impreso', 'Lista de insumos con descuento en tiendas', 'Asesoría post curso', 'Snack'],
  '[
    {"title": "Teoría, anatomía y bioseguridad", "bullets": ["Anatomía de las pestañas", "Bioseguridad", "Marcas del mercado", "Manejo de materiales profesionales"]},
    {"title": "Lifting tradicional y coreano", "bullets": ["Estudio profundo de las diferencias técnicas", "Tipos de curvaturas", "Elección correcta de bigudíes según el ojo"]},
    {"title": "Técnicas avanzadas y acabados", "bullets": ["Técnica de acople perfecto", "Protocolo de aplicación", "Uso de tinte", "Nutrición profunda y bótox", "Técnica reversa de lifting"]}
  ]', 'Práctica full en modelos reales con productos profesionales', true),

('pestanas_cejas', 'Cejas + Lifting Técnica Coreana', 'cejas-lifting-coreana', 195000, 185000,
  '2 días intensivos de 10:00 a 17:30', 55000,
  ARRAY['Certificado', 'Materiales profesionales en clases', 'Manual de apoyo impreso', 'Lista de insumos con descuento en tiendas', 'Asesoría post curso', 'Snack'],
  '[
    {"title": "Teoría, anatomía y bioseguridad", "bullets": ["Anatomía de pestañas y cejas", "Bioseguridad", "Marcas del mercado", "Manejo de materiales profesionales"]},
    {"title": "Lifting tradicional y coreano", "bullets": ["Tipos y curvaturas de bigudíes", "Técnica de acople", "Aplicación correcta", "Tinte, nutrición y bótox", "Técnica reversa"]},
    {"title": "Cejas y Colorimetría", "bullets": ["Visagismo (brow mapping)", "Técnicas de visagismo", "Perfilado y epilación con cera", "Laminado (brow lamination)", "Técnica ombré", "Pigmentación con henna y refectocil"]}
  ]', 'Práctica full en modelos reales con productos profesionales', true);

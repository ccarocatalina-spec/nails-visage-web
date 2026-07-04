-- ─── SESIONES JULIO 2026 ──────────────────────────────────
-- Cursos: Esmaltado Permanente + Soft Gel  /  Esmaltado Permanente + Polygel
-- Fechas: 6, 9, 11, 13, 17, 20, 23, 27, 30 de Julio 2026
-- Cada curso es 1 día intensivo → start_date = end_date

-- ── Esmaltado Permanente + Soft Gel ──────────────────────
INSERT INTO sessions (course_id, start_date, end_date, total_spots, available_spots, status)
SELECT id, date, date, 8, 8, 'open'
FROM courses,
  (VALUES
    ('2026-07-06'::date),
    ('2026-07-09'::date),
    ('2026-07-11'::date),
    ('2026-07-13'::date),
    ('2026-07-17'::date),
    ('2026-07-20'::date),
    ('2026-07-23'::date),
    ('2026-07-27'::date),
    ('2026-07-30'::date)
  ) AS dates(date)
WHERE courses.slug = 'esmaltado-permanente-soft-gel';

-- ── Esmaltado Permanente + Polygel ───────────────────────
INSERT INTO sessions (course_id, start_date, end_date, total_spots, available_spots, status)
SELECT id, date, date, 8, 8, 'open'
FROM courses,
  (VALUES
    ('2026-07-06'::date),
    ('2026-07-09'::date),
    ('2026-07-11'::date),
    ('2026-07-13'::date),
    ('2026-07-17'::date),
    ('2026-07-20'::date),
    ('2026-07-23'::date),
    ('2026-07-27'::date),
    ('2026-07-30'::date)
  ) AS dates(date)
WHERE courses.slug = 'esmaltado-permanente-polygel';

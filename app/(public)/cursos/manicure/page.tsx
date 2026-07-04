import Link from 'next/link'
import { ArrowRight, Clock, CheckCircle } from 'lucide-react'
import { getCoursesByCategory } from '@/lib/courses-data'

function CLP(n: number) {
  return n.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 })
}

export const metadata = {
  title: 'Cursos de Manicure — Academia Nails Visage',
  description: 'Aprende manicure profesional en Santiago. Cursos de esmaltado semipermanente, polygel, acrílico, soft gel y más. Certificado incluido.',
}

export default function ManicurePage() {
  const courses = getCoursesByCategory('manicure')

  return (
    <>
      <style>{`
        .course-card { transition: border-color 0.2s ease, transform 0.2s ease; }
        .course-card:hover { border-color: var(--border-rosa) !important; transform: translateY(-4px); }
      `}</style>

      {/* Hero */}
      <section style={{ padding: '5rem 1.5rem 3rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 300, background: 'radial-gradient(ellipse, rgba(239,129,174,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 700, margin: '0 auto' }}>
          <div className="tag" style={{ marginBottom: '1.25rem', margin: '0 auto 1.25rem' }}>
            9 cursos disponibles
          </div>
          <h1 className="heading" style={{ fontSize: 'clamp(2.5rem, 7vw, 4rem)', marginBottom: '1rem' }}>
            Cursos de <span style={{ color: 'var(--rosa)' }}>Manicure</span>
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: 520, margin: '0 auto' }}>
            Desde cero hasta nivel avanzado. Elige la técnica que quieres dominar y empieza tu carrera profesional.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: '2rem 1.5rem 6rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {courses.map(course => (
              <Link key={course.slug} href={`/cursos/${course.slug}`}
                className="course-card"
                style={{ display: 'block', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '1rem', overflow: 'hidden' }}>

                {/* Image */}
                <div style={{ height: 200, background: 'var(--bg-card-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ color: 'var(--muted-2)', fontSize: '0.75rem' }}>Imagen del curso</span>
                </div>

                <div style={{ padding: '1.5rem' }}>
                  <h2 style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 800, fontSize: '1.05rem', marginBottom: '0.5rem', lineHeight: 1.3 }}>{course.name}</h2>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--muted)', fontSize: '0.8rem', marginBottom: '1rem' }}>
                    <Clock size={13} />
                    {course.duration_text}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1.25rem' }}>
                    {course.includes.slice(0, 3).map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--muted)' }}>
                        <CheckCircle size={13} style={{ color: 'var(--rosa)', flexShrink: 0 }} />
                        {item}
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                    <div>
                      <span className="price-offer" style={{ fontSize: '1.4rem' }}>{CLP(course.offer_price)}</span>
                      <span className="price-normal" style={{ fontSize: '0.85rem', marginLeft: '0.5rem' }}>{CLP(course.normal_price)}</span>
                    </div>
                    <span style={{ color: 'var(--rosa)', fontSize: '0.8rem', fontFamily: "'Work Sans', sans-serif", fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      Ver <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

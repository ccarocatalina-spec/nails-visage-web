'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Wifi, Clock, Award, Star } from 'lucide-react'

const CURSOS_ONLINE_URL = 'https://nails-visage-cursos.vercel.app/'

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) } })
    }, { threshold: 0.12 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

const cursosOnline = [
  {
    name: 'Manicurista Starter Pro: Fundamentos, Nivelación, Esmaltado y Diseños',
    slug: 'esmaltado-semipermanente-nivelacion',
    desc: 'Un solo curso que incluye las dos técnicas: esmaltado semipermanente desde cero y nivelación. Preparación, aplicación, durabilidad y corrección profesional.',
    badge: 'Disponible ahora',
    includes: ['Fundamentos teóricos y anatómicos de la manicure', 'Esmaltado Semipermanente', 'Nivelación', 'Diseños en tendencia', 'Videos HD paso a paso', 'Material descargable', 'Certificado digital', 'Acceso inmediato por 6 meses'],
  },
]

export default function CursosOnlinePage() {
  useReveal()

  return (
    <>
      {/* Hero */}
      <section style={{ position: 'relative', padding: '8rem 1.5rem 5rem', overflow: 'hidden', textAlign: 'center' }}>
        <div className="glow-orb" style={{ width: 500, height: 400, top: '-20%', left: '50%', transform: 'translateX(-50%)', opacity: 0.35 }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)', backgroundSize: '64px 64px', opacity: 0.3, pointerEvents: 'none' }} />

        <div style={{ position: 'relative', maxWidth: 700, margin: '0 auto' }}>
          <div className="tag animate-fade-in" style={{ marginBottom: '1.5rem', margin: '0 auto 1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <Wifi size={12} />
            100% Online · A tu ritmo
          </div>

          <h1 className="heading animate-fade-up" style={{ fontSize: 'clamp(2.4rem, 7vw, 4.5rem)', marginBottom: '1.5rem' }}>
            Cursos<br />
            <span style={{ color: 'var(--rosa)', textShadow: '0 0 60px var(--rosa-glow)' }}>Online</span>
          </h1>

          <p className="animate-fade-up" style={{ animationDelay: '0.15s', color: 'var(--muted)', fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', lineHeight: 1.7, maxWidth: 520, margin: '0 auto 2.5rem', opacity: 0 }}>
            Aprende desde donde estés, a tu propio ritmo. Los mismos estándares de nuestra academia, ahora en formato digital.
          </p>

          <div className="animate-fade-up" style={{ animationDelay: '0.3s', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center', opacity: 0 }}>
            {[
              { icon: <Wifi size={16} />, label: 'Acceso online 24/7' },
              { icon: <Clock size={16} />, label: 'Aprende a tu ritmo' },
              { icon: <Award size={16} />, label: 'Certificado incluido' },
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--muted)', fontSize: '0.875rem' }}>
                <span style={{ color: 'var(--rosa)' }}>{f.icon}</span>
                {f.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cursos */}
      <section style={{ padding: '4rem 1.5rem 7rem', background: 'var(--bg-2)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <h2 className="heading" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)' }}>
              Cursos <span style={{ color: 'var(--rosa)' }}>disponibles</span>
            </h2>
            <p style={{ color: 'var(--muted)', marginTop: '0.75rem', fontSize: '0.95rem' }}>
              Haz clic en el curso y accede a la plataforma de aprendizaje
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
            {cursosOnline.map((c, i) => (
              <a
                key={c.slug}
                href={CURSOS_ONLINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="card reveal"
                style={{ transitionDelay: `${i * 0.1}s`, padding: '2rem', display: 'block', textDecoration: 'none', cursor: 'pointer' }}
              >
                {/* Badge + Online indicator */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <span className="tag" style={{ fontSize: '0.65rem' }}>{c.badge}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.7rem', color: 'var(--rosa)', fontFamily: "'Work Sans', sans-serif", fontWeight: 700 }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--rosa)', display: 'inline-block', boxShadow: '0 0 6px var(--rosa)' }} />
                    ONLINE
                  </span>
                </div>

                {/* Banner del curso */}
                <div style={{ width: '55%', maxWidth: 220, aspectRatio: '2752 / 1536', position: 'relative', margin: '0 auto 1.5rem', borderRadius: '0.6rem', overflow: 'hidden', border: '1px solid var(--border-rosa)' }}>
                  <Image
                    src="/images/banner-curso-online.png"
                    alt={c.name}
                    fill
                    style={{ objectFit: 'contain' }}
                    sizes="220px"
                  />
                </div>

                <div style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 800, fontSize: '1.15rem', marginBottom: '0.75rem' }}>{c.name}</div>
                <p style={{ color: 'var(--muted)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>{c.desc}</p>

                {/* Includes */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.75rem' }}>
                  {c.includes.map((item, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--muted)' }}>
                      <Star size={11} fill="currentColor" style={{ color: 'var(--rosa)', flexShrink: 0 }} />
                      {item}
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 700, fontSize: '0.85rem', color: 'var(--muted)' }}>
                    Ver curso completo
                  </span>
                  <span style={{ color: 'var(--rosa)', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', fontFamily: "'Work Sans', sans-serif", fontWeight: 700 }}>
                    Ver curso <ArrowRight size={14} />
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* CTA plataforma */}
          <div className="reveal" style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Accede a todos los cursos online en nuestra plataforma de aprendizaje
            </p>
            <a href={CURSOS_ONLINE_URL} target="_blank" rel="noopener noreferrer" className="btn-rosa" style={{ display: 'inline-flex' }}>
              Ver plataforma completa <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Diferencias con presencial */}
      <section style={{ padding: '6rem 1.5rem' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 className="heading" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)' }}>
              ¿Por qué elegir el formato <span style={{ color: 'var(--rosa)' }}>online?</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            {[
              { emoji: '🌍', title: 'Desde cualquier lugar', desc: 'Estudia desde tu casa, en Chile o en el extranjero. Solo necesitas internet.' },
              { emoji: '⏰', title: 'A tu propio ritmo', desc: 'Avanza cuando puedas. Repite los módulos las veces que necesites.' },
              { emoji: '⚡', title: 'Acceso inmediato por 6 meses', desc: 'Una vez inscrita, accedes al contenido de forma inmediata por 6 meses.' },
              { emoji: '🎓', title: 'Mismo certificado', desc: 'Recibes el certificado oficial de Academia Nails Visage al completar el curso.' },
            ].map((item, i) => (
              <div key={i} className="card reveal" style={{ padding: '1.75rem', transitionDelay: `${i * 0.07}s` }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{item.emoji}</div>
                <div style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 800, fontSize: '1rem', marginBottom: '0.5rem' }}>{item.title}</div>
                <p style={{ color: 'var(--muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volver a presenciales */}
      <section style={{ padding: '4rem 1.5rem', background: 'var(--bg-2)', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
        <div style={{ maxWidth: 520, margin: '0 auto' }} className="reveal">
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
            ¿Prefieres el formato presencial en Providencia?
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/cursos/manicure" className="btn-ghost" style={{ fontSize: '0.85rem' }}>
              Cursos de Manicure <ArrowRight size={14} />
            </Link>
            <Link href="/cursos/pestanas-cejas" className="btn-ghost" style={{ fontSize: '0.85rem' }}>
              Cursos de Pestañas y Cejas <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

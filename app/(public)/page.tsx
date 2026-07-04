'use client'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { ArrowRight, MapPin, Phone, Star, Award, Users, Calendar, Wifi } from 'lucide-react'

/* ─── SCROLL REVEAL HOOK ─────────────────────────── */
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

/* ─── COUNTER ────────────────────────────────────── */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return
      io.disconnect()
      let start = 0
      const step = Math.ceil(to / 60)
      const timer = setInterval(() => {
        start = Math.min(start + step, to)
        el.textContent = start.toLocaleString('es-CL') + suffix
        if (start >= to) clearInterval(timer)
      }, 24)
    }, { threshold: 0.5 })
    io.observe(el)
    return () => io.disconnect()
  }, [to, suffix])
  return <span ref={ref}>0{suffix}</span>
}

/* ─── MARQUEE ITEMS ──────────────────────────────── */
const marqueeItems = ['Esmaltado Semipermanente', 'Polygel', 'Acrílico', 'Soft Gel', 'Extensión de Pestañas', 'Lash Lifting', 'Diseño de Cejas', 'Técnica Coreana', 'Baby Boomer', 'Francesa', 'Encapsulado', 'Degradé']

/* ─── COURSES PREVIEW ────────────────────────────── */
const manicurePreviews = [
  { name: 'Manicure Profesional', slug: 'manicure-profesional', price: 240000, duration: '3 días', badge: 'Más completo' },
  { name: 'Manicure Integral', slug: 'manicure-integral', price: 180000, duration: '2 días', badge: null },
  { name: 'Manicure Esencial', slug: 'manicure-esencial', price: 185000, duration: '2 días', badge: null },
  { name: 'Soft Gel Inicial', slug: 'soft-gel-inicial', price: 90000, duration: '1 día', badge: null },
  { name: 'Polygel Inicial', slug: 'polygel-inicial', price: 90000, duration: '1 día', badge: null },
  { name: 'Acrílico Inicial', slug: 'acrilico-inicial', price: 90000, duration: '1 día', badge: null },
]

const pestanasPreviews = [
  { name: 'Integral Pestañas y Cejas', slug: 'integral-pestanas-cejas', price: 260000, duration: '3 días', badge: 'Más completo' },
  { name: 'Extensión y Cejas', slug: 'extension-cejas', price: 185000, duration: '2 días', badge: null },
  { name: 'Extensión de Pestañas', slug: 'extension-pestanas', price: 125000, duration: '1 día', badge: null },
  { name: 'Cejas Perfectas', slug: 'cejas-perfectas', price: 110000, duration: '1 día', badge: null },
]

function CLP(n: number) {
  return n.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 })
}

/* ─── FAQ items ──────────────────────────────────── */
const faqs = [
  { q: '¿Cómo reservo mi cupo?', a: 'Elige el curso y fecha en nuestra página, paga el abono online y el cupo queda asegurado. El saldo lo pagas el día del curso.' },
  { q: '¿Puedo reprogramar?', a: 'Sí, con 48 horas de aviso previo por WhatsApp, sin costo.' },
  { q: '¿Qué incluyen los cursos?', a: 'Todos los cursos incluyen certificado, materiales durante las clases, manual impreso, lista de proveedores, descuentos en tiendas, asesoría post curso y snack.' },
  { q: '¿Necesito experiencia previa?', a: 'No. Nuestros cursos están diseñados para comenzar desde cero, aunque también formamos a profesionales que quieren ampliar sus técnicas.' },
]

export default function HomePage() {
  useReveal()

  return (
    <>
      {/* ─── HERO ──────────────────────────────────── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '5rem 1.5rem 4rem' }}>
        {/* Glow orbs */}
        <div className="glow-orb" style={{ width: 500, height: 500, top: '-10%', left: '-10%', opacity: 0.4 }} />
        <div className="glow-orb" style={{ width: 400, height: 400, bottom: '0%', right: '-5%', opacity: 0.3 }} />

        {/* Grid overlay */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)', backgroundSize: '64px 64px', opacity: 0.35, pointerEvents: 'none' }} />

        <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto', textAlign: 'center', zIndex: 1 }}>
          <div className="tag animate-fade-in" style={{ marginBottom: '1.5rem' }}>
            <Star size={12} fill="currentColor" />
            Desde 2021 formando talentos
          </div>

          <h1 className="heading animate-fade-up" style={{ fontSize: 'clamp(2.8rem, 8vw, 5.5rem)', marginBottom: '1.5rem' }}>
            Tu futuro<br />
            <span style={{ color: 'var(--rosa)', textShadow: '0 0 60px var(--rosa-glow)' }}>profesional</span><br />
            comienza aquí
          </h1>

          <p className="animate-fade-up" style={{ animationDelay: '0.15s', color: 'var(--muted)', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', lineHeight: 1.7, maxWidth: 560, margin: '0 auto 2.5rem', opacity: 0 }}>
            Cursos intensivos de manicure y pestañas certificados.
            Aprende de cero o amplía tu técnica — en Santiago, Providencia.
          </p>

          <div className="animate-fade-up" style={{ animationDelay: '0.3s', display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', opacity: 0 }}>
            <Link href="/cursos/manicure" className="btn-rosa">
              Ver cursos de Manicure <ArrowRight size={16} />
            </Link>
            <Link href="/cursos/pestanas-cejas" className="btn-rosa">
              Ver cursos de Pestañas y Cejas <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── STATS ─────────────────────────────────── */}
      <section style={{ padding: '4rem 1.5rem', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem', textAlign: 'center' }}>
          {[
            { icon: <Users size={22} />, value: 5000, suffix: '+', label: 'Alumnas certificadas' },
            { icon: <Award size={22} />, value: 16, suffix: '', label: 'Cursos disponibles' },
            { icon: <Calendar size={22} />, value: 4, suffix: '+', label: 'Años de experiencia' },
            { icon: <Star size={22} />, value: 100, suffix: '%', label: 'Materiales incluidos' },
          ].map((s, i) => (
            <div key={i} className="reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div style={{ color: 'var(--rosa)', marginBottom: '0.75rem', display: 'flex', justifyContent: 'center' }}>{s.icon}</div>
              <div className="heading" style={{ fontSize: '2.5rem', marginBottom: '0.25rem' }}>
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── MARQUEE ───────────────────────────────── */}
      <div style={{ overflow: 'hidden', borderBottom: '1px solid var(--border)', padding: '1rem 0', background: 'var(--bg-2)' }}>
        <div className="marquee-track animate-marquee">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', padding: '0 2rem', whiteSpace: 'nowrap', fontFamily: "'Work Sans', sans-serif", fontWeight: 700, fontSize: '0.875rem', color: i % 3 === 0 ? 'var(--rosa)' : 'var(--muted-2)' }}>
              {item}
              <span style={{ color: 'var(--border-rosa)' }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── CURSOS MANICURE ───────────────────────── */}
      <section style={{ padding: '6rem 1.5rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: '3rem' }}>
            <div className="tag" style={{ marginBottom: '1rem' }}>Especialidad</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <h2 className="heading" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
                Cursos de<br /><span style={{ color: 'var(--rosa)' }}>Manicure</span>
              </h2>
              <Link href="/cursos/manicure" style={{ color: 'var(--rosa)', fontFamily: "'Work Sans', sans-serif", fontWeight: 700, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                Ver todos <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {manicurePreviews.map((c, i) => (
              <Link key={c.slug} href={`/cursos/${c.slug}`} className="card reveal" style={{ transitionDelay: `${i * 0.07}s`, padding: '1.5rem', display: 'block' }}>
                {/* Image placeholder */}
                <div style={{ height: 180, background: 'var(--bg-card-2)', borderRadius: '0.5rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)', overflow: 'hidden', position: 'relative' }}>
                  <span style={{ color: 'var(--muted-2)', fontSize: '0.75rem' }}>Imagen del curso</span>
                  {c.badge && (
                    <span className="tag" style={{ position: 'absolute', top: 10, left: 10, fontSize: '0.65rem' }}>{c.badge}</span>
                  )}
                </div>
                <div style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 800, fontSize: '1rem', marginBottom: '0.5rem' }}>{c.name}</div>
                <div style={{ color: 'var(--muted)', fontSize: '0.8rem', marginBottom: '1rem' }}>{c.duration} intensivo</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="price-offer" style={{ fontSize: '1.3rem' }}>{CLP(c.price)}</span>
                  <span style={{ color: 'var(--rosa)', fontSize: '0.8rem', fontFamily: "'Work Sans', sans-serif", fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    Ver curso <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CURSOS PESTAÑAS ───────────────────────── */}
      <section style={{ padding: '6rem 1.5rem', background: 'var(--bg-2)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: '3rem' }}>
            <div className="tag" style={{ marginBottom: '1rem' }}>Especialidad</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <h2 className="heading" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
                Pestañas<br /><span style={{ color: 'var(--rosa)' }}>y Cejas</span>
              </h2>
              <Link href="/cursos/pestanas-cejas" style={{ color: 'var(--rosa)', fontFamily: "'Work Sans', sans-serif", fontWeight: 700, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                Ver todos <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {pestanasPreviews.map((c, i) => (
              <Link key={c.slug} href={`/cursos/${c.slug}`} className="card reveal" style={{ transitionDelay: `${i * 0.07}s`, padding: '1.5rem', display: 'block' }}>
                <div style={{ height: 180, background: 'var(--bg-card-2)', borderRadius: '0.5rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)', overflow: 'hidden', position: 'relative' }}>
                  <span style={{ color: 'var(--muted-2)', fontSize: '0.75rem' }}>Imagen del curso</span>
                  {c.badge && (
                    <span className="tag" style={{ position: 'absolute', top: 10, left: 10, fontSize: '0.65rem' }}>{c.badge}</span>
                  )}
                </div>
                <div style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 800, fontSize: '1rem', marginBottom: '0.5rem' }}>{c.name}</div>
                <div style={{ color: 'var(--muted)', fontSize: '0.8rem', marginBottom: '1rem' }}>{c.duration} intensivo</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="price-offer" style={{ fontSize: '1.3rem' }}>{CLP(c.price)}</span>
                  <span style={{ color: 'var(--rosa)', fontSize: '0.8rem', fontFamily: "'Work Sans', sans-serif", fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    Ver curso <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CURSOS ONLINE ─────────────────────────── */}
      <section style={{ padding: '6rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
        <div className="glow-orb" style={{ width: 600, height: 400, top: '50%', right: '-15%', transform: 'translateY(-50%)', opacity: 0.2 }} />
        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            {/* Texto */}
            <div>
              <div className="tag" style={{ marginBottom: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <Wifi size={12} />
                Nuevo · Modalidad Online
              </div>
              <h2 className="heading" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1.25rem' }}>
                Aprende desde<br /><span style={{ color: 'var(--rosa)' }}>cualquier lugar</span>
              </h2>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: '2rem' }}>
                Ahora ofrecemos cursos 100% online para que puedas aprender a tu ritmo, desde donde estés. Los mismos estándares de calidad de nuestra academia, en formato digital con acceso de por vida y certificado incluido.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
                {['Esmaltado Semipermanente', 'Nivelación'].map((c, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text)' }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--rosa)', display: 'inline-block', flexShrink: 0, boxShadow: '0 0 6px var(--rosa)' }} />
                    {c}
                  </div>
                ))}
              </div>
              <Link href="/cursos/online" className="btn-rosa">
                Ver cursos online <ArrowRight size={16} />
              </Link>
            </div>

            {/* Cards decorativas */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { icon: '🌍', title: 'Estudia desde donde quieras', desc: 'Chile o el extranjero, solo necesitas internet.' },
                { icon: '⏰', title: 'A tu propio ritmo', desc: 'Avanza cuando puedas. Sin horarios fijos.' },
                { icon: '⚡', title: 'Acceso inmediato por 6 meses', desc: 'Accede al instante y disponible por 6 meses.' },
                { icon: '🎓', title: 'Certificado digital incluido', desc: 'Certificado oficial de Academia Nails Visage.' },
              ].map((item, i) => (
                <div key={i} className="card reveal" style={{ padding: '1.25rem 1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start', transitionDelay: `${i * 0.07}s` }}>
                  <span style={{ fontSize: '1.5rem', lineHeight: 1, flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.2rem' }}>{item.title}</div>
                    <div style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── POR QUÉ ELEGIRNOS ─────────────────────── */}
      <section style={{ padding: '6rem 1.5rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="tag" style={{ marginBottom: '1rem', margin: '0 auto 1rem' }}>¿Por qué elegirnos?</div>
            <h2 className="heading" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
              La academia que ya eligieron<br /><span style={{ color: 'var(--rosa)' }}>más de 5.000 alumnas</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {[
              { emoji: '🎓', title: 'Certificado incluido', desc: 'Cada curso entrega certificado oficial que acredita tus nuevas habilidades.' },
              { emoji: '🧪', title: 'Materiales incluidos', desc: 'Todo lo que necesitas para practicar está disponible durante el curso.' },
              { emoji: '📘', title: 'Manual impreso', desc: 'Te llevas un manual paso a paso para repasar en casa cuando quieras.' },
              { emoji: '👩‍🏫', title: 'Práctica real', desc: 'Cursos de pestañas con práctica en modelos reales desde el primer día.' },
              { emoji: '💬', title: 'Asesoría post curso', desc: 'Te acompañamos después del curso para resolver dudas al empezar a atender.' },
              { emoji: '🏪', title: 'Descuentos en tiendas', desc: 'Acceso a descuentos en proveedores asociados para que compres tus materiales.' },
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

      {/* ─── FAQ PREVIEW ───────────────────────────── */}
      <section style={{ padding: '6rem 1.5rem', background: 'var(--bg-2)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="tag" style={{ marginBottom: '1rem', margin: '0 auto 1rem' }}>Preguntas frecuentes</div>
            <h2 className="heading" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>Respondemos tus <span style={{ color: 'var(--rosa)' }}>dudas</span></h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, i) => (
              <div key={i} className="card reveal" style={{ padding: '1.5rem', transitionDelay: `${i * 0.08}s` }}>
                <div style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.5rem' }}>{faq.q}</div>
                <p style={{ color: 'var(--muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="reveal" style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link href="/preguntas-frecuentes" className="btn-ghost">
              Ver todas las preguntas <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── UBICACIÓN / CONTACTO ──────────────────── */}
      <section style={{ padding: '6rem 1.5rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          <div className="reveal">
            <div className="tag" style={{ marginBottom: '1rem' }}>Visítanos</div>
            <h2 className="heading" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1.5rem' }}>
              Estamos en<br /><span style={{ color: 'var(--rosa)' }}>Providencia</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <MapPin size={18} style={{ color: 'var(--rosa)', flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 700, marginBottom: '0.2rem' }}>Dirección</div>
                  <div style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Santa Magdalena 72, Providencia<br />Metro Los Leones, Santiago</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Phone size={18} style={{ color: 'var(--rosa)', flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 700, marginBottom: '0.2rem' }}>WhatsApp</div>
                  <a href="https://wa.me/56974115228" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>+56 9 7411 5228</a>
                </div>
              </div>
            </div>
            <a href="https://wa.me/c/56974115228" target="_blank" rel="noopener noreferrer" className="btn-rosa">
              Escribir por WhatsApp
            </a>
          </div>

          {/* Google Maps embed */}
          <div className="reveal" style={{ borderRadius: '1rem', overflow: 'hidden', border: '1px solid var(--border)', height: 340 }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.4!2d-70.6125!3d-33.4313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSanta+Magdalena+72%2C+Providencia!5e0!3m2!1ses!2scl!4v1620000000000"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Academia Nails Visage"
            />
          </div>
        </div>
      </section>

      {/* ─── CTA FINAL ─────────────────────────────── */}
      <section style={{ padding: '5rem 1.5rem', background: 'var(--bg-2)', borderTop: '1px solid var(--border)', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <div className="glow-orb" style={{ width: 600, height: 400, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.2 }} />
        <div style={{ position: 'relative', maxWidth: 600, margin: '0 auto' }} className="reveal">
          <h2 className="heading" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', marginBottom: '1rem' }}>
            ¿Lista para<br /><span style={{ color: 'var(--rosa)', textShadow: '0 0 40px var(--rosa-glow)' }}>empezar?</span>
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
            Elige tu curso, reserva tu cupo y da el primer paso hacia tu futuro profesional.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/cursos/manicure" className="btn-rosa">
              Ver cursos <ArrowRight size={16} />
            </Link>
            <a href="https://wa.me/56974115228" target="_blank" rel="noopener noreferrer" className="btn-ghost">
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

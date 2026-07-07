'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, CheckCircle, ChevronDown, ArrowLeft, Calendar, Users } from 'lucide-react'
import type { Course, Session } from '@/lib/types'

function CLP(n: number) {
  return n.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 })
}

function formatDate(dateStr: string) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function CourseDetail({ course }: { course: Course }) {
  const [openModule, setOpenModule] = useState<number | null>(0)
  const [sessions, setSessions] = useState<Session[]>([])
  const [loadingSessions, setLoadingSessions] = useState(true)
  const [selectedSession, setSelectedSession] = useState<string>('')
  const [step, setStep] = useState<'select' | 'form' | 'processing' | 'success'>('select')
  const [form, setForm] = useState({ name: '', phone: '', email: '' })
  const [formError, setFormError] = useState('')

  useEffect(() => {
    fetch(`/api/sessions?course_id=${course.id}`)
      .then(r => r.json())
      .then(data => { setSessions(data.sessions || []); setLoadingSessions(false) })
      .catch(() => setLoadingSessions(false))
  }, [course.id])

  async function handleReserve(e: React.FormEvent) {
    e.preventDefault()
    setFormError('')
    if (!selectedSession) { setFormError('Elige una fecha para continuar.'); return }
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) {
      setFormError('Completa todos los campos.')
      return
    }
    setStep('processing')
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: selectedSession, ...form }),
      })
      const data = await res.json()
      if (data.checkout_url) {
        window.location.href = data.checkout_url
      } else if (data.error) {
        setFormError(data.error)
        setStep('form')
      }
    } catch {
      setFormError('Ocurrió un error. Intenta de nuevo o contáctanos por WhatsApp.')
      setStep('form')
    }
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '3rem 1.5rem 6rem' }}>
      {/* Breadcrumb */}
      <Link href={course.category === 'manicure' ? '/cursos/manicure' : '/cursos/pestanas-cejas'}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '2rem' }}>
        <ArrowLeft size={14} />
        {course.category === 'manicure' ? 'Cursos de Manicure' : 'Cursos de Pestañas y Cejas'}
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr minmax(300px, 380px)', gap: '3rem', alignItems: 'start' }}>

        {/* ─── LEFT COLUMN ─────────────────────────────── */}
        <div>
          {/* Image */}
          <div style={{ height: 320, position: 'relative', background: 'var(--bg-card)', borderRadius: '1rem', border: '1px solid var(--border)', overflow: 'hidden', marginBottom: '2.5rem' }}>
            {course.image_url ? (
              <Image src={course.image_url} alt={course.name} fill style={{ objectFit: 'cover' }} sizes="(max-width: 900px) 100vw, 700px" priority />
            ) : (
              <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'var(--muted-2)', fontSize: '0.875rem' }}>Imagen del curso</span>
              </div>
            )}
          </div>

          {/* Course name + duration */}
          <div className="tag" style={{ marginBottom: '0.75rem' }}>
            {course.category === 'manicure' ? 'Manicure' : 'Pestañas y Cejas'}
          </div>
          <h1 className="heading" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '0.75rem' }}>{course.name}</h1>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem', color: 'var(--muted)', fontSize: '0.875rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Clock size={14} style={{ color: 'var(--rosa)' }} />{course.duration_text}
            </span>
            {course.notes && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Users size={14} style={{ color: 'var(--rosa)' }} />{course.notes}
              </span>
            )}
          </div>

          {/* Includes */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 800, fontSize: '1.1rem', marginBottom: '1rem' }}>¿Qué incluye?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.6rem' }}>
              {course.includes.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--muted)' }}>
                  <CheckCircle size={15} style={{ color: 'var(--rosa)', flexShrink: 0, marginTop: 1 }} />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Temario */}
          <div>
            <h2 style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 800, fontSize: '1.1rem', marginBottom: '1rem' }}>Temario</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {course.temario.map((mod, i) => (
                <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '0.75rem', overflow: 'hidden' }}>
                  <button
                    onClick={() => setOpenModule(openModule === i ? null : i)}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)', textAlign: 'left' }}>
                    <span style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 700, fontSize: '0.9rem' }}>
                      <span style={{ color: 'var(--rosa)', marginRight: '0.5rem', fontWeight: 900 }}>{String(i + 1).padStart(2, '0')}</span>
                      {mod.title}
                    </span>
                    <ChevronDown size={16} style={{ color: 'var(--muted)', flexShrink: 0, transform: openModule === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                  </button>
                  {openModule === i && (
                    <div style={{ padding: '0 1.25rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      {mod.bullets.map((b, j) => (
                        <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
                          <span style={{ color: 'var(--border-rosa)', flexShrink: 0, marginTop: 3 }}>–</span>
                          {b}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── RIGHT COLUMN — RESERVA ──────────────────── */}
        <div style={{ position: 'sticky', top: '5rem' }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-rosa)', borderRadius: '1.25rem', padding: '2rem' }}>

            {/* Price */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', flexWrap: 'wrap' }}>
                <span className="price-offer" style={{ fontSize: '2.2rem' }}>{CLP(course.offer_price)}</span>
                <span className="price-normal">{CLP(course.normal_price)}</span>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '0.8rem', marginTop: '0.4rem' }}>
                Abono de reserva: <strong style={{ color: 'var(--rosa)' }}>{CLP(course.deposit_amount)}</strong> · el saldo se paga el día del curso
              </p>
            </div>

            {step === 'success' ? (
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>✅</div>
                <div style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>¡Reserva recibida!</div>
                <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>Te contactaremos por WhatsApp para confirmar.</p>
              </div>
            ) : step === 'processing' ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ color: 'var(--rosa)', fontSize: '0.9rem', fontFamily: "'Work Sans', sans-serif", fontWeight: 700 }}>Procesando...</div>
              </div>
            ) : (
              <form onSubmit={handleReserve}>
                {/* Session selection */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label className="label">Elige una fecha</label>
                  {loadingSessions ? (
                    <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Cargando fechas...</p>
                  ) : sessions.length === 0 ? (
                    <div style={{ background: 'var(--bg-card-2)', border: '1px solid var(--border)', borderRadius: '0.5rem', padding: '1rem', textAlign: 'center' }}>
                      <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>No hay fechas disponibles ahora.</p>
                      <a href={`https://wa.me/56974115228?text=${encodeURIComponent(`Hola, quiero consultar por el curso de ${course.name}`)}`}
                        target="_blank" rel="noopener noreferrer"
                        style={{ color: 'var(--rosa)', fontSize: '0.85rem', fontFamily: "'Work Sans', sans-serif", fontWeight: 700 }}>
                        Consultar por WhatsApp →
                      </a>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {sessions.map(s => (
                        <label key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: selectedSession === s.id ? 'var(--rosa-dim)' : 'var(--bg-card-2)', border: `1px solid ${selectedSession === s.id ? 'var(--rosa)' : 'var(--border)'}`, borderRadius: '0.6rem', padding: '0.75rem 1rem', cursor: 'pointer', transition: 'all 0.15s' }}>
                          <input type="radio" name="session" value={s.id} checked={selectedSession === s.id} onChange={() => setSelectedSession(s.id)} style={{ accentColor: 'var(--rosa)' }} />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 700, fontSize: '0.85rem' }}>
                              <Calendar size={12} style={{ display: 'inline', marginRight: '0.3rem', color: 'var(--rosa)' }} />
                              {formatDate(s.start_date)}
                              {s.start_date !== s.end_date && ` al ${formatDate(s.end_date)}`}
                            </div>
                            <div style={{ color: 'var(--muted)', fontSize: '0.75rem', marginTop: '0.2rem' }}>
                              {s.available_spots} cupos disponibles
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {sessions.length > 0 && (
                  <>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
                      <div>
                        <label className="label">Nombre completo</label>
                        <input className="input" type="text" placeholder="Tu nombre" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                      </div>
                      <div>
                        <label className="label">Teléfono / WhatsApp</label>
                        <input className="input" type="tel" placeholder="+56 9 XXXX XXXX" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} required />
                      </div>
                      <div>
                        <label className="label">Email</label>
                        <input className="input" type="email" placeholder="tu@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
                      </div>
                    </div>

                    {formError && <p style={{ color: '#ff6b6b', fontSize: '0.825rem', marginBottom: '0.75rem' }}>{formError}</p>}

                    <button type="submit" className="btn-rosa" style={{ width: '100%', justifyContent: 'center' }}>
                      Reservar y pagar abono {CLP(course.deposit_amount)}
                    </button>

                    <p style={{ color: 'var(--muted-2)', fontSize: '0.75rem', textAlign: 'center', marginTop: '0.75rem', lineHeight: 1.5 }}>
                      Serás redirigida al pago seguro de Mercado Pago.
                    </p>
                  </>
                )}
              </form>
            )}

            <div style={{ borderTop: '1px solid var(--border)', marginTop: '1.5rem', paddingTop: '1.25rem' }}>
              <a href={`https://wa.me/56974115228?text=${encodeURIComponent(`Hola, quiero consultar por el curso de ${course.name}`)}`}
                target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

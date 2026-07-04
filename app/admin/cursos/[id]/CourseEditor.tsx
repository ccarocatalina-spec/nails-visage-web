'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Plus, Trash2, Save } from 'lucide-react'
import type { Course, TemarioModule } from '@/lib/types'

export default function CourseEditor({ course }: { course: Course }) {
  const router = useRouter()
  const [name, setName] = useState(course.name)
  const [normalPrice, setNormalPrice] = useState(String(course.normal_price))
  const [offerPrice, setOfferPrice] = useState(String(course.offer_price))
  const [depositAmount, setDepositAmount] = useState(String(course.deposit_amount))
  const [durationText, setDurationText] = useState(course.duration_text)
  const [notes, setNotes] = useState(course.notes || '')
  const [active, setActive] = useState(course.active)
  const [includes, setIncludes] = useState<string[]>(course.includes || [])
  const [temario, setTemario] = useState<TemarioModule[]>(course.temario || [])
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  // Includes
  function addInclude() { setIncludes(p => [...p, '']) }
  function updateInclude(i: number, val: string) { setIncludes(p => p.map((x, j) => j === i ? val : x)) }
  function removeInclude(i: number) { setIncludes(p => p.filter((_, j) => j !== i)) }

  // Temario
  function addModule() { setTemario(p => [...p, { title: '', bullets: [''] }]) }
  function updateModuleTitle(i: number, val: string) { setTemario(p => p.map((m, j) => j === i ? { ...m, title: val } : m)) }
  function addBullet(mi: number) { setTemario(p => p.map((m, j) => j === mi ? { ...m, bullets: [...m.bullets, ''] } : m)) }
  function updateBullet(mi: number, bi: number, val: string) { setTemario(p => p.map((m, j) => j === mi ? { ...m, bullets: m.bullets.map((b, k) => k === bi ? val : b) } : m)) }
  function removeBullet(mi: number, bi: number) { setTemario(p => p.map((m, j) => j === mi ? { ...m, bullets: m.bullets.filter((_, k) => k !== bi) } : m)) }
  function removeModule(i: number) { setTemario(p => p.filter((_, j) => j !== i)) }

  async function handleSave() {
    setSaving(true)
    setSaved(false)
    await fetch('/api/admin/courses', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: course.id,
        name,
        normal_price: parseInt(normalPrice),
        offer_price: parseInt(offerPrice),
        deposit_amount: parseInt(depositAmount),
        duration_text: durationText,
        notes: notes || null,
        active,
        includes,
        temario,
      }),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const inputStyle = { background: 'var(--bg-card-2)', border: '1px solid var(--border)', borderRadius: '0.5rem', color: 'var(--text)', fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', padding: '0.65rem 0.875rem', width: '100%', outline: 'none' }
  const labelStyle = { fontFamily: "'Work Sans', sans-serif", fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: 'var(--muted)', display: 'block', marginBottom: '0.35rem' }

  return (
    <div style={{ padding: '2.5rem', maxWidth: 820 }}>
      <button onClick={() => router.push('/admin/cursos')} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--muted)', fontSize: '0.85rem', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '1.5rem' }}>
        <ArrowLeft size={14} /> Volver a cursos
      </button>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 900, fontSize: '1.5rem' }}>Editar: {course.name}</h1>
        <button onClick={handleSave} disabled={saving} className="btn-rosa" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
          <Save size={15} />
          {saving ? 'Guardando...' : saved ? '¡Guardado!' : 'Guardar cambios'}
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Basic info */}
        <section style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '0.75rem', padding: '1.5rem' }}>
          <h2 style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 800, fontSize: '0.95rem', marginBottom: '1.25rem' }}>Información básica</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Nombre del curso</label>
              <input style={inputStyle} value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Precio normal (CLP)</label>
              <input style={inputStyle} type="number" value={normalPrice} onChange={e => setNormalPrice(e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Precio oferta (CLP)</label>
              <input style={inputStyle} type="number" value={offerPrice} onChange={e => setOfferPrice(e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Abono de reserva (CLP)</label>
              <input style={inputStyle} type="number" value={depositAmount} onChange={e => setDepositAmount(e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Duración</label>
              <input style={inputStyle} value={durationText} onChange={e => setDurationText(e.target.value)} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Notas (opcional)</label>
              <input style={inputStyle} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Ej: Práctica full en modelos reales" />
            </div>
            <div>
              <label style={labelStyle}>Visible en el sitio</label>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem' }}>
                {[true, false].map(val => (
                  <label key={String(val)} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', color: active === val ? 'var(--text)' : 'var(--muted)', fontSize: '0.875rem' }}>
                    <input type="radio" checked={active === val} onChange={() => setActive(val)} style={{ accentColor: 'var(--rosa)' }} />
                    {val ? 'Activo' : 'Oculto'}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Includes */}
        <section style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '0.75rem', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h2 style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 800, fontSize: '0.95rem' }}>¿Qué incluye?</h2>
            <button onClick={addInclude} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: 'var(--rosa-dim)', border: '1px solid var(--border-rosa)', borderRadius: '0.4rem', padding: '0.4rem 0.75rem', fontSize: '0.8rem', color: 'var(--rosa)', cursor: 'pointer', fontFamily: "'Work Sans', sans-serif", fontWeight: 700 }}>
              <Plus size={13} /> Agregar
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {includes.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input style={{ ...inputStyle, flex: 1 }} value={item} onChange={e => updateInclude(i, e.target.value)} placeholder="Ej: Certificado" />
                <button onClick={() => removeInclude(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', padding: '0.4rem', flexShrink: 0 }}>
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Temario */}
        <section style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '0.75rem', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h2 style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 800, fontSize: '0.95rem' }}>Temario</h2>
            <button onClick={addModule} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: 'var(--rosa-dim)', border: '1px solid var(--border-rosa)', borderRadius: '0.4rem', padding: '0.4rem 0.75rem', fontSize: '0.8rem', color: 'var(--rosa)', cursor: 'pointer', fontFamily: "'Work Sans', sans-serif", fontWeight: 700 }}>
              <Plus size={13} /> Agregar módulo
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {temario.map((mod, mi) => (
              <div key={mi} style={{ background: 'var(--bg-card-2)', border: '1px solid var(--border)', borderRadius: '0.6rem', padding: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.875rem', alignItems: 'center' }}>
                  <span style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 900, color: 'var(--rosa)', fontSize: '0.85rem', flexShrink: 0 }}>{String(mi + 1).padStart(2, '0')}</span>
                  <input style={{ ...inputStyle, flex: 1, fontWeight: 700 }} value={mod.title} onChange={e => updateModuleTitle(mi, e.target.value)} placeholder="Título del módulo" />
                  <button onClick={() => removeModule(mi)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', padding: '0.4rem', flexShrink: 0 }}>
                    <Trash2 size={15} />
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginLeft: '1.5rem' }}>
                  {mod.bullets.map((b, bi) => (
                    <div key={bi} style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                      <span style={{ color: 'var(--border-rosa)', fontSize: '0.8rem', flexShrink: 0 }}>–</span>
                      <input style={{ ...inputStyle, flex: 1, fontSize: '0.825rem' }} value={b} onChange={e => updateBullet(mi, bi, e.target.value)} placeholder="Punto del módulo" />
                      <button onClick={() => removeBullet(mi, bi)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', padding: '0.3rem', flexShrink: 0 }}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                  <button onClick={() => addBullet(mi)} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: 'none', border: '1px dashed var(--border)', borderRadius: '0.4rem', padding: '0.35rem 0.6rem', fontSize: '0.75rem', color: 'var(--muted)', cursor: 'pointer', marginTop: '0.25rem', width: 'fit-content' }}>
                    <Plus size={12} /> Agregar punto
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

'use client'
import { useState, useEffect } from 'react'
import { Plus, X } from 'lucide-react'

interface CourseOption { id: string; name: string; category: string }
interface SessionItem {
  id: string
  start_date: string
  end_date: string
  total_spots: number
  available_spots: number
  status: string
  courses: { name: string; category: string } | null
}

function formatDate(d: string) {
  return new Date(d + 'T12:00:00').toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function AgendaPage() {
  const [sessions, setSessions] = useState<SessionItem[]>([])
  const [courses, setCourses] = useState<CourseOption[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ course_id: '', start_date: '', end_date: '', total_spots: '8' })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/sessions').then(r => r.json()),
      fetch('/api/admin/courses').then(r => r.json()),
    ]).then(([sd, cd]) => {
      setSessions(sd.sessions || [])
      setCourses((cd.courses || []).filter((c: CourseOption & { active: boolean }) => c.active))
      setLoading(false)
    })
  }, [])

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSaving(true)
    const res = await fetch('/api/admin/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, total_spots: parseInt(form.total_spots) }),
    })
    const data = await res.json()
    if (res.ok) {
      const courseInfo = courses.find(c => c.id === form.course_id)
      setSessions(p => [{ ...data.session, courses: courseInfo ? { name: courseInfo.name, category: courseInfo.category } : null }, ...p])
      setForm({ course_id: '', start_date: '', end_date: '', total_spots: '8' })
      setShowForm(false)
    } else {
      setError(data.error || 'Error al crear la fecha.')
    }
    setSaving(false)
  }

  async function toggleStatus(session: SessionItem) {
    const newStatus = session.status === 'open' ? 'closed' : 'open'
    const res = await fetch('/api/admin/sessions', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: session.id, status: newStatus }),
    })
    if (res.ok) {
      setSessions(p => p.map(s => s.id === session.id ? { ...s, status: newStatus } : s))
    }
  }

  const inputStyle = { background: 'var(--bg-card-2)', border: '1px solid var(--border)', borderRadius: '0.5rem', color: 'var(--text)', fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', padding: '0.65rem 0.875rem', width: '100%', outline: 'none' }
  const labelStyle = { fontFamily: "'Work Sans', sans-serif", fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: 'var(--muted)', display: 'block', marginBottom: '0.35rem' }

  return (
    <div style={{ padding: '2.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 900, fontSize: '1.75rem', marginBottom: '0.25rem' }}>Agenda</h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>Administra las fechas disponibles de cada curso</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-rosa" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
          {showForm ? <><X size={15} /> Cancelar</> : <><Plus size={15} /> Nueva fecha</>}
        </button>
      </div>

      {/* Add session form */}
      {showForm && (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-rosa)', borderRadius: '0.75rem', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 800, fontSize: '1rem', marginBottom: '1.25rem' }}>Agregar nueva fecha</h2>
          <form onSubmit={handleAdd} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'end' }}>
            <div>
              <label style={labelStyle}>Curso</label>
              <select style={inputStyle} value={form.course_id} onChange={e => setForm(f => ({ ...f, course_id: e.target.value }))} required>
                <option value="">Seleccionar...</option>
                {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Fecha inicio</label>
              <input style={inputStyle} type="date" value={form.start_date} onChange={e => setForm(f => ({ ...f, start_date: e.target.value }))} required />
            </div>
            <div>
              <label style={labelStyle}>Fecha fin</label>
              <input style={inputStyle} type="date" value={form.end_date} onChange={e => setForm(f => ({ ...f, end_date: e.target.value }))} required />
            </div>
            <div>
              <label style={labelStyle}>Cupos totales</label>
              <input style={inputStyle} type="number" min="1" max="20" value={form.total_spots} onChange={e => setForm(f => ({ ...f, total_spots: e.target.value }))} required />
            </div>
            <div>
              {error && <p style={{ color: '#ff6b6b', fontSize: '0.8rem', marginBottom: '0.5rem' }}>{error}</p>}
              <button type="submit" className="btn-rosa" disabled={saving} style={{ width: '100%', justifyContent: 'center' }}>
                {saving ? 'Guardando...' : 'Agregar fecha'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Sessions list */}
      {loading ? (
        <p style={{ color: 'var(--muted)' }}>Cargando...</p>
      ) : sessions.length === 0 ? (
        <p style={{ color: 'var(--muted)' }}>No hay fechas creadas aún.</p>
      ) : (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '0.75rem', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Curso', 'Fecha inicio', 'Fecha fin', 'Cupos', 'Estado', 'Acción'].map((h, i) => (
                  <th key={i} style={{ padding: '0.875rem 1rem', textAlign: 'left', fontSize: '0.7rem', fontFamily: "'Work Sans', sans-serif", fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sessions.map((s, i) => (
                <tr key={s.id} style={{ borderBottom: i < sessions.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <td style={{ padding: '0.875rem 1rem', fontFamily: "'Work Sans', sans-serif", fontWeight: 700, fontSize: '0.85rem' }}>{s.courses?.name}</td>
                  <td style={{ padding: '0.875rem 1rem', color: 'var(--muted)', fontSize: '0.85rem' }}>{formatDate(s.start_date)}</td>
                  <td style={{ padding: '0.875rem 1rem', color: 'var(--muted)', fontSize: '0.85rem' }}>{formatDate(s.end_date)}</td>
                  <td style={{ padding: '0.875rem 1rem' }}>
                    <span style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 800, color: s.available_spots === 0 ? '#ff6b6b' : 'var(--rosa)' }}>
                      {s.available_spots}/{s.total_spots}
                    </span>
                  </td>
                  <td style={{ padding: '0.875rem 1rem' }}>
                    <span style={{ padding: '0.2rem 0.55rem', borderRadius: 100, fontSize: '0.7rem', fontFamily: "'Work Sans', sans-serif", fontWeight: 700, background: s.status === 'open' ? 'rgba(74,222,128,0.15)' : 'rgba(255,252,250,0.08)', color: s.status === 'open' ? '#4ade80' : 'var(--muted)' }}>
                      {s.status === 'open' ? 'Abierta' : 'Cerrada'}
                    </span>
                  </td>
                  <td style={{ padding: '0.875rem 1rem' }}>
                    <button onClick={() => toggleStatus(s)} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: '0.4rem', padding: '0.3rem 0.65rem', fontSize: '0.75rem', color: 'var(--muted)', cursor: 'pointer', fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
                      {s.status === 'open' ? 'Cerrar' : 'Abrir'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

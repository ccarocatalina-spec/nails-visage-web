'use client'
import { useState, useEffect } from 'react'
import { MessageCircle } from 'lucide-react'

interface Reservation {
  id: string
  student_name: string
  phone: string
  email: string
  amount_paid: number
  payment_status: string
  created_at: string
  sessions: { start_date: string; courses: { name: string } | null } | null
}

function CLP(n: number) {
  return n.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 })
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('es-CL', { day: 'numeric', month: 'short', year: 'numeric' })
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; color: string; bg: string }> = {
    approved: { label: 'Pagado', color: '#4ade80', bg: 'rgba(74,222,128,0.15)' },
    rejected: { label: 'Rechazado', color: '#ff6b6b', bg: 'rgba(255,107,107,0.15)' },
    pending: { label: 'Pendiente', color: 'var(--muted)', bg: 'rgba(255,252,250,0.08)' },
  }
  const s = map[status] || map.pending
  return (
    <span style={{ padding: '0.2rem 0.6rem', borderRadius: 100, fontSize: '0.7rem', fontFamily: "'Work Sans', sans-serif", fontWeight: 700, background: s.bg, color: s.color }}>
      {s.label}
    </span>
  )
}

export default function ReservasPage() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('')

  useEffect(() => {
    const url = filter ? `/api/admin/reservations?status=${filter}` : '/api/admin/reservations'
    fetch(url).then(r => r.json()).then(data => {
      setReservations(data.reservations || [])
      setLoading(false)
    })
  }, [filter])

  return (
    <div style={{ padding: '2.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 900, fontSize: '1.75rem', marginBottom: '0.25rem' }}>Reservas</h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>Listado de todas las reservas con estado de pago</p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {[
          { val: '', label: 'Todas' },
          { val: 'approved', label: 'Pagadas' },
          { val: 'pending', label: 'Pendientes' },
          { val: 'rejected', label: 'Rechazadas' },
        ].map(f => (
          <button key={f.val} onClick={() => setFilter(f.val)}
            style={{ padding: '0.4rem 0.875rem', borderRadius: 100, fontSize: '0.8rem', fontFamily: "'Work Sans', sans-serif", fontWeight: 700, cursor: 'pointer', background: filter === f.val ? 'var(--rosa)' : 'var(--bg-card)', border: `1px solid ${filter === f.val ? 'var(--rosa)' : 'var(--border)'}`, color: filter === f.val ? '#0B0B0B' : 'var(--muted)', transition: 'all 0.15s' }}>
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p style={{ color: 'var(--muted)' }}>Cargando reservas...</p>
      ) : reservations.length === 0 ? (
        <p style={{ color: 'var(--muted)' }}>No hay reservas con ese filtro.</p>
      ) : (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '0.75rem', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Alumna', 'Curso', 'Fecha del curso', 'Monto', 'Estado', 'Fecha reserva', 'Contacto'].map((h, i) => (
                    <th key={i} style={{ padding: '0.875rem 1rem', textAlign: 'left', fontSize: '0.7rem', fontFamily: "'Work Sans', sans-serif", fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reservations.map((r, i) => (
                  <tr key={r.id} style={{ borderBottom: i < reservations.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <div style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 700, fontSize: '0.875rem' }}>{r.student_name}</div>
                      <div style={{ color: 'var(--muted-2)', fontSize: '0.75rem' }}>{r.email}</div>
                    </td>
                    <td style={{ padding: '0.875rem 1rem', fontSize: '0.85rem', color: 'var(--muted)' }}>{r.sessions?.courses?.name}</td>
                    <td style={{ padding: '0.875rem 1rem', fontSize: '0.85rem', color: 'var(--muted)', whiteSpace: 'nowrap' }}>
                      {r.sessions?.start_date ? formatDate(r.sessions.start_date) : '—'}
                    </td>
                    <td style={{ padding: '0.875rem 1rem', fontFamily: "'Work Sans', sans-serif", fontWeight: 700, color: 'var(--rosa)', fontSize: '0.875rem' }}>
                      {CLP(r.amount_paid)}
                    </td>
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <StatusBadge status={r.payment_status} />
                    </td>
                    <td style={{ padding: '0.875rem 1rem', fontSize: '0.8rem', color: 'var(--muted)', whiteSpace: 'nowrap' }}>
                      {formatDate(r.created_at)}
                    </td>
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <a href={`https://wa.me/${r.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hola ${r.student_name}, te contactamos de Academia Nails Visage.`)}`}
                        target="_blank" rel="noopener noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: '#25D366', fontSize: '0.8rem', fontFamily: "'Work Sans', sans-serif", fontWeight: 700 }}>
                        <MessageCircle size={14} /> {r.phone}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

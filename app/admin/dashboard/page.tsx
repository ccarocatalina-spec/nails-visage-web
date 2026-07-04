import { redirect } from 'next/navigation'
import { getAdminSession } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'

function CLP(n: number) {
  return n.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 })
}

function formatDate(d: string) {
  return new Date(d + 'T12:00:00').toLocaleDateString('es-CL', { weekday: 'short', day: 'numeric', month: 'short' })
}

export default async function DashboardPage() {
  const session = await getAdminSession()
  if (!session) redirect('/admin/login')

  // Upcoming sessions (next 30 days)
  const today = new Date().toISOString().split('T')[0]
  const in30 = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

  const [{ data: upcomingSessions }, { data: recentReservations }] = await Promise.all([
    supabaseAdmin
      .from('sessions')
      .select('*, courses(name)')
      .gte('start_date', today)
      .lte('start_date', in30)
      .eq('status', 'open')
      .order('start_date')
      .limit(8),
    supabaseAdmin
      .from('reservations')
      .select('*, sessions(start_date, courses(name))')
      .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
      .order('created_at', { ascending: false })
      .limit(20),
  ])

  const approved = (recentReservations || []).filter(r => r.payment_status === 'approved')
  const totalIncome = approved.reduce((s: number, r: { amount_paid: number }) => s + r.amount_paid, 0)

  return (
    <div style={{ padding: '2.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 900, fontSize: '1.75rem', marginBottom: '0.25rem' }}>Dashboard</h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>Resumen de la academia</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
        {[
          { label: 'Reservas últimos 7 días', value: recentReservations?.length || 0, sub: 'total', color: 'var(--rosa)' },
          { label: 'Pagos aprobados', value: approved.length, sub: 'últimos 7 días', color: '#4ade80' },
          { label: 'Ingresos (abonos)', value: CLP(totalIncome), sub: 'últimos 7 días', color: 'var(--rosa)' },
          { label: 'Próximas fechas', value: upcomingSessions?.length || 0, sub: 'en 30 días', color: 'var(--petalo)' },
        ].map((s, i) => (
          <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '0.75rem', padding: '1.5rem' }}>
            <div style={{ color: 'var(--muted)', fontSize: '0.75rem', marginBottom: '0.5rem', fontFamily: "'Work Sans', sans-serif", fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{s.label}</div>
            <div style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 900, fontSize: '1.75rem', color: s.color, marginBottom: '0.25rem' }}>{s.value}</div>
            <div style={{ color: 'var(--muted-2)', fontSize: '0.75rem' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
        {/* Upcoming sessions */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '0.75rem', padding: '1.5rem' }}>
          <h2 style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 800, fontSize: '1rem', marginBottom: '1.25rem' }}>Próximas fechas</h2>
          {!upcomingSessions?.length ? (
            <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>No hay fechas en los próximos 30 días.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {upcomingSessions.map((s: { id: string; courses: { name: string } | null; start_date: string; available_spots: number; total_spots: number }) => (
                <div key={s.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--bg-card-2)', borderRadius: '0.5rem' }}>
                  <div>
                    <div style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 700, fontSize: '0.85rem' }}>{s.courses?.name}</div>
                    <div style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>{formatDate(s.start_date)}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 800, color: s.available_spots === 0 ? '#ff6b6b' : 'var(--rosa)' }}>
                      {s.available_spots}/{s.total_spots}
                    </span>
                    <div style={{ color: 'var(--muted-2)', fontSize: '0.7rem' }}>cupos</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent reservations */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '0.75rem', padding: '1.5rem' }}>
          <h2 style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 800, fontSize: '1rem', marginBottom: '1.25rem' }}>Últimas reservas</h2>
          {!recentReservations?.length ? (
            <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>Sin reservas en los últimos 7 días.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {recentReservations.slice(0, 6).map((r: { id: string; student_name: string; sessions: { courses: { name: string } | null } | null; payment_status: string; amount_paid: number }) => (
                <div key={r.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--bg-card-2)', borderRadius: '0.5rem' }}>
                  <div>
                    <div style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 700, fontSize: '0.85rem' }}>{r.student_name}</div>
                    <div style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>{r.sessions?.courses?.name}</div>
                  </div>
                  <span style={{ padding: '0.25rem 0.6rem', borderRadius: 100, fontSize: '0.7rem', fontFamily: "'Work Sans', sans-serif", fontWeight: 700, background: r.payment_status === 'approved' ? 'rgba(74,222,128,0.15)' : r.payment_status === 'rejected' ? 'rgba(255,107,107,0.15)' : 'rgba(255,252,250,0.08)', color: r.payment_status === 'approved' ? '#4ade80' : r.payment_status === 'rejected' ? '#ff6b6b' : 'var(--muted)' }}>
                    {r.payment_status === 'approved' ? 'Pagado' : r.payment_status === 'rejected' ? 'Rechazado' : 'Pendiente'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

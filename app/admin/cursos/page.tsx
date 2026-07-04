import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getAdminSession } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'
import { Edit2 } from 'lucide-react'

function CLP(n: number) {
  return n.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 })
}

export default async function AdminCursosPage() {
  const session = await getAdminSession()
  if (!session) redirect('/admin/login')

  const { data: courses } = await supabaseAdmin
    .from('courses')
    .select('id, name, category, offer_price, normal_price, active, deposit_amount')
    .order('category')
    .order('name')

  const manicure = (courses || []).filter((c: { category: string }) => c.category === 'manicure')
  const pestanas = (courses || []).filter((c: { category: string }) => c.category === 'pestanas_cejas')

  function CourseTable({ items, title }: { items: typeof courses; title: string }) {
    return (
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 800, fontSize: '1rem', marginBottom: '1rem', color: 'var(--rosa)' }}>{title}</h2>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '0.75rem', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Curso', 'Precio oferta', 'Precio normal', 'Abono', 'Estado', ''].map((h, i) => (
                  <th key={i} style={{ padding: '0.875rem 1rem', textAlign: 'left', fontSize: '0.7rem', fontFamily: "'Work Sans', sans-serif", fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(items || []).map((c: { id: string; name: string; offer_price: number; normal_price: number; deposit_amount: number; active: boolean }, i: number) => (
                <tr key={c.id} style={{ borderBottom: i < (items?.length || 0) - 1 ? '1px solid var(--border)' : 'none' }}>
                  <td style={{ padding: '0.875rem 1rem', fontFamily: "'Work Sans', sans-serif", fontWeight: 700, fontSize: '0.875rem' }}>{c.name}</td>
                  <td style={{ padding: '0.875rem 1rem', color: 'var(--rosa)', fontFamily: "'Work Sans', sans-serif", fontWeight: 700, fontSize: '0.85rem' }}>{CLP(c.offer_price)}</td>
                  <td style={{ padding: '0.875rem 1rem', color: 'var(--muted)', fontSize: '0.85rem', textDecoration: 'line-through' }}>{CLP(c.normal_price)}</td>
                  <td style={{ padding: '0.875rem 1rem', color: 'var(--muted)', fontSize: '0.85rem' }}>{CLP(c.deposit_amount)}</td>
                  <td style={{ padding: '0.875rem 1rem' }}>
                    <span style={{ padding: '0.2rem 0.55rem', borderRadius: 100, fontSize: '0.7rem', fontFamily: "'Work Sans', sans-serif", fontWeight: 700, background: c.active ? 'rgba(74,222,128,0.15)' : 'rgba(255,252,250,0.08)', color: c.active ? '#4ade80' : 'var(--muted)' }}>
                      {c.active ? 'Activo' : 'Oculto'}
                    </span>
                  </td>
                  <td style={{ padding: '0.875rem 1rem' }}>
                    <Link href={`/admin/cursos/${c.id}`}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: 'var(--rosa)', fontSize: '0.8rem', fontFamily: "'Work Sans', sans-serif", fontWeight: 700 }}>
                      <Edit2 size={13} /> Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '2.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 900, fontSize: '1.75rem', marginBottom: '0.25rem' }}>Cursos</h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>Edita precios, temarios y disponibilidad de cada curso</p>
      </div>

      <CourseTable items={manicure as Parameters<typeof CourseTable>[0]['items']} title="Manicure" />
      <CourseTable items={pestanas as Parameters<typeof CourseTable>[0]['items']} title="Pestañas y Cejas" />
    </div>
  )
}

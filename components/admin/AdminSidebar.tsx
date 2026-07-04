'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, BookOpen, Calendar, ClipboardList, LogOut } from 'lucide-react'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { href: '/admin/cursos', label: 'Cursos', icon: <BookOpen size={18} /> },
  { href: '/admin/agenda', label: 'Agenda', icon: <Calendar size={18} /> },
  { href: '/admin/reservas', label: 'Reservas', icon: <ClipboardList size={18} /> },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <aside style={{ width: 220, minHeight: '100vh', background: 'var(--bg-2)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', padding: '1.5rem 1rem', flexShrink: 0 }}>
      <div style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 900, fontSize: '1rem', marginBottom: '2rem', padding: '0 0.5rem' }}>
        NAILS <span style={{ color: 'var(--rosa)' }}>VISAGE</span>
        <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '0.7rem', color: 'var(--muted)', marginTop: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Admin</div>
      </div>

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        {navItems.map(item => {
          const active = pathname.startsWith(item.href)
          return (
            <Link key={item.href} href={item.href}
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.875rem', fontFamily: "'Work Sans', sans-serif", fontWeight: active ? 700 : 500, color: active ? 'var(--text)' : 'var(--muted)', background: active ? 'var(--rosa-dim)' : 'transparent', border: `1px solid ${active ? 'var(--border-rosa)' : 'transparent'}`, transition: 'all 0.15s' }}>
              <span style={{ color: active ? 'var(--rosa)' : 'var(--muted)' }}>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      <button onClick={handleLogout}
        style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.875rem', fontFamily: "'Work Sans', sans-serif", fontWeight: 500, color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', width: '100%', transition: 'color 0.15s' }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>
        <LogOut size={18} />
        Cerrar sesión
      </button>
    </aside>
  )
}

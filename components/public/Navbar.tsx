'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '/', label: 'Inicio', highlight: false },
  { href: '/cursos/manicure', label: 'Manicure', highlight: false },
  { href: '/cursos/pestanas-cejas', label: 'Pestañas y Cejas', highlight: false },
  { href: '/cursos/online', label: '✦ Online', highlight: true },
  { href: '/nosotros', label: 'Nosotros', highlight: false },
  { href: '/preguntas-frecuentes', label: 'FAQ', highlight: false },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(11,11,11,0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        {/* Logo */}
        <Link href="/" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 900, fontSize: '1.2rem', color: 'var(--text)', letterSpacing: '-0.02em' }}>
          NAILS <span style={{ color: 'var(--rosa)' }}>VISAGE</span>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="hidden md:flex">
          {links.map(l => (
            <Link key={l.href} href={l.href}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.875rem',
                color: l.highlight ? 'var(--rosa)' : 'var(--muted)',
                transition: 'color 0.2s',
                fontWeight: l.highlight ? 700 : 400,
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.color = l.highlight ? 'var(--rosa)' : 'var(--muted)')}>
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <a href="https://wa.me/c/56974115228" target="_blank" rel="noopener noreferrer"
          className="btn-rosa hidden md:inline-flex" style={{ fontSize: '0.8rem', padding: '0.55rem 1.25rem' }}>
          Reservar cupo
        </a>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)', padding: 4 }} className="md:hidden">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: 'var(--bg-2)', borderBottom: '1px solid var(--border)', padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              style={{
                fontFamily: "'Work Sans', sans-serif",
                fontWeight: 600,
                fontSize: '1rem',
                color: l.highlight ? 'var(--rosa)' : 'var(--text)',
              }}>
              {l.label}
            </Link>
          ))}
          <a href="https://wa.me/c/56974115228" target="_blank" rel="noopener noreferrer" className="btn-rosa" style={{ marginTop: '0.5rem', textAlign: 'center' }}>
            Reservar cupo
          </a>
        </div>
      )}
    </header>
  )
}

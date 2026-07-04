'use client'
import Link from 'next/link'
import { MapPin, Phone, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', padding: '4rem 1.5rem 2rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>

          {/* Brand */}
          <div>
            <div style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 900, fontSize: '1.4rem', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
              NAILS <span style={{ color: 'var(--rosa)' }}>VISAGE</span>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: '0.875rem', lineHeight: 1.6, maxWidth: 240 }}>
              Formando profesionales de la estética desde 2021. Más de 5.000 alumnas certificadas.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
              <a href="https://www.instagram.com/nailsvisage.academia" target="_blank" rel="noopener noreferrer"
                style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--bg-card)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', transition: 'color 0.2s, border-color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--rosa)'; e.currentTarget.style.borderColor = 'var(--rosa)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://www.facebook.com/NailsVisage.cl" target="_blank" rel="noopener noreferrer"
                style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--bg-card)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', transition: 'color 0.2s, border-color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--rosa)'; e.currentTarget.style.borderColor = 'var(--rosa)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>

          {/* Cursos */}
          <div>
            <div style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '1rem' }}>Cursos</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { href: '/cursos/manicure', label: 'Cursos de Manicure' },
                { href: '/cursos/pestanas-cejas', label: 'Cursos de Pestañas y Cejas' },
                { href: '/nosotros', label: 'Nosotros' },
                { href: '/preguntas-frecuentes', label: 'Preguntas Frecuentes' },
              ].map(l => (
                <Link key={l.href} href={l.href} style={{ color: 'var(--muted)', fontSize: '0.875rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contacto */}
          <div>
            <div style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '1rem' }}>Contacto</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                <MapPin size={15} style={{ color: 'var(--rosa)', flexShrink: 0, marginTop: 2 }} />
                <span style={{ color: 'var(--muted)', fontSize: '0.875rem', lineHeight: 1.5 }}>
                  Santa Magdalena 72, Providencia<br />Metro Los Leones, Santiago
                </span>
              </div>
              <a href="https://wa.me/56974115228" target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', color: 'var(--muted)', fontSize: '0.875rem', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--rosa)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>
                <Phone size={15} style={{ color: 'var(--rosa)', flexShrink: 0 }} />
                +56 9 7411 5228
              </a>
              <a href="mailto:academianailsvisage@gmail.com"
                style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', color: 'var(--muted)', fontSize: '0.875rem', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--rosa)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>
                <Mail size={15} style={{ color: 'var(--rosa)', flexShrink: 0 }} />
                academianailsvisage@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ color: 'var(--muted-2)', fontSize: '0.8rem' }}>
            © {new Date().getFullYear()} Academia Nails Visage. Todos los derechos reservados.
          </p>
          <Link href="/admin/login" style={{ color: 'var(--muted-2)', fontSize: '0.75rem', opacity: 0.5 }}>
            Admin
          </Link>
        </div>
      </div>
    </footer>
  )
}

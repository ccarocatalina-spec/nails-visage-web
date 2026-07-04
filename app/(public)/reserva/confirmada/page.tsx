import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function ReservaConfirmada() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 1.5rem', textAlign: 'center' }}>
      <div style={{ maxWidth: 480 }}>
        <CheckCircle size={56} style={{ color: '#4ade80', margin: '0 auto 1.5rem' }} />
        <h1 className="heading" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          ¡Reserva <span style={{ color: 'var(--rosa)' }}>confirmada</span>!
        </h1>
        <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
          Tu pago fue aprobado y tu cupo está reservado. Te contactaremos por WhatsApp para enviarte todos los detalles del curso.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn-rosa">Volver al inicio</Link>
          <a href="https://wa.me/56974115228" target="_blank" rel="noopener noreferrer" className="btn-ghost">
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}

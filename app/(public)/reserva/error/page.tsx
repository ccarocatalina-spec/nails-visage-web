import Link from 'next/link'
import { XCircle } from 'lucide-react'

export default function ReservaError() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 1.5rem', textAlign: 'center' }}>
      <div style={{ maxWidth: 480 }}>
        <XCircle size={56} style={{ color: '#ff6b6b', margin: '0 auto 1.5rem' }} />
        <h1 className="heading" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          Pago <span style={{ color: '#ff6b6b' }}>no procesado</span>
        </h1>
        <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
          Tu pago no pudo ser procesado. Tu reserva no fue confirmada. Puedes intentar de nuevo o contactarnos directamente por WhatsApp.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/cursos/manicure" className="btn-rosa">Volver a los cursos</Link>
          <a href="https://wa.me/56974115228" target="_blank" rel="noopener noreferrer" className="btn-ghost">
            Contactar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}

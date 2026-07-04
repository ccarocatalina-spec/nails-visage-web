'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    category: 'Reservas y pagos',
    items: [
      {
        q: '¿Cómo reservo mi cupo?',
        a: 'Elige el curso de tu interés, selecciona una fecha disponible, completa el formulario con tus datos y paga el abono online con Mercado Pago. Tu cupo queda reservado de inmediato.',
      },
      {
        q: '¿Cuánto debo pagar para reservar?',
        a: 'Solo el abono (señal) de cada curso, indicado en la ficha. El monto restante se paga en efectivo, tarjeta o transferencia el día del curso en la academia.',
      },
      {
        q: '¿Qué formas de pago aceptan?',
        a: 'Para el abono online: Mercado Pago (tarjetas de crédito/débito y transferencia). En la academia el día del curso: efectivo, tarjeta de crédito o transferencia bancaria.',
      },
      {
        q: '¿El abono se descuenta del precio total del curso?',
        a: 'Sí, el abono es parte del precio total. Solo pagas la diferencia el día del curso.',
      },
    ],
  },
  {
    category: 'Reprogramación y cancelación',
    items: [
      {
        q: '¿Puedo cambiar de fecha después de reservar?',
        a: 'Sí, puedes reprogramar con 48 horas de aviso previo vía WhatsApp al +56 9 7411 5228. Sin ese plazo, no es posible garantizar el cambio.',
      },
      {
        q: '¿Qué pasa si cancelo?',
        a: 'Si cancelas fuera del plazo establecido, el abono no se reembolsa. Si la academia cancela la fecha, te ofrecemos cambiar a otra fecha o te devolvemos el abono íntegro.',
      },
    ],
  },
  {
    category: 'Los cursos',
    items: [
      {
        q: '¿Necesito experiencia previa?',
        a: 'No. Nuestros cursos están diseñados para empezar desde cero. También son perfectos si ya tienes experiencia y quieres perfeccionar técnicas específicas.',
      },
      {
        q: '¿Qué incluyen los cursos?',
        a: 'Todos los cursos incluyen certificado, materiales durante las clases, manual impreso, lista de proveedores con descuentos, asesoría post curso y snack. Los cursos de extensión de pestañas también incluyen práctica en modelos reales.',
      },
      {
        q: '¿Cuántas alumnas hay por clase?',
        a: 'Trabajamos en grupos reducidos para garantizar atención personalizada. Generalmente entre 4 y 8 alumnas por sesión.',
      },
      {
        q: '¿Los cursos son presenciales?',
        a: 'Sí, todos los cursos de esta academia son presenciales en nuestra sede de Santa Magdalena 72, Providencia (Metro Los Leones). Existe por separado un curso online de Esmaltado Semipermanente — consulta en Instagram.',
      },
      {
        q: '¿Entregan certificado?',
        a: 'Sí, al finalizar cada curso recibes un certificado oficial de Academia Nails Visage que acredita las técnicas aprendidas.',
      },
    ],
  },
  {
    category: 'Ubicación',
    items: [
      {
        q: '¿Dónde están ubicados?',
        a: 'Santa Magdalena 72, Providencia, Santiago — a pasos del Metro Los Leones.',
      },
      {
        q: '¿Hay estacionamiento?',
        a: 'No tenemos estacionamiento propio, pero hay opciones de estacionamiento pago en los alrededores. Te recomendamos llegar en Metro para mayor comodidad.',
      },
    ],
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', padding: '1.25rem 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--text)' }}>
        <span style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.4 }}>{q}</span>
        <ChevronDown size={18} style={{ color: 'var(--rosa)', flexShrink: 0, marginTop: 2, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </button>
      {open && (
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.7, paddingBottom: '1.25rem' }}>{a}</p>
      )}
    </div>
  )
}

export default function FAQPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ padding: '5rem 1.5rem 3rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div className="tag" style={{ marginBottom: '1rem', margin: '0 auto 1rem' }}>FAQ</div>
          <h1 className="heading" style={{ fontSize: 'clamp(2.5rem, 7vw, 4rem)', marginBottom: '1rem' }}>
            Preguntas <span style={{ color: 'var(--rosa)' }}>frecuentes</span>
          </h1>
          <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
            Respondemos las dudas más comunes. Si no encuentras tu respuesta, escríbenos por WhatsApp.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '2rem 1.5rem 6rem' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {faqs.map(cat => (
            <div key={cat.category}>
              <div style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--rosa)', marginBottom: '1rem' }}>
                {cat.category}
              </div>
              <div>
                {cat.items.map(item => <FAQItem key={item.q} {...item} />)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '4rem 1.5rem', background: 'var(--bg-2)', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
        <div style={{ maxWidth: 480, margin: '0 auto' }}>
          <h2 className="heading" style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>
            ¿Tienes más <span style={{ color: 'var(--rosa)' }}>preguntas</span>?
          </h2>
          <p style={{ color: 'var(--muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            Fernando y Catalina responden por WhatsApp todos los días.
          </p>
          <a href="https://wa.me/56974115228?text=Hola%2C%20tengo%20una%20consulta%20sobre%20los%20cursos"
            target="_blank" rel="noopener noreferrer" className="btn-rosa">
            Escribirnos por WhatsApp
          </a>
        </div>
      </section>
    </>
  )
}

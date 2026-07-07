import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Award, Heart, Target } from 'lucide-react'

export const metadata = {
  title: 'Nosotros — Academia Nails Visage',
  description: 'Conoce la historia de Academia Nails Visage. Más de 5.000 alumnas certificadas desde 2021 en Providencia, Santiago.',
}

export default function NosotrosPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ padding: '5rem 1.5rem 4rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 400, background: 'radial-gradient(ellipse, rgba(239,129,174,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 680, margin: '0 auto' }}>
          <div className="tag" style={{ marginBottom: '1.25rem', margin: '0 auto 1.25rem' }}>Nuestra historia</div>
          <h1 className="heading" style={{ fontSize: 'clamp(2.5rem, 7vw, 4rem)', marginBottom: '1.25rem' }}>
            Formando <span style={{ color: 'var(--rosa)' }}>talentos</span><br />desde 2021
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>
            En Academia Nails Visage no solo enseñamos técnicas — impulsamos el crecimiento personal y profesional de cada alumna.
          </p>
        </div>
      </section>

      {/* Fotos de la academia */}
      <section style={{ padding: '0 1.5rem 4rem' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          <div style={{ position: 'relative', height: 340, borderRadius: '1.25rem', overflow: 'hidden', border: '1px solid var(--border)' }}>
            <Image src="/images/galeria/alumnas-practica.jpg" alt="Alumnas practicando en clase" fill style={{ objectFit: 'cover' }} sizes="(max-width: 640px) 100vw, 450px" />
          </div>
          <div style={{ position: 'relative', height: 340, borderRadius: '1.25rem', overflow: 'hidden', border: '1px solid var(--border)' }}>
            <Image src="/images/galeria/alumnas-certificado.jpg" alt="Alumnas con su certificado de Nails Visage" fill style={{ objectFit: 'cover' }} sizes="(max-width: 640px) 100vw, 450px" />
          </div>
        </div>
      </section>

      {/* Story */}
      <section style={{ padding: '4rem 1.5rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'center', marginBottom: '5rem' }}>
            <div>
              <div className="tag" style={{ marginBottom: '1rem' }}>Quiénes somos</div>
              <h2 className="heading" style={{ fontSize: '2rem', marginBottom: '1.25rem' }}>
                Una academia <span style={{ color: 'var(--rosa)' }}>familiar</span> con estándares profesionales
              </h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                En Academia Nails Visage no solo nos enfocamos en enseñar las últimas técnicas de manicure y pestañas, sino que también nos comprometemos a impulsar el crecimiento personal y profesional de cada una de nuestras alumnas.
              </p>
              <p style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
                Desde nuestros inicios, hemos formado a más de 5.000 alumnas que hoy trabajan de forma independiente o en salones de belleza, construyendo su propio futuro profesional.
              </p>
            </div>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '1.25rem', padding: '2.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '4rem', fontFamily: "'Work Sans', sans-serif", fontWeight: 900, color: 'var(--rosa)', lineHeight: 1 }}>5.000+</div>
              <div style={{ color: 'var(--muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Alumnas certificadas desde 2021</div>
              <div style={{ borderTop: '1px solid var(--border)', marginTop: '1.5rem', paddingTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <div style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 900, fontSize: '1.8rem', color: 'var(--text)' }}>16</div>
                  <div style={{ color: 'var(--muted-2)', fontSize: '0.75rem' }}>Cursos</div>
                </div>
                <div>
                  <div style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 900, fontSize: '1.8rem', color: 'var(--text)' }}>4+</div>
                  <div style={{ color: 'var(--muted-2)', fontSize: '0.75rem' }}>Años</div>
                </div>
              </div>
            </div>
          </div>

          {/* Misión y Visión */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '5rem' }}>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--rosa-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Target size={18} style={{ color: 'var(--rosa)' }} />
                </div>
                <h3 style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 800, fontSize: '1rem' }}>Misión</h3>
              </div>
              <p style={{ color: 'var(--muted)', lineHeight: 1.7, fontSize: '0.9rem' }}>
                Proporcionar una formación de calidad y especializada en el campo de la estética, brindando un entorno de aprendizaje enriquecedor y una experiencia educativa excepcional, ayudando a las alumnas a alcanzar sus metas — ya sea para iniciar sus propios negocios o para trabajar en salones de belleza.
              </p>
            </div>

            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--rosa-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Heart size={18} style={{ color: 'var(--rosa)' }} />
                </div>
                <h3 style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 800, fontSize: '1rem' }}>Visión</h3>
              </div>
              <p style={{ color: 'var(--muted)', lineHeight: 1.7, fontSize: '0.9rem' }}>
                Ser líder en la formación de profesionales de la estética a nivel nacional e internacional, reconocida por su cercanía y compromiso con la calidad.
              </p>
            </div>
          </div>

          {/* Valores */}
          <div>
            <h2 className="heading" style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '2.5rem' }}>
              Nuestros <span style={{ color: 'var(--rosa)' }}>valores</span>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
              {[
                { icon: <Award size={20} />, title: 'Excelencia', desc: 'Estándares profesionales en cada clase.' },
                { icon: <Heart size={20} />, title: 'Cercanía', desc: 'Trato personalizado y seguimiento real.' },
                { icon: <Target size={20} />, title: 'Resultado', desc: 'Egresadas que atienen desde el primer día.' },
                { icon: <Award size={20} />, title: 'Actualización', desc: 'Siempre con las últimas tendencias y técnicas.' },
              ].map((v, i) => (
                <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '0.75rem', padding: '1.5rem', textAlign: 'center' }}>
                  <div style={{ color: 'var(--rosa)', display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>{v.icon}</div>
                  <div style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 800, marginBottom: '0.4rem' }}>{v.title}</div>
                  <p style={{ color: 'var(--muted)', fontSize: '0.825rem', lineHeight: 1.5 }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '5rem 1.5rem', textAlign: 'center', background: 'var(--bg-2)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 500, margin: '0 auto' }}>
          <h2 className="heading" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '1rem' }}>
            Sé parte de nuestra <span style={{ color: 'var(--rosa)' }}>historia</span>
          </h2>
          <p style={{ color: 'var(--muted)', marginBottom: '2rem', lineHeight: 1.7 }}>
            Elige el curso que mejor se adapta a tus metas y empieza hoy.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/cursos/manicure" className="btn-rosa">Ver cursos <ArrowRight size={15} /></Link>
            <Link href="/cursos/pestanas-cejas" className="btn-ghost">Pestañas y Cejas</Link>
          </div>
        </div>
      </section>
    </>
  )
}

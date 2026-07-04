'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (res.ok) {
        router.push('/admin/dashboard')
      } else {
        setError(data.error || 'Error de autenticación.')
      }
    } catch {
      setError('No se pudo conectar. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 900, fontSize: '1.5rem', marginBottom: '0.5rem' }}>
            NAILS <span style={{ color: 'var(--rosa)' }}>VISAGE</span>
          </div>
          <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>Panel de administración</p>
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
          <h1 style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 800, fontSize: '1.25rem', marginBottom: '1.5rem' }}>Iniciar sesión</h1>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label className="label">Email</label>
              <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" required />
            </div>
            <div>
              <label className="label">Contraseña</label>
              <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
            </div>

            {error && <p style={{ color: '#ff6b6b', fontSize: '0.825rem' }}>{error}</p>}

            <button type="submit" className="btn-rosa" disabled={loading} style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

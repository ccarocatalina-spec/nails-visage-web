import { NextRequest, NextResponse } from 'next/server'
import { loginAdmin, signToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    const user = await loginAdmin(email, password)
    if (!user) {
      return NextResponse.json({ error: 'Email o contraseña incorrectos.' }, { status: 401 })
    }
    const token = await signToken(user.id, user.email)
    const res = NextResponse.json({ ok: true, name: user.name })
    res.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })
    return res
  } catch {
    return NextResponse.json({ error: 'Error interno.' }, { status: 500 })
  }
}

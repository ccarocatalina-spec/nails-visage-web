import { cookies } from 'next/headers'
import { supabaseAdmin } from './supabase'
import bcrypt from 'bcryptjs'
import { SignJWT, jwtVerify } from 'jose'

const SECRET = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || 'fallback-secret-change-this')

export async function signToken(userId: string, email: string) {
  return new SignJWT({ userId, email })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(SECRET)
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET)
    return payload as { userId: string; email: string }
  } catch {
    return null
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  if (!token) return null
  return verifyToken(token)
}

export async function loginAdmin(email: string, password: string) {
  const { data: user } = await supabaseAdmin
    .from('admin_users')
    .select('*')
    .eq('email', email)
    .single()

  if (!user) return null
  const valid = await bcrypt.compare(password, user.password_hash)
  if (!valid) return null
  return user
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12)
}

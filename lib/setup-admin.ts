/**
 * Run once to create the two admin users in Supabase.
 * Usage: npx ts-node lib/setup-admin.ts
 * Or add a temporary /api/setup-admin route and call it once.
 */
import { supabaseAdmin } from './supabase'
import { hashPassword } from './auth'

async function setup() {
  const users = [
    { email: 'fernando@nailsvisageacademia.com', name: 'Fernando', password: 'cambiar-esta-clave-1' },
    { email: 'catalina@nailsvisageacademia.com', name: 'Catalina', password: 'cambiar-esta-clave-2' },
  ]

  for (const u of users) {
    const hash = await hashPassword(u.password)
    const { error } = await supabaseAdmin.from('admin_users').upsert({
      email: u.email,
      name: u.name,
      password_hash: hash,
    }, { onConflict: 'email' })

    if (error) console.error(`Error creating ${u.email}:`, error)
    else console.log(`Created: ${u.email}`)
  }
}

setup()

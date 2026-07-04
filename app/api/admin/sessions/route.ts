import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { getAdminSession } from '@/lib/auth'

async function requireAdmin() {
  return !!(await getAdminSession())
}

export async function GET() {
  if (!await requireAdmin()) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const { data, error } = await supabaseAdmin
    .from('sessions')
    .select('*, courses(name, category)')
    .order('start_date', { ascending: true })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ sessions: data })
}

export async function POST(req: NextRequest) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const { course_id, start_date, end_date, total_spots } = await req.json()
  if (!course_id || !start_date || !end_date || !total_spots) {
    return NextResponse.json({ error: 'Faltan campos.' }, { status: 400 })
  }
  const { data, error } = await supabaseAdmin
    .from('sessions')
    .insert({ course_id, start_date, end_date, total_spots, available_spots: total_spots })
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ session: data })
}

export async function PUT(req: NextRequest) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const { id, ...fields } = await req.json()
  if (!id) return NextResponse.json({ error: 'Falta id.' }, { status: 400 })
  const { data, error } = await supabaseAdmin.from('sessions').update(fields).eq('id', id).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ session: data })
}

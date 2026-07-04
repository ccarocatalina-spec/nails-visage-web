import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { getAdminSession } from '@/lib/auth'

async function requireAdmin() {
  return !!(await getAdminSession())
}

export async function GET(req: NextRequest) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const status = req.nextUrl.searchParams.get('status')
  const courseId = req.nextUrl.searchParams.get('course_id')

  let query = supabaseAdmin
    .from('reservations')
    .select('*, sessions(start_date, end_date, courses(name, category))')
    .order('created_at', { ascending: false })
    .limit(200)

  if (status) query = query.eq('payment_status', status)
  if (courseId) query = query.eq('sessions.course_id', courseId)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ reservations: data })
}

export async function GET_stats() {
  if (!await requireAdmin()) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  // 7-day stats
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  const { data } = await supabaseAdmin
    .from('reservations')
    .select('amount_paid, payment_status')
    .gte('created_at', since)
    .eq('payment_status', 'approved')
  const total = (data || []).reduce((s, r) => s + r.amount_paid, 0)
  return NextResponse.json({ count: data?.length || 0, total })
}

import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const courseId = req.nextUrl.searchParams.get('course_id')
  if (!courseId) return NextResponse.json({ sessions: [] })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!supabaseUrl || supabaseUrl === 'your_supabase_url') {
    return NextResponse.json({ sessions: [] })
  }

  try {
    const { supabase } = await import('@/lib/supabase')
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .eq('course_id', courseId)
      .eq('status', 'open')
      .gt('available_spots', 0)
      .gte('start_date', new Date().toISOString().split('T')[0])
      .order('start_date', { ascending: true })

    if (error) return NextResponse.json({ sessions: [] })
    return NextResponse.json({ sessions: data })
  } catch {
    return NextResponse.json({ sessions: [] })
  }
}

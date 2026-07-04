import { redirect, notFound } from 'next/navigation'
import { getAdminSession } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'
import CourseEditor from './CourseEditor'

export default async function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession()
  if (!session) redirect('/admin/login')

  const { id } = await params
  const { data: course } = await supabaseAdmin.from('courses').select('*').eq('id', id).single()
  if (!course) notFound()

  return <CourseEditor course={course} />
}

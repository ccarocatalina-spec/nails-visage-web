import { notFound } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase'
import { COURSES } from '@/lib/courses-data'
import CourseDetail from './CourseDetail'
import type { Course } from '@/lib/types'

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  return COURSES.filter(c => c.active).map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const staticCourse = COURSES.find(c => c.slug === slug)
  if (!staticCourse) return {}
  return {
    title: `${staticCourse.name} — Academia Nails Visage`,
    description: `Curso de ${staticCourse.name} en Santiago, Providencia. ${staticCourse.duration_text}. Certificado incluido.`,
  }
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const { data: course, error } = await supabaseAdmin
    .from('courses')
    .select('*')
    .eq('slug', slug)
    .eq('active', true)
    .single()

  if (!course || error) notFound()

  return <CourseDetail course={course as unknown as Course} />
}

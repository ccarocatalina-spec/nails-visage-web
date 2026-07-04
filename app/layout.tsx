import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Academia Nails Visage — Cursos de Manicure y Pestañas en Santiago',
  description: 'Más de 5.000 alumnas certificadas desde 2021. Cursos presenciales de manicure, esmaltado semipermanente, extensión de pestañas y cejas en Providencia, Santiago.',
  keywords: 'cursos manicure santiago, academia manicure providencia, extensión pestañas, esmaltado semipermanente, nails visage',
  openGraph: {
    title: 'Academia Nails Visage',
    description: 'Más de 5.000 alumnas certificadas. Tu futuro profesional comienza aquí.',
    url: 'https://nailsvisageacademia.com',
    siteName: 'Academia Nails Visage',
    locale: 'es_CL',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}

export type CourseCategory = 'manicure' | 'pestanas_cejas'

export type SessionStatus = 'open' | 'closed'

export type PaymentStatus = 'pending' | 'approved' | 'rejected'

export interface TemarioModule {
  title: string
  bullets: string[]
}

export interface Course {
  id: string
  category: CourseCategory
  name: string
  slug: string
  normal_price: number
  offer_price: number
  duration_text: string
  deposit_amount: number
  includes: string[]
  temario: TemarioModule[]
  notes?: string
  active: boolean
  image_url?: string
  created_at: string
}

export interface Session {
  id: string
  course_id: string
  start_date: string
  end_date: string
  total_spots: number
  available_spots: number
  status: SessionStatus
  course?: Course
}

export interface Reservation {
  id: string
  session_id: string
  student_name: string
  phone: string
  email: string
  amount_paid: number
  payment_status: PaymentStatus
  mercadopago_payment_id?: string
  created_at: string
  session?: Session & { course?: Course }
}

export interface AdminUser {
  id: string
  email: string
  name: string
  password_hash: string
  created_at: string
}

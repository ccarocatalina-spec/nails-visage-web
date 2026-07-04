import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { MercadoPagoConfig, Payment } from 'mercadopago'

const mp = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! })

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { type, data } = body

    if (type !== 'payment') return NextResponse.json({ ok: true })

    const paymentApi = new Payment(mp)
    const payment = await paymentApi.get({ id: data.id })

    const reservationId = payment.external_reference
    const status = payment.status // 'approved' | 'rejected' | 'pending'

    if (!reservationId) return NextResponse.json({ ok: true })

    if (status === 'approved') {
      // Update reservation
      await supabaseAdmin
        .from('reservations')
        .update({
          payment_status: 'approved',
          mercadopago_payment_id: String(data.id),
        })
        .eq('id', reservationId)

      // Fetch reservation to get session_id
      const { data: reservation } = await supabaseAdmin
        .from('reservations')
        .select('session_id')
        .eq('id', reservationId)
        .single()

      if (reservation) {
        // Decrement available_spots
        await supabaseAdmin.rpc('decrement_spots', { session_id: reservation.session_id })
      }
    } else if (status === 'rejected') {
      await supabaseAdmin
        .from('reservations')
        .update({
          payment_status: 'rejected',
          mercadopago_payment_id: String(data.id),
        })
        .eq('id', reservationId)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('webhook error', err)
    return NextResponse.json({ error: 'internal error' }, { status: 500 })
  }
}

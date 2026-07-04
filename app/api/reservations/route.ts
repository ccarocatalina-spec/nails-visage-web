import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { MercadoPagoConfig, Preference } from 'mercadopago'

const mp = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! })

export async function POST(req: NextRequest) {
  try {
    const { session_id, name, phone, email } = await req.json()

    if (!session_id || !name || !phone || !email) {
      return NextResponse.json({ error: 'Faltan datos requeridos.' }, { status: 400 })
    }

    // Fetch session + course
    const { data: session, error: sessionError } = await supabaseAdmin
      .from('sessions')
      .select('*, courses(*)')
      .eq('id', session_id)
      .single()

    if (sessionError || !session) {
      return NextResponse.json({ error: 'Fecha no encontrada.' }, { status: 404 })
    }

    if (session.available_spots <= 0 || session.status !== 'open') {
      return NextResponse.json({ error: 'Lo sentimos, esa fecha ya no tiene cupos disponibles.' }, { status: 409 })
    }

    const course = session.courses as { name: string; deposit_amount: number }
    const depositAmount = course.deposit_amount

    // Create pending reservation
    const { data: reservation, error: resError } = await supabaseAdmin
      .from('reservations')
      .insert({
        session_id,
        student_name: name,
        phone,
        email,
        amount_paid: depositAmount,
        payment_status: 'pending',
      })
      .select()
      .single()

    if (resError || !reservation) {
      console.error('reservation insert error', resError)
      return NextResponse.json({ error: 'No se pudo crear la reserva.' }, { status: 500 })
    }

    // Create Mercado Pago preference
    const preference = new Preference(mp)
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const isLocal = siteUrl.includes('localhost')

    // Parse phone: remove country code prefix if present, keep last 9 digits
    const cleanPhone = phone.replace(/\D/g, '').slice(-9)

    const mpRes = await preference.create({
      body: {
        items: [
          {
            id: reservation.id,
            title: `Abono — ${course.name}`,
            description: `Reserva de cupo: ${course.name}`,
            quantity: 1,
            unit_price: depositAmount,
            currency_id: 'CLP',
          },
        ],
        payer: {
          name,
          email,
          phone: { area_code: '56', number: cleanPhone },
        },
        external_reference: reservation.id,
        // back_urls, auto_return y notification_url solo funcionan con URLs públicas
        ...(!isLocal && {
          back_urls: {
            success: `${siteUrl}/reserva/confirmada?id=${reservation.id}`,
            failure: `${siteUrl}/reserva/error?id=${reservation.id}`,
            pending: `${siteUrl}/reserva/pendiente?id=${reservation.id}`,
          },
          auto_return: 'approved',
          notification_url: `${siteUrl}/api/mercadopago/webhook`,
        }),
      },
    })

    if (!mpRes.init_point) {
      console.error('MP no devolvió init_point', mpRes)
      return NextResponse.json({ error: 'Error al crear el pago. Intenta de nuevo.' }, { status: 500 })
    }

    return NextResponse.json({ checkout_url: mpRes.init_point })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : JSON.stringify(err)
    console.error('reservation error:', msg)
    return NextResponse.json({ error: 'Error interno. Por favor intenta de nuevo.' }, { status: 500 })
  }
}

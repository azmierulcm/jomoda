'use server'

import { adminSupabase } from '@/lib/supabase/admin'

// ─── Types ────────────────────────────────────────────────────

export interface CheckoutItem {
  name: string
  price: number
  quantity: number
}

export interface CheckoutPayload {
  vendor_id: string
  customer_name: string
  customer_phone: string
  notes: string
  delivery_type: 'pickup' | 'delivery'
  delivery_address: string
  items: CheckoutItem[]
  total_price: number
}

export interface CheckoutResult {
  success: boolean
  short_order_id?: string
  total_price?: number
  error?: string
}

// ─── Helpers ──────────────────────────────────────────────────

/**
 * Generates a short, human-readable order ID like "ORD-A3F9".
 * Omits O/0 and I/1 to reduce misreading risk.
 */
function makeShortOrderId(): string {
  const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let suffix = ''
  for (let i = 0; i < 4; i++) {
    suffix += CHARS[Math.floor(Math.random() * CHARS.length)]
  }
  return `ORD-${suffix}`
}

/** True when the error is a PostgREST "column does not exist" error (code 42703). */
function isMissingColumnError(msg: string): boolean {
  return msg.includes('column') || msg.includes('42703') || msg.includes('does not exist')
}

// ─── Server Action ────────────────────────────────────────────

export async function checkoutToWhatsApp(
  payload: CheckoutPayload,
): Promise<CheckoutResult> {
  // Server-side validation
  if (!payload.customer_name?.trim()) {
    return { success: false, error: 'Name is required.' }
  }
  if (payload.delivery_type === 'delivery' && !payload.delivery_address?.trim()) {
    return { success: false, error: 'Delivery address is required.' }
  }
  if (!payload.items?.length) {
    return { success: false, error: 'Cart is empty.' }
  }
  if (payload.total_price <= 0) {
    return { success: false, error: 'Invalid order total.' }
  }

  const short_order_id = makeShortOrderId()

  // ── Attempt 1: full insert with all new columns ───────────
  const { data, error } = await adminSupabase
    .from('orders')
    .insert({
      vendor_id:        payload.vendor_id,
      short_order_id,
      customer_name:    payload.customer_name.trim(),
      customer_phone:   payload.customer_phone.trim() || null,
      cart_items:       payload.items,
      items:            payload.items,
      total_price:      payload.total_price,
      delivery_type:    payload.delivery_type,
      delivery_address: payload.delivery_type === 'delivery'
                          ? payload.delivery_address.trim()
                          : null,
      notes:            payload.notes.trim() || null,
      status:           'pending',
    })
    .select('short_order_id, total_price')
    .single()

  if (!error) {
    return {
      success:        true,
      short_order_id: data.short_order_id as string,
      total_price:    Number(data.total_price),
    }
  }

  console.error('[checkoutToWhatsApp] Full insert failed:', error.message)

  // ── Attempt 2: fallback to legacy columns only ────────────
  // Runs when the DB migration (orders-schema.sql) hasn't been applied yet.
  // The short_order_id is generated and returned even though it's not
  // persisted — the order is still saved and the WA message still carries it.
  if (isMissingColumnError(error.message)) {
    const deliveryNote = payload.delivery_type === 'delivery'
      ? `Delivery to: ${payload.delivery_address.trim()}.`
      : 'Self pickup.'

    const notesWithDelivery = [deliveryNote, payload.notes.trim()]
      .filter(Boolean)
      .join(' | ')

    const { error: fallbackError } = await adminSupabase
      .from('orders')
      .insert({
        vendor_id:      payload.vendor_id,
        customer_name:  payload.customer_name.trim(),
        customer_phone: payload.customer_phone.trim() || null,
        items:          payload.items,
        total_price:    payload.total_price,
        notes:          notesWithDelivery || null,
        status:         'pending',
      })

    if (fallbackError) {
      console.error('[checkoutToWhatsApp] Fallback insert failed:', fallbackError.message)
      return { success: false, error: fallbackError.message }
    }

    // Order saved via legacy schema — return the generated ID anyway
    return {
      success:        true,
      short_order_id,
      total_price:    payload.total_price,
    }
  }

  return { success: false, error: error.message }
}

'use server'

import { createClient } from '@/lib/supabase/server'
import { adminSupabase } from '@/lib/supabase/admin'

async function verifyAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.email !== process.env.ADMIN_EMAIL) throw new Error('Unauthorized')
}

export async function adminUpdateVendor(vendorId: string, payload: Record<string, unknown>) {
  await verifyAdmin()
  const { data, error } = await adminSupabase.from('vendors').update(payload).eq('id', vendorId).select().single()
  if (error) throw new Error(error.message)
  return data
}

export async function adminAddCategory(vendorId: string, name: string, sortOrder: number) {
  await verifyAdmin()
  const { data, error } = await adminSupabase
    .from('categories').insert({ vendor_id: vendorId, name, sort_order: sortOrder }).select().single()
  if (error) throw new Error(error.message)
  return data
}

export async function adminUpdateCategory(categoryId: string, name: string) {
  await verifyAdmin()
  const { error } = await adminSupabase.from('categories').update({ name }).eq('id', categoryId)
  if (error) throw new Error(error.message)
}

export async function adminDeleteCategory(categoryId: string) {
  await verifyAdmin()
  const { error } = await adminSupabase.from('categories').delete().eq('id', categoryId)
  if (error) throw new Error(error.message)
}

export async function adminUpsertItem(itemId: string | null, payload: Record<string, unknown>) {
  await verifyAdmin()
  if (itemId) {
    const { error } = await adminSupabase.from('items').update(payload).eq('id', itemId)
    if (error) throw new Error(error.message)
  } else {
    const { error } = await adminSupabase.from('items').insert(payload)
    if (error) throw new Error(error.message)
  }
}

export async function adminDeleteItem(itemId: string) {
  await verifyAdmin()
  const { error } = await adminSupabase.from('items').delete().eq('id', itemId)
  if (error) throw new Error(error.message)
}

export async function adminToggleItem(itemId: string, isAvailable: boolean) {
  await verifyAdmin()
  const { error } = await adminSupabase.from('items').update({ is_available: isAvailable }).eq('id', itemId)
  if (error) throw new Error(error.message)
}

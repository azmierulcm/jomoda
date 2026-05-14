'use server'

import { createClient } from '@/lib/supabase/server'
import { adminSupabase } from '@/lib/supabase/admin'

async function verifyAdmin(): Promise<string> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.email !== process.env.ADMIN_EMAIL) throw new Error('Unauthorized')
  return user.email!
}

export async function toggleVendorActive(vendorId: string, isActive: boolean) {
  await verifyAdmin()
  const { error } = await adminSupabase
    .from('vendors')
    .update({ is_active: isActive })
    .eq('id', vendorId)
  if (error) throw new Error(error.message)
}

export async function adminCreateListing(payload: {
  name: string
  slug: string
  business_type: 'restaurant' | 'retail' | 'booking'
  phone_number: string
  description: string
  customer_email: string
}): Promise<{ vendorId: string; inviteSent: boolean }> {
  const email = await verifyAdmin()
  console.log(`[admin] createListing name="${payload.name}" slug="${payload.slug}" by=${email}`)

  let userId: string | null = null
  let inviteSent = false

  if (payload.customer_email.trim()) {
    const { data, error } = await adminSupabase.auth.admin.inviteUserByEmail(
      payload.customer_email.trim(),
      { redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard` }
    )
    if (error) throw new Error(`Failed to invite customer: ${error.message}`)
    userId = data.user.id
    inviteSent = true
  }

  const { data: vendor, error: vendorError } = await adminSupabase
    .from('vendors')
    .insert({
      name:                payload.name.trim(),
      slug:                payload.slug.trim().toLowerCase().replace(/\s+/g, '-'),
      business_type:       payload.business_type,
      phone_number:        payload.phone_number.trim(),
      description:         payload.description.trim() || null,
      user_id:             userId,
      is_active:           false,
      subscription_status: 'active',
    })
    .select('id')
    .single()

  if (vendorError) throw new Error(vendorError.message)
  return { vendorId: vendor.id, inviteSent }
}

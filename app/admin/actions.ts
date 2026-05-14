'use server'

import { createClient } from '@/lib/supabase/server'
import { adminSupabase } from '@/lib/supabase/admin'

export async function toggleVendorActive(vendorId: string, isActive: boolean) {
  // Re-verify admin inside the action — proxy alone is not enough
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    throw new Error('Unauthorized')
  }

  const { error } = await adminSupabase
    .from('vendors')
    .update({ is_active: isActive })
    .eq('id', vendorId)

  if (error) throw new Error(error.message)
}

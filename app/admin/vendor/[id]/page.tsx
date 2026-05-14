import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { adminSupabase } from '@/lib/supabase/admin'
import type { Vendor, Category, Item } from '@/types/menu'
import AdminVendorEditor from './AdminVendorEditor'

export default async function AdminVendorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // Verify admin
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.email !== process.env.ADMIN_EMAIL) redirect('/admin')

  // Fetch vendor
  const { data: vendor, error } = await adminSupabase
    .from('vendors').select('*').eq('id', id).single()

  if (error || !vendor) redirect('/admin')

  // Fetch categories + items
  const { data: rawCats } = await adminSupabase
    .from('categories').select('*').eq('vendor_id', id).order('sort_order', { ascending: true })

  const categories = (rawCats ?? []) as Category[]
  const catIds = categories.map((c) => c.id)

  let items: Item[] = []
  if (catIds.length > 0) {
    const { data: rawItems } = await adminSupabase
      .from('items').select('*').in('category_id', catIds).order('sort_order', { ascending: true })
    items = (rawItems ?? []) as Item[]
  }

  return (
    <AdminVendorEditor
      vendor={vendor as Vendor}
      initialCategories={categories}
      initialItems={items}
    />
  )
}

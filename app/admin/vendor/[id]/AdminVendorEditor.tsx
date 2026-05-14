'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Vendor, Category, Item, BusinessType } from '@/types/menu'
import {
  adminUpdateVendor,
  adminAddCategory,
  adminUpdateCategory,
  adminDeleteCategory,
  adminUpsertItem,
  adminDeleteItem,
  adminToggleItem,
} from './actions'

interface Props {
  vendor: Vendor
  initialCategories: Category[]
  initialItems: Item[]
}

type Tab = 'profile' | 'menu'

export default function AdminVendorEditor({ vendor: initialVendor, initialCategories, initialItems }: Props) {
  const [vendor, setVendor]         = useState(initialVendor)
  const [categories, setCategories] = useState(initialCategories)
  const [items, setItems]           = useState(initialItems)
  const [tab, setTab]               = useState<Tab>('profile')

  const businessType: BusinessType = vendor.business_type ?? 'restaurant'

  const refreshCategories = async () => {
    // Re-fetch via reload — server actions already mutated the DB
    window.location.reload()
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Back link */}
      <a href="/admin" className="inline-flex items-center gap-1.5 text-sm text-fog hover:text-ink mb-6 transition-colors">
        ← Back to vendors
      </a>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-white font-bold text-sm shrink-0">
          {vendor.name[0].toUpperCase()}
        </div>
        <div>
          <h1 className="text-xl font-bold text-ink">{vendor.name}</h1>
          <p className="text-xs text-fog">/{vendor.slug} · {businessType}</p>
        </div>
        <a href={`/${vendor.slug}`} target="_blank" rel="noopener noreferrer"
          className="ml-auto text-xs font-semibold text-brand underline underline-offset-2 shrink-0">
          View live ↗
        </a>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border mb-8">
        {([
          { id: 'profile' as Tab, label: 'Profile & Gallery' },
          { id: 'menu'    as Tab, label: businessType === 'booking' ? 'Availability' : businessType === 'retail' ? 'Products' : 'Menu' },
        ]).map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`pb-3 px-1 mr-6 text-sm font-semibold transition-colors border-b-2 -mb-px whitespace-nowrap ${
              tab === t.id ? 'border-ink text-ink' : 'border-transparent text-fog hover:text-ink'
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'profile' && (
        <ProfileEditor vendor={vendor} onSaved={setVendor} />
      )}
      {tab === 'menu' && (
        <MenuEditor
          vendor={vendor}
          categories={categories}
          items={items}
          businessType={businessType}
          onChanged={refreshCategories}
          setCategories={setCategories}
          setItems={setItems}
        />
      )}
    </div>
  )
}

// ─── Profile Editor ───────────────────────────────────────────

function ProfileEditor({ vendor, onSaved }: { vendor: Vendor; onSaved: (v: Vendor) => void }) {
  const [name, setName]               = useState(vendor.name)
  const [slug, setSlug]               = useState(vendor.slug)
  const [phone, setPhone]             = useState(vendor.phone_number)
  const [description, setDescription] = useState(vendor.description ?? '')
  const [promoText, setPromoText]     = useState(vendor.promo_text ?? '')
  const [galleryUrls, setGalleryUrls] = useState<string[]>(vendor.gallery_urls ?? [])
  const [newGalleryUrl, setNewGalleryUrl] = useState('')
  const [saving, setSaving]           = useState(false)
  const [msg, setMsg]                 = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMsg(null)
    try {
      const data = await adminUpdateVendor(vendor.id, {
        name: name.trim(),
        slug: slug.trim().toLowerCase().replace(/\s+/g, '-'),
        phone_number: phone.trim(),
        description: description.trim() || null,
        promo_text: promoText.trim() || null,
        gallery_urls: galleryUrls,
      })
      onSaved(data as Vendor)
      setMsg({ type: 'success', text: 'Profile saved!' })
    } catch (err: unknown) {
      setMsg({ type: 'error', text: err instanceof Error ? err.message : 'Save failed' })
    }
    setSaving(false)
  }

  const addGalleryUrl = () => {
    const url = newGalleryUrl.trim()
    if (!url || galleryUrls.length >= 5) return
    setGalleryUrls([...galleryUrls, url])
    setNewGalleryUrl('')
  }

  const removeGalleryUrl = (i: number) => setGalleryUrls(galleryUrls.filter((_, idx) => idx !== i))

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-border p-6">
        <h2 className="text-base font-semibold text-ink mb-5">Business details</h2>
        <form onSubmit={handleSave} className="space-y-4">
          <Field label="Business Name" required>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
          </Field>
          <Field label="URL Slug" hint={<>Public link: <span className="font-semibold text-ink">jomoda.com/{slug}</span></>} required>
            <input type="text" required value={slug}
              onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
              className={inputCls} />
          </Field>
          <Field label="Phone Number" required>
            <input type="text" required value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} />
          </Field>
          <Field label="Description">
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3}
              className={`${inputCls} resize-none`} />
          </Field>
          <Field label="Promo / Announcement">
            <input type="text" value={promoText} onChange={(e) => setPromoText(e.target.value)} className={inputCls}
              placeholder="e.g. Free delivery over RM 50!" />
          </Field>

          {msg && (
            <p className={`text-sm rounded-xl px-4 py-2.5 ${msg.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-brand'}`}>
              {msg.text}
            </p>
          )}

          <button type="submit" disabled={saving} className={btnPrimary}>
            {saving ? 'Saving…' : 'Save changes'}
          </button>
        </form>
      </div>

      {/* Gallery */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <h2 className="text-base font-semibold text-ink mb-1">Gallery photos</h2>
        <p className="text-xs text-fog mb-5">Up to 5 photos. Paste an image URL to add.</p>

        <div className="flex flex-wrap gap-3 mb-4">
          {galleryUrls.map((url, i) => (
            <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden border border-border group">
              <img src={url} alt="" className="w-full h-full object-cover" />
              <button type="button" onClick={() => removeGalleryUrl(i)}
                className="absolute top-1 right-1 w-6 h-6 bg-white/90 rounded-full flex items-center justify-center text-brand text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                ×
              </button>
              <span className="absolute bottom-1 left-1 text-[10px] font-bold text-white bg-black/40 rounded px-1">{i + 1}</span>
            </div>
          ))}
          {galleryUrls.length === 0 && (
            <p className="text-sm text-fog">No gallery photos yet.</p>
          )}
        </div>

        {galleryUrls.length < 5 && (
          <div className="flex gap-2">
            <input type="url" value={newGalleryUrl} onChange={(e) => setNewGalleryUrl(e.target.value)}
              placeholder="https://images.unsplash.com/…" className={`${inputCls} flex-1 text-sm`}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addGalleryUrl() } }} />
            <button type="button" onClick={addGalleryUrl} disabled={!newGalleryUrl.trim()} className={btnSmall}>
              Add
            </button>
          </div>
        )}

        {galleryUrls.length > 0 && (
          <button type="button" onClick={handleSave}
            className="mt-4 text-sm font-semibold text-brand underline underline-offset-2">
            Save gallery changes
          </button>
        )}
        <p className="text-xs text-fog mt-2">{galleryUrls.length}/5 photos</p>
      </div>
    </div>
  )
}

// ─── Menu Editor ──────────────────────────────────────────────

function MenuEditor({ vendor, categories, items, businessType, onChanged, setCategories, setItems }: {
  vendor: Vendor
  categories: Category[]
  items: Item[]
  businessType: BusinessType
  onChanged: () => void
  setCategories: (c: Category[]) => void
  setItems: (i: Item[]) => void
}) {
  const isBooking = businessType === 'booking'
  const isRetail  = businessType === 'retail'
  const catLabel  = isBooking ? 'Service Type' : isRetail ? 'Product Category' : 'Category'
  const itemLabel = isBooking ? 'Service / Room' : isRetail ? 'Product' : 'Item'

  return (
    <div className="space-y-6">
      <CategoriesEditor vendor={vendor} categories={categories} catLabel={catLabel} onChanged={onChanged} setCategories={setCategories} />
      <ItemsEditor vendor={vendor} categories={categories} items={items} itemLabel={itemLabel} isBooking={isBooking} onChanged={onChanged} setItems={setItems} />
    </div>
  )
}

// ─── Categories Editor ────────────────────────────────────────

function CategoriesEditor({ vendor, categories, catLabel, onChanged, setCategories }: {
  vendor: Vendor
  categories: Category[]
  catLabel: string
  onChanged: () => void
  setCategories: (c: Category[]) => void
}) {
  const [newName, setNewName]     = useState('')
  const [adding, setAdding]       = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName]   = useState('')
  const [busy, setBusy]           = useState(false)

  const doAdd = async () => {
    if (!newName.trim()) return
    setBusy(true)
    try {
      await adminAddCategory(vendor.id, newName.trim(), categories.length)
      setNewName('')
      setAdding(false)
      onChanged()
    } finally { setBusy(false) }
  }

  const doEdit = async (id: string) => {
    if (!editName.trim()) return
    setBusy(true)
    try {
      await adminUpdateCategory(id, editName.trim())
      setCategories(categories.map((c) => c.id === id ? { ...c, name: editName.trim() } : c))
      setEditingId(null)
    } finally { setBusy(false) }
  }

  const doDelete = async (id: string) => {
    if (!confirm(`Delete this ${catLabel.toLowerCase()} and all its items?`)) return
    setBusy(true)
    try {
      await adminDeleteCategory(id)
      onChanged()
    } finally { setBusy(false) }
  }

  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <h2 className="text-base font-semibold text-ink">{catLabel}s</h2>
        <button onClick={() => setAdding(true)} className={btnSmall}>+ Add</button>
      </div>

      {categories.length === 0 && !adding && (
        <p className="text-sm text-fog text-center py-12">No {catLabel.toLowerCase()}s yet.</p>
      )}

      <ul className="divide-y divide-surface">
        {categories.map((cat) =>
          editingId === cat.id ? (
            <li key={cat.id} className="px-6 py-4 space-y-3 bg-surface">
              <input type="text" autoFocus value={editName} onChange={(e) => setEditName(e.target.value)}
                className={inputCls}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); doEdit(cat.id) } }} />
              <div className="flex gap-3">
                <button onClick={() => doEdit(cat.id)} disabled={busy} className={btnSmall}>Save</button>
                <button onClick={() => setEditingId(null)} className={btnGhost}>Cancel</button>
              </div>
            </li>
          ) : (
            <li key={cat.id} className="flex items-center justify-between px-6 py-4">
              <span className="text-sm font-medium text-ink">{cat.name}</span>
              <div className="flex gap-4">
                <button onClick={() => { setEditingId(cat.id); setEditName(cat.name) }}
                  className="text-sm font-semibold text-ink underline underline-offset-2">Edit</button>
                <button onClick={() => doDelete(cat.id)}
                  className="text-sm font-semibold text-brand underline underline-offset-2">Delete</button>
              </div>
            </li>
          )
        )}
      </ul>

      {adding && (
        <div className="px-6 py-4 border-t border-border bg-surface space-y-3">
          <input type="text" autoFocus value={newName} onChange={(e) => setNewName(e.target.value)}
            placeholder={`${catLabel} name`} className={inputCls}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); doAdd() } }} />
          <div className="flex gap-3">
            <button onClick={doAdd} disabled={busy || !newName.trim()} className={btnSmall}>{busy ? '…' : 'Add'}</button>
            <button onClick={() => { setAdding(false); setNewName('') }} className={btnGhost}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Items Editor ─────────────────────────────────────────────

const EMPTY = { name: '', description: '', price: '', image_url: '', category_id: '', is_available: true, sort_order: 0 }

function ItemsEditor({ vendor, categories, items, itemLabel, isBooking, onChanged, setItems }: {
  vendor: Vendor
  categories: Category[]
  items: Item[]
  itemLabel: string
  isBooking: boolean
  onChanged: () => void
  setItems: (i: Item[]) => void
}) {
  const [showForm, setShowForm]       = useState(false)
  const [form, setForm]               = useState({ ...EMPTY, category_id: categories[0]?.id ?? '' })
  const [editingItem, setEditingItem] = useState<Item | null>(null)
  const [busy, setBusy]               = useState(false)

  const resetForm = () => { setShowForm(false); setEditingItem(null); setForm({ ...EMPTY, category_id: categories[0]?.id ?? '' }) }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    try {
      const payload = {
        category_id: form.category_id,
        name: form.name.trim(),
        description: form.description.trim() || null,
        price: parseFloat(form.price),
        image_url: form.image_url.trim() || null,
        is_available: form.is_available,
        sort_order: form.sort_order,
      }
      await adminUpsertItem(editingItem?.id ?? null, payload)
      onChanged()
      resetForm()
    } finally { setBusy(false) }
  }

  const startEdit = (item: Item) => {
    setEditingItem(item)
    setForm({ name: item.name, description: item.description ?? '', price: item.price.toString(),
      image_url: item.image_url ?? '', category_id: item.category_id,
      is_available: item.is_available, sort_order: item.sort_order })
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const doDelete = async (id: string) => {
    if (!confirm(`Delete this ${itemLabel.toLowerCase()}?`)) return
    setBusy(true)
    try {
      await adminDeleteItem(id)
      setItems(items.filter((i) => i.id !== id))
    } finally { setBusy(false) }
  }

  const doToggle = async (item: Item) => {
    await adminToggleItem(item.id, !item.is_available)
    setItems(items.map((i) => i.id === item.id ? { ...i, is_available: !item.is_available } : i))
  }

  const catName = (id: string) => categories.find((c) => c.id === id)?.name ?? '—'

  if (categories.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-border p-12 text-center text-fog text-sm">
        Add a category first before adding {itemLabel.toLowerCase()}s.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {showForm && (
        <div className="bg-white rounded-2xl border border-border p-6">
          <h2 className="text-base font-semibold text-ink mb-5">
            {editingItem ? `Edit ${itemLabel}` : `New ${itemLabel}`}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Name" required>
                <input type="text" required value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
              </Field>
              <Field label={isBooking ? 'Price / night (RM)' : 'Price (RM)'} required>
                <input type="number" required step="0.01" min="0" value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })} className={inputCls} />
              </Field>
            </div>
            <Field label="Description">
              <input type="text" value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Optional" className={inputCls} />
            </Field>
            <Field label="Category" required>
              <select required value={form.category_id}
                onChange={(e) => setForm({ ...form, category_id: e.target.value })} className={inputCls}>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </Field>
            <Field label="Image URL">
              <input type="url" value={form.image_url}
                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                placeholder="https://…" className={inputCls} />
              {form.image_url && (
                <div className="mt-2 w-20 h-20 rounded-xl overflow-hidden border border-border">
                  <img src={form.image_url} alt="" className="w-full h-full object-cover" />
                </div>
              )}
            </Field>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" checked={form.is_available}
                onChange={(e) => setForm({ ...form, is_available: e.target.checked })}
                className="w-4 h-4 rounded accent-brand" />
              <span className="text-sm font-medium text-ink">
                {isBooking ? 'Available to book' : 'Available for order'}
              </span>
            </label>
            <div className="flex gap-4 pt-1">
              <button type="submit" disabled={busy} className={btnPrimary}>
                {busy ? 'Saving…' : editingItem ? 'Save changes' : `Add ${itemLabel}`}
              </button>
              <button type="button" onClick={resetForm} className={btnGhost}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-base font-semibold text-ink">{itemLabel}s ({items.length})</h2>
          {!showForm && (
            <button onClick={() => setShowForm(true)} className={btnSmall}>+ Add {itemLabel}</button>
          )}
        </div>
        {items.length === 0 && (
          <p className="text-sm text-fog text-center py-12">No {itemLabel.toLowerCase()}s yet.</p>
        )}
        <ul className="divide-y divide-surface">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-4 px-6 py-4">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-surface shrink-0 border border-border">
                {item.image_url
                  ? <Image src={item.image_url} alt={item.name} width={48} height={48} className="object-cover w-full h-full" />
                  : <div className="w-full h-full flex items-center justify-center text-xl">{isBooking ? '🏡' : '🍽️'}</div>
                }
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-ink truncate">{item.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-fog">{catName(item.category_id)}</span>
                  <span className="text-xs text-fog">·</span>
                  <span className="text-xs font-bold text-ink">RM {item.price.toFixed(2)}{isBooking ? '/night' : ''}</span>
                </div>
              </div>
              <button onClick={() => doToggle(item)}
                className={`text-xs font-semibold px-3 py-1 rounded-full border transition-colors shrink-0 ${
                  item.is_available ? 'bg-green-50 text-green-700 border-green-200' : 'bg-surface text-fog border-border'
                }`}>
                {item.is_available ? 'Available' : 'Sold out'}
              </button>
              <div className="flex gap-4 shrink-0">
                <button onClick={() => startEdit(item)}
                  className="text-sm font-semibold text-ink underline underline-offset-2">Edit</button>
                <button onClick={() => doDelete(item.id)}
                  className="text-sm font-semibold text-brand underline underline-offset-2">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// ─── Shared helpers ───────────────────────────────────────────

function Field({ label, hint, required, children }: {
  label: string; hint?: React.ReactNode; required?: boolean; children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-ink mb-1.5 uppercase tracking-wide">
        {label}{required && <span className="text-brand ml-0.5">*</span>}
      </label>
      {hint && <p className="text-xs text-fog mb-1.5">{hint}</p>}
      {children}
    </div>
  )
}

const inputCls = 'w-full border border-border rounded-xl px-4 py-3 text-sm text-ink placeholder:text-fog focus:outline-none focus:ring-2 focus:ring-ink focus:border-transparent transition bg-white'
const btnPrimary = 'bg-gradient-to-r from-brand-dark to-brand text-white font-semibold rounded-xl px-5 py-2.5 text-sm hover:opacity-90 disabled:opacity-60 transition-opacity'
const btnSmall   = 'bg-ink text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:opacity-80 transition-opacity disabled:opacity-50'
const btnGhost   = 'text-sm font-semibold text-fog hover:text-ink underline underline-offset-2 transition-colors'

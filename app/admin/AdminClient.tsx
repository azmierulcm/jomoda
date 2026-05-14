'use client'

import { useState } from 'react'
import { toggleVendorActive } from './actions'
import type { VendorStat } from './page'

// ── Helpers ───────────────────────────────────────────────────

function daysRemaining(trialEndsAt: string | null): number | null {
  if (!trialEndsAt) return null
  const diff = new Date(trialEndsAt).getTime() - Date.now()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

function TrialBadge({ vendor }: { vendor: VendorStat }) {
  const status = vendor.subscription_status

  if (status === 'active') {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
        ★ Subscribed
      </span>
    )
  }

  if (status === 'expired') {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-red-50 text-brand border border-red-200">
        Trial ended
      </span>
    )
  }

  // Trial in progress
  const days = daysRemaining(vendor.trial_ends_at)
  if (days === null) return null

  if (days <= 0) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-red-50 text-brand border border-red-200">
        Trial ended
      </span>
    )
  }

  const urgent = days <= 5
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border ${
      urgent
        ? 'bg-amber-50 text-amber-700 border-amber-200'
        : 'bg-surface text-fog border-border'
    }`}>
      {days}d left
    </span>
  )
}

// ── Toggle switch ─────────────────────────────────────────────

function ToggleSwitch({
  checked,
  disabled,
  onChange,
}: {
  checked: boolean
  disabled: boolean
  onChange: () => void
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed ${
        checked ? 'bg-brand' : 'bg-border'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-200 ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  )
}

// ── Main component ────────────────────────────────────────────

export default function AdminClient({ vendors: initial }: { vendors: VendorStat[] }) {
  const [vendors, setVendors] = useState<VendorStat[]>(initial)
  const [busy, setBusy] = useState<string | null>(null)

  const handleToggle = async (vendor: VendorStat) => {
    setBusy(vendor.id)
    const next = !vendor.is_active

    // Optimistic update
    setVendors((prev) =>
      prev.map((v) => (v.id === vendor.id ? { ...v, is_active: next } : v))
    )
    try {
      await toggleVendorActive(vendor.id, next)
    } catch {
      // Revert on error
      setVendors((prev) =>
        prev.map((v) => (v.id === vendor.id ? { ...v, is_active: vendor.is_active } : v))
      )
    } finally {
      setBusy(null)
    }
  }

  if (vendors.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-border p-12 text-center text-fog text-sm">
        No vendors registered yet.
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-surface">
            <th className="px-6 py-3.5 text-left text-xs font-semibold text-fog uppercase tracking-widest">
              Vendor
            </th>
            <th className="px-6 py-3.5 text-left text-xs font-semibold text-fog uppercase tracking-widest hidden sm:table-cell">
              Menu URL
            </th>
            <th className="px-6 py-3.5 text-center text-xs font-semibold text-fog uppercase tracking-widest hidden md:table-cell">
              Trial / Plan
            </th>
            <th className="px-6 py-3.5 text-center text-xs font-semibold text-fog uppercase tracking-widest">
              Items
            </th>
            <th className="px-6 py-3.5 text-center text-xs font-semibold text-fog uppercase tracking-widest">
              Published
            </th>
            <th className="px-6 py-3.5 text-right text-xs font-semibold text-fog uppercase tracking-widest">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-surface">
          {vendors.map((vendor) => (
            <tr key={vendor.id} className="hover:bg-surface/60 transition-colors">
              {/* Name + phone */}
              <td className="px-6 py-4">
                <p className="font-semibold text-ink">{vendor.name}</p>
                <p className="text-xs text-fog mt-0.5">{vendor.phone_number}</p>
              </td>

              {/* Slug link */}
              <td className="px-6 py-4 hidden sm:table-cell">
                <a
                  href={`/${vendor.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand font-medium underline underline-offset-2"
                >
                  /{vendor.slug}
                </a>
              </td>

              {/* Trial / subscription badge */}
              <td className="px-6 py-4 text-center hidden md:table-cell">
                <TrialBadge vendor={vendor} />
              </td>

              {/* Item count */}
              <td className="px-6 py-4 text-center">
                <span className="font-semibold text-ink">{vendor.item_count}</span>
              </td>

              {/* Published toggle */}
              <td className="px-6 py-4 text-center">
                <div className="flex flex-col items-center gap-1">
                  <ToggleSwitch
                    checked={vendor.is_active}
                    disabled={busy === vendor.id}
                    onChange={() => handleToggle(vendor)}
                  />
                  <span className={`text-xs font-semibold ${vendor.is_active ? 'text-green-600' : 'text-fog'}`}>
                    {busy === vendor.id ? '…' : vendor.is_active ? 'Live' : 'Hidden'}
                  </span>
                </div>
              </td>

              {/* Edit link */}
              <td className="px-6 py-4 text-right">
                <a
                  href={`/admin/vendor/${vendor.id}`}
                  className="text-sm font-semibold text-ink underline underline-offset-2 hover:text-fog transition-colors"
                >
                  Edit listing
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

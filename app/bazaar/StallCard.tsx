import Link from 'next/link'
import Image from 'next/image'

export type BazaarVendor = {
  id: string
  name: string
  slug: string
  business_type: string | null
  logo_url: string | null
  description: string | null
  is_featured: boolean
  gallery_urls: string[] | null
}

export const CATEGORY_CONFIG: Record<string, { label: string; emoji: string; bg: string; text: string; border: string }> = {
  restaurant: { label: 'F&B',      emoji: '🍽️', bg: 'bg-orange-50',  text: 'text-orange-700', border: 'border-orange-200' },
  retail:     { label: 'Retail',   emoji: '🛍️', bg: 'bg-violet-50',  text: 'text-violet-700', border: 'border-violet-200' },
  booking:    { label: 'Services', emoji: '🏡', bg: 'bg-sky-50',     text: 'text-sky-700',    border: 'border-sky-200'    },
}

const FALLBACK = { label: 'Business', emoji: '🏪', bg: 'bg-surface', text: 'text-fog', border: 'border-border' }

export default function StallCard({ vendor }: { vendor: BazaarVendor }) {
  const cat   = CATEGORY_CONFIG[vendor.business_type ?? ''] ?? FALLBACK
  const hero  = vendor.gallery_urls?.[0] ?? null

  return (
    <Link
      href={`/${vendor.slug}`}
      className="group relative flex flex-col bg-white rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
    >
      {/* Featured ribbon */}
      {vendor.is_featured && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-brand text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
          ⭐ Featured
        </div>
      )}

      {/* Hero image / placeholder */}
      <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-surface to-border overflow-hidden shrink-0">
        {hero ? (
          <Image
            src={hero}
            alt={vendor.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl font-black text-border select-none">
              {vendor.name[0]?.toUpperCase()}
            </span>
          </div>
        )}
        {/* Gradient overlay so logo is always readable */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-4 gap-3">

        {/* Logo + name row */}
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-xl border border-border bg-white shadow-sm shrink-0 overflow-hidden">
            {vendor.logo_url ? (
              <Image
                src={vendor.logo_url}
                alt={`${vendor.name} logo`}
                fill
                sizes="44px"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-brand text-white font-bold text-sm">
                {vendor.name[0]?.toUpperCase()}
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-bold text-ink text-sm leading-snug line-clamp-1 group-hover:text-brand transition-colors">
              {vendor.name}
            </p>
            {/* Category badge */}
            <span className={`inline-flex items-center gap-1 text-[10px] font-semibold mt-0.5 px-2 py-0.5 rounded-full border ${cat.bg} ${cat.text} ${cat.border}`}>
              <span>{cat.emoji}</span> {cat.label}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-fog leading-relaxed line-clamp-2 flex-1">
          {vendor.description ?? 'Visit this shop to explore their offerings.'}
        </p>

        {/* CTA */}
        <div className="flex items-center justify-between pt-1 border-t border-border mt-auto">
          <span className="text-xs text-fog">via WhatsApp</span>
          <span className="text-xs font-bold text-brand group-hover:underline underline-offset-2">
            Visit Shop →
          </span>
        </div>
      </div>
    </Link>
  )
}

// ─── Skeleton card (used in loading.tsx) ─────────────────────

export function StallCardSkeleton() {
  return (
    <div className="flex flex-col bg-white rounded-2xl border border-border overflow-hidden animate-pulse">
      <div className="w-full aspect-[16/9] bg-surface" />
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-surface shrink-0" />
          <div className="flex-1 space-y-1.5">
            <div className="h-3.5 bg-surface rounded-full w-3/4" />
            <div className="h-2.5 bg-surface rounded-full w-1/3" />
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="h-2.5 bg-surface rounded-full w-full" />
          <div className="h-2.5 bg-surface rounded-full w-5/6" />
        </div>
        <div className="flex justify-between pt-1 border-t border-border">
          <div className="h-2.5 bg-surface rounded-full w-16" />
          <div className="h-2.5 bg-surface rounded-full w-16" />
        </div>
      </div>
    </div>
  )
}

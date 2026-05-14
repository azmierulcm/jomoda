import { StallCardSkeleton } from './StallCard'

export default function BazaarLoading() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Hero skeleton */}
      <div className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] py-24">
        <div className="max-w-5xl mx-auto px-6 flex flex-col items-center gap-5 animate-pulse">
          <div className="h-5 w-40 bg-white/10 rounded-full" />
          <div className="h-12 w-3/4 bg-white/10 rounded-2xl" />
          <div className="h-6 w-1/2 bg-white/10 rounded-xl" />
          <div className="h-12 w-full max-w-md bg-white/10 rounded-xl" />
        </div>
      </div>

      {/* Filter bar skeleton */}
      <div className="bg-white border-b border-border py-3 px-4">
        <div className="max-w-6xl mx-auto flex gap-3 animate-pulse">
          {[100, 80, 90, 95].map((w, i) => (
            <div key={i} className="h-9 bg-surface rounded-full shrink-0" style={{ width: w }} />
          ))}
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <StallCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

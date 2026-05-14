'use client'

const comparisons = [
  {
    left: {
      icon: '😩',
      title: 'The Old Way',
      badge: 'Painful',
      badgeCls: 'text-red-500 bg-red-50',
      borderCls: 'border-red-100',
      content: (
        <div className="bg-[#ECE5DD] rounded-xl p-3 space-y-2 font-[system-ui] text-[12px]">
          {[
            { from: 'customer', text: 'Hye kak, ada ke nasi lemak?' },
            { from: 'vendor',   text: 'Ada! RM8 satu' },
            { from: 'customer', text: 'Nak 2 please, and 1 teh tarik' },
            { from: 'vendor',   text: 'Total RM23, transfer dulu ya' },
            { from: 'customer', text: 'transfer mana?' },
          ].map((b, i) => (
            <div key={i} className={`flex ${b.from === 'vendor' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] px-2.5 py-1.5 rounded-xl shadow-sm text-gray-800 text-[11px] ${b.from === 'vendor' ? 'bg-[#DCF8C6] rounded-tr-sm' : 'bg-white rounded-tl-sm'}`}>
                {b.text}
              </div>
            </div>
          ))}
          <p className="text-center text-[10px] text-gray-400">… 47 more messages today</p>
        </div>
      ),
      bullets: ['Manually calculating every order', 'Sharing bank details over and over', 'No record of transactions'],
      bulletIcon: '✕',
      bulletCls: 'text-red-400',
    },
    right: {
      icon: '✨',
      title: 'The New Way',
      badge: 'With Jomoda',
      badgeCls: 'text-green-700 bg-green-50',
      borderCls: 'border-green-100',
      content: (
        <div className="bg-[#ECE5DD] rounded-xl p-3 font-[system-ui] text-[12px]">
          <div className="bg-white rounded-xl p-3 shadow-sm space-y-1.5 max-w-[90%]">
            <p className="font-bold text-[#128C7E] text-[11px]">New Order — Ahmad Razif</p>
            <p className="text-gray-500 text-[10px]">📞 60123456789</p>
            <div className="border-t border-gray-100 pt-1.5 space-y-0.5 text-[11px]">
              <p>2× Nasi Lemak — RM16.00</p>
              <p>2× Teh Tarik — RM7.00</p>
            </div>
            <div className="border-t border-gray-100 pt-1.5 flex justify-between font-bold text-[11px]">
              <span>Total</span><span>RM23.00</span>
            </div>
          </div>
          <p className="text-[10px] text-gray-400 mt-1.5 ml-1">10:42 AM ✓✓</p>
        </div>
      ),
      bullets: ['Orders arrive itemised & totalled', 'Full order history in dashboard', 'Works on any phone, no app needed'],
      bulletIcon: '✓',
      bulletCls: 'text-green-500',
    },
  },
  {
    left: {
      icon: '😤',
      title: 'The 30% Tax',
      badge: 'Delivery Apps',
      badgeCls: 'text-red-500 bg-red-50',
      borderCls: 'border-red-100',
      content: (
        <div className="bg-red-50 rounded-xl p-4 flex flex-col items-center gap-2">
          <div className="relative w-24 h-24">
            <div className="w-24 h-24 rounded-full bg-amber-300 border-4 border-amber-400 flex items-center justify-center text-4xl shadow-inner">🍕</div>
            <div className="absolute top-0 right-0 w-12 h-12 rounded-tr-full bg-red-100 border-2 border-dashed border-red-300 flex items-end justify-start p-1">
              <span className="text-[9px] font-black text-red-500 leading-none">30%</span>
            </div>
          </div>
          <p className="text-[11px] font-bold text-red-500 text-center">Every 3rd order goes to the platform,<br/>not your pocket.</p>
        </div>
      ),
      bullets: ['Up to 30% cut per order', 'Less profit the more you sell', 'You work, they earn'],
      bulletIcon: '✕',
      bulletCls: 'text-red-400',
    },
    right: {
      icon: '🤑',
      title: 'Your Full Plate',
      badge: 'With Jomoda',
      badgeCls: 'text-green-700 bg-green-50',
      borderCls: 'border-green-100',
      content: (
        <div className="bg-green-50 rounded-xl p-4 flex flex-col items-center gap-2">
          <div className="w-24 h-24 rounded-full bg-amber-300 border-4 border-amber-400 flex items-center justify-center text-4xl shadow-inner">🍕</div>
          <p className="text-[11px] font-bold text-green-600 text-center">100% of every order<br/>lands in your pocket.</p>
        </div>
      ),
      bullets: ['RM 150 flat, no matter how much you sell', '0% commission always', '100% profit stays with you'],
      bulletIcon: '✓',
      bulletCls: 'text-green-500',
    },
  },
  {
    left: {
      icon: '😵',
      title: 'The Gallery Graveyard',
      badge: 'Painful',
      badgeCls: 'text-red-500 bg-red-50',
      borderCls: 'border-red-100',
      content: (
        <div className="bg-gray-900 rounded-xl p-2.5 space-y-1.5">
          <p className="text-[9px] text-gray-400 font-semibold px-1">📱 Gallery · 847 items</p>
          <div className="grid grid-cols-3 gap-1">
            {[
              { bg: 'bg-blue-200', label: 'Done bang ✓', sub: 'Transfer RM23' },
              { bg: 'bg-green-200', label: 'Resit', sub: 'Maybank' },
              { bg: 'bg-yellow-100', label: 'Bukti', sub: 'RM47.50' },
              { bg: 'bg-pink-100', label: '??', sub: 'blurry' },
              { bg: 'bg-blue-100', label: 'Transfer', sub: 'RM15' },
              { bg: 'bg-gray-200', label: 'Resit lagi', sub: 'RHB' },
            ].map((item, i) => (
              <div key={i} className={`${item.bg} rounded-md p-1 aspect-square flex flex-col justify-end`}>
                <p className="text-[7px] font-bold text-gray-700 leading-tight truncate">{item.label}</p>
                <p className="text-[6px] text-gray-500 truncate">{item.sub}</p>
              </div>
            ))}
          </div>
          <p className="text-[8px] text-gray-500 text-center italic">"Which one was from Farah again...?"</p>
        </div>
      ),
      bullets: ['Blurry screenshots as receipts', 'No idea who paid or how much', '"Is this your accounting system?"'],
      bulletIcon: '✕',
      bulletCls: 'text-red-400',
    },
    right: {
      icon: '📊',
      title: 'The Jomoda Dashboard',
      badge: 'With Jomoda',
      badgeCls: 'text-green-700 bg-green-50',
      borderCls: 'border-green-100',
      content: (
        <div className="bg-surface rounded-xl p-2.5 space-y-1.5">
          <p className="text-[9px] text-fog font-semibold px-1 pb-1 border-b border-border">Today&apos;s Orders · 14 total</p>
          {[
            { name: 'Ahmad Razif', items: '2× Nasi Lemak', total: 'RM 16.00', status: 'Paid' },
            { name: 'Siti Norehan', items: '1× Roti Canai, 2× Teh Tarik', total: 'RM 9.00', status: 'Paid' },
            { name: 'Haziq', items: '3× Mee Goreng', total: 'RM 24.00', status: 'New' },
          ].map((o, i) => (
            <div key={i} className="bg-white rounded-lg px-2.5 py-1.5 flex items-center gap-2 shadow-sm">
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-ink truncate">{o.name}</p>
                <p className="text-[9px] text-fog truncate">{o.items}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[10px] font-bold text-ink">{o.total}</p>
                <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${o.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-brand/10 text-brand'}`}>{o.status}</span>
              </div>
            </div>
          ))}
        </div>
      ),
      bullets: ['Every order tracked automatically', 'Green "Paid" badges, zero confusion', 'Professional tracking. Zero guesswork.'],
      bulletIcon: '✓',
      bulletCls: 'text-green-500',
    },
  },
  {
    left: {
      icon: '😬',
      title: 'The Amateur Look',
      badge: 'High Friction',
      badgeCls: 'text-red-500 bg-red-50',
      borderCls: 'border-red-100',
      content: (
        <div className="bg-white border border-border rounded-xl p-3 space-y-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-orange-300 shrink-0" />
            <div>
              <p className="font-bold text-ink text-[11px]">@sitikhana_homemade</p>
              <p className="text-[10px] text-fog">Food · Home Business</p>
            </div>
          </div>
          <div className="text-[11px] text-ink space-y-0.5 leading-relaxed">
            <p>🍱 Homemade food, order online!</p>
            <p className="text-fog">DM to order or WhatsApp</p>
            <p className="font-semibold">012-XXXXXXX</p>
          </div>
          <div className="bg-gray-100 rounded-lg px-3 py-1.5 text-center">
            <p className="text-[10px] text-gray-400 italic">No link. Just a phone number.</p>
          </div>
        </div>
      ),
      bullets: ['DM just to see a price', 'Most customers scroll past', 'Looks unserious'],
      bulletIcon: '✕',
      bulletCls: 'text-red-400',
    },
    right: {
      icon: '🔥',
      title: 'The Pro Look',
      badge: 'With Jomoda',
      badgeCls: 'text-green-700 bg-green-50',
      borderCls: 'border-green-100',
      content: (
        <div className="bg-ink rounded-xl p-3 flex justify-center">
          <div className="w-32 bg-white rounded-2xl overflow-hidden shadow-xl border-4 border-gray-700">
            <div className="h-14 bg-gradient-to-r from-amber-400 to-orange-400 flex items-end p-1.5">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-white shadow flex items-center justify-center text-base">🍱</div>
            </div>
            <div className="p-2 space-y-1.5">
              <p className="font-bold text-ink text-[10px]">Siti&apos;s Kitchen</p>
              <div className="bg-surface rounded-md p-1.5 space-y-1">
                {[{ e: '🍱', n: 'Nasi Lemak', p: 'RM 8.00' }, { e: '🥘', n: 'Ayam Masak Merah', p: 'RM 12.00' }].map((item, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <div className="w-5 h-5 rounded bg-amber-100 text-[9px] flex items-center justify-center">{item.e}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[8px] font-semibold text-ink truncate">{item.n}</p>
                      <p className="text-[7px] text-fog">{item.p}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-brand rounded-md py-1 text-center">
                <p className="text-[8px] font-bold text-white">Order Now →</p>
              </div>
            </div>
          </div>
        </div>
      ),
      bullets: ['Instant storefront link for bio', 'Browse, tap, order — no DMs needed', 'From side-hustle to brand in 5 min'],
      bulletIcon: '✓',
      bulletCls: 'text-green-500',
    },
  },
]

function ComparisonCard({ side }: { side: typeof comparisons[0]['left'] }) {
  return (
    <div className={`bg-white rounded-2xl border-2 ${side.borderCls} p-4 flex flex-col gap-3 w-64 shrink-0`}>
      <div className="flex items-center gap-2">
        <span className="text-lg">{side.icon}</span>
        <h3 className="font-bold text-ink text-sm">{side.title}</h3>
        <span className={`ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${side.badgeCls}`}>{side.badge}</span>
      </div>
      <div className="flex-1">{side.content}</div>
      <ul className="space-y-1">
        {side.bullets.map((b) => (
          <li key={b} className="flex items-start gap-1.5 text-xs text-fog">
            <span className={`${side.bulletCls} mt-0.5 shrink-0 text-[10px]`}>{side.bulletIcon}</span>
            {b}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ComparisonSlider() {
  const pairs = [...comparisons, ...comparisons]

  return (
    <div className="overflow-hidden">
      <div className="flex gap-4 animate-marquee" style={{ width: 'max-content' }}>
        {pairs.map((pair, i) => (
          <div key={i} className="flex gap-3 items-stretch">
            <ComparisonCard side={pair.left} />
            <div className="flex items-center shrink-0">
              <div className="w-7 h-7 rounded-full bg-surface border border-border flex items-center justify-center text-sm font-bold text-fog">→</div>
            </div>
            <ComparisonCard side={pair.right} />
          </div>
        ))}
      </div>
    </div>
  )
}

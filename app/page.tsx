import Link from 'next/link'
import AnimatedPlatform from './components/AnimatedPlatform'
import DemoPickerButton from './components/DemoPickerButton'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-ink">

      {/* ── Nav ─────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <span className="text-xl font-bold text-brand tracking-tight">jomoda</span>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-semibold text-fog hover:text-ink transition-colors hidden sm:block">
              Sign in
            </Link>
            <Link href="/register" className="text-sm font-semibold bg-gradient-to-r from-brand-dark to-brand text-white px-4 py-2 rounded-xl hover:opacity-90 transition-opacity">
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-5 pt-16 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-brand/8 border border-brand/20 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
          Zero commission · No app required · Ready in 5 minutes
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-ink leading-[1.12] tracking-tight max-w-3xl mx-auto">
          100% of the profits.
          <span className="block text-brand">No middleman.</span>
        </h1>

        <p className="mt-7 text-base sm:text-lg text-fog max-w-2xl mx-auto leading-relaxed">
          Ditch the chaotic WhatsApp orders and{' '}
          <AnimatedPlatform />.{' '}
          Get a professional, automated storefront for a flat{' '}
          <span className="font-semibold text-ink">RM 150/month.</span>{' '}
          Keep every cent you earn.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/register"
            className="w-full sm:w-auto bg-gradient-to-r from-brand-dark to-brand text-white font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity text-base shadow-lg shadow-brand/25">
            Create Your Store →
          </Link>
          <DemoPickerButton />
        </div>

        <p className="mt-5 text-xs text-fog">No credit card required. Setup takes under 5 minutes.</p>
      </section>

      {/* ── Before & After ───────────────────────────────────── */}
      <section className="bg-surface py-20">
        <div className="max-w-6xl mx-auto px-5">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-fog mb-3">The difference</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-ink text-center mb-12">
            From chaos to clarity
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Old Way */}
            <div className="bg-white rounded-2xl border-2 border-red-100 p-6 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">😩</span>
                <h3 className="font-bold text-ink text-lg">The Old Way</h3>
                <span className="ml-auto text-xs font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">Painful</span>
              </div>

              {/* Fake WhatsApp chat */}
              <div className="bg-[#ECE5DD] rounded-xl p-4 space-y-2.5 font-[system-ui] text-[13px]">
                <ChatBubble from="customer" text="Hye kak, ada ke nasi lemak?" />
                <ChatBubble from="vendor" text="Ada! RM8 satu" />
                <ChatBubble from="customer" text="Nak 2 please, and 1 teh tarik" />
                <ChatBubble from="vendor" text="Teh tarik RM3.50 ea. Total RM19.50" />
                <ChatBubble from="customer" text="Eh sorry teh tarik 2 lah" />
                <ChatBubble from="vendor" text="Ok total RM23, transfer dulu ya" />
                <ChatBubble from="customer" text="transfer mana?" />
                <ChatBubble from="vendor" text="Maybank 1234567890 nama Siti" />
                <div className="text-center text-[11px] text-gray-400 pt-1">… 47 more messages today</div>
              </div>

              <ul className="space-y-1.5 text-sm text-fog">
                {['Manually calculating every order', 'Sharing bank details over and over', 'Losing track of what was ordered', 'No record of transactions'].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5 shrink-0">✕</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* New Way */}
            <div className="bg-white rounded-2xl border-2 border-green-100 p-6 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">✨</span>
                <h3 className="font-bold text-ink text-lg">The New Way</h3>
                <span className="ml-auto text-xs font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">With Jomoda</span>
              </div>

              {/* Mock WhatsApp order */}
              <div className="bg-[#ECE5DD] rounded-xl p-4 font-[system-ui] text-[13px]">
                <div className="bg-white rounded-xl p-3.5 shadow-sm space-y-2 max-w-[85%]">
                  <p className="font-bold text-[#128C7E] text-[12px]">New Order — Ahmad Razif</p>
                  <p className="text-gray-500 text-[11px]">📞 60123456789</p>
                  <div className="border-t border-gray-100 pt-2 space-y-0.5">
                    <p>2× Nasi Lemak — RM16.00</p>
                    <p>2× Teh Tarik — RM7.00</p>
                  </div>
                  <div className="border-t border-gray-100 pt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span>RM23.00</span>
                  </div>
                  <p className="text-gray-400 text-[11px]">via jomoda.com/siti-kitchen</p>
                </div>
                <p className="text-[11px] text-gray-400 mt-1.5 ml-1">10:42 AM ✓✓</p>
              </div>

              <ul className="space-y-1.5 text-sm text-fog">
                {['Orders arrive itemised & totalled', 'Payment details shown automatically', 'Full order history in your dashboard', 'Works on any phone, no app needed'].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Card 1: The 30% Tax vs Your Full Plate ── */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="bg-white rounded-2xl border-2 border-red-100 p-6 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">😤</span>
                <h3 className="font-bold text-ink text-lg">The 30% Tax</h3>
                <span className="ml-auto text-xs font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">Delivery Apps</span>
              </div>
              {/* Pizza with bite taken out */}
              <div className="bg-red-50 rounded-xl p-5 flex flex-col items-center gap-3">
                <div className="relative w-28 h-28">
                  {/* Full circle = pizza */}
                  <div className="w-28 h-28 rounded-full bg-amber-300 border-4 border-amber-400 flex items-center justify-center text-5xl shadow-inner">🍕</div>
                  {/* Red overlay = the 30% chunk taken */}
                  <div className="absolute top-0 right-0 w-14 h-14 rounded-tr-full bg-red-100 border-2 border-dashed border-red-300 flex items-end justify-start p-1">
                    <span className="text-[10px] font-black text-red-500 leading-none">30%</span>
                  </div>
                </div>
                <p className="text-xs font-bold text-red-500 text-center">Every 3rd order you fulfill<br/>goes to the platform, not you.</p>
              </div>
              <p className="text-sm text-fog leading-relaxed">
                Grab, Foodpanda, and the rest charge <span className="font-semibold text-red-500">up to 30% per order</span>. You do the cooking, they take the cut. Why work for them?
              </p>
            </div>

            <div className="bg-white rounded-2xl border-2 border-green-100 p-6 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🤑</span>
                <h3 className="font-bold text-ink text-lg">Your Full Plate</h3>
                <span className="ml-auto text-xs font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">With Jomoda</span>
              </div>
              {/* Intact pizza */}
              <div className="bg-green-50 rounded-xl p-5 flex flex-col items-center gap-3">
                <div className="w-28 h-28 rounded-full bg-amber-300 border-4 border-amber-400 flex items-center justify-center text-5xl shadow-inner">🍕</div>
                <p className="text-xs font-bold text-green-600 text-center">100% of every order<br/>lands in your pocket.</p>
              </div>
              <p className="text-sm text-fog leading-relaxed">
                <span className="font-semibold text-ink">RM 150 flat.</span> Whether you sell 10 or 1,000 orders this month, 100% of the profit stays with you. No cuts, no surprises.
              </p>
            </div>
          </div>

          {/* ── Card 2: Screenshot Gallery vs Dashboard ── */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="bg-white rounded-2xl border-2 border-red-100 p-6 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">😵</span>
                <h3 className="font-bold text-ink text-lg">The Gallery Graveyard</h3>
                <span className="ml-auto text-xs font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">Painful</span>
              </div>
              {/* Phone gallery mockup */}
              <div className="bg-gray-900 rounded-xl p-3 space-y-2">
                <p className="text-[10px] text-gray-400 font-semibold px-1">📱 Gallery · 847 items</p>
                <div className="grid grid-cols-3 gap-1">
                  {[
                    { bg: 'bg-blue-200', label: 'Done bang ✓', sub: 'Transfer RM23' },
                    { bg: 'bg-green-200', label: 'Resit', sub: 'Maybank' },
                    { bg: 'bg-yellow-100', label: 'Bukti', sub: 'RM47.50' },
                    { bg: 'bg-pink-100', label: '??', sub: 'blurry' },
                    { bg: 'bg-blue-100', label: 'Transfer', sub: 'RM15' },
                    { bg: 'bg-gray-200', label: 'Resit lagi', sub: 'RHB' },
                  ].map((item, i) => (
                    <div key={i} className={`${item.bg} rounded-md p-1.5 aspect-square flex flex-col justify-end`}>
                      <p className="text-[8px] font-bold text-gray-700 leading-tight truncate">{item.label}</p>
                      <p className="text-[7px] text-gray-500 truncate">{item.sub}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[9px] text-gray-500 text-center italic px-1">"Which one was from Farah again...?"</p>
              </div>
              <p className="text-sm text-fog italic text-center font-medium">Is this your accounting system?</p>
            </div>

            <div className="bg-white rounded-2xl border-2 border-green-100 p-6 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">📊</span>
                <h3 className="font-bold text-ink text-lg">The Jomoda Dashboard</h3>
                <span className="ml-auto text-xs font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">With Jomoda</span>
              </div>
              {/* Clean order list mockup */}
              <div className="bg-surface rounded-xl p-3 space-y-2">
                <p className="text-[10px] text-fog font-semibold px-1 pb-1 border-b border-border">Today&apos;s Orders · 14 total</p>
                {[
                  { id: 'ORD-A1B2', name: 'Ahmad Razif', items: '2× Nasi Lemak', total: 'RM 16.00', status: 'Paid' },
                  { id: 'ORD-C3D4', name: 'Siti Norehan', items: '1× Roti Canai, 2× Teh Tarik', total: 'RM 9.00', status: 'Paid' },
                  { id: 'ORD-E5F6', name: 'Haziq', items: '3× Mee Goreng', total: 'RM 24.00', status: 'New' },
                ].map((o) => (
                  <div key={o.id} className="bg-white rounded-lg px-3 py-2 flex items-center gap-2 shadow-sm">
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-bold text-ink truncate">{o.name}</p>
                      <p className="text-[10px] text-fog truncate">{o.items}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[11px] font-bold text-ink">{o.total}</p>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${o.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-brand/10 text-brand'}`}>{o.status}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-fog italic text-center font-medium">Professional tracking. Zero guesswork.</p>
            </div>
          </div>

          {/* ── Card 3: Link in Bio Transformation ── */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="bg-white rounded-2xl border-2 border-red-100 p-6 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">😬</span>
                <h3 className="font-bold text-ink text-lg">The Amateur Look</h3>
                <span className="ml-auto text-xs font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">High Friction</span>
              </div>
              {/* Fake Instagram bio */}
              <div className="bg-white border border-border rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-400 to-orange-300 shrink-0" />
                  <div>
                    <p className="font-bold text-ink text-sm">@sitikhana_homemade</p>
                    <p className="text-xs text-fog">Food · Home Business</p>
                  </div>
                </div>
                <div className="text-xs text-ink space-y-0.5 leading-relaxed">
                  <p>🍱 Homemade food, order online!</p>
                  <p className="text-fog">DM to order or WhatsApp</p>
                  <p className="font-semibold">012-XXXXXXX</p>
                </div>
                <div className="bg-gray-100 rounded-lg px-3 py-2 text-center">
                  <p className="text-xs text-gray-400 italic">No link. Just a phone number.</p>
                </div>
              </div>
              <p className="text-sm text-fog leading-relaxed">
                Customers have to <span className="font-semibold text-red-500">DM first just to see a price</span>. Most of them won&apos;t bother — they&apos;ll just scroll past.
              </p>
            </div>

            <div className="bg-white rounded-2xl border-2 border-green-100 p-6 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🔥</span>
                <h3 className="font-bold text-ink text-lg">The Pro Look</h3>
                <span className="ml-auto text-xs font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">With Jomoda</span>
              </div>
              {/* Phone mockup with storefront */}
              <div className="bg-ink rounded-xl p-3 flex justify-center">
                <div className="w-36 bg-white rounded-2xl overflow-hidden shadow-xl border-4 border-gray-700">
                  <div className="h-16 bg-gradient-to-r from-amber-400 to-orange-400 flex items-end p-2">
                    <div className="w-8 h-8 rounded-full bg-white border-2 border-white shadow flex items-center justify-center text-lg">🍱</div>
                  </div>
                  <div className="p-2 space-y-1.5">
                    <p className="font-bold text-ink text-[10px]">Siti&apos;s Kitchen</p>
                    <div className="bg-surface rounded-md p-1.5 space-y-1">
                      <div className="flex items-center gap-1">
                        <div className="w-6 h-6 rounded bg-amber-100 text-[10px] flex items-center justify-center">🍱</div>
                        <div className="flex-1">
                          <p className="text-[8px] font-semibold text-ink">Nasi Lemak</p>
                          <p className="text-[7px] text-fog">RM 8.00</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-6 h-6 rounded bg-orange-100 text-[10px] flex items-center justify-center">🥘</div>
                        <div className="flex-1">
                          <p className="text-[8px] font-semibold text-ink">Ayam Masak Merah</p>
                          <p className="text-[7px] text-fog">RM 12.00</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-brand rounded-md py-1 text-center">
                      <p className="text-[8px] font-bold text-white">Order Now →</p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-fog leading-relaxed">
                <span className="font-semibold text-ink">From a side-hustle to a brand.</span> Give your customers the checkout experience they expect in 2026 — browse, tap, order. Done.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────── */}
      <section className="py-20 max-w-6xl mx-auto px-5">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-fog mb-3">Simple by design</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-ink text-center mb-14">
          Up and running in 3 steps
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              icon: '🛍️',
              title: 'Setup in Minutes',
              desc: 'Upload your menu items, product photos, and DuitNow QR code. No tech skills needed.',
            },
            {
              step: '02',
              icon: '🔗',
              title: 'Share Your Link',
              desc: 'Drop your jomoda.com/yourname link in your Instagram bio, TikTok, or send it directly to customers.',
            },
            {
              step: '03',
              icon: '💸',
              title: 'Get Paid Directly',
              desc: 'Orders arrive on WhatsApp fully itemised. Cash goes straight to your bank — zero commission.',
            },
          ].map((item) => (
            <div key={item.step} className="relative flex flex-col items-start gap-4 p-6 rounded-2xl bg-surface">
              <span className="absolute top-4 right-5 text-4xl font-black text-border select-none">{item.step}</span>
              <span className="text-4xl">{item.icon}</span>
              <div>
                <h3 className="font-bold text-ink text-lg mb-1.5">{item.title}</h3>
                <p className="text-sm text-fog leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Supported Verticals ──────────────────────────────── */}
      <section className="bg-surface py-20">
        <div className="max-w-6xl mx-auto px-5">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-fog mb-3">Built for your business</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-ink text-center mb-14">
            One platform, every type of seller
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                emoji: '🍽️',
                color: 'from-orange-50 to-red-50',
                border: 'border-orange-100',
                badge: 'F&B / Restaurant',
                badgeCls: 'bg-orange-100 text-orange-700',
                title: 'Food & Beverage',
                features: [
                  'Digital menus with photos',
                  'Category tabs (Drinks, Mains)',
                  'Out-of-stock toggles',
                  'Promo banners',
                ],
              },
              {
                emoji: '🛒',
                color: 'from-blue-50 to-indigo-50',
                border: 'border-blue-100',
                badge: 'Retail',
                badgeCls: 'bg-blue-100 text-blue-700',
                title: 'Retail & Products',
                features: [
                  'Product catalog with images',
                  'Multiple categories',
                  'Price & availability control',
                  'WhatsApp checkout',
                ],
              },
              {
                emoji: '🏡',
                color: 'from-green-50 to-teal-50',
                border: 'border-green-100',
                badge: 'Booking',
                badgeCls: 'bg-green-100 text-green-700',
                title: 'Homestays & Services',
                features: [
                  'Check-in / check-out picker',
                  'Booking calendar',
                  'Block unavailable dates',
                  'Reservation via WhatsApp',
                ],
              },
            ].map((v) => (
              <div key={v.title} className={`bg-gradient-to-b ${v.color} rounded-2xl border ${v.border} p-6 flex flex-col gap-5`}>
                <div>
                  <span className="text-4xl">{v.emoji}</span>
                  <span className={`ml-3 text-xs font-bold px-2.5 py-1 rounded-full ${v.badgeCls}`}>{v.badge}</span>
                </div>
                <h3 className="font-bold text-ink text-xl">{v.title}</h3>
                <ul className="space-y-2 flex-1">
                  {v.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-fog">
                      <span className="w-4 h-4 rounded-full bg-white border border-border flex items-center justify-center text-[10px] text-green-600 font-bold shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────────── */}
      <section className="py-20 max-w-6xl mx-auto px-5">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-fog mb-3">Pricing</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-ink text-center mb-12">
          One plan. Everything included.
        </h2>

        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-3xl border-2 border-ink shadow-[0_8px_40px_rgba(0,0,0,0.10)] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-br from-ink to-[#444] px-8 py-10 text-center text-white">
              <p className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-3">Monthly Plan</p>
              <div className="flex items-end justify-center gap-1 mb-1">
                <span className="text-2xl font-bold text-white/70 mb-2">RM</span>
                <span className="text-7xl font-black leading-none">150</span>
                <span className="text-xl font-semibold text-white/70 mb-2">/ mo</span>
              </div>
              <p className="text-sm text-white/60 mt-2">Billed monthly. Cancel anytime.</p>
            </div>

            {/* Features */}
            <div className="px-8 py-8 space-y-4">
              {[
                ['0% commission on every sale', true],
                ['Unlimited menu items & products', true],
                ['All 3 business types included', true],
                ['WhatsApp order integration', true],
                ['Payment QR code upload', true],
                ['Real-time order dashboard', true],
                ['Custom storefront link', true],
                ['Mobile-first design', true],
              ].map(([feature, included]) => (
                <div key={String(feature)} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                    <span className="text-brand text-xs font-bold">✓</span>
                  </span>
                  <span className="text-sm font-medium text-ink">{String(feature)}</span>
                </div>
              ))}

              <div className="pt-2 border-t border-border mt-2">
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-surface flex items-center justify-center shrink-0">
                    <span className="text-fog text-xs font-bold">✕</span>
                  </span>
                  <span className="text-sm text-fog line-through">Platform commissions</span>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <span className="w-5 h-5 rounded-full bg-surface flex items-center justify-center shrink-0">
                    <span className="text-fog text-xs font-bold">✕</span>
                  </span>
                  <span className="text-sm text-fog line-through">Hidden transaction fees</span>
                </div>
              </div>

              <Link href="/register"
                className="block w-full mt-4 bg-gradient-to-r from-brand-dark to-brand text-white font-bold text-center py-4 rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-brand/25 text-base">
                Get Started — RM 150/mo →
              </Link>

              <p className="text-center text-xs text-fog">No credit card required to sign up</p>
            </div>
          </div>

          {/* Trust note */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            {[
              { n: '0%', label: 'Commission' },
              { n: '5 min', label: 'Setup time' },
              { n: '100%', label: 'Your money' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-black text-ink">{s.n}</p>
                <p className="text-xs text-fog mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────── */}
      <section className="bg-ink py-20 px-5 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 max-w-xl mx-auto leading-tight">
          Your store is 5 minutes away.
        </h2>
        <p className="text-white/60 mb-10 text-base max-w-sm mx-auto">
          Join thousands of Malaysian sellers who have ditched the chaos and gone digital.
        </p>
        <Link href="/register"
          className="inline-block bg-brand text-white font-bold px-10 py-4 rounded-xl hover:bg-brand-dark transition-colors text-base shadow-lg shadow-brand/30">
          Create Your Free Store →
        </Link>
        <p className="mt-4 text-white/40 text-xs">No contracts. No setup fees. Just RM 150/month.</p>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="border-t border-border px-5 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-base font-bold text-brand">jomoda</span>
          <div className="flex items-center gap-6 text-xs text-fog">
            <Link href="/login" className="hover:text-ink transition-colors">Login</Link>
            <a href="mailto:hello@jomoda.com" className="hover:text-ink transition-colors">Contact</a>
            <a href="#" className="hover:text-ink transition-colors">Terms</a>
            <a href="#" className="hover:text-ink transition-colors">Privacy</a>
          </div>
          <p className="text-xs text-fog">© {new Date().getFullYear()} Jomoda. All rights reserved.</p>
        </div>
      </footer>

    </div>
  )
}

// ─── Chat bubble helper ───────────────────────────────────────

function ChatBubble({ from, text }: { from: 'customer' | 'vendor'; text: string }) {
  const isVendor = from === 'vendor'
  return (
    <div className={`flex ${isVendor ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] px-3 py-2 rounded-xl shadow-sm text-gray-800 ${
        isVendor ? 'bg-[#DCF8C6] rounded-tr-sm' : 'bg-white rounded-tl-sm'
      }`}>
        {text}
      </div>
    </div>
  )
}

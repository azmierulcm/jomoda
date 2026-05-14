import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })

export const metadata: Metadata = {
  title: 'Jomoda',
  description: 'Digital menus for F&B businesses',
}

// Without this, Android Chrome renders at ~980px and intercepts ALL touch
// events for its own pan/zoom — nothing ever reaches JavaScript.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="antialiased bg-gray-50 text-gray-900">{children}</body>
    </html>
  )
}

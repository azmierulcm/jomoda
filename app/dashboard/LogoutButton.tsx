'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LogoutButton({ compact = false }: { compact?: boolean }) {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm font-semibold text-ink underline hover:text-fog transition-colors"
    >
      {compact ? 'Out' : 'Sign out'}
    </button>
  )
}

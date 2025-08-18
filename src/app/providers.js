'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function Providers({ children }) {
  const router = useRouter()

  useEffect(() => {
    // Run every second
    const interval = setInterval(() => {
      const savedUser = localStorage.getItem('authUser')
      if (!savedUser) {
        router.push('/login')
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [router])

  return <>{children}</>
}

'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  LogOut,
  User,
  Loader2,
  ChevronDown,
  Code,
  BookOpen,
  Settings,
} from 'lucide-react'
import { Button } from '@/components/common/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/common/dropdown'
import { useRouter } from 'next/navigation'

export function Header({ showCTA, ctaHref, onSignOut } = {}) {
  const [isSigningOut, setIsSigningOut] = useState(false)
  const router = useRouter()

  const handleSignOut = async () => {
    setIsSigningOut(true)
    try {
      // 🔹 Clear session/localStorage
      localStorage.removeItem('authUser')

      // 🔹 Reset app state if parent passed a reset callback
      if (onSignOut) {
        onSignOut()
      }

      // Fake delay for spinner
      setTimeout(() => {
        setIsSigningOut(false)
        router.push('/')
      }, 800)
    } catch (error) {
      console.error('Sign out error:', error)
      setIsSigningOut(false)
    }
  }

  return (
    <header className="px-4 sm:px-6 lg:px-8 py-4 border-b border-zinc-200 bg-white">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="flex items-center">
          <img src="/firecrawl-logo-with-fire.webp" alt="Firecrawl" className="h-8 w-auto" />
        </Link>

        <div className="flex items-center gap-4">
         
            <Link href={"/api-docs"}>
              <Button variant="blue" size="sm" className="gap-2">
                <Code className="h-4 w-4" />
                <span className="hidden sm:inline">API</span>
              </Button>
            </Link>
   

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="code" size="sm" className="gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline-block">Guest User</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Account</p>
                  <p className="text-xs leading-none text-zinc-500">guest@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/settings" className="flex items-center cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/docs" className="flex items-center cursor-pointer">
                  <BookOpen className="mr-2 h-4 w-4" />
                  <span>Documentation</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="cursor-pointer"
              >
                {isSigningOut ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Logging out...</span>
                  </>
                ) : (
                  <>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

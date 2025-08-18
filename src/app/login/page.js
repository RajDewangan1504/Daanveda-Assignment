'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { Input } from '@/components/common/input'
import { Button } from '@/components/common/button'
import { LogIn } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [helperText, setHelperText] = useState('')
  const router = useRouter()

  // ✅ If already logged in, redirect
  useEffect(() => {
    const token = localStorage.getItem('authUser')
    if (token) {
      router.push('/')
    }
  }, [router])

  // ✅ Hardcoded credentials
  const DEFAULT_EMAIL = 'admin@example.com'
  const DEFAULT_PASSWORD = '123456'

  // ✅ Handle login
  const handleAuth = (e) => {
    e.preventDefault()

    if (email === DEFAULT_EMAIL && password === DEFAULT_PASSWORD) {
      localStorage.setItem('authUser', email) // save session
      router.push('/') // go to home/dashboard
    } else {
      setHelperText('Invalid email or password')
    }
  }

  return (
    <div className="max-w-7xl flex items-center justify-center min-h-screen mx-auto px-4 sm:px-6 lg:px-8">

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Hero */}
            <div className="text-center lg:text-left">
              <h1 className="text-[3rem] lg:text-[4rem] font-semibold tracking-tight leading-none mb-6">
                <span className="bg-gradient-to-tr from-blue-900 to-blue-600 bg-clip-text text-transparent block">
                  Firecrawl
                </span>
                <span className="text-black block">Observer</span>
              </h1>
              <p className="text-xl text-zinc-600 dark:text-zinc-400">
                Monitor websites with Firecrawl change tracking
              </p>
            </div>

            {/* Right side - Login form */}
            <div className="w-full max-w-md mx-auto lg:mx-0">
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <div className="flex items-center justify-center mb-6">
                  <h2 className="text-2xl font-semibold">Welcome Back</h2>
                </div>

                <form onSubmit={handleAuth} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-zinc-700">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (helperText) setHelperText('')
                      }}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium text-zinc-700">
                      Password
                    </label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value)
                        if (helperText) setHelperText('')
                      }}
                      required
                    />
                    {helperText && (
                      <p className="text-sm text-red-500 mt-1">{helperText}</p>
                    )}
                  </div>

                  <Button type="submit" variant="blue" className="w-full">
                    <LogIn className="mr-2 h-4 w-4" /> Sign In
                  </Button>
                </form>

                {/* ✅ Demo credentials */}
                <p className="text-xs text-gray-500 mt-4 text-center">
                  Demo credentials: <br />
                  <strong>{DEFAULT_EMAIL}</strong> / <strong>{DEFAULT_PASSWORD}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

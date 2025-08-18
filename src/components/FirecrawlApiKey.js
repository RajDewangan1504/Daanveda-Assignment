'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/common/button'
import { Input } from '@/components/common/input'
import { Key, Trash2, Edit2, Check, AlertCircle, Coins, RefreshCw } from 'lucide-react'

export function FirecrawlApiKey() {
  const [isEditing, setIsEditing] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [tokenUsage, setTokenUsage] = useState(null)
  const [isLoadingTokens, setIsLoadingTokens] = useState(false)

  // Load key from localStorage on mount
  useEffect(() => {
    const storedKey = localStorage.getItem('firecrawlKey')
    if (storedKey) {
      setApiKey('')
      // store masked version
      setTokenUsage(null)
    }
  }, [])

  // Get saved key
  const getStoredKey = () => localStorage.getItem('firecrawlKey')

  const fetchTokenUsage = useCallback(async () => {
    setIsLoadingTokens(true)
    try {
      const key = getStoredKey()
      if (!key) {
        setTokenUsage({ error: 'No API key found' })
        return
      }

      // Simulate API call — replace with actual fetch if Firecrawl provides endpoint
      const response = await new Promise((resolve) =>
        setTimeout(() => resolve({ success: true, remaining_tokens: 12345 }), 1000)
      )

      if (response.success) {
        setTokenUsage({ remaining_tokens: response.remaining_tokens })
      } else {
        setTokenUsage({ error: response.error })
      }
    } catch {
      setTokenUsage({ error: 'Failed to fetch token usage' })
    } finally {
      setIsLoadingTokens(false)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    try {
      localStorage.setItem('firecrawlKey', apiKey)
      setSuccess(true)
      setTimeout(() => {
        setIsEditing(false)
        setApiKey('')
        setSuccess(false)
        fetchTokenUsage()
      }, 1500)
    } catch (err) {
      setError('Failed to save API key')
    }
  }

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete your Firecrawl Auth?')) {
      try {
        localStorage.removeItem('firecrawlKey')
        setTokenUsage(null)
      } catch {
        setError('Failed to delete API key')
      }
    }
  }

  const storedKey = getStoredKey()
  const maskedKey = storedKey
    ? storedKey.substring(0, 4) + '****' + storedKey.slice(-4)
    : null

  if (!storedKey && !isEditing) {
    return (
      <div className="p-6 border border-dashed border-gray-300 rounded-lg text-center">
        <Key className="h-12 w-12 text-gray-400 mx-auto mb-3" />
        <h3 className="text-lg font-medium text-gray-900 mb-1">No Firecrawl Auth</h3>
        <p className="text-sm text-gray-500 mb-4">
          Add your API key to enable website monitoring
        </p>
        <Button onClick={() => setIsEditing(true)} variant="blue">
          Add API Key
        </Button>
      </div>
    )
  }

  if (isEditing) {
    return (
      <div className="p-6 border border-gray-200 rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
              Firecrawl Auth
            </label>
            <Input
              id="apiKey"
              type="password"
              placeholder="fc-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              Get your API key from{' '}
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 underline"
              >
                firecrawl.dev
              </a>
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          <div className="flex gap-2">
            <Button type="submit" variant="blue" disabled={!apiKey}>
              {success ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Saved
                </>
              ) : (
                'Save Key'
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsEditing(false)
                setApiKey('')
                setError('')
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="p-6 border border-gray-200 rounded-lg">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">Firecrawl Auth</h3>
          <p className="text-sm text-gray-500">Key: {maskedKey}</p>

          <div className="mt-3 flex items-center gap-2">
            {isLoadingTokens ? (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <RefreshCw className="h-4 w-4 animate-spin" />
                Loading tokens...
              </div>
            ) : tokenUsage?.remaining_tokens !== undefined ? (
              <div className="flex items-center gap-2">
                <Coins className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium text-gray-700">
                  {tokenUsage.remaining_tokens.toLocaleString()} tokens remaining
                </span>
                <Button
                  onClick={fetchTokenUsage}
                  variant="outline"
                  size="sm"
                  className="h-6 w-6 p-0 border-0"
                >
                  <RefreshCw className="h-3 w-3" />
                </Button>
              </div>
            ) : tokenUsage?.error ? (
              <p className="text-xs text-red-500">{tokenUsage.error}</p>
            ) : null}
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            onClick={handleDelete}
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

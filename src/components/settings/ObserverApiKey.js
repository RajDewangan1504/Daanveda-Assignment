'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/common/button'
import { Input } from '@/components/common/input'
import { Copy, Plus, Trash2, Key, Check } from 'lucide-react'

const ObserverApiKey = () => {
  const [apiKeys, setApiKeys] = useState([])
  const [newApiKeyName, setNewApiKeyName] = useState('')
  const [showNewApiKey, setShowNewApiKey] = useState(false)
  const [createdApiKey, setCreatedApiKey] = useState(null)
  const [copiedKeyId, setCopiedKeyId] = useState(null)

  // Fake API key generator
  const generateKey = () =>
    'obs_' + Math.random().toString(36).substring(2, 16) + Math.random().toString(36).substring(2, 10)

  const handleCreateApiKey = () => {
    if (!newApiKeyName.trim()) return

    const newKey = {
      _id: Date.now().toString(),
      name: newApiKeyName,
      keyPreview: generateKey(),
      createdAt: new Date(),
      lastUsed: null,
    }

    setApiKeys((prev) => [...prev, newKey])
    setCreatedApiKey(newKey.keyPreview)
    setNewApiKeyName('')
    setShowNewApiKey(false)
  }

  const handleDeleteApiKey = (id) => {
    setApiKeys((prev) => prev.filter((key) => key._id !== id))
  }

  const handleCopyApiKey = (key, id) => {
    navigator.clipboard.writeText(key)
    setCopiedKeyId(id)
    setTimeout(() => setCopiedKeyId(null), 2000)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Observer API Keys</h2>

      <div className="space-y-6">
        <div>
          <p className="text-gray-600 mb-4">
            API keys allow you to programmatically add websites to your monitoring list. Keep your API
            keys secure and do not share them publicly.
          </p>

          <Link
            href="/api-docs"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View API Documentation →
          </Link>
        </div>

        {/* Created API key alert */}
        {createdApiKey && (
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">API Key Created</h4>
            <p className="text-sm text-gray-700 mb-3">
              Make sure to copy your API key now. You won&apos;t be able to see it again!
            </p>
            <div className="flex gap-2">
              <code className="flex-1 p-2 bg-white border rounded text-xs font-mono">
                {createdApiKey}
              </code>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(createdApiKey)
                  setCreatedApiKey(null)
                }}
              >
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </Button>
            </div>
          </div>
        )}

        {/* API Keys list */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Your API Keys</h3>
            <Button
              variant="blue"
              size="sm"
              onClick={() => setShowNewApiKey(true)}
              disabled={apiKeys.length >= 5}
            >
              <Plus className="h-4 w-4 mr-1" />
              Create New Key
            </Button>
          </div>

          {showNewApiKey && (
            <div className="mb-4 p-4 border rounded-lg bg-gray-50">
              <div className="flex gap-2">
                <Input
                  placeholder="API key name (e.g., Production)"
                  value={newApiKeyName}
                  onChange={(e) => setNewApiKeyName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCreateApiKey()}
                  className="flex-1"
                />
                <Button
                  variant="blue"
                  size="sm"
                  onClick={handleCreateApiKey}
                  disabled={!newApiKeyName.trim()}
                >
                  Create
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowNewApiKey(false)
                    setNewApiKeyName('')
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {apiKeys.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {apiKeys.map((key) => (
                <div
                  key={key._id}
                  className="border rounded-lg p-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm">{key.name}</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteApiKey(key._id)}
                      className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 border-0"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    <code className="text-xs text-gray-500 font-mono flex-1 truncate">
                      {key.keyPreview}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopyApiKey(key.keyPreview, key._id)}
                      className="h-6 w-6 p-0 border-0"
                    >
                      {copiedKeyId === key._id ? (
                        <Check className="h-3 w-3 text-green-600" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(key.createdAt).toLocaleDateString()}
                    {key.lastUsed && (
                      <span className="block">
                        Used: {new Date(key.lastUsed).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Key className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm">No API keys yet</p>
              <p className="text-xs mt-1">Create your first API key to get started</p>
            </div>
          )}

          {apiKeys.length >= 5 && (
            <p className="text-xs text-gray-500 mt-2">
              Maximum of 5 API keys allowed per account
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ObserverApiKey

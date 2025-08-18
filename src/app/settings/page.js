
'use client'

import { useState, useEffect, Suspense } from 'react'
import { Header } from '@/components/header'
import { Loader2, ArrowLeft, Mail, Key, Webhook, Bot } from 'lucide-react'
import Link from 'next/link'
import AiAnalysis from '@/components/settings/AiAnalysis.js'
import WebHooks from '@/components/settings/WebHooks.js'
import EmailNotifications from '@/components/settings/EmailNotifications'
import { FirecrawlApiKey } from '@/components/FirecrawlApiKey.js'
import ObserverApiKey from '@/components/settings/ObserverApiKey'

function SettingsContent() {

  const [activeSection, setActiveSection] = useState('email')
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <Header />

      <div maxWidth="7xl" className="py-12">
        <div>
          <div className="flex items-center gap-4 mb-8">
            <Link href="/" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-3xl font-bold">Settings</h1>
          </div>

          <div className="flex gap-8">
            {/* Sidebar */}
            <div className="w-64 flex-shrink-0">
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveSection('email')}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeSection === 'email'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <Mail className="h-4 w-4" />
                  Email Notifications
                </button>
                <button
                  onClick={() => setActiveSection('webhooks')}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeSection === 'webhooks'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <Webhook className="h-4 w-4" />
                  Webhooks
                </button>
                <button
                  onClick={() => setActiveSection('firecrawl')}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeSection === 'firecrawl'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <Key className="h-4 w-4" />
                  Firecrawl Auth
                </button>

                <button
                  onClick={() => setActiveSection('api')}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeSection === 'api'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <Key className="h-4 w-4" />
                  Observer API Keys
                </button>

                <button
                  onClick={() => setActiveSection('ai')}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeSection === 'ai'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <Bot className="h-4 w-4" />
                  AI Analysis
                </button>
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1">
              {activeSection === 'email' && (
                <EmailNotifications />
              )}

              {activeSection === 'webhooks' && (
                <WebHooks />
              )}

              {activeSection === 'firecrawl' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-6">Firecrawl Auth</h2>

                  <div className="space-y-6">
                    <div>
                      <p className="text-gray-600 mb-4">
                        Connect your Firecrawl API key to enable website monitoring. Firecrawl powers the web scraping and change detection functionality.
                      </p>

                      <a
                        href=""
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Get your Firecrawl API key →
                      </a>
                    </div>

                    <FirecrawlApiKey />
                  </div>
                </div>
              )}

              {activeSection === 'api' && (
                <ObserverApiKey/>
              )}


              {activeSection === 'ai' && (
                <AiAnalysis />
              )}

            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default function SettingsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
      <SettingsContent />
    </Suspense>
  )
}
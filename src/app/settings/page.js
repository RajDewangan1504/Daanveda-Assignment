
'use client'

import { useState, useEffect, Suspense } from 'react'
import { Layout, MainContent, Footer } from '@/components/layout/layout'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2, ArrowLeft, Mail, AlertCircle, Key, Copy, Plus, Webhook, HelpCircle, XCircle, Bot, Info } from 'lucide-react'

import Link from 'next/link'
import dynamic from 'next/dynamic'
// import { APP_CONFIG, getFromEmail } from '@/config/app.config'

// Dynamic import to avoid SSR issues with TipTap
const EmailTemplateEditor = dynamic(
  () => import('@/components/EmailTemplateEditor').then(mod => mod.EmailTemplateEditor),
  {
    ssr: false,
    loading: () => <div className="h-64 bg-gray-50 rounded-lg animate-pulse" />
  }
)

function SettingsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [activeSection, setActiveSection] = useState('email')

  const [newApiKeyName, setNewApiKeyName] = useState('')


  // Notification settings state
  const [notificationEmail, setNotificationEmail] = useState('')
  const [defaultWebhook, setDefaultWebhook] = useState('')
  const [emailTemplate, setEmailTemplate] = useState('')

  const [emailError, setEmailError] = useState(null)

  const [showHtmlSource, setShowHtmlSource] = useState(true)

  // AI settings state
  const [aiEnabled, setAiEnabled] = useState(false)
  const [aiModel, setAiModel] = useState('gpt-4o-mini')
  const [aiBaseUrl, setAiBaseUrl] = useState('')
  const [aiSystemPrompt, setAiSystemPrompt] = useState('')
  const [aiThreshold, setAiThreshold] = useState(70)
  const [aiApiKey, setAiApiKey] = useState('')
  const [emailOnlyIfMeaningful, setEmailOnlyIfMeaningful] = useState(false)
  const [webhookOnlyIfMeaningful, setWebhookOnlyIfMeaningful] = useState(false)

  useEffect(() => {
    const section = searchParams.get('section')
    if (section === 'firecrawl') {
      setActiveSection('firecrawl')
    } else if (section === 'email') {
      setActiveSection('email')
    }

    if (searchParams.get('verified') === 'true') {
      setEmailSuccess(true)
      setTimeout(() => setEmailSuccess(false), 5000)
    }

    const error = searchParams.get('error')
    if (error) {
      let errorMessage = 'Verification failed'
      switch (error) {
        case 'missing-token':
          errorMessage = 'Verification link is invalid'
          break
        case 'token-expired':
          errorMessage = 'Verification link has expired'
          break
        case 'invalid-token':
          errorMessage = 'Invalid verification token'
          break
        case 'verification-failed':
          errorMessage = 'Email verification failed'
          break
        case 'verification-error':
          errorMessage = 'An error occurred during verification'
          break
      }
      setEmailError(errorMessage)
      setTimeout(() => setEmailError(null), 10000)
    }
  }, [searchParams])

  return (
    <Layout>
      <Header />

      <MainContent maxWidth="7xl" className="py-12">
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
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-6">Email Notifications</h2>

                  {/* Error message */}
                  {emailError && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <XCircle className="h-5 w-5 text-red-600" />
                        <p className="text-sm text-red-700">{emailError}</p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-8">
                    {/* Email Configuration */}
                    <div>
                      <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                        <Mail className="h-5 w-5" />
                        Email Notifications
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="notification-email">Notification Email</Label>
                          <div className="flex gap-2 mt-1">
                            <Input
                              id="notification-email"
                              type="email"
                              // placeholder={APP_CONFIG.email.defaultRecipient}
                              value={notificationEmail}
                              onChange={(e) => setNotificationEmail(e.target.value)}
                              className="flex-1"
                            />
                            <Button
                              variant="blue"
                              size="sm"
                            >
                              Save
                            </Button>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            We&apos;ll send change notifications to this email address
                          </p>
                        </div>

                        {/* Email template preview */}
                        <div>
                          <h4 className="font-medium mb-2">Email Preview</h4>
                          <div className="border rounded-lg p-4 bg-gray-50">
                            <div className="space-y-2 text-sm">
                              <p className="font-semibold">Subject: Changes detected on example.com</p>
                              <div className="border-t pt-2">
                                <p className="text-gray-600">Hi there,</p>
                                <p className="text-gray-600 mt-2">
                                  We&apos;ve detected changes on the website you&apos;re monitoring:
                                </p>
                                <div className="mt-2 p-3 bg-white rounded border">
                                  <p className="font-medium">example.com</p>
                                  <p className="text-gray-500 text-xs mt-1">Changed at: {new Date().toLocaleString()}</p>
                                </div>
                                <p className="text-gray-600 mt-2">
                                  <a href="#" className="text-blue-600 underline">View changes →</a>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Email Template Editor */}
                    <div className="border-t pt-6">
                      <h4 className="font-medium mb-3">Email Template</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Customize the email template that will be sent when changes are detected. Use variables to insert dynamic content.
                      </p>

                      {/* Available Variables */}
                      <div className="mb-4 p-3 border rounded-lg">
                        <h5 className="font-medium mb-2">Available Variables</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="font-mono bg-gray-100 px-1 rounded">{"{{websiteName}}"}</span> - Website name
                          </div>
                          <div>
                            <span className="font-mono bg-gray-100 px-1 rounded">{"{{websiteUrl}}"}</span> - Website URL
                          </div>
                          <div>
                            <span className="font-mono bg-gray-100 px-1 rounded">{"{{changeDate}}"}</span> - When change was detected
                          </div>
                          <div>
                            <span className="font-mono bg-gray-100 px-1 rounded">{"{{changeType}}"}</span> - Type of change
                          </div>
                          <div>
                            <span className="font-mono bg-gray-100 px-1 rounded">{"{{pageTitle}}"}</span> - Page title
                          </div>
                          <div>
                            <span className="font-mono bg-gray-100 px-1 rounded">{"{{viewChangesUrl}}"}</span> - Link to view changes
                          </div>
                          {aiEnabled && (
                            <>
                              <div>
                                <span className="font-mono bg-gray-100 px-1 rounded">{"{{aiMeaningfulScore}}"}</span> - AI score (0-100)
                              </div>
                              <div>
                                <span className="font-mono bg-gray-100 px-1 rounded">{"{{aiIsMeaningful}}"}</span> - Yes/No meaningful
                              </div>
                              <div>
                                <span className="font-mono bg-gray-100 px-1 rounded">{"{{aiReasoning}}"}</span> - AI reasoning
                              </div>
                              <div>
                                <span className="font-mono bg-gray-100 px-1 rounded">{"{{aiModel}}"}</span> - AI model used
                              </div>
                              <div>
                                <span className="font-mono bg-gray-100 px-1 rounded">{"{{aiAnalyzedAt}}"}</span> - AI analysis time
                              </div>
                            </>
                          )}
                        </div>
                        {aiEnabled && (
                          <p className="text-xs text-gray-500 mt-2">
                            AI variables are only available when AI analysis is enabled and a change is analyzed.
                          </p>
                        )}
                      </div>

                      {/* Toggle between editor and HTML view */}
                      <div className="mb-4 flex gap-2">
                        <Button
                          variant={showHtmlSource ? "outline" : "code"}
                          size="sm"
                          onClick={() => setShowHtmlSource(false)}
                        >
                          Editor
                        </Button>
                        <Button
                          variant={showHtmlSource ? "code" : "outline"}
                          size="sm"
                          onClick={() => setShowHtmlSource(true)}
                        >
                          HTML Source
                        </Button>
                      </div>

                      {showHtmlSource ? (
                        <div className="border rounded-lg">
                          <textarea
                            value={emailTemplate}
                            onChange={(e) => setEmailTemplate(e.target.value)}
                            className="w-full p-4 font-mono text-sm min-h-[300px] rounded-lg"
                            placeholder="Enter your HTML template here..."
                          />
                        </div>
                      ) : (
                        <EmailTemplateEditor
                          value={emailTemplate}
                          onChange={setEmailTemplate}
                          disabled={false}
                        />
                      )}

                      {/* Email Preview */}
                      <div className="mt-6">
                        <h4 className="font-medium mb-3">Preview</h4>
                        <div className="border rounded-lg p-6 bg-gray-50">
                          <div className="max-w-xl mx-auto bg-white rounded-lg shadow-sm p-6">
                            <div className="mb-4 text-sm text-gray-500 border-b pb-2">
                              {/* <p><strong>From:</strong> {getFromEmail()}</p> */}
                              {/* <p><strong>To:</strong> {notificationEmail || APP_CONFIG.email.defaultRecipient}</p> */}
                              <p><strong>Subject:</strong> Changes detected on Example Website</p>
                            </div>
                            <div
                              className="prose prose-sm max-w-none"
                              dangerouslySetInnerHTML={{
                                __html: emailTemplate
                                  .replace(/{{websiteName}}/g, 'Example Website')
                                  .replace(/{{websiteUrl}}/g, 'https://example.com')
                                  .replace(/{{changeDate}}/g, new Date().toLocaleString())
                                  .replace(/{{changeType}}/g, 'Content changed')
                                  .replace(/{{pageTitle}}/g, 'Example Page Title')
                                  .replace(/{{viewChangesUrl}}/g, '#')
                                  .replace(/{{aiMeaningfulScore}}/g, '85')
                                  .replace(/{{aiIsMeaningful}}/g, 'Yes')
                                  .replace(/{{aiReasoning}}/g, 'The page content has been updated with new product information and pricing changes.')
                                  .replace(/{{aiModel}}/g, 'gpt-4o-mini')
                                  .replace(/{{aiAnalyzedAt}}/g, new Date().toLocaleString())
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <Button
                          variant="outline"
                          size="sm"
                        >
                          Reset to Default
                        </Button>
                        <Button
                          variant="blue"
                          size="sm"
                        >
                          Save Template
                        </Button>
                      </div>
                    </div>

                    {/* Global email preferences */}
                    <div className="border-t pt-6">
                      <h4 className="font-medium mb-3">Email Preferences</h4>
                      <div className="space-y-3">
                        <label className="flex items-center gap-3">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                          <span className="text-sm">Send instant notifications for each change</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'webhooks' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-6">Webhooks</h2>

                  <div className="space-y-8">
                    {/* Default Webhook Configuration */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Default Webhook URL</h3>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="default-webhook">Default Webhook URL (Optional)</Label>
                          <div className="flex gap-2 mt-1">
                            <Input
                              id="default-webhook"
                              type="url"
                              placeholder="https://your-webhook.com/endpoint"
                              value={defaultWebhook}
                              onChange={(e) => setDefaultWebhook(e.target.value)}
                              className="flex-1"
                            />
                            <Button
                              variant="blue"
                              size="sm"
                            >
                              save
                            </Button>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            This webhook will be used as default for new monitors if not specified
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Webhook Playground */}
                    <div className="border-t pt-8">
                      <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-black">
                        <Webhook className="h-5 w-5 text-blue-500" />
                        Webhook Playground
                      </h3>

                      <div className="space-y-6">
                        {/* Webhook URL Section */}
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-medium text-black">Test Webhook Endpoint</h4>
                            <div className="relative group">
                              <HelpCircle className="h-5 w-5 text-gray-400 cursor-help" />
                              <div className="absolute right-0 mt-2 w-80 p-4 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                                <div className="absolute -top-2 right-2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-gray-900"></div>
                                <h4 className="font-medium mb-2">How to use the Webhook Playground</h4>
                                <ol className="space-y-1 list-decimal list-inside">
                                  <li>Copy the webhook URL below</li>
                                  <li>Go to your website settings and click the settings icon</li>
                                  <li>Select &quot;Webhook only&quot; or &quot;Email and Webhook&quot; as the notification type</li>
                                  <li>Paste the webhook URL and save</li>
                                  <li>When changes are detected, webhooks will appear here in real-time</li>
                                </ol>
                              </div>
                            </div>
                          </div>

                          {typeof window !== 'undefined' && window.location.hostname === 'localhost' && (
                            <div className="mb-4 p-4 border border-blue-200 rounded-lg">
                              <div className="flex items-start gap-3">
                                <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium">Localhost URLs won&apos;t work!</p>
                                  <p className="text-sm text-gray-600 mt-1">
                                    Convex runs in the cloud and cannot access localhost. Use one of these options:
                                  </p>
                                  <ul className="text-sm text-gray-600 mt-2 space-y-1 list-disc list-inside">
                                    <li>Use <a href="https://ngrok.com" target="_blank" className="underline font-medium">ngrok</a> to expose your local server: <code className="bg-gray-100 px-1 rounded">ngrok http {window.location.port || 3000}</code></li>
                                    <li>Deploy your app to Vercel, Netlify, or another hosting service</li>
                                    <li>Use a webhook testing service like <a target="_blank" className="underline font-medium">webhook.site</a></li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="flex items-center gap-2">
                            <Input
                              value={typeof window !== 'undefined' ? `${window.location.origin}/api/test-webhook` : 'Loading...'}
                              readOnly
                              className="flex-1 font-mono text-sm"
                            />
                            <Button
                              variant="blue"
                              size="sm"
                            >
                              copy url
                            </Button>
                          </div>
                          <p className="text-sm text-gray-500 mt-2">
                            Use this URL in your website notification settings to test webhook deliveries
                          </p>
                        </div>

                        {/* Webhook Payloads List */}
                        <div className="border rounded-lg">
                          <div className="px-4 py-3 border-b flex items-center justify-between bg-gray-50">
                            <h4 className="font-medium flex items-center gap-2">
                              Received Webhooks

                              <span className="flex items-center gap-1 text-xs text-blue-600">
                                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                                Live
                              </span>
                            </h4>

                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Get your Firecrawl API key →
                      </a>
                    </div>
                  </div>
                </div>
              )}

             

              {activeSection === 'ai' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-6">AI Analysis Settings</h2>

                  <div className="space-y-6">
                    {/* AI Enable Toggle */}
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">Enable AI Analysis</h3>
                        <p className="text-sm text-gray-600">
                          Use AI to determine if website changes are meaningful or just noise
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={aiEnabled}
                          onChange={(e) => setAiEnabled(e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    {aiEnabled && (
                      <>
                        {/* LLM Configuration */}
                        <div className="border rounded-lg p-6 space-y-6">
                          <h4 className="font-medium text-lg">LLM Configuration</h4>

                          {/* API Key */}
                          <div>
                            <Label htmlFor="ai-api-key">API Key</Label>
                            <div className="flex gap-2 mt-1">
                              <Input
                                id="ai-api-key"
                                type="password"
                                placeholder="sk-... or your provider's API key"
                                value={aiApiKey}
                                onChange={(e) => setAiApiKey(e.target.value)}
                                className="flex-1 font-mono"
                              />
                              <Button
                                variant="outline"
                                size="sm"
                              >
                                save
                              </Button>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                              Your API key from OpenAI or any compatible provider
                            </p>
                          </div>

                          {/* Model */}
                          <div>
                            <Label htmlFor="ai-model">Model</Label>
                            <Input
                              id="ai-model"
                              type="text"
                              placeholder="gpt-4o-mini"
                              value={aiModel}
                              onChange={(e) => setAiModel(e.target.value)}
                              className="mt-1 font-mono"
                            />
                            <p className="text-sm text-gray-500 mt-1">
                              Model identifier (e.g., gpt-4o-mini, claude-4-sonnet, etc.)
                            </p>
                          </div>

                          {/* Base URL */}
                          <div>
                            <Label htmlFor="ai-base-url">Base URL (Optional)</Label>
                            <Input
                              id="ai-base-url"
                              type="url"
                              value={aiBaseUrl}
                              onChange={(e) => setAiBaseUrl(e.target.value)}
                              className="mt-1 font-mono"
                            />
                            <p className="text-sm text-gray-500 mt-1">
                              Custom endpoint for OpenAI-compatible APIs. Leave empty for OpenAI.
                            </p>
                          </div>
                        </div>

                        {/* System Prompt */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <Label htmlFor="ai-prompt">System Prompt</Label>
                            <Button
                              variant="outline"
                              size="sm"
                            >
                              Use Default
                            </Button>
                          </div>
                          <Textarea
                            id="ai-prompt"
                            value={aiSystemPrompt}
                            onChange={(e) => setAiSystemPrompt(e.target.value)}
                            rows={10}
                            className="mt-1 font-mono text-xs min-h-[240px]"
                            placeholder="Enter your custom system prompt..."
                          />
                          <p className="text-sm text-gray-500 mt-1">
                            Customize how the AI analyzes changes. The AI will receive the diff and should return JSON.
                          </p>
                        </div>

                        <div>
                          <Label htmlFor="ai-threshold">Meaningful Change Threshold</Label>
                          <div className="flex items-center gap-4 mt-2">
                            <input
                              id="ai-threshold"
                              type="range"
                              min="0"
                              max="100"
                              value={aiThreshold}
                              onChange={(e) => setAiThreshold(parseInt(e.target.value))}
                              className="flex-1 accent-blue-500"
                            />
                            <div className="w-16 text-center">
                              <span className="text-lg font-medium text-blue-600">{aiThreshold}%</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            Changes with AI scores above this threshold will be marked as meaningful
                          </p>
                        </div>

                        {/* Info Box */}
                        <div className="border rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <Info className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
                            <div className="text-sm text-gray-600">
                              <p className="font-medium mb-1">How AI Analysis Works</p>
                              <ul className="space-y-1 list-disc list-inside">
                                <li>When a change is detected, the AI analyzes the diff</li>
                                <li>The AI assigns a score (0-100) based on meaningfulness</li>
                                <li>Changes above your threshold are marked as meaningful</li>
                                <li>You can filter the change log by meaningful changes only</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {/* AI-based Notification Filtering */}
                    {aiEnabled && (
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium mb-3 flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          AI-Based Notification Filtering
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Only send notifications when AI determines changes are meaningful
                        </p>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <label className="text-sm font-medium">Email notifications only for meaningful changes</label>
                              <p className="text-xs text-gray-500">Skip email notifications for changes AI marks as noise</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={emailOnlyIfMeaningful}
                                onChange={(e) => setEmailOnlyIfMeaningful(e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <label className="text-sm font-medium">Webhook notifications only for meaningful changes</label>
                              <p className="text-xs text-gray-500">Skip webhook notifications for changes AI marks as noise</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={webhookOnlyIfMeaningful}
                                onChange={(e) => setWebhookOnlyIfMeaningful(e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                            </label>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Save Button */}
                    <div className="flex justify-end">
                      <Button
                        variant="blue"
                        size="sm"
                      >
                        save
                      </Button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </MainContent>

      <Footer />
    </Layout>
  )
}

export default function SettingsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
      <SettingsContent />
    </Suspense>
  )
}
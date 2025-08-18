import React from 'react';
import { useState } from 'react';
import { Button } from '@/components/common/button';
import { Input } from '@/components/common/input';
import { Label } from '@/components/common/label';
import { Mail } from 'lucide-react';
import { XCircle } from 'lucide-react';
import dynamic from 'next/dynamic'

// import EmailTemplateEditor from '@/components/EmailTemplateEditor';

const EmailTemplateEditor = dynamic(
  () => import('@/components/TemplateEditor').then(mod => mod.EmailTemplateEditor),
  {
    ssr: false,
    loading: () => <div className="h-64 bg-gray-50 rounded-lg animate-pulse" />
  }
)


const EmailNotifications = () => {

  const [emailError, setEmailError] = useState(null)
  const [notificationEmail, setNotificationEmail] = useState('')
    const [templateSuccess, setTemplateSuccess] = useState(false)
  const [isUpdatingTemplate, setIsUpdatingTemplate] = useState(false)
  const [userSettings, setUserSetting] = useState("")


  const defaultTemplate = `
<h2>Website Change Alert</h2>
<p>We've detected changes on the website you're monitoring:</p>
<div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
  <h3>{{websiteName}}</h3>
  <p><a href="{{websiteUrl}}">{{websiteUrl}}</a></p>
  <p><strong>Changed at:</strong> {{changeDate}}</p>
  <p><strong>Page Title:</strong> {{pageTitle}}</p>
</div>
<p><a href="{{viewChangesUrl}}" style="background: #ff6600; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View Changes</a></p>
      `

  const [emailTemplate, setEmailTemplate] = useState(defaultTemplate)
  const [showHtmlSource, setShowHtmlSource] = useState(true)
  return (
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
                  placeholder="aleart@example.com"
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

            </div>

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
                disabled={isUpdatingTemplate}
              />
            </div>
          ) : (
            <EmailTemplateEditor
              value={emailTemplate}
              onChange={setEmailTemplate}
              disabled={isUpdatingTemplate}
            />
          )}

          {/* Email Preview */}
          <div className="mt-6">
            <h4 className="font-medium mb-3">Preview</h4>
            <div className="border rounded-lg p-6 bg-gray-50">
              <div className="max-w-xl mx-auto bg-white rounded-lg shadow-sm p-6">
                <div className="mb-4 text-sm text-gray-500 border-b pb-2">
                  <p><strong>From:</strong>{"Firecrawl Observer <noreply@example.com>"}</p>
                  <p><strong>To:</strong> {"alerts@example.com"}</p>
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
              onClick={() => {
                const defaultTemplate = `
                            <h2>Website Change Alert</h2>
                            <p>We've detected changes on the website you're monitoring:</p>
                            <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
                              <h3>{{websiteName}}</h3>
                              <p><a href="{{websiteUrl}}">{{websiteUrl}}</a></p>
                              <p><strong>Changed at:</strong> {{changeDate}}</p>
                              <p><strong>Page Title:</strong> {{pageTitle}}</p>
                            </div>
                            <p><a href="{{viewChangesUrl}}" style="background: #ff6600; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View Changes</a></p>
                            `.trim()
                setEmailTemplate(defaultTemplate)
                setTemplateSuccess(false)
              }}
              disabled={isUpdatingTemplate || !emailTemplate}
            >
              Reset to Default
            </Button>
            <Button
              variant="blue"
              size="sm"
              onClick={async () => {
                // Validate template first
                const validation = validateEmailTemplate(emailTemplate)
                if (!validation.isValid) {
                  alert('Template validation failed:\n\n' + validation.errors.join('\n'))
                  return
                }

                setIsUpdatingTemplate(true)
                try {
                  await updateEmailTemplate({ template: emailTemplate })
                  setTemplateSuccess(true)
                  setTimeout(() => setTemplateSuccess(false), 3000)
                } catch (error) {
                  console.error('Failed to update template:', error)
                  alert('Failed to save template. Please try again.')
                } finally {
                  setIsUpdatingTemplate(false)
                }
              }}
              disabled={isUpdatingTemplate || emailTemplate === (userSettings?.emailTemplate || '')}
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
  );
};

export default EmailNotifications;
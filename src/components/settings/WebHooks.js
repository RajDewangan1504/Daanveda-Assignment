import React from 'react';
import { useState } from 'react';
import { Button } from '@/components/common/button';
import { Input } from '@/components/common/input';
import { Textarea } from '@/components/common/textarea';
import { Label } from '@/components/common/label';
import { Webhook } from 'lucide-react';
import { HelpCircle } from 'lucide-react';
import { AlertCircle } from 'lucide-react';



const WebHooks = () => {

    const [defaultWebhook, setDefaultWebhook] = useState('')
    return (
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
                                    Save
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
                                    Copy Url
                                </Button>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">
                                Use this URL in your website notification settings to test webhook deliveries
                            </p>
                        </div>

                        {/* Webhook Payloads List */}
                        <div className="border rounded-lg">
                            <div className="px-4 py-3 border-b flex flex-col  justify-between bg-gray-50">
                                <h4 className="font-medium flex items-center gap-2">
                                    Received Webhooks

                                    <span className="flex items-center gap-1 text-xs text-blue-600">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                                        Live
                                    </span>
                                </h4>


                                <div className="p-12 text-center items-center">
                                    <Webhook className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500">No webhooks received yet</p>
                                    <p className="text-sm text-gray-400 mt-2">
                                        Configure a website to use the webhook URL above and trigger a change
                                    </p>
                                </div>



                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WebHooks;
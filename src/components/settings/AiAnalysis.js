import React from 'react';
import { useState } from 'react';
import { Button } from '@/components/common/button';
import { Input } from '@/components/common/input';
import { Textarea } from '@/components/common/textarea';
import { Label } from '@/components/common/label';
import { Info, Mail } from 'lucide-react';

const AiAnalysis = () => {

    const [aiEnabled, setAiEnabled] = useState(false)
    const [aiApiKey, setAiApiKey] = useState('')
    const [aiModel, setAiModel] = useState('gpt-4o-mini')
    const [aiBaseUrl, setAiBaseUrl] = useState('')
    const [aiThreshold, setAiThreshold] = useState(70)

    const [emailOnlyIfMeaningful, setEmailOnlyIfMeaningful] = useState(false)
    const [webhookOnlyIfMeaningful, setWebhookOnlyIfMeaningful] = useState(false)

    

    const defaultSystemPrompt = `You are an AI assistant specialized in analyzing website changes. Your task is to determine if a detected change is "meaningful" or just noise.
    
    Meaningful changes include:
    - Content updates (text, images, prices)
    - New features or sections
    - Important announcements
    - Product availability changes
    - Policy updates
    
    NOT meaningful (ignore these):
    - Rotating banners/carousels
    - Dynamic timestamps
    - View counters
    - Session IDs
    - Random promotional codes
    - Cookie consent banners
    - Advertising content
    - Social media feed updates
    
    Analyze the provided diff and return a JSON response with:
    {
      "score": 0-100 (how meaningful the change is),
      "isMeaningful": true/false,
      "reasoning": "Brief explanation of your decision"
    }`;

    const [aiSystemPrompt, setAiSystemPrompt] = useState(defaultSystemPrompt)

    return (
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
                                        Test
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
                                    placeholder="https://api.openai.com/v1"
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
                                    onClick={() => {
                                        const defaultPrompt = `You are an AI assistant specialized in analyzing website changes. Your task is to determine if a detected change is "meaningful" or just noise.

Meaningful changes include:
- Content updates (text, images, prices)
- New features or sections
- Important announcements
- Product availability changes
- Policy updates

NOT meaningful (ignore these):
- Rotating banners/carousels
- Dynamic timestamps
- View counters
- Session IDs
- Random promotional codes
- Cookie consent banners
- Advertising content
- Social media feed updates

Analyze the provided diff and return a JSON response with:
{
  "score": 0-100 (how meaningful the change is),
  "isMeaningful": true/false,
  "reasoning": "Brief explanation of your decision"
}`;
                                        setAiSystemPrompt(defaultPrompt)
                                    }}
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
                        size="md"
                        className="px-3 py-2"
                    >
                        Save AI Settings
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AiAnalysis;
'use client'

import { useState } from 'react'
import { Button } from '@/components/common/button'
import { X } from 'lucide-react'
import { Label } from '@/components/common/label';
import { FileText, Network } from 'lucide-react'

export default function WebsiteSettingsModal({ isOpen, onClose, url, onSave, }) {
    const [checkInterval, setCheckInterval] = useState('1 hour')
    const [monitorType, setMonitorType] = useState('single')
    const [notificationType, setNotificationType] = useState('none')

    const handleSave = () => {
        const newWebsite = {
            url,
            checkInterval,
            monitorType,
            notificationType,
        }
        // error("")
        onSave(newWebsite)
        onClose()
         // Reset error state after save
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl flex flex-col">
                {/* Modal Header */}
                <div className="p-6 border-b flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">Website Settings</h2>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onClose}
                        className="w-8 h-8 p-0"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                {/* Modal Body */}
                <div className="space-y-6 p-6">
                    {/* Check Interval */}
                    <div className="border-b pb-6">
                        <h3 className="text-lg font-medium mb-4">Monitoring Configuration</h3>
                        <div className="mb-4">
                            <label className="block font-medium mb-2">Check Interval</label>
                            <select
                                value={checkInterval}
                                onChange={(e) => setCheckInterval(e.target.value)}
                                className="w-full border rounded-lg p-2"
                            >
                                <option>5 mins</option>
                                <option>15 mins</option>
                                <option>30 mins</option>
                                <option>1 hour</option>
                                <option>6 hours</option>
                                <option>12 hours</option>
                                <option>1 day</option>
                            </select>
                        </div>

                        {/* Monitor Type */}
                        <div className="mb-4">
                            <Label htmlFor="monitor-type">Monitor Type</Label>
                            <div className="grid grid-cols-2 gap-2 mt-1">
                                <button
                                    type="button"
                                    onClick={() => setMonitorType('single_page')}
                                    className={`p-3 rounded-lg border-2 transition-all ${monitorType === 'single_page'
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <FileText className={`h-5 w-5 mx-auto mb-1 ${monitorType === 'single_page' ? 'text-blue-600' : 'text-gray-500'
                                        }`} />
                                    <span className={`text-sm font-medium ${monitorType === 'single_page' ? 'text-blue-900' : 'text-gray-700'
                                        }`}>Single Page</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setMonitorType('full_site')}
                                    className={`p-3 rounded-lg border-2 transition-all ${monitorType === 'full_site'
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <Network className={`h-5 w-5 mx-auto mb-1 ${monitorType === 'full_site' ? 'text-blue-600' : 'text-gray-500'
                                        }`} />
                                    <span className={`text-sm font-medium ${monitorType === 'full_site' ? 'text-blue-900' : 'text-gray-700'
                                        }`}>Full Site</span>
                                </button>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">
                                {monitorType === 'single_page'
                                    ? 'Monitor changes on a specific page URL'
                                    : 'Crawl and monitor multiple pages across the entire website'}
                            </p>
                        </div>

                        {/* Notification Type */}
                        <div>
                            <label className="block font-medium mb-2">Notification Type</label>
                            <select
                                value={notificationType}
                                onChange={(e) => setNotificationType(e.target.value)}
                                className="w-full border rounded-lg p-2"
                            >
                                <option value="none">No notifications</option>
                                <option value="email">Email</option>
                                <option value="slack">Slack</option>
                                <option value="webhook">Webhook</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t flex justify-end gap-3">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="blue" onClick={handleSave}>
                        Save Settings
                    </Button>
                </div>
            </div>
        </div>
    )
}

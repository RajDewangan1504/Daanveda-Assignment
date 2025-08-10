


'use client'

import { useState, useEffect } from 'react'
import { Layout, MainContent, Footer } from '@/components/layout/layout.js'
import { Hero } from '@/components/layout/hero'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Header } from '@/components/layout/header'
import { X, Search, Maximize2, Minimize2, Bot } from 'lucide-react'

export default function HomePage() {
  const [url, setUrl] = useState('')
  const [checkLogFilter, setCheckLogFilter] = useState('all')
  const [expandedPanel, setExpandedPanel] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const handleAddWebsite = () => {
    // Add website logic here
  }

  return (
    <Layout>
          <Header ctaHref="https://github.com/new?template_name=firecrawl-observer&template_owner=your-org" />
      <Hero
        title={
          <div className="flex flex-col leading-none">
            <span className="bg-gradient-to-tr from-blue-900 to-blue-600 bg-clip-text text-transparent">
              Firecrawl
            </span>
            <span className="text-black">
              Observer
            </span>
          </div>
        }
        subtitle="Monitor websites with Firecrawl change tracking"
      />
      <MainContent maxWidth="7xl" className="py-12">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Add New Website</h3>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleAddWebsite()
              }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" variant="blue" size="sm">
                  add website
                </Button>
              </div>
            </form>
            <p className="text-xs text-gray-500 mt-2">
              Configure monitor type, check intervals, and notifications after adding
            </p>
          </div>
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm flex flex-col">
                <div className="p-6 border-b flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">Currently Tracked Websites</h3>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setExpandedPanel(expandedPanel === 'websites' ? null : 'websites')}
                        className="w-8 h-8 p-0 bg-black text-white border-black rounded-[10px] [box-shadow:inset_0px_-2px_0px_0px_#18181b,_0px_1px_6px_0px_rgba(24,_24,_27,_58%)] hover:translate-y-[1px] hover:scale-[0.98] hover:[box-shadow:inset_0px_-1px_0px_0px_#18181b,_0px_1px_3px_0px_rgba(24,_24,_27,_40%)] active:translate-y-[2px] active:scale-[0.97] active:[box-shadow:inset_0px_1px_1px_0px_#18181b,_0px_1px_2px_0px_rgba(24,_24,_27,_30%)] transition-all duration-200"
                        title={expandedPanel === 'websites' ? "Minimize" : "Expand"}
                      >
                        {expandedPanel === 'websites' ? (
                          <Minimize2 className="h-4 w-4 text-white" />
                        ) : (
                          <Maximize2 className="h-4 w-4 text-white" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                      </div>
                      <Input
                        type="text"
                        placeholder="Search by name or URL..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm flex flex-col">
                <div className="p-6 border-b flex-shrink-0">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold">Change Tracking Log</h3>
                    <div className="flex items-center gap-2">
                      <Button
                        variant={checkLogFilter === 'all' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setCheckLogFilter('all')}
                      >
                        All
                      </Button>
                      <Button
                        variant={checkLogFilter === 'changed' ? 'blue' : 'outline'}
                        size="sm"
                        onClick={() => setCheckLogFilter('changed')}
                      >
                        Changed Only
                      </Button>
                      <Button
                        variant={checkLogFilter === 'meaningful' ? 'blue' : 'outline'}
                        size="sm"
                        onClick={() => setCheckLogFilter('meaningful')}
                        className="flex items-center gap-1"
                      >
                        <Bot className="h-3 w-3" />
                        Meaningful
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setExpandedPanel(expandedPanel === 'changes' ? null : 'changes')}
                        className="w-8 h-8 p-0 bg-black text-white border-black rounded-[10px] [box-shadow:inset_0px_-2px_0px_0px_#18181b,_0px_1px_6px_0px_rgba(24,_24,_27,_58%)] hover:translate-y-[1px] hover:scale-[0.98] hover:[box-shadow:inset_0px_-1px_0px_0px_#18181b,_0px_1px_3px_0px_rgba(24,_24,_27,_40%)] active:translate-y-[2px] active:scale-[0.97] active:[box-shadow:inset_0px_1px_1px_0px_#18181b,_0px_1px_2px_0px_rgba(24,_24,_27,_30%)] transition-all duration-200"
                        title={expandedPanel === 'changes' ? "Minimize" : "Expand"}
                      >
                        {expandedPanel === 'changes' ? (
                          <Minimize2 className="h-4 w-4 text-white" />
                        ) : (
                          <Maximize2 className="h-4 w-4 text-white" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Search Input */}
                  <div className="mt-4">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                      </div>
                      <Input
                        type="text"
                        placeholder="Search changes by website name, title, or description..."
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainContent>

      {expandedPanel && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity duration-300"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setExpandedPanel(null)
            }
          }}
        >
          <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-[90vh] flex flex-col animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-2xl font-semibold">
                {expandedPanel === 'websites' ? 'Currently Tracked Websites' : 'Change Tracking Log'}
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setExpandedPanel(null)}
                className="w-8 h-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-hidden">
              {expandedPanel === 'websites' ? (
                <div className="h-full flex flex-col">
                  <div className="p-6 border-b">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                      </div>
                      <Input
                        type="text"
                        placeholder="Search by name or URL..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col">
                  <div className="p-6 border-b">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant={checkLogFilter === 'all' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setCheckLogFilter('all')}
                        >
                          All
                        </Button>
                        <Button
                          variant={checkLogFilter === 'changed' ? 'blue' : 'outline'}
                          size="sm"
                          onClick={() => setCheckLogFilter('changed')}
                        >
                          Changed Only
                        </Button>
                        <Button
                          variant={checkLogFilter === 'meaningful' ? 'blue' : 'outline'}
                          size="sm"
                          onClick={() => setCheckLogFilter('meaningful')}
                          className="flex items-center gap-1"
                        >
                          <Bot className="h-3 w-3" />
                          Meaningful
                        </Button>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                      </div>
                      <Input
                        type="text"
                        placeholder="Search changes by website name, title, or description..."
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </Layout>
  )
}
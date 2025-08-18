
'use client'

import { useState, useEffect } from 'react'
import { Hero } from '@/components/hero'
import { Button } from '@/components/common/button'
import { Input } from '@/components/common/input'
import { Header } from '@/components/header'
import { X, Search, Maximize2, Minimize2, Bot, RefreshCw, Pause, Settings, Loader2, LogIn, Globe } from 'lucide-react'
import WebsiteModal from '@/components/AddwebsiteModel.js'

import { useRouter } from 'next/navigation'

export default function HomePage() {
  const [url, setUrl] = useState('')
  const [checkLogFilter, setCheckLogFilter] = useState('all')
  const [expandedPanel, setExpandedPanel] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [changeLogs, setChangeLogs] = useState([]);
  const [error, setError] = useState("")


  useEffect(() => {
    const savedUser = localStorage.getItem('authUser')
    if (savedUser) setIsAuthenticated(true)
  }, [])

  // 🔹 Websites list state
  const [websites, setWebsites] = useState([
    {
      id: 1,
      name: 'Example',
      url: 'https://example.com',
      type: 'Full Site',
      status: 'Active',
      lastChecked: '44 mins ago',
      changes: 'No changes'
    }
  ])

 useEffect(() => { 
 
    if (!url) setError("")
   

 },[url])


const handleSaveWebsite = (newWebsite) => {
  let formattedUrl = url.trim()

  // Auto-prepend https:// if missing
  if (formattedUrl && !/^https?:\/\//i.test(formattedUrl)) {
    formattedUrl = "https://" + formattedUrl
  }

  try {
    // Validate with URL constructor
    const parsedUrl = new URL(formattedUrl)

    // Extra check: must have a valid hostname with a dot
    if (!parsedUrl.hostname.includes(".")) {
      throw new Error("Invalid hostname")
    }

    // Clear error if valid
    setError("")

    const newEntry = {
      id: Date.now(),
      name: newWebsite.name || parsedUrl.hostname.replace(/^www\./, ""),
      url: parsedUrl.href,
      type: "Single Page",
      status: "Active",
      lastChecked: "Just now",
      changes: "Setting up monitoring...",
    }

    // Add to websites
    setWebsites((prev) => [...prev, newEntry])

    // Add to change logs
    setChangeLogs((prev) => [
      {
        id: Date.now(),
        siteId: newEntry.id,
        name: newEntry.name,
        url: newEntry.url,
        status: newEntry.status,
        changes: "Website added & monitoring started",
        time: new Date().toLocaleString(),
      },
      ...prev,
    ])

    // ✅ Reset only after success
    setUrl("")
    setIsModalOpen(true)

  } catch (err) {
    // ❌ Keep modal open and show error
    setError("Please enter a valid website URL (e.g., https://example.com)")
  }
}






  useEffect(() => {
    const savedUser = localStorage.getItem('authUser')
    if (savedUser) setIsAuthenticated(true)
  }, [])


  const router = useRouter()


  useEffect(() => {
    const savedUser = localStorage.getItem('authUser')
    if (!savedUser) {
      router.push('/login')
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  return (
    // <Layout>
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <Header />
      <Hero
        title={
          <div className="flex flex-col leading-none">
            <span className="bg-gradient-to-tr from-blue-900 to-blue-600 bg-clip-text text-transparent">
              Firecrawl
            </span>
            <span className="text-black">Observer</span>
          </div>
        }
        subtitle="Monitor websites with Firecrawl change tracking"
      />

      <div maxWidth="7xl" className="py-12">
        <div className="space-y-6">
          {/* Add Website Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-4">Add New Website</h3>
        

            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSaveWebsite({})
                // handleAddWebsite()
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
                <Button className="p-4" type="submit" variant="blue" size="sm">
                  Start Observing
                </Button>
              </div>

             
            </form>

            <p className="text-xs text-gray-500 mt-2">
              Configure monitor type, check intervals, and notifications after adding
            </p>
          </div>

          {/* Currently Tracked Websites */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm">
                {/* Header */}
                <div className="p-6 border-b flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Currently Tracked Websites</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 text-sm">{websites.length} sites</span>
                    <Button
                      variant="blue"
                      size="sm"
                      className="flex items-center gap-2"
                      onClick={() => {
                        // update websites
                        setWebsites((prev) =>
                          prev.map((site) => ({
                            ...site,
                            lastChecked: "Just now",
                            changes: "No changes",
                          }))
                        );

                        // add all sites to change logs
                        setChangeLogs((prev) => [
                          ...websites.map((site) => ({
                            id: Date.now() + site.id, // unique id
                            siteId: site.id,
                            name: site.name,
                            url: site.url,
                            status: site.status,
                            changes: "No changes",
                            time: new Date().toLocaleString(),
                          })),
                          ...prev,
                        ]);
                      }}
                    >
                      <RefreshCw className="w-4 h-4" />
                      Check All
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-9 h-9 p-0 bg-black text-white border-black rounded-lg hover:bg-white hover:text-black"
                      onClick={() =>
                        setExpandedPanel(expandedPanel === "websites" ? null : "websites")
                      }
                    >
                      {expandedPanel === "websites" ? (
                        <Minimize2 className="h-4 w-4 " />
                      ) : (
                        <Maximize2 className="h-4 w-4 " />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Search */}
                <div className="p-4 border-b">
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

                {/* Websites List */}
                <ul>
                  {websites
                    .filter(
                      (site) =>
                        site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        site.url.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((site) => (
                      <li
                        key={site.id}
                        className="p-6 border-b flex items-center justify-between"
                      >
                        {/* Left Side */}
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <Globe className="w-6 h-6 text-gray-400" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{site.name}</h4>
                              <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-600 font-medium">
                                {site.type}
                              </span>
                              <span className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-600 font-medium">
                                {site.status}
                              </span>
                            </div>
                            <a
                              href={site.url}
                              target="_blank"
                              className="text-sm text-blue-600 block"
                            >
                              {site.url}
                            </a>
                            <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                              <span className="flex items-center gap-1 text-green-600">
                                ● {site.changes}
                              </span>
                              <span>Checked {site.lastChecked}</span>
                              <span>Every 1 hour</span>
                            </div>
                          </div>
                        </div>

                        {/* Right Side Actions */}
                        <div className="flex flex-col items-center gap-2">
                          <div className=' flex gap-2'>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-9 h-9 p-0 bg-black text-white border-black rounded-lg hover:bg-white hover:text-black"
                            >
                              <Pause className="h-4 w-4" />
                            </Button>

                            <Button
                              variant="outline"
                              size="sm"
                              className="w-9 h-9 p-0 bg-black text-white border-black rounded-lg hover:bg-white hover:text-black"
                            >
                              <Settings className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                setWebsites((prev) => prev.filter((w) => w.id !== site.id))
                              }
                              className="w-9 h-9 p-0 bg-black text-white border-black rounded-lg hover:bg-white hover:text-black"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <div>
                            <Button
                              variant="blue"
                              size="sm"
                              onClick={() => {
                                const updatedSite = {
                                  ...site,
                                  lastChecked: "Just now",
                                  changes: "No changes",
                                };

                                // update websites
                                setWebsites((prev) =>
                                  prev.map((w) => (w.id === site.id ? updatedSite : w))
                                );

                                // add to change logs
                                setChangeLogs((prev) => [
                                  {
                                    id: Date.now(),
                                    siteId: site.id,
                                    name: site.name,
                                    url: site.url,
                                    status: updatedSite.status,
                                    changes: updatedSite.changes,
                                    time: new Date().toLocaleString(),
                                  },
                                  ...prev, // keep latest log at top
                                ]);
                              }}
                              className="flex items-center gap-2"
                            >
                              <RefreshCw className="w-4 h-4" />
                              Check Now
                            </Button>

                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
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
                        className="w-9 h-9 p-0 bg-black text-white border-black rounded-lg hover:bg-white hover:text-black"
                        title={expandedPanel === 'changes' ? "Minimize" : "Expand"}
                      >
                        {expandedPanel === 'changes' ? (
                          <Minimize2 className="h-4 w-4 " />
                        ) : (
                          <Maximize2 className="h-4 w-4" />
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

                  <div className="p-6 border-t">
                    <ul className="divide-y">
                      {changeLogs
                        .filter((log) => {
                          if (checkLogFilter === "changed") return log.changes !== "No changes";
                          if (checkLogFilter === "meaningful")
                            return log.changes && log.changes !== "No changes";
                          return true;
                        })
                        .map((log) => (
                          <li key={log.id} className="py-4 flex justify-between">

                            <div className='flex flex-row items-center  gap-6'>
                              <div className='flex items-center  gap-2'>
                                <Globe className="w-6 h-6 text-gray-400" />
                              </div>
                              <div>
                                <h4 className="font-medium">{log.name}</h4>
                                <a href={log.url} target="_blank" className="text-sm text-blue-600">
                                  {log.url}
                                </a>
                                <div className="text-xs text-gray-500">
                                  {log.changes} • {log.time}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center  gap-2">
                              <span className="text-xs  bg-green-100 text-blue-600 px-2 py-1 rounded">
                                {log.status}
                              </span>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* {expandedPanel && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity duration-300"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setExpandedPanel(null)
            }
          }}
        >
          <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-[90vh] flex flex-col animate-in zoom-in-95 duration-300">
          
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
      )} */}

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

            {/* Header */}
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-2xl font-semibold">
                {expandedPanel === 'websites'
                  ? 'Currently Tracked Websites'
                  : 'Change Tracking Log'}
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

            {/* Content */}
            <div className="flex-1 overflow-hidden">
              {expandedPanel === 'websites' ? (
                <div className="h-full flex flex-col">
                  {/* Search */}
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

                  {/* Websites list */}
                  <div className="flex-1 overflow-y-auto p-2">
                    <ul className="divide-y">
                      {websites
                        .filter(
                          (site) =>
                            site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            site.url.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((site) => (
                          <li
                            key={site.id}
                            className="p-6 border-b flex items-center justify-between"
                          >
                            {/* Left Side */}
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                <Globe className="w-6 h-6 text-gray-400" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-semibold">{site.name}</h4>
                                  <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-600 font-medium">
                                    {site.type}
                                  </span>
                                  <span className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-600 font-medium">
                                    {site.status}
                                  </span>
                                </div>
                                <a
                                  href={site.url}
                                  target="_blank"
                                  className="text-sm text-blue-600 block"
                                >
                                  {site.url}
                                </a>
                                <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                                  <span className="flex items-center gap-1 text-green-600">
                                    ● {site.changes}
                                  </span>
                                  <span>Checked {site.lastChecked}</span>
                                  <span>Every 1 hour</span>
                                </div>
                              </div>
                            </div>

                            {/* Right Side Actions */}
                            <div className="flex flex-col items-center gap-2">
                              <div className=' flex gap-2'>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-9 h-9 p-0 bg-black text-white border-black rounded-lg hover:bg-white hover:text-black"
                                >
                                  <Pause className="h-4 w-4" />
                                </Button>

                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-9 h-9 p-0 bg-black text-white border-black rounded-lg hover:bg-white hover:text-black"
                                >
                                  <Settings className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    setWebsites((prev) => prev.filter((w) => w.id !== site.id))
                                  }
                                  className="w-9 h-9 p-0 bg-black text-white border-black rounded-lg hover:bg-white hover:text-black"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                              <div>
                                <Button
                                  variant="blue"
                                  size="sm"
                                  onClick={() => {
                                    const updatedSite = {
                                      ...site,
                                      lastChecked: "Just now",
                                      changes: "No changes",
                                    };

                                    // update websites
                                    setWebsites((prev) =>
                                      prev.map((w) => (w.id === site.id ? updatedSite : w))
                                    );

                                    // add to change logs
                                    setChangeLogs((prev) => [
                                      {
                                        id: Date.now(),
                                        siteId: site.id,
                                        name: site.name,
                                        url: site.url,
                                        status: updatedSite.status,
                                        changes: updatedSite.changes,
                                        time: new Date().toLocaleString(),
                                      },
                                      ...prev, // keep latest log at top
                                    ]);
                                  }}
                                  className="flex items-center gap-2"
                                >
                                  <RefreshCw className="w-4 h-4" />
                                  Check Now
                                </Button>

                              </div>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col">
                  {/* Filters + search */}
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
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Change logs list */}
                  <div className="flex-1 overflow-y-auto p-6">
                    <ul className="divide-y">
                      {changeLogs
                        .filter((log) => {
                          if (checkLogFilter === 'changed') return log.changes !== "No changes"
                          if (checkLogFilter === 'meaningful')
                            return log.changes && log.changes !== "No changes"
                          return true
                        })
                        .filter(
                          (log) =>
                            log.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            log.url.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((log) => (
                          <li key={log.id} className="py-4 flex justify-between border-t-2 border-gray-200">

                            <div className='flex flex-row items-center  gap-6'>
                              <div className='flex items-center  gap-2'>
                                <Globe className="w-6 h-6 text-gray-400" />
                              </div>
                              <div>
                                <h4 className="font-medium">{log.name}</h4>
                                <a href={log.url} target="_blank" className="text-sm text-blue-600">
                                  {log.url}
                                </a>
                                <div className="text-xs text-gray-500">
                                  {log.changes} • {log.time}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center  gap-2">
                              <span className="text-xs  bg-green-100 text-blue-600 px-2 py-1 rounded">
                                {log.status}
                              </span>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}


      {/* Modal */}
      <WebsiteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        // url={url}
        onSave={handleSaveWebsite}
        // error={setError}
      />

      {/* <Footer /> */}
    </div>
    
  )
}

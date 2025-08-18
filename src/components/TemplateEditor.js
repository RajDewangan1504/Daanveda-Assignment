'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { Button } from '@/components/common/button'
import { Bold, Italic, List, ListOrdered, Code, Undo, Redo, Variable } from 'lucide-react'
import { useState } from 'react'

const availableVariables = [
  { name: '{{websiteName}}', description: 'Name of the website' },
  { name: '{{websiteUrl}}', description: 'URL of the website' },
  { name: '{{changeDate}}', description: 'Date and time of the change' },
  { name: '{{changeType}}', description: 'Type of change (changed, new, etc.)' },
  { name: '{{pageTitle}}', description: 'Title of the page that changed' },
  { name: '{{viewChangesUrl}}', description: 'Link to view changes in the app' },
]

export function EmailTemplateEditor({ value, onChange, disabled }) {
  const [showVariables, setShowVariables] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write your email template here...',
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editable: !disabled,
    immediatelyRender: false,
  })

  if (!editor) {
    return null
  }

  const insertVariable = (variable) => {
    editor.chain().focus().insertContent(variable).run()
    setShowVariables(false)
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="border-b bg-gray-50 p-2">
        <div className="flex items-center gap-1 flex-wrap">
          <Button
            size="sm"
            variant="outline"
            disabled={disabled}
            className={`h-8 w-8 p-0 ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={disabled}
            className={`h-8 w-8 p-0 ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={disabled}
            className={`h-8 w-8 p-0 ${editor.isActive('code') ? 'bg-gray-200' : ''}`}
          >
            <Code className="h-4 w-4" />
          </Button>
          <div className="w-px h-6 bg-gray-300 mx-1" />
          <Button
            size="sm"
            variant="outline"
            disabled={disabled}
            className={`h-8 w-8 p-0 ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={disabled}
            className={`h-8 w-8 p-0 ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
          <div className="w-px h-6 bg-gray-300 mx-1" />
          <Button
            size="sm"
            variant="outline"
            disabled={disabled || !editor.can().undo()}
            className="h-8 w-8 p-0"
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={disabled || !editor.can().redo()}
            className="h-8 w-8 p-0"
          >
            <Redo className="h-4 w-4" />
          </Button>
          <div className="w-px h-6 bg-gray-300 mx-1" />
          <div className="relative">
            {showVariables && (
              <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg p-2 z-10 w-64">
                <div className="text-xs font-medium mb-2 text-gray-700">Click to insert:</div>
                {availableVariables.map((variable) => (
                  <button
                    key={variable.name}
                    onClick={() => insertVariable(variable.name)}
                    className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded text-sm"
                  >
                    <code className="text-blue-600">{variable.name}</code>
                    <div className="text-xs text-gray-500">{variable.description}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <EditorContent
        editor={editor}
        className="prose prose-sm max-w-none p-4 min-h-[200px] focus:outline-none"
      />
    </div>
  )
}
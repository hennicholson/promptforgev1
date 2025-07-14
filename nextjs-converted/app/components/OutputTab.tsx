'use client'

import { useState, useRef, useEffect } from 'react'
import { useAppContext } from '../lib/store'

interface OutputTabProps {
  showNotification: (message: string, type: string) => void
}

export default function OutputTab({ showNotification }: OutputTabProps) {
  const [editMode, setEditMode] = useState(false)
  const [editorContent, setEditorContent] = useState('')
  const [validationStatus, setValidationStatus] = useState<'valid' | 'invalid' | ''>('')
  const editorRef = useRef<HTMLPreElement>(null)
  const { output, updateOutput, lastValidJSON } = useAppContext()
  
  useEffect(() => {
    setEditorContent(JSON.stringify(output || {
      prompt: "No prompt generated yet",
      tip: "Use the Create tab to generate a prompt"
    }, null, 2))
  }, [output])
  
  const toggleEditMode = () => {
    if (!editMode) {
      setEditMode(true)
      showNotification('Edit mode enabled', 'info')
    } else {
      if (validateJSON()) {
        setEditMode(false)
        showNotification('Changes saved', 'success')
      } else {
        if (!confirm('JSON has errors. Continue editing?')) {
          setEditorContent(JSON.stringify(lastValidJSON, null, 2))
          setEditMode(false)
        }
      }
    }
  }
  
  const validateJSON = () => {
    try {
      const json = JSON.parse(editorContent)
      updateOutput(json)
      setValidationStatus('valid')
      showNotification('JSON is valid', 'success')
      return true
    } catch (e) {
      setValidationStatus('invalid')
      showNotification(`JSON Error: ${e instanceof Error ? e.message : 'Invalid JSON'}`, 'error')
      return false
    }
  }
  
  const validateOnEdit = () => {
    try {
      JSON.parse(editorContent)
      setValidationStatus('valid')
    } catch (e) {
      setValidationStatus('invalid')
    }
  }
  
  const formatJSON = () => {
    try {
      const json = JSON.parse(editorContent)
      setEditorContent(JSON.stringify(json, null, 2))
      showNotification('JSON formatted', 'success')
    } catch (e) {
      showNotification('Cannot format invalid JSON', 'error')
    }
  }
  
  const copyJSON = async () => {
    try {
      await navigator.clipboard.writeText(editorContent)
      showNotification('Copied to clipboard', 'success')
    } catch (e) {
      showNotification('Failed to copy', 'error')
    }
  }
  
  const downloadJSON = () => {
    const blob = new Blob([editorContent], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `prompt-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }
  
  return (
    <div className="tab-content active">
      <div className="output-container">
        <div className="output-header">
          <h2 className="output-title">Generated JSON</h2>
          <div className="output-toolbar">
            <button 
              className={`tool-btn ${editMode ? 'active' : ''}`}
              onClick={toggleEditMode}
            >
              {editMode ? '💾 Save' : '✏️ Edit'}
            </button>
            <button className="tool-btn" onClick={formatJSON}>
              🎨 Format
            </button>
            <button className="tool-btn" onClick={validateJSON}>
              ✓ Validate
            </button>
            <button className="tool-btn" onClick={copyJSON}>
              📋 Copy
            </button>
            <button className="tool-btn" onClick={downloadJSON}>
              ⬇️ Download
            </button>
          </div>
        </div>
        <div className="output-editor">
          <pre 
            ref={editorRef}
            id="jsonEditor" 
            className="json-editor" 
            contentEditable={editMode}
            onInput={(e) => {
              setEditorContent(e.currentTarget.textContent || '')
              if (editMode) validateOnEdit()
            }}
            suppressContentEditableWarning={true}
          >
            {editorContent}
          </pre>
          {validationStatus && (
            <div className={`editor-status ${validationStatus}`}>
              {validationStatus === 'valid' ? 'Valid' : 'Invalid'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
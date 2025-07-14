'use client'

import { useRef } from 'react'
import { useAppContext } from '../lib/store'

interface LibraryTabProps {
  onLoadItem: () => void
  showNotification: (message: string, type: string) => void
}

export default function LibraryTab({ onLoadItem, showNotification }: LibraryTabProps) {
  const { library, updateOutput, removeFromLibrary, clearLibrary } = useAppContext()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const loadLibraryItem = (id: number) => {
    const item = library.find(i => i.id === id)
    if (item) {
      updateOutput(item.json)
      onLoadItem()
      showNotification('Prompt loaded', 'success')
    }
  }
  
  const deleteLibraryItem = (id: number) => {
    if (confirm('Delete this prompt?')) {
      removeFromLibrary(id)
      showNotification('Prompt deleted', 'info')
    }
  }
  
  const importPrompt = () => {
    fileInputRef.current?.click()
  }
  
  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target?.result as string)
          updateOutput(json)
          onLoadItem()
          showNotification('Prompt imported', 'success')
        } catch (error) {
          showNotification('Invalid JSON file', 'error')
        }
      }
      reader.readAsText(file)
    }
  }
  
  const handleClearLibrary = () => {
    if (confirm('Clear all saved prompts? This cannot be undone.')) {
      clearLibrary()
      showNotification('Library cleared', 'info')
    }
  }
  
  return (
    <div className="tab-content active">
      <div className="library-container">
        <div className="library-header">
          <h2 className="library-title">Your Saved Prompts</h2>
          <div className="library-actions">
            <button className="action-btn" onClick={importPrompt}>
              📥 Import
            </button>
            <button className="action-btn" onClick={handleClearLibrary}>
              🗑️ Clear All
            </button>
          </div>
        </div>
        <div className="library-grid" id="libraryGrid">
          {library.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
              No saved prompts yet
            </p>
          ) : (
            library.map(item => (
              <div key={item.id} className="library-item">
                <h4>{item.title}</h4>
                <p className="library-item-date">{item.date}</p>
                <p className="library-item-preview">{item.preview}</p>
                <div className="library-item-actions">
                  <button 
                    className="item-action" 
                    onClick={() => loadLibraryItem(item.id)} 
                    title="Load"
                  >
                    📂
                  </button>
                  <button 
                    className="item-action" 
                    onClick={() => deleteLibraryItem(item.id)} 
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          style={{ display: 'none' }}
          onChange={handleFileImport}
        />
      </div>
    </div>
  )
}
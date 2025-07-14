'use client'

import { useState, useEffect } from 'react'

interface ApiKeyModalProps {
  isOpen: boolean
  onClose: () => void
  showNotification: (message: string, type: string) => void
}

export default function ApiKeyModal({ isOpen, onClose, showNotification }: ApiKeyModalProps) {
  const [apiKey, setApiKey] = useState('')
  
  useEffect(() => {
    if (isOpen) {
      const savedKey = localStorage.getItem('geminiApiKey')
      if (savedKey) {
        setApiKey(savedKey)
      }
    }
  }, [isOpen])
  
  const saveApiKey = () => {
    const key = apiKey.trim()
    if (key) {
      localStorage.setItem('geminiApiKey', key)
      window.dispatchEvent(new Event('storage'))
      onClose()
      showNotification('API key saved successfully!', 'success')
    }
  }
  
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }
  
  if (!isOpen) return null
  
  return (
    <div className="modal active" onClick={handleBackgroundClick}>
      <div className="modal-dialog">
        <div className="modal-header">
          <h3>🔑 Gemini API Key</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <p className="modal-text">
            Enter your free Gemini API key to unlock AI-powered prompt generation.
          </p>
          <input 
            type="password" 
            className="api-key-input" 
            placeholder="Your Gemini API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && saveApiKey()}
          />
          <div className="api-key-help">
            <a 
              href="https://aistudio.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="help-link"
            >
              Get your free API key →
            </a>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-save" onClick={saveApiKey}>Save Key</button>
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}
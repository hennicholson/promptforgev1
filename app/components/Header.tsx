'use client'

import { useEffect, useState } from 'react'

interface HeaderProps {
  onApiKeyClick: () => void
}

export default function Header({ onApiKeyClick }: HeaderProps) {
  const [hasApiKey, setHasApiKey] = useState(false)
  
  useEffect(() => {
    const checkApiKey = () => {
      const savedKey = localStorage.getItem('geminiApiKey')
      setHasApiKey(!!savedKey)
    }
    
    checkApiKey()
    window.addEventListener('storage', checkApiKey)
    
    return () => window.removeEventListener('storage', checkApiKey)
  }, [])
  
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="app-branding">
          <h1 className="app-title">PROMPT FORGE</h1>
          <p className="app-tagline">AI Image Prompt Designer</p>
        </div>
        <div className="header-actions">
          <button className="api-key-btn" onClick={onApiKeyClick}>
            <span className={`api-status ${hasApiKey ? 'active' : ''}`} id="apiStatus">
              {hasApiKey ? '✅' : '🔑'}
            </span>
            <span className="api-text">API KEY</span>
          </button>
        </div>
      </div>
    </header>
  )
}
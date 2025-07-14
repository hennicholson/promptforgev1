'use client'

import { useState } from 'react'
import { authService } from '../lib/auth'

interface LicenseModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  showNotification: (message: string, type: string) => void
}

export default function LicenseModal({ isOpen, onClose, onSuccess, showNotification }: LicenseModalProps) {
  const [licenseKey, setLicenseKey] = useState('')
  const [isValidating, setIsValidating] = useState(false)
  const [showDemo, setShowDemo] = useState(false)
  
  const validateLicense = async () => {
    const key = licenseKey.trim().toUpperCase()
    if (!key) {
      showNotification('Please enter a license key', 'error')
      return
    }
    
    setIsValidating(true)
    
    try {
      const result = await authService.validateLicense(key)
      
      if (result.isValid) {
        onSuccess()
        onClose()
        showNotification('License activated successfully!', 'success')
      } else {
        showNotification('Invalid license key. Please check and try again.', 'error')
      }
    } catch (error) {
      showNotification('Failed to validate license. Please try again.', 'error')
    } finally {
      setIsValidating(false)
    }
  }
  
  const useDemoKey = () => {
    setLicenseKey('DEMO-2024-PROM-PT01')
  }
  
  const generateDemoKey = () => {
    const demoKey = authService.generateDemoKey()
    setLicenseKey(demoKey)
    showNotification('Demo key generated! Click Activate to use it.', 'info')
  }
  
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      // Don't allow closing if not authenticated
      if (authService.isAuthenticated()) {
        onClose()
      }
    }
  }
  
  if (!isOpen) return null
  
  return (
    <div className="modal active" onClick={handleBackgroundClick}>
      <div className="modal-dialog">
        <div className="modal-header">
          <h3>🔐 License Activation</h3>
          {authService.isAuthenticated() && (
            <button className="modal-close" onClick={onClose}>&times;</button>
          )}
        </div>
        <div className="modal-body">
          <p className="modal-text">
            Enter your Prompt Forge license key to access all features.
          </p>
          
          <div className="license-input-group">
            <input 
              type="text" 
              className="license-key-input" 
              placeholder="XXXX-XXXX-XXXX-XXXX"
              value={licenseKey}
              onChange={(e) => setLicenseKey(e.target.value.toUpperCase())}
              onKeyPress={(e) => e.key === 'Enter' && validateLicense()}
              maxLength={19}
            />
          </div>
          
          <div className="demo-section">
            <p className="demo-text">Don't have a license? Try these options:</p>
            <div className="demo-buttons">
              <button className="demo-btn" onClick={useDemoKey}>
                Use Demo Key
              </button>
              <button className="demo-btn" onClick={generateDemoKey}>
                Generate Test Key
              </button>
            </div>
          </div>
          
          {showDemo && (
            <div className="demo-info">
              <h4>Demo Features:</h4>
              <ul>
                <li>✅ AI Prompt Generation</li>
                <li>✅ Professional Templates</li>
                <li>✅ Library Management</li>
                <li>✅ JSON Export</li>
                <li>⏰ 30-day trial period</li>
              </ul>
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button 
            className={`btn-activate ${isValidating ? 'loading' : ''}`}
            onClick={validateLicense}
            disabled={isValidating}
          >
            {isValidating ? 'Validating...' : 'Activate License'}
          </button>
        </div>
      </div>
    </div>
  )
}
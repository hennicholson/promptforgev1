'use client'

import { useState, useEffect } from 'react'
import { authService } from '../lib/auth'

interface LicenseManagementProps {
  isOpen: boolean
  onClose: () => void
  showNotification: (message: string, type: string) => void
}

export default function LicenseManagement({ isOpen, onClose, showNotification }: LicenseManagementProps) {
  const [currentLicense, setCurrentLicense] = useState(authService.getCurrentLicense())
  const [licenseInfo, setLicenseInfo] = useState(authService.getLicenseInfo())
  const [newLicenseKey, setNewLicenseKey] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)
  
  useEffect(() => {
    if (isOpen) {
      setCurrentLicense(authService.getCurrentLicense())
      setLicenseInfo(authService.getLicenseInfo())
    }
  }, [isOpen])
  
  const updateLicense = async () => {
    const key = newLicenseKey.trim().toUpperCase()
    if (!key) {
      showNotification('Please enter a new license key', 'error')
      return
    }
    
    setIsUpdating(true)
    
    try {
      const result = await authService.validateLicense(key)
      
      if (result.isValid) {
        setCurrentLicense(result)
        setLicenseInfo(authService.getLicenseInfo())
        setNewLicenseKey('')
        showNotification('License updated successfully!', 'success')
      } else {
        showNotification('Invalid license key', 'error')
      }
    } catch (error) {
      showNotification('Failed to update license', 'error')
    } finally {
      setIsUpdating(false)
    }
  }
  
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }
  
  if (!isOpen || !currentLicense || !licenseInfo) return null
  
  return (
    <div className="modal active" onClick={handleBackgroundClick}>
      <div className="modal-dialog">
        <div className="modal-header">
          <h3>⚙️ License Management</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <div className="current-license">
            <h4>Current License</h4>
            <div className="license-details">
              <div className="license-row">
                <span className="license-label">Key:</span>
                <span className="license-value">{currentLicense.key}</span>
              </div>
              <div className="license-row">
                <span className="license-label">Status:</span>
                <span className={`license-value ${currentLicense.isValid ? 'valid' : 'invalid'}`}>
                  {currentLicense.isValid ? '✅ Active' : '❌ Invalid'}
                </span>
              </div>
              <div className="license-row">
                <span className="license-label">Expires:</span>
                <span className="license-value">
                  {licenseInfo.daysRemaining} days remaining
                </span>
              </div>
              <div className="license-row">
                <span className="license-label">User ID:</span>
                <span className="license-value">{currentLicense.userId}</span>
              </div>
            </div>
          </div>
          
          <div className="features-list">
            <h4>Enabled Features</h4>
            <div className="features-grid">
              {licenseInfo.features.map(feature => (
                <div key={feature} className="feature-item">
                  ✅ {feature.replace('_', ' ').toUpperCase()}
                </div>
              ))}
            </div>
          </div>
          
          <div className="update-license">
            <h4>Update License</h4>
            <input 
              type="text" 
              className="license-key-input" 
              placeholder="Enter new license key"
              value={newLicenseKey}
              onChange={(e) => setNewLicenseKey(e.target.value.toUpperCase())}
              maxLength={19}
            />
          </div>
        </div>
        <div className="modal-footer">
          <button 
            className={`btn-save ${isUpdating ? 'loading' : ''}`}
            onClick={updateLicense}
            disabled={isUpdating}
          >
            {isUpdating ? 'Updating...' : 'Update License'}
          </button>
          <button className="btn-cancel" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}
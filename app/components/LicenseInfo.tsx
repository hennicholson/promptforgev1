'use client'

import { useState, useEffect } from 'react'
import { authService } from '../lib/auth'

interface LicenseInfoProps {
  onManageLicense: () => void
}

export default function LicenseInfo({ onManageLicense }: LicenseInfoProps) {
  const [licenseInfo, setLicenseInfo] = useState<{daysRemaining: number; features: string[]} | null>(null)
  const [currentLicense, setCurrentLicense] = useState(authService.getCurrentLicense())
  
  useEffect(() => {
    const info = authService.getLicenseInfo()
    setLicenseInfo(info)
    setCurrentLicense(authService.getCurrentLicense())
  }, [])
  
  const handleLogout = () => {
    if (confirm('Are you sure you want to logout? You will need to re-enter your license key.')) {
      authService.logout()
    }
  }
  
  if (!licenseInfo || !currentLicense) return null
  
  const getStatusColor = () => {
    if (licenseInfo.daysRemaining <= 3) return 'var(--error)'
    if (licenseInfo.daysRemaining <= 7) return 'var(--accent)'
    return 'var(--success)'
  }
  
  return (
    <div className="license-info">
      <div className="license-status">
        <span className="license-indicator" style={{ color: getStatusColor() }}>
          ●
        </span>
        <span className="license-text">
          {licenseInfo.daysRemaining} days remaining
        </span>
      </div>
      <div className="license-actions">
        <button className="license-btn" onClick={onManageLicense} title="Manage License">
          ⚙️
        </button>
        <button className="license-btn" onClick={handleLogout} title="Logout">
          🚪
        </button>
      </div>
    </div>
  )
}
'use client'

import { useEffect, useState } from 'react'
import { authService } from '../lib/auth'
import LicenseModal from './LicenseModal'

interface AuthGuardProps {
  children: React.ReactNode
  showNotification: (message: string, type: string) => void
}

export default function AuthGuard({ children, showNotification }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showLicenseModal, setShowLicenseModal] = useState(false)
  
  useEffect(() => {
    checkAuthentication()
  }, [])
  
  const checkAuthentication = () => {
    const license = authService.loadLicenseFromStorage()
    const authenticated = authService.isAuthenticated()
    
    setIsAuthenticated(authenticated)
    setShowLicenseModal(!authenticated)
    setIsLoading(false)
    
    if (authenticated && license) {
      const info = authService.getLicenseInfo()
      if (info && info.daysRemaining <= 7) {
        showNotification(
          `License expires in ${info.daysRemaining} days`, 
          'error'
        )
      }
    }
  }
  
  const handleLicenseSuccess = () => {
    setIsAuthenticated(true)
    setShowLicenseModal(false)
  }
  
  if (isLoading) {
    return (
      <div className="auth-loading">
        <div className="loading-spinner"></div>
        <p>Loading Prompt Forge...</p>
      </div>
    )
  }
  
  if (!isAuthenticated) {
    return (
      <>
        <div className="auth-required">
          <div className="auth-content">
            <h1>🔐 License Required</h1>
            <p>Please activate your license to use Prompt Forge</p>
          </div>
        </div>
        <LicenseModal 
          isOpen={showLicenseModal}
          onClose={() => {}} // Don't allow closing without auth
          onSuccess={handleLicenseSuccess}
          showNotification={showNotification}
        />
      </>
    )
  }
  
  return <>{children}</>
}
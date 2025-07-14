'use client'

import { useEffect } from 'react'

interface NotificationProps {
  message: string
  type: string
  onClose: () => void
}

export default function Notification({ message, type, onClose }: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, type === 'error' ? 5000 : 3000)
    
    return () => clearTimeout(timer)
  }, [type, onClose])
  
  return (
    <div 
      className={`notification ${type}`}
      style={{ animation: 'slideIn 0.3s ease-out' }}
    >
      {message}
    </div>
  )
}
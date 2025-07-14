import { useState, useRef, useEffect } from 'react'
import { useAppContext } from '../lib/store'
import { authService } from '../lib/auth'

interface OutputTabProps {
}

const downloadJSON = () => {
    if (!authService.hasFeature('export')) {
      showNotification('Export not available in your license', 'error')
      return
    }
    
    const blob = new Blob([editorContent], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
}
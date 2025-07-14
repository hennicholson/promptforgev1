'use client'

import { useRef } from 'react'
import { useAppContext } from '../lib/store'
import { authService } from '../lib/auth'

interface LibraryTabProps {
}

const loadLibraryItem = (id: number) => {
    if (!authService.hasFeature('library')) {
        showNotification('Library not available in your license', 'error')
        return
    }
    
    const item = library.find(i => i.id === id)
    if (item) {
    }
}
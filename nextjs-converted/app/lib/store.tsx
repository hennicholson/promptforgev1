'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface LibraryItem {
  id: number
  title: string
  date: string
  json: any
  preview: string
}

interface CurrentTemplate {
  key: string
  category: string
  template: any
  name: string
  icon: string
}

interface AppContextType {
  // State
  preview: any
  output: any
  library: LibraryItem[]
  currentTemplate: CurrentTemplate | null
  lastValidJSON: any
  
  // Actions
  updatePreview: (json: any) => void
  updateOutput: (json: any) => void
  addToLibrary: (item: LibraryItem) => void
  removeFromLibrary: (id: number) => void
  clearLibrary: () => void
  setCurrentTemplate: (template: CurrentTemplate | null) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [preview, setPreview] = useState<any>(null)
  const [output, setOutput] = useState<any>(null)
  const [library, setLibrary] = useState<LibraryItem[]>([])
  const [currentTemplate, setCurrentTemplate] = useState<CurrentTemplate | null>(null)
  const [lastValidJSON, setLastValidJSON] = useState<any>(null)
  
  // Load library from localStorage on mount
  useEffect(() => {
    const savedLibrary = localStorage.getItem('promptForgeLibrary')
    if (savedLibrary) {
      try {
        setLibrary(JSON.parse(savedLibrary))
      } catch (e) {
        console.error('Failed to load library:', e)
      }
    }
  }, [])
  
  // Save library to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('promptForgeLibrary', JSON.stringify(library))
  }, [library])
  
  const updatePreview = (json: any) => {
    setPreview(json)
  }
  
  const updateOutput = (json: any) => {
    setOutput(json)
    setLastValidJSON(json)
  }
  
  const addToLibrary = (item: LibraryItem) => {
    setLibrary(prev => {
      const newLibrary = [item, ...prev]
      if (newLibrary.length > 50) {
        return newLibrary.slice(0, 50)
      }
      return newLibrary
    })
  }
  
  const removeFromLibrary = (id: number) => {
    setLibrary(prev => prev.filter(item => item.id !== id))
  }
  
  const clearLibrary = () => {
    setLibrary([])
  }
  
  const value: AppContextType = {
    preview,
    output,
    library,
    currentTemplate,
    lastValidJSON,
    updatePreview,
    updateOutput,
    addToLibrary,
    removeFromLibrary,
    clearLibrary,
    setCurrentTemplate
  }
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
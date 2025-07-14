'use client'

import { useState, useEffect } from 'react'
import Header from './components/Header'
import TabNavigation from './components/TabNavigation'
import CreateTab from './components/CreateTab'
import TemplatesTab from './components/TemplatesTab'
import OutputTab from './components/OutputTab'
import LibraryTab from './components/LibraryTab'
import ApiKeyModal from './components/ApiKeyModal'
import TemplateModal from './components/TemplateModal'
import Notification from './components/Notification'
import { AppProvider } from './lib/store'

export default function Home() {
  const [activeTab, setActiveTab] = useState('create')
  const [showApiKeyModal, setShowApiKeyModal] = useState(false)
  const [showTemplateModal, setShowTemplateModal] = useState(false)
  const [notification, setNotification] = useState<{message: string, type: string} | null>(null)

  useEffect(() => {
    // Check for API key on load
    const savedKey = localStorage.getItem('geminiApiKey')
    if (!savedKey) {
      setTimeout(() => setShowApiKeyModal(true), 1000)
    }
  }, [])

  const showNotification = (message: string, type: string = 'info') => {
    setNotification({ message, type })
  }

  return (
    <AppProvider>
      <div className="app-container">
        <Header onApiKeyClick={() => setShowApiKeyModal(true)} />
        
        <TabNavigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
        
        <main className="app-main">
          {activeTab === 'create' && (
            <CreateTab 
              onGenerateSuccess={() => setActiveTab('output')}
              showNotification={showNotification}
            />
          )}
          
          {activeTab === 'templates' && (
            <TemplatesTab 
              onTemplateSelect={() => setShowTemplateModal(true)}
              showNotification={showNotification}
            />
          )}
          
          {activeTab === 'output' && (
            <OutputTab showNotification={showNotification} />
          )}
          
          {activeTab === 'library' && (
            <LibraryTab 
              onLoadItem={() => setActiveTab('output')}
              showNotification={showNotification}
            />
          )}
        </main>
        
        {showApiKeyModal && (
          <ApiKeyModal 
            isOpen={showApiKeyModal}
            onClose={() => setShowApiKeyModal(false)}
            showNotification={showNotification}
          />
        )}
        
        {showTemplateModal && (
          <TemplateModal 
            isOpen={showTemplateModal}
            onClose={() => setShowTemplateModal(false)}
            onUseTemplate={() => {
              setShowTemplateModal(false)
              setActiveTab('output')
            }}
            showNotification={showNotification}
          />
        )}
        
        {notification && (
          <Notification 
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
      </div>
    </AppProvider>
  )
}
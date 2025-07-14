import ApiKeyModal from './components/ApiKeyModal'
import TemplateModal from './components/TemplateModal'
import Notification from './components/Notification'
import AuthGuard from './components/AuthGuard'
import LicenseManagement from './components/LicenseManagement'
import { AppProvider } from './lib/store'

export default function Home() {
  const [activeTab, setActiveTab] = useState('create')
  const [showApiKeyModal, setShowApiKeyModal] = useState(false)
  const [showTemplateModal, setShowTemplateModal] = useState(false)
  const [showLicenseModal, setShowLicenseModal] = useState(false)
  const [notification, setNotification] = useState<{message: string, type: string} | null>(null)

  useEffect(() => {
  })

  return (
    <AppProvider>
      <AuthGuard showNotification={showNotification}>
        <div className="app-container">
          <Header 
            onApiKeyClick={() => setShowApiKeyModal(true)}
            onLicenseClick={() => setShowLicenseModal(true)}
          />
          
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
          
          {showLicenseModal && (
            <LicenseManagement 
              isOpen={showLicenseModal}
              onClose={() => setShowLicenseModal(false)}
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
      </AuthGuard>
    </AppProvider>
  )
}
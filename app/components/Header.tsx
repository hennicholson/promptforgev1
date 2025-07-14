@@ .. @@
 'use client'

 import { useEffect, useState } from 'react'
+import { authService } from '../lib/auth'
+import LicenseInfo from './LicenseInfo'

 interface HeaderProps {
   onApiKeyClick: () => void
+  onLicenseClick: () => void
 }

-export default function Header({ onApiKeyClick }: HeaderProps) {
+export default function Header({ onApiKeyClick, onLicenseClick }: HeaderProps) {
   const [hasApiKey, setHasApiKey] = useState(false)
+  const [isAuthenticated, setIsAuthenticated] = useState(false)
   
   useEffect(() => {
     const checkApiKey = () => {
       const savedKey = localStorage.getItem('geminiApiKey')
       setHasApiKey(!!savedKey)
     }
     
+    const checkAuth = () => {
+      setIsAuthenticated(authService.isAuthenticated())
+    }
+    
     checkApiKey()
+    checkAuth()
     window.addEventListener('storage', checkApiKey)
     
-    return () => window.removeEventListener('storage', checkApiKey)
-  }, [])
+    return () => {
+      window.removeEventListener('storage', checkApiKey)
+    }
+  }, [])
   
   return (
     <header className="app-header">
@@ .. @@
         </div>
         <div className="header-actions">
+          {isAuthenticated && (
+            <LicenseInfo onManageLicense={onLicenseClick} />
+          )}
           <button className="api-key-btn" onClick={onApiKeyClick}>
             <span className={`api-status ${hasApiKey ? 'active' : ''}`} id="apiStatus">
               {hasApiKey ? '✅' : '🔑'}
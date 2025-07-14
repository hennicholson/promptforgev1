@@ .. @@
 import { useState } from 'react'
 import { useAppContext } from '../lib/store'
 import { professionalTemplates, templateHelpers } from '../lib/templates'
+import { authService } from '../lib/auth'

 interface TemplatesTabProps {
@@ .. @@
   }
   
   const previewTemplate = (category: string, key: string) => {
+    if (!authService.hasFeature('templates')) {
+      showNotification('Templates not available in your license', 'error')
+      return
+    }
+    
     const template = templateHelpers.getTemplate(category, key)
     if (!template) return
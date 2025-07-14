@@ .. @@
 'use client'

 import { useState, useRef } from 'react'
 import { useAppContext } from '../lib/store'
+import { authService } from '../lib/auth'

 declare global {
@@ .. @@
   const generatePrompt = async () => {
+    if (!authService.hasFeature('ai_generation')) {
+      showNotification('AI generation not available in your license', 'error')
+      return
+    }
+    
     const apiKey = localStorage.getItem('geminiApiKey')
     if (!apiKey) {
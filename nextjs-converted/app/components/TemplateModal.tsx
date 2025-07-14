'use client'

import { useState } from 'react'
import { useAppContext } from '../lib/store'
import { templateHelpers } from '../lib/templates'

interface TemplateModalProps {
  isOpen: boolean
  onClose: () => void
  onUseTemplate: () => void
  showNotification: (message: string, type: string) => void
}

export default function TemplateModal({ isOpen, onClose, onUseTemplate, showNotification }: TemplateModalProps) {
  const { currentTemplate, updateOutput, addToLibrary } = useAppContext()
  const [variables, setVariables] = useState<any>({})
  const [showVariables, setShowVariables] = useState(false)
  
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }
  
  const useTemplate = () => {
    if (currentTemplate) {
      updateOutput(currentTemplate.template)
      onUseTemplate()
      showNotification('Template loaded', 'success')
    }
  }
  
  const autoFillTemplate = async () => {
    const apiKey = localStorage.getItem('geminiApiKey')
    if (!apiKey) {
      showNotification('Please add your API key first', 'error')
      return
    }
    
    if (!currentTemplate) return
    
    // Extract variables from template
    const allVariables = templateHelpers.extractVariables(currentTemplate.template)
    const keyVariables = getKeyVariables(allVariables, currentTemplate.key)
    
    setShowVariables(true)
  }
  
  const executeAutoFill = async () => {
    try {
      const apiKey = localStorage.getItem('geminiApiKey')
      if (!apiKey || !currentTemplate) return
      
      const prompt = `You are helping fill a ${currentTemplate.key} template for AI image generation.

User has provided these inputs:
${JSON.stringify(variables, null, 2)}

Template structure to fill:
${JSON.stringify(currentTemplate.template, null, 2)}

Variables that need values (${templateHelpers.extractVariables(currentTemplate.template).length} total):
${templateHelpers.extractVariables(currentTemplate.template).join(', ')}

INSTRUCTIONS:
1. Use the user's inputs exactly as provided for those variables
2. For ALL other variables, generate appropriate, creative, and contextually relevant values
3. Ensure all values are consistent with the template type and user's inputs
4. Be specific and detailed, not generic
5. For colors, use specific color names or hex codes
6. For descriptions, be vivid and detailed
7. Return ONLY a JSON object with variable names as keys and filled values

IMPORTANT: Return ONLY the JSON object, no explanations or markdown.`

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, apiKey })
      })
      
      if (!response.ok) throw new Error('API request failed')
      
      const data = await response.json()
      const filledTemplate = templateHelpers.fillTemplate(currentTemplate.template, data.json)
      
      updateOutput(filledTemplate)
      
      // Save to library
      const item = {
        id: Date.now(),
        title: Object.values(variables)[0] || 'AI Generated Prompt',
        date: new Date().toLocaleDateString(),
        json: filledTemplate,
        preview: `Generated from ${currentTemplate.key} template`
      }
      addToLibrary(item)
      
      onUseTemplate()
      showNotification('Template auto-filled successfully!', 'success')
      
    } catch (error) {
      showNotification(`Auto-fill failed: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error')
    }
  }
  
  if (!isOpen || !currentTemplate) return null
  
  return (
    <div className="modal active" onClick={handleBackgroundClick}>
      <div className="modal-dialog modal-large">
        <div className="modal-header">
          <h3>{currentTemplate.icon} {currentTemplate.name}</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <pre className="template-preview">
            {JSON.stringify(currentTemplate.template, null, 2)}
          </pre>
          <div className="template-actions">
            <button className="btn-use" onClick={useTemplate}>Use Template</button>
            <button className="btn-autofill" onClick={autoFillTemplate}>
              🤖 Auto-Fill with AI
            </button>
          </div>
          {showVariables && (
            <div className="template-variables">
              <div className="autofill-info">
                ⚡ Enter a few details below and AI will intelligently fill the rest
              </div>
              {getKeyVariables(
                templateHelpers.extractVariables(currentTemplate.template), 
                currentTemplate.key
              ).map(variable => (
                <div key={variable} className="variable-group">
                  <label className="variable-label">
                    {variable.replace(/_/g, ' ')}
                  </label>
                  <input 
                    type="text" 
                    className="variable-input" 
                    placeholder={`Enter ${variable.replace(/_/g, ' ').toLowerCase()}`}
                    onChange={(e) => setVariables({...variables, [variable]: e.target.value})}
                  />
                </div>
              ))}
              <button 
                className="btn-autofill"
                style={{ gridColumn: '1 / -1', marginTop: 'var(--space-sm)' }}
                onClick={executeAutoFill}
              >
                🤖 Generate Full Prompt
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Get the most important variables based on template type
function getKeyVariables(allVariables: string[], templateKey: string): string[] {
  const priorityMap: Record<string, string[]> = {
    // Flyer templates
    event: ['event_title', 'event_date', 'venue_name', 'ticket_price'],
    business: ['business_name', 'promotional_headline', 'special_offer_text', 'phone_number'],
    realestate: ['property_address', 'listing_price', 'bedroom_count', 'bathroom_count'],
    restaurant: ['restaurant_name', 'cuisine_style', 'special_offer', 'phone_number'],
    product_launch: ['product_name', 'launch_date', 'introductory_price'],
    educational: ['educational_topic', 'organization_name', 'contact_details'],
    fitness: ['gym_name', 'motivational_headline', 'trial_offer'],
    
    // Artistic templates
    character: ['demographics', 'style', 'context'],
    product: ['type', 'brand', 'style'],
    cinematic: ['type', 'environment', 'mood'],
    portrait: ['expression', 'mood', 'style'],
    landscape: ['location', 'time_of_day', 'mood']
  }
  
  const priorities = priorityMap[templateKey] || []
  const priorityVars: string[] = []
  const otherVars: string[] = []
  
  allVariables.forEach(v => {
    if (priorities.some(p => v.includes(p))) {
      priorityVars.push(v)
    } else {
      otherVars.push(v)
    }
  })
  
  const result = [...priorityVars]
  const remaining = 6 - result.length
  if (remaining > 0) {
    result.push(...otherVars.slice(0, remaining))
  }
  
  return result.slice(0, 6)
}
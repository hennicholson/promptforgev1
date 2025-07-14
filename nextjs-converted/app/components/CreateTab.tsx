'use client'

import { useState, useRef } from 'react'
import { useAppContext } from '../lib/store'

declare global {
  interface Window {
    filestack: any
  }
}

interface CreateTabProps {
  onGenerateSuccess: () => void
  showNotification: (message: string, type: string) => void
}

export default function CreateTab({ onGenerateSuccess, showNotification }: CreateTabProps) {
  const [inputMode, setInputMode] = useState('natural')
  const [naturalInput, setNaturalInput] = useState('')
  const [structuredInputs, setStructuredInputs] = useState({
    scene: '',
    style: '',
    mood: '',
    lighting: '',
    colors: '',
    camera: ''
  })
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const { updatePreview, updateOutput, addToLibrary } = useAppContext()
  
  const filestackClient = useRef<any>(null)
  
  // Initialize Filestack
  if (typeof window !== 'undefined' && window.filestack && !filestackClient.current) {
    filestackClient.current = window.filestack.init(process.env.NEXT_PUBLIC_FILESTACK_API_KEY || 'ARyh1Aj27R5OcHOUc5oIXz')
  }
  
  const toggleInputMode = (mode: string) => {
    setInputMode(mode)
  }
  
  const uploadReferenceImage = () => {
    if (!filestackClient.current) {
      showNotification('Filestack not initialized', 'error')
      return
    }
    
    filestackClient.current.picker({
      accept: ['image/*'],
      maxFiles: 5,
      onUploadDone: (result: any) => {
        result.filesUploaded.forEach((file: any) => {
          setUploadedImages(prev => [...prev, file.url])
        })
      }
    }).open()
  }
  
  const removeReference = (url: string) => {
    setUploadedImages(prev => prev.filter(u => u !== url))
  }
  
  const generatePrompt = async () => {
    const apiKey = localStorage.getItem('geminiApiKey')
    if (!apiKey) {
      showNotification('Please add your API key first', 'error')
      return
    }
    
    setIsGenerating(true)
    
    try {
      let prompt = ''
      
      if (inputMode === 'natural') {
        if (!naturalInput.trim()) {
          throw new Error('Please enter a description')
        }
        
        prompt = `Convert this natural language image description into a structured JSON format for DALL-E/ChatGPT image generation. Follow best practices for 35% better prompt adherence.

Description: "${naturalInput}"
${uploadedImages.length > 0 ? `Reference images: ${uploadedImages.join(', ')}` : ''}

Generate a comprehensive JSON structure with: scene, subjects, style, color_palette, lighting, mood, composition, camera, textures, and details.`
      } else {
        // Structured mode
        const inputs = structuredInputs
        
        prompt = `Create a comprehensive JSON structure for AI image generation with these specifications:
${Object.entries(inputs).map(([key, value]) => `${key}: ${value || 'Not specified'}`).join('\n')}

Generate a detailed JSON expanding on these inputs.`
      }
      
      // Call API route
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt, apiKey })
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'API request failed')
      }
      
      const data = await response.json()
      const formattedJson = data.json
      
      updatePreview(formattedJson)
      updateOutput(formattedJson)
      
      // Auto-save to library
      const item = {
        id: Date.now(),
        title: formattedJson.scene || 'Generated Prompt',
        date: new Date().toLocaleDateString(),
        json: formattedJson,
        preview: naturalInput || formattedJson.scene
      }
      addToLibrary(item)
      
      onGenerateSuccess()
      showNotification('Prompt generated successfully!', 'success')
      
    } catch (error) {
      showNotification(error instanceof Error ? error.message : 'Failed to generate prompt', 'error')
      updatePreview({ error: error instanceof Error ? error.message : 'Unknown error' })
    } finally {
      setIsGenerating(false)
    }
  }
  
  return (
    <div className="tab-content active">
      <div className="create-container">
        <div className="input-panel">
          <h2 className="panel-title">Design Your Prompt</h2>
          
          <div className="input-modes">
            <button 
              className={`mode-toggle ${inputMode === 'natural' ? 'active' : ''}`}
              data-mode="natural" 
              onClick={() => toggleInputMode('natural')}
            >
              Natural Language
            </button>
            <button 
              className={`mode-toggle ${inputMode === 'structured' ? 'active' : ''}`}
              data-mode="structured" 
              onClick={() => toggleInputMode('structured')}
            >
              Structured Input
            </button>
          </div>

          {/* Natural Language Mode */}
          <div className={`input-section ${inputMode === 'natural' ? 'active' : ''}`}>
            <textarea 
              id="naturalInput" 
              className="prompt-input" 
              placeholder="Describe your image in detail...&#10;&#10;Example: A serene Japanese garden at sunset with cherry blossoms..."
              rows={8}
              value={naturalInput}
              onChange={(e) => setNaturalInput(e.target.value)}
            />
            
            <div className="reference-section">
              <button className="reference-btn" onClick={uploadReferenceImage}>
                📷 Add Reference Images
              </button>
              <div id="referenceImages" className="reference-images">
                {uploadedImages.map((url, index) => (
                  <div key={index} className="reference-image">
                    <img src={url} alt="Reference" />
                    <button className="remove-ref" onClick={() => removeReference(url)}>&times;</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Structured Mode */}
          <div className={`input-section ${inputMode === 'structured' ? 'active' : ''}`}>
            <div className="structured-inputs">
              <input 
                type="text" 
                placeholder="Scene Description" 
                className="structured-field"
                value={structuredInputs.scene}
                onChange={(e) => setStructuredInputs({...structuredInputs, scene: e.target.value})}
              />
              <input 
                type="text" 
                placeholder="Art Style" 
                className="structured-field"
                value={structuredInputs.style}
                onChange={(e) => setStructuredInputs({...structuredInputs, style: e.target.value})}
              />
              <input 
                type="text" 
                placeholder="Mood/Atmosphere" 
                className="structured-field"
                value={structuredInputs.mood}
                onChange={(e) => setStructuredInputs({...structuredInputs, mood: e.target.value})}
              />
              <input 
                type="text" 
                placeholder="Lighting" 
                className="structured-field"
                value={structuredInputs.lighting}
                onChange={(e) => setStructuredInputs({...structuredInputs, lighting: e.target.value})}
              />
              <input 
                type="text" 
                placeholder="Color Palette" 
                className="structured-field"
                value={structuredInputs.colors}
                onChange={(e) => setStructuredInputs({...structuredInputs, colors: e.target.value})}
              />
              <input 
                type="text" 
                placeholder="Camera Settings" 
                className="structured-field"
                value={structuredInputs.camera}
                onChange={(e) => setStructuredInputs({...structuredInputs, camera: e.target.value})}
              />
            </div>
          </div>

          <button 
            className={`generate-btn ${isGenerating ? 'loading' : ''}`} 
            onClick={generatePrompt}
            disabled={isGenerating}
          >
            ⚡ Generate JSON Prompt
          </button>
        </div>

        <div className="preview-panel">
          <h3 className="panel-subtitle">Quick Preview</h3>
          <QuickPreview />
        </div>
      </div>
    </div>
  )
}

function QuickPreview() {
  const { preview } = useAppContext()
  
  return (
    <pre id="quickPreview" className="quick-preview">
      {JSON.stringify(preview || {
        status: "Ready to generate...",
        tip: "Your JSON prompt will appear here"
      }, null, 2)}
    </pre>
  )
}
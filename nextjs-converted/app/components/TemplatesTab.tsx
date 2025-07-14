'use client'

import { useState } from 'react'
import { useAppContext } from '../lib/store'
import { professionalTemplates, templateHelpers } from '../lib/templates'

interface TemplatesTabProps {
  onTemplateSelect: () => void
  showNotification: (message: string, type: string) => void
}

export default function TemplatesTab({ onTemplateSelect, showNotification }: TemplatesTabProps) {
  const [activeCategory, setActiveCategory] = useState('artistic')
  const { setCurrentTemplate } = useAppContext()
  
  const loadTemplateCategory = (category: string) => {
    setActiveCategory(category)
  }
  
  const previewTemplate = (category: string, key: string) => {
    const template = templateHelpers.getTemplate(category, key)
    if (!template) return
    
    setCurrentTemplate({
      key,
      category,
      template: template.template,
      name: template.name,
      icon: template.icon
    })
    onTemplateSelect()
  }
  
  const templates = templateHelpers.getTemplatesByCategory(activeCategory)
  
  return (
    <div className="tab-content active">
      <div className="templates-container">
        <div className="template-sidebar">
          <h3 className="sidebar-title">Categories</h3>
          <div className="category-list">
            <button 
              className={`category-item ${activeCategory === 'artistic' ? 'active' : ''}`}
              onClick={() => loadTemplateCategory('artistic')}
            >
              🎨 Artistic Styles
            </button>
            <button 
              className={`category-item ${activeCategory === 'flyers' ? 'active' : ''}`}
              onClick={() => loadTemplateCategory('flyers')}
            >
              📄 Professional Flyers
            </button>
          </div>
        </div>
        <div className="template-gallery" id="templateGallery">
          {Object.entries(templates).map(([key, template]) => (
            <div 
              key={key}
              className="template-card"
              onClick={() => previewTemplate(activeCategory, key)}
            >
              <div className="template-icon">{template.icon}</div>
              <h4>{template.name}</h4>
              <p>{template.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
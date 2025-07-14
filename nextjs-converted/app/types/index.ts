// Type definitions for Prompt Forge

export interface AppState {
  currentTab: string
  currentInputMode: string
  editMode: boolean
  uploadedImages: string[]
  library: LibraryItem[]
  currentTemplate: Template | null
  currentTemplateKey: string | null
  lastValidJSON: any
}

export interface LibraryItem {
  id: number
  title: string
  date: string
  json: any
  preview: string
}

export interface Template {
  name: string
  icon: string
  description: string
  template: any
  variables?: string[]
}

export interface TemplateCategory {
  [key: string]: Template
}

export interface Templates {
  artistic: TemplateCategory
  flyers: TemplateCategory
}

export interface NotificationType {
  message: string
  type: 'info' | 'success' | 'error'
}

export interface StructuredInputs {
  scene: string
  style: string
  mood: string
  lighting: string
  colors: string
  camera: string
}

export interface GeneratePromptResponse {
  json?: any
  error?: string
  raw?: string
}
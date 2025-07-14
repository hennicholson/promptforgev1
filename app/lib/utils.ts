// Utility functions for Prompt Forge

export const utils = {
  // Format JSON with proper indentation
  formatJSON: (json: any): string => {
    try {
      return JSON.stringify(json, null, 2)
    } catch (e) {
      return ''
    }
  },
  
  // Validate JSON string
  validateJSON: (jsonString: string): { valid: boolean; error?: string } => {
    try {
      JSON.parse(jsonString)
      return { valid: true }
    } catch (e) {
      return { 
        valid: false, 
        error: e instanceof Error ? e.message : 'Invalid JSON' 
      }
    }
  },
  
  // Download JSON file
  downloadJSON: (json: any, filename?: string) => {
    const text = typeof json === 'string' ? json : JSON.stringify(json, null, 2)
    const blob = new Blob([text], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename || `prompt-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  },
  
  // Copy text to clipboard
  copyToClipboard: async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch (e) {
      return false
    }
  },
  
  // Generate unique ID
  generateId: (): number => {
    return Date.now()
  },
  
  // Truncate text with ellipsis
  truncateText: (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength - 3) + '...'
  },
  
  // Format date
  formatDate: (date: Date): string => {
    return date.toLocaleDateString()
  },
  
  // Debounce function
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout | null = null
    
    return (...args: Parameters<T>) => {
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(() => func(...args), wait)
    }
  }
}
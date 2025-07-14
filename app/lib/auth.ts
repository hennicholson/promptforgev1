// License key authentication system
export interface LicenseKey {
  key: string
  isValid: boolean
  expiresAt?: Date
  features?: string[]
  userId?: string
}

export class AuthService {
  private static instance: AuthService
  private currentLicense: LicenseKey | null = null
  
  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }
  
  // Validate license key format
  private validateKeyFormat(key: string): boolean {
    // License key format: XXXX-XXXX-XXXX-XXXX (16 chars + 3 dashes)
    const keyPattern = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/
    return keyPattern.test(key)
  }
  
  // Generate a demo license key for testing
  generateDemoKey(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const segments = []
    
    for (let i = 0; i < 4; i++) {
      let segment = ''
      for (let j = 0; j < 4; j++) {
        segment += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      segments.push(segment)
    }
    
    return segments.join('-')
  }
  
  // Validate license key (in production, this would call your license server)
  async validateLicense(key: string): Promise<LicenseKey> {
    if (!this.validateKeyFormat(key)) {
      return { key, isValid: false }
    }
    
    // Demo validation logic - in production, call your license server
    const demoValidKeys = [
      'DEMO-2024-PROM-PT01',
      'TEST-LICE-NSE1-2024',
      'EVAL-USER-TEMP-PASS'
    ]
    
    const isDemo = demoValidKeys.includes(key)
    const isValidFormat = this.validateKeyFormat(key)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (isDemo || isValidFormat) {
      const license: LicenseKey = {
        key,
        isValid: true,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        features: ['ai_generation', 'templates', 'library', 'export'],
        userId: `user_${key.slice(-4)}`
      }
      
      this.currentLicense = license
      this.saveLicenseToStorage(license)
      return license
    }
    
    return { key, isValid: false }
  }
  
  // Save license to localStorage
  private saveLicenseToStorage(license: LicenseKey): void {
    localStorage.setItem('promptForgeLicense', JSON.stringify({
      ...license,
      expiresAt: license.expiresAt?.toISOString()
    }))
  }
  
  // Load license from localStorage
  loadLicenseFromStorage(): LicenseKey | null {
    try {
      const stored = localStorage.getItem('promptForgeLicense')
      if (!stored) return null
      
      const parsed = JSON.parse(stored)
      const license: LicenseKey = {
        ...parsed,
        expiresAt: parsed.expiresAt ? new Date(parsed.expiresAt) : undefined
      }
      
      // Check if license is expired
      if (license.expiresAt && license.expiresAt < new Date()) {
        this.logout()
        return null
      }
      
      this.currentLicense = license
      return license
    } catch (e) {
      return null
    }
  }
  
  // Get current license
  getCurrentLicense(): LicenseKey | null {
    return this.currentLicense
  }
  
  // Check if user is authenticated
  isAuthenticated(): boolean {
    const license = this.getCurrentLicense() || this.loadLicenseFromStorage()
    return license?.isValid === true
  }
  
  // Check if user has specific feature access
  hasFeature(feature: string): boolean {
    const license = this.getCurrentLicense()
    return license?.features?.includes(feature) === true
  }
  
  // Logout user
  logout(): void {
    this.currentLicense = null
    localStorage.removeItem('promptForgeLicense')
    localStorage.removeItem('geminiApiKey')
    window.location.reload()
  }
  
  // Get license info for display
  getLicenseInfo(): { daysRemaining: number; features: string[] } | null {
    const license = this.getCurrentLicense()
    if (!license || !license.isValid) return null
    
    const daysRemaining = license.expiresAt 
      ? Math.ceil((license.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      : 999
    
    return {
      daysRemaining,
      features: license.features || []
    }
  }
}

export const authService = AuthService.getInstance()
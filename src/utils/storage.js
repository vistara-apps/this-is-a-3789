// Local storage utilities for RightsGuard app
const STORAGE_KEYS = {
  APP_STATE: 'rightsguard-state',
  API_KEYS: 'rightsguard-api-keys',
  USER_PREFERENCES: 'rightsguard-preferences',
  INCIDENT_LOGS: 'rightsguard-incidents',
  TRUSTED_CONTACTS: 'rightsguard-contacts'
}

class StorageService {
  // Generic storage methods
  setItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error('Error saving to localStorage:', error)
      return false
    }
  }

  getItem(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return defaultValue
    }
  }

  removeItem(key) {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error('Error removing from localStorage:', error)
      return false
    }
  }

  // App-specific storage methods
  saveAppState(state) {
    return this.setItem(STORAGE_KEYS.APP_STATE, state)
  }

  getAppState() {
    return this.getItem(STORAGE_KEYS.APP_STATE, {})
  }

  saveApiKeys(keys) {
    // Encrypt sensitive data in production
    return this.setItem(STORAGE_KEYS.API_KEYS, keys)
  }

  getApiKeys() {
    return this.getItem(STORAGE_KEYS.API_KEYS, {})
  }

  saveUserPreferences(preferences) {
    return this.setItem(STORAGE_KEYS.USER_PREFERENCES, preferences)
  }

  getUserPreferences() {
    return this.getItem(STORAGE_KEYS.USER_PREFERENCES, {
      language: 'english',
      notifications: true,
      autoShare: false,
      theme: 'light'
    })
  }

  saveIncidentLogs(logs) {
    return this.setItem(STORAGE_KEYS.INCIDENT_LOGS, logs)
  }

  getIncidentLogs() {
    return this.getItem(STORAGE_KEYS.INCIDENT_LOGS, [])
  }

  addIncidentLog(log) {
    const logs = this.getIncidentLogs()
    logs.push(log)
    return this.saveIncidentLogs(logs)
  }

  updateIncidentLog(logId, updates) {
    const logs = this.getIncidentLogs()
    const index = logs.findIndex(log => log.logId === logId)
    if (index !== -1) {
      logs[index] = { ...logs[index], ...updates }
      return this.saveIncidentLogs(logs)
    }
    return false
  }

  deleteIncidentLog(logId) {
    const logs = this.getIncidentLogs()
    const filteredLogs = logs.filter(log => log.logId !== logId)
    return this.saveIncidentLogs(filteredLogs)
  }

  saveTrustedContacts(contacts) {
    return this.setItem(STORAGE_KEYS.TRUSTED_CONTACTS, contacts)
  }

  getTrustedContacts() {
    return this.getItem(STORAGE_KEYS.TRUSTED_CONTACTS, [])
  }

  addTrustedContact(contact) {
    const contacts = this.getTrustedContacts()
    if (!contacts.includes(contact)) {
      contacts.push(contact)
      return this.saveTrustedContacts(contacts)
    }
    return false
  }

  removeTrustedContact(contact) {
    const contacts = this.getTrustedContacts()
    const filteredContacts = contacts.filter(c => c !== contact)
    return this.saveTrustedContacts(filteredContacts)
  }

  // Clear all app data
  clearAllData() {
    Object.values(STORAGE_KEYS).forEach(key => {
      this.removeItem(key)
    })
  }

  // Export data for backup
  exportData() {
    const data = {}
    Object.entries(STORAGE_KEYS).forEach(([name, key]) => {
      data[name] = this.getItem(key)
    })
    return data
  }

  // Import data from backup
  importData(data) {
    try {
      Object.entries(data).forEach(([name, value]) => {
        const key = STORAGE_KEYS[name]
        if (key && value !== null) {
          this.setItem(key, value)
        }
      })
      return true
    } catch (error) {
      console.error('Error importing data:', error)
      return false
    }
  }

  // Check storage quota
  getStorageInfo() {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      return navigator.storage.estimate()
    }
    return Promise.resolve({ quota: 0, usage: 0 })
  }
}

export default new StorageService()

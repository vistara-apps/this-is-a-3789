import React, { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { Settings, User, Bell, Shield, CreditCard, Globe, Phone, Key, Eye, EyeOff } from 'lucide-react'
import { US_STATES } from '../data/stateRights'
import openaiService from '../services/openai'
import pinataService from '../services/pinata'
import stripeService from '../services/stripe'
import storageService from '../utils/storage'

export default function SettingsPage() {
  const { state, dispatch } = useApp()
  const [trustedContact, setTrustedContact] = useState('')
  const [apiKeys, setApiKeys] = useState({
    openai: '',
    pinataKey: '',
    pinataSecret: '',
    stripePublishable: ''
  })
  const [showApiKeys, setShowApiKeys] = useState({
    openai: false,
    pinataKey: false,
    pinataSecret: false,
    stripePublishable: false
  })
  const [apiStatus, setApiStatus] = useState({
    openai: 'unconfigured',
    pinata: 'unconfigured',
    stripe: 'unconfigured'
  })

  useEffect(() => {
    // Load saved API keys
    const savedKeys = storageService.getApiKeys()
    setApiKeys(savedKeys)
    
    // Initialize services with saved keys
    if (savedKeys.openai) {
      try {
        openaiService.initialize(savedKeys.openai)
        setApiStatus(prev => ({ ...prev, openai: 'configured' }))
      } catch (error) {
        setApiStatus(prev => ({ ...prev, openai: 'error' }))
      }
    }
    
    if (savedKeys.pinataKey && savedKeys.pinataSecret) {
      try {
        pinataService.initialize(savedKeys.pinataKey, savedKeys.pinataSecret)
        setApiStatus(prev => ({ ...prev, pinata: 'configured' }))
      } catch (error) {
        setApiStatus(prev => ({ ...prev, pinata: 'error' }))
      }
    }
    
    if (savedKeys.stripePublishable) {
      try {
        stripeService.initialize(savedKeys.stripePublishable)
        setApiStatus(prev => ({ ...prev, stripe: 'configured' }))
      } catch (error) {
        setApiStatus(prev => ({ ...prev, stripe: 'error' }))
      }
    }
  }, [])

  const addTrustedContact = () => {
    if (trustedContact.trim()) {
      const updatedUser = {
        ...state.user,
        trustedContacts: [...(state.user.trustedContacts || []), trustedContact.trim()]
      }
      dispatch({ 
        type: 'LOAD_STATE', 
        payload: { 
          ...state, 
          user: updatedUser 
        } 
      })
      setTrustedContact('')
    }
  }

  const removeTrustedContact = (contact) => {
    const updatedUser = {
      ...state.user,
      trustedContacts: state.user.trustedContacts.filter(c => c !== contact)
    }
    dispatch({ 
      type: 'LOAD_STATE', 
      payload: { 
        ...state, 
        user: updatedUser 
      } 
    })
  }

  const togglePremium = () => {
    dispatch({ type: 'SET_PREMIUM_STATUS', payload: !state.user.premiumStatus })
  }

  const handleApiKeyChange = (service, value) => {
    setApiKeys(prev => ({ ...prev, [service]: value }))
  }

  const saveApiKey = async (service) => {
    const newKeys = { ...apiKeys }
    storageService.saveApiKeys(newKeys)
    
    try {
      if (service === 'openai' && apiKeys.openai) {
        openaiService.initialize(apiKeys.openai)
        setApiStatus(prev => ({ ...prev, openai: 'configured' }))
      } else if (service === 'pinata' && apiKeys.pinataKey && apiKeys.pinataSecret) {
        pinataService.initialize(apiKeys.pinataKey, apiKeys.pinataSecret)
        setApiStatus(prev => ({ ...prev, pinata: 'configured' }))
      } else if (service === 'stripe' && apiKeys.stripePublishable) {
        await stripeService.initialize(apiKeys.stripePublishable)
        setApiStatus(prev => ({ ...prev, stripe: 'configured' }))
      }
      alert('API key saved successfully!')
    } catch (error) {
      console.error('Error saving API key:', error)
      setApiStatus(prev => ({ ...prev, [service]: 'error' }))
      alert('Error configuring API. Please check your key.')
    }
  }

  const testApiConnection = async (service) => {
    try {
      if (service === 'pinata') {
        const result = await pinataService.testConnection()
        alert(result ? 'Pinata connection successful!' : 'Pinata connection failed!')
      } else {
        alert('Test connection feature coming soon for this service.')
      }
    } catch (error) {
      alert('Connection test failed. Please check your API keys.')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'configured': return 'text-green-600'
      case 'error': return 'text-red-600'
      default: return 'text-gray-500'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'configured': return 'Configured'
      case 'error': return 'Error'
      default: return 'Not configured'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card bg-primary text-white">
        <div className="flex items-center space-x-3 mb-4">
          <Settings className="h-8 w-8" />
          <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="opacity-90">Customize your RightsGuard experience</p>
          </div>
        </div>
      </div>

      {/* Account Section */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-4">
          <User className="h-6 w-6 text-text-secondary" />
          <h2 className="text-lg font-semibold text-text-primary">Account</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">State</label>
            <select
              value={state.user.state || ''}
              onChange={(e) => dispatch({ type: 'SET_USER_STATE', payload: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent"
            >
              <option value="">Select State</option>
              {US_STATES.map(stateName => (
                <option key={stateName} value={stateName}>{stateName}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
            <div>
              <div className="font-medium text-text-primary">Premium Status</div>
              <div className="text-sm text-text-secondary">
                {state.user.premiumStatus ? 'Active' : 'Basic Plan'}
              </div>
            </div>
            <button
              onClick={togglePremium}
              className={`px-4 py-2 rounded-md font-medium ${
                state.user.premiumStatus
                  ? 'bg-accent text-white'
                  : 'bg-gray-200 text-text-secondary'
              }`}
            >
              {state.user.premiumStatus ? 'Premium' : 'Upgrade'}
            </button>
          </div>
        </div>
      </div>

      {/* API Configuration */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-4">
          <Key className="h-6 w-6 text-text-secondary" />
          <h2 className="text-lg font-semibold text-text-primary">API Configuration</h2>
        </div>
        
        <div className="space-y-6">
          {/* OpenAI API */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-medium text-text-primary">OpenAI API</h3>
                <p className="text-sm text-text-secondary">For AI-powered incident summaries and rights explanations</p>
              </div>
              <span className={`text-sm font-medium ${getStatusColor(apiStatus.openai)}`}>
                {getStatusText(apiStatus.openai)}
              </span>
            </div>
            <div className="flex space-x-2">
              <div className="flex-1 relative">
                <input
                  type={showApiKeys.openai ? 'text' : 'password'}
                  value={apiKeys.openai}
                  onChange={(e) => handleApiKeyChange('openai', e.target.value)}
                  placeholder="sk-..."
                  className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent"
                />
                <button
                  onClick={() => setShowApiKeys(prev => ({ ...prev, openai: !prev.openai }))}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showApiKeys.openai ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <button
                onClick={() => saveApiKey('openai')}
                className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90"
              >
                Save
              </button>
            </div>
          </div>

          {/* Pinata API */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-medium text-text-primary">Pinata IPFS</h3>
                <p className="text-sm text-text-secondary">For secure, decentralized storage of recordings</p>
              </div>
              <span className={`text-sm font-medium ${getStatusColor(apiStatus.pinata)}`}>
                {getStatusText(apiStatus.pinata)}
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <input
                    type={showApiKeys.pinataKey ? 'text' : 'password'}
                    value={apiKeys.pinataKey}
                    onChange={(e) => handleApiKeyChange('pinataKey', e.target.value)}
                    placeholder="API Key"
                    className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                  <button
                    onClick={() => setShowApiKeys(prev => ({ ...prev, pinataKey: !prev.pinataKey }))}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showApiKeys.pinataKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <input
                    type={showApiKeys.pinataSecret ? 'text' : 'password'}
                    value={apiKeys.pinataSecret}
                    onChange={(e) => handleApiKeyChange('pinataSecret', e.target.value)}
                    placeholder="API Secret"
                    className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                  <button
                    onClick={() => setShowApiKeys(prev => ({ ...prev, pinataSecret: !prev.pinataSecret }))}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showApiKeys.pinataSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <button
                  onClick={() => saveApiKey('pinata')}
                  className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90"
                >
                  Save
                </button>
                <button
                  onClick={() => testApiConnection('pinata')}
                  className="px-4 py-2 border border-accent text-accent rounded-md hover:bg-accent/10"
                >
                  Test
                </button>
              </div>
            </div>
          </div>

          {/* Stripe API */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-medium text-text-primary">Stripe Payments</h3>
                <p className="text-sm text-text-secondary">For premium subscription processing</p>
              </div>
              <span className={`text-sm font-medium ${getStatusColor(apiStatus.stripe)}`}>
                {getStatusText(apiStatus.stripe)}
              </span>
            </div>
            <div className="flex space-x-2">
              <div className="flex-1 relative">
                <input
                  type={showApiKeys.stripePublishable ? 'text' : 'password'}
                  value={apiKeys.stripePublishable}
                  onChange={(e) => handleApiKeyChange('stripePublishable', e.target.value)}
                  placeholder="pk_..."
                  className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent"
                />
                <button
                  onClick={() => setShowApiKeys(prev => ({ ...prev, stripePublishable: !prev.stripePublishable }))}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showApiKeys.stripePublishable ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <button
                onClick={() => saveApiKey('stripe')}
                className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Language & Accessibility */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-4">
          <Globe className="h-6 w-6 text-text-secondary" />
          <h2 className="text-lg font-semibold text-text-primary">Language & Accessibility</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Default Language</label>
            <select
              value={state.selectedLanguage}
              onChange={(e) => dispatch({ type: 'SET_LANGUAGE', payload: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent"
            >
              <option value="english">English</option>
              <option value="spanish">Español</option>
            </select>
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-4">
          <Phone className="h-6 w-6 text-text-secondary" />
          <h2 className="text-lg font-semibold text-text-primary">Trusted Contacts</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={trustedContact}
              onChange={(e) => setTrustedContact(e.target.value)}
              placeholder="Enter phone number or email"
              className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent"
            />
            <button
              onClick={addTrustedContact}
              className="btn-accent"
            >
              Add
            </button>
          </div>

          <div className="space-y-2">
            {(state.user.trustedContacts || []).map((contact, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span className="text-text-primary">{contact}</span>
                <button
                  onClick={() => removeTrustedContact(contact)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
            {(!state.user.trustedContacts || state.user.trustedContacts.length === 0) && (
              <p className="text-text-secondary text-sm">No trusted contacts added yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Privacy & Security */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="h-6 w-6 text-text-secondary" />
          <h2 className="text-lg font-semibold text-text-primary">Privacy & Security</h2>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-text-primary">Auto-delete recordings</div>
              <div className="text-sm text-text-secondary">Automatically delete after 30 days</div>
            </div>
            <input type="checkbox" className="rounded" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-text-primary">Location services</div>
              <div className="text-sm text-text-secondary">Allow location tracking for incidents</div>
            </div>
            <input type="checkbox" className="rounded" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-text-primary">Cloud backup</div>
              <div className="text-sm text-text-secondary">Backup recordings to secure cloud storage</div>
            </div>
            <input 
              type="checkbox" 
              className="rounded" 
              disabled={!state.user.premiumStatus}
            />
          </div>
        </div>
      </div>

      {/* Subscription */}
      {!state.user.premiumStatus && (
        <div className="card bg-gradient-to-r from-primary to-accent text-white">
          <div className="flex items-center space-x-3 mb-4">
            <CreditCard className="h-6 w-6" />
            <h2 className="text-lg font-semibold">Upgrade to Premium</h2>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              <span className="text-sm">Cloud storage for recordings</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              <span className="text-sm">AI-powered incident summaries</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              <span className="text-sm">50+ additional response scripts</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              <span className="text-sm">Legal document generation</span>
            </div>
          </div>

          <button 
            onClick={togglePremium}
            className="bg-white text-primary px-6 py-3 rounded-md font-semibold"
          >
            Start Free Trial - $2.99/month
          </button>
        </div>
      )}

      {/* App Info */}
      <div className="card bg-gray-50">
        <h3 className="font-semibold text-text-primary mb-3">About RightsGuard</h3>
        <div className="space-y-2 text-sm text-text-secondary">
          <div>Version 1.0.0</div>
          <div>© 2024 RightsGuard. All rights reserved.</div>
          <div className="flex space-x-4 mt-3">
            <a href="#" className="text-accent hover:underline">Privacy Policy</a>
            <a href="#" className="text-accent hover:underline">Terms of Service</a>
            <a href="#" className="text-accent hover:underline">Support</a>
          </div>
        </div>
      </div>
    </div>
  )
}

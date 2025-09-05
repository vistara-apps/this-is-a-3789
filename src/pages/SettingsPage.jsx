import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Settings, User, Bell, Shield, CreditCard, Globe, Phone } from 'lucide-react'

export default function SettingsPage() {
  const { state, dispatch } = useApp()
  const [trustedContact, setTrustedContact] = useState('')

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
              <option value="CA">California</option>
              <option value="NY">New York</option>
              <option value="TX">Texas</option>
              <option value="FL">Florida</option>
              <option value="IL">Illinois</option>
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
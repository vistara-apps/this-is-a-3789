import React, { useState } from 'react'
import { Share2, Users, Send, Check, Copy, MessageSquare, Mail } from 'lucide-react'
import { useApp } from '../context/AppContext'
import sharingService from '../utils/sharing'

export default function ShareButton({ incidentData, variant = 'default' }) {
  const { state } = useApp()
  const [isSharing, setIsSharing] = useState(false)
  const [shared, setShared] = useState(false)
  const [showOptions, setShowOptions] = useState(false)

  const handleShare = async () => {
    setIsSharing(true)
    
    try {
      const summary = sharingService.generateIncidentSummary(incidentData, state.user.state)
      const shareData = {
        title: 'RightsGuard Incident Alert',
        text: summary,
        url: sharingService.generateShareableLink(incidentData)
      }

      const result = await sharingService.shareViaWebAPI(shareData)
      if (result.success) {
        setShared(true)
        setTimeout(() => setShared(false), 3000)
      }
    } catch (error) {
      console.error('Error sharing:', error)
      // Fallback to copying to clipboard
      try {
        const summary = sharingService.generateIncidentSummary(incidentData, state.user.state)
        await sharingService.copyToClipboard(summary)
        alert('Incident details copied to clipboard. Share with your trusted contacts.')
        setShared(true)
        setTimeout(() => setShared(false), 3000)
      } catch (clipboardError) {
        alert('Unable to share or copy. Please manually share the incident details.')
      }
    } finally {
      setIsSharing(false)
    }
  }

  const handleCopyToClipboard = async () => {
    try {
      const summary = sharingService.generateIncidentSummary(incidentData, state.user.state)
      await sharingService.copyToClipboard(summary)
      alert('Incident details copied to clipboard!')
    } catch (error) {
      alert('Failed to copy to clipboard')
    }
  }

  const handleShareViaSMS = () => {
    const message = sharingService.generateEmergencyAlert(incidentData, state.user.state)
    sharingService.shareViaSMS('', message)
  }

  const handleShareViaEmail = () => {
    const message = sharingService.generateIncidentSummary(incidentData, state.user.state)
    sharingService.shareViaEmail('', 'RightsGuard Emergency Alert', message)
  }

  const handleNotifyContacts = async () => {
    if (!state.user.trustedContacts || state.user.trustedContacts.length === 0) {
      alert('No trusted contacts configured. Please add contacts in Settings.')
      return
    }

    try {
      const message = sharingService.generateEmergencyAlert(incidentData, state.user.state)
      const contacts = state.user.trustedContacts.map(contact => ({
        type: 'sms',
        value: contact
      }))
      
      const results = await sharingService.shareToContacts(contacts, message)
      const successCount = results.filter(r => r.success).length
      
      if (successCount > 0) {
        alert(`Emergency alert sent to ${successCount} trusted contact(s)`)
      } else {
        alert('Failed to send alerts. Please try manual sharing.')
      }
    } catch (error) {
      console.error('Error notifying contacts:', error)
      alert('Failed to notify contacts. Please try manual sharing.')
    }
  }

  return (
    <div className="space-y-3">
      <button
        onClick={handleShare}
        disabled={isSharing}
        className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-md font-medium transition-colors ${
          shared
            ? 'bg-green-500 text-white'
            : 'btn-accent'
        } ${isSharing ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {shared ? (
          <>
            <Check className="h-5 w-5" />
            <span>Shared Successfully</span>
          </>
        ) : (
          <>
            <Share2 className="h-5 w-5" />
            <span>{isSharing ? 'Sharing...' : 'Share Incident'}</span>
          </>
        )}
      </button>

      <button
        onClick={handleNotifyContacts}
        className="w-full flex items-center justify-center space-x-2 py-3 px-4 border border-accent text-accent rounded-md font-medium hover:bg-accent/10 transition-colors"
      >
        <Users className="h-5 w-5" />
        <span>Notify Trusted Contacts</span>
      </button>

      {/* Additional sharing options */}
      <div className="flex space-x-2">
        <button
          onClick={handleCopyToClipboard}
          className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          <Copy className="h-4 w-4" />
          <span>Copy</span>
        </button>
        
        <button
          onClick={handleShareViaSMS}
          className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          <MessageSquare className="h-4 w-4" />
          <span>SMS</span>
        </button>
        
        <button
          onClick={handleShareViaEmail}
          className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          <Mail className="h-4 w-4" />
          <span>Email</span>
        </button>
      </div>
    </div>
  )
}

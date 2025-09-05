import React, { useState } from 'react'
import { Share2, Users, Send, Check } from 'lucide-react'

export default function ShareButton({ incidentData, variant = 'default' }) {
  const [isSharing, setIsSharing] = useState(false)
  const [shared, setShared] = useState(false)

  const handleShare = async () => {
    setIsSharing(true)
    
    try {
      const shareData = {
        title: 'RightsGuard Incident Alert',
        text: `Emergency: I am currently in a police interaction. Location: ${incidentData?.latitude?.toFixed(6)}, ${incidentData?.longitude?.toFixed(6)}. Time: ${new Date().toLocaleString()}`,
        url: window.location.origin
      }

      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData)
      } else {
        // Fallback to copying to clipboard
        await navigator.clipboard.writeText(shareData.text)
        alert('Incident details copied to clipboard. Share with your trusted contacts.')
      }
      
      setShared(true)
      setTimeout(() => setShared(false), 3000)
    } catch (error) {
      console.error('Error sharing:', error)
    } finally {
      setIsSharing(false)
    }
  }

  const handleNotifyContacts = () => {
    // Simulate notifying trusted contacts
    alert('Alert sent to your trusted contacts')
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
    </div>
  )
}
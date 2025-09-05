import React, { useState } from 'react'
import { Copy, Check, Volume2 } from 'lucide-react'

export default function ScriptButton({ script, variant = 'english' }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(script.text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy text:', error)
    }
  }

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(script.text)
      utterance.lang = variant === 'spanish' ? 'es-ES' : 'en-US'
      utterance.rate = 0.8
      speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className={`card ${variant === 'spanish' ? 'border-l-4 border-orange-400' : 'border-l-4 border-blue-400'}`}>
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-semibold text-text-primary">{script.title}</h4>
        <span className={`text-xs px-2 py-1 rounded-full ${
          variant === 'spanish' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'
        }`}>
          {variant === 'spanish' ? 'ES' : 'EN'}
        </span>
      </div>
      
      <p className="text-text-primary mb-4 leading-relaxed">{script.text}</p>
      
      <div className="flex space-x-2">
        <button
          onClick={handleCopy}
          className="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
        >
          {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
        
        <button
          onClick={handleSpeak}
          className="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
        >
          <Volume2 className="h-4 w-4" />
          <span>Speak</span>
        </button>
      </div>
    </div>
  )
}
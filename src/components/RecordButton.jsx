import React from 'react'
import { Video, Square, Mic } from 'lucide-react'

export default function RecordButton({ variant = 'inactive', onToggle, recordingTime }) {
  const isActive = variant === 'active'

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="text-center">
      <button
        onClick={onToggle}
        className={`relative w-20 h-20 rounded-full border-4 transition-all duration-300 ${
          isActive
            ? 'bg-red-500 border-red-600 animate-pulse-record'
            : 'bg-accent border-accent hover:bg-accent/90'
        }`}
      >
        {isActive ? (
          <Square className="h-8 w-8 text-white mx-auto" />
        ) : (
          <Video className="h-8 w-8 text-white mx-auto" />
        )}
      </button>
      
      {isActive && (
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-center space-x-2 text-red-600">
            <Mic className="h-4 w-4 animate-pulse" />
            <span className="text-sm font-medium">Recording</span>
          </div>
          <div className="text-lg font-mono font-bold text-text-primary">
            {formatTime(recordingTime)}
          </div>
        </div>
      )}
      
      {!isActive && (
        <p className="mt-4 text-sm text-text-secondary">
          Tap to start recording
        </p>
      )}
    </div>
  )
}
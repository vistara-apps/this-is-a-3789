import React from 'react'
import { MapPin, ChevronRight } from 'lucide-react'

export default function StateCard({ state, isCollapsed = false, onSelect, onToggle }) {
  const stateInfo = {
    'CA': { name: 'California', code: 'CA' },
    'NY': { name: 'New York', code: 'NY' },
    'TX': { name: 'Texas', code: 'TX' },
    'FL': { name: 'Florida', code: 'FL' },
    'IL': { name: 'Illinois', code: 'IL' },
    // Add more states as needed
  }

  const currentState = stateInfo[state] || { name: 'Select State', code: '' }

  if (isCollapsed) {
    return (
      <div className="card bg-primary text-white cursor-pointer" onClick={onToggle}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <MapPin className="h-5 w-5" />
            <span className="font-medium">{currentState.name}</span>
          </div>
          <ChevronRight className="h-5 w-5" />
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Select Your State</h3>
      <div className="grid grid-cols-2 gap-3">
        {Object.values(stateInfo).map((stateItem) => (
          <button
            key={stateItem.code}
            onClick={() => onSelect(stateItem.code)}
            className={`p-3 rounded-md border-2 transition-colors ${
              state === stateItem.code
                ? 'border-accent bg-accent/10 text-accent'
                : 'border-gray-200 hover:border-accent/50'
            }`}
          >
            <div className="text-sm font-medium">{stateItem.name}</div>
            <div className="text-xs text-text-secondary">{stateItem.code}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
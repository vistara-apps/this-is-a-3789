import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import StateCard from '../components/StateCard'
import { Shield, AlertTriangle, Book, MessageSquare, Video } from 'lucide-react'

export default function HomePage() {
  const { state, dispatch } = useApp()
  const [showStateSelector, setShowStateSelector] = useState(!state.user.state)

  const handleStateSelect = (selectedState) => {
    dispatch({ type: 'SET_USER_STATE', payload: selectedState })
    setShowStateSelector(false)
  }

  const quickActions = [
    {
      title: 'Know Your Rights',
      description: 'State-specific legal rights during police encounters',
      icon: Book,
      link: '/rights',
      color: 'bg-blue-500'
    },
    {
      title: 'Quick Scripts',
      description: 'Pre-written responses for common situations',
      icon: MessageSquare,
      link: '/scripts',
      color: 'bg-green-500'
    },
    {
      title: 'Start Recording',
      description: 'Document your interaction immediately',
      icon: Video,
      link: '/record',
      color: 'bg-red-500'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Emergency Alert */}
      <div className="card bg-red-50 border-l-4 border-red-500">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-6 w-6 text-red-500 mt-1" />
          <div>
            <h3 className="font-semibold text-red-800">In an Emergency?</h3>
            <p className="text-red-700 text-sm mt-1">
              Tap "Start Recording" below to immediately document your interaction and alert your contacts.
            </p>
            <Link to="/record" className="inline-block mt-2 text-red-800 font-medium underline">
              Start Recording Now →
            </Link>
          </div>
        </div>
      </div>

      {/* State Selection */}
      {showStateSelector ? (
        <StateCard onSelect={handleStateSelect} />
      ) : (
        <StateCard
          state={state.user.state}
          isCollapsed={true}
          onToggle={() => setShowStateSelector(true)}
        />
      )}

      {/* Welcome Message */}
      {state.user.state && (
        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="h-8 w-8 text-accent" />
            <div>
              <h2 className="text-xl font-bold text-text-primary">Welcome to RightsGuard</h2>
              <p className="text-text-secondary">Know your rights, stay protected</p>
            </div>
          </div>
          <p className="text-text-primary">
            You're protected by the rights and laws of your state. Access your guides, scripts, and recording tools below.
          </p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">Quick Actions</h3>
        <div className="grid gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <Link
                key={index}
                to={action.link}
                className="card hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${action.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-text-primary">{action.title}</h4>
                    <p className="text-sm text-text-secondary">{action.description}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Recent Activity */}
      {state.incidentLogs.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {state.incidentLogs.slice(-3).map((log) => (
              <div key={log.logId} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div>
                  <p className="text-sm font-medium text-text-primary">Incident recorded</p>
                  <p className="text-xs text-text-secondary">
                    {new Date(log.timestamp).toLocaleDateString()} at {new Date(log.timestamp).toLocaleTimeString()}
                  </p>
                </div>
                <Link to="/incidents" className="text-accent text-sm font-medium">
                  View →
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
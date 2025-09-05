import React from 'react'
import { useApp } from '../context/AppContext'
import { FileText, MapPin, Clock, Video, Trash2 } from 'lucide-react'

export default function IncidentLogPage() {
  const { state, dispatch } = useApp()

  const deleteIncident = (logId) => {
    if (window.confirm('Are you sure you want to delete this incident log?')) {
      const updatedLogs = state.incidentLogs.filter(log => log.logId !== logId)
      // Update the state by replacing the entire logs array
      dispatch({ 
        type: 'LOAD_STATE', 
        payload: { 
          ...state, 
          incidentLogs: updatedLogs 
        } 
      })
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-red-600 bg-red-100'
      case 'completed':
        return 'text-green-600 bg-green-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card bg-primary text-white">
        <div className="flex items-center space-x-3 mb-4">
          <FileText className="h-8 w-8" />
          <div>
            <h1 className="text-2xl font-bold">Incident Logs</h1>
            <p className="opacity-90">Your recorded interactions</p>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary">{state.incidentLogs.length}</div>
          <div className="text-sm text-text-secondary">Total Incidents</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-accent">
            {state.incidentLogs.filter(log => log.status === 'active').length}
          </div>
          <div className="text-sm text-text-secondary">Active</div>
        </div>
      </div>

      {/* Incident List */}
      {state.incidentLogs.length === 0 ? (
        <div className="card text-center">
          <FileText className="h-12 w-12 text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">No Incidents Recorded</h3>
          <p className="text-text-secondary mb-4">
            When you start recording an interaction, it will appear here with all the details.
          </p>
          <button 
            onClick={() => window.location.href = '/record'}
            className="btn-primary"
          >
            Start Recording
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {state.incidentLogs
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .map((log) => (
              <div key={log.logId} className="card">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Video className="h-6 w-6 text-accent" />
                    <div>
                      <h3 className="font-semibold text-text-primary">
                        Incident #{log.logId.slice(-6)}
                      </h3>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                        {log.status}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteIncident(log.logId)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm">
                    <Clock className="h-4 w-4 text-text-secondary" />
                    <span className="text-text-secondary">Time:</span>
                    <span className="text-text-primary">
                      {new Date(log.timestamp).toLocaleDateString()} at{' '}
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 text-sm">
                    <MapPin className="h-4 w-4 text-text-secondary" />
                    <span className="text-text-secondary">Location:</span>
                    <span className="text-text-primary font-mono text-xs">
                      {log.latitude.toFixed(6)}, {log.longitude.toFixed(6)}
                    </span>
                  </div>

                  {log.recordingUrl && (
                    <div className="flex items-center space-x-3 text-sm">
                      <Video className="h-4 w-4 text-text-secondary" />
                      <span className="text-text-secondary">Recording:</span>
                      <a 
                        href={log.recordingUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-accent hover:underline"
                      >
                        View Recording
                      </a>
                    </div>
                  )}

                  {log.notes && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-md">
                      <p className="text-sm text-text-primary">{log.notes}</p>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex space-x-2">
                  <button className="text-sm text-accent hover:underline">
                    Generate Summary
                  </button>
                  <button className="text-sm text-accent hover:underline">
                    Share
                  </button>
                  <button className="text-sm text-accent hover:underline">
                    Export
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Premium Features */}
      {!state.user.premiumStatus && state.incidentLogs.length > 0 && (
        <div className="card bg-gradient-to-r from-primary to-accent text-white">
          <h3 className="font-semibold mb-2">Premium Features</h3>
          <p className="text-sm opacity-90 mb-4">
            Upgrade to get cloud storage, AI-powered summaries, legal document generation, and more.
          </p>
          <button className="bg-white text-primary px-4 py-2 rounded-md font-medium text-sm">
            Upgrade Now
          </button>
        </div>
      )}
    </div>
  )
}
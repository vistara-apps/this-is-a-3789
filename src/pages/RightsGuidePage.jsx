import React from 'react'
import { useApp } from '../context/AppContext'
import { Shield, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'

export default function RightsGuidePage() {
  const { state } = useApp()

  const rightsData = {
    'CA': {
      name: 'California',
      basicRights: [
        'You have the right to remain silent',
        'You have the right to refuse consent to search',
        'You have the right to leave if you are not being detained',
        'You have the right to an attorney',
        'You have the right to record police interactions in public'
      ],
      dos: [
        'Keep your hands visible and move slowly',
        'Ask "Am I free to leave?" if not under arrest',
        'Ask "Do you have a warrant?" if they want to search',
        'State clearly "I do not consent to any searches"',
        'Ask for a lawyer if arrested'
      ],
      donts: [
        "Don't run or make sudden movements",
        "Don't argue or resist, even if you believe you're innocent",
        "Don't consent to searches of your property",
        "Don't lie or provide false information",
        "Don't touch the officer or their equipment"
      ],
      specificLaws: [
        'California allows recording of police in public spaces',
        'Police cannot search your phone without a warrant',
        'You must provide ID only if lawfully detained',
        'Police must have probable cause for most searches'
      ]
    },
    'NY': {
      name: 'New York',
      basicRights: [
        'You have the right to remain silent',
        'You have the right to refuse consent to search',
        'You have the right to leave if you are not being detained',
        'You have the right to an attorney',
        'You have the right to record police interactions in public'
      ],
      dos: [
        'Keep your hands visible',
        'Ask if you are free to leave',
        'Ask if they have a warrant before any search',
        'Clearly state you do not consent to searches',
        'Ask for an attorney if arrested'
      ],
      donts: [
        "Don't run away",
        "Don't resist even if you think the stop is unfair",
        "Don't consent to any searches",
        "Don't provide false information",
        "Don't interfere with the investigation"
      ],
      specificLaws: [
        'Stop and frisk requires reasonable suspicion',
        'Recording police is legal in public spaces',
        'Police need a warrant to search your phone',
        'You must show ID only when driving or if lawfully arrested'
      ]
    }
  }

  const currentStateData = rightsData[state.user.state] || rightsData['CA']

  if (!state.user.state) {
    return (
      <div className="card text-center">
        <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-text-primary mb-2">Select Your State First</h2>
        <p className="text-text-secondary">
          Please select your state from the home page to view your specific legal rights.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card bg-primary text-white">
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="h-8 w-8" />
          <div>
            <h1 className="text-2xl font-bold">Your Rights in {currentStateData.name}</h1>
            <p className="opacity-90">Know your legal protections</p>
          </div>
        </div>
      </div>

      {/* Basic Rights */}
      <div className="card">
        <h2 className="text-xl font-semibold text-text-primary mb-4">Your Basic Rights</h2>
        <div className="space-y-3">
          {currentStateData.basicRights.map((right, index) => (
            <div key={index} className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <p className="text-text-primary">{right}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Do's */}
      <div className="card">
        <h2 className="text-xl font-semibold text-text-primary mb-4 flex items-center space-x-2">
          <CheckCircle className="h-6 w-6 text-green-500" />
          <span>What TO Do</span>
        </h2>
        <div className="space-y-3">
          {currentStateData.dos.map((item, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-md">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-green-800">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Don'ts */}
      <div className="card">
        <h2 className="text-xl font-semibold text-text-primary mb-4 flex items-center space-x-2">
          <XCircle className="h-6 w-6 text-red-500" />
          <span>What NOT To Do</span>
        </h2>
        <div className="space-y-3">
          {currentStateData.donts.map((item, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-red-50 rounded-md">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-red-800">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* State-Specific Laws */}
      <div className="card">
        <h2 className="text-xl font-semibold text-text-primary mb-4">State-Specific Laws</h2>
        <div className="space-y-3">
          {currentStateData.specificLaws.map((law, index) => (
            <div key={index} className="p-3 bg-blue-50 rounded-md border-l-4 border-blue-400">
              <p className="text-blue-800">{law}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Notice */}
      <div className="card bg-yellow-50 border-l-4 border-yellow-400">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-6 w-6 text-yellow-600 mt-1" />
          <div>
            <h3 className="font-semibold text-yellow-800">Important Reminder</h3>
            <p className="text-yellow-700 mt-1">
              This information is for educational purposes. Laws can change and situations vary. 
              Consider consulting with a local attorney for specific legal advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
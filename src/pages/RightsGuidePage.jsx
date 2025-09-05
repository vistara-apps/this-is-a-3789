import React, { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { Shield, CheckCircle, XCircle, AlertTriangle, Book, Info } from 'lucide-react'
import { getStateRights, hasStateData } from '../data/stateRights'
import openaiService from '../services/openai'

export default function RightsGuidePage() {
  const { state } = useApp()
  const [stateRights, setStateRights] = useState(null)
  const [isGeneratingExplanation, setIsGeneratingExplanation] = useState(false)
  const [aiExplanation, setAiExplanation] = useState('')

  useEffect(() => {
    if (state.user.state) {
      const rights = getStateRights(state.user.state)
      setStateRights(rights)
    }
  }, [state.user.state])

  const handleGenerateExplanation = async (scenario) => {
    if (!state.user.state) {
      alert('Please select your state first')
      return
    }

    setIsGeneratingExplanation(true)
    try {
      const explanation = await openaiService.generateRightsExplanation(state.user.state, scenario)
      setAiExplanation(explanation)
    } catch (error) {
      console.error('Error generating explanation:', error)
      alert('Failed to generate explanation. Please check your API settings.')
    } finally {
      setIsGeneratingExplanation(false)
    }
  }

  // Fallback data for states without detailed information
  const fallbackRightsData = {
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

  // Use state-specific data if available, otherwise use fallback
  const currentStateData = stateRights?.guideContent || fallbackRightsData[state.user.state] || fallbackRightsData['CA']

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
            <h1 className="text-2xl font-bold">
              {stateRights ? stateRights.guideContent.title : `Your Rights in ${state.user.state}`}
            </h1>
            <p className="opacity-90">
              {stateRights ? stateRights.guideContent.summary : 'Know your legal protections'}
            </p>
          </div>
        </div>
      </div>

      {/* State-specific Rights (if available) */}
      {stateRights && (
        <div className="card">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Your Legal Rights</h2>
          <div className="space-y-4">
            {stateRights.guideContent.rights.map((right, index) => (
              <div key={index} className="border-l-4 border-accent pl-4">
                <h3 className="font-semibold text-text-primary mb-1">{right.title}</h3>
                <p className="text-text-secondary text-sm mb-2">{right.description}</p>
                <p className="text-text-primary text-sm">{right.details}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Do's and Don'ts */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Do's */}
        <div className="card">
          <h2 className="text-xl font-semibold text-text-primary mb-4 flex items-center space-x-2">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <span>What TO Do</span>
          </h2>
          <div className="space-y-3">
            {(stateRights ? stateRights.guideContent.dosDonts.dos : currentStateData.dos).map((item, index) => (
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
            {(stateRights ? stateRights.guideContent.dosDonts.donts : currentStateData.donts).map((item, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-red-50 rounded-md">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-red-800">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI-Powered Explanation */}
      <div className="card">
        <h2 className="text-xl font-semibold text-text-primary mb-4 flex items-center space-x-2">
          <Book className="h-6 w-6 text-accent" />
          <span>Get AI Explanation</span>
        </h2>
        <p className="text-text-secondary mb-4">
          Get a detailed explanation of your rights for specific scenarios using AI.
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {['Traffic Stop', 'Street Encounter', 'Home Visit'].map((scenario) => (
            <button
              key={scenario}
              onClick={() => handleGenerateExplanation(scenario)}
              disabled={isGeneratingExplanation}
              className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {scenario}
            </button>
          ))}
        </div>
        {isGeneratingExplanation && (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-accent"></div>
            <p className="text-text-secondary mt-2">Generating explanation...</p>
          </div>
        )}
        {aiExplanation && (
          <div className="p-4 bg-blue-50 rounded-md border-l-4 border-blue-400">
            <div className="flex items-start space-x-2 mb-2">
              <Info className="h-5 w-5 text-blue-600 mt-0.5" />
              <h3 className="font-semibold text-blue-800">AI-Generated Explanation</h3>
            </div>
            <div className="text-blue-700 whitespace-pre-wrap">{aiExplanation}</div>
          </div>
        )}
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
              {!hasStateData(state.user.state) && (
                <span className="block mt-2 font-medium">
                  Detailed state-specific information for {state.user.state} is not yet available. 
                  General constitutional rights are displayed.
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

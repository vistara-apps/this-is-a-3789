import React, { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import ScriptButton from '../components/ScriptButton'
import { MessageSquare, Globe, AlertTriangle } from 'lucide-react'
import { getStateRights } from '../data/stateRights'

export default function ScriptsPage() {
  const { state, dispatch } = useApp()
  const [selectedLanguage, setSelectedLanguage] = useState(state.selectedLanguage)
  const [stateScripts, setStateScripts] = useState(null)

  useEffect(() => {
    if (state.user.state) {
      const rights = getStateRights(state.user.state)
      setStateScripts(rights?.scriptContent)
    }
  }, [state.user.state])

  // Fallback scripts for states without detailed data
  const fallbackScripts = {
    english: [
      {
        title: 'Traffic Stop',
        text: 'Officer, I want to remain silent. I do not consent to any searches. Am I free to leave?'
      },
      {
        title: 'Questioning',
        text: 'I am exercising my right to remain silent. I want to speak with an attorney. I do not consent to any searches.'
      },
      {
        title: 'Search Request',
        text: 'I do not consent to any searches of my person, property, or vehicle. I am exercising my constitutional rights.'
      },
      {
        title: 'Detention Question',
        text: 'Am I being detained or am I free to leave? I want to exercise my right to leave if I am not being detained.'
      },
      {
        title: 'Recording Notice',
        text: 'I am recording this interaction for my safety and legal protection. This is my constitutional right.'
      }
    ],
    spanish: [
      {
        title: 'Parada de Tráfico',
        text: 'Oficial, quiero permanecer en silencio. No consiento a ninguna búsqueda. ¿Soy libre de irme?'
      },
      {
        title: 'Interrogatorio',
        text: 'Estoy ejerciendo mi derecho a permanecer en silencio. Quiero hablar con un abogado. No consiento a ninguna búsqueda.'
      },
      {
        title: 'Solicitud de Búsqueda',
        text: 'No consiento a ninguna búsqueda de mi persona, propiedad o vehículo. Estoy ejerciendo mis derechos constitucionales.'
      },
      {
        title: 'Pregunta de Detención',
        text: '¿Estoy siendo detenido o soy libre de irme? Quiero ejercer mi derecho a irme si no estoy siendo detenido.'
      },
      {
        title: 'Aviso de Grabación',
        text: 'Estoy grabando esta interacción para mi seguridad y protección legal. Este es mi derecho constitucional.'
      }
    ]
  }

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language)
    dispatch({ type: 'SET_LANGUAGE', payload: language })
  }

  // Get scripts from state data or fallback
  const currentScripts = stateScripts?.[selectedLanguage] || fallbackScripts[selectedLanguage]

  if (!state.user.state) {
    return (
      <div className="card text-center">
        <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-text-primary mb-2">Select Your State First</h2>
        <p className="text-text-secondary">
          Please select your state from the home page to view appropriate scripts.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card bg-accent text-white">
        <div className="flex items-center space-x-3 mb-4">
          <MessageSquare className="h-8 w-8" />
          <div>
            <h1 className="text-2xl font-bold">Quick Response Scripts</h1>
            <p className="opacity-90">
              {stateScripts 
                ? `State-specific phrases for ${state.user.state}` 
                : 'Pre-written phrases for police interactions'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Language Selector */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-4">
          <Globe className="h-6 w-6 text-text-secondary" />
          <h2 className="text-lg font-semibold text-text-primary">Language</h2>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => handleLanguageChange('english')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              selectedLanguage === 'english'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
            }`}
          >
            English
          </button>
          <button
            onClick={() => handleLanguageChange('spanish')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              selectedLanguage === 'spanish'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
            }`}
          >
            Español
          </button>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="card bg-blue-50 border-l-4 border-blue-400">
        <h3 className="font-semibold text-blue-800 mb-2">How to Use Scripts</h3>
        <ul className="space-y-1 text-blue-700 text-sm">
          <li>• Speak clearly and calmly</li>
          <li>• Use the "Copy" button to copy text for later</li>
          <li>• Use the "Speak" button to hear pronunciation</li>
          <li>• Repeat your statements if necessary</li>
          <li>• Stay calm and respectful at all times</li>
        </ul>
      </div>

      {/* Scripts */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-text-primary">
          {stateScripts ? 'State-Specific Scripts' : 'Common Scenarios'} - {selectedLanguage === 'english' ? 'English' : 'Español'}
        </h2>
        
        {stateScripts ? (
          // Display state-specific scripts organized by scenario
          <div className="space-y-6">
            {Object.entries(currentScripts).map(([scenario, scripts]) => (
              <div key={scenario} className="space-y-3">
                <h3 className="text-md font-semibold text-text-primary border-b border-gray-200 pb-2">
                  {scenario}
                </h3>
                <div className="space-y-3">
                  {scripts.map((scriptText, index) => (
                    <ScriptButton
                      key={`${scenario}-${index}`}
                      script={{
                        title: `${scenario} - Script ${index + 1}`,
                        text: scriptText
                      }}
                      variant={selectedLanguage}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Display fallback scripts
          <div className="space-y-4">
            {currentScripts.map((script, index) => (
              <ScriptButton
                key={index}
                script={script}
                variant={selectedLanguage}
              />
            ))}
          </div>
        )}
      </div>

      {/* Premium Features Teaser */}
      {!state.user.premiumStatus && (
        <div className="card bg-gradient-to-r from-primary to-accent text-white">
          <h3 className="font-semibold mb-2">Unlock Premium Scripts</h3>
          <p className="text-sm opacity-90 mb-4">
            Get access to 50+ additional scripts, custom phrase builder, and offline audio playback.
          </p>
          <button className="bg-white text-primary px-4 py-2 rounded-md font-medium text-sm">
            Upgrade to Premium
          </button>
        </div>
      )}
    </div>
  )
}

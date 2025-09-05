import React, { createContext, useContext, useReducer, useEffect } from 'react'

const AppContext = createContext()

const initialState = {
  user: {
    userId: null,
    state: null,
    premiumStatus: false,
    createdAt: null,
    trustedContacts: []
  },
  currentLocation: null,
  isRecording: false,
  incidentLogs: [],
  selectedLanguage: 'english'
}

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_USER_STATE':
      return {
        ...state,
        user: { ...state.user, state: action.payload }
      }
    case 'SET_PREMIUM_STATUS':
      return {
        ...state,
        user: { ...state.user, premiumStatus: action.payload }
      }
    case 'SET_LOCATION':
      return {
        ...state,
        currentLocation: action.payload
      }
    case 'SET_RECORDING':
      return {
        ...state,
        isRecording: action.payload
      }
    case 'ADD_INCIDENT_LOG':
      return {
        ...state,
        incidentLogs: [...state.incidentLogs, action.payload]
      }
    case 'SET_LANGUAGE':
      return {
        ...state,
        selectedLanguage: action.payload
      }
    case 'LOAD_STATE':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('rightsguard-state')
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState)
        dispatch({ type: 'LOAD_STATE', payload: parsed })
      } catch (error) {
        console.error('Error loading saved state:', error)
      }
    }
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('rightsguard-state', JSON.stringify(state))
  }, [state])

  // Get user's location
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'))
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timestamp: new Date().toISOString()
          }
          dispatch({ type: 'SET_LOCATION', payload: location })
          resolve(location)
        },
        (error) => reject(error),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 60000 }
      )
    })
  }

  // Create incident log
  const createIncidentLog = async () => {
    try {
      const location = await getCurrentLocation()
      const newLog = {
        logId: Date.now().toString(),
        userId: state.user.userId || 'anonymous',
        timestamp: new Date().toISOString(),
        latitude: location.latitude,
        longitude: location.longitude,
        recordingUrl: null,
        notes: '',
        status: 'active'
      }
      dispatch({ type: 'ADD_INCIDENT_LOG', payload: newLog })
      return newLog
    } catch (error) {
      console.error('Error creating incident log:', error)
      throw error
    }
  }

  const value = {
    state,
    dispatch,
    getCurrentLocation,
    createIncidentLog
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
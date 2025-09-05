import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import AppShell from './components/AppShell'
import HomePage from './pages/HomePage'
import RightsGuidePage from './pages/RightsGuidePage'
import ScriptsPage from './pages/ScriptsPage'
import RecordingPage from './pages/RecordingPage'
import IncidentLogPage from './pages/IncidentLogPage'
import SettingsPage from './pages/SettingsPage'
import { AppProvider } from './context/AppContext'

function App() {
  return (
    <AppProvider>
      <AppShell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rights" element={<RightsGuidePage />} />
          <Route path="/scripts" element={<ScriptsPage />} />
          <Route path="/record" element={<RecordingPage />} />
          <Route path="/incidents" element={<IncidentLogPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </AppShell>
    </AppProvider>
  )
}

export default App
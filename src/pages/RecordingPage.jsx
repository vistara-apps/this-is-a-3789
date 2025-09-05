import React, { useState, useEffect, useRef } from 'react'
import { useApp } from '../context/AppContext'
import RecordButton from '../components/RecordButton'
import ShareButton from '../components/ShareButton'
import { AlertTriangle, MapPin, Clock, Shield } from 'lucide-react'

export default function RecordingPage() {
  const { state, createIncidentLog } = useApp()
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [currentIncident, setCurrentIncident] = useState(null)
  const [mediaRecorder, setMediaRecorder] = useState(null)
  const [recordedChunks, setRecordedChunks] = useState([])
  const timerRef = useRef(null)

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
    } else {
      clearInterval(timerRef.current)
    }

    return () => clearInterval(timerRef.current)
  }, [isRecording])

  const startRecording = async () => {
    try {
      // Create incident log first
      const incident = await createIncidentLog()
      setCurrentIncident(incident)

      // Request media permissions
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: { facingMode: 'environment' } // Use rear camera
      })

      const recorder = new MediaRecorder(stream)
      const chunks = []

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data)
        }
      }

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' })
        setRecordedChunks(prev => [...prev, blob])
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop())
      }

      recorder.start()
      setMediaRecorder(recorder)
      setIsRecording(true)
      setRecordingTime(0)

    } catch (error) {
      console.error('Error starting recording:', error)
      alert('Could not access camera/microphone. Please check permissions.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop()
    }
    setIsRecording(false)
    setRecordingTime(0)
  }

  const handleRecordToggle = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  return (
    <div className="space-y-6">
      {/* Emergency Header */}
      <div className="card bg-red-50 border-l-4 border-red-500">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-6 w-6 text-red-500 mt-1" />
          <div>
            <h2 className="font-semibold text-red-800">Emergency Recording</h2>
            <p className="text-red-700 text-sm mt-1">
              Document your interaction. This recording will be saved securely with location and timestamp.
            </p>
          </div>
        </div>
      </div>

      {/* Recording Interface */}
      <div className="card text-center">
        <RecordButton
          variant={isRecording ? 'active' : 'inactive'}
          onToggle={handleRecordToggle}
          recordingTime={recordingTime}
        />
      </div>

      {/* Current Incident Info */}
      {currentIncident && (
        <div className="card">
          <h3 className="font-semibold text-text-primary mb-4 flex items-center space-x-2">
            <Shield className="h-5 w-5 text-accent" />
            <span>Incident Details</span>
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-sm">
              <Clock className="h-4 w-4 text-text-secondary" />
              <span className="text-text-secondary">Started:</span>
              <span className="text-text-primary font-medium">
                {new Date(currentIncident.timestamp).toLocaleString()}
              </span>
            </div>
            
            <div className="flex items-center space-x-3 text-sm">
              <MapPin className="h-4 w-4 text-text-secondary" />
              <span className="text-text-secondary">Location:</span>
              <span className="text-text-primary font-medium">
                {currentIncident.latitude.toFixed(6)}, {currentIncident.longitude.toFixed(6)}
              </span>
            </div>
            
            <div className="flex items-center space-x-3 text-sm">
              <span className="text-text-secondary">ID:</span>
              <span className="text-text-primary font-mono text-xs">
                {currentIncident.logId}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Share Options */}
      {currentIncident && (
        <div className="card">
          <h3 className="font-semibold text-text-primary mb-4">Alert Your Network</h3>
          <ShareButton incidentData={currentIncident} />
        </div>
      )}

      {/* Recording Tips */}
      <div className="card bg-blue-50 border-l-4 border-blue-400">
        <h3 className="font-semibold text-blue-800 mb-3">Recording Tips</h3>
        <ul className="space-y-2 text-blue-700 text-sm">
          <li>• Keep your phone steady and visible</li>
          <li>• State the date, time, and location clearly</li>
          <li>• Describe what is happening</li>
          <li>• Stay calm and follow officer instructions</li>
          <li>• Do not interfere with police work</li>
          <li>• You have the right to record in public spaces</li>
        </ul>
      </div>

      {/* Legal Notice */}
      <div className="card bg-gray-50">
        <h3 className="font-semibold text-text-primary mb-2">Legal Notice</h3>
        <p className="text-text-secondary text-sm">
          Recording police interactions is generally legal in public spaces in most states. 
          However, laws vary by location. Use this feature responsibly and in accordance with local laws.
        </p>
      </div>
    </div>
  )
}
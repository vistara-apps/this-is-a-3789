import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Shield, Book, MessageSquare, Video, FileText, Settings } from 'lucide-react'

const navigation = [
  { name: 'Home', href: '/', icon: Shield },
  { name: 'Rights', href: '/rights', icon: Book },
  { name: 'Scripts', href: '/scripts', icon: MessageSquare },
  { name: 'Record', href: '/record', icon: Video },
  { name: 'Incidents', href: '/incidents', icon: FileText },
]

export default function AppShell({ children }) {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="bg-surface shadow-card sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-accent" />
              <h1 className="text-xl font-bold text-text-primary">RightsGuard</h1>
            </div>
            <Link to="/settings">
              <Settings className="h-6 w-6 text-text-secondary hover:text-text-primary" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6 pb-24">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-around py-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex flex-col items-center py-2 px-3 rounded-md transition-colors ${
                    isActive
                      ? 'text-accent bg-accent/10'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs mt-1">{item.name}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>
    </div>
  )
}
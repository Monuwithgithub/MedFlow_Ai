import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import type { Session } from '@supabase/supabase-js'
import { Layout } from './components/Layout'
import { ToastProvider } from './components/Toast'
import Auth from './pages/auth'
import Dashboard from './pages/Dashboard'
import Inventory from './pages/Inventory'
// ... other imports

export default function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get current session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // Listen for auth state changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
        // _event can be: SIGNED_IN, SIGNED_OUT, TOKEN_REFRESHED, USER_UPDATED
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f4ff]">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 animate-pulse" />
      </div>
    )
  }

  // Not logged in → show Auth page
  if (!session) return (
    <>
      <ToastProvider />
      <Auth />
    </>
  )

  // Logged in → show full app
  return (
    <BrowserRouter>
      <ToastProvider />
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          {/* ... other routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
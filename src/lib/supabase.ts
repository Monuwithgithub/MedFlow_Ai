import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,        // keeps user logged in after page refresh
    autoRefreshToken: true,      // auto-refreshes JWT before expiry
    detectSessionInUrl: true,    // handles OAuth redirect URLs
  },
  realtime: {
    params: {
      eventsPerSecond: 10,       // throttle realtime events
    },
  },
})

// Helper: get current user ID
export const getCurrentUserId = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user?.id ?? null
}
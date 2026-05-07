import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'

export function useProfile() {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setLoading(false); return }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (!error) setProfile(data)
      setLoading(false)
    }
    fetch()
  }, [])

  const updateProfile = async (updates: Partial<typeof profile>) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return false

    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)

    if (error) { toast.error(error.message); return false }
    setProfile((prev: any) => ({ ...prev, ...updates }))
    toast.success('Profile updated!')
    return true
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    toast.success('Signed out successfully')
  }

  return { profile, loading, updateProfile, signOut }
}
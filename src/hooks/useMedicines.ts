import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import type { Medicine } from '../lib/mockData'
import toast from 'react-hot-toast'

// Fetch all medicines
export function useMedicines() {
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMedicines = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('medicines')
      .select('*')
      .order('name', { ascending: true })

    if (error) {
      setError(error.message)
      toast.error('Failed to load medicines')
    } else {
      // Map snake_case DB columns to camelCase frontend fields
      setMedicines(data.map(m => ({
        id: m.id,
        name: m.name,
        batch: m.batch,
        quantity: m.quantity,
        expiryDate: m.expiry_date,    // expiry_date → expiryDate
        category: m.category,
        supplier: m.supplier,
        price: m.price,
        status: m.status as Medicine['status'],
        location: m.location,
      })))
    }
    setLoading(false)
  }, [])

  useEffect(() => { fetchMedicines() }, [fetchMedicines])

  return { medicines, loading, error, refetch: fetchMedicines }
}

// Add a new medicine
export function useAddMedicine() {
  const [loading, setLoading] = useState(false)

  const addMedicine = async (medicine: Omit<Medicine, 'id' | 'status'>) => {
    setLoading(true)
    const { data, error } = await supabase
      .from('medicines')
      .insert({
        name: medicine.name,
        batch: medicine.batch,
        quantity: medicine.quantity,
        expiry_date: medicine.expiryDate,
        category: medicine.category,
        supplier: medicine.supplier,
        price: medicine.price,
        location: medicine.location,
        // status is auto-computed by DB trigger!
      })
      .select()
      .single()

    if (error) {
      toast.error(error.message)
      setLoading(false)
      return null
    }

    toast.success(`${medicine.name} added to inventory!`)
    setLoading(false)
    return data
  }

  return { addMedicine, loading }
}

// Update a medicine
export function useUpdateMedicine() {
  const updateMedicine = async (id: string, updates: Partial<Medicine>) => {
    const { error } = await supabase
      .from('medicines')
      .update({
        name: updates.name,
        quantity: updates.quantity,
        expiry_date: updates.expiryDate,
        price: updates.price,
        location: updates.location,
        // Don't update batch — it's unique and shouldn't change
      })
      .eq('id', id)

    if (error) { toast.error(error.message); return false }
    toast.success('Medicine updated!')
    return true
  }
  return { updateMedicine }
}

// Delete a medicine (admin only — enforced by RLS)
export function useDeleteMedicine() {
  const deleteMedicine = async (id: string) => {
    const { error } = await supabase
      .from('medicines')
      .delete()
      .eq('id', id)

    if (error) { toast.error(error.message); return false }
    toast.success('Medicine removed from inventory')
    return true
  }
  return { deleteMedicine }
}
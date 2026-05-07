import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Medicine } from '../lib/mockData'
import toast from 'react-hot-toast'

export function useMedicinesRealtime() {
    const [medicines, setMedicines] = useState<Medicine[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // 1. Initial fetch
        const fetchAll = async () => {
            const { data } = await supabase
                .from('medicines')
                .select('*')
                .order('name')

            if (data) setMedicines(data.map(mapMedicine))
            setLoading(false)
        }
        fetchAll()

        // 2. Subscribe to realtime changes
        const channel = supabase
            .channel('medicines-changes')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'medicines' },
                (payload) => {
                    if (payload.eventType === 'INSERT') {
                        // New medicine added → prepend to list
                        setMedicines(prev => [mapMedicine(payload.new), ...prev])
                        toast.success(`New medicine added: ${payload.new.name}`)
                    }
                    if (payload.eventType === 'UPDATE') {
                        // Medicine updated → replace in list
                        setMedicines(prev => prev.map(m =>
                            m.id === payload.new.id ? mapMedicine(payload.new) : m
                        ))
                    }
                    if (payload.eventType === 'DELETE') {
                        // Medicine deleted → remove from list
                        setMedicines(prev => prev.filter(m => m.id !== payload.old.id))
                    }
                }
            )
            .subscribe()

        // 3. Cleanup: unsubscribe when component unmounts
        return () => { supabase.removeChannel(channel) }
    }, [])

    return { medicines, loading }
}

// Map DB row (snake_case) to frontend type (camelCase)
function mapMedicine(row: any): Medicine {
    return {
        id: row.id,
        name: row.name,
        batch: row.batch,
        quantity: row.quantity,
        expiryDate: row.expiry_date,
        category: row.category,
        supplier: row.supplier,
        price: row.price,
        status: row.status,
        location: row.location,
    }
}
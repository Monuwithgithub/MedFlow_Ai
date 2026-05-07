import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'

export function useTransfers() {
    const [transfers, setTransfers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetch = async () => {
            const { data, error } = await supabase
                .from('redistribution_transfers')
                .select('*, medicines(name, batch)')  // JOIN medicines
                .order('created_at', { ascending: false })

            if (!error && data) {
                setTransfers(data.map(t => ({
                    id: t.id,
                    medicine: t.medicines?.name ?? 'Unknown',
                    from: t.from_loc,
                    to: t.to_loc,
                    quantity: t.quantity,
                    reason: t.reason,
                    urgency: t.urgency,
                    status: t.status,
                })))
            }
            setLoading(false)
        }
        fetch()
    }, [])

    const approveTransfer = async (id: string, medicine: string) => {
        const { data: { user } } = await supabase.auth.getUser()
        const { error } = await supabase
            .from('redistribution_transfers')
            .update({
                status: 'approved',
                approved_by: user?.id,
                approved_at: new Date().toISOString(),
            })
            .eq('id', id)

        if (error) { toast.error(error.message); return false }
        toast.success(`Transfer approved: ${medicine}`)
        setTransfers(prev => prev.filter(t => t.id !== id))
        return true
    }

    const rejectTransfer = async (id: string) => {
        const { error } = await supabase
            .from('redistribution_transfers')
            .update({ status: 'rejected' })
            .eq('id', id)

        if (error) { toast.error(error.message); return false }
        toast.error('Transfer rejected')
        setTransfers(prev => prev.filter(t => t.id !== id))
        return true
    }

    return { transfers, loading, approveTransfer, rejectTransfer }
}
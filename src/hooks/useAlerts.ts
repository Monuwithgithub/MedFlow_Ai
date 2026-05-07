import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Alert } from '../lib/mockData'

export function useAlerts() {
    const [alerts, setAlerts] = useState<Alert[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetch = async () => {
            const { data, error } = await supabase
                .from('alerts')
                .select('*, medicines(name)')   // JOIN to get medicine name
                .order('created_at', { ascending: false })
                .limit(20)

            if (!error && data) {
                setAlerts(data.map(a => ({
                    id: a.id,
                    type: a.type as Alert['type'],
                    message: a.message,
                    severity: a.severity as Alert['severity'],
                    time: formatTimeAgo(a.created_at),
                })))
            }
            setLoading(false)
        }
        fetch()
    }, [])

    const markAsRead = async (id: string) => {
        await supabase.from('alerts').update({ is_read: true }).eq('id', id)
        setAlerts(prev => prev.filter(a => a.id !== id))
    }

    return { alerts, loading, markAsRead }
}

function formatTimeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return 'just now'
    if (mins < 60) return `${mins} min ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs} hr ago`
    return `${Math.floor(hrs / 24)} days ago`
}
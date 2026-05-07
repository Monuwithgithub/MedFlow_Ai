import { supabase } from './supabase'

type Action = 'LOGIN' | 'LOGOUT' | 'EXPORT' | 'UPLOAD_INVOICE' |
    'APPROVE_TRANSFER' | 'REJECT_TRANSFER' | 'VIEW_REPORT'

export async function logActivity(
    action: Action,
    entityType: string,
    entityId?: string,
    metadata?: Record<string, any>
) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return  // not logged in, skip

    await supabase.from('activity_logs').insert({
        user_id: user.id,
        action,
        entity_type: entityType,
        entity_id: entityId ?? null,
        new_data: metadata ?? null,
        ip_address: null,  // can get from request in server-side code
        user_agent: navigator.userAgent,
    })
}

// Usage examples:
// await logActivity('LOGIN', 'auth')
// await logActivity('EXPORT', 'medicines', undefined, { format: 'csv', count: 12 })
// await logActivity('APPROVE_TRANSFER', 'transfer', transferId)
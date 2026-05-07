import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Activity, Eye, EyeOff, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Auth() {
    const [mode, setMode] = useState<'login' | 'signup'>('login')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [showPw, setShowPw] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) toast.error(error.message)
        else toast.success('Welcome back!')
        setLoading(false)
    }

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { full_name: name, role: 'pharmacist' }
                // This data goes into raw_user_meta_data
                // Our trigger reads it to create the profile row
            }
        })
        if (error) toast.error(error.message)
        else toast.success('Account created! Check your email to verify.')
        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-[#f0f4ff] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8 w-full max-w-md">
                {/* Logo */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                        <Activity size={20} className="text-white" />
                    </div>
                    <div>
                        <span className="text-lg font-800 text-slate-900">MedFlow</span>
                        <span className="text-lg font-800 text-blue-500"> AI</span>
                    </div>
                </div>

                <h2 className="text-xl font-800 text-slate-900 mb-1">
                    {mode === 'login' ? 'Welcome back' : 'Create account'}
                </h2>
                <p className="text-sm text-slate-500 mb-6">
                    {mode === 'login' ? 'Sign in to your pharmacy dashboard' : 'Start managing your inventory'}
                </p>

                <form onSubmit={mode === 'login' ? handleLogin : handleSignup} className="space-y-4">
                    {mode === 'signup' && (
                        <div>
                            <label className="block text-xs font-700 text-slate-600 mb-1.5">Full Name</label>
                            <input
                                type="text" value={name} onChange={e => setName(e.target.value)}
                                placeholder="Dr. Rajan Kumar" required
                                className="w-full px-3 py-2.5 text-sm bg-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-300"
                            />
                        </div>
                    )}
                    <div>
                        <label className="block text-xs font-700 text-slate-600 mb-1.5">Email</label>
                        <input
                            type="email" value={email} onChange={e => setEmail(e.target.value)}
                            placeholder="you@pharmacy.com" required
                            className="w-full px-3 py-2.5 text-sm bg-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-300"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-700 text-slate-600 mb-1.5">Password</label>
                        <div className="relative">
                            <input
                                type={showPw ? 'text' : 'password'} value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="••••••••" required minLength={6}
                                className="w-full px-3 py-2.5 text-sm bg-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-300 pr-10"
                            />
                            <button type="button" onClick={() => setShowPw(p => !p)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                            </button>
                        </div>
                    </div>

                    <button type="submit" disabled={loading}
                        className="w-full py-3 text-sm font-700 text-white bg-blue-500 hover:bg-blue-600 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
                        {loading && <Loader2 size={15} className="animate-spin" />}
                        {mode === 'login' ? 'Sign In' : 'Create Account'}
                    </button>
                </form>

                <p className="text-center text-xs text-slate-500 mt-4">
                    {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                    <button onClick={() => setMode(m => m === 'login' ? 'signup' : 'login')}
                        className="text-blue-500 font-600 hover:text-blue-600">
                        {mode === 'login' ? 'Sign up' : 'Sign in'}
                    </button>
                </p>
            </div>
        </div>
    )
}
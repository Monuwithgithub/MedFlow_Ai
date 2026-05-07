import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Activity, Eye, EyeOff, Loader2, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Auth() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) toast.error(error.message);
    else toast.success('Welcome back!');
    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          role: 'pharmacist',
        },
      },
    });
    if (error) toast.error(error.message);
    else toast.success('Account created! Check your email to verify.');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f0f4ff] dark:bg-[#0d1117] flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-white dark:bg-[#161b27] rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-xl p-8">

          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Activity size={20} className="text-white" />
            </div>
            <div>
              <span className="text-lg font-800 text-slate-900 dark:text-white">MedFlow</span>
              <span className="text-lg font-800 text-blue-500"> AI</span>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-xl font-800 text-slate-900 dark:text-white mb-1">
            {mode === 'login' ? 'Welcome back' : 'Create account'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            {mode === 'login'
              ? 'Sign in to your pharmacy dashboard'
              : 'Start managing your inventory today'}
          </p>

          {/* Form */}
          <form
            onSubmit={mode === 'login' ? handleLogin : handleSignup}
            className="space-y-4"
          >
            {/* Name — only on signup */}
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-700 text-slate-600 dark:text-slate-400 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Dr. Rajan Kumar"
                  required
                  className="w-full px-3 py-2.5 text-sm text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-blue-300 dark:focus:border-blue-700 rounded-xl outline-none transition-colors"
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-xs font-700 text-slate-600 dark:text-slate-400 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@pharmacy.com"
                required
                className="w-full px-3 py-2.5 text-sm text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-blue-300 dark:focus:border-blue-700 rounded-xl outline-none transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-700 text-slate-600 dark:text-slate-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full px-3 py-2.5 text-sm text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-blue-300 dark:focus:border-blue-700 rounded-xl outline-none transition-colors pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {mode === 'signup' && (
                <p className="text-[10px] text-slate-400 mt-1">Minimum 6 characters</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-sm font-700 text-white bg-blue-500 hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed rounded-xl transition-colors flex items-center justify-center gap-2 mt-2"
            >
              {loading && <Loader2 size={15} className="animate-spin" />}
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Toggle Mode */}
          <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-5">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => setMode(m => m === 'login' ? 'signup' : 'login')}
              className="text-blue-500 font-700 hover:text-blue-600 transition-colors"
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        {/* Security note */}
        <div className="flex items-center justify-center gap-2 mt-4 text-[11px] text-slate-400">
          <Shield size={12} />
          <span>Secured with Supabase Auth + Row Level Security</span>
        </div>

      </div>
    </div>
  );
}
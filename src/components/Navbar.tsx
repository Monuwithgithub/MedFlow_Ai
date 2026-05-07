import { Search, Bell, Menu, Sun, Moon, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';
import { alerts } from '../lib/mockData';

interface NavbarProps {
  onMenuToggle: () => void;
  isDark: boolean;
  onThemeToggle: () => void;
  sidebarOpen: boolean;
}

export function Navbar({ onMenuToggle, isDark, onThemeToggle, sidebarOpen }: NavbarProps) {
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const criticalCount = alerts.filter(a => a.severity === 'critical').length;

  return (
    <header className={cn(
      'fixed top-0 right-0 h-16 z-30 flex items-center justify-between px-4 lg:px-6',
      'bg-white/90 dark:bg-[#161b27]/90 backdrop-blur-md',
      'border-b border-slate-200 dark:border-slate-700/60',
      'transition-all duration-300',
      sidebarOpen ? 'left-64' : 'left-0 lg:left-16'
    )}>
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
        >
          <Menu size={20} />
        </button>
        {/* Search */}
        <div className="hidden sm:flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-xl px-3 py-2 w-64 lg:w-80">
          <Search size={15} className="text-slate-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search medicines, batches..."
            className="bg-transparent text-sm text-slate-700 dark:text-slate-300 placeholder-slate-400 outline-none flex-1 font-500"
          />
          <kbd className="hidden lg:block text-[10px] text-slate-400 bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        <button
          onClick={onThemeToggle}
          className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotifs(p => !p); setShowProfile(false); }}
            className="relative p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
          >
            <Bell size={18} />
            {criticalCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full">
                <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75" />
              </span>
            )}
          </button>

          {showNotifs && (
            <div className="absolute right-0 top-12 w-80 bg-white dark:bg-[#1e2535] rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                <span className="text-sm font-700 text-slate-800 dark:text-slate-200">Notifications</span>
                <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-600">{criticalCount} critical</span>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {alerts.map(alert => (
                  <div key={alert.id} className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b border-slate-100 dark:border-slate-700/50 last:border-0 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        'w-2 h-2 rounded-full mt-1.5 flex-shrink-0',
                        alert.severity === 'critical' ? 'bg-red-500' :
                        alert.severity === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                      )} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-700 dark:text-slate-300 font-500 leading-relaxed">{alert.message}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{alert.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50">
                <button className="text-xs text-blue-500 font-600 hover:text-blue-600">View all notifications</button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setShowProfile(p => !p); setShowNotifs(false); }}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-700">
              DR
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-700 text-slate-800 dark:text-slate-200">Dr. Rajan</p>
              <p className="text-[10px] text-slate-400">Admin</p>
            </div>
            <ChevronDown size={14} className="text-slate-400 hidden lg:block" />
          </button>

          {showProfile && (
            <div className="absolute right-0 top-12 w-48 bg-white dark:bg-[#1e2535] rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50">
              {['My Profile', 'Preferences', 'Billing', 'Sign out'].map(item => (
                <button key={item} className={cn(
                  'w-full text-left px-4 py-2.5 text-sm font-500 transition-colors',
                  item === 'Sign out'
                    ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 border-t border-slate-100 dark:border-slate-700'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                )}>{item}</button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Click outside */}
      {(showNotifs || showProfile) && (
        <div className="fixed inset-0 z-40" onClick={() => { setShowNotifs(false); setShowProfile(false); }} />
      )}
    </header>
  );
}

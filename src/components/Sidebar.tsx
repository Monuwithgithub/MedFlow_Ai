import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Package, FileUp, Clock, TrendingUp,
  ArrowLeftRight, Settings, X, Activity, ChevronRight, BookOpen
} from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/inventory', icon: Package, label: 'Inventory' },
  { to: '/invoice', icon: FileUp, label: 'Invoice Upload' },
  { to: '/expiry', icon: Clock, label: 'Expiry Tracker' },
  { to: '/forecast', icon: TrendingUp, label: 'Demand Forecast' },
  { to: '/redistribution', icon: ArrowLeftRight, label: 'Redistribution' },
  { to: '/settings', icon: Settings, label: 'Settings' },
  { to: '/backend-guide', icon: BookOpen, label: 'Backend Guide' },
];

interface SidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, isMobile, onClose }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={cn(
        'fixed left-0 top-0 h-full z-50 flex flex-col',
        'bg-white dark:bg-[#161b27] border-r border-slate-200 dark:border-slate-700/60',
        'transition-all duration-300 ease-in-out',
        isOpen ? 'w-64' : isMobile ? '-translate-x-full w-64' : 'w-16',
        isMobile && isOpen && 'translate-x-0',
        isMobile && !isOpen && '-translate-x-full'
      )}>
        {/* Logo */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-slate-200 dark:border-slate-700/60 flex-shrink-0">
          <div className={cn('flex items-center gap-3 overflow-hidden', !isOpen && !isMobile && 'justify-center w-full')}>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
              <Activity size={16} className="text-white" />
            </div>
            {(isOpen || isMobile) && (
              <div className="animate-fade-in">
                <span className="text-sm font-800 text-slate-900 dark:text-white">MedFlow</span>
                <span className="text-sm font-800 text-blue-500"> AI</span>
              </div>
            )}
          </div>
          {isMobile && isOpen && (
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
              <X size={16} />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {!isOpen && !isMobile && (
            <p className="text-[9px] font-700 text-slate-400 uppercase tracking-widest px-2 mb-3">NAV</p>
          )}
          {isOpen && (
            <p className="text-[9px] font-700 text-slate-400 uppercase tracking-widest px-3 mb-3">NAVIGATION</p>
          )}
          {navItems.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={isMobile ? onClose : undefined}
              className={({ isActive }) => cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-600 transition-all duration-150 group relative',
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200',
                !isOpen && !isMobile && 'justify-center px-0'
              )}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-blue-500 rounded-r-full" />
                  )}
                  <Icon size={18} className="flex-shrink-0" />
                  {(isOpen || isMobile) && (
                    <span className="flex-1 animate-fade-in">{label}</span>
                  )}
                  {(isOpen || isMobile) && isActive && (
                    <ChevronRight size={14} className="text-blue-400" />
                  )}
                  {/* Tooltip for collapsed */}
                  {!isOpen && !isMobile && (
                    <div className="absolute left-14 bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                      {label}
                    </div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        {(isOpen || isMobile) && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-700/60">
            <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-3">
              <p className="text-xs font-700 text-slate-700 dark:text-slate-300">AI Engine</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Model accuracy: 94.7%</p>
              <div className="mt-2 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full w-[94.7%] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}

import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../lib/utils';

interface KPICardProps {
  title: string;
  value: string | number;
  change: number;
  unit?: string;
  icon: React.ReactNode;
  iconBg: string;
  loading?: boolean;
}

export function KPICard({ title, value, change, unit, icon, iconBg, loading }: KPICardProps) {
  if (loading) {
    return (
      <div className="bg-white dark:bg-[#161b27] rounded-2xl border border-slate-200 dark:border-slate-700/60 p-5">
        <div className="skeleton h-4 w-24 mb-3" />
        <div className="skeleton h-8 w-32 mb-2" />
        <div className="skeleton h-3 w-20" />
      </div>
    );
  }

  const isPositive = change >= 0;

  return (
    <div className={cn(
      'bg-white dark:bg-[#161b27] rounded-2xl border border-slate-200 dark:border-slate-700/60',
      'p-5 card-hover transition-all duration-200 group relative overflow-hidden'
    )}>
      {/* Background accent */}
      <div className={cn('absolute -right-4 -top-4 w-20 h-20 rounded-full opacity-8', iconBg)} />

      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-600 text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{title}</p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-800 text-slate-900 dark:text-white">{value}</span>
            {unit && <span className="text-sm text-slate-500 dark:text-slate-400">{unit}</span>}
          </div>
          <div className={cn(
            'flex items-center gap-1 mt-2 text-xs font-600',
            isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'
          )}>
            {isPositive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
            <span>{isPositive ? '+' : ''}{change}% vs last month</span>
          </div>
        </div>
        <div className={cn('w-11 h-11 rounded-2xl flex items-center justify-center text-white flex-shrink-0', iconBg)}>
          {icon}
        </div>
      </div>
    </div>
  );
}

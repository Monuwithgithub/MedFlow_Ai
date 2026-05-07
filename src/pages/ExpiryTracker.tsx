import { useMemo } from 'react';
import { Clock, AlertTriangle, CheckCircle, XCircle, Calendar } from 'lucide-react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { medicines } from '../lib/mockData';
import { cn, formatDate, daysUntilExpiry } from '../lib/utils';
import toast from 'react-hot-toast';

export default function ExpiryTracker() {
  const groups = useMemo(() => {
    const expired: typeof medicines = [];
    const within30: typeof medicines = [];
    const within60: typeof medicines = [];
    const within90: typeof medicines = [];
    const safe: typeof medicines = [];

    medicines.forEach(med => {
      const days = daysUntilExpiry(med.expiryDate);
      if (days < 0) expired.push(med);
      else if (days <= 30) within30.push(med);
      else if (days <= 60) within60.push(med);
      else if (days <= 90) within90.push(med);
      else safe.push(med);
    });

    return { expired, within30, within60, within90, safe };
  }, []);

  const MedCard = ({ med, urgency }: { med: typeof medicines[0]; urgency: 'expired' | 'critical' | 'warning' | 'caution' | 'safe' }) => {
    const days = daysUntilExpiry(med.expiryDate);
    const configs = {
      expired: { bar: 'bg-slate-400', text: 'text-slate-500', bg: 'bg-slate-50 dark:bg-slate-800/40', border: 'border-slate-200 dark:border-slate-700' },
      critical: { bar: 'bg-red-500', text: 'text-red-500', bg: 'bg-red-50/60 dark:bg-red-900/10', border: 'border-red-200 dark:border-red-900/30' },
      warning: { bar: 'bg-amber-500', text: 'text-amber-500', bg: 'bg-amber-50/60 dark:bg-amber-900/10', border: 'border-amber-200 dark:border-amber-900/30' },
      caution: { bar: 'bg-yellow-400', text: 'text-yellow-600', bg: 'bg-yellow-50/60 dark:bg-yellow-900/10', border: 'border-yellow-200 dark:border-yellow-900/30' },
      safe: { bar: 'bg-emerald-500', text: 'text-emerald-500', bg: 'bg-emerald-50/60 dark:bg-emerald-900/10', border: 'border-emerald-200 dark:border-emerald-900/30' },
    };
    const c = configs[urgency];

    return (
      <div className={cn('rounded-xl p-4 border transition-all hover:shadow-md', c.bg, c.border)}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-700 text-slate-800 dark:text-slate-200 truncate">{med.name}</p>
            <p className="text-[10px] text-slate-500 mt-0.5 font-mono">{med.batch}</p>
          </div>
          <div className={cn('text-xs font-800 ml-3', c.text)}>
            {days < 0 ? 'EXPIRED' : `${days}d`}
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-3">
          <div
            className={cn('h-full rounded-full transition-all', c.bar)}
            style={{ width: `${Math.max(0, Math.min(100, (days / 365) * 100))}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-[10px] text-slate-500">
            <span>{med.quantity} units</span>
            <span>·</span>
            <span>{med.location}</span>
          </div>
          <span className="text-[10px] text-slate-500">{formatDate(med.expiryDate)}</span>
        </div>

        {urgency !== 'safe' && urgency !== 'expired' && (
          <button
            onClick={() => toast.success(`Alert sent for ${med.name}`)}
            className={cn(
              'mt-3 w-full py-1.5 text-[11px] font-600 rounded-lg transition-colors',
              urgency === 'critical'
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 border border-slate-200 dark:border-slate-700'
            )}
          >
            {urgency === 'critical' ? 'Take Action Now' : 'Schedule Review'}
          </button>
        )}
      </div>
    );
  };

  const sections = [
    {
      title: 'Expired',
      subtitle: 'Immediate disposal required',
      icon: <XCircle size={18} className="text-slate-500" />,
      iconBg: 'bg-slate-100 dark:bg-slate-800',
      meds: groups.expired,
      urgency: 'expired' as const,
      countBg: 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400',
    },
    {
      title: 'Expiring in 30 days',
      subtitle: 'Critical — take immediate action',
      icon: <AlertTriangle size={18} className="text-red-500" />,
      iconBg: 'bg-red-50 dark:bg-red-900/20',
      meds: groups.within30,
      urgency: 'critical' as const,
      countBg: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
    },
    {
      title: 'Expiring in 60 days',
      subtitle: 'Warning — plan redistribution',
      icon: <Clock size={18} className="text-amber-500" />,
      iconBg: 'bg-amber-50 dark:bg-amber-900/20',
      meds: groups.within60,
      urgency: 'warning' as const,
      countBg: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
    },
    {
      title: 'Expiring in 90 days',
      subtitle: 'Monitor closely',
      icon: <Calendar size={18} className="text-yellow-500" />,
      iconBg: 'bg-yellow-50 dark:bg-yellow-900/20',
      meds: groups.within90,
      urgency: 'caution' as const,
      countBg: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
    },
    {
      title: 'Safe Stock',
      subtitle: 'No action needed',
      icon: <CheckCircle size={18} className="text-emerald-500" />,
      iconBg: 'bg-emerald-50 dark:bg-emerald-900/20',
      meds: groups.safe,
      urgency: 'safe' as const,
      countBg: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
    },
  ];

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-800 text-slate-900 dark:text-white">Expiry Tracker</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Real-time expiry monitoring across all medicines</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {sections.map(s => (
          <div key={s.title} className="bg-white dark:bg-[#161b27] rounded-2xl border border-slate-200 dark:border-slate-700/60 p-4 text-center">
            <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center mx-auto mb-2', s.iconBg)}>
              {s.icon}
            </div>
            <p className={cn('text-2xl font-800', s.countBg.includes('red') ? 'text-red-500' : s.countBg.includes('amber') ? 'text-amber-500' : s.countBg.includes('emerald') ? 'text-emerald-500' : 'text-slate-600')}>
              {s.meds.length}
            </p>
            <p className="text-[10px] text-slate-500 font-600 mt-0.5 leading-tight">{s.title.replace('Expiring in ', '').replace('days', 'd')}</p>
          </div>
        ))}
      </div>

      {/* Sections */}
      <div className="space-y-5">
        {sections.filter(s => s.meds.length > 0).map(section => (
          <Card key={section.title} padding="none">
            <div className="px-5 pt-5 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center', section.iconBg)}>
                  {section.icon}
                </div>
                <div>
                  <h3 className="text-sm font-700 text-slate-800 dark:text-slate-100">{section.title}</h3>
                  <p className="text-xs text-slate-500">{section.subtitle}</p>
                </div>
              </div>
              <span className={cn('text-xs font-700 px-2.5 py-1 rounded-full', section.countBg)}>
                {section.meds.length} medicine{section.meds.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="px-5 pb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {section.meds.map(med => (
                <MedCard key={med.id} med={med} urgency={section.urgency} />
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

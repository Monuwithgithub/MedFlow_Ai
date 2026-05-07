import { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import {
  Package, AlertTriangle, Brain, Leaf,
  TrendingUp, Bell, ArrowRight, Clock
} from 'lucide-react';
import { KPICard } from '../components/KPICard';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { ChartWrapper } from '../components/ChartWrapper';
import { kpiData, demandTrendData, categoryDistribution, alerts, medicines } from '../lib/mockData';
import { cn, formatDate, daysUntilExpiry } from '../lib/utils';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-[#1e2535] border border-slate-200 dark:border-slate-700 rounded-xl p-3 shadow-lg">
        <p className="text-xs font-700 text-slate-600 dark:text-slate-300 mb-2">{label}</p>
        {payload.map((entry: any) => (
          <div key={entry.name} className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
            <span className="text-slate-600 dark:text-slate-400 capitalize">{entry.name}:</span>
            <span className="font-700 text-slate-800 dark:text-slate-200">{entry.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};



export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const criticalMeds = medicines.filter(m => m.status === 'critical').slice(0, 3);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-800 text-slate-900 dark:text-white">Dashboard</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Welcome back, Dr. Rajan — here's your pharmacy overview</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-[#161b27] border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2">
          <Clock size={13} />
          <span>Last updated: just now</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard
          loading={loading}
          title="Total Inventory"
          value={loading ? '' : '12,840'}
          change={kpiData.totalInventory.change}
          unit="units"
          icon={<Package size={20} />}
          iconBg="bg-blue-500"
        />
        <KPICard
          loading={loading}
          title="Expiring Soon"
          value={loading ? '' : kpiData.expiringSoon.value}
          change={kpiData.expiringSoon.change}
          unit="medicines"
          icon={<AlertTriangle size={20} />}
          iconBg="bg-amber-500"
        />
        <KPICard
          loading={loading}
          title="AI Accuracy"
          value={loading ? '' : `${kpiData.demandAccuracy.value}%`}
          change={kpiData.demandAccuracy.change}
          icon={<Brain size={20} />}
          iconBg="bg-indigo-500"
        />
        <KPICard
          loading={loading}
          title="Waste Saved"
          value={loading ? '' : '$18.4K'}
          change={kpiData.wasteSaved.change}
          icon={<Leaf size={20} />}
          iconBg="bg-emerald-500"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Demand Trend */}
        <ChartWrapper
          className="xl:col-span-2"
          title="Demand Trend"
          subtitle="Monthly demand across top categories"
          height={280}
          action={
            <select className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-800 border-0 rounded-lg px-2 py-1.5 outline-none cursor-pointer">
              <option>Last 7 months</option>
              <option>Last 12 months</option>
            </select>
          }
        >
          {loading ? (
            <div className="h-full flex items-end gap-2 px-4 pb-4">
              {[60, 80, 45, 90, 70, 85, 55].map((h, i) => (
                <div key={i} className="flex-1 skeleton rounded-t-lg" style={{ height: `${h}%` }} />
              ))}
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={demandTrendData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:stroke-slate-700" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, paddingTop: 12 }} />
                <Line type="monotone" dataKey="paracetamol" stroke="#4f6ef7" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="antibiotics" stroke="#7c3aed" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="cardiovascular" stroke="#06b6d4" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </ChartWrapper>

        {/* Category Distribution */}
        <ChartWrapper
          title="Category Distribution"
          subtitle="Inventory by medicine type"
          height={280}
        >
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <div className="skeleton w-40 h-40 rounded-full" />
            </div>
          ) : (
            <div className="h-full flex flex-col justify-between px-2 pb-2">
              <ResponsiveContainer width="100%" height={165}>
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    cx="50%" cy="50%"
                    innerRadius={45} outerRadius={70}
                    dataKey="value"
                    paddingAngle={3}
                  >
                    {categoryDistribution.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: any) => [`${value}%`, 'Share']}
                    contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 11 }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-1.5 px-1">
                {categoryDistribution.map(cat => (
                  <div key={cat.name} className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: cat.color }} />
                    <span className="text-[10px] text-slate-500 truncate">{cat.name}</span>
                    <span className="text-[10px] font-700 text-slate-700 dark:text-slate-300 ml-auto">{cat.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </ChartWrapper>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Alerts Panel */}
        <Card padding="none">
          <div className="px-5 pt-5 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                <Bell size={16} className="text-red-500" />
              </div>
              <div>
                <h3 className="text-sm font-700 text-slate-800 dark:text-slate-100">Active Alerts</h3>
                <p className="text-xs text-slate-500">{alerts.filter(a => a.severity === 'critical').length} critical issues</p>
              </div>
            </div>
            <button className="text-xs text-blue-500 font-600 flex items-center gap-1 hover:gap-2 transition-all">
              View all <ArrowRight size={12} />
            </button>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
            {alerts.map((alert, i) => (
              <div key={alert.id} className={cn(
                'px-5 py-3.5 flex items-start gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors',
                'animate-fade-in'
              )} style={{ animationDelay: `${i * 80}ms` }}>
                <div className={cn(
                  'w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5',
                  alert.severity === 'critical' ? 'bg-red-50 dark:bg-red-900/20' :
                  alert.severity === 'warning' ? 'bg-amber-50 dark:bg-amber-900/20' : 'bg-blue-50 dark:bg-blue-900/20'
                )}>
                  <AlertTriangle size={14} className={cn(
                    alert.severity === 'critical' ? 'text-red-500' :
                    alert.severity === 'warning' ? 'text-amber-500' : 'text-blue-500'
                  )} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-600 text-slate-700 dark:text-slate-300 leading-relaxed">{alert.message}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{alert.time}</p>
                </div>
                <Badge variant={alert.severity === 'critical' ? 'critical' : alert.severity === 'warning' ? 'warning' : 'info'}>
                  {alert.severity}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Critical Stock */}
        <Card padding="none">
          <div className="px-5 pt-5 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center">
                <TrendingUp size={16} className="text-amber-500" />
              </div>
              <div>
                <h3 className="text-sm font-700 text-slate-800 dark:text-slate-100">Critical Medicines</h3>
                <p className="text-xs text-slate-500">Requires immediate attention</p>
              </div>
            </div>
          </div>
          <div className="px-5 pb-5 space-y-3">
            {medicines.filter(m => m.status === 'critical').map((med, i) => (
              <div key={med.id} className={cn(
                'flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50',
                'animate-fade-in'
              )} style={{ animationDelay: `${i * 100}ms` }}>
                <div>
                  <p className="text-xs font-700 text-slate-800 dark:text-slate-200">{med.name}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{med.batch} · {med.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-700 text-red-500">{med.quantity} units</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Exp: {formatDate(med.expiryDate)}</p>
                </div>
              </div>
            ))}

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              {[
                { label: 'Safe', count: medicines.filter(m => m.status === 'safe').length, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
                { label: 'Warning', count: medicines.filter(m => m.status === 'warning').length, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
                { label: 'Critical', count: medicines.filter(m => m.status === 'critical').length, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
              ].map(s => (
                <div key={s.label} className={cn('rounded-xl p-3 text-center', s.bg)}>
                  <p className={cn('text-lg font-800', s.color)}>{s.count}</p>
                  <p className="text-[10px] text-slate-500 font-600">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

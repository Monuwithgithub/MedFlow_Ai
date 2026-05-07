import { useState } from 'react';
import { ArrowLeftRight, MapPin, Package, CheckCircle, AlertTriangle, Truck } from 'lucide-react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { redistributionSuggestions } from '../lib/mockData';
import { cn } from '../lib/utils';
import toast from 'react-hot-toast';

const locations = [
  { name: 'Warehouse A', stock: 'High', medicines: 5, utilization: 82 },
  { name: 'Warehouse B', stock: 'Low', medicines: 4, utilization: 31 },
  { name: 'Warehouse C', stock: 'Medium', medicines: 3, utilization: 58 },
];

export default function Redistribution() {
  const [approved, setApproved] = useState<string[]>([]);
  const [rejected, setRejected] = useState<string[]>([]);

  const handleApprove = (id: string, medicine: string) => {
    setApproved(prev => [...prev, id]);
    toast.success(`Transfer approved: ${medicine}`);
  };

  const handleReject = (id: string) => {
    setRejected(prev => [...prev, id]);
    toast.error('Transfer rejected');
  };

  const pending = redistributionSuggestions.filter(s => !approved.includes(s.id) && !rejected.includes(s.id));
  const approvedList = redistributionSuggestions.filter(s => approved.includes(s.id));

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-xl font-800 text-slate-900 dark:text-white">Redistribution</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">AI-suggested stock transfers between warehouse locations</p>
      </div>

      {/* Location Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {locations.map(loc => (
          <Card key={loc.name} hover>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                  <MapPin size={16} className="text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-700 text-slate-800 dark:text-slate-200">{loc.name}</p>
                  <p className="text-[10px] text-slate-500">{loc.medicines} medicine types</p>
                </div>
              </div>
              <Badge variant={loc.stock === 'High' ? 'safe' : loc.stock === 'Low' ? 'critical' : 'warning'}>
                {loc.stock}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">Utilization</span>
                <span className="text-xs font-700 text-slate-800 dark:text-slate-200">{loc.utilization}%</span>
              </div>
              <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full rounded-full transition-all',
                    loc.utilization > 70 ? 'bg-emerald-500' :
                    loc.utilization > 40 ? 'bg-amber-500' : 'bg-red-500'
                  )}
                  style={{ width: `${loc.utilization}%` }}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Pending Suggestions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-700 text-slate-800 dark:text-slate-200">Pending Transfers</h2>
            <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 px-2 py-1 rounded-full font-600">{pending.length} pending</span>
          </div>

          {pending.length === 0 ? (
            <Card className="text-center py-10">
              <CheckCircle size={32} className="text-emerald-500 mx-auto mb-2" />
              <p className="text-sm font-600 text-slate-600 dark:text-slate-400">All suggestions reviewed!</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {pending.map((s, i) => (
                <Card key={s.id} className="animate-fade-in" style={{ animationDelay: `${i * 80}ms` } as any}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                        <Package size={14} className="text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm font-700 text-slate-800 dark:text-slate-200">{s.medicine}</p>
                        <p className="text-[10px] text-slate-500">{s.quantity} units to transfer</p>
                      </div>
                    </div>
                    <Badge variant={s.urgency === 'high' ? 'critical' : s.urgency === 'medium' ? 'warning' : 'info'}>
                      {s.urgency}
                    </Badge>
                  </div>

                  {/* Transfer Route */}
                  <div className="flex items-center gap-2 mb-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <div className="flex-1 text-center">
                      <p className="text-[10px] text-slate-500 mb-1">FROM</p>
                      <p className="text-xs font-700 text-slate-800 dark:text-slate-200">{s.from}</p>
                    </div>
                    <div className="flex items-center gap-1 text-blue-500">
                      <div className="w-8 h-px bg-blue-300" />
                      <ArrowLeftRight size={16} />
                      <div className="w-8 h-px bg-blue-300" />
                    </div>
                    <div className="flex-1 text-center">
                      <p className="text-[10px] text-slate-500 mb-1">TO</p>
                      <p className="text-xs font-700 text-slate-800 dark:text-slate-200">{s.to}</p>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">{s.reason}</p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(s.id, s.medicine)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-600 text-white bg-blue-500 hover:bg-blue-600 rounded-xl transition-colors"
                    >
                      <CheckCircle size={13} /> Approve
                    </button>
                    <button
                      onClick={() => handleReject(s.id)}
                      className="flex-1 py-2 text-xs font-600 text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Approved */}
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-700 text-slate-800 dark:text-slate-200">Approved Transfers</h2>
            <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded-full font-600">{approvedList.length} approved</span>
          </div>

          {approvedList.length === 0 ? (
            <Card className="text-center py-10">
              <Truck size={28} className="text-slate-300 mx-auto mb-2" />
              <p className="text-sm text-slate-500">No approved transfers yet</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {approvedList.map(s => (
                <div key={s.id} className="flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-200 dark:border-emerald-900/30">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={16} className="text-emerald-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-700 text-slate-800 dark:text-slate-200">{s.medicine}</p>
                    <p className="text-[10px] text-slate-500">{s.from} → {s.to} · {s.quantity} units</p>
                  </div>
                  <Badge variant="safe">Approved</Badge>
                </div>
              ))}
            </div>
          )}

          {/* Info Card */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-100 dark:border-blue-900/30">
            <div className="flex items-start gap-3">
              <AlertTriangle size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-700 text-slate-800 dark:text-slate-200">How AI Redistribution Works</p>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Our AI analyzes stock levels, expiry dates, historical demand, and location data to suggest optimal transfers that minimize waste and prevent shortages.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

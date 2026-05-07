import { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, ReferenceLine
} from 'recharts';
import { Brain, TrendingUp, TrendingDown, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { ChartWrapper } from '../components/ChartWrapper';
import { forecastData } from '../lib/mockData';
import { cn } from '../lib/utils';

const medicines = Object.keys(forecastData);

const recommendations: Record<string, { action: string; reason: string; urgency: 'high' | 'medium' | 'low'; stockDays: number; reorderQty: number }> = {
  'Paracetamol 500mg': { action: 'Reorder 1,200 units', reason: 'Demand predicted to spike +13% in Feb due to seasonal patterns', urgency: 'medium', stockDays: 42, reorderQty: 1200 },
  'Amoxicillin 500mg': { action: 'Reorder 800 units', reason: 'Antibiotic demand rising; current stock covers only 28 days', urgency: 'high', stockDays: 28, reorderQty: 800 },
  'Metformin 850mg': { action: 'Monitor closely', reason: 'Steady demand growth expected; reorder threshold approaching', urgency: 'medium', stockDays: 35, reorderQty: 400 },
  'Atorvastatin 20mg': { action: 'Reorder 300 units', reason: 'Cardiovascular demand stable with slight upward trend', urgency: 'low', stockDays: 60, reorderQty: 300 },
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-[#1e2535] border border-slate-200 dark:border-slate-700 rounded-xl p-3 shadow-lg">
        <p className="text-xs font-700 text-slate-600 dark:text-slate-300 mb-2">{label}</p>
        {payload.map((entry: any) => (
          <div key={entry.name} className="flex items-center gap-2 text-xs mb-1">
            <span className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
            <span className="text-slate-500 capitalize">{entry.name === 'actual' ? 'Actual' : 'Predicted'}:</span>
            <span className="font-700 text-slate-800 dark:text-slate-200">{entry.value?.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function DemandForecast() {
  const [selected, setSelected] = useState(medicines[0]);
  const data = forecastData[selected];
  const rec = recommendations[selected];
  const splitIndex = data.findIndex(d => d.actual === undefined);

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-800 text-slate-900 dark:text-white">Demand Forecast</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">AI-powered demand predictions for the next 3 months</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-xl">
          <Brain size={14} />
          <span className="font-600">Model: v2.4.1 · 94.7% accuracy</span>
        </div>
      </div>

      {/* Medicine Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {medicines.map(med => (
          <button
            key={med}
            onClick={() => setSelected(med)}
            className={cn(
              'p-4 rounded-2xl border text-left transition-all',
              selected === med
                ? 'border-blue-300 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-700'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-[#161b27] hover:border-blue-200 dark:hover:border-slate-600'
            )}
          >
            <p className={cn('text-xs font-700 leading-tight', selected === med ? 'text-blue-700 dark:text-blue-300' : 'text-slate-700 dark:text-slate-300')}>{med}</p>
            <div className="flex items-center gap-1 mt-2">
              {recommendations[med].urgency === 'high'
                ? <TrendingUp size={12} className="text-red-500" />
                : recommendations[med].urgency === 'medium'
                ? <TrendingUp size={12} className="text-amber-500" />
                : <TrendingDown size={12} className="text-emerald-500" />
              }
              <span className="text-[10px] text-slate-500">{recommendations[med].stockDays}d stock</span>
            </div>
          </button>
        ))}
      </div>

      {/* Chart + Recommendation */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <ChartWrapper
          className="xl:col-span-2"
          title={`${selected} — Demand Forecast`}
          subtitle="Historical actuals vs AI predictions (dashed = forecast)"
          height={300}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:stroke-slate-700" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, paddingTop: 12 }} />
              {splitIndex > 0 && (
                <ReferenceLine
                  x={data[splitIndex - 1]?.month}
                  stroke="#94a3b8"
                  strokeDasharray="4 4"
                  label={{ value: 'Today', position: 'top', fontSize: 10, fill: '#94a3b8' }}
                />
              )}
              <Line
                type="monotone" dataKey="actual" stroke="#4f6ef7" strokeWidth={2.5}
                dot={{ r: 4, fill: '#4f6ef7' }} connectNulls={false}
              />
              <Line
                type="monotone" dataKey="predicted" stroke="#7c3aed" strokeWidth={2}
                strokeDasharray="6 3" dot={{ r: 4, fill: '#7c3aed' }} connectNulls
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartWrapper>

        {/* Recommendation Panel */}
        <div className="space-y-4">
          <Card className="border-2 border-blue-100 dark:border-blue-900/30">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <Sparkles size={16} className="text-white" />
              </div>
              <div>
                <p className="text-xs font-700 text-slate-800 dark:text-slate-100">AI Recommendation</p>
                <p className="text-[10px] text-slate-500">Based on trend analysis</p>
              </div>
            </div>

            <div className={cn(
              'p-3 rounded-xl mb-4',
              rec.urgency === 'high' ? 'bg-red-50 dark:bg-red-900/20' :
              rec.urgency === 'medium' ? 'bg-amber-50 dark:bg-amber-900/20' : 'bg-emerald-50 dark:bg-emerald-900/20'
            )}>
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle size={14} className={rec.urgency === 'high' ? 'text-red-500' : rec.urgency === 'medium' ? 'text-amber-500' : 'text-emerald-500'} />
                <span className="text-xs font-700 text-slate-800 dark:text-slate-200">{rec.action}</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">{rec.reason}</p>
            </div>

            <div className="space-y-3">
              {[
                { label: 'Current Stock', value: '— units', sub: 'Live from inventory' },
                { label: 'Days of Supply', value: `${rec.stockDays} days`, sub: 'At current demand rate' },
                { label: 'Suggested Reorder', value: `${rec.reorderQty.toLocaleString()} units`, sub: 'AI recommendation' },
              ].map(({ label, value, sub }) => (
                <div key={label} className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700/50 last:border-0">
                  <div>
                    <p className="text-xs font-600 text-slate-700 dark:text-slate-300">{label}</p>
                    <p className="text-[10px] text-slate-400">{sub}</p>
                  </div>
                  <span className="text-sm font-800 text-slate-900 dark:text-white">{value}</span>
                </div>
              ))}
            </div>

            <button className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 text-sm font-600 text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-xl transition-all">
              Create Purchase Order <ArrowRight size={14} />
            </button>
          </Card>

          <Card>
            <p className="text-xs font-700 text-slate-700 dark:text-slate-300 mb-3">Urgency Level</p>
            <Badge variant={rec.urgency === 'high' ? 'critical' : rec.urgency === 'medium' ? 'warning' : 'safe'} dot className="text-sm px-3 py-1.5">
              {rec.urgency === 'high' ? 'High Priority' : rec.urgency === 'medium' ? 'Medium Priority' : 'Low Priority'}
            </Badge>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpDown, Download, Plus, Package, ChevronUp, ChevronDown } from 'lucide-react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Modal } from '../components/Modal';
import { medicines, type Medicine } from '../lib/mockData';
import { cn, formatDate, daysUntilExpiry } from '../lib/utils';
import toast from 'react-hot-toast';

type SortField = 'name' | 'quantity' | 'expiryDate' | 'status';
type SortDir = 'asc' | 'desc';

export default function Inventory() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [selectedMed, setSelectedMed] = useState<Medicine | null>(null);
  const [page, setPage] = useState(1);
  const perPage = 8;

  const categories = useMemo(() => ['all', ...Array.from(new Set(medicines.map(m => m.category)))], []);

  const filtered = useMemo(() => {
    let data = [...medicines];
    if (search) data = data.filter(m =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.batch.toLowerCase().includes(search.toLowerCase())
    );
    if (statusFilter !== 'all') data = data.filter(m => m.status === statusFilter);
    if (categoryFilter !== 'all') data = data.filter(m => m.category === categoryFilter);
    data.sort((a, b) => {
      let aVal: any = a[sortField];
      let bVal: any = b[sortField];
      if (sortField === 'expiryDate') { aVal = new Date(aVal).getTime(); bVal = new Date(bVal).getTime(); }
      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();
      return sortDir === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
    });
    return data;
  }, [search, statusFilter, categoryFilter, sortField, sortDir]);

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  const handleSort = (field: SortField) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('asc'); }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown size={12} className="text-slate-400" />;
    return sortDir === 'asc' ? <ChevronUp size={12} className="text-blue-500" /> : <ChevronDown size={12} className="text-blue-500" />;
  };

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-800 text-slate-900 dark:text-white">Inventory</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{filtered.length} medicines tracked</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => toast.success('Export started — CSV will download shortly')}
            className="flex items-center gap-2 px-3 py-2 text-xs font-600 text-slate-600 dark:text-slate-400 bg-white dark:bg-[#161b27] border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <Download size={14} /> Export
          </button>
          <button
            onClick={() => toast.success('Add medicine modal coming soon')}
            className="flex items-center gap-2 px-3 py-2 text-xs font-600 text-white bg-blue-500 hover:bg-blue-600 rounded-xl transition-colors"
          >
            <Plus size={14} /> Add Medicine
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total SKUs', value: medicines.length, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
          { label: 'Safe', value: medicines.filter(m => m.status === 'safe').length, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
          { label: 'Warning', value: medicines.filter(m => m.status === 'warning').length, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
          { label: 'Critical', value: medicines.filter(m => m.status === 'critical').length, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
        ].map(s => (
          <div key={s.label} className={cn('rounded-2xl p-4 border border-transparent', s.bg)}>
            <p className={cn('text-2xl font-800', s.color)}>{s.value}</p>
            <p className="text-xs text-slate-500 font-600 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <Card padding="sm">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-48 bg-slate-100 dark:bg-slate-800 rounded-xl px-3 py-2">
            <Search size={14} className="text-slate-400 flex-shrink-0" />
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search medicine or batch..."
              className="bg-transparent text-sm text-slate-700 dark:text-slate-300 placeholder-slate-400 outline-none flex-1 font-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-slate-400" />
            <select
              value={statusFilter}
              onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
              className="text-xs font-600 text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border-0 rounded-xl px-3 py-2 outline-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="safe">Safe</option>
              <option value="warning">Warning</option>
              <option value="critical">Critical</option>
            </select>
          </div>
          <select
            value={categoryFilter}
            onChange={e => { setCategoryFilter(e.target.value); setPage(1); }}
            className="text-xs font-600 text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border-0 rounded-xl px-3 py-2 outline-none cursor-pointer"
          >
            {categories.map(c => (
              <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>
            ))}
          </select>
        </div>
      </Card>

      {/* Table */}
      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700/50">
                {[
                  { label: 'Medicine Name', field: 'name' as SortField },
                  { label: 'Batch No.', field: null },
                  { label: 'Category', field: null },
                  { label: 'Qty', field: 'quantity' as SortField },
                  { label: 'Expiry Date', field: 'expiryDate' as SortField },
                  { label: 'Days Left', field: null },
                  { label: 'Status', field: 'status' as SortField },
                  { label: 'Location', field: null },
                ].map(col => (
                  <th
                    key={col.label}
                    onClick={col.field ? () => handleSort(col.field!) : undefined}
                    className={cn(
                      'text-left text-[11px] font-700 text-slate-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3.5',
                      col.field && 'cursor-pointer hover:text-slate-700 dark:hover:text-slate-200 select-none'
                    )}
                  >
                    <div className="flex items-center gap-1.5">
                      {col.label}
                      {col.field && <SortIcon field={col.field} />}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/30">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center">
                    <Package size={32} className="text-slate-300 mx-auto mb-2" />
                    <p className="text-sm text-slate-500">No medicines found</p>
                  </td>
                </tr>
              ) : paginated.map((med, i) => {
                const days = daysUntilExpiry(med.expiryDate);
                return (
                  <tr
                    key={med.id}
                    onClick={() => setSelectedMed(med)}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer animate-fade-in"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                          <Package size={14} className="text-blue-500" />
                        </div>
                        <span className="text-sm font-600 text-slate-800 dark:text-slate-200">{med.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs font-500 font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">{med.batch}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs text-slate-600 dark:text-slate-400">{med.category}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-sm font-700 text-slate-800 dark:text-slate-200">{med.quantity.toLocaleString()}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs text-slate-600 dark:text-slate-400">{formatDate(med.expiryDate)}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={cn(
                        'text-xs font-700',
                        days <= 30 ? 'text-red-500' : days <= 90 ? 'text-amber-500' : 'text-emerald-500'
                      )}>{days}d</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge variant={med.status} dot>
                        {med.status.charAt(0).toUpperCase() + med.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs text-slate-500 dark:text-slate-400">{med.location}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-5 py-3.5 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between">
            <p className="text-xs text-slate-500">
              Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length}
            </p>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={cn(
                    'w-7 h-7 rounded-lg text-xs font-600 transition-colors',
                    page === p
                      ? 'bg-blue-500 text-white'
                      : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                  )}
                >{p}</button>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Detail Modal */}
      <Modal isOpen={!!selectedMed} onClose={() => setSelectedMed(null)} title="Medicine Details">
        {selectedMed && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-700">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                <Package size={22} className="text-blue-500" />
              </div>
              <div>
                <h3 className="text-sm font-800 text-slate-900 dark:text-white">{selectedMed.name}</h3>
                <p className="text-xs text-slate-500">{selectedMed.category} · {selectedMed.supplier}</p>
              </div>
              <div className="ml-auto">
                <Badge variant={selectedMed.status} dot>{selectedMed.status}</Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Batch Number', value: selectedMed.batch },
                { label: 'Quantity', value: `${selectedMed.quantity} units` },
                { label: 'Expiry Date', value: formatDate(selectedMed.expiryDate) },
                { label: 'Days Until Expiry', value: `${daysUntilExpiry(selectedMed.expiryDate)} days` },
                { label: 'Unit Price', value: `$${selectedMed.price}` },
                { label: 'Location', value: selectedMed.location },
              ].map(({ label, value }) => (
                <div key={label} className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3">
                  <p className="text-[10px] font-700 text-slate-400 uppercase tracking-wider">{label}</p>
                  <p className="text-sm font-700 text-slate-800 dark:text-slate-200 mt-1">{value}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => { toast.success('Edit mode activated'); setSelectedMed(null); }}
                className="flex-1 py-2.5 text-sm font-600 text-white bg-blue-500 hover:bg-blue-600 rounded-xl transition-colors"
              >Edit Medicine</button>
              <button
                onClick={() => { toast.error('Medicine marked for review'); setSelectedMed(null); }}
                className="flex-1 py-2.5 text-sm font-600 text-red-500 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-xl transition-colors"
              >Flag Issue</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

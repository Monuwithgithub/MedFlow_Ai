import { useState } from 'react';
import { FileUploader } from '../components/FileUploader';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Sparkles, CheckCircle, Edit3, Trash2, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { cn } from '../lib/utils';

interface ExtractedItem {
  id: string;
  name: string;
  batch: string;
  quantity: number;
  expiryDate: string;
  unitPrice: number;
  category: string;
  edited?: boolean;
}

const mockExtracted: ExtractedItem[] = [
  { id: '1', name: 'Amoxicillin 500mg', batch: 'INV-B001', quantity: 500, expiryDate: '2026-03-15', unitPrice: 12.50, category: 'Antibiotics' },
  { id: '2', name: 'Metformin 850mg', batch: 'INV-B002', quantity: 200, expiryDate: '2025-11-20', unitPrice: 8.75, category: 'Antidiabetic' },
  { id: '3', name: 'Paracetamol 500mg', batch: 'INV-B003', quantity: 1000, expiryDate: '2026-06-30', unitPrice: 2.50, category: 'Analgesics' },
  { id: '4', name: 'Cetirizine 10mg', batch: 'INV-B004', quantity: 300, expiryDate: '2026-01-15', unitPrice: 4.00, category: 'Antihistamine' },
];

export default function InvoiceUpload() {
  const [loading, setLoading] = useState(false);
  const [extracted, setExtracted] = useState<ExtractedItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const handleUpload = (file: File) => {
    setLoading(true);
    setExtracted([]);
    setConfirmed(false);
    setTimeout(() => {
      setLoading(false);
      setExtracted(mockExtracted);
      toast.success(`Invoice processed: ${mockExtracted.length} items extracted`);
    }, 2800);
  };

  const handleEdit = (id: string, field: keyof ExtractedItem, value: any) => {
    setExtracted(prev => prev.map(item =>
      item.id === id ? { ...item, [field]: value, edited: true } : item
    ));
  };

  const handleDelete = (id: string) => {
    setExtracted(prev => prev.filter(item => item.id !== id));
    toast.success('Item removed');
  };

  const handleConfirm = () => {
    setConfirmed(true);
    toast.success(`${extracted.length} medicines added to inventory!`);
  };

  const total = extracted.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-xl font-800 text-slate-900 dark:text-white">Invoice Upload</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">AI-powered invoice parsing — upload any format</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Upload Area */}
        <div className="xl:col-span-1 space-y-4">
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <Sparkles size={15} className="text-white" />
              </div>
              <div>
                <h3 className="text-sm font-700 text-slate-800 dark:text-slate-100">AI Parser</h3>
                <p className="text-[10px] text-slate-500">Supports PDF, CSV, XLSX, images</p>
              </div>
            </div>
            <FileUploader onUpload={handleUpload} loading={loading} />
          </Card>

          {/* How it works */}
          <Card>
            <h3 className="text-xs font-700 text-slate-700 dark:text-slate-300 mb-3">How it works</h3>
            <div className="space-y-3">
              {[
                { step: '01', title: 'Upload Invoice', desc: 'Drop any invoice format' },
                { step: '02', title: 'AI Extracts Data', desc: 'OCR + NLP processing' },
                { step: '03', title: 'Review & Edit', desc: 'Verify extracted fields' },
                { step: '04', title: 'Add to Inventory', desc: 'One-click confirmation' },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex items-start gap-3">
                  <span className="text-[10px] font-800 text-blue-500 bg-blue-50 dark:bg-blue-900/20 w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0">{step}</span>
                  <div>
                    <p className="text-xs font-700 text-slate-700 dark:text-slate-300">{title}</p>
                    <p className="text-[10px] text-slate-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Extracted Data */}
        <div className="xl:col-span-2 space-y-4">
          {extracted.length > 0 && !confirmed && (
            <>
              <Card padding="none">
                <div className="px-5 pt-5 pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-700 text-slate-800 dark:text-slate-100">Extracted Data</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{extracted.length} items — click cells to edit</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="info">AI Extracted</Badge>
                    <button
                      onClick={() => setExtracted(prev => [...prev, {
                        id: Date.now().toString(), name: 'New Medicine', batch: 'NEW-001',
                        quantity: 0, expiryDate: '2026-01-01', unitPrice: 0, category: 'Other'
                      }])}
                      className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-blue-500 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-y border-slate-100 dark:border-slate-700/50">
                        {['Medicine Name', 'Batch', 'Qty', 'Expiry', 'Unit Price', 'Category', ''].map(h => (
                          <th key={h} className="text-left text-[11px] font-700 text-slate-500 uppercase tracking-wider px-4 py-3">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700/30">
                      {extracted.map((item, i) => (
                        <tr key={item.id} className={cn(
                          'hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors animate-fade-in',
                          item.edited && 'bg-blue-50/50 dark:bg-blue-900/10'
                        )} style={{ animationDelay: `${i * 60}ms` }}>
                          <td className="px-4 py-3">
                            <input
                              value={item.name}
                              onChange={e => handleEdit(item.id, 'name', e.target.value)}
                              className="text-xs font-600 text-slate-800 dark:text-slate-200 bg-transparent outline-none border-b border-transparent hover:border-blue-300 focus:border-blue-500 transition-colors w-full"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              value={item.batch}
                              onChange={e => handleEdit(item.id, 'batch', e.target.value)}
                              className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-transparent outline-none border-b border-transparent hover:border-blue-300 focus:border-blue-500 transition-colors w-24"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={e => handleEdit(item.id, 'quantity', +e.target.value)}
                              className="text-xs font-700 text-slate-800 dark:text-slate-200 bg-transparent outline-none border-b border-transparent hover:border-blue-300 focus:border-blue-500 transition-colors w-16"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="date"
                              value={item.expiryDate}
                              onChange={e => handleEdit(item.id, 'expiryDate', e.target.value)}
                              className="text-xs text-slate-600 dark:text-slate-400 bg-transparent outline-none border-b border-transparent hover:border-blue-300 focus:border-blue-500 transition-colors"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-slate-500">$</span>
                              <input
                                type="number"
                                step="0.01"
                                value={item.unitPrice}
                                onChange={e => handleEdit(item.id, 'unitPrice', +e.target.value)}
                                className="text-xs font-700 text-slate-800 dark:text-slate-200 bg-transparent outline-none border-b border-transparent hover:border-blue-300 focus:border-blue-500 transition-colors w-16"
                              />
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-xs text-slate-500">{item.category}</span>
                          </td>
                          <td className="px-4 py-3">
                            <button onClick={() => handleDelete(item.id)} className="p-1 rounded text-slate-400 hover:text-red-500 transition-colors">
                              <Trash2 size={13} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* Summary + Confirm */}
              <Card>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs text-slate-500">Total Invoice Value</p>
                    <p className="text-2xl font-800 text-slate-900 dark:text-white">${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                    <p className="text-xs text-slate-500">{extracted.reduce((s, i) => s + i.quantity, 0).toLocaleString()} total units across {extracted.length} SKUs</p>
                  </div>
                  <button
                    onClick={handleConfirm}
                    className="flex items-center gap-2 px-5 py-3 text-sm font-700 text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-xl shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40"
                  >
                    <CheckCircle size={16} /> Confirm & Add to Inventory
                  </button>
                </div>
              </Card>
            </>
          )}

          {confirmed && (
            <Card className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-emerald-500" />
              </div>
              <h3 className="text-lg font-800 text-slate-900 dark:text-white">Successfully Added!</h3>
              <p className="text-sm text-slate-500 mt-2">{mockExtracted.length} medicines have been added to your inventory</p>
              <button
                onClick={() => { setExtracted([]); setConfirmed(false); }}
                className="mt-6 px-5 py-2.5 text-sm font-600 text-blue-500 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-xl transition-colors"
              >Upload Another Invoice</button>
            </Card>
          )}

          {!loading && extracted.length === 0 && !confirmed && (
            <Card className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                <Edit3 size={28} className="text-slate-400" />
              </div>
              <p className="text-sm font-600 text-slate-500">Upload an invoice to see extracted data here</p>
              <p className="text-xs text-slate-400 mt-1">AI will automatically parse all medicine details</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

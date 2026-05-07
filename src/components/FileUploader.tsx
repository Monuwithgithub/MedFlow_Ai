import { useState, useRef, useCallback } from 'react';
import { Upload, FileText, X, CheckCircle, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface FileUploaderProps {
  onUpload: (file: File) => void;
  loading?: boolean;
  accept?: string;
}

export function FileUploader({ onUpload, loading, accept = '.pdf,.csv,.xlsx,.png,.jpg' }: FileUploaderProps) {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) { setFile(dropped); onUpload(dropped); }
  }, [onUpload]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) { setFile(selected); onUpload(selected); }
  };

  const clear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => !file && inputRef.current?.click()}
      className={cn(
        'relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200',
        dragOver
          ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20 scale-[1.01]'
          : file
          ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20'
          : 'border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/40 hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 cursor-pointer'
      )}
    >
      <input ref={inputRef} type="file" accept={accept} onChange={handleChange} className="hidden" />

      {loading ? (
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
              <Loader2 size={28} className="text-blue-500 animate-spin" />
            </div>
          </div>
          <div>
            <p className="text-sm font-700 text-slate-700 dark:text-slate-300">Processing invoice...</p>
            <p className="text-xs text-slate-500 mt-1">AI is extracting data from your file</p>
          </div>
          <div className="w-48 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse" style={{ width: '65%' }} />
          </div>
        </div>
      ) : file ? (
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
            <CheckCircle size={28} className="text-emerald-500" />
          </div>
          <div>
            <p className="text-sm font-700 text-slate-700 dark:text-slate-300">{file.name}</p>
            <p className="text-xs text-slate-500 mt-1">{(file.size / 1024).toFixed(1)} KB • Ready to process</p>
          </div>
          <button onClick={clear} className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-600 font-600">
            <X size={13} /> Remove file
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <div className={cn(
            'w-14 h-14 rounded-2xl flex items-center justify-center transition-colors',
            dragOver ? 'bg-blue-100 dark:bg-blue-900/40' : 'bg-slate-100 dark:bg-slate-800'
          )}>
            <Upload size={26} className={dragOver ? 'text-blue-500' : 'text-slate-400'} />
          </div>
          <div>
            <p className="text-sm font-700 text-slate-700 dark:text-slate-300">
              Drop your invoice here
            </p>
            <p className="text-xs text-slate-500 mt-1">or <span className="text-blue-500 font-600">browse files</span></p>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-slate-400">
            {['PDF', 'CSV', 'XLSX', 'PNG'].map(ext => (
              <span key={ext} className="flex items-center gap-1">
                <FileText size={10} />{ext}
              </span>
            ))}
          </div>
          <p className="text-[10px] text-slate-400">Max file size: 10MB</p>
        </div>
      )}
    </div>
  );
}

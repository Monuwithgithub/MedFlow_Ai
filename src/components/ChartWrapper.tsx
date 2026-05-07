import { Card } from './Card';
import { cn } from '../lib/utils';

interface ChartWrapperProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  height?: number;
}

export function ChartWrapper({ title, subtitle, children, action, className, height = 280 }: ChartWrapperProps) {
  return (
    <Card className={cn('overflow-hidden', className)} padding="none">
      <div className="px-5 pt-5 pb-3 flex items-start justify-between">
        <div>
          <h3 className="text-sm font-700 text-slate-800 dark:text-slate-100">{title}</h3>
          {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
      <div style={{ height }} className="px-2 pb-4">
        {children}
      </div>
    </Card>
  );
}

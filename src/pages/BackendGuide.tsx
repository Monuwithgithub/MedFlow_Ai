import { useState } from 'react';
import { cn } from '../lib/utils';
import {
  Database, Server, Shield, Code2, Terminal, CheckCircle,
  ChevronDown, ChevronRight, Copy, ExternalLink, Layers,
  Key, Globe, Zap, Users, Table, Lock, ArrowRight, BookOpen,
  AlertTriangle, Package, Activity, FileCode
} from 'lucide-react';
import toast from 'react-hot-toast';

// ─── Code Block Component ───────────────────────────────────────────────────
function CodeBlock({ code, lang = 'sql', title }: { code: string; lang?: string; title?: string }) {
  const copy = () => {
    navigator.clipboard.writeText(code);
    toast.success('Copied to clipboard!');
  };
  return (
    <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 my-3">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <FileCode size={13} className="text-blue-500" />
            <span className="text-xs font-700 text-slate-600 dark:text-slate-300">{title}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-400 uppercase font-600">{lang}</span>
            <button onClick={copy} className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-blue-500 transition-colors">
              <Copy size={12} />
            </button>
          </div>
        </div>
      )}
      {!title && (
        <div className="flex items-center justify-between px-3 py-1.5 bg-slate-800 dark:bg-slate-900">
          <span className="text-[10px] text-slate-400 uppercase font-600">{lang}</span>
          <button onClick={copy} className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
            <Copy size={11} />
          </button>
        </div>
      )}
      <pre className="bg-slate-900 dark:bg-[#0d1117] text-slate-100 text-xs p-4 overflow-x-auto leading-relaxed font-mono whitespace-pre">
        {code}
      </pre>
    </div>
  );
}

// ─── Step Badge ──────────────────────────────────────────────────────────────
function StepBadge({ n }: { n: number }) {
  return (
    <span className="w-7 h-7 rounded-full bg-blue-500 text-white text-xs font-800 flex items-center justify-center flex-shrink-0">
      {n}
    </span>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────
function Section({ id, icon, title, badge, children, defaultOpen = false }:
  { id: string; icon: React.ReactNode; title: string; badge?: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div id={id} className="bg-white dark:bg-[#161b27] rounded-2xl border border-slate-200 dark:border-slate-700/60 overflow-hidden">
      <button
        onClick={() => setOpen(p => !p)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-500">
            {icon}
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="text-sm font-700 text-slate-800 dark:text-slate-100">{title}</span>
              {badge && <span className="text-[10px] font-700 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">{badge}</span>}
            </div>
          </div>
        </div>
        {open ? <ChevronDown size={16} className="text-slate-400" /> : <ChevronRight size={16} className="text-slate-400" />}
      </button>
      {open && <div className="px-5 pb-5 border-t border-slate-100 dark:border-slate-700/50 pt-4">{children}</div>}
    </div>
  );
}

// ─── Info Box ─────────────────────────────────────────────────────────────────
function InfoBox({ type = 'info', title, children }: { type?: 'info' | 'warn' | 'tip' | 'critical'; title: string; children: React.ReactNode }) {
  const styles = {
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300',
    warn: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300',
    tip: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300',
    critical: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300',
  };
  return (
    <div className={cn('rounded-xl border p-4 my-3', styles[type])}>
      <p className="text-xs font-800 mb-1">{title}</p>
      <div className="text-xs leading-relaxed opacity-90">{children}</div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function BackendGuide() {
  const [activeNav, setActiveNav] = useState('overview');

  const navItems = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'supabase', label: '1. Supabase Setup', icon: Database },
    { id: 'schema', label: '2. Database Schema', icon: Table },
    { id: 'auth', label: '3. Auth & RLS', icon: Shield },
    { id: 'seed', label: '4. Seed Real Data', icon: Package },
    { id: 'frontend', label: '5. Connect Frontend', icon: Code2 },
    { id: 'hooks', label: '6. React Hooks', icon: Zap },
    { id: 'realtime', label: '7. Realtime', icon: Activity },
    { id: 'audit', label: '8. Audit Logs', icon: Lock },
    { id: 'env', label: '9. Env & Deploy', icon: Globe },
    { id: 'checklist', label: '10. Checklist', icon: CheckCircle },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-2xl p-6 mb-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <Server size={20} />
            <span className="text-xs font-700 bg-white/20 px-2 py-0.5 rounded-full">BACKEND INTEGRATION</span>
          </div>
          <h1 className="text-2xl font-800 mb-1">MedFlow AI — Backend Guide</h1>
          <p className="text-blue-100 text-sm">Complete A-to-Z: Supabase + PostgreSQL + Auth + RLS + Real Data</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {['Supabase', 'PostgreSQL', 'Row Level Security', 'Auth', 'Realtime', 'Edge Functions'].map(t => (
              <span key={t} className="text-[11px] font-600 bg-white/15 px-2.5 py-1 rounded-full">{t}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        {/* Sticky Nav */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-[#161b27] rounded-2xl border border-slate-200 dark:border-slate-700/60 p-3 sticky top-20">
            <p className="text-[10px] font-700 text-slate-400 uppercase tracking-wider px-2 mb-2">SECTIONS</p>
            <nav className="space-y-0.5">
              {navItems.map(({ id, label, icon: Icon }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setActiveNav(id)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-600 transition-all',
                    activeNav === id
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  )}
                >
                  <Icon size={13} />
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-4">

          {/* ── OVERVIEW ── */}
          <div id="overview" className="bg-white dark:bg-[#161b27] rounded-2xl border border-slate-200 dark:border-slate-700/60 p-5">
            <h2 className="text-base font-800 text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <BookOpen size={18} className="text-blue-500" /> Architecture Overview
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              {[
                { icon: Globe, title: 'Frontend', desc: 'React + Vite + Tailwind (already built)', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
                { icon: Zap, title: 'Backend-as-a-Service', desc: 'Supabase (Auth + DB + Realtime + Storage)', color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
                { icon: Database, title: 'Database', desc: 'PostgreSQL with Row Level Security', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
              ].map(({ icon: Icon, title, desc, color, bg }) => (
                <div key={title} className={cn('rounded-xl p-4', bg)}>
                  <Icon size={20} className={cn(color, 'mb-2')} />
                  <p className="text-xs font-700 text-slate-800 dark:text-slate-200">{title}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
              <p className="text-xs font-700 text-slate-700 dark:text-slate-300 mb-2">Data Flow</p>
              <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500">
                {['User Action', '→', 'React Hook', '→', 'Supabase Client', '→', 'PostgreSQL', '→', 'RLS Policy Check', '→', 'Data Returned', '→', 'UI Updates'].map((s, i) => (
                  <span key={i} className={s === '→' ? 'text-blue-400 font-700' : 'bg-white dark:bg-slate-700 px-2 py-0.5 rounded font-600'}>{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* ── STEP 1: SUPABASE SETUP ── */}
          <Section id="supabase" icon={<Database size={18} />} title="Step 1 — Create Supabase Project" badge="START HERE" defaultOpen={true}>
            <div className="space-y-4">
              <div className="space-y-3">
                {[
                  { n: 1, title: 'Go to supabase.com', desc: 'Click "Start your project" → Sign up with GitHub (free tier: 500MB DB, 2 projects)' },
                  { n: 2, title: 'Create New Project', desc: 'Name: "medflow-ai" | Region: pick closest to your users | Set a strong DB password (save it!)' },
                  { n: 3, title: 'Wait ~2 minutes', desc: 'Supabase provisions a full PostgreSQL instance, Auth server, and REST API for you' },
                  { n: 4, title: 'Get your credentials', desc: 'Go to Settings → API → copy Project URL and anon/public key' },
                ].map(({ n, title, desc }) => (
                  <div key={n} className="flex items-start gap-3">
                    <StepBadge n={n} />
                    <div>
                      <p className="text-xs font-700 text-slate-800 dark:text-slate-200">{title}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <InfoBox type="warn" title="⚠️ Two Keys — Know the Difference">
                <strong>anon key</strong> → safe to use in frontend (public). Subject to RLS policies.<br />
                <strong>service_role key</strong> → NEVER put in frontend. Bypasses ALL RLS. Only use in server-side code.
              </InfoBox>

              <p className="text-xs font-700 text-slate-700 dark:text-slate-300 mb-2">Install Supabase client in your project:</p>
              <CodeBlock lang="bash" title="Terminal" code={`npm install @supabase/supabase-js`} />

              <p className="text-xs font-700 text-slate-700 dark:text-slate-300 mb-2">Create the Supabase client file:</p>
              <CodeBlock lang="typescript" title="src/lib/supabase.ts" code={`import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,        // keeps user logged in after page refresh
    autoRefreshToken: true,      // auto-refreshes JWT before expiry
    detectSessionInUrl: true,    // handles OAuth redirect URLs
  },
  realtime: {
    params: {
      eventsPerSecond: 10,       // throttle realtime events
    },
  },
})

// Helper: get current user ID
export const getCurrentUserId = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user?.id ?? null
}`} />
            </div>
          </Section>

          {/* ── STEP 2: DATABASE SCHEMA ── */}
          <Section id="schema" icon={<Table size={18} />} title="Step 2 — Database Schema (All Tables)" badge="SQL">
            <div className="space-y-4">
              <InfoBox type="info" title="How to run this SQL">
                Go to your Supabase Dashboard → SQL Editor → New Query → paste each block → Run (F5).
                Run them IN ORDER — tables reference each other via foreign keys.
              </InfoBox>

              <p className="text-xs font-700 text-slate-700 dark:text-slate-300">TABLE 1 — profiles (extends Supabase auth.users)</p>
              <CodeBlock lang="sql" title="01_profiles.sql" code={`-- Extends the built-in auth.users table with app-specific fields
CREATE TABLE public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name   TEXT NOT NULL DEFAULT '',
  role        TEXT NOT NULL DEFAULT 'pharmacist'
                CHECK (role IN ('admin', 'pharmacist', 'manager', 'viewer')),
  pharmacy    TEXT NOT NULL DEFAULT 'MedFlow Central Pharmacy',
  phone       TEXT,
  avatar_url  TEXT,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-create profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'pharmacist')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: fires after every new signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();`} />

              <p className="text-xs font-700 text-slate-700 dark:text-slate-300">TABLE 2 — medicines (core inventory)</p>
              <CodeBlock lang="sql" title="02_medicines.sql" code={`CREATE TABLE public.medicines (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT NOT NULL,
  batch        TEXT NOT NULL,
  quantity     INTEGER NOT NULL DEFAULT 0 CHECK (quantity >= 0),
  expiry_date  DATE NOT NULL,
  category     TEXT NOT NULL,
  supplier     TEXT NOT NULL DEFAULT '',
  price        NUMERIC(10, 2) NOT NULL DEFAULT 0,
  status       TEXT NOT NULL DEFAULT 'safe'
               CHECK (status IN ('safe', 'warning', 'critical')),
  location     TEXT NOT NULL DEFAULT 'Warehouse A',
  description  TEXT,
  created_by   UUID REFERENCES auth.users(id),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (batch)   -- batch numbers must be unique
);

-- Auto-update status based on expiry date + quantity
CREATE OR REPLACE FUNCTION compute_medicine_status()
RETURNS TRIGGER AS $$
DECLARE
  days_left INTEGER;
BEGIN
  days_left := (NEW.expiry_date - CURRENT_DATE);
  
  IF days_left < 0 OR NEW.quantity = 0 THEN
    NEW.status := 'critical';
  ELSIF days_left <= 30 OR NEW.quantity < 50 THEN
    NEW.status := 'critical';
  ELSIF days_left <= 90 OR NEW.quantity < 100 THEN
    NEW.status := 'warning';
  ELSE
    NEW.status := 'safe';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER auto_compute_status
  BEFORE INSERT OR UPDATE ON public.medicines
  FOR EACH ROW EXECUTE FUNCTION compute_medicine_status();

CREATE TRIGGER update_medicines_updated_at
  BEFORE UPDATE ON public.medicines
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Indexes for fast queries
CREATE INDEX idx_medicines_status   ON public.medicines(status);
CREATE INDEX idx_medicines_expiry   ON public.medicines(expiry_date);
CREATE INDEX idx_medicines_category ON public.medicines(category);
CREATE INDEX idx_medicines_location ON public.medicines(location);`} />

              <p className="text-xs font-700 text-slate-700 dark:text-slate-300">TABLE 3 — alerts</p>
              <CodeBlock lang="sql" title="03_alerts.sql" code={`CREATE TABLE public.alerts (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type       TEXT NOT NULL CHECK (type IN ('expiry','low_stock','demand','redistribution','system')),
  message    TEXT NOT NULL,
  severity   TEXT NOT NULL CHECK (severity IN ('info','warning','critical')),
  medicine_id UUID REFERENCES public.medicines(id) ON DELETE SET NULL,
  is_read    BOOLEAN NOT NULL DEFAULT false,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-generate expiry alerts (run this as a scheduled job or manually)
CREATE OR REPLACE FUNCTION generate_expiry_alerts()
RETURNS void AS $$
DECLARE
  med RECORD;
BEGIN
  FOR med IN
    SELECT id, name, batch, expiry_date, quantity,
           (expiry_date - CURRENT_DATE) AS days_left
    FROM public.medicines
    WHERE (expiry_date - CURRENT_DATE) <= 30
      AND NOT EXISTS (
        SELECT 1 FROM public.alerts
        WHERE medicine_id = medicines.id
          AND type = 'expiry'
          AND created_at > NOW() - INTERVAL '24 hours'
      )
  LOOP
    INSERT INTO public.alerts (type, message, severity, medicine_id)
    VALUES (
      'expiry',
      med.name || ' (Batch ' || med.batch || ') expires in ' || med.days_left || ' days',
      CASE WHEN med.days_left <= 7 THEN 'critical'
           WHEN med.days_left <= 30 THEN 'warning'
           ELSE 'info' END,
      med.id
    );
  END LOOP;
END;
$$ LANGUAGE plpgsql;

CREATE INDEX idx_alerts_severity  ON public.alerts(severity);
CREATE INDEX idx_alerts_is_read   ON public.alerts(is_read);
CREATE INDEX idx_alerts_created   ON public.alerts(created_at DESC);`} />

              <p className="text-xs font-700 text-slate-700 dark:text-slate-300">TABLE 4 — activity_logs (audit trail)</p>
              <CodeBlock lang="sql" title="04_activity_logs.sql" code={`CREATE TABLE public.activity_logs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES auth.users(id),
  action      TEXT NOT NULL,  -- 'CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'EXPORT'
  entity_type TEXT NOT NULL,  -- 'medicine', 'invoice', 'transfer', 'user'
  entity_id   UUID,
  old_data    JSONB,          -- snapshot before change
  new_data    JSONB,          -- snapshot after change
  ip_address  TEXT,
  user_agent  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Generic audit trigger function
CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.activity_logs (
    user_id, action, entity_type, entity_id, old_data, new_data
  )
  VALUES (
    auth.uid(),
    TG_OP,   -- 'INSERT', 'UPDATE', or 'DELETE'
    TG_TABLE_NAME,
    CASE TG_OP WHEN 'DELETE' THEN OLD.id ELSE NEW.id END,
    CASE TG_OP WHEN 'INSERT' THEN NULL ELSE row_to_json(OLD)::JSONB END,
    CASE TG_OP WHEN 'DELETE' THEN NULL ELSE row_to_json(NEW)::JSONB END
  );
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Attach audit trigger to medicines table
CREATE TRIGGER audit_medicines
  AFTER INSERT OR UPDATE OR DELETE ON public.medicines
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE INDEX idx_activity_user    ON public.activity_logs(user_id);
CREATE INDEX idx_activity_action  ON public.activity_logs(action);
CREATE INDEX idx_activity_created ON public.activity_logs(created_at DESC);`} />

              <p className="text-xs font-700 text-slate-700 dark:text-slate-300">TABLE 5 — invoices + invoice_items</p>
              <CodeBlock lang="sql" title="05_invoices.sql" code={`CREATE TABLE public.invoices (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_no   TEXT NOT NULL UNIQUE,
  supplier     TEXT NOT NULL,
  file_url     TEXT,           -- Supabase Storage URL
  total_amount NUMERIC(12, 2) NOT NULL DEFAULT 0,
  status       TEXT NOT NULL DEFAULT 'pending'
               CHECK (status IN ('pending', 'processing', 'confirmed', 'rejected')),
  uploaded_by  UUID REFERENCES auth.users(id),
  confirmed_by UUID REFERENCES auth.users(id),
  confirmed_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.invoice_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id  UUID NOT NULL REFERENCES public.invoices(id) ON DELETE CASCADE,
  medicine_id UUID REFERENCES public.medicines(id),
  name        TEXT NOT NULL,
  batch       TEXT NOT NULL,
  quantity    INTEGER NOT NULL CHECK (quantity > 0),
  expiry_date DATE NOT NULL,
  unit_price  NUMERIC(10, 2) NOT NULL,
  category    TEXT NOT NULL DEFAULT 'Other',
  is_edited   BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_invoices_updated_at
  BEFORE UPDATE ON public.invoices
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_invoice_items_invoice ON public.invoice_items(invoice_id);
CREATE INDEX idx_invoices_status       ON public.invoices(status);`} />

              <p className="text-xs font-700 text-slate-700 dark:text-slate-300">TABLE 6 — redistribution_transfers</p>
              <CodeBlock lang="sql" title="06_transfers.sql" code={`CREATE TABLE public.redistribution_transfers (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  medicine_id UUID NOT NULL REFERENCES public.medicines(id),
  from_loc    TEXT NOT NULL,
  to_loc      TEXT NOT NULL,
  quantity    INTEGER NOT NULL CHECK (quantity > 0),
  reason      TEXT NOT NULL,
  urgency     TEXT NOT NULL DEFAULT 'medium'
              CHECK (urgency IN ('low', 'medium', 'high')),
  status      TEXT NOT NULL DEFAULT 'pending'
              CHECK (status IN ('pending', 'approved', 'rejected', 'completed')),
  suggested_by TEXT NOT NULL DEFAULT 'AI',
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMPTZ,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_transfers_updated_at
  BEFORE UPDATE ON public.redistribution_transfers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_transfers_status ON public.redistribution_transfers(status);`} />

              <p className="text-xs font-700 text-slate-700 dark:text-slate-300">TABLE 7 — demand_forecasts</p>
              <CodeBlock lang="sql" title="07_forecasts.sql" code={`CREATE TABLE public.demand_forecasts (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  medicine_id UUID NOT NULL REFERENCES public.medicines(id) ON DELETE CASCADE,
  month       TEXT NOT NULL,       -- 'Jan', 'Feb', etc.
  year        INTEGER NOT NULL,
  actual      INTEGER,             -- NULL for future months
  predicted   INTEGER NOT NULL,
  accuracy    NUMERIC(5, 2),       -- percentage accuracy after actual is known
  model_ver   TEXT NOT NULL DEFAULT 'v2.4.1',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (medicine_id, month, year)
);

CREATE INDEX idx_forecasts_medicine ON public.demand_forecasts(medicine_id);
CREATE INDEX idx_forecasts_month    ON public.demand_forecasts(year, month);`} />
            </div>
          </Section>

          {/* ── STEP 3: AUTH & RLS ── */}
          <Section id="auth" icon={<Shield size={18} />} title="Step 3 — Authentication & Row Level Security" badge="SECURITY">
            <div className="space-y-4">
              <InfoBox type="critical" title="🔒 RLS = Your Database Firewall">
                Without RLS, ANY authenticated user can read/write ALL data. RLS policies enforce
                that users only see data they're authorized to see — at the database level.
              </InfoBox>

              <p className="text-xs font-700 text-slate-700 dark:text-slate-300">Enable RLS on all tables:</p>
              <CodeBlock lang="sql" title="08_enable_rls.sql" code={`-- Enable Row Level Security on every table
ALTER TABLE public.profiles                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medicines                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts                    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_items             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.redistribution_transfers  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demand_forecasts          ENABLE ROW LEVEL SECURITY;

-- Helper function: get current user's role
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;`} />

              <p className="text-xs font-700 text-slate-700 dark:text-slate-300">RLS Policies for each table:</p>
              <CodeBlock lang="sql" title="09_rls_policies.sql" code={`-- ── PROFILES ──────────────────────────────────────────────────────────
-- Users can read their own profile
CREATE POLICY "profiles_select_own"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Admins and managers can read all profiles
CREATE POLICY "profiles_select_admin"
  ON public.profiles FOR SELECT
  USING (get_user_role() IN ('admin', 'manager'));

-- Users can update only their own profile
CREATE POLICY "profiles_update_own"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- ── MEDICINES ──────────────────────────────────────────────────────────
-- All authenticated users can read medicines
CREATE POLICY "medicines_select_authenticated"
  ON public.medicines FOR SELECT
  TO authenticated
  USING (true);

-- Pharmacists, managers, admins can insert
CREATE POLICY "medicines_insert"
  ON public.medicines FOR INSERT
  TO authenticated
  WITH CHECK (get_user_role() IN ('admin', 'manager', 'pharmacist'));

-- Pharmacists, managers, admins can update
CREATE POLICY "medicines_update"
  ON public.medicines FOR UPDATE
  TO authenticated
  USING (get_user_role() IN ('admin', 'manager', 'pharmacist'));

-- Only admins can delete
CREATE POLICY "medicines_delete"
  ON public.medicines FOR DELETE
  TO authenticated
  USING (get_user_role() = 'admin');

-- ── ALERTS ────────────────────────────────────────────────────────────
-- All authenticated users can read alerts
CREATE POLICY "alerts_select"
  ON public.alerts FOR SELECT
  TO authenticated
  USING (true);

-- System and admins can create alerts
CREATE POLICY "alerts_insert"
  ON public.alerts FOR INSERT
  TO authenticated
  WITH CHECK (get_user_role() IN ('admin', 'manager', 'pharmacist'));

-- Users can mark their own alerts as read
CREATE POLICY "alerts_update_read"
  ON public.alerts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ── ACTIVITY LOGS ────────────────────────────────────────────────────
-- Users see only their own logs; admins see all
CREATE POLICY "logs_select"
  ON public.activity_logs FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid()
    OR get_user_role() IN ('admin', 'manager')
  );

-- Logs are inserted by triggers (SECURITY DEFINER), not directly
-- So no INSERT policy needed for users

-- ── INVOICES ──────────────────────────────────────────────────────────
CREATE POLICY "invoices_select"
  ON public.invoices FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "invoices_insert"
  ON public.invoices FOR INSERT
  TO authenticated
  WITH CHECK (get_user_role() IN ('admin', 'manager', 'pharmacist'));

CREATE POLICY "invoices_update"
  ON public.invoices FOR UPDATE
  TO authenticated
  USING (get_user_role() IN ('admin', 'manager', 'pharmacist'));

-- ── INVOICE ITEMS ────────────────────────────────────────────────────
CREATE POLICY "invoice_items_select"
  ON public.invoice_items FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "invoice_items_insert"
  ON public.invoice_items FOR INSERT
  TO authenticated
  WITH CHECK (get_user_role() IN ('admin', 'manager', 'pharmacist'));

CREATE POLICY "invoice_items_update"
  ON public.invoice_items FOR UPDATE
  TO authenticated
  USING (get_user_role() IN ('admin', 'manager', 'pharmacist'));

CREATE POLICY "invoice_items_delete"
  ON public.invoice_items FOR DELETE
  TO authenticated
  USING (get_user_role() IN ('admin', 'manager'));

-- ── TRANSFERS ────────────────────────────────────────────────────────
CREATE POLICY "transfers_select"
  ON public.redistribution_transfers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "transfers_insert"
  ON public.redistribution_transfers FOR INSERT
  TO authenticated
  WITH CHECK (get_user_role() IN ('admin', 'manager', 'pharmacist'));

-- Only admins/managers can approve/reject
CREATE POLICY "transfers_update"
  ON public.redistribution_transfers FOR UPDATE
  TO authenticated
  USING (get_user_role() IN ('admin', 'manager'));

-- ── FORECASTS ────────────────────────────────────────────────────────
CREATE POLICY "forecasts_select"
  ON public.demand_forecasts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "forecasts_insert"
  ON public.demand_forecasts FOR INSERT
  TO authenticated
  WITH CHECK (get_user_role() IN ('admin', 'manager'));`} />

              <p className="text-xs font-700 text-slate-700 dark:text-slate-300 mt-4">Auth UI — Login/Signup component:</p>
              <CodeBlock lang="typescript" title="src/pages/Auth.tsx" code={`import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Activity, Eye, EyeOff, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Auth() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) toast.error(error.message)
    else toast.success('Welcome back!')
    setLoading(false)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name, role: 'pharmacist' }
        // This data goes into raw_user_meta_data
        // Our trigger reads it to create the profile row
      }
    })
    if (error) toast.error(error.message)
    else toast.success('Account created! Check your email to verify.')
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#f0f4ff] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <Activity size={20} className="text-white" />
          </div>
          <div>
            <span className="text-lg font-800 text-slate-900">MedFlow</span>
            <span className="text-lg font-800 text-blue-500"> AI</span>
          </div>
        </div>

        <h2 className="text-xl font-800 text-slate-900 mb-1">
          {mode === 'login' ? 'Welcome back' : 'Create account'}
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          {mode === 'login' ? 'Sign in to your pharmacy dashboard' : 'Start managing your inventory'}
        </p>

        <form onSubmit={mode === 'login' ? handleLogin : handleSignup} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-700 text-slate-600 mb-1.5">Full Name</label>
              <input
                type="text" value={name} onChange={e => setName(e.target.value)}
                placeholder="Dr. Rajan Kumar" required
                className="w-full px-3 py-2.5 text-sm bg-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          )}
          <div>
            <label className="block text-xs font-700 text-slate-600 mb-1.5">Email</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="you@pharmacy.com" required
              className="w-full px-3 py-2.5 text-sm bg-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-xs font-700 text-slate-600 mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'} value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" required minLength={6}
                className="w-full px-3 py-2.5 text-sm bg-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-300 pr-10"
              />
              <button type="button" onClick={() => setShowPw(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-3 text-sm font-700 text-white bg-blue-500 hover:bg-blue-600 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
            {loading && <Loader2 size={15} className="animate-spin" />}
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 mt-4">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => setMode(m => m === 'login' ? 'signup' : 'login')}
            className="text-blue-500 font-600 hover:text-blue-600">
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  )
}`} />
            </div>
          </Section>

          {/* ── STEP 4: SEED DATA ── */}
          <Section id="seed" icon={<Package size={18} />} title="Step 4 — Insert Real Data (Seed)" badge="SQL">
            <div className="space-y-4">
              <InfoBox type="tip" title="✅ Run this AFTER creating all tables">
                This inserts the same 12 medicines from your mockData.ts into the real database.
                The status column is auto-computed by the trigger based on expiry date + quantity.
              </InfoBox>

              <CodeBlock lang="sql" title="10_seed_medicines.sql" code={`-- Insert all 12 medicines from mockData.ts into the real database
-- NOTE: status is auto-computed by the trigger — no need to set it manually

INSERT INTO public.medicines (name, batch, quantity, expiry_date, category, supplier, price, location)
VALUES
  ('Amoxicillin 500mg',    'B2024-001', 1240, '2025-11-15', 'Antibiotics',     'PharmaCo',   12.50, 'Warehouse A'),
  ('Metformin 850mg',      'B2024-002',   85, '2025-02-20', 'Antidiabetic',    'MedSupply',   8.75, 'Warehouse B'),
  ('Atorvastatin 20mg',    'B2024-003',  320, '2025-04-10', 'Cardiovascular',  'HealthPlus', 22.00, 'Warehouse A'),
  ('Omeprazole 20mg',      'B2024-004', 2100, '2026-01-30', 'Gastrointestinal','PharmaCo',    6.50, 'Warehouse C'),
  ('Lisinopril 10mg',      'B2024-005',   45, '2025-03-05', 'Cardiovascular',  'CardioMed',  15.25, 'Warehouse B'),
  ('Cetirizine 10mg',      'B2024-006',  780, '2025-08-22', 'Antihistamine',   'AllergyFree', 4.00, 'Warehouse A'),
  ('Paracetamol 500mg',    'B2024-007', 3200, '2026-06-15', 'Analgesics',      'PharmaCo',    2.50, 'Warehouse A'),
  ('Ibuprofen 400mg',      'B2024-008',  150, '2025-04-28', 'Analgesics',      'MedSupply',   5.00, 'Warehouse C'),
  ('Azithromycin 250mg',   'B2024-009',   60, '2025-03-18', 'Antibiotics',     'PharmaCo',   18.00, 'Warehouse B'),
  ('Pantoprazole 40mg',    'B2024-010',  540, '2025-09-12', 'Gastrointestinal','GastroMed',  11.00, 'Warehouse A'),
  ('Amlodipine 5mg',       'B2024-011',  210, '2025-05-30', 'Cardiovascular',  'CardioMed',   9.50, 'Warehouse C'),
  ('Levothyroxine 50mcg',  'B2024-012',  890, '2026-03-20', 'Hormones',        'HealthPlus', 14.00, 'Warehouse B');

-- Verify: should return 12 rows
SELECT id, name, batch, quantity, expiry_date, status FROM public.medicines ORDER BY name;`} />

              <CodeBlock lang="sql" title="11_seed_alerts.sql" code={`-- Insert the 5 alerts from mockData.ts
-- We reference medicines by batch number using a subquery

INSERT INTO public.alerts (type, message, severity, medicine_id)
VALUES
  ('expiry',
   'Metformin 850mg (Batch B2024-002) expires in 18 days',
   'critical',
   (SELECT id FROM public.medicines WHERE batch = 'B2024-002')),

  ('low_stock',
   'Lisinopril 10mg stock critically low (45 units)',
   'critical',
   (SELECT id FROM public.medicines WHERE batch = 'B2024-005')),

  ('expiry',
   'Azithromycin 250mg expires in 26 days',
   'warning',
   (SELECT id FROM public.medicines WHERE batch = 'B2024-009')),

  ('demand',
   'High demand predicted for Paracetamol next week (+40%)',
   'info',
   (SELECT id FROM public.medicines WHERE batch = 'B2024-007')),

  ('redistribution',
   'Surplus Omeprazole at Warehouse C — suggest transfer',
   'info',
   (SELECT id FROM public.medicines WHERE batch = 'B2024-004'));`} />

              <CodeBlock lang="sql" title="12_seed_forecasts.sql" code={`-- Insert demand forecast data for Paracetamol
WITH paracetamol AS (SELECT id FROM public.medicines WHERE batch = 'B2024-007')
INSERT INTO public.demand_forecasts (medicine_id, month, year, actual, predicted)
SELECT p.id, month, 2024, actual, predicted FROM paracetamol p
CROSS JOIN (VALUES
  ('Oct', 3400, 3350),
  ('Nov', 3800, 3820),
  ('Dec', 4200, 4100)
) AS t(month, actual, predicted)
UNION ALL
SELECT p.id, month, 2025, NULL, predicted FROM paracetamol p
CROSS JOIN (VALUES
  ('Jan', 3950),
  ('Feb', 4300),
  ('Mar', 4600),
  ('Apr', 4200)
) AS t(month, predicted);

-- Insert for Amoxicillin
WITH amox AS (SELECT id FROM public.medicines WHERE batch = 'B2024-001')
INSERT INTO public.demand_forecasts (medicine_id, month, year, actual, predicted)
SELECT a.id, month, 2024, actual, predicted FROM amox a
CROSS JOIN (VALUES
  ('Oct', 1100, 1080),
  ('Nov', 1350, 1300),
  ('Dec', 1600, 1580)
) AS t(month, actual, predicted)
UNION ALL
SELECT a.id, month, 2025, NULL, predicted FROM amox a
CROSS JOIN (VALUES
  ('Jan', 1420),
  ('Feb', 1550),
  ('Mar', 1700),
  ('Apr', 1480)
) AS t(month, predicted);`} />

              <CodeBlock lang="sql" title="13_seed_transfers.sql" code={`-- Insert redistribution suggestions
INSERT INTO public.redistribution_transfers
  (medicine_id, from_loc, to_loc, quantity, reason, urgency, status)
VALUES
  ((SELECT id FROM public.medicines WHERE batch = 'B2024-004'),
   'Warehouse C', 'Warehouse B', 500,
   'Surplus at C, shortage predicted at B within 2 weeks', 'medium', 'pending'),

  ((SELECT id FROM public.medicines WHERE batch = 'B2024-007'),
   'Warehouse A', 'Warehouse C', 800,
   'High demand forecast at C for next month', 'low', 'pending'),

  ((SELECT id FROM public.medicines WHERE batch = 'B2024-002'),
   'Warehouse B', 'Warehouse A', 40,
   'Critical low stock at A, expiry risk at B', 'high', 'pending'),

  ((SELECT id FROM public.medicines WHERE batch = 'B2024-006'),
   'Warehouse A', 'Warehouse B', 200,
   'Seasonal allergy spike predicted at B location', 'medium', 'pending');`} />
            </div>
          </Section>

          {/* ── STEP 5: CONNECT FRONTEND ── */}
          <Section id="frontend" icon={<Code2 size={18} />} title="Step 5 — Connect Frontend to Supabase" badge="TYPESCRIPT">
            <div className="space-y-4">
              <p className="text-xs font-700 text-slate-700 dark:text-slate-300">Create .env file in project root:</p>
              <CodeBlock lang="bash" title=".env (project root)" code={`# Get these from: Supabase Dashboard → Settings → API
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# NEVER put service_role key here — it bypasses all RLS!`} />

              <InfoBox type="warn" title="⚠️ Add .env to .gitignore">
                Never commit your .env file to GitHub. Add it to .gitignore immediately.
                Vercel has its own environment variables section for deployment.
              </InfoBox>

              <p className="text-xs font-700 text-slate-700 dark:text-slate-300">Generate TypeScript types from your database:</p>
              <CodeBlock lang="bash" title="Terminal" code={`# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Generate types (replace YOUR_PROJECT_ID from your Supabase URL)
supabase gen types typescript --project-id YOUR_PROJECT_ID > src/lib/database.types.ts

# Example project ID: if URL is https://abcdefgh.supabase.co
# then project ID is: abcdefgh`} />

              <p className="text-xs font-700 text-slate-700 dark:text-slate-300">Update App.tsx to handle authentication:</p>
              <CodeBlock lang="typescript" title="src/App.tsx (updated)" code={`import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import type { Session } from '@supabase/supabase-js'
import { Layout } from './components/Layout'
import { ToastProvider } from './components/Toast'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Inventory from './pages/Inventory'
// ... other imports

export default function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get current session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // Listen for auth state changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
        // _event can be: SIGNED_IN, SIGNED_OUT, TOKEN_REFRESHED, USER_UPDATED
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f4ff]">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 animate-pulse" />
      </div>
    )
  }

  // Not logged in → show Auth page
  if (!session) return (
    <>
      <ToastProvider />
      <Auth />
    </>
  )

  // Logged in → show full app
  return (
    <BrowserRouter>
      <ToastProvider />
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          {/* ... other routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}`} />
            </div>
          </Section>

          {/* ── STEP 6: REACT HOOKS ── */}
          <Section id="hooks" icon={<Zap size={18} />} title="Step 6 — Data Fetching Hooks (Replace mockData)" badge="HOOKS">
            <div className="space-y-4">
              <InfoBox type="tip" title="Strategy: Replace mockData.ts imports one-by-one">
                Each page currently imports from mockData.ts. Replace those imports with these
                custom hooks that fetch from Supabase. The UI stays exactly the same.
              </InfoBox>

              <CodeBlock lang="typescript" title="src/hooks/useMedicines.ts" code={`import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import type { Medicine } from '../lib/mockData'
import toast from 'react-hot-toast'

// Fetch all medicines
export function useMedicines() {
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMedicines = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('medicines')
      .select('*')
      .order('name', { ascending: true })

    if (error) {
      setError(error.message)
      toast.error('Failed to load medicines')
    } else {
      // Map snake_case DB columns to camelCase frontend fields
      setMedicines(data.map(m => ({
        id: m.id,
        name: m.name,
        batch: m.batch,
        quantity: m.quantity,
        expiryDate: m.expiry_date,    // expiry_date → expiryDate
        category: m.category,
        supplier: m.supplier,
        price: m.price,
        status: m.status as Medicine['status'],
        location: m.location,
      })))
    }
    setLoading(false)
  }, [])

  useEffect(() => { fetchMedicines() }, [fetchMedicines])

  return { medicines, loading, error, refetch: fetchMedicines }
}

// Add a new medicine
export function useAddMedicine() {
  const [loading, setLoading] = useState(false)

  const addMedicine = async (medicine: Omit<Medicine, 'id' | 'status'>) => {
    setLoading(true)
    const { data, error } = await supabase
      .from('medicines')
      .insert({
        name: medicine.name,
        batch: medicine.batch,
        quantity: medicine.quantity,
        expiry_date: medicine.expiryDate,
        category: medicine.category,
        supplier: medicine.supplier,
        price: medicine.price,
        location: medicine.location,
        // status is auto-computed by DB trigger!
      })
      .select()
      .single()

    if (error) {
      toast.error(error.message)
      setLoading(false)
      return null
    }

    toast.success(\`\${medicine.name} added to inventory!\`)
    setLoading(false)
    return data
  }

  return { addMedicine, loading }
}

// Update a medicine
export function useUpdateMedicine() {
  const updateMedicine = async (id: string, updates: Partial<Medicine>) => {
    const { error } = await supabase
      .from('medicines')
      .update({
        name: updates.name,
        quantity: updates.quantity,
        expiry_date: updates.expiryDate,
        price: updates.price,
        location: updates.location,
        // Don't update batch — it's unique and shouldn't change
      })
      .eq('id', id)

    if (error) { toast.error(error.message); return false }
    toast.success('Medicine updated!')
    return true
  }
  return { updateMedicine }
}

// Delete a medicine (admin only — enforced by RLS)
export function useDeleteMedicine() {
  const deleteMedicine = async (id: string) => {
    const { error } = await supabase
      .from('medicines')
      .delete()
      .eq('id', id)

    if (error) { toast.error(error.message); return false }
    toast.success('Medicine removed from inventory')
    return true
  }
  return { deleteMedicine }
}`} />

              <CodeBlock lang="typescript" title="src/hooks/useAlerts.ts" code={`import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Alert } from '../lib/mockData'

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from('alerts')
        .select('*, medicines(name)')   // JOIN to get medicine name
        .order('created_at', { ascending: false })
        .limit(20)

      if (!error && data) {
        setAlerts(data.map(a => ({
          id: a.id,
          type: a.type as Alert['type'],
          message: a.message,
          severity: a.severity as Alert['severity'],
          time: formatTimeAgo(a.created_at),
        })))
      }
      setLoading(false)
    }
    fetch()
  }, [])

  const markAsRead = async (id: string) => {
    await supabase.from('alerts').update({ is_read: true }).eq('id', id)
    setAlerts(prev => prev.filter(a => a.id !== id))
  }

  return { alerts, loading, markAsRead }
}

function formatTimeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return \`\${mins} min ago\`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return \`\${hrs} hr ago\`
  return \`\${Math.floor(hrs / 24)} days ago\`
}`} />

              <CodeBlock lang="typescript" title="src/hooks/useTransfers.ts" code={`import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'

export function useTransfers() {
  const [transfers, setTransfers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from('redistribution_transfers')
        .select('*, medicines(name, batch)')  // JOIN medicines
        .order('created_at', { ascending: false })

      if (!error && data) {
        setTransfers(data.map(t => ({
          id: t.id,
          medicine: t.medicines?.name ?? 'Unknown',
          from: t.from_loc,
          to: t.to_loc,
          quantity: t.quantity,
          reason: t.reason,
          urgency: t.urgency,
          status: t.status,
        })))
      }
      setLoading(false)
    }
    fetch()
  }, [])

  const approveTransfer = async (id: string, medicine: string) => {
    const { data: { user } } = await supabase.auth.getUser()
    const { error } = await supabase
      .from('redistribution_transfers')
      .update({
        status: 'approved',
        approved_by: user?.id,
        approved_at: new Date().toISOString(),
      })
      .eq('id', id)

    if (error) { toast.error(error.message); return false }
    toast.success(\`Transfer approved: \${medicine}\`)
    setTransfers(prev => prev.filter(t => t.id !== id))
    return true
  }

  const rejectTransfer = async (id: string) => {
    const { error } = await supabase
      .from('redistribution_transfers')
      .update({ status: 'rejected' })
      .eq('id', id)

    if (error) { toast.error(error.message); return false }
    toast.error('Transfer rejected')
    setTransfers(prev => prev.filter(t => t.id !== id))
    return true
  }

  return { transfers, loading, approveTransfer, rejectTransfer }
}`} />

              <CodeBlock lang="typescript" title="src/hooks/useProfile.ts" code={`import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'

export function useProfile() {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setLoading(false); return }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (!error) setProfile(data)
      setLoading(false)
    }
    fetch()
  }, [])

  const updateProfile = async (updates: Partial<typeof profile>) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return false

    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)

    if (error) { toast.error(error.message); return false }
    setProfile((prev: any) => ({ ...prev, ...updates }))
    toast.success('Profile updated!')
    return true
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    toast.success('Signed out successfully')
  }

  return { profile, loading, updateProfile, signOut }
}`} />
            </div>
          </Section>

          {/* ── STEP 7: REALTIME ── */}
          <Section id="realtime" icon={<Activity size={18} />} title="Step 7 — Realtime Subscriptions" badge="LIVE">
            <div className="space-y-4">
              <InfoBox type="info" title="What is Realtime?">
                Supabase Realtime uses WebSockets to push database changes to your frontend instantly.
                When any user adds a medicine, ALL connected users see it update live — no page refresh needed.
              </InfoBox>

              <p className="text-xs font-700 text-slate-700 dark:text-slate-300">Enable Realtime on tables (run in SQL Editor):</p>
              <CodeBlock lang="sql" title="14_enable_realtime.sql" code={`-- Enable realtime publication for tables
-- Go to: Supabase Dashboard → Database → Replication → Tables
-- OR run this SQL:

ALTER PUBLICATION supabase_realtime ADD TABLE public.medicines;
ALTER PUBLICATION supabase_realtime ADD TABLE public.alerts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.redistribution_transfers;`} />

              <CodeBlock lang="typescript" title="src/hooks/useMedicinesRealtime.ts" code={`import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Medicine } from '../lib/mockData'
import toast from 'react-hot-toast'

export function useMedicinesRealtime() {
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 1. Initial fetch
    const fetchAll = async () => {
      const { data } = await supabase
        .from('medicines')
        .select('*')
        .order('name')

      if (data) setMedicines(data.map(mapMedicine))
      setLoading(false)
    }
    fetchAll()

    // 2. Subscribe to realtime changes
    const channel = supabase
      .channel('medicines-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'medicines' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            // New medicine added → prepend to list
            setMedicines(prev => [mapMedicine(payload.new), ...prev])
            toast.success(\`New medicine added: \${payload.new.name}\`)
          }
          if (payload.eventType === 'UPDATE') {
            // Medicine updated → replace in list
            setMedicines(prev => prev.map(m =>
              m.id === payload.new.id ? mapMedicine(payload.new) : m
            ))
          }
          if (payload.eventType === 'DELETE') {
            // Medicine deleted → remove from list
            setMedicines(prev => prev.filter(m => m.id !== payload.old.id))
          }
        }
      )
      .subscribe()

    // 3. Cleanup: unsubscribe when component unmounts
    return () => { supabase.removeChannel(channel) }
  }, [])

  return { medicines, loading }
}

// Map DB row (snake_case) to frontend type (camelCase)
function mapMedicine(row: any): Medicine {
  return {
    id: row.id,
    name: row.name,
    batch: row.batch,
    quantity: row.quantity,
    expiryDate: row.expiry_date,
    category: row.category,
    supplier: row.supplier,
    price: row.price,
    status: row.status,
    location: row.location,
  }
}`} />

              <p className="text-xs font-700 text-slate-700 dark:text-slate-300 mt-3">Use in Inventory page (replace mockData import):</p>
              <CodeBlock lang="typescript" title="src/pages/Inventory.tsx (top of file — change only this)" code={`// BEFORE (mockData):
// import { medicines } from '../lib/mockData'

// AFTER (real database with realtime):
import { useMedicinesRealtime } from '../hooks/useMedicinesRealtime'

export default function Inventory() {
  const { medicines, loading } = useMedicinesRealtime()
  // ... rest of the component stays EXACTLY the same
  // The medicines variable is now live from Supabase
}`} />
            </div>
          </Section>

          {/* ── STEP 8: AUDIT LOGS ── */}
          <Section id="audit" icon={<Lock size={18} />} title="Step 8 — Activity Logs (Every User Action)" badge="AUDIT">
            <div className="space-y-4">
              <InfoBox type="info" title="What gets logged automatically?">
                The audit trigger we created in Step 2 automatically logs every INSERT, UPDATE, DELETE
                on the medicines table — with old and new values, user ID, and timestamp.
                No extra code needed for database operations.
              </InfoBox>

              <p className="text-xs font-700 text-slate-700 dark:text-slate-300">Log manual actions (login, export, etc.):</p>
              <CodeBlock lang="typescript" title="src/lib/activityLogger.ts" code={`import { supabase } from './supabase'

type Action = 'LOGIN' | 'LOGOUT' | 'EXPORT' | 'UPLOAD_INVOICE' | 
              'APPROVE_TRANSFER' | 'REJECT_TRANSFER' | 'VIEW_REPORT'

export async function logActivity(
  action: Action,
  entityType: string,
  entityId?: string,
  metadata?: Record<string, any>
) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return  // not logged in, skip

  await supabase.from('activity_logs').insert({
    user_id: user.id,
    action,
    entity_type: entityType,
    entity_id: entityId ?? null,
    new_data: metadata ?? null,
    ip_address: null,  // can get from request in server-side code
    user_agent: navigator.userAgent,
  })
}

// Usage examples:
// await logActivity('LOGIN', 'auth')
// await logActivity('EXPORT', 'medicines', undefined, { format: 'csv', count: 12 })
// await logActivity('APPROVE_TRANSFER', 'transfer', transferId)`} />

              <p className="text-xs font-700 text-slate-700 dark:text-slate-300">Log user login in Auth.tsx:</p>
              <CodeBlock lang="typescript" title="In Auth.tsx handleLogin function" code={`const handleLogin = async (e) => {
  e.preventDefault()
  setLoading(true)
  
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  
  if (error) {
    toast.error(error.message)
  } else {
    toast.success('Welcome back!')
    // Log the login event
    await logActivity('LOGIN', 'auth', undefined, { email })
  }
  setLoading(false)
}`} />

              <p className="text-xs font-700 text-slate-700 dark:text-slate-300">Query activity logs in Supabase Dashboard:</p>
              <CodeBlock lang="sql" title="Useful queries to run in SQL Editor" code={`-- See all recent activity
SELECT 
  al.action,
  al.entity_type,
  al.created_at,
  p.full_name,
  p.role,
  al.new_data
FROM public.activity_logs al
LEFT JOIN public.profiles p ON p.id = al.user_id
ORDER BY al.created_at DESC
LIMIT 50;

-- See who changed a specific medicine
SELECT 
  al.action,
  al.old_data,
  al.new_data,
  al.created_at,
  p.full_name
FROM public.activity_logs al
LEFT JOIN public.profiles p ON p.id = al.user_id
WHERE al.entity_type = 'medicines'
  AND al.entity_id = 'YOUR-MEDICINE-UUID-HERE'
ORDER BY al.created_at DESC;

-- Count actions per user
SELECT 
  p.full_name,
  al.action,
  COUNT(*) as count
FROM public.activity_logs al
JOIN public.profiles p ON p.id = al.user_id
GROUP BY p.full_name, al.action
ORDER BY count DESC;`} />
            </div>
          </Section>

          {/* ── STEP 9: ENV & DEPLOY ── */}
          <Section id="env" icon={<Globe size={18} />} title="Step 9 — Environment Variables & Deploy to Vercel" badge="DEPLOY">
            <div className="space-y-4">
              <p className="text-xs font-700 text-slate-700 dark:text-slate-300">Add env vars to Vercel:</p>
              <div className="space-y-2">
                {[
                  { n: 1, text: 'Go to vercel.com → your project → Settings → Environment Variables' },
                  { n: 2, text: 'Add VITE_SUPABASE_URL → value from Supabase Dashboard → Settings → API → Project URL' },
                  { n: 3, text: 'Add VITE_SUPABASE_ANON_KEY → value from Supabase Dashboard → Settings → API → anon/public key' },
                  { n: 4, text: 'Set Environment: Production + Preview + Development' },
                  { n: 5, text: 'Click Save → Redeploy the project' },
                ].map(({ n, text }) => (
                  <div key={n} className="flex items-start gap-3">
                    <StepBadge n={n} />
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>

              <p className="text-xs font-700 text-slate-700 dark:text-slate-300 mt-2">Add Vercel domain to Supabase allowed URLs:</p>
              <CodeBlock lang="bash" title="Supabase Dashboard → Authentication → URL Configuration" code={`# Site URL:
https://your-app.vercel.app

# Redirect URLs (add all of these):
https://your-app.vercel.app/**
http://localhost:5173/**
http://localhost:3000/**`} />

              <InfoBox type="tip" title="✅ Final Deployment Checklist">
                <ol className="space-y-1 list-decimal list-inside">
                  <li>All 7 SQL files run successfully in Supabase SQL Editor</li>
                  <li>Seed data inserted (12 medicines visible in Table Editor)</li>
                  <li>RLS enabled on all 8 tables</li>
                  <li>Environment variables added to Vercel</li>
                  <li>Supabase redirect URLs updated with Vercel domain</li>
                  <li>Test: sign up → verify email → sign in → see real data</li>
                </ol>
              </InfoBox>
            </div>
          </Section>

          {/* ── STEP 10: CHECKLIST ── */}
          <Section id="checklist" icon={<CheckCircle size={18} />} title="Step 10 — Complete Integration Checklist" badge="FINAL">
            <div className="space-y-3">
              {[
                { phase: 'Supabase Setup', items: [
                  'Created Supabase project',
                  'Copied Project URL and anon key',
                  'Installed @supabase/supabase-js',
                  'Created src/lib/supabase.ts',
                  'Created .env file with credentials',
                  'Added .env to .gitignore',
                ]},
                { phase: 'Database', items: [
                  'Run 01_profiles.sql (profiles table + trigger)',
                  'Run 02_medicines.sql (medicines + auto-status trigger)',
                  'Run 03_alerts.sql (alerts table)',
                  'Run 04_activity_logs.sql (audit trail)',
                  'Run 05_invoices.sql (invoices + items)',
                  'Run 06_transfers.sql (redistribution)',
                  'Run 07_forecasts.sql (demand forecasts)',
                ]},
                { phase: 'Security', items: [
                  'Run 08_enable_rls.sql (enable RLS on all tables)',
                  'Run 09_rls_policies.sql (all access policies)',
                  'Verified anon key is NOT service_role key',
                  'service_role key NOT in any frontend file',
                ]},
                { phase: 'Data', items: [
                  'Run 10_seed_medicines.sql (12 medicines)',
                  'Run 11_seed_alerts.sql (5 alerts)',
                  'Run 12_seed_forecasts.sql (forecast data)',
                  'Run 13_seed_transfers.sql (4 transfer suggestions)',
                  'Run 14_enable_realtime.sql',
                ]},
                { phase: 'Frontend Integration', items: [
                  'Updated App.tsx with auth session handling',
                  'Created Auth.tsx login/signup page',
                  'Created useMedicines.ts hook',
                  'Created useAlerts.ts hook',
                  'Created useTransfers.ts hook',
                  'Created useProfile.ts hook',
                  'Created useMedicinesRealtime.ts hook',
                  'Generated TypeScript types with supabase CLI',
                  'Replaced mockData imports in each page',
                ]},
                { phase: 'Deployment', items: [
                  'Added VITE_SUPABASE_URL to Vercel env vars',
                  'Added VITE_SUPABASE_ANON_KEY to Vercel env vars',
                  'Added Vercel domain to Supabase redirect URLs',
                  'Redeployed to Vercel',
                  'Tested sign up → email verify → sign in → data loads',
                ]},
              ].map(({ phase, items }) => (
                <div key={phase} className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
                  <p className="text-xs font-700 text-slate-700 dark:text-slate-300 mb-2">{phase}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {items.map(item => (
                      <label key={item} className="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" className="w-3.5 h-3.5 rounded accent-blue-500" />
                        <span className="text-[11px] text-slate-600 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Quick Reference */}
          <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-200 dark:border-blue-900/30 p-5">
            <h3 className="text-sm font-700 text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
              <Key size={16} className="text-blue-500" /> Quick Reference Links
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { label: 'Supabase Dashboard', url: 'https://supabase.com/dashboard' },
                { label: 'Supabase Docs — Auth', url: 'https://supabase.com/docs/guides/auth' },
                { label: 'Supabase Docs — RLS', url: 'https://supabase.com/docs/guides/database/postgres/row-level-security' },
                { label: 'Supabase Docs — Realtime', url: 'https://supabase.com/docs/guides/realtime' },
                { label: 'Supabase JS Client', url: 'https://supabase.com/docs/reference/javascript' },
                { label: 'Vercel Env Variables', url: 'https://vercel.com/docs/environment-variables' },
              ].map(({ label, url }) => (
                <a key={label} href={url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 font-600 bg-white dark:bg-slate-800 rounded-xl px-3 py-2 border border-blue-100 dark:border-slate-700 hover:border-blue-300 transition-all">
                  <ExternalLink size={11} />
                  {label}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

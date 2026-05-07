import { useState } from 'react';
import { User, Bell, Shield, Database, Palette, Save, Sun, Moon } from 'lucide-react';
import { Card } from '../components/Card';
import { useTheme } from '../hooks/useTheme';
import { cn } from '../lib/utils';
import toast from 'react-hot-toast';

export default function Settings() {
  const { isDark, toggle } = useTheme();
  const [profile, setProfile] = useState({
    name: 'Dr. Rajan Kumar',
    email: 'rajan.kumar@medflow.ai',
    role: 'Admin',
    phone: '+91 98765 43210',
    pharmacy: 'MedFlow Central Pharmacy',
  });
  const [notifications, setNotifications] = useState({
    expiryAlerts: true,
    lowStockAlerts: true,
    demandForecasts: true,
    weeklyReports: false,
    redistributionSuggestions: true,
  });

  const handleSave = () => toast.success('Settings saved successfully!');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'data', label: 'Data & Export', icon: Database },
  ];
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h1 className="text-xl font-800 text-slate-900 dark:text-white">Settings</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        {/* Sidebar Tabs */}
        <Card padding="sm" className="lg:col-span-1 h-fit">
          <nav className="space-y-1">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-600 transition-all text-left',
                  activeTab === id
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                )}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </nav>
        </Card>

        {/* Content */}
        <div className="lg:col-span-3 space-y-4">
          {activeTab === 'profile' && (
            <>
              <Card>
                <h3 className="text-sm font-700 text-slate-800 dark:text-slate-100 mb-4">Profile Information</h3>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-800">
                    DR
                  </div>
                  <div>
                    <p className="text-sm font-700 text-slate-800 dark:text-slate-200">{profile.name}</p>
                    <p className="text-xs text-slate-500">{profile.role} · {profile.pharmacy}</p>
                    <button className="text-xs text-blue-500 font-600 mt-1 hover:text-blue-600">Change photo</button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Full Name', key: 'name', type: 'text' },
                    { label: 'Email Address', key: 'email', type: 'email' },
                    { label: 'Phone Number', key: 'phone', type: 'tel' },
                    { label: 'Pharmacy Name', key: 'pharmacy', type: 'text' },
                  ].map(({ label, key, type }) => (
                    <div key={key}>
                      <label className="block text-xs font-700 text-slate-600 dark:text-slate-400 mb-1.5">{label}</label>
                      <input
                        type={type}
                        value={profile[key as keyof typeof profile]}
                        onChange={e => setProfile(prev => ({ ...prev, [key]: e.target.value }))}
                        className="w-full px-3 py-2.5 text-sm text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-blue-300 dark:focus:border-blue-700 rounded-xl outline-none transition-colors"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <label className="block text-xs font-700 text-slate-600 dark:text-slate-400 mb-1.5">Role</label>
                  <select
                    value={profile.role}
                    onChange={e => setProfile(prev => ({ ...prev, role: e.target.value }))}
                    className="w-full px-3 py-2.5 text-sm text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-blue-300 rounded-xl outline-none"
                  >
                    {['Admin', 'Pharmacist', 'Manager', 'Viewer'].map(r => <option key={r}>{r}</option>)}
                  </select>
                </div>
              </Card>
              <div className="flex justify-end">
                <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 text-sm font-600 text-white bg-blue-500 hover:bg-blue-600 rounded-xl transition-colors">
                  <Save size={15} /> Save Changes
                </button>
              </div>
            </>
          )}

          {activeTab === 'notifications' && (
            <Card>
              <h3 className="text-sm font-700 text-slate-800 dark:text-slate-100 mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                {(Object.entries(notifications) as [string, boolean][]).map(([key, val]) => {
                  const labels: Record<string, { title: string; desc: string }> = {
                    expiryAlerts: { title: 'Expiry Alerts', desc: 'Get notified when medicines are expiring soon' },
                    lowStockAlerts: { title: 'Low Stock Alerts', desc: 'Alert when inventory falls below threshold' },
                    demandForecasts: { title: 'Demand Forecasts', desc: 'Weekly AI demand predictions' },
                    weeklyReports: { title: 'Weekly Reports', desc: 'Summary report every Monday morning' },
                    redistributionSuggestions: { title: 'Redistribution Suggestions', desc: 'AI transfer recommendations' },
                  };
                  return (
                    <div key={key} className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700/50 last:border-0">
                      <div>
                        <p className="text-sm font-600 text-slate-800 dark:text-slate-200">{labels[key]?.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{labels[key]?.desc}</p>
                      </div>
                      <button
                        onClick={() => setNotifications(prev => ({ ...prev, [key]: !val }))}
                        className={cn(
                          'w-11 h-6 rounded-full transition-all duration-200 relative flex-shrink-0',
                          val ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'
                        )}
                      >
                        <span className={cn(
                          'absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200',
                          val ? 'left-[22px]' : 'left-0.5'
                        )} />
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 flex justify-end">
                <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 text-sm font-600 text-white bg-blue-500 hover:bg-blue-600 rounded-xl transition-colors">
                  <Save size={15} /> Save
                </button>
              </div>
            </Card>
          )}

          {activeTab === 'appearance' && (
            <Card>
              <h3 className="text-sm font-700 text-slate-800 dark:text-slate-100 mb-4">Appearance</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-600 text-slate-700 dark:text-slate-300 mb-3">Theme</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Light Mode', icon: Sun, value: false },
                      { label: 'Dark Mode', icon: Moon, value: true },
                    ].map(({ label, icon: Icon, value }) => (
                      <button
                        key={label}
                        onClick={() => { if (isDark !== value) toggle(); }}
                        className={cn(
                          'flex items-center gap-3 p-4 rounded-2xl border-2 transition-all',
                          isDark === value
                            ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                        )}
                      >
                        <Icon size={20} className={isDark === value ? 'text-blue-500' : 'text-slate-400'} />
                        <span className={cn('text-sm font-600', isDark === value ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400')}>{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <p className="text-xs font-600 text-slate-600 dark:text-slate-400">Current theme: <span className="text-blue-500">{isDark ? 'Dark' : 'Light'}</span></p>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'security' && (
            <Card>
              <h3 className="text-sm font-700 text-slate-800 dark:text-slate-100 mb-4">Security Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-700 text-slate-600 dark:text-slate-400 mb-1.5">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-3 py-2.5 text-sm bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-blue-300 rounded-xl outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-700 text-slate-600 dark:text-slate-400 mb-1.5">New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-3 py-2.5 text-sm bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-blue-300 rounded-xl outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-700 text-slate-600 dark:text-slate-400 mb-1.5">Confirm New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-3 py-2.5 text-sm bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-blue-300 rounded-xl outline-none" />
                </div>
                <button onClick={() => toast.success('Password updated!')} className="flex items-center gap-2 px-5 py-2.5 text-sm font-600 text-white bg-blue-500 hover:bg-blue-600 rounded-xl transition-colors">
                  <Shield size={15} /> Update Password
                </button>
              </div>
            </Card>
          )}

          {activeTab === 'data' && (
            <Card>
              <h3 className="text-sm font-700 text-slate-800 dark:text-slate-100 mb-4">Data & Export</h3>
              <div className="space-y-3">
                {[
                  { label: 'Export Inventory', desc: 'Download full inventory as CSV', action: 'Export CSV' },
                  { label: 'Export Forecast Data', desc: 'AI predictions in Excel format', action: 'Export XLSX' },
                  { label: 'Generate Report', desc: 'Full PDF report for this month', action: 'Generate PDF' },
                  { label: 'Backup Data', desc: 'Create a full system backup', action: 'Backup Now' },
                ].map(({ label, desc, action }) => (
                  <div key={label} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <div>
                      <p className="text-sm font-600 text-slate-800 dark:text-slate-200">{label}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                    </div>
                    <button
                      onClick={() => toast.success(`${action} initiated`)}
                      className="px-3 py-1.5 text-xs font-600 text-blue-500 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-xl transition-colors"
                    >{action}</button>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

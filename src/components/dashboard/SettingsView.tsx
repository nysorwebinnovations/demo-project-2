import { useState } from 'react';
import { Sun, Moon, Globe, Bell, Shield, Palette, Store, Truck } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export function SettingsView() {
  const { theme, toggle } = useTheme();
  const [notifyLowStock,  setNotifyLowStock]  = useState(true);
  const [notifyNewOrder,  setNotifyNewOrder]  = useState(true);
  const [notifyDelivery,  setNotifyDelivery]  = useState(false);
  const [twoFactor,       setTwoFactor]       = useState(true);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {/* General Settings */}
      <div className="card p-5 lg:col-span-2">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">General Settings</h3>
        <p className="mt-0.5 text-xs text-slate-400">Configure your store preferences</p>

        <div className="mt-5 space-y-4">
          {/* Appearance */}
          <SettingRow
            icon={theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            title="Appearance"
            description="Switch between light and dark mode"
          >
            <button onClick={toggle} className="btn-outline">
              {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
            </button>
          </SettingRow>

          {/* Store Location */}
          <SettingRow
            icon={<Store className="h-5 w-5" />}
            title="Active Store Location"
            description="Primary branch for this admin session"
          >
            <select className="input w-52">
              <option>Colombo Branch – Main Store</option>
              <option>Kandy Branch – City Centre</option>
              <option>Gampaha Branch – Warehouse</option>
              <option>Negombo Branch – Outlet</option>
            </select>
          </SettingRow>

          {/* Language */}
          <SettingRow
            icon={<Globe className="h-5 w-5" />}
            title="Dashboard Language"
            description="Language for the admin console"
          >
            <select className="input w-44">
              <option>English (UK)</option>
              <option>සිංහල (Sinhala)</option>
              <option>தமிழ் (Tamil)</option>
            </select>
          </SettingRow>

          {/* Brand Color */}
          <SettingRow
            icon={<Palette className="h-5 w-5" />}
            title="Brand Accent Color"
            description="Primary accent used across the dashboard"
          >
            <div className="flex gap-2">
              {['#FBB917', '#DEB887', '#1bb354', '#e64a4a', '#0ea5e9'].map((c, i) => (
                <button
                  key={c}
                  className={`h-7 w-7 rounded-full ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 ${
                    i === 0 ? 'ring-brand-400' : 'ring-transparent'
                  }`}
                  style={{ backgroundColor: c }}
                  aria-label={`Brand color ${c}`}
                />
              ))}
            </div>
          </SettingRow>

          {/* Delivery Radius */}
          <SettingRow
            icon={<Truck className="h-5 w-5" />}
            title="Delivery Radius"
            description="Maximum delivery distance from branch"
          >
            <select className="input w-40">
              <option>5 km</option>
              <option>10 km</option>
              <option>15 km</option>
              <option>20 km</option>
            </select>
          </SettingRow>
        </div>
      </div>

      {/* Notifications */}
      <div className="card p-5">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">Notification Alerts</h3>
        <p className="mt-0.5 text-xs text-slate-400">Manage how you receive store alerts</p>

        <div className="mt-5 space-y-4">
          <ToggleRow
            icon={<Bell className="h-5 w-5" />}
            title="Low Stock Alerts"
            description="Email when items need restocking"
            checked={notifyLowStock}
            onChange={setNotifyLowStock}
          />
          <ToggleRow
            icon={<Bell className="h-5 w-5" />}
            title="New Order Notifications"
            description="Real-time browser alerts on new orders"
            checked={notifyNewOrder}
            onChange={setNotifyNewOrder}
          />
          <ToggleRow
            icon={<Truck className="h-5 w-5" />}
            title="Delivery Updates"
            description="Notify when driver status changes"
            checked={notifyDelivery}
            onChange={setNotifyDelivery}
          />
          <ToggleRow
            icon={<Shield className="h-5 w-5" />}
            title="Two-Factor Auth"
            description="Require a code at sign-in"
            checked={twoFactor}
            onChange={setTwoFactor}
          />
        </div>

        <button className="btn-primary mt-6 w-full">Save Changes</button>
      </div>
    </div>
  );
}

function SettingRow({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 p-4 dark:border-slate-800">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950/30 dark:text-brand-400">
          {icon}
        </span>
        <div>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</p>
          <p className="text-xs text-slate-400">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function ToggleRow({
  icon,
  title,
  description,
  checked,
  onChange,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {icon}
        </span>
        <div>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</p>
          <p className="text-xs text-slate-400">{description}</p>
        </div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${
          checked ? 'bg-brand-500' : 'bg-slate-300 dark:bg-slate-700'
        }`}
        role="switch"
        aria-checked={checked}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all duration-200 ${
            checked ? 'left-[22px]' : 'left-0.5'
          }`}
        />
      </button>
    </div>
  );
}

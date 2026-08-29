import { useState } from 'react';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Check,
  Info,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  MapPin,
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { notifications as allNotifications } from '@/data/mockData';
import type { Notification } from '@/types';
import { Dropdown, MenuItem, MenuSeparator, MenuLabel } from '@/components/ui/Dropdown';

interface TopHeaderProps {
  onToggleSidebar: () => void;
  title: string;
  subtitle: string;
}

const notifIcon: Record<Notification['type'], typeof Info> = {
  success: CheckCircle2,
  warning: AlertTriangle,
  info: Info,
  error: XCircle,
};

const notifColor: Record<Notification['type'], string> = {
  success: 'text-success-600 bg-success-100 dark:bg-success-950/60',
  warning: 'text-warning-600 bg-warning-100 dark:bg-warning-950/60',
  info:    'text-brand-600 bg-brand-100 dark:bg-brand-950/60',
  error:   'text-error-500 bg-error-100 dark:bg-error-950/60',
};

export function TopHeader({ onToggleSidebar, title, subtitle }: TopHeaderProps) {
  const { theme, toggle } = useTheme();
  const [notifications, setNotifications] = useState(allNotifications);
  const unread = notifications.filter((n) => !n.read).length;

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/80 px-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 sm:px-6">
      {/* Mobile Menu Toggle */}
      <button
        onClick={onToggleSidebar}
        className="btn-ghost -ml-2 h-9 w-9 p-0 lg:hidden"
        aria-label="Toggle sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Page Title */}
      <div className="hidden min-w-0 md:block">
        <h1 className="truncate text-base font-bold text-slate-900 dark:text-white">{title}</h1>
        <p className="truncate text-xs text-slate-400">{subtitle}</p>
      </div>

      {/* Store Location Badge */}
      <div className="hidden items-center gap-1.5 rounded-xl border border-earth-300 bg-earth-50 px-3 py-1.5 dark:border-earth-700 dark:bg-earth-950/30 lg:flex">
        <MapPin className="h-3.5 w-3.5 text-earth-500 shrink-0" />
        <span className="text-xs font-semibold text-earth-700 dark:text-earth-400 whitespace-nowrap">
          Colombo Branch – Main Store
        </span>
      </div>

      {/* Search Bar */}
      <div className="relative ml-auto hidden max-w-sm flex-1 sm:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search products, orders, customers…"
          className="input pl-9"
        />
        <kbd className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-lg border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 dark:border-slate-700 dark:bg-slate-800 lg:block">
          ⌘K
        </kbd>
      </div>

      {/* Right Actions */}
      <div className="ml-auto flex items-center gap-1 sm:ml-3">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggle}
          className="btn-ghost h-9 w-9 p-0"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        {/* Notifications */}
        <Dropdown
          trigger={({ toggle: toggleDrop }) => (
            <button
              onClick={toggleDrop}
              className="btn-ghost relative h-9 w-9 p-0"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              {unread > 0 && (
                <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-error-500 px-1 text-[10px] font-bold text-white">
                  {unread}
                </span>
              )}
            </button>
          )}
        >
          {({ close }) => (
            <div className="w-80">
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  Notifications
                </span>
                <button
                  onClick={markAllRead}
                  className="flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400"
                >
                  <Check className="h-3.5 w-3.5" /> Mark all read
                </button>
              </div>
              <MenuSeparator />
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((n) => {
                  const Icon = notifIcon[n.type];
                  return (
                    <div
                      key={n.id}
                      className={`flex gap-3 rounded-lg px-3 py-2.5 transition hover:bg-slate-50 dark:hover:bg-slate-800/60 ${
                        !n.read ? 'bg-brand-50/40 dark:bg-brand-950/20' : ''
                      }`}
                    >
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${notifColor[n.type]}`}>
                        <Icon className="h-4 w-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{n.title}</p>
                        <p className="truncate text-xs text-slate-500 dark:text-slate-400">{n.description}</p>
                        <p className="mt-0.5 text-[11px] text-slate-400">{n.time}</p>
                      </div>
                      {!n.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-500" />}
                    </div>
                  );
                })}
              </div>
              <MenuSeparator />
              <button
                onClick={close}
                className="w-full rounded-lg px-3 py-2 text-center text-sm font-semibold text-brand-600 hover:bg-slate-50 dark:text-brand-400 dark:hover:bg-slate-800"
              >
                View all notifications
              </button>
            </div>
          )}
        </Dropdown>

        {/* Admin Profile */}
        <Dropdown
          trigger={({ toggle: toggleDrop }) => (
            <button
              onClick={toggleDrop}
              className="flex items-center gap-2 rounded-xl p-1 pr-2 transition hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-xs font-bold text-slate-900">
                KR
              </span>
              <span className="hidden text-left sm:block">
                <span className="block text-sm font-bold leading-tight text-slate-800 dark:text-slate-100">
                  Kavinda Rathnayake
                </span>
                <span className="block text-xs leading-tight text-slate-400">Store Administrator</span>
              </span>
              <ChevronDown className="hidden h-4 w-4 text-slate-400 sm:block" />
            </button>
          )}
        >
          {() => (
            <div className="w-56">
              <MenuLabel>My Account</MenuLabel>
              <MenuItem icon={<User className="h-4 w-4" />} label="My Profile" />
              <MenuItem icon={<Settings className="h-4 w-4" />} label="Account Settings" />
              <MenuSeparator />
              <MenuItem icon={<LogOut className="h-4 w-4" />} label="Sign out" danger />
            </div>
          )}
        </Dropdown>
      </div>
    </header>
  );
}

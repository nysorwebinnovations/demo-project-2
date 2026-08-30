import {
  LayoutDashboard,
  Package,
  ClipboardList,
  Users,
  BarChart3,
  Settings,
  ChevronLeft,
  ShoppingBasket,
  X,
} from 'lucide-react';
import type { ViewKey } from '@/types';
import { navItems } from '@/data/mockData';
import { Tooltip } from '@/components/ui/Tooltip';

const iconMap: Record<string, typeof LayoutDashboard> = {
  LayoutDashboard,
  Package,
  ClipboardList,
  Users,
  BarChart3,
  Settings,
};

interface SidebarProps {
  active: ViewKey;
  onNavigate: (view: ViewKey) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  isMobile?: boolean;
}

export function Sidebar({ active, onNavigate, collapsed, onToggleCollapse, isMobile = false }: SidebarProps) {
  return (
    <aside
      className={`flex h-screen flex-col border-r border-slate-200 bg-white transition-[width] duration-300 dark:border-slate-800 dark:bg-slate-900 ${
        collapsed ? 'w-[72px]' : 'w-64'
      } ${isMobile ? 'fixed left-0 top-0 z-50' : ''}`}
    >
      {/* Brand Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-4 dark:border-slate-800">
        <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-slate-900 shadow-gold animate-pulse-gold">
          <ShoppingBasket className="h-5 w-5" strokeWidth={2.5} />
        </div>
        {!collapsed && (
          <div className="animate-slide-in min-w-0">
            <p className="text-sm font-bold leading-tight text-slate-900 dark:text-white tracking-tight">
              CeylonCart
              <span className="ml-1 text-brand-500">Studio</span>
            </p>
            <p className="text-[11px] text-slate-400 font-medium">Supermarket Admin</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive = active === item.key;
          const link = (
            <button
              onClick={() => onNavigate(item.key)}
              className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-brand-500/10 text-brand-700 dark:bg-brand-500/15 dark:text-brand-400'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              } ${collapsed ? 'justify-center' : ''}`}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-brand-500" />
              )}
              <Icon
                className={`h-5 w-5 shrink-0 transition-colors ${
                  isActive ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200'
                }`}
              />
              {!collapsed && (
                <span className="animate-slide-in truncate">{item.label}</span>
              )}
            </button>
          );
          return collapsed ? (
            <Tooltip key={item.key} label={item.label}>
              {link}
            </Tooltip>
          ) : (
            <div key={item.key}>{link}</div>
          );
        })}
      </nav>

      {/* Collapse / Close Toggle */}
      <div className="border-t border-slate-200 p-3 dark:border-slate-800">
        <button
          onClick={onToggleCollapse}
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 ${
            collapsed || isMobile ? 'justify-center' : ''
          }`}
          aria-label={isMobile ? 'Close menu' : 'Toggle sidebar'}
        >
          {isMobile ? (
            <X className="h-5 w-5" />
          ) : (
            <ChevronLeft className={`h-5 w-5 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
          )}
          {!collapsed && !isMobile && <span className="animate-slide-in">Collapse</span>}
          {isMobile && <span className="animate-slide-in">Close Menu</span>}
        </button>
      </div>
    </aside>
  );
}

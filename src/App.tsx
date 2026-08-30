import { useState, useEffect } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopHeader } from '@/components/layout/TopHeader';
import { MetricCards } from '@/components/dashboard/MetricCards';
import { Charts } from '@/components/dashboard/Charts';
import { InventoryTable } from '@/components/dashboard/ContentTable';
import { OrdersTable } from '@/components/dashboard/MediaLibrary';
import { CustomersView } from '@/components/dashboard/UsersView';
import { SettingsView } from '@/components/dashboard/SettingsView';
import type { ViewKey } from '@/types';

const viewMeta: Record<ViewKey, { title: string; subtitle: string }> = {
  overview:  { title: 'Store Overview',         subtitle: 'CeylonCart Studio — Colombo Branch daily snapshot' },
  inventory: { title: 'Inventory & Stock',      subtitle: 'Manage product SKUs, stock levels and pricing' },
  orders:    { title: 'Orders & Delivery',      subtitle: 'Track live orders, delivery drivers and statuses' },
  customers: { title: 'Customer Management',    subtitle: 'Registered customers, tiers and order history' },
  analytics: { title: 'Sales Analytics',        subtitle: 'Revenue trends and category performance insights' },
  settings:  { title: 'Settings',               subtitle: 'Store preferences, notifications and security' },
};

function App() {
  const [view, setView]           = useState<ViewKey>('overview');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const meta = viewMeta[view];

  const handleNavigate = (key: ViewKey) => {
    setView(key);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <ThemeProvider>
      <div className="flex h-screen overflow-hidden bg-[#FAFAF7] dark:bg-slate-950">
        {/* Sidebar — desktop */}
        <div className="hidden lg:block">
          <Sidebar
            active={view}
            onNavigate={setView}
            collapsed={collapsed}
            onToggleCollapse={() => setCollapsed((c) => !c)}
          />
        </div>

        {/* Mobile sidebar drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative h-full w-64 animate-drawer-in">
              <Sidebar
                active={view}
                onNavigate={handleNavigate}
                collapsed={false}
                onToggleCollapse={() => setMobileMenuOpen(false)}
                isMobile={true}
              />
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <TopHeader
            onToggleSidebar={() => setMobileMenuOpen((o) => !o)}
            title={meta.title}
            subtitle={meta.subtitle}
          />

          <main className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="mx-auto max-w-7xl space-y-6 animate-fade-in" key={view}>

              {/* Overview — full dashboard */}
              {view === 'overview' && (
                <>
                  <MetricCards />
                  <Charts />
                  <InventoryTable />
                </>
              )}

              {/* Inventory management */}
              {view === 'inventory' && <InventoryTable />}

              {/* Orders & delivery */}
              {view === 'orders' && <OrdersTable />}

              {/* Customers */}
              {view === 'customers' && <CustomersView />}

              {/* Analytics — charts + metrics */}
              {view === 'analytics' && (
                <>
                  <MetricCards />
                  <Charts />
                </>
              )}

              {/* Settings */}
              {view === 'settings' && <SettingsView />}
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;

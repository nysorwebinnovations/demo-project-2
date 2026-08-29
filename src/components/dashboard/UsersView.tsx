import { UserPlus, MoreHorizontal, Mail, ShoppingCart, Ban } from 'lucide-react';
import { customers } from '@/data/mockData';
import type { CustomerRow, CustomerTier, CustomerStatus } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Dropdown, MenuItem, MenuSeparator } from '@/components/ui/Dropdown';

const tierVariant: Record<CustomerTier, 'brand' | 'success' | 'neutral'> = {
  Premium: 'brand',
  Regular: 'success',
  New:     'neutral',
};

const statusVariant: Record<CustomerStatus, 'success' | 'warning' | 'error'> = {
  Active:   'success',
  Inactive: 'warning',
  Blocked:  'error',
};

// Warm gradient avatars for Sri Lankan customers
const avatarGradients = [
  'from-brand-400 to-brand-600',
  'from-earth-400 to-earth-600',
  'from-success-400 to-success-600',
  'from-sky-400 to-sky-600',
  'from-warning-400 to-warning-600',
  'from-error-400 to-error-500',
  'from-violet-400 to-violet-600',
  'from-teal-400 to-teal-600',
];

export function CustomersView() {
  return (
    <div className="card overflow-hidden">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-slate-200 p-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Customers</h3>
          <p className="mt-0.5 text-xs text-slate-400">
            {customers.length} registered customers ·{' '}
            {customers.filter((c) => c.tier === 'Premium').length} Premium members
          </p>
        </div>
        <button className="btn-primary self-start sm:self-auto">
          <UserPlus className="h-4 w-4" /> Add Customer
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400">
              <th className="px-5 py-3 font-semibold">Customer</th>
              <th className="px-5 py-3 font-semibold">Phone</th>
              <th className="px-5 py-3 font-semibold">Location</th>
              <th className="px-5 py-3 font-semibold">Orders</th>
              <th className="px-5 py-3 font-semibold">Total Spend (LKR)</th>
              <th className="px-5 py-3 font-semibold">Tier</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {customers.map((customer: CustomerRow, idx: number) => (
              <tr
                key={customer.id}
                className="transition hover:bg-amber-50/40 dark:hover:bg-slate-800/40"
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${
                        avatarGradients[idx % avatarGradients.length]
                      } text-xs font-bold text-white`}
                    >
                      {customer.avatar}
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-800 dark:text-slate-100">
                        {customer.name}
                      </p>
                      <p className="text-xs text-slate-400">{customer.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-slate-600 dark:text-slate-300 text-sm font-medium">
                  {customer.phone}
                </td>
                <td className="px-5 py-3.5 text-slate-600 dark:text-slate-300">
                  📍 {customer.location}
                </td>
                <td className="px-5 py-3.5">
                  <span className="font-bold text-slate-900 dark:text-white">{customer.totalOrders}</span>
                  <span className="text-xs text-slate-400 ml-1">orders</span>
                </td>
                <td className="px-5 py-3.5 font-bold text-slate-900 dark:text-white">
                  Rs. {customer.totalSpend.toLocaleString()}
                </td>
                <td className="px-5 py-3.5">
                  <Badge variant={tierVariant[customer.tier]}>{customer.tier}</Badge>
                </td>
                <td className="px-5 py-3.5">
                  <Badge variant={statusVariant[customer.status]} dot>
                    {customer.status}
                  </Badge>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <Dropdown
                    align="right"
                    trigger={({ toggle }) => (
                      <button
                        onClick={toggle}
                        className="btn-ghost h-8 w-8 p-0"
                        aria-label="Customer actions"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    )}
                  >
                    {() => (
                      <div className="w-48">
                        <MenuItem icon={<ShoppingCart className="h-4 w-4" />} label="View Orders" />
                        <MenuItem icon={<Mail className="h-4 w-4" />} label="Send Message" />
                        <MenuSeparator />
                        <MenuItem icon={<Ban className="h-4 w-4" />} label="Block Customer" danger />
                      </div>
                    )}
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

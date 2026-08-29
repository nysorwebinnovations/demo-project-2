import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { orders as allOrders } from '@/data/mockData';
import type { Order, OrderStatus } from '@/types';
import { Badge } from '@/components/ui/Badge';

type FilterStatus = 'All' | OrderStatus;

const statusFilters: FilterStatus[] = ['All', 'Pending', 'Packing', 'Out for Delivery', 'Delivered'];

const statusVariant: Record<OrderStatus, 'neutral' | 'warning' | 'info' | 'success'> = {
  Pending:            'neutral',
  Packing:            'warning',
  'Out for Delivery': 'info',
  Delivered:          'success',
};

const paymentStyle: Record<string, string> = {
  'Cash on Delivery': 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
  'LANKAQR':          'bg-brand-100 text-brand-700 dark:bg-brand-950/40 dark:text-brand-400',
  'Card':             'bg-sky-100 text-sky-700 dark:bg-sky-950/40 dark:text-sky-400',
};

const pageSize = 8;

export function OrdersTable() {
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('All');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return allOrders.filter((o) =>
      statusFilter === 'All' ? true : o.status === statusFilter
    );
  }, [statusFilter]);

  const totalPages  = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageItems   = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="card overflow-hidden">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-slate-200 p-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Orders & Delivery Status
          </h3>
          <p className="mt-0.5 text-xs text-slate-400">
            {allOrders.length} total orders today ·{' '}
            {allOrders.filter((o) => o.status === 'Out for Delivery').length} out for delivery
          </p>
        </div>
        {/* Status filter tabs */}
        <div className="flex flex-wrap gap-1">
          {statusFilters.map((s) => (
            <button
              key={s}
              onClick={() => { setStatusFilter(s); setPage(1); }}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                statusFilter === s
                  ? 'bg-brand-500 text-slate-900 shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400">
              <th className="px-5 py-3 font-semibold">Order ID</th>
              <th className="px-5 py-3 font-semibold">Customer</th>
              <th className="px-5 py-3 font-semibold">Location</th>
              <th className="px-5 py-3 font-semibold">Items</th>
              <th className="px-5 py-3 font-semibold">Total (LKR)</th>
              <th className="px-5 py-3 font-semibold">Payment</th>
              <th className="px-5 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {pageItems.map((order: Order) => (
              <tr
                key={order.id}
                className="group transition hover:bg-amber-50/40 dark:hover:bg-slate-800/40"
              >
                <td className="px-5 py-3.5">
                  <span className="font-mono text-sm font-bold text-brand-600 dark:text-brand-400">
                    {order.id}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <p className="font-semibold text-slate-800 dark:text-slate-100">{order.customer}</p>
                  <p className="text-xs text-slate-400">{order.date}</p>
                </td>
                <td className="px-5 py-3.5 text-slate-600 dark:text-slate-300">
                  📍 {order.location}
                </td>
                <td className="px-5 py-3.5 max-w-[160px]">
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                    {order.itemsSummary}
                  </p>
                </td>
                <td className="px-5 py-3.5 font-bold text-slate-900 dark:text-white">
                  Rs. {order.total.toLocaleString()}
                </td>
                <td className="px-5 py-3.5">
                  <span
                    className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${paymentStyle[order.payment] ?? paymentStyle['Cash on Delivery']}`}
                  >
                    {order.payment}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <Badge variant={statusVariant[order.status]} dot>
                    {order.status}
                  </Badge>
                </td>
              </tr>
            ))}
            {pageItems.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-12 text-center text-slate-400">
                  No orders match the selected status.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-200 p-4 dark:border-slate-800 sm:flex-row">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Showing{' '}
          <span className="font-semibold text-slate-700 dark:text-slate-200">{pageItems.length}</span>{' '}
          of{' '}
          <span className="font-semibold text-slate-700 dark:text-slate-200">{filtered.length}</span>{' '}
          orders
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="btn-outline h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`h-8 w-8 rounded-xl text-sm font-bold transition ${
                currentPage === i + 1
                  ? 'bg-brand-500 text-slate-900'
                  : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="btn-outline h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

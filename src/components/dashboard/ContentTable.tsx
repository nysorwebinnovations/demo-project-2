import { useMemo, useState } from 'react';
import { Search, Pencil, RefreshCw, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { products as allProducts } from '@/data/mockData';
import type { Product, ProductCategory, StockStatus } from '@/types';
import { Badge } from '@/components/ui/Badge';

type FilterCategory = 'All' | ProductCategory;

const categoryFilters: FilterCategory[] = [
  'All',
  'Fresh Produce',
  'Dairy & Bakery',
  'Grains & Rice',
  'Beverages',
  'Spices & Condiments',
  'Frozen & Chilled',
];

const pageSize = 7;

const statusVariant: Record<StockStatus, 'success' | 'warning' | 'error'> = {
  'In Stock':     'success',
  'Low Stock':    'warning',
  'Out of Stock': 'error',
};

function StockBar({ qty, max, status }: { qty: number; max: number; status: StockStatus }) {
  const pct = Math.round((qty / max) * 100);
  const barColor =
    status === 'In Stock'
      ? 'bg-success-500'
      : status === 'Low Stock'
      ? 'bg-warning-500'
      : 'bg-error-400';
  return (
    <div className="flex items-center gap-2 min-w-[100px]">
      <div className="stock-bar flex-1">
        <div
          className={`h-full rounded-full transition-all ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-8 text-right text-xs text-slate-500 dark:text-slate-400">{qty}</span>
    </div>
  );
}

export function InventoryTable() {
  const [query, setQuery]       = useState('');
  const [category, setCategory] = useState<FilterCategory>('All');
  const [page, setPage]         = useState(1);

  const filtered = useMemo(() => {
    return allProducts.filter((p) => {
      const matchesQuery =
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.sku.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === 'All' || p.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  const totalPages  = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageItems   = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="card overflow-hidden">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-slate-200 p-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Inventory & Stock Manager
          </h3>
          <p className="mt-0.5 text-xs text-slate-400">
            {allProducts.length} products · {allProducts.filter((p) => p.status === 'Low Stock').length} low stock ·{' '}
            {allProducts.filter((p) => p.status === 'Out of Stock').length} out of stock
          </p>
        </div>
        <button className="btn-primary self-start sm:self-auto">
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 border-b border-slate-200 p-4 dark:border-slate-800 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            placeholder="Search by name or SKU…"
            className="input pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-1">
          {categoryFilters.map((cat) => (
            <button
              key={cat}
              onClick={() => { setCategory(cat); setPage(1); }}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                category === cat
                  ? 'bg-brand-500 text-slate-900 shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400">
              <th className="px-5 py-3 font-semibold">SKU</th>
              <th className="px-5 py-3 font-semibold">Product Name</th>
              <th className="px-5 py-3 font-semibold">Category</th>
              <th className="px-5 py-3 font-semibold">Stock Level</th>
              <th className="px-5 py-3 font-semibold">Price (LKR)</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {pageItems.map((product: Product) => (
              <tr
                key={product.id}
                className="group transition hover:bg-amber-50/40 dark:hover:bg-slate-800/40"
              >
                <td className="px-5 py-3.5">
                  <span className="rounded-lg bg-slate-100 px-2 py-0.5 text-xs font-mono font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {product.sku}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <p className="font-semibold text-slate-800 dark:text-slate-100">{product.name}</p>
                </td>
                <td className="px-5 py-3.5">
                  <span className="rounded-lg bg-earth-50 px-2.5 py-1 text-xs font-medium text-earth-700 dark:bg-earth-950/30 dark:text-earth-400">
                    {product.category}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <StockBar qty={product.stockQty} max={product.maxStock} status={product.status} />
                </td>
                <td className="px-5 py-3.5 font-semibold text-slate-700 dark:text-slate-200">
                  Rs. {product.price.toLocaleString()}
                </td>
                <td className="px-5 py-3.5">
                  <Badge variant={statusVariant[product.status]} dot>
                    {product.status}
                  </Badge>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      className="btn-ghost h-8 w-8 p-0 text-slate-500"
                      title="Edit product"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      className="btn-ghost h-8 w-8 p-0 text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950/30"
                      title="Quick restock"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {pageItems.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-12 text-center text-slate-400">
                  No products match your filters.
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
          products
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="btn-outline h-8 w-8 p-0"
            aria-label="Previous page"
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
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

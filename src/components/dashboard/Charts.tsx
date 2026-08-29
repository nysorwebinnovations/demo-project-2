import { useState } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { TrendingUp, BarChart3 } from 'lucide-react';
import { dailyOrdersData, categoryData } from '@/data/mockData';
import { useTheme } from '@/context/ThemeContext';

const ranges = ['7D', '14D'] as const;
type Range = (typeof ranges)[number];

const GOLD   = '#FBB917';
const GREEN  = '#1bb354';
const CATEGORY_COLORS = ['#FBB917', '#e6a800', '#DEB887', '#d4a06a', '#c08850', '#a06f3d'];

function formatLKR(value: number) {
  if (value >= 1000) return `Rs.${(value / 1000).toFixed(0)}k`;
  return `Rs.${value}`;
}

export function Charts() {
  const { theme } = useTheme();
  const [range, setRange] = useState<Range>('7D');

  const slice = range === '7D' ? dailyOrdersData.slice(-7) : dailyOrdersData;
  const axisColor  = theme === 'dark' ? '#64748b' : '#94a3b8';
  const gridColor  = theme === 'dark' ? '#1e293b' : '#eef2f7';

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
      {/* ── Daily Orders Trend ── */}
      <div className="card p-5 xl:col-span-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-brand-500" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Daily Orders Trend
              </h3>
            </div>
            <p className="mt-0.5 text-xs text-slate-400">Revenue & order volume by day</p>
          </div>
          <div className="flex rounded-xl border border-slate-200 p-0.5 dark:border-slate-800">
            {ranges.map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`rounded-lg px-3 py-1 text-xs font-bold transition ${
                  range === r
                    ? 'bg-brand-500 text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-4 text-xs">
          <Legend color={GOLD}  label="Revenue (LKR)" />
          <Legend color={GREEN} label="Orders Count" />
        </div>

        <div className="mt-2 h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={slice} margin={{ top: 10, right: 8, left: -8, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor={GOLD}  stopOpacity={0.4} />
                  <stop offset="100%" stopColor={GOLD}  stopOpacity={0}   />
                </linearGradient>
                <linearGradient id="ordersGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor={GREEN} stopOpacity={0.25} />
                  <stop offset="100%" stopColor={GREEN} stopOpacity={0}    />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 12, fill: axisColor, fontFamily: 'Outfit' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: axisColor, fontFamily: 'Outfit' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={formatLKR}
                width={62}
              />
              <Tooltip content={<ChartTooltip theme={theme} type="revenue" />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke={GOLD}
                strokeWidth={2.5}
                fill="url(#revenueGrad)"
                dot={false}
                activeDot={{ r: 5, fill: GOLD, strokeWidth: 2, stroke: '#fff' }}
              />
              <Area
                type="monotone"
                dataKey="orders"
                stroke={GREEN}
                strokeWidth={2}
                fill="url(#ordersGrad)"
                dot={false}
                activeDot={{ r: 4, fill: GREEN, strokeWidth: 2, stroke: '#fff' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Top Selling Categories ── */}
      <div className="card p-5 xl:col-span-2">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-brand-500" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Top Categories
          </h3>
        </div>
        <p className="mt-0.5 text-xs text-slate-400">Highest selling product categories</p>

        <div className="mt-4 h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={categoryData}
              layout="vertical"
              margin={{ top: 4, right: 16, left: 8, bottom: 4 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} horizontal={false} />
              <XAxis
                type="number"
                tick={{ fontSize: 11, fill: axisColor, fontFamily: 'Outfit' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={formatLKR}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 11, fill: axisColor, fontFamily: 'Outfit' }}
                axisLine={false}
                tickLine={false}
                width={118}
              />
              <Tooltip
                content={<ChartTooltip theme={theme} type="category" />}
                cursor={{ fill: theme === 'dark' ? '#1e293b66' : '#fdf8f2' }}
              />
              <Bar dataKey="sales" radius={[0, 8, 8, 0]} barSize={20}>
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={CATEGORY_COLORS[i % CATEGORY_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
  theme: string;
  type: 'revenue' | 'category';
}

function ChartTooltip({ active, payload, label, theme, type }: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div
      className={`rounded-xl border px-3 py-2 text-xs shadow-lg ${
        theme === 'dark' ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'
      }`}
    >
      {label && (
        <p className="mb-1.5 font-bold text-slate-700 dark:text-slate-200">{label}</p>
      )}
      {payload.map((p) => (
        <p key={p.name} className="flex items-center gap-2 text-slate-600 dark:text-slate-300 capitalize">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: p.color }} />
          {p.name === 'revenue' || type === 'category'
            ? `Rs. ${p.value.toLocaleString()}`
            : `${p.value} orders`}
        </p>
      ))}
    </div>
  );
}

import {
  ShoppingBag,
  ClipboardList,
  Truck,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from 'lucide-react';
import type { MetricCard as MetricCardType } from '@/types';
import { metrics } from '@/data/mockData';
import { useTheme } from '@/context/ThemeContext';

const iconMap = {
  sales:   ShoppingBag,
  orders:  ClipboardList,
  drivers: Truck,
  stock:   AlertTriangle,
};

const accentMap: Record<MetricCardType['icon'], { gradient: string; ring: string }> = {
  sales:   { gradient: 'from-brand-400 to-brand-600',   ring: 'ring-brand-200 dark:ring-brand-800' },
  orders:  { gradient: 'from-success-400 to-success-600', ring: 'ring-success-200 dark:ring-success-800' },
  drivers: { gradient: 'from-sky-400 to-sky-600',        ring: 'ring-sky-200 dark:ring-sky-800' },
  stock:   { gradient: 'from-error-400 to-error-600',    ring: 'ring-error-200 dark:ring-error-800' },
};

const sparkColor: Record<MetricCardType['icon'], { stroke: string; fill: string }> = {
  sales:   { stroke: '#FBB917', fill: 'rgba(251,185,23,0.15)' },
  orders:  { stroke: '#1bb354', fill: 'rgba(27,179,84,0.12)'  },
  drivers: { stroke: '#0ea5e9', fill: 'rgba(14,165,233,0.12)' },
  stock:   { stroke: '#e64a4a', fill: 'rgba(230,74,74,0.12)'  },
};

export function MetricCards() {
  const { theme } = useTheme();
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((m) => (
        <MetricCard key={m.id} metric={m} theme={theme} />
      ))}
    </div>
  );
}

function MetricCard({ metric, theme }: { metric: MetricCardType; theme: string }) {
  const Icon = iconMap[metric.icon];
  const accent = accentMap[metric.icon];
  const positive = metric.change > 0;
  const neutral  = metric.change === 0;

  return (
    <div className="card group p-5 transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5">
      <div className="flex items-start justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${accent.gradient} text-white shadow-sm ring-4 ${accent.ring}`}
        >
          <Icon className="h-5 w-5" />
        </div>
        {neutral ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            <Minus className="h-3 w-3" />
            Stable
          </span>
        ) : (
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
              positive
                ? 'bg-success-100 text-success-700 dark:bg-success-950/60 dark:text-success-300'
                : 'bg-error-100 text-error-700 dark:bg-error-950/60 dark:text-error-300'
            }`}
          >
            {positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
            {Math.abs(metric.change)}%
          </span>
        )}
      </div>

      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
          {metric.label}
        </p>
        <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {metric.value}
        </p>
        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{metric.subtext}</p>
      </div>

      <Sparkline data={metric.spark} theme={theme} icon={metric.icon} />
    </div>
  );
}

function Sparkline({
  data,
  theme,
  icon,
}: {
  data: number[];
  theme: string;
  icon: MetricCardType['icon'];
}) {
  const { stroke, fill } = sparkColor[icon];
  const w = 120;
  const h = 36;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h * 0.85);
    return `${x},${y}`;
  });
  const gridColor = theme === 'dark' ? '#1e293b' : '#f1f5f9';

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mt-4 h-9 w-full" preserveAspectRatio="none">
      <line x1="0" y1={h} x2={w} y2={h} stroke={gridColor} strokeWidth="1" />
      <polyline
        points={points.join(' ')}
        fill="none"
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polygon points={`0,${h} ${points.join(' ')} ${w},${h}`} fill={fill} />
    </svg>
  );
}

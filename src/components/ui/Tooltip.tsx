import type { ReactNode } from 'react';

interface TooltipProps {
  label: string;
  children: ReactNode;
  side?: 'right' | 'top' | 'bottom';
}

export function Tooltip({ label, children, side = 'right' }: TooltipProps) {
  const positionClasses =
    side === 'right'
      ? 'left-full top-1/2 ml-2 -translate-y-1/2'
      : side === 'top'
      ? 'bottom-full left-1/2 mb-2 -translate-x-1/2'
      : 'top-full left-1/2 mt-2 -translate-x-1/2';

  return (
    <span className="group/tip relative inline-flex">
      {children}
      <span
        role="tooltip"
        className={`pointer-events-none absolute z-50 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover/tip:opacity-100 dark:bg-slate-700 ${positionClasses}`}
      >
        {label}
      </span>
    </span>
  );
}

import type { ReactNode } from 'react';

type Variant = 'success' | 'warning' | 'info' | 'error' | 'neutral' | 'brand';

const variants: Record<Variant, string> = {
  success: 'bg-success-100 text-success-700 dark:bg-success-950/60 dark:text-success-300',
  warning: 'bg-warning-100 text-warning-700 dark:bg-warning-950/60 dark:text-warning-300',
  info: 'bg-brand-100 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300',
  error: 'bg-error-100 text-error-700 dark:bg-error-950/60 dark:text-error-300',
  neutral: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
  brand: 'bg-brand-600 text-white',
};

interface BadgeProps {
  variant?: Variant;
  children: ReactNode;
  dot?: boolean;
  className?: string;
}

export function Badge({ variant = 'neutral', children, dot, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${variants[variant]} ${className}`}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

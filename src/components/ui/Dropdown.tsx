import { useEffect, useRef, useState, type ReactNode } from 'react';

interface DropdownProps {
  trigger: (props: { open: boolean; toggle: () => void }) => ReactNode;
  children: (props: { close: () => void }) => ReactNode;
  align?: 'left' | 'right';
  className?: string;
}

export function Dropdown({ trigger, children, align = 'right', className = '' }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    if (open) {
      document.addEventListener('mousedown', onClick);
      document.addEventListener('keydown', onKey);
    }
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className={`relative ${className}`} ref={ref}>
      {trigger({ open, toggle: () => setOpen((o) => !o) })}
      {open && (
        <div
          className={`absolute z-50 mt-2 min-w-[14rem] origin-top rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg animate-scale-in dark:border-slate-800 dark:bg-slate-900 ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          {children({ close: () => setOpen(false) })}
        </div>
      )}
    </div>
  );
}

interface MenuItemProps {
  icon?: ReactNode;
  label: string;
  onClick?: () => void;
  danger?: boolean;
}

export function MenuItem({ icon, label, onClick, danger }: MenuItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
        danger
          ? 'text-error-600 hover:bg-error-50 dark:text-error-400 dark:hover:bg-error-950/40'
          : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
      }`}
    >
      {icon && <span className="flex h-4 w-4 items-center justify-center">{icon}</span>}
      {label}
    </button>
  );
}

export function MenuSeparator() {
  return <div className="my-1 h-px bg-slate-200 dark:bg-slate-800" />;
}

export function MenuLabel({ children }: { children: ReactNode }) {
  return <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">{children}</div>;
}

import type { ButtonHTMLAttributes, ReactNode } from 'react';

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`bg-panel border border-line rounded-xl ${className}`}>{children}</div>;
}

type Variant = 'primary' | 'ghost' | 'gold' | 'danger' | 'soft';
const VARIANTS: Record<Variant, string> = {
  primary: 'bg-up text-navy hover:bg-up/90 font-semibold',
  gold: 'bg-gold text-navy hover:bg-gold/90 font-semibold',
  danger: 'bg-down/15 text-down border border-down/40 hover:bg-down/25',
  ghost: 'border border-line text-ink hover:bg-panel2',
  soft: 'bg-panel2 text-ink hover:bg-line/60',
};

export function Btn({
  variant = 'ghost',
  className = '',
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      type="button"
      {...rest}
      className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition disabled:opacity-40 disabled:pointer-events-none ${VARIANTS[variant]} ${className}`}
    />
  );
}

export function Tabs<T extends string>({
  tabs,
  value,
  onChange,
}: {
  tabs: { id: T; label: ReactNode; done?: boolean }[];
  value: T;
  onChange: (id: T) => void;
}) {
  return (
    <div className="flex gap-1 overflow-x-auto border-b border-line" role="tablist">
      {tabs.map((t) => (
        <button
          key={t.id}
          role="tab"
          aria-selected={value === t.id}
          onClick={() => onChange(t.id)}
          className={`whitespace-nowrap px-3 sm:px-4 py-2.5 text-sm border-b-2 -mb-px transition ${
            value === t.id ? 'border-gold text-ink font-semibold' : 'border-transparent text-muted hover:text-ink'
          }`}
        >
          {t.label}
          {t.done && <span className="ml-1.5 text-up">✓</span>}
        </button>
      ))}
    </div>
  );
}

export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  fmt = (v) => String(v),
}: {
  label: ReactNode;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  fmt?: (v: number) => string;
}) {
  return (
    <label className="block">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-muted">{label}</span>
        <span className="num text-ink font-semibold">{fmt(value)}</span>
      </div>
      <input
        type="range"
        className="w-full"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}

export function Stat({
  label,
  value,
  sub,
  tone,
}: {
  label: ReactNode;
  value: ReactNode;
  sub?: ReactNode;
  tone?: 'up' | 'down' | 'gold';
}) {
  const color = tone === 'up' ? 'text-up' : tone === 'down' ? 'text-down' : tone === 'gold' ? 'text-gold' : 'text-ink';
  return (
    <div className="bg-panel2/60 border border-line rounded-lg px-3 py-2 min-w-0">
      <div className="text-[11px] uppercase tracking-wide text-muted truncate">{label}</div>
      <div className={`num text-lg font-semibold ${color}`}>{value}</div>
      {sub && <div className="text-[11px] text-muted">{sub}</div>}
    </div>
  );
}

export function Tag({ children, tone }: { children: ReactNode; tone?: 'up' | 'down' | 'gold' }) {
  const c =
    tone === 'up'
      ? 'bg-up/15 text-up'
      : tone === 'down'
        ? 'bg-down/15 text-down'
        : tone === 'gold'
          ? 'bg-gold/15 text-gold'
          : 'bg-panel2 text-muted';
  return <span className={`inline-block rounded px-1.5 py-0.5 text-[11px] font-medium ${c}`}>{children}</span>;
}

export function PageHeader({
  kicker,
  title,
  sub,
  right,
}: {
  kicker?: ReactNode;
  title: ReactNode;
  sub?: ReactNode;
  right?: ReactNode;
}) {
  return (
    <header className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-line pb-4">
      <div className="min-w-0">
        {kicker && <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold mb-1">{kicker}</div>}
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold leading-tight">{title}</h1>
        {sub && <p className="text-muted mt-1.5 max-w-3xl text-sm sm:text-[15px]">{sub}</p>}
      </div>
      {right}
    </header>
  );
}

export function ProgressBar({ value, className = '' }: { value: number; className?: string }) {
  return (
    <div className={`h-1.5 rounded-full bg-panel2 overflow-hidden ${className}`}>
      <div className="h-full bg-up transition-all" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}

export const inputCls =
  'w-full rounded-lg border border-line bg-bg px-3 py-2 text-sm text-ink placeholder:text-muted/70 focus:outline-none focus:border-gold';

/** Shared look for Recharts so every chart reads as one system. */
export const chartTheme = {
  axis: { stroke: 'rgb(var(--muted))', fontSize: 11 },
  grid: 'rgb(var(--line))',
  tooltip: {
    contentStyle: {
      background: 'rgb(var(--panel))',
      border: '1px solid rgb(var(--line))',
      borderRadius: 8,
      fontSize: 12,
      color: 'rgb(var(--ink))',
    },
    labelStyle: { color: 'rgb(var(--muted))' },
    itemStyle: { color: 'rgb(var(--ink))' },
  },
  palette: ['#10B981', '#F59E0B', '#38BDF8', '#EF4444', '#A78BFA', '#F472B6'],
};

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { chartTheme } from './ui';

/** Chart description emitted by the Python helper chart(). */
export interface ChartSpec {
  kind: 'line' | 'scatter' | 'bar';
  title: string;
  xlabel: string;
  ylabel: string;
  x: (number | string | null)[];
  series: { name: string; values: (number | null)[] }[];
  labels: string[] | null;
  fit?: { slope: number; intercept: number };
}

export function PyChart({ spec }: { spec: ChartSpec }) {
  const { axis, grid, tooltip, palette } = chartTheme;
  const rows = spec.x.map((x, i) => {
    const row: Record<string, number | string | null> = { x };
    spec.series.forEach((s) => (row[s.name] = s.values[i] ?? null));
    if (spec.labels) row.label = spec.labels[i];
    return row;
  });

  let body;
  if (spec.kind === 'scatter') {
    const s = spec.series[0];
    const pts = rows.filter((r) => typeof r.x === 'number' && typeof r[s.name] === 'number').map((r) => ({ x: r.x as number, y: r[s.name] as number, label: r.label }));
    const xs = pts.map((p) => p.x);
    const lo = Math.min(...xs);
    const hi = Math.max(...xs);
    const fitLine = spec.fit
      ? [
          { x: lo, y: spec.fit.intercept + spec.fit.slope * lo },
          { x: hi, y: spec.fit.intercept + spec.fit.slope * hi },
        ]
      : null;
    body = (
      <ScatterChart margin={{ top: 8, right: 16, bottom: 18, left: 0 }}>
        <CartesianGrid stroke={grid} strokeDasharray="3 3" />
        <XAxis type="number" dataKey="x" name={spec.xlabel || 'x'} domain={['auto', 'auto']} {...axis} label={{ value: spec.xlabel, position: 'insideBottom', offset: -10, fill: axis.stroke, fontSize: 11 }} />
        <YAxis type="number" dataKey="y" name={spec.ylabel || 'y'} domain={['auto', 'auto']} {...axis} width={48} />
        <Tooltip
          {...tooltip}
          cursor={{ strokeDasharray: '3 3' }}
          formatter={(v) => (typeof v === 'number' ? v.toFixed(2) : String(v))}
          labelFormatter={() => ''}
        />
        <Scatter data={pts} fill={palette[0]} isAnimationActive={false} />
        {fitLine && <Scatter data={fitLine} line={{ stroke: palette[1], strokeWidth: 2 }} shape={() => <g />} isAnimationActive={false} legendType="none" />}
      </ScatterChart>
    );
  } else if (spec.kind === 'bar') {
    body = (
      <BarChart data={rows} margin={{ top: 8, right: 16, bottom: 4, left: 0 }}>
        <CartesianGrid stroke={grid} strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="x" {...axis} />
        <YAxis {...axis} width={48} />
        <Tooltip {...tooltip} cursor={{ fill: 'rgb(var(--line) / 0.3)' }} />
        {spec.series.length > 1 && <Legend wrapperStyle={{ fontSize: 12 }} />}
        {spec.series.map((s, i) => (
          <Bar key={s.name} dataKey={s.name} fill={palette[i % palette.length]} isAnimationActive={false} radius={[3, 3, 0, 0]} />
        ))}
      </BarChart>
    );
  } else {
    body = (
      <LineChart data={rows} margin={{ top: 8, right: 16, bottom: 4, left: 0 }}>
        <CartesianGrid stroke={grid} strokeDasharray="3 3" />
        <XAxis dataKey="x" {...axis} />
        <YAxis {...axis} width={48} domain={['auto', 'auto']} />
        <Tooltip {...tooltip} />
        {spec.series.length > 1 && <Legend wrapperStyle={{ fontSize: 12 }} />}
        {spec.series.map((s, i) => (
          <Line key={s.name} type="monotone" dataKey={s.name} stroke={palette[i % palette.length]} strokeWidth={2} dot={rows.length < 40} isAnimationActive={false} connectNulls />
        ))}
      </LineChart>
    );
  }

  return (
    <figure className="my-2 rounded-lg border border-line bg-panel p-2">
      {spec.title && <figcaption className="px-1 pb-1 text-xs font-semibold text-ink">{spec.title}</figcaption>}
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          {body}
        </ResponsiveContainer>
      </div>
      {spec.fit && (
        <div className="num px-1 pt-1 text-[11px] text-gold">
          y = {spec.fit.intercept.toFixed(3)} + {spec.fit.slope.toFixed(3)}·x
        </div>
      )}
    </figure>
  );
}

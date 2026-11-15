import { useMemo, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, Stat, Tabs, chartTheme } from '../components/ui';
import datasets from '../data/macroDatasets.json';
import { useI18n } from '../i18n';

const yc = datasets.yield_curves.columns as Record<string, number[]>;
const us = datasets.us_macro.columns as Record<string, number[]>;

const SNAPSHOTS: { key: string; vi: string; en: string; color: string }[] = [
  { key: 'dec_2006', vi: '12/2006 (đảo ngược trước 2008)', en: 'Dec 2006 (pre-2008 inversion)', color: '#A78BFA' },
  { key: 'dec_2008', vi: '12/2008 (khủng hoảng, Fed về 0)', en: 'Dec 2008 (crisis, Fed at zero)', color: '#38BDF8' },
  { key: 'dec_2013', vi: '12/2013 (rất dốc)', en: 'Dec 2013 (very steep)', color: '#64748B' },
  { key: 'dec_2019', vi: '12/2019 (phẳng)', en: 'Dec 2019 (flat)', color: '#F472B6' },
  { key: 'dec_2021', vi: '12/2021 (trước khi tăng lãi suất)', en: 'Dec 2021 (before hikes)', color: '#10B981' },
  { key: 'dec_2022', vi: '12/2022', en: 'Dec 2022', color: '#F59E0B' },
  { key: 'jul_2023', vi: '7/2023 (đảo ngược sâu nhất)', en: 'Jul 2023 (deepest inversion)', color: '#EF4444' },
  { key: 'dec_2024', vi: '12/2024 (hết đảo ngược)', en: 'Dec 2024 (un-inverted)', color: '#F8FAFC' },
];

const TENOR_LABEL = ['3M', '2Y', '5Y', '10Y', '30Y'];

const SERIES: { key: string; vi: string; en: string; derive?: (i: number) => number | null }[] = [
  { key: 'sp500', vi: 'S&P 500 (lợi suất)', en: 'S&P 500 (return)', derive: (i) => (i === 0 ? null : (us.sp500[i] / us.sp500[i - 1] - 1) * 100) },
  { key: 'gold', vi: 'Vàng (lợi suất)', en: 'Gold (return)', derive: (i) => (i === 0 ? null : (us.gold[i] / us.gold[i - 1] - 1) * 100) },
  { key: 'dxy', vi: 'DXY (thay đổi %)', en: 'DXY (% change)', derive: (i) => (i === 0 ? null : (us.dxy[i] / us.dxy[i - 1] - 1) * 100) },
  { key: 'us10y', vi: 'Δ Lợi suất 10 năm', en: 'Δ 10Y yield', derive: (i) => (i === 0 ? null : us.us10y[i] - us.us10y[i - 1]) },
  { key: 'real', vi: 'Δ Lãi suất thực', en: 'Δ Real rate', derive: (i) => (i === 0 ? null : us.fed_funds[i] - us.cpi_yoy[i] - (us.fed_funds[i - 1] - us.cpi_yoy[i - 1])) },
  { key: 'cpi', vi: 'Lạm phát CPI', en: 'CPI inflation', derive: (i) => us.cpi_yoy[i] },
];

function corr(x: number[], y: number[]) {
  const n = x.length;
  if (n < 3) return NaN;
  const mx = x.reduce((a, b) => a + b, 0) / n;
  const my = y.reduce((a, b) => a + b, 0) / n;
  let sxy = 0;
  let sxx = 0;
  let syy = 0;
  for (let i = 0; i < n; i++) {
    sxy += (x[i] - mx) * (y[i] - my);
    sxx += (x[i] - mx) ** 2;
    syy += (y[i] - my) ** 2;
  }
  return sxy / Math.sqrt(sxx * syy);
}

function cellColor(v: number) {
  if (Number.isNaN(v)) return 'transparent';
  const a = Math.min(1, Math.abs(v)) * 0.75;
  return v >= 0 ? `rgba(16,185,129,${a})` : `rgba(239,68,68,${a})`;
}

export function YieldCurveSim() {
  const { tx, lang } = useI18n();
  const [tab, setTab] = useState<'curve' | 'spread' | 'corr'>('curve');
  const [picked, setPicked] = useState<string[]>(['dec_2021', 'jul_2023', 'dec_2024']);
  const years = us.year;
  const [from, setFrom] = useState(2001);
  const [to, setTo] = useState(2024);

  const curveData = yc.tenor_years.map((_, i) => {
    const row: Record<string, number | string> = { tenor: TENOR_LABEL[i] };
    for (const s of SNAPSHOTS) row[s.key] = yc[s.key][i];
    return row;
  });

  const spreadData = years.map((y, i) => ({
    year: y,
    spread: +(us.us10y[i] - us.us2y[i]).toFixed(2),
    real: +(us.fed_funds[i] - us.cpi_yoy[i]).toFixed(2),
    growth: us.gdp_growth[i],
  }));
  const inverted = spreadData.filter((d) => d.spread < 0).map((d) => d.year);

  const matrix = useMemo(() => {
    const idx = years.map((y, i) => i).filter((i) => years[i] >= from && years[i] <= to);
    const cols = SERIES.map((s) => idx.map((i) => s.derive!(i)));
    return SERIES.map((_, a) =>
      SERIES.map((__, b) => {
        const pairs = idx.map((_, k) => [cols[a][k], cols[b][k]]).filter((p) => p[0] !== null && p[1] !== null) as number[][];
        return corr(
          pairs.map((p) => p[0]),
          pairs.map((p) => p[1]),
        );
      }),
    );
  }, [from, to, years]);

  const { axis, grid, tooltip } = chartTheme;
  const last = SNAPSHOTS.find((s) => s.key === picked[picked.length - 1]);
  const slope = last ? yc[last.key][3] - yc[last.key][1] : 0;

  return (
    <div className="space-y-4">
      <Tabs
        value={tab}
        onChange={setTab}
        tabs={[
          { id: 'curve', label: tx('Đường cong lợi suất', 'Yield curve') },
          { id: 'spread', label: tx('Chênh lệch 10Y−2Y', '10Y−2Y spread') },
          { id: 'corr', label: tx('Ma trận tương quan', 'Correlation matrix') },
        ]}
      />

      {tab === 'curve' && (
        <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
          <Card className="space-y-1.5 p-4">
            <div className="mb-1 text-xs text-muted">{tx('Chọn thời điểm để so sánh:', 'Pick snapshots to compare:')}</div>
            {SNAPSHOTS.map((s) => (
              <label key={s.key} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={picked.includes(s.key)}
                  onChange={(e) => setPicked((p) => (e.target.checked ? [...p, s.key] : p.filter((k) => k !== s.key)))}
                />
                <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                {lang === 'vi' ? s.vi : s.en}
              </label>
            ))}
            {last && (
              <div className="pt-3">
                <Stat
                  label={`10Y − 2Y · ${lang === 'vi' ? last.vi : last.en}`}
                  value={`${slope >= 0 ? '+' : ''}${slope.toFixed(2)}`}
                  tone={slope < 0 ? 'down' : 'up'}
                  sub={slope < 0 ? tx('Đảo ngược: thị trường kỳ vọng lãi suất giảm', 'Inverted: markets expect rate cuts') : tx('Dốc dương bình thường', 'Normal upward slope')}
                />
              </div>
            )}
          </Card>
          <Card className="min-w-0 p-3">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={curveData} margin={{ top: 10, right: 16, bottom: 4, left: 0 }}>
                  <CartesianGrid stroke={grid} strokeDasharray="3 3" />
                  <XAxis dataKey="tenor" {...axis} />
                  <YAxis {...axis} width={40} unit="%" domain={[0, 'auto']} />
                  <Tooltip {...tooltip} formatter={(v) => `${v}%`} />
                  <Legend wrapperStyle={{ fontSize: 11 }} verticalAlign="top" />
                  {SNAPSHOTS.filter((s) => picked.includes(s.key)).map((s) => (
                    <Line key={s.key} dataKey={s.key} name={lang === 'vi' ? s.vi : s.en} stroke={s.color} strokeWidth={2.5} isAnimationActive={false} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="px-2 text-xs text-muted">{tx('Nguồn: US Treasury, số làm tròn.', 'Source: US Treasury, rounded.')}</p>
          </Card>
        </div>
      )}

      {tab === 'spread' && (
        <Card className="p-3">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={spreadData} margin={{ top: 10, right: 16, bottom: 4, left: 0 }}>
                <CartesianGrid stroke={grid} strokeDasharray="3 3" />
                <XAxis dataKey="year" {...axis} />
                <YAxis {...axis} width={40} />
                <Tooltip {...tooltip} />
                <Legend wrapperStyle={{ fontSize: 12 }} verticalAlign="top" />
                <Line dataKey="spread" name={tx('10Y − 2Y (cuối năm)', '10Y − 2Y (year-end)')} stroke="#F59E0B" strokeWidth={2.5} isAnimationActive={false} />
                <Line dataKey="real" name={tx('Lãi suất thực (Fed − CPI)', 'Real rate (Fed − CPI)')} stroke="#38BDF8" strokeWidth={1.5} isAnimationActive={false} />
                <Line dataKey="growth" name={tx('Tăng trưởng GDP thực', 'Real GDP growth')} stroke="#10B981" strokeWidth={1.5} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="px-2 pt-1 text-sm text-muted">
            {tx('Các năm kết thúc với đường cong đảo ngược: ', 'Years ending with an inverted curve: ')}
            <span className="num text-down">{inverted.join(', ') || '—'}</span>.{' '}
            {tx(
              'Số liệu cuối năm làm mượt mất nhiều giai đoạn đảo ngược trong năm (ví dụ 2019, 2023). Hãy so với các năm GDP âm.',
              'Year-end data smooth away many intra-year inversions (e.g. 2019, 2023). Compare with the years of negative GDP.',
            )}
          </p>
        </Card>
      )}

      {tab === 'corr' && (
        <Card className="p-4">
          <div className="mb-3 flex flex-wrap items-center gap-3 text-sm">
            <span className="text-muted">{tx('Giai đoạn:', 'Period:')}</span>
            <select value={from} onChange={(e) => setFrom(Number(e.target.value))} className="rounded border border-line bg-bg px-2 py-1">
              {years.slice(1).map((y) => (
                <option key={y}>{y}</option>
              ))}
            </select>
            <span>→</span>
            <select value={to} onChange={(e) => setTo(Number(e.target.value))} className="rounded border border-line bg-bg px-2 py-1">
              {years.slice(1).map((y) => (
                <option key={y}>{y}</option>
              ))}
            </select>
            {[
              [2001, 2012],
              [2013, 2024],
              [2001, 2024],
            ].map(([a, b]) => (
              <button key={a + '-' + b} onClick={() => { setFrom(a); setTo(b); }} className="rounded-full border border-line px-2 py-0.5 text-xs text-muted hover:text-ink">
                {a}–{b}
              </button>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="num w-full min-w-[560px] border-collapse text-xs">
              <thead>
                <tr>
                  <th />
                  {SERIES.map((s) => (
                    <th key={s.key} className="px-1 py-1 text-left font-medium text-muted">
                      {lang === 'vi' ? s.vi : s.en}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SERIES.map((s, a) => (
                  <tr key={s.key}>
                    <th className="whitespace-nowrap py-1 pr-2 text-left font-medium text-muted">{lang === 'vi' ? s.vi : s.en}</th>
                    {matrix[a].map((v, bIdx) => (
                      <td key={bIdx} className="border border-line px-2 py-2 text-center" style={{ background: cellColor(a === bIdx ? NaN : v) }}>
                        {a === bIdx ? '—' : Number.isNaN(v) ? '·' : v.toFixed(2)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted">
            {tx(
              'Tương quan trên dữ liệu năm (≤ 24 quan sát) nên rất nhiễu. Hãy so hai giai đoạn: tương quan thay đổi chính là dấu hiệu đổi "chế độ" thị trường.',
              'Correlations on annual data (≤ 24 observations) are noisy. Compare two periods: a shifting correlation is the sign of a market regime change.',
            )}
          </p>
        </Card>
      )}
    </div>
  );
}

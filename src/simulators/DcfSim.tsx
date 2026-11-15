import { useMemo, useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Btn, Card, Slider, Stat, chartTheme } from '../components/ui';
import { useI18n } from '../i18n';

interface Inputs {
  revenue: number;
  growth: number;
  years: number;
  margin: number;
  tax: number;
  reinvest: number;
  terminalG: number;
  netDebt: number;
  shares: number;
  rf: number;
  beta: number;
  erp: number;
  kd: number;
  debtWeight: number;
  price: number;
}

const DEFAULTS: Inputs = {
  revenue: 10000,
  growth: 12,
  years: 5,
  margin: 15,
  tax: 20,
  reinvest: 40,
  terminalG: 4,
  netDebt: 3000,
  shares: 500,
  rf: 3,
  beta: 1.1,
  erp: 8,
  kd: 8.5,
  debtWeight: 30,
  price: 40000,
};

function wacc(i: Inputs) {
  const ke = i.rf + i.beta * i.erp;
  const w = i.debtWeight / 100;
  return { ke, wacc: (1 - w) * ke + w * i.kd * (1 - i.tax / 100) };
}

/** Returns per-share value (VND) for given inputs; revenue/netDebt in VND billion, shares in millions. */
function valueDcf(i: Inputs, override?: { wacc?: number; g?: number; growth?: number }) {
  const r = (override?.wacc ?? wacc(i).wacc) / 100;
  const g = (override?.g ?? i.terminalG) / 100;
  const growth = (override?.growth ?? i.growth) / 100;
  let rev = i.revenue;
  let pv = 0;
  let fcf = 0;
  const rows: { year: string; fcf: number; pv: number }[] = [];
  for (let t = 1; t <= i.years; t++) {
    rev *= 1 + growth;
    const nopat = rev * (i.margin / 100) * (1 - i.tax / 100);
    fcf = nopat * (1 - i.reinvest / 100);
    const df = 1 / (1 + r) ** t;
    pv += fcf * df;
    rows.push({ year: `Y${t}`, fcf, pv: fcf * df });
  }
  // terminal: reinvestment consistent with g at a long-run ROIC of max(WACC, 1.5·g) is beyond scope; keep the explicit rate
  const tv = r > g ? (fcf * (1 + g)) / (r - g) : NaN;
  const pvTv = tv / (1 + r) ** i.years;
  const ev = pv + pvTv;
  const equity = ev - i.netDebt;
  const perShare = (equity / i.shares) * 1000; // bn / m shares → thousand VND → ×1000 = VND
  return { rows, pv, tv, pvTv, ev, equity, perShare, tvShare: pvTv / ev };
}

export function DcfSim() {
  const { tx } = useI18n();
  const [i, setI] = useState<Inputs>(DEFAULTS);
  const set = <K extends keyof Inputs>(k: K) => (v: number) => setI((o) => ({ ...o, [k]: v }));
  const { ke, wacc: w } = wacc(i);
  const res = useMemo(() => valueDcf(i), [i]);
  const implied = useMemo(() => {
    // reverse DCF: bisection on explicit growth so per-share value equals market price
    let lo = -20;
    let hi = 80;
    if (valueDcf(i, { growth: hi }).perShare < i.price) return null;
    if (valueDcf(i, { growth: lo }).perShare > i.price) return null;
    for (let k = 0; k < 80; k++) {
      const mid = (lo + hi) / 2;
      if (valueDcf(i, { growth: mid }).perShare < i.price) lo = mid;
      else hi = mid;
    }
    return (lo + hi) / 2;
  }, [i]);
  const impliedRoic = i.reinvest > 0 ? i.growth / (i.reinvest / 100) : Infinity;

  const waccGrid = [w - 2, w - 1, w, w + 1, w + 2];
  const gGrid = [i.terminalG - 2, i.terminalG - 1, i.terminalG, i.terminalG + 1, i.terminalG + 2];
  const fmt = (v: number) => (Number.isFinite(v) ? Math.round(v).toLocaleString('en-US') : '—');
  const { axis, grid, tooltip } = chartTheme;

  return (
    <div className="grid gap-4 xl:grid-cols-[320px_1fr]">
      <Card className="space-y-3.5 p-4">
        <div className="text-xs font-semibold uppercase tracking-widest text-gold">{tx('Hoạt động kinh doanh', 'Operations')}</div>
        <label className="block text-[11px] text-muted">
          {tx('Doanh thu năm gốc (tỷ đồng)', 'Base revenue (VND bn)')}
          <input type="number" value={i.revenue} onChange={(e) => set('revenue')(Number(e.target.value) || 0)} className="num mt-0.5 w-full rounded border border-line bg-bg px-2 py-1 text-sm text-ink" />
        </label>
        <Slider label={tx('Tăng trưởng doanh thu (%/năm)', 'Revenue growth (%/yr)')} value={i.growth} min={-10} max={40} step={0.5} onChange={set('growth')} fmt={(v) => v.toFixed(1)} />
        <Slider label={tx('Số năm dự phóng', 'Forecast years')} value={i.years} min={3} max={10} onChange={set('years')} />
        <Slider label={tx('Biên EBIT (%)', 'EBIT margin (%)')} value={i.margin} min={2} max={40} step={0.5} onChange={set('margin')} fmt={(v) => v.toFixed(1)} />
        <Slider label={tx('Tỷ lệ tái đầu tư (% NOPAT)', 'Reinvestment (% of NOPAT)')} value={i.reinvest} min={0} max={95} onChange={set('reinvest')} />
        <Slider label={tx('Tăng trưởng dài hạn g (%)', 'Terminal growth g (%)')} value={i.terminalG} min={0} max={8} step={0.25} onChange={set('terminalG')} fmt={(v) => v.toFixed(2)} />
        <div className="pt-1 text-xs font-semibold uppercase tracking-widest text-gold">WACC</div>
        <Slider label={tx('Lãi suất phi rủi ro (%)', 'Risk-free rate (%)')} value={i.rf} min={0} max={10} step={0.25} onChange={set('rf')} fmt={(v) => v.toFixed(2)} />
        <Slider label="Beta" value={i.beta} min={0.3} max={2.5} step={0.05} onChange={set('beta')} fmt={(v) => v.toFixed(2)} />
        <Slider label={tx('Phần bù rủi ro (%)', 'Equity risk premium (%)')} value={i.erp} min={3} max={12} step={0.25} onChange={set('erp')} fmt={(v) => v.toFixed(2)} />
        <Slider label={tx('Chi phí nợ trước thuế (%)', 'Pre-tax cost of debt (%)')} value={i.kd} min={2} max={16} step={0.25} onChange={set('kd')} fmt={(v) => v.toFixed(2)} />
        <Slider label={tx('Tỷ trọng nợ (%)', 'Debt weight (%)')} value={i.debtWeight} min={0} max={80} onChange={set('debtWeight')} />
        <div className="pt-1 text-xs font-semibold uppercase tracking-widest text-gold">{tx('Cầu nối vốn chủ', 'Equity bridge')}</div>
        <div className="grid grid-cols-2 gap-2">
          {(
            [
              ['netDebt', tx('Nợ ròng (tỷ)', 'Net debt (bn)')],
              ['shares', tx('Số CP (triệu)', 'Shares (m)')],
              ['price', tx('Giá TT (đồng)', 'Market price')],
            ] as [keyof Inputs, string][]
          ).map(([k, label]) => (
            <label key={k} className="text-[11px] text-muted">
              {label}
              <input type="number" value={i[k]} onChange={(e) => set(k)(Number(e.target.value) || 0)} className="num mt-0.5 w-full rounded border border-line bg-bg px-2 py-1 text-sm text-ink" />
            </label>
          ))}
        </div>
        <Btn className="w-full" onClick={() => setI(DEFAULTS)}>
          ↺ {tx('Đặt lại', 'Reset')}
        </Btn>
      </Card>

      <div className="min-w-0 space-y-4">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Stat label={tx('Giá trị nội tại / CP', 'Intrinsic value / share')} value={fmt(res.perShare)} tone="gold" sub={`${tx('so với giá', 'vs price')} ${res.perShare > 0 ? (((res.perShare / i.price) - 1) * 100).toFixed(0) : '—'}%`} />
          <Stat label="WACC" value={`${w.toFixed(2)}%`} sub={`ke ${ke.toFixed(2)}%`} />
          <Stat label={tx('Tỷ trọng giá trị cuối kỳ', 'Terminal value share')} value={`${(res.tvShare * 100).toFixed(0)}%`} tone={res.tvShare > 0.75 ? 'down' : undefined} sub={res.tvShare > 0.75 ? tx('cao: giả định g chi phối', 'high: g dominates') : ''} />
          <Stat
            label={tx('ROIC ngầm định', 'Implied ROIC')}
            value={Number.isFinite(impliedRoic) ? `${impliedRoic.toFixed(0)}%` : '∞'}
            tone={impliedRoic > 40 ? 'down' : undefined}
            sub={tx('= tăng trưởng / tái đầu tư', '= growth / reinvestment')}
          />
          <Stat label={tx('Giá trị doanh nghiệp (EV)', 'Enterprise value')} value={fmt(res.ev)} sub={tx('tỷ đồng', 'VND bn')} />
          <Stat label={tx('PV dòng tiền dự phóng', 'PV of forecast FCF')} value={fmt(res.pv)} />
          <Stat label={tx('PV giá trị cuối kỳ', 'PV of terminal value')} value={fmt(res.pvTv)} />
          <Stat
            label={tx('DCF ngược: tăng trưởng giá đang ngầm định', 'Reverse DCF: growth priced in')}
            value={implied === null ? '—' : `${implied.toFixed(1)}%/${tx('năm', 'yr')}`}
            tone="gold"
            sub={tx(`trong ${i.years} năm, cùng biên và tái đầu tư`, `over ${i.years} years, same margin & reinvestment`)}
          />
        </div>

        <Card className="p-3">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={res.rows} margin={{ top: 10, right: 16, bottom: 4, left: 0 }}>
                <CartesianGrid stroke={grid} strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="year" {...axis} />
                <YAxis {...axis} width={48} />
                <Tooltip {...tooltip} formatter={(v) => fmt(Number(v))} />
                <Bar dataKey="fcf" name="FCFF" fill="#38BDF8" isAnimationActive={false} radius={[3, 3, 0, 0]} />
                <Bar dataKey="pv" name={tx('Giá trị hiện tại', 'Present value')} fill="#10B981" isAnimationActive={false} radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-4">
          <div className="mb-2 text-sm font-semibold">{tx('Ma trận độ nhạy: giá trị mỗi cổ phiếu (đồng)', 'Sensitivity: value per share (VND)')}</div>
          <div className="overflow-x-auto">
            <table className="num w-full min-w-[480px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className="px-2 py-1 text-left text-xs text-muted">WACC ↓ · g →</th>
                  {gGrid.map((g) => (
                    <th key={g} className="px-2 py-1 text-right text-xs text-muted">
                      {g.toFixed(2)}%
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {waccGrid.map((wv) => (
                  <tr key={wv}>
                    <th className="px-2 py-1 text-left text-xs text-muted">{wv.toFixed(2)}%</th>
                    {gGrid.map((g) => {
                      const v = wv > g ? valueDcf(i, { wacc: wv, g }).perShare : NaN;
                      const center = Math.abs(wv - w) < 1e-9 && Math.abs(g - i.terminalG) < 1e-9;
                      const above = v >= i.price;
                      return (
                        <td
                          key={g}
                          className={`border border-line px-2 py-1.5 text-right ${center ? 'font-semibold ring-2 ring-gold ring-inset' : ''} ${above ? 'text-up' : 'text-down'}`}
                        >
                          {fmt(v)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[11px] text-muted">
            {tx('Xanh = cao hơn giá thị trường, đỏ = thấp hơn. Hãy báo cáo một KHOẢNG giá trị, không phải một con số.', 'Green = above market price, red = below. Report a RANGE of values, not a single number.')}
          </p>
        </Card>
      </div>
    </div>
  );
}

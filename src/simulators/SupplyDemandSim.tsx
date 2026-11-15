import { useMemo, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ReferenceArea, ReferenceDot, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, Slider, Stat, chartTheme } from '../components/ui';
import { useI18n } from '../i18n';

/** Linear market: demand P = a − bQ, supply P = c + dQ, with an optional per-unit tax and a price ceiling. */
export function SupplyDemandSim() {
  const { tx } = useI18n();
  const [a, setA] = useState(100);
  const [bd, setBd] = useState(1);
  const [c, setC] = useState(20);
  const [d, setD] = useState(1);
  const [tax, setTax] = useState(0);
  const [ceilingOn, setCeilingOn] = useState(false);
  const [ceiling, setCeiling] = useState(50);

  const r = useMemo(() => {
    const q0 = Math.max(0, (a - c) / (bd + d));
    const p0 = a - bd * q0;
    const qt = Math.max(0, (a - c - tax) / (bd + d));
    const pBuyer = a - bd * qt;
    const pSeller = pBuyer - tax;
    const buyerShare = tax > 0 ? (pBuyer - p0) / tax : bd / (bd + d);
    const cs = 0.5 * (a - pBuyer) * qt;
    const ps = 0.5 * (pSeller - c) * qt;
    const revenue = tax * qt;
    const dwl = 0.5 * tax * (q0 - qt);
    // Ceiling (applied to the no-tax market for clarity)
    const binding = ceilingOn && ceiling < p0;
    const qd = binding ? Math.max(0, (a - ceiling) / bd) : q0;
    const qs = binding ? Math.max(0, (ceiling - c) / d) : q0;
    const elasticity = q0 > 0 ? -(1 / bd) * (p0 / q0) : 0;
    return { q0, p0, qt, pBuyer, pSeller, buyerShare, cs, ps, revenue, dwl, binding, qd, qs, shortage: Math.max(0, qd - qs), elasticity };
  }, [a, bd, c, d, tax, ceilingOn, ceiling]);

  const qMax = Math.max(10, Math.ceil(Math.max(a / bd, r.q0 * 1.6) / 10) * 10);
  const data = useMemo(() => {
    const rows = [];
    for (let i = 0; i <= 60; i++) {
      const q = (qMax * i) / 60;
      rows.push({
        q: Number(q.toFixed(2)),
        demand: Math.max(0, a - bd * q),
        supply: c + d * q,
        supplyTax: tax > 0 ? c + d * q + tax : null,
      });
    }
    return rows;
  }, [a, bd, c, d, tax, qMax]);

  const f = (v: number) => v.toFixed(1);
  const { axis, grid, tooltip } = chartTheme;

  return (
    <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
      <Card className="space-y-4 p-4">
        <div className="text-xs font-semibold uppercase tracking-widest text-muted">{tx('Đường cầu', 'Demand')} · P = a − bQ</div>
        <Slider label={tx('Mức giá tối đa (a)', 'Choke price (a)')} value={a} min={50} max={200} onChange={setA} />
        <Slider label={tx('Độ dốc cầu (b)', 'Demand slope (b)')} value={bd} min={0.2} max={4} step={0.1} onChange={setBd} fmt={(v) => v.toFixed(1)} />
        <div className="pt-1 text-xs font-semibold uppercase tracking-widest text-muted">{tx('Đường cung', 'Supply')} · P = c + dQ</div>
        <Slider label={tx('Chi phí tối thiểu (c)', 'Minimum cost (c)')} value={c} min={0} max={80} onChange={setC} />
        <Slider label={tx('Độ dốc cung (d)', 'Supply slope (d)')} value={d} min={0.2} max={4} step={0.1} onChange={setD} fmt={(v) => v.toFixed(1)} />
        <div className="pt-1 text-xs font-semibold uppercase tracking-widest text-muted">{tx('Can thiệp', 'Intervention')}</div>
        <Slider label={tx('Thuế trên mỗi đơn vị', 'Per-unit tax')} value={tax} min={0} max={50} onChange={setTax} />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={ceilingOn} onChange={(e) => setCeilingOn(e.target.checked)} />
          {tx('Áp giá trần (thị trường không thuế)', 'Price ceiling (untaxed market)')}
        </label>
        {ceilingOn && <Slider label={tx('Giá trần', 'Ceiling')} value={ceiling} min={0} max={a} onChange={setCeiling} />}
      </Card>

      <div className="min-w-0 space-y-4">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Stat label={tx('Cân bằng (Q*, P*)', 'Equilibrium (Q*, P*)')} value={`${f(r.q0)}, ${f(r.p0)}`} sub={`E ≈ ${r.elasticity.toFixed(2)}`} />
          <Stat label={tx('Người mua trả / bán nhận', 'Buyer pays / seller gets')} value={`${f(r.pBuyer)} / ${f(r.pSeller)}`} sub={tax > 0 ? `Q = ${f(r.qt)}` : tx('không thuế', 'no tax')} />
          <Stat label={tx('Người mua chịu thuế', 'Buyers’ tax share')} value={`${(r.buyerShare * 100).toFixed(0)}%`} tone="gold" sub={tx('= b/(b+d)', '= b/(b+d)')} />
          <Stat label={tx('Tổn thất vô ích', 'Deadweight loss')} value={f(r.dwl)} tone={r.dwl > 0 ? 'down' : undefined} sub={`${tx('Thu thuế', 'Revenue')} ${f(r.revenue)}`} />
          <Stat label={tx('Thặng dư tiêu dùng', 'Consumer surplus')} value={f(r.cs)} tone="up" />
          <Stat label={tx('Thặng dư sản xuất', 'Producer surplus')} value={f(r.ps)} tone="up" />
          <Stat
            label={tx('Thiếu hụt do giá trần', 'Shortage from ceiling')}
            value={r.binding ? f(r.shortage) : '—'}
            tone={r.binding ? 'down' : undefined}
            sub={ceilingOn ? (r.binding ? `Qd ${f(r.qd)} · Qs ${f(r.qs)}` : tx('trần không ràng buộc', 'ceiling not binding')) : ''}
          />
          <Stat label={tx('Tổng phúc lợi', 'Total welfare')} value={f(r.cs + r.ps + r.revenue)} />
        </div>

        <Card className="p-3">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 10, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid stroke={grid} strokeDasharray="3 3" />
                <XAxis dataKey="q" type="number" domain={[0, qMax]} {...axis} label={{ value: tx('Sản lượng (Q)', 'Quantity (Q)'), position: 'insideBottom', offset: -10, fill: axis.stroke, fontSize: 11 }} />
                <YAxis type="number" domain={[0, Math.ceil(a * 1.05)]} {...axis} width={40} />
                <Tooltip {...tooltip} formatter={(v) => (typeof v === 'number' ? v.toFixed(1) : String(v))} labelFormatter={(l) => `Q = ${l}`} />
                <Legend wrapperStyle={{ fontSize: 12 }} verticalAlign="top" />
                {tax > 0 && r.qt < r.q0 && (
                  <ReferenceArea x1={r.qt} x2={r.q0} y1={r.pSeller} y2={r.pBuyer} fill="#EF4444" fillOpacity={0.18} />
                )}
                {tax > 0 && <ReferenceArea x1={0} x2={r.qt} y1={r.pSeller} y2={r.pBuyer} fill="#F59E0B" fillOpacity={0.15} />}
                <Line dataKey="demand" name={tx('Cầu', 'Demand')} stroke="#38BDF8" strokeWidth={2.5} dot={false} isAnimationActive={false} />
                <Line dataKey="supply" name={tx('Cung', 'Supply')} stroke="#10B981" strokeWidth={2.5} dot={false} isAnimationActive={false} />
                {tax > 0 && <Line dataKey="supplyTax" name={tx('Cung + thuế', 'Supply + tax')} stroke="#10B981" strokeDasharray="6 4" strokeWidth={2} dot={false} isAnimationActive={false} />}
                {ceilingOn && <ReferenceLine y={ceiling} stroke="#EF4444" strokeDasharray="4 4" label={{ value: tx('Giá trần', 'Ceiling'), fill: '#EF4444', fontSize: 11, position: 'right' }} />}
                <ReferenceDot x={r.q0} y={r.p0} r={5} fill="#F59E0B" stroke="none" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="px-2 pt-1 text-xs text-muted">
            {tx(
              'Vùng vàng = tiền thuế thu được. Vùng đỏ = tổn thất vô ích (các giao dịch biến mất). Chấm vàng = điểm cân bằng không thuế.',
              'Amber area = tax revenue. Red area = deadweight loss (trades that vanish). Amber dot = untaxed equilibrium.',
            )}
          </p>
        </Card>
      </div>
    </div>
  );
}

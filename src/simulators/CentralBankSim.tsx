import { useMemo, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Btn, Card, Slider, Stat, chartTheme } from '../components/ui';
import { useI18n } from '../i18n';

/**
 * A small, transparent quarterly macro model for an open emerging economy.
 * It is a teaching device, not a forecast: coefficients are chosen to make lags and trade-offs visible.
 *   Output gap  — persistent; falls with last quarter's real policy rate and reserve requirement,
 *                 rises with credit growth and a weaker currency (exports).
 *   Inflation   — adaptive expectations anchored partly to target, plus last quarter's gap and FX pass-through.
 *   Credit      — falls with the policy rate and reserves, rises with activity.
 *   Depreciation — driven by the Fed-minus-local rate differential and excess inflation.
 */
interface Q {
  t: string;
  inflation: number;
  growth: number;
  credit: number;
  depreciation: number;
  policy: number;
}

type ShockId = 'none' | 'oil' | 'boom' | 'fed' | 'slump';

export function CentralBankSim() {
  const { tx } = useI18n();
  const [rate, setRate] = useState(4.5);
  const [rr, setRr] = useState(3);
  const [fed, setFed] = useState(4.5);
  const [target, setTarget] = useState(4);
  const [shock, setShock] = useState<ShockId>('none');
  const [changeAt, setChangeAt] = useState(2);

  const SHOCKS: { id: ShockId; label: string }[] = [
    { id: 'none', label: tx('Không có cú sốc', 'No shock') },
    { id: 'oil', label: tx('Giá dầu tăng (cú sốc cung)', 'Oil price spike (supply)') },
    { id: 'boom', label: tx('Bùng nổ tín dụng, cầu nóng', 'Credit boom, hot demand') },
    { id: 'fed', label: tx('Fed tăng mạnh lên 5,5%', 'Fed hikes to 5.5%') },
    { id: 'slump', label: tx('Xuất khẩu sụt giảm', 'Export slump') },
  ];

  const series = useMemo<Q[]>(() => {
    const N = 16;
    const neutral = 4.5; // neutral nominal policy rate in this toy economy
    const rr0 = 3;
    const potential = 6.5;
    let gap = 0;
    let pi = 4;
    let credit = 12;
    let dep = 2;
    const out: Q[] = [];
    let iPrev = neutral;
    let resPrev = rr0;
    for (let t = 0; t < N; t++) {
      const active = t >= changeAt;
      const i = active ? rate : neutral;
      const res = active ? rr : rr0;
      const fedRate = shock === 'fed' && t >= 1 ? 5.5 : fed;
      const inShock = t >= 1 && t <= 4;
      const costShock = shock === 'oil' && inShock ? 1.2 : 0;
      // an oil shock also squeezes real incomes and margins, so it hits output directly
      const outputShock =
        shock === 'oil' && inShock ? -1.0 : shock === 'boom' && t >= 1 && t <= 6 ? 0.9 : shock === 'slump' && t >= 1 && t <= 6 ? -1.1 : 0;

      // Lags: this quarter responds to LAST quarter's policy. "Tightness" is the real policy rate
      // relative to its neutral level (neutral nominal rate minus the inflation target).
      const tightness = iPrev - pi - (neutral - target);
      // capacity limit: once output runs well above potential, extra demand shows up as inflation, not output
      const overheat = Math.max(0, gap - 1.5);
      const nextGap = 0.75 * gap - 0.3 * overheat - 0.25 * tightness - 0.15 * (resPrev - rr0) + 0.05 * (credit - 12) + 0.06 * (dep - 2) + outputShock;
      const nextPi = 0.6 * pi + 0.4 * target + 0.2 * gap + 0.15 * overheat + 0.12 * (dep - 2) + costShock + (shock === 'boom' && t > 2 && t < 9 ? 0.25 : 0);
      const nextCredit = 0.6 * credit + 0.4 * (12 - 1.5 * (i - neutral) - 1.0 * (res - rr0) + 1.0 * gap + (shock === 'boom' && t <= 6 ? 6 : 0));
      // baseline drift of 2%/yr; widens when the Fed pays more than home or inflation runs above target
      const nextDep = Math.max(-3, 0.4 * dep + 0.6 * (2 + 0.8 * (fedRate - i) + 0.3 * (pi - target)));
      iPrev = i;
      resPrev = res;

      gap = nextGap;
      pi = nextPi;
      credit = nextCredit;
      dep = nextDep;
      out.push({
        t: `Q${(t % 4) + 1}/${t < 4 ? 'Y1' : t < 8 ? 'Y2' : t < 12 ? 'Y3' : 'Y4'}`,
        inflation: +pi.toFixed(2),
        growth: +(potential + gap).toFixed(2),
        credit: +credit.toFixed(2),
        depreciation: +dep.toFixed(2),
        policy: i,
      });
    }
    return out;
  }, [rate, rr, fed, target, shock, changeAt]);

  const last = series[series.length - 1];
  const peakPi = Math.max(...series.map((s) => s.inflation));
  const minGrowth = Math.min(...series.map((s) => s.growth));
  const turnQ = (() => {
    const start = series[changeAt]?.inflation;
    if (start === undefined) return null;
    for (let k = changeAt + 1; k < series.length - 1; k++) {
      if ((series[k + 1].inflation - series[k].inflation) * (series[k].inflation - series[k - 1].inflation) < 0) return k - changeAt;
    }
    return null;
  })();
  const fxPressure = (shock === 'fed' ? 5.5 : fed) - (changeAt < series.length ? rate : 4.5);
  const misery = Math.abs(last.inflation - target) + Math.max(0, 6.5 - last.growth);
  const grade = misery < 0.8 ? 'A' : misery < 1.6 ? 'B' : misery < 2.8 ? 'C' : 'D';

  const { axis, grid, tooltip } = chartTheme;

  return (
    <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
      <Card className="space-y-4 p-4">
        <Slider label={tx('Lãi suất điều hành (%)', 'Policy rate (%)')} value={rate} min={0.5} max={12} step={0.25} onChange={setRate} fmt={(v) => v.toFixed(2)} />
        <Slider label={tx('Dự trữ bắt buộc (%)', 'Reserve requirement (%)')} value={rr} min={0} max={12} step={0.5} onChange={setRr} fmt={(v) => v.toFixed(1)} />
        <Slider label={tx('Áp dụng từ quý', 'Takes effect from quarter')} value={changeAt} min={0} max={8} onChange={setChangeAt} fmt={(v) => `${v + 1}`} />
        <Slider label={tx('Lãi suất Fed (%)', 'Fed rate (%)')} value={fed} min={0} max={6} step={0.25} onChange={setFed} fmt={(v) => v.toFixed(2)} />
        <Slider label={tx('Mục tiêu lạm phát (%)', 'Inflation target (%)')} value={target} min={2} max={5} step={0.5} onChange={setTarget} fmt={(v) => v.toFixed(1)} />
        <label className="block text-xs text-muted">
          {tx('Cú sốc', 'Shock')}
          <select
            value={shock}
            onChange={(e) => setShock(e.target.value as ShockId)}
            className="mt-1 w-full rounded-lg border border-line bg-bg px-2 py-2 text-sm text-ink"
          >
            {SHOCKS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
        <Btn
          className="w-full"
          onClick={() => {
            setRate(4.5);
            setRr(3);
            setFed(4.5);
            setTarget(4);
            setShock('none');
            setChangeAt(2);
          }}
        >
          ↺ {tx('Đặt lại', 'Reset')}
        </Btn>
      </Card>

      <div className="min-w-0 space-y-4">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Stat label={tx('Lạm phát cuối kỳ', 'Final inflation')} value={`${last.inflation.toFixed(1)}%`} tone={Math.abs(last.inflation - target) < 0.6 ? 'up' : 'down'} sub={`${tx('đỉnh', 'peak')} ${peakPi.toFixed(1)}%`} />
          <Stat label={tx('Tăng trưởng GDP', 'GDP growth')} value={`${last.growth.toFixed(1)}%`} tone={minGrowth < 3 ? 'down' : 'up'} sub={`${tx('thấp nhất', 'low')} ${minGrowth.toFixed(1)}%`} />
          <Stat label={tx('Tín dụng (YoY)', 'Credit (YoY)')} value={`${last.credit.toFixed(1)}%`} />
          <Stat
            label={tx('Áp lực tỷ giá', 'FX pressure')}
            value={`${last.depreciation.toFixed(1)}%`}
            tone={last.depreciation > 4 ? 'down' : 'gold'}
            sub={`${tx('Fed − nội địa', 'Fed − local')} ${fxPressure >= 0 ? '+' : ''}${fxPressure.toFixed(2)}`}
          />
        </div>
        <Card className="p-3">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={series} margin={{ top: 10, right: 16, bottom: 4, left: 0 }}>
                <CartesianGrid stroke={grid} strokeDasharray="3 3" />
                <XAxis dataKey="t" {...axis} interval={1} />
                <YAxis {...axis} width={40} domain={['auto', 'auto']} />
                <Tooltip {...tooltip} />
                <Legend wrapperStyle={{ fontSize: 12 }} verticalAlign="top" />
                <ReferenceLine y={target} stroke="#F59E0B" strokeDasharray="4 4" />
                <ReferenceLine x={series[changeAt]?.t} stroke="rgb(var(--muted))" strokeDasharray="2 4" label={{ value: tx('đổi chính sách', 'policy change'), fill: axis.stroke, fontSize: 10, position: 'insideTopLeft' }} />
                <Line dataKey="inflation" name={tx('Lạm phát', 'Inflation')} stroke="#EF4444" strokeWidth={2.5} dot={false} isAnimationActive={false} />
                <Line dataKey="growth" name={tx('Tăng trưởng GDP', 'GDP growth')} stroke="#10B981" strokeWidth={2.5} dot={false} isAnimationActive={false} />
                <Line dataKey="credit" name={tx('Tín dụng', 'Credit')} stroke="#38BDF8" strokeWidth={1.5} dot={false} isAnimationActive={false} />
                <Line dataKey="depreciation" name={tx('Mất giá nội tệ', 'Currency depreciation')} stroke="#A78BFA" strokeWidth={1.5} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="flex flex-wrap items-center gap-3 p-4 text-sm">
          <div className={`num text-3xl font-semibold ${grade === 'A' ? 'text-up' : grade === 'D' ? 'text-down' : 'text-gold'}`}>{grade}</div>
          <p className="flex-1 text-muted">
            {tx(
              `Điểm điều hành dựa trên khoảng cách lạm phát với mục tiêu và mức tăng trưởng hụt so với tiềm năng 6,5% ở quý cuối.${turnQ !== null ? ` Lạm phát đổi hướng sau khoảng ${turnQ} quý kể từ khi chính sách thay đổi.` : ''}`,
              `The policy grade reflects the final-quarter distance of inflation from target and growth shortfall versus 6.5% potential.${turnQ !== null ? ` Inflation turned about ${turnQ} quarters after the policy change.` : ''}`,
            )}{' '}
            {tx('Đây là mô hình giáo khoa đơn giản để thấy độ trễ và sự đánh đổi, không phải dự báo.', 'This is a simple teaching model to show lags and trade-offs, not a forecast.')}
          </p>
        </Card>
      </div>
    </div>
  );
}

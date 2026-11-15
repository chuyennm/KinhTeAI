import { useMemo, useState } from 'react';
import { Btn, Card, Stat } from '../components/ui';
import { useI18n } from '../i18n';

interface Fin {
  revenue: number;
  cogs: number;
  opex: number;
  depreciation: number;
  interest: number;
  taxRate: number;
  cash: number;
  receivables: number;
  inventory: number;
  otherCurrent: number;
  fixedAssets: number;
  payables: number;
  shortDebt: number;
  longDebt: number;
  otherLiab: number;
  retained: number;
  capex: number;
  prevReceivables: number;
  prevInventory: number;
  prevPayables: number;
}

const PRESETS: Record<string, { vi: string; en: string; data: Fin }> = {
  healthy: {
    vi: 'Doanh nghiệp khỏe mạnh',
    en: 'Healthy company',
    data: { revenue: 10000, cogs: 6000, opex: 2200, depreciation: 300, interest: 80, taxRate: 20, cash: 1500, receivables: 900, inventory: 1100, otherCurrent: 300, fixedAssets: 4200, payables: 1000, shortDebt: 300, longDebt: 700, otherLiab: 500, retained: 3000, capex: 420, prevReceivables: 850, prevInventory: 1050, prevPayables: 950 },
  },
  hot: {
    vi: 'Tăng trưởng nóng, dòng tiền yếu',
    en: 'Hot growth, weak cash',
    data: { revenue: 10000, cogs: 7000, opex: 1700, depreciation: 200, interest: 350, taxRate: 20, cash: 300, receivables: 3600, inventory: 2600, otherCurrent: 900, fixedAssets: 2500, payables: 900, shortDebt: 3200, longDebt: 1000, otherLiab: 600, retained: 700, capex: 500, prevReceivables: 2100, prevInventory: 1800, prevPayables: 850 },
  },
  developer: {
    vi: 'Chủ đầu tư đòn bẩy cao',
    en: 'Leveraged developer',
    data: { revenue: 6000, cogs: 4300, opex: 700, depreciation: 60, interest: 900, taxRate: 20, cash: 600, receivables: 1500, inventory: 18000, otherCurrent: 3500, fixedAssets: 2400, payables: 4200, shortDebt: 7500, longDebt: 5500, otherLiab: 7200, retained: 1200, capex: 150, prevReceivables: 1100, prevInventory: 15500, prevPayables: 3600 },
  },
};

const FIELDS: { group: 'is' | 'bs' | 'cf'; key: keyof Fin; vi: string; en: string }[] = [
  { group: 'is', key: 'revenue', vi: 'Doanh thu', en: 'Revenue' },
  { group: 'is', key: 'cogs', vi: 'Giá vốn hàng bán', en: 'COGS' },
  { group: 'is', key: 'opex', vi: 'Chi phí bán hàng & QLDN', en: 'SG&A' },
  { group: 'is', key: 'depreciation', vi: 'Khấu hao', en: 'Depreciation' },
  { group: 'is', key: 'interest', vi: 'Chi phí lãi vay', en: 'Interest expense' },
  { group: 'is', key: 'taxRate', vi: 'Thuế suất (%)', en: 'Tax rate (%)' },
  { group: 'bs', key: 'cash', vi: 'Tiền & tương đương', en: 'Cash' },
  { group: 'bs', key: 'receivables', vi: 'Phải thu', en: 'Receivables' },
  { group: 'bs', key: 'inventory', vi: 'Tồn kho', en: 'Inventory' },
  { group: 'bs', key: 'otherCurrent', vi: 'TS ngắn hạn khác', en: 'Other current assets' },
  { group: 'bs', key: 'fixedAssets', vi: 'TS dài hạn', en: 'Non-current assets' },
  { group: 'bs', key: 'payables', vi: 'Phải trả người bán', en: 'Payables' },
  { group: 'bs', key: 'shortDebt', vi: 'Vay ngắn hạn', en: 'Short-term debt' },
  { group: 'bs', key: 'longDebt', vi: 'Vay dài hạn', en: 'Long-term debt' },
  { group: 'bs', key: 'otherLiab', vi: 'Nợ phải trả khác', en: 'Other liabilities' },
  { group: 'bs', key: 'retained', vi: 'LN sau thuế chưa phân phối', en: 'Retained earnings' },
  { group: 'cf', key: 'capex', vi: 'Chi đầu tư (capex)', en: 'Capex' },
  { group: 'cf', key: 'prevReceivables', vi: 'Phải thu năm trước', en: 'Receivables, prior year' },
  { group: 'cf', key: 'prevInventory', vi: 'Tồn kho năm trước', en: 'Inventory, prior year' },
  { group: 'cf', key: 'prevPayables', vi: 'Phải trả năm trước', en: 'Payables, prior year' },
];

export function RatioAnalyzer() {
  const { tx, lang } = useI18n();
  const [preset, setPreset] = useState('healthy');
  const [f, setF] = useState<Fin>(PRESETS.healthy.data);

  const r = useMemo(() => {
    const gross = f.revenue - f.cogs;
    const ebitda = gross - f.opex;
    const ebit = ebitda - f.depreciation;
    const ebt = ebit - f.interest;
    const tax = Math.max(0, ebt) * (f.taxRate / 100);
    const ni = ebt - tax;
    const currentAssets = f.cash + f.receivables + f.inventory + f.otherCurrent;
    const assets = currentAssets + f.fixedAssets;
    const debt = f.shortDebt + f.longDebt;
    const liabilities = f.payables + debt + f.otherLiab;
    const equity = assets - liabilities;
    const currentLiab = f.payables + f.shortDebt;
    const dNwc = f.receivables - f.prevReceivables + (f.inventory - f.prevInventory) - (f.payables - f.prevPayables);
    const cfo = ni + f.depreciation - dNwc;
    const fcf = cfo - f.capex;
    const invested = equity + debt - f.cash;
    const nopat = ebit * (1 - f.taxRate / 100);
    const dso = (f.receivables / f.revenue) * 365;
    const dio = (f.inventory / f.cogs) * 365;
    const dpo = (f.payables / f.cogs) * 365;
        const recvGrowth = f.prevReceivables > 0 ? (f.receivables / f.prevReceivables - 1) * 100 : 0;
    const wc = currentAssets - currentLiab;
    // Altman Z'' (book-value version for non-manufacturers and unlisted firms)
    const z = 6.56 * (wc / assets) + 3.26 * (f.retained / assets) + 6.72 * (ebit / assets) + 1.05 * (equity / Math.max(liabilities, 1));
    return {
      gross, ebitda, ebit, ni, assets, equity, debt, liabilities, currentAssets, currentLiab, cfo, fcf, invested, nopat, dso, dio, dpo,
      grossM: (gross / f.revenue) * 100,
      ebitM: (ebit / f.revenue) * 100,
      netM: (ni / f.revenue) * 100,
      turnover: f.revenue / assets,
      leverage: assets / equity,
      roe: (ni / equity) * 100,
      roa: (ni / assets) * 100,
      roic: (nopat / invested) * 100,
      de: debt / equity,
      netDebtEbitda: (debt - f.cash) / ebitda,
      coverage: ebit / f.interest,
      current: currentAssets / currentLiab,
      quick: (currentAssets - f.inventory) / currentLiab,
      cashShort: f.cash / Math.max(f.shortDebt, 1),
      cfoNi: ni !== 0 ? cfo / ni : 0,
      ccc: dso + dio - dpo,
      recvGrowth,
      z,
    };
  }, [f]);

  const flags: { level: 'down' | 'gold'; vi: string; en: string }[] = [];
  if (r.equity <= 0) flags.push({ level: 'down', vi: 'Vốn chủ sở hữu âm: nợ vượt tài sản.', en: 'Negative equity: liabilities exceed assets.' });
  if (r.cfoNi < 0.8) flags.push({ level: 'down', vi: `CFO chỉ bằng ${r.cfoNi.toFixed(2)} lần lợi nhuận: lợi nhuận không chuyển thành tiền.`, en: `CFO is only ${r.cfoNi.toFixed(2)}× net income: profit is not turning into cash.` });
  if (r.recvGrowth > 25) flags.push({ level: 'gold', vi: `Phải thu tăng ${r.recvGrowth.toFixed(0)}% trong năm: kiểm tra điều kiện bán chịu và ghi nhận doanh thu.`, en: `Receivables up ${r.recvGrowth.toFixed(0)}% in a year: check credit terms and revenue recognition.` });
  if (r.coverage < 1.5) flags.push({ level: 'down', vi: `Khả năng trả lãi ${r.coverage.toFixed(2)} lần: dưới ngưỡng an toàn 1,5.`, en: `Interest coverage ${r.coverage.toFixed(2)}×: below the 1.5× safety line.` });
  if (r.cashShort < 1) flags.push({ level: 'gold', vi: `Tiền mặt chỉ bằng ${(r.cashShort * 100).toFixed(0)}% nợ vay ngắn hạn: phụ thuộc vào việc đảo nợ.`, en: `Cash covers only ${(r.cashShort * 100).toFixed(0)}% of short-term debt: dependent on rolling debt.` });
  if (r.quick < 0.7) flags.push({ level: 'gold', vi: `Hệ số thanh toán nhanh ${r.quick.toFixed(2)}: thanh khoản phụ thuộc vào bán tồn kho.`, en: `Quick ratio ${r.quick.toFixed(2)}: liquidity depends on selling inventory.` });
  if (r.netDebtEbitda > 4) flags.push({ level: 'down', vi: `Nợ ròng/EBITDA ${r.netDebtEbitda.toFixed(1)} lần: đòn bẩy rất cao.`, en: `Net debt/EBITDA ${r.netDebtEbitda.toFixed(1)}×: very high leverage.` });
  if (r.fcf < 0) flags.push({ level: 'gold', vi: 'Dòng tiền tự do âm: hoạt động đang cần nguồn tài trợ bên ngoài.', en: 'Negative free cash flow: the business needs outside funding.' });
  if (r.leverage > 4 && r.roe > 15) flags.push({ level: 'gold', vi: 'ROE cao chủ yếu nhờ đòn bẩy, không phải nhờ biên lợi nhuận.', en: 'High ROE driven mainly by leverage, not margins.' });

  const pct = (v: number) => (Number.isFinite(v) ? `${v.toFixed(1)}%` : '—');
  const x = (v: number) => (Number.isFinite(v) ? `${v.toFixed(2)}×` : '—');
  const days = (v: number) => (Number.isFinite(v) ? `${v.toFixed(0)}d` : '—');

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {Object.entries(PRESETS).map(([k, p]) => (
          <Btn
            key={k}
            variant={preset === k ? 'gold' : 'ghost'}
            onClick={() => {
              setPreset(k);
              setF(p.data);
            }}
          >
            {lang === 'vi' ? p.vi : p.en}
          </Btn>
        ))}
        <span className="self-center text-xs text-muted">{tx('Đơn vị: tỷ đồng. Sửa trực tiếp mọi ô.', 'Unit: VND billion. Edit any field.')}</span>
      </div>

      <div className="grid gap-4 xl:grid-cols-[360px_1fr]">
        <Card className="p-4">
          {(['is', 'bs', 'cf'] as const).map((g) => (
            <div key={g} className="mb-3">
              <div className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-gold">
                {g === 'is' ? tx('Kết quả kinh doanh', 'Income statement') : g === 'bs' ? tx('Bảng cân đối', 'Balance sheet') : tx('Dòng tiền & năm trước', 'Cash flow & prior year')}
              </div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                {FIELDS.filter((fd) => fd.group === g).map((fd) => (
                  <label key={fd.key} className="text-[11px] text-muted">
                    {lang === 'vi' ? fd.vi : fd.en}
                    <input
                      type="number"
                      value={f[fd.key]}
                      onChange={(e) => setF((o) => ({ ...o, [fd.key]: Number(e.target.value) || 0 }))}
                      className="num mt-0.5 w-full rounded border border-line bg-bg px-2 py-1 text-sm text-ink focus:border-gold focus:outline-none"
                    />
                  </label>
                ))}
              </div>
            </div>
          ))}
          <div className="num rounded bg-panel2 px-2 py-1.5 text-[11px] text-muted">
            {tx('Tài sản', 'Assets')} {r.assets.toFixed(0)} = {tx('Nợ', 'Liabilities')} {r.liabilities.toFixed(0)} + {tx('Vốn chủ', 'Equity')} {r.equity.toFixed(0)}
          </div>
        </Card>

        <div className="min-w-0 space-y-4">
          <Card className="p-4">
            <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted">DuPont · ROE = {tx('biên', 'margin')} × {tx('vòng quay', 'turnover')} × {tx('đòn bẩy', 'leverage')}</div>
            <div className="num flex flex-wrap items-center gap-2 text-lg">
              <span className="rounded bg-panel2 px-2 py-1">{pct(r.netM)}</span>×<span className="rounded bg-panel2 px-2 py-1">{x(r.turnover)}</span>×
              <span className="rounded bg-panel2 px-2 py-1">{x(r.leverage)}</span>=<span className="rounded bg-gold/20 px-2 py-1 font-semibold text-gold">{pct(r.roe)}</span>
            </div>
          </Card>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Stat label={tx('Biên gộp', 'Gross margin')} value={pct(r.grossM)} />
            <Stat label={tx('Biên EBIT', 'EBIT margin')} value={pct(r.ebitM)} />
            <Stat label="ROIC" value={pct(r.roic)} tone={r.roic > 11 ? 'up' : 'down'} sub={tx('so với WACC ~11%', 'vs WACC ~11%')} />
            <Stat label="ROA" value={pct(r.roa)} />
            <Stat label="CFO" value={r.cfo.toFixed(0)} tone={r.cfo > 0 ? 'up' : 'down'} sub={`CFO/NI ${r.cfoNi.toFixed(2)}`} />
            <Stat label="FCF" value={r.fcf.toFixed(0)} tone={r.fcf > 0 ? 'up' : 'down'} />
            <Stat label={tx('Nợ vay / Vốn chủ', 'Debt / Equity')} value={x(r.de)} />
            <Stat label={tx('Nợ ròng / EBITDA', 'Net debt / EBITDA')} value={x(r.netDebtEbitda)} tone={r.netDebtEbitda > 3 ? 'down' : undefined} />
            <Stat label={tx('Khả năng trả lãi', 'Interest coverage')} value={x(r.coverage)} tone={r.coverage < 1.5 ? 'down' : 'up'} />
            <Stat label={tx('Thanh toán hiện hành', 'Current ratio')} value={x(r.current)} />
            <Stat label={tx('Thanh toán nhanh', 'Quick ratio')} value={x(r.quick)} tone={r.quick < 0.7 ? 'down' : undefined} />
            <Stat label={tx('Tiền / Vay ngắn hạn', 'Cash / ST debt')} value={x(r.cashShort)} tone={r.cashShort < 1 ? 'down' : 'up'} />
            <Stat label="DSO" value={days(r.dso)} />
            <Stat label="DIO" value={days(r.dio)} />
            <Stat label="DPO" value={days(r.dpo)} />
            <Stat label="CCC" value={days(r.ccc)} tone={r.ccc > 120 ? 'down' : undefined} />
          </div>
          <Card className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="text-sm font-semibold">{tx('Dấu hiệu cảnh báo', 'Red flags')}</div>
              <div className="num text-xs text-muted">Z'' ≈ {r.z.toFixed(2)} ({r.z < 1.1 ? tx('vùng kiệt quệ', 'distress zone') : r.z > 2.6 ? tx('vùng an toàn', 'safe zone') : tx('vùng xám', 'grey zone')})</div>
            </div>
            {flags.length === 0 ? (
              <p className="text-sm text-up">✓ {tx('Không phát hiện dấu hiệu cảnh báo theo các ngưỡng cơ bản.', 'No red flags at the basic thresholds.')}</p>
            ) : (
              <ul className="space-y-1.5 text-sm">
                {flags.map((fl, i) => (
                  <li key={i} className="flex gap-2">
                    <span className={fl.level === 'down' ? 'text-down' : 'text-gold'}>●</span>
                    {lang === 'vi' ? fl.vi : fl.en}
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-3 text-[11px] text-muted">
              {tx(
                "Z'' là phiên bản Altman dùng giá trị sổ sách (ngưỡng 1,1 và 2,6), chỉ mang tính tham khảo. CFO được ước tính từ lợi nhuận, khấu hao và thay đổi vốn lưu động.",
                "Z'' is Altman's book-value version (thresholds 1.1 and 2.6); treat it as indicative. CFO is estimated from profit, depreciation and working-capital changes.",
              )}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

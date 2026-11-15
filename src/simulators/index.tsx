import type { ComponentType } from 'react';
import type { SimId } from '../types';
import { b, type L } from '../types';
import { CentralBankSim } from './CentralBankSim';
import { DcfSim } from './DcfSim';
import { RatioAnalyzer } from './RatioAnalyzer';
import { SupplyDemandSim } from './SupplyDemandSim';
import { YieldCurveSim } from './YieldCurveSim';

export const SIMULATORS: Record<Exclude<SimId, 'python-lab'>, { title: L; desc: L; module: string; Component: ComponentType }> = {
  'supply-demand': {
    module: 'm1',
    title: b('Mô phỏng Cung–Cầu, Thuế & Giá trần', 'Supply–Demand, Tax & Price-Ceiling Simulator'),
    desc: b('Kéo đường cung, cầu; thêm thuế hoặc giá trần và xem ai chịu thuế, tổn thất vô ích và thiếu hụt.', 'Drag supply and demand; add a tax or a ceiling and see incidence, deadweight loss and shortages.'),
    Component: SupplyDemandSim,
  },
  'central-bank': {
    module: 'm2',
    title: b('Mô phỏng Điều hành Ngân hàng Trung ương', 'Central Bank Policy Simulator'),
    desc: b('Điều chỉnh lãi suất, dự trữ bắt buộc dưới các cú sốc và quan sát lạm phát, tín dụng, GDP và tỷ giá theo độ trễ.', 'Set rates and reserve requirements under shocks and watch inflation, credit, GDP and FX respond with lags.'),
    Component: CentralBankSim,
  },
  'yield-curve': {
    module: 'm3',
    title: b('Đường cong lợi suất & Tương quan liên thị trường', 'Yield Curve & Cross-Asset Correlation Explorer'),
    desc: b('So sánh đường cong lợi suất Mỹ qua các thời điểm và ma trận tương quan vàng, cổ phiếu, DXY, lợi suất.', 'Compare US yield curves across key dates and a correlation matrix of gold, stocks, the DXY and yields.'),
    Component: YieldCurveSim,
  },
  'ratio-analyzer': {
    module: 'm4',
    title: b('Phân tích Tỷ số & Sức khỏe Dòng tiền', 'Financial Ratio & Cash-Flow Health Analyzer'),
    desc: b('Nhập báo cáo tài chính, nhận phân rã DuPont, chu kỳ tiền mặt, khả năng thanh toán và cảnh báo tự động.', 'Enter financial statements and get DuPont, the cash cycle, solvency ratios and automatic red flags.'),
    Component: RatioAnalyzer,
  },
  dcf: {
    module: 'm5',
    title: b('Máy tính DCF & Ma trận độ nhạy WACC', 'DCF & WACC Sensitivity Matrix'),
    desc: b('Dựng DCF, tính WACC bằng CAPM, xem ma trận độ nhạy và DCF ngược để tìm tăng trưởng giá đang ngầm định.', 'Build a DCF, compute WACC via CAPM, see the sensitivity matrix and reverse-DCF the growth priced in.'),
    Component: DcfSim,
  },
};

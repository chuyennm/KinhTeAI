import { b, type Module } from '../../types';

const md = String.raw;
const py = String.raw;

export const m4: Module = {
  id: 'm4',
  index: 4,
  title: b('Kế toán Quản trị & Phân tích Báo cáo Tài chính', 'Financial Statement Analysis'),
  subtitle: b(
    'Ba báo cáo kể một câu chuyện. Học cách đọc nó, đo nó, và phát hiện khi nó bị tô vẽ.',
    'Three statements tell one story. Learn to read it, measure it, and spot when it has been dressed up.',
  ),
  outcome: b(
    'Mở báo cáo tài chính của một doanh nghiệp niêm yết và trong 30 phút trả lời được: họ kiếm tiền thế nào, lợi nhuận có thật không, và bảng cân đối chịu được cú sốc nào.',
    'Open a listed company’s accounts and within 30 minutes answer: how it makes money, whether the profit is real, and what shock the balance sheet can survive.',
  ),
  tool: 'ratio-analyzer',
  capstone: b(
    'Chọn một doanh nghiệp niêm yết bạn quan tâm. Tải báo cáo tài chính 3 năm gần nhất, phân rã ROE theo DuPont, tính tỷ lệ CFO/Lợi nhuận và nêu 2 dấu hiệu bạn muốn theo dõi ở quý tới.',
    'Pick a listed company you care about. Take three years of accounts, decompose ROE with DuPont, compute CFO to net income, and name two signals to watch next quarter.',
  ),
  lessons: [
    {
      id: 'm4-l1',
      title: b('Ba báo cáo tài chính liên kết với nhau thế nào', 'How the three statements connect'),
      minutes: 18,
      summary: b(
        'Bảng cân đối là bức ảnh, báo cáo kết quả là bộ phim, báo cáo lưu chuyển tiền tệ là sự thật về tiền. Ba thứ khớp nhau từng đồng.',
        'The balance sheet is a photograph, the income statement a film, the cash-flow statement the truth about cash. They tie out to the last dong.',
      ),
      core: b(
        md`## Trực giác
Lợi nhuận là **ý kiến**, tiền là **sự thật**. Kế toán dồn tích (accrual) ghi nhận doanh thu khi giao hàng chứ không phải khi thu tiền, nên một doanh nghiệp có thể báo lãi lớn mà vẫn cạn tiền. Ba báo cáo tồn tại để bạn nhìn thấy khoảng cách đó.

## Ba báo cáo
**1. Bảng cân đối kế toán (balance sheet)** tại một thời điểm:
$$\text{Tài sản} = \text{Nợ phải trả} + \text{Vốn chủ sở hữu}$$

**2. Báo cáo kết quả kinh doanh (income statement)** trong một kỳ:
Doanh thu → trừ giá vốn → **lợi nhuận gộp** → trừ chi phí bán hàng và quản lý → **EBIT** → trừ lãi vay → trừ thuế → **lợi nhuận ròng**.

**3. Báo cáo lưu chuyển tiền tệ (cash-flow statement):**
- **CFO** từ hoạt động kinh doanh
- **CFI** từ đầu tư (mua sắm tài sản cố định mang dấu âm)
- **CFF** từ tài chính (vay, trả nợ, cổ tức)

## Các sợi dây nối
1. **Lợi nhuận ròng** chảy vào **lợi nhuận giữ lại** trong vốn chủ sở hữu.
2. **CFO** bắt đầu từ lợi nhuận ròng rồi điều chỉnh:
$$CFO = \text{LN ròng} + \text{Khấu hao} - \Delta\text{Phải thu} - \Delta\text{Tồn kho} + \Delta\text{Phải trả}$$
3. **Chi đầu tư (capex)** làm tăng tài sản cố định; **khấu hao** làm giảm nó.
4. Tổng ba dòng tiền bằng **thay đổi tiền mặt** trên bảng cân đối.

## Vì sao vốn lưu động "ăn" tiền
Bán chịu làm tăng doanh thu và lợi nhuận, nhưng tiền chưa về: khoản phải thu tăng. Sản xuất nhiều hơn bán được thì tiền nằm trong tồn kho. Doanh nghiệp tăng trưởng nhanh thường **thiếu tiền nhất** chính vì lý do này.

> Thứ tự đọc của người có kinh nghiệm: lưu chuyển tiền tệ trước, bảng cân đối sau, kết quả kinh doanh cuối cùng. Rồi đọc thuyết minh.`,
        md`## Intuition
Profit is an **opinion**; cash is a **fact**. Accrual accounting books revenue on delivery, not on payment, so a firm can report big profits while running out of money. The three statements exist so you can see that gap.

## The three statements
**1. The balance sheet** at a point in time:
$$\text{Assets} = \text{Liabilities} + \text{Equity}$$

**2. The income statement** over a period:
Revenue → less cost of goods sold → **gross profit** → less selling and admin costs → **EBIT** → less interest → less tax → **net income**.

**3. The cash-flow statement:**
- **CFO** from operations
- **CFI** from investing (capital expenditure is negative)
- **CFF** from financing (borrowing, repayment, dividends)

## The connecting threads
1. **Net income** flows into **retained earnings** in equity.
2. **CFO** starts from net income and adjusts:
$$CFO = \text{Net income} + \text{D\&A} - \Delta\text{Receivables} - \Delta\text{Inventory} + \Delta\text{Payables}$$
3. **Capex** raises fixed assets; **depreciation** lowers them.
4. The three cash flows sum to the **change in cash** on the balance sheet.

## Why working capital eats cash
Selling on credit lifts revenue and profit, but the cash has not arrived: receivables rise. Producing more than you sell parks cash in inventory. Fast-growing firms are often the **shortest of cash** for exactly this reason.

> How experienced readers proceed: cash flow first, balance sheet second, income statement last. Then the notes.`,
      ),
      examples: b(
        md`## Ví dụ số: một giao dịch đi qua ba báo cáo
Doanh nghiệp bán chịu lô hàng giá 100, giá vốn 60, thuế suất 20%.

| Báo cáo | Thay đổi |
|---|---|
| Kết quả kinh doanh | Doanh thu +100, giá vốn −60, thuế −8 → lợi nhuận ròng **+32** |
| Bảng cân đối | Phải thu +100, tồn kho −60, thuế phải nộp +8, lợi nhuận giữ lại +32 |
| Lưu chuyển tiền tệ | LN ròng +32, phải thu −100, tồn kho +60, phải trả +8 → **CFO = 0** |

Lợi nhuận 32 nhưng tiền không tăng một đồng. Nếu khách không trả, 100 phải thu thành nợ xấu và lợi nhuận kia chưa từng tồn tại.

## Ví dụ số: tăng trưởng nhanh mà cạn tiền
Doanh thu tăng từ 1.000 lên 1.500. Phải thu và tồn kho bằng 30% doanh thu, phải trả bằng 10%. Vốn lưu động ròng tăng từ 200 lên 300, tức "nuốt" 100 tiền mặt. Nếu lợi nhuận ròng chỉ 75 (biên 5%) thì CFO âm dù công ty có lãi và đang lớn mạnh.

## Việt Nam: doanh nghiệp bất động sản
Chủ đầu tư thu tiền trước của người mua theo tiến độ, ghi vào **người mua trả tiền trước** (nợ phải trả), và chỉ ghi nhận doanh thu khi **bàn giao**. Vì vậy:
- Năm mở bán mạnh: tiền về nhiều nhưng lợi nhuận thấp.
- Năm bàn giao: lợi nhuận tăng vọt nhưng tiền đã thu từ trước.

Muốn đoán lợi nhuận tương lai của họ, hãy nhìn khoản người mua trả tiền trước và tồn kho dở dang trên bảng cân đối chứ không phải lợi nhuận quá khứ.

## Thế giới: Amazon
Suốt thập niên 2000–2010 Amazon báo lợi nhuận ròng gần bằng 0 nhưng CFO tăng đều, vì họ thu tiền khách ngay và trả nhà cung cấp sau nhiều tuần. Nhà đầu tư chỉ nhìn lợi nhuận đã bỏ lỡ; người đọc dòng tiền thì không.`,
        md`## Worked numbers: one sale through three statements
A firm sells goods on credit for 100, cost 60, tax rate 20%.

| Statement | Change |
|---|---|
| Income statement | Revenue +100, COGS −60, tax −8 → net income **+32** |
| Balance sheet | Receivables +100, inventory −60, tax payable +8, retained earnings +32 |
| Cash flow | Net income +32, receivables −100, inventory +60, payables +8 → **CFO = 0** |

Profit is 32 yet cash has not moved. If the customer never pays, the 100 becomes a bad debt and the profit never existed.

## Worked numbers: growing fast and running dry
Revenue rises from 1,000 to 1,500. Receivables and inventory are 30% of revenue, payables 10%. Net working capital goes from 200 to 300, swallowing 100 of cash. If net income is only 75 (a 5% margin), CFO is negative although the firm is profitable and growing.

## Vietnam: property developers
Developers collect instalments from buyers in advance, booked as **customer advances** (a liability), and recognise revenue only at **handover**. So:
- In a strong launch year cash pours in but profit is low.
- In a handover year profit soars but the cash arrived earlier.

To forecast their profit, look at customer advances and work-in-progress inventory on the balance sheet, not at past profit.

## Global: Amazon
Through the 2000s Amazon reported near-zero net income while CFO climbed steadily, because it collected from customers at once and paid suppliers weeks later. Investors who looked only at profit missed it; cash-flow readers did not.`,
      ),
      lab: {
        kind: 'sim',
        sim: 'ratio-analyzer',
        mission: b(
          'Nhiệm vụ: chọn mẫu "Doanh nghiệp khỏe mạnh". (1) Tăng khoản phải thu thêm 300 mà không đổi gì khác: lợi nhuận đổi không? CFO và số ngày thu tiền đổi thế nào? (2) Tăng tồn kho thêm 300. (3) Giải thích bằng lời vì sao lợi nhuận đứng yên mà sức khỏe dòng tiền xấu đi.',
          'Mission: load the "Healthy company" preset. (1) Add 300 to receivables and nothing else: does profit change? What about CFO and days sales outstanding? (2) Add 300 to inventory. (3) Explain in words why profit is unchanged while cash health worsens.',
        ),
      },
      quiz: [
        {
          id: 'm4-l1-q1',
          scenario: b(
            'Một công ty báo lợi nhuận ròng 200 tỷ đồng, tăng 40%. Trong cùng năm khoản phải thu tăng 350 tỷ và tồn kho tăng 150 tỷ, khấu hao 50 tỷ, phải trả không đổi. Dòng tiền từ hoạt động kinh doanh là bao nhiêu?',
            'A company reports net income of VND 200 billion, up 40%. In the same year receivables rise 350 billion and inventory 150 billion; depreciation is 50 billion and payables are flat. What is cash flow from operations?',
          ),
          options: [
            {
              text: b('+250 tỷ', '+250 billion'),
              why: b('Đây mới chỉ cộng khấu hao, chưa trừ phần tiền bị kẹt trong vốn lưu động.', 'That only adds back depreciation and ignores cash tied up in working capital.'),
            },
            {
              text: b('−250 tỷ', '−250 billion'),
              correct: true,
              why: b('200 + 50 − 350 − 150 = −250. Lợi nhuận tăng 40% nhưng doanh nghiệp đang đốt tiền để tài trợ khách hàng và kho hàng.', '200 + 50 − 350 − 150 = −250. Profit is up 40% but the firm is burning cash to finance customers and stock.'),
            },
            {
              text: b('+200 tỷ, bằng lợi nhuận ròng', '+200 billion, equal to net income'),
              why: b('Lợi nhuận và tiền chỉ bằng nhau khi không có khoản dồn tích nào thay đổi.', 'Profit equals cash only when no accruals change.'),
            },
          ],
        },
        {
          id: 'm4-l1-q2',
          scenario: b(
            'Một chủ đầu tư bất động sản có lợi nhuận năm nay giảm 60%, nhưng khoản "người mua trả tiền trước" tăng gấp ba. Cách hiểu hợp lý nhất là gì?',
            'A property developer’s profit falls 60% this year, but "customer advances" triple. What is the most sensible reading?',
          ),
          options: [
            {
              text: b('Kinh doanh đang xấu đi nghiêm trọng', 'The business is deteriorating badly'),
              why: b('Lợi nhuận thấp chỉ phản ánh ít dự án bàn giao trong năm, không phản ánh tình hình bán hàng.', 'Low profit reflects few handovers this year, not sales momentum.'),
            },
            {
              text: b('Bán hàng tốt và doanh thu sẽ được ghi nhận trong các năm tới khi bàn giao', 'Sales are strong and revenue will be recognised in coming years at handover'),
              correct: true,
              why: b('Tiền trả trước là doanh thu tương lai nằm chờ trên bảng cân đối. Rủi ro cần kiểm tra thêm là tiến độ xây dựng và pháp lý.', 'Advances are future revenue waiting on the balance sheet. The risk to check is construction progress and permits.'),
            },
            {
              text: b('Công ty đang vay nợ nhiều hơn', 'The company is taking on more debt'),
              why: b('Tiền trả trước là nợ phải trả nhưng không chịu lãi và được tất toán bằng việc giao nhà, không phải bằng tiền.', 'Advances are liabilities but bear no interest and are settled by delivering homes, not cash.'),
            },
          ],
        },
      ],
    },
    {
      id: 'm4-l2',
      title: b('Khả năng sinh lời: ROE, DuPont và ROIC', 'Profitability: ROE, DuPont and ROIC'),
      minutes: 17,
      summary: b(
        'Hai công ty cùng ROE 20% có thể khác nhau hoàn toàn về chất lượng. Phân rã DuPont cho biết ROE đến từ đâu.',
        'Two firms with the same 20% ROE can differ completely in quality. DuPont shows where ROE comes from.',
      ),
      core: b(
        md`## Trực giác
ROE cho biết mỗi đồng vốn của cổ đông sinh ra bao nhiêu lợi nhuận. Nhưng có ba cách để đạt ROE cao: bán hàng lãi dày, quay vòng tài sản nhanh, hoặc **vay nhiều**. Hai cách đầu là năng lực; cách thứ ba là rủi ro.

## Phân rã DuPont
$$ROE = \underbrace{\frac{\text{LN ròng}}{\text{Doanh thu}}}_{\text{biên lợi nhuận}} \times \underbrace{\frac{\text{Doanh thu}}{\text{Tài sản}}}_{\text{vòng quay tài sản}} \times \underbrace{\frac{\text{Tài sản}}{\text{Vốn chủ}}}_{\text{đòn bẩy}}$$

| Mô hình kinh doanh | Biên | Vòng quay | Đòn bẩy |
|---|---|---|---|
| Hàng xa xỉ, phần mềm | Cao | Thấp | Thấp |
| Siêu thị, bán lẻ | Thấp | Cao | Trung bình |
| Ngân hàng | Trung bình | Rất thấp | Rất cao |

## ROIC: thước đo công bằng hơn
ROE bị bóp méo bởi cơ cấu vốn. **ROIC** đo hiệu quả của toàn bộ vốn đầu tư, bất kể tài trợ bằng nợ hay vốn chủ:
$$ROIC = \frac{NOPAT}{\text{Vốn đầu tư}} = \frac{EBIT \times (1 - t)}{\text{Vốn chủ} + \text{Nợ vay} - \text{Tiền}}$$

**Quy tắc tạo giá trị:** doanh nghiệp chỉ tạo giá trị khi $ROIC > WACC$. Tăng trưởng với $ROIC < WACC$ là **phá hủy giá trị**, càng lớn càng thiệt.

## Các biên lợi nhuận cần biết
- **Biên gộp:** quyền lực định giá và hiệu quả sản xuất
- **Biên EBIT:** hiệu quả vận hành
- **Biên ròng:** sau lãi vay và thuế

## Đòn bẩy là con dao hai lưỡi
Khi $ROIC$ cao hơn lãi suất vay, vay thêm làm ROE tăng. Khi kinh doanh xấu đi và $ROIC$ rơi xuống dưới lãi suất vay, đòn bẩy khuếch đại lỗ với cùng độ mạnh.

> Khi thấy ROE cao, hỏi ngay: bao nhiêu phần đến từ đòn bẩy? ROE 25% với nợ gấp 5 lần vốn chủ khác xa ROE 25% không vay nợ.`,
        md`## Intuition
ROE says how much profit each unit of shareholders' capital earns. But there are three routes to a high ROE: fat margins, fast asset turnover, or **heavy borrowing**. The first two are skill; the third is risk.

## DuPont decomposition
$$ROE = \underbrace{\frac{\text{Net income}}{\text{Revenue}}}_{\text{margin}} \times \underbrace{\frac{\text{Revenue}}{\text{Assets}}}_{\text{asset turnover}} \times \underbrace{\frac{\text{Assets}}{\text{Equity}}}_{\text{leverage}}$$

| Business model | Margin | Turnover | Leverage |
|---|---|---|---|
| Luxury, software | High | Low | Low |
| Supermarkets, retail | Low | High | Medium |
| Banks | Medium | Very low | Very high |

## ROIC: a fairer yardstick
ROE is distorted by capital structure. **ROIC** measures the return on all invested capital, however financed:
$$ROIC = \frac{NOPAT}{\text{Invested capital}} = \frac{EBIT \times (1 - t)}{\text{Equity} + \text{Debt} - \text{Cash}}$$

**The value rule:** a firm creates value only when $ROIC > WACC$. Growth with $ROIC < WACC$ **destroys value** — the bigger, the worse.

## Margins to know
- **Gross margin:** pricing power and production efficiency
- **EBIT margin:** operating efficiency
- **Net margin:** after interest and tax

## Leverage cuts both ways
When $ROIC$ exceeds the borrowing rate, more debt lifts ROE. When business sours and $ROIC$ drops below the borrowing rate, leverage magnifies losses just as strongly.

> On seeing a high ROE, ask at once: how much comes from leverage? A 25% ROE with debt at five times equity is nothing like a 25% ROE with none.`,
      ),
      examples: b(
        md`## Ví dụ số: cùng ROE, khác bản chất
| | Công ty A (thương hiệu) | Công ty B (đòn bẩy) |
|---|---|---|
| Biên lợi nhuận ròng | 20% | 5% |
| Vòng quay tài sản | 0,8 | 0,8 |
| Đòn bẩy (Tài sản / Vốn chủ) | 1,25 | 5,0 |
| **ROE** | **20%** | **20%** |

Nếu doanh thu giảm làm biên lợi nhuận của cả hai mất 4 điểm phần trăm: ROE của A còn 16%, ROE của B còn **4%**. Thêm một cú tăng lãi suất nữa là B lỗ.

## Ví dụ số: ROIC
Doanh thu 1.000, EBIT 150, thuế suất 20% → $NOPAT = 120$. Vốn chủ 400, nợ vay 300, tiền 50 → vốn đầu tư 650.
$$ROIC = \frac{120}{650} = 18{,}5\%$$
Nếu WACC là 11% thì mỗi đồng vốn tạo thêm 7,5 xu giá trị mỗi năm. Tăng trưởng lúc này rất đáng giá.

## Việt Nam: ba mô hình
- **Ngành sữa, bia:** biên gộp trên 40%, gần như không vay nợ, ROE cao nhờ thương hiệu và hệ thống phân phối. ROE này bền.
- **Bán lẻ điện máy, dược phẩm:** biên ròng chỉ 2–4% nhưng vòng quay hàng tồn kho nhanh. Rủi ro nằm ở tồn kho lỗi thời và chiến tranh giá.
- **Ngân hàng:** tài sản gấp 10–12 lần vốn chủ. ROA chỉ 1,5% đã cho ROE gần 18%. Vì vậy với ngân hàng phải nhìn chất lượng tài sản (nợ xấu) trước khi nhìn lợi nhuận.

## Thế giới: Apple và mua lại cổ phiếu
ROE của Apple vượt 150% trong những năm gần đây. Không phải vì kinh doanh tốt gấp bảy lần trước, mà vì công ty mua lại cổ phiếu quá nhiều khiến vốn chủ sở hữu trên sổ sách gần bằng 0. Khi mẫu số bị thu nhỏ nhân tạo thì ROE mất ý nghĩa; lúc đó phải dùng ROIC.`,
        md`## Worked numbers: same ROE, different nature
| | Company A (brand) | Company B (leverage) |
|---|---|---|
| Net margin | 20% | 5% |
| Asset turnover | 0.8 | 0.8 |
| Leverage (Assets / Equity) | 1.25 | 5.0 |
| **ROE** | **20%** | **20%** |

If falling sales cut both margins by four points, A's ROE is 16% and B's is **4%**. One rate rise more and B is loss-making.

## Worked numbers: ROIC
Revenue 1,000, EBIT 150, tax 20% → $NOPAT = 120$. Equity 400, debt 300, cash 50 → invested capital 650.
$$ROIC = \frac{120}{650} = 18.5\%$$
With a WACC of 11%, each unit of capital adds 7.5 cents of value a year. Growth here is very valuable.

## Vietnam: three models
- **Dairy and beer:** gross margins above 40%, almost no debt, high ROE from brand and distribution. That ROE is durable.
- **Electronics and pharmacy retail:** net margins of only 2–4% but fast inventory turns. The risks are obsolete stock and price wars.
- **Banks:** assets are 10–12 times equity. A 1.5% ROA already gives an ROE near 18%. So with banks, look at asset quality (bad debts) before profit.

## Global: Apple and buy-backs
Apple's ROE has exceeded 150% in recent years. Not because the business is seven times better, but because buy-backs have shrunk book equity to almost nothing. When the denominator is artificially small, ROE loses meaning; use ROIC instead.`,
      ),
      lab: {
        kind: 'sim',
        sim: 'ratio-analyzer',
        mission: b(
          'Nhiệm vụ: chuyển qua lại giữa mẫu "Doanh nghiệp khỏe mạnh" và "Chủ đầu tư đòn bẩy cao". So sánh ba thành phần DuPont. Với mẫu đòn bẩy cao, tăng lãi suất vay lên gấp rưỡi (tăng chi phí lãi vay): ROE và khả năng trả lãi thay đổi ra sao?',
          'Mission: switch between the "Healthy company" and "Leveraged developer" presets. Compare the three DuPont components. For the leveraged preset, raise interest expense by half: what happens to ROE and interest coverage?',
        ),
      },
      quiz: [
        {
          id: 'm4-l2-q1',
          scenario: b(
            'Trong 3 năm, ROE của một công ty tăng từ 15% lên 22%. Biên lợi nhuận ròng giảm từ 10% xuống 8%, vòng quay tài sản giữ ở 1,0, còn tỷ lệ Tài sản/Vốn chủ tăng từ 1,5 lên 2,75. Đánh giá nào đúng?',
            'Over three years a company’s ROE rises from 15% to 22%. Net margin falls from 10% to 8%, asset turnover stays at 1.0, and Assets/Equity rises from 1.5 to 2.75. Which assessment is right?',
          ),
          options: [
            {
              text: b('Hiệu quả kinh doanh cải thiện rõ rệt', 'Operating performance has clearly improved'),
              why: b('Biên lợi nhuận đang giảm, tức hoạt động cốt lõi yếu đi.', 'The margin is falling, so the core business is weakening.'),
            },
            {
              text: b('ROE tăng hoàn toàn nhờ vay nợ thêm, trong khi kinh doanh cốt lõi yếu đi; rủi ro tăng', 'ROE rose entirely through extra borrowing while the core business weakened; risk is higher'),
              correct: true,
              why: b('8% × 1,0 × 2,75 = 22%. Thành phần duy nhất tăng là đòn bẩy. Chất lượng ROE giảm.', '8% × 1.0 × 2.75 = 22%. Leverage is the only component that rose. ROE quality fell.'),
            },
            {
              text: b('Công ty sử dụng tài sản hiệu quả hơn', 'The company uses its assets more efficiently'),
              why: b('Vòng quay tài sản không đổi ở mức 1,0.', 'Asset turnover is unchanged at 1.0.'),
            },
          ],
        },
        {
          id: 'm4-l2-q2',
          scenario: b(
            'Một tập đoàn có ROIC 7% và WACC 11% công bố kế hoạch tăng gấp đôi quy mô bằng cách mở rộng chính mảng kinh doanh hiện tại. Tác động đến giá trị cổ đông là gì?',
            'A group with an ROIC of 7% and a WACC of 11% announces a plan to double in size by expanding its existing business. What is the effect on shareholder value?',
          ),
          options: [
            {
              text: b('Tích cực, vì lợi nhuận tuyệt đối sẽ tăng', 'Positive: absolute profit will rise'),
              why: b('Lợi nhuận tăng nhưng chi phí của số vốn bỏ thêm còn tăng nhiều hơn.', 'Profit rises, but the cost of the extra capital rises more.'),
            },
            {
              text: b('Tiêu cực: mỗi đồng vốn mới kiếm 7% trong khi tốn 11%, nên tăng trưởng phá hủy giá trị', 'Negative: each new unit of capital earns 7% and costs 11%, so growth destroys value'),
              correct: true,
              why: b('Tăng trưởng chỉ tạo giá trị khi ROIC > WACC. Doanh nghiệp này nên cải thiện hiệu quả hoặc trả tiền lại cho cổ đông.', 'Growth creates value only when ROIC > WACC. This firm should fix returns or hand cash back.'),
            },
            {
              text: b('Trung tính, vì quy mô không ảnh hưởng giá trị', 'Neutral: size does not affect value'),
              why: b('Quy mô có ảnh hưởng; dấu của nó phụ thuộc vào chênh lệch ROIC − WACC.', 'Size matters; its sign depends on the ROIC − WACC spread.'),
            },
          ],
        },
      ],
    },
    {
      id: 'm4-l3',
      title: b('Dòng tiền tự do và chu kỳ chuyển đổi tiền mặt', 'Free cash flow and the cash conversion cycle'),
      minutes: 16,
      summary: b(
        'Giá trị của doanh nghiệp là tiền mà nó có thể trả cho chủ sở hữu. Dòng tiền tự do đo đúng thứ đó.',
        'A business is worth the cash it can pay its owners. Free cash flow measures exactly that.',
      ),
      core: b(
        md`## Trực giác
Một quán phở lãi 50 triệu mỗi tháng nhưng tháng nào cũng phải thay bếp, sửa mặt bằng hết 50 triệu thì chủ quán không có đồng nào mang về. **Dòng tiền tự do (free cash flow)** là phần tiền còn lại sau khi đã chi để duy trì và phát triển việc kinh doanh.

## Công thức
$$FCF = CFO - \text{Capex}$$

Hai phiên bản dùng trong định giá:
$$FCFF = EBIT(1-t) + \text{Khấu hao} - \text{Capex} - \Delta NWC$$
$$FCFE = FCFF - \text{Lãi vay}(1-t) + \text{Vay ròng}$$
- **FCFF** thuộc về mọi nhà cấp vốn, chiết khấu bằng WACC.
- **FCFE** thuộc về cổ đông, chiết khấu bằng chi phí vốn chủ.

## Chất lượng lợi nhuận
$$\text{Tỷ lệ chuyển đổi tiền} = \frac{CFO}{\text{Lợi nhuận ròng}}$$
Lành mạnh khi **lớn hơn 1** qua nhiều năm (vì CFO đã cộng lại khấu hao). Dưới 1 kéo dài là dấu hỏi lớn.

## Chu kỳ chuyển đổi tiền mặt (CCC)
$$CCC = DSO + DIO - DPO$$
- $DSO = \dfrac{\text{Phải thu}}{\text{Doanh thu}} \times 365$: số ngày thu tiền
- $DIO = \dfrac{\text{Tồn kho}}{\text{Giá vốn}} \times 365$: số ngày tồn kho
- $DPO = \dfrac{\text{Phải trả}}{\text{Giá vốn}} \times 365$: số ngày trả tiền nhà cung cấp

CCC là số ngày tiền bị "giam" trong một vòng kinh doanh. CCC **âm** nghĩa là nhà cung cấp đang tài trợ cho bạn.

## Capex duy trì và capex tăng trưởng
Capex xấp xỉ khấu hao là để **duy trì**. Phần vượt lên là để **tăng trưởng**. FCF âm vì đầu tư mở rộng với ROIC cao là tin tốt; FCF âm vì capex duy trì quá nặng là mô hình kinh doanh tồi.`,
        md`## Intuition
A noodle shop earns 50 million a month but spends 50 million each month replacing stoves and fixing the premises: the owner takes nothing home. **Free cash flow** is what is left after paying to maintain and grow the business.

## Formulas
$$FCF = CFO - \text{Capex}$$

Two versions used in valuation:
$$FCFF = EBIT(1-t) + \text{D\&A} - \text{Capex} - \Delta NWC$$
$$FCFE = FCFF - \text{Interest}(1-t) + \text{Net borrowing}$$
- **FCFF** belongs to all capital providers and is discounted at WACC.
- **FCFE** belongs to shareholders and is discounted at the cost of equity.

## Earnings quality
$$\text{Cash conversion} = \frac{CFO}{\text{Net income}}$$
Healthy when **above 1** over several years (CFO adds back depreciation). Persistently below 1 is a big question mark.

## The cash conversion cycle (CCC)
$$CCC = DSO + DIO - DPO$$
- $DSO = \dfrac{\text{Receivables}}{\text{Revenue}} \times 365$: days to collect
- $DIO = \dfrac{\text{Inventory}}{\text{COGS}} \times 365$: days in stock
- $DPO = \dfrac{\text{Payables}}{\text{COGS}} \times 365$: days to pay suppliers

CCC is how many days cash is locked up in one business cycle. A **negative** CCC means suppliers finance you.

## Maintenance versus growth capex
Capex roughly equal to depreciation is **maintenance**. The excess is for **growth**. Negative FCF from high-ROIC expansion is good news; negative FCF from heavy maintenance capex is a poor business model.`,
      ),
      examples: b(
        md`## Ví dụ số: CCC
Doanh thu 3.650, giá vốn 2.920, phải thu 450, tồn kho 480, phải trả 320.
$$DSO = \frac{450}{3650}\times 365 = 45 \qquad DIO = \frac{480}{2920}\times 365 = 60 \qquad DPO = \frac{320}{2920}\times 365 = 40$$
$$CCC = 45 + 60 - 40 = 65\ \text{ngày}$$
Mỗi ngày giá vốn là 8, nên doanh nghiệp cần khoảng 520 vốn lưu động. Rút CCC xuống 45 ngày sẽ giải phóng khoảng 160 tiền mặt mà không cần vay.

## Ví dụ số: FCF
CFO 300, capex 180 (trong đó khấu hao 100):
- $FCF = 120$
- Capex duy trì ≈ 100, capex tăng trưởng ≈ 80
- FCF trước tăng trưởng ≈ 200: đây mới là sức sinh tiền của hoạt động hiện hữu.

## Việt Nam: bán lẻ và sản xuất
- **Chuỗi bán lẻ lớn** thu tiền mặt ngay (DSO gần 0) và trả nhà cung cấp sau 30–60 ngày, nên CCC thấp. Mở thêm cửa hàng gần như được nhà cung cấp tài trợ.
- **Doanh nghiệp xây dựng, thầu phụ** có DSO thường trên 150 ngày vì chủ đầu tư chậm thanh toán. Lợi nhuận trên giấy nhưng phải vay ngắn hạn để trả lương. Đây là nhóm dễ vỡ nhất khi tín dụng thắt.
- **Thép, phân bón:** tồn kho nguyên liệu 2–3 tháng. Khi giá hàng hóa quay đầu, họ vừa lỗ tồn kho vừa kẹt tiền.

## Thế giới
- **Costco, Walmart:** CCC gần 0 hoặc âm.
- **Tesla 2017–2018:** capex gấp nhiều lần CFO, FCF âm nhiều tỷ USD và công ty sát bờ phá sản. Khi nhà máy Model 3 chạy ổn, FCF chuyển dương và cổ phiếu tăng hơn mười lần. Bài học: phải phân biệt đốt tiền để xây năng lực với đốt tiền để tồn tại.`,
        md`## Worked numbers: CCC
Revenue 3,650, COGS 2,920, receivables 450, inventory 480, payables 320.
$$DSO = \frac{450}{3650}\times 365 = 45 \qquad DIO = \frac{480}{2920}\times 365 = 60 \qquad DPO = \frac{320}{2920}\times 365 = 40$$
$$CCC = 45 + 60 - 40 = 65\ \text{days}$$
Daily COGS is 8, so the firm needs about 520 of working capital. Cutting the CCC to 45 days frees about 160 of cash without borrowing.

## Worked numbers: FCF
CFO 300, capex 180 (depreciation is 100):
- $FCF = 120$
- Maintenance capex ≈ 100, growth capex ≈ 80
- FCF before growth ≈ 200 — the true cash power of the existing business.

## Vietnam: retail versus production
- **Large retail chains** collect cash at once (DSO near zero) and pay suppliers after 30–60 days, so CCC is low. New stores are almost supplier-financed.
- **Construction contractors** often have DSO above 150 days because developers pay late. Paper profits, but short-term borrowing to pay wages. They are the most fragile when credit tightens.
- **Steel and fertiliser:** two to three months of raw-material stock. When commodity prices turn, they take inventory losses and a cash squeeze together.

## Global
- **Costco, Walmart:** CCC near zero or negative.
- **Tesla 2017–2018:** capex was several times CFO, FCF was billions negative and the firm came close to bankruptcy. Once the Model 3 line ran smoothly FCF turned positive and the stock rose more than tenfold. Lesson: tell burning cash to build capacity from burning cash to survive.`,
      ),
      lab: {
        kind: 'python',
        mission: b(
          'Đây là 5 năm số liệu của một công ty hư cấu có lợi nhuận tăng đều. Chạy code và tìm năm mà "câu chuyện" bắt đầu rạn nứt. Chỉ số nào báo động sớm nhất: CFO/Lợi nhuận, DSO hay FCF? Viết kết luận của bạn thành 3 câu.',
          'Here are five years of a fictional company with steadily rising profit. Run the code and find the year the story starts to crack. Which gauge warns first: CFO to net income, DSO or FCF? Write your conclusion in three sentences.',
        ),
        code: py`# Earnings quality check on a fictional company (VND billion)
fin = pd.DataFrame({
    'year':        [2020, 2021, 2022, 2023, 2024],
    'revenue':     [1000, 1250, 1600, 2050, 2600],
    'cogs':        [ 700,  875, 1130, 1470, 1890],
    'net_income':  [  80,  105,  140,  185,  240],
    'depreciation':[  30,   36,   45,   58,   72],
    'receivables': [ 120,  170,  290,  480,  760],
    'inventory':   [ 140,  180,  260,  390,  560],
    'payables':    [ 100,  125,  150,  170,  180],
    'capex':       [  50,   70,  110,  160,  220],
    'debt':        [ 150,  180,  300,  520,  830],
})

nwc = fin.receivables + fin.inventory - fin.payables
fin['cfo'] = fin.net_income + fin.depreciation - nwc.diff().fillna(0)
fin['fcf'] = fin.cfo - fin.capex
fin['cfo_to_ni'] = fin.cfo / fin.net_income
fin['dso'] = fin.receivables / fin.revenue * 365
fin['dio'] = fin.inventory / fin.cogs * 365
fin['dpo'] = fin.payables / fin.cogs * 365
fin['ccc'] = fin.dso + fin.dio - fin.dpo
fin['rev_growth'] = fin.revenue.pct_change() * 100
fin['recv_growth'] = fin.receivables.pct_change() * 100

cols = ['year', 'net_income', 'cfo', 'fcf', 'cfo_to_ni', 'dso', 'dio', 'dpo', 'ccc', 'debt']
print(fin[cols].round(1).to_string(index=False))

print("\nRevenue growth vs receivables growth (%):")
print(fin[['year', 'rev_growth', 'recv_growth']].round(0).iloc[1:].to_string(index=False))

print(f"\n5-year cumulative net income: {fin.net_income.sum():.0f}")
print(f"5-year cumulative free cash flow: {fin.fcf.iloc[1:].sum():.0f}  <- who financed the gap? Debt rose by {fin.debt.iloc[-1] - fin.debt.iloc[0]}")

chart(fin.year, {'Net income': fin.net_income, 'CFO': fin.cfo, 'FCF': fin.fcf},
      title='Profit vs cash (VND bn)', xlabel='Year')
chart(fin.year, {'DSO': fin.dso, 'DIO': fin.dio, 'CCC': fin.ccc}, title='Working-capital days', xlabel='Year')
`,
      },
      quiz: [
        {
          id: 'm4-l3-q1',
          scenario: b(
            'Công ty X có lợi nhuận ròng 5 năm cộng lại là 1.000 tỷ đồng, nhưng tổng dòng tiền tự do cùng kỳ là −600 tỷ và nợ vay tăng 1.400 tỷ. Capex chỉ xấp xỉ khấu hao. Kết luận nào hợp lý nhất?',
            'Company X has cumulative net income of VND 1,000 billion over five years, but cumulative free cash flow of −600 billion while debt rose 1,400 billion. Capex is roughly equal to depreciation. What is the most reasonable conclusion?',
          ),
          options: [
            {
              text: b('Công ty đang đầu tư mạnh cho tương lai', 'The company is investing heavily for the future'),
              why: b('Capex chỉ ngang khấu hao nên không có đầu tư mở rộng. Tiền mất ở chỗ khác.', 'Capex only matches depreciation, so there is no expansion. The cash is going elsewhere.'),
            },
            {
              text: b('Lợi nhuận không chuyển thành tiền: tiền kẹt trong phải thu và tồn kho, được tài trợ bằng nợ', 'Profit is not turning into cash: it is stuck in receivables and inventory, financed by debt'),
              correct: true,
              why: b('Khoảng cách 1.600 tỷ giữa lợi nhuận và FCF phải nằm trong vốn lưu động. Đây là mô hình của nhiều vụ đổ vỡ.', 'The 1,600 billion gap between profit and FCF must sit in working capital — the pattern behind many failures.'),
            },
            {
              text: b('Không có vấn đề gì vì công ty vẫn có lãi', 'No problem; the company is still profitable'),
              why: b('Doanh nghiệp phá sản vì hết tiền chứ không phải vì hết lợi nhuận kế toán.', 'Firms go bankrupt from lack of cash, not lack of accounting profit.'),
            },
          ],
        },
        {
          id: 'm4-l3-q2',
          scenario: b(
            'Một chuỗi siêu thị có DSO 3 ngày, DIO 30 ngày và DPO 55 ngày. Điều này có ý nghĩa gì khi chuỗi mở rộng nhanh?',
            'A supermarket chain has DSO of 3 days, DIO of 30 and DPO of 55. What does this imply as it expands fast?',
          ),
          options: [
            {
              text: b('CCC = −22 ngày: tăng trưởng tự tạo ra tiền vì nhà cung cấp tài trợ hàng tồn kho', 'CCC = −22 days: growth generates cash because suppliers finance the stock'),
              correct: true,
              why: b('3 + 30 − 55 = −22. Chuỗi thu tiền của khách trước khi phải trả nhà cung cấp, nên doanh thu càng tăng tiền càng dồi dào.', '3 + 30 − 55 = −22. The chain collects from shoppers before paying suppliers, so more sales mean more cash.'),
            },
            {
              text: b('CCC = 88 ngày: chuỗi cần vay rất nhiều để mở rộng', 'CCC = 88 days: the chain must borrow heavily to expand'),
              why: b('DPO phải được trừ đi chứ không cộng vào.', 'DPO is subtracted, not added.'),
            },
            {
              text: b('Chuỗi đang gặp khó khăn thanh toán vì trả chậm nhà cung cấp', 'The chain is in payment trouble because it pays suppliers late'),
              why: b('DPO dài ở nhà bán lẻ lớn thường phản ánh sức mạnh đàm phán. Chỉ đáng lo nếu nó tăng đột ngột kèm tiền mặt cạn.', 'A long DPO at a big retailer usually reflects bargaining power. Worry only if it jumps while cash runs low.'),
            },
          ],
        },
      ],
    },
    {
      id: 'm4-l4',
      title: b('Dấu hiệu cảnh báo kế toán', 'Accounting red flags'),
      minutes: 18,
      summary: b(
        'Gian lận hiếm khi xuất hiện đột ngột. Nó để lại dấu vết trong các tỷ lệ nhiều năm trước khi sụp đổ.',
        'Fraud rarely appears overnight. It leaves tracks in the ratios years before the collapse.',
      ),
      core: b(
        md`## Trực giác
Ban lãnh đạo có động cơ làm đẹp lợi nhuận: lương thưởng, giá cổ phiếu, điều kiện vay nợ. Chuẩn mực kế toán cho phép nhiều lựa chọn ước tính, và ranh giới giữa "tích cực" và "gian lận" khá mờ. Việc của nhà phân tích không phải là chứng minh gian lận, mà là **nhận ra khi rủi ro không còn xứng với giá**.

## Bảy dấu hiệu cảnh báo kinh điển
1. **Phải thu tăng nhanh hơn doanh thu** nhiều kỳ liên tiếp: ghi nhận doanh thu sớm hoặc nới điều kiện bán chịu.
2. **CFO thấp hơn lợi nhuận ròng** kéo dài.
3. **Tồn kho tăng nhanh hơn giá vốn:** hàng ế, hoặc vốn hóa chi phí vào tồn kho.
4. **Vốn hóa chi phí** (lãi vay, chi phí phát triển) thay vì ghi vào chi phí trong kỳ.
5. **Giao dịch với bên liên quan** lớn và phức tạp; các khoản "phải thu khác", "đầu tư khác" phình to.
6. **Nợ ngắn hạn tài trợ tài sản dài hạn:** lệch pha kỳ hạn.
7. **Thu nhập bất thường lặp lại**, thay đổi chính sách kế toán, đổi kiểm toán viên, ý kiến kiểm toán ngoại trừ.

## Các tỷ lệ an toàn tài chính
$$\text{Nợ vay ròng} / EBITDA \qquad \text{Khả năng trả lãi} = \frac{EBIT}{\text{Lãi vay}} \qquad \text{Thanh toán hiện hành} = \frac{\text{TS ngắn hạn}}{\text{Nợ ngắn hạn}}$$
Khả năng trả lãi dưới **1,5 lần** là vùng nguy hiểm: một năm kinh doanh xấu là không đủ trả lãi.

## Altman Z-score
$$Z = 1{,}2\frac{WC}{TA} + 1{,}4\frac{RE}{TA} + 3{,}3\frac{EBIT}{TA} + 0{,}6\frac{MVE}{TL} + 1{,}0\frac{Sales}{TA}$$
$Z < 1{,}81$: vùng kiệt quệ. $Z > 2{,}99$: vùng an toàn. (Mô hình gốc xây cho doanh nghiệp sản xuất.)

> Một dấu hiệu đơn lẻ chưa nói lên điều gì. Ba dấu hiệu cùng lúc, cộng với ban lãnh đạo né tránh câu hỏi, là lúc nên rời đi. Bạn không cần chắc chắn có gian lận để quyết định không đầu tư.`,
        md`## Intuition
Managers have reasons to flatter profit: bonuses, the share price, loan covenants. Accounting standards allow many estimates, and the line between "aggressive" and "fraudulent" is blurry. The analyst's job is not to prove fraud but to **notice when the risk is no longer worth the price**.

## Seven classic red flags
1. **Receivables growing faster than revenue** for several periods: early revenue recognition or looser credit terms.
2. **CFO persistently below net income.**
3. **Inventory growing faster than COGS:** unsold goods, or costs capitalised into stock.
4. **Capitalising expenses** (interest, development costs) instead of expensing them.
5. Large, complex **related-party transactions**; swelling "other receivables" and "other investments".
6. **Short-term debt funding long-term assets:** a maturity mismatch.
7. **Recurring "one-off" gains**, accounting-policy changes, auditor switches, qualified audit opinions.

## Solvency ratios
$$\text{Net debt} / EBITDA \qquad \text{Interest coverage} = \frac{EBIT}{\text{Interest}} \qquad \text{Current ratio} = \frac{\text{Current assets}}{\text{Current liabilities}}$$
Interest coverage below **1.5 times** is the danger zone: one bad year and interest cannot be paid.

## Altman Z-score
$$Z = 1.2\frac{WC}{TA} + 1.4\frac{RE}{TA} + 3.3\frac{EBIT}{TA} + 0.6\frac{MVE}{TL} + 1.0\frac{Sales}{TA}$$
$Z < 1.81$: distress zone. $Z > 2.99$: safe zone. (The original model was built for manufacturers.)

> A single flag says little. Three at once, plus managers dodging questions, is the moment to leave. You do not need to be sure of fraud to decide not to invest.`,
      ),
      examples: b(
        md`## Thế giới: bốn vụ kinh điển
| Vụ việc | Thủ thuật | Dấu hiệu nhìn thấy trước |
|---|---|---|
| **Enron (2001)** | Giấu nợ trong các pháp nhân ngoài bảng; ghi nhận ngay lợi nhuận của hợp đồng 20 năm | CFO thấp xa lợi nhuận; thuyết minh bên liên quan không ai hiểu nổi |
| **WorldCom (2002)** | Vốn hóa 3,8 tỷ USD chi phí thuê đường truyền thành tài sản | Capex trên doanh thu tăng bất thường trong khi cả ngành cắt giảm |
| **Wirecard (2020)** | 1,9 tỷ EUR tiền mặt "gửi ở châu Á" không tồn tại | Lợi nhuận đến từ đối tác bên thứ ba không kiểm chứng được |
| **Luckin Coffee (2020)** | Khai khống doanh số cửa hàng | Doanh thu mỗi cửa hàng cao phi lý so với lượng khách đếm thực tế |

Điểm chung: người phát hiện đều bắt đầu từ **báo cáo lưu chuyển tiền tệ và thuyết minh**, không phải từ lợi nhuận.

## Ví dụ số: lệch pha kỳ hạn
Một chủ đầu tư có 100 tài sản, trong đó 70 là dự án dở dang phải 3–5 năm mới bán được. Nguồn vốn gồm 20 vốn chủ, 45 nợ ngắn hạn dưới 12 tháng và 35 nợ khác. Thanh toán hiện hành trên giấy vẫn trên 1 vì dự án dở dang được xếp vào tài sản ngắn hạn. Nhưng nếu loại tồn kho ra:
$$\text{Thanh toán nhanh} = \frac{30 - \text{tồn kho}}{45} \ll 1$$
Chỉ cần thị trường trái phiếu đóng lại 6 tháng là mất khả năng thanh toán, dù tài sản vẫn lớn hơn nợ.

## Việt Nam 2022: trái phiếu doanh nghiệp bất động sản
Nhiều chủ đầu tư phát hành trái phiếu riêng lẻ kỳ hạn 1–3 năm để tài trợ dự án cần 5–7 năm, một số có giao dịch chằng chịt với công ty liên quan. Khi thị trường trái phiếu đóng băng cuối năm 2022, họ phải bán tháo tài sản và xin giãn nợ. Các dấu hiệu đã nằm sẵn trong báo cáo: tồn kho và phải thu khác chiếm phần lớn tài sản, CFO âm nhiều năm, nợ ngắn hạn cao.

## Việt Nam: các vụ chênh lệch sau kiểm toán
Không hiếm trường hợp lợi nhuận tự lập là lãi, sau kiểm toán thành lỗ, thường do trích lập dự phòng phải thu và tồn kho. Hãy tập thói quen so báo cáo tự lập với báo cáo kiểm toán, và đọc kỹ đoạn "cơ sở của ý kiến ngoại trừ".`,
        md`## Global: four classics
| Case | The trick | The flag visible beforehand |
|---|---|---|
| **Enron (2001)** | Debt hidden in off-balance-sheet entities; 20 years of contract profit booked up front | CFO far below profit; related-party notes nobody could follow |
| **WorldCom (2002)** | USD 3.8 billion of line costs capitalised as assets | Capex to revenue rose oddly while the industry was cutting |
| **Wirecard (2020)** | EUR 1.9 billion of cash "held in Asia" did not exist | Profit came from unverifiable third-party partners |
| **Luckin Coffee (2020)** | Fabricated store sales | Revenue per store implausible against actual customer counts |

The common thread: those who caught them started from the **cash-flow statement and the notes**, not from profit.

## Worked numbers: a maturity mismatch
A developer has 100 of assets, 70 of them projects that take 3–5 years to sell. Funding is 20 of equity, 45 of debt due within 12 months and 35 of other liabilities. The current ratio still looks above 1 because unfinished projects count as current assets. Strip out inventory:
$$\text{Quick ratio} = \frac{30 - \text{inventory}}{45} \ll 1$$
If the bond market closes for six months the firm is illiquid, even though assets exceed liabilities.

## Vietnam 2022: property corporate bonds
Many developers issued privately placed bonds of 1–3 years to fund projects needing 5–7, some with tangled dealings with related companies. When the bond market froze in late 2022 they had to dump assets and seek extensions. The flags were already in the accounts: inventory and other receivables dominating assets, years of negative CFO, heavy short-term debt.

## Vietnam: post-audit swings
It is not rare for self-reported profit to become a loss after audit, usually through provisions on receivables and inventory. Make a habit of comparing unaudited with audited accounts, and read the "basis for qualified opinion" paragraph closely.`,
      ),
      lab: {
        kind: 'sim',
        sim: 'ratio-analyzer',
        mission: b(
          'Nhiệm vụ: chọn mẫu "Tăng trưởng nóng, dòng tiền yếu" và liệt kê mọi cảnh báo mà công cụ nêu. Sau đó tự chỉnh số liệu để xóa từng cảnh báo một: cần thay đổi điều gì trong hoạt động kinh doanh thật để làm được việc đó? Cuối cùng mở mẫu "Chủ đầu tư đòn bẩy cao" và đối chiếu với Case Study Evergrande.',
          'Mission: load "Hot growth, weak cash" and list every warning the tool raises. Then edit the numbers to clear the warnings one by one: what would have to change in the real business to do that? Finally load "Leveraged developer" and compare it with the Evergrande case study.',
        ),
      },
      quiz: [
        {
          id: 'm4-l4-q1',
          scenario: b(
            'Doanh thu của một công ty tăng 20% mỗi năm trong 3 năm. Cùng kỳ phải thu tăng 55% mỗi năm, CFO âm cả ba năm, và khoản "phải thu khác từ bên liên quan" tăng từ 2% lên 18% tổng tài sản. Hành động hợp lý nhất của nhà phân tích là gì?',
            'A company’s revenue grows 20% a year for three years. Meanwhile receivables grow 55% a year, CFO is negative all three years, and "other receivables from related parties" rise from 2% to 18% of total assets. What should an analyst do?',
          ),
          options: [
            {
              text: b('Khuyến nghị mua vì tăng trưởng doanh thu ổn định', 'Recommend buying on steady revenue growth'),
              why: b('Doanh thu không thu được tiền thì chưa chắc là doanh thu thật.', 'Revenue that is never collected may not be real revenue.'),
            },
            {
              text: b('Coi đây là cụm dấu hiệu cảnh báo nghiêm trọng: yêu cầu giải trình, định giá thận trọng hoặc đứng ngoài', 'Treat it as a serious cluster of flags: demand explanations, value conservatively or stay out'),
              correct: true,
              why: b('Ba dấu hiệu cùng lúc: phải thu vượt doanh thu, CFO âm kéo dài, tiền chảy sang bên liên quan. Không cần chứng minh gian lận để từ chối rủi ro.', 'Three flags at once: receivables outpacing sales, persistently negative CFO, cash flowing to related parties. You need not prove fraud to decline the risk.'),
            },
            {
              text: b('Kết luận chắc chắn công ty gian lận và tố cáo', 'Conclude the company is certainly fraudulent and report it'),
              why: b('Dấu hiệu cảnh báo là xác suất, không phải bằng chứng. Có thể công ty chỉ đang bán chịu liều lĩnh.', 'Red flags are probabilities, not proof. The firm may merely be extending reckless credit.'),
            },
          ],
        },
        {
          id: 'm4-l4-q2',
          scenario: b(
            'Công ty A có tổng tài sản lớn hơn tổng nợ 30%, nhưng 60% nợ đáo hạn trong 9 tháng tới và tài sản chủ yếu là đất dự án chưa hoàn tất pháp lý. Thị trường vốn đang đóng băng. Rủi ro chính là gì?',
            'Company A’s assets exceed its liabilities by 30%, but 60% of its debt matures within nine months and its assets are mostly land awaiting permits. Capital markets are frozen. What is the main risk?',
          ),
          options: [
            {
              text: b('Không có rủi ro vì tài sản lớn hơn nợ', 'None; assets exceed liabilities'),
              why: b('Có khả năng thanh toán dài hạn (solvent) không cứu được nếu mất thanh khoản (illiquid) trước.', 'Being solvent does not help if you become illiquid first.'),
            },
            {
              text: b('Rủi ro thanh khoản: không đảo được nợ nên phải bán tháo tài sản với giá chiết khấu sâu, biến khủng hoảng thanh khoản thành mất khả năng trả nợ', 'Liquidity risk: unable to roll debt, it must fire-sell assets at deep discounts, turning illiquidity into insolvency'),
              correct: true,
              why: b('Lệch pha kỳ hạn là kẻ giết người thầm lặng. Giá trị sổ sách của tài sản khó bán không trả được nợ đến hạn.', 'A maturity mismatch is the silent killer. The book value of illiquid assets cannot repay debt falling due.'),
            },
            {
              text: b('Rủi ro tỷ giá', 'Currency risk'),
              why: b('Đề bài không nêu nợ ngoại tệ; vấn đề ở đây là kỳ hạn.', 'No foreign-currency debt is mentioned; the issue is maturity.'),
            },
          ],
        },
      ],
    },
  ],
};

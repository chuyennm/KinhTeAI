import { b, type Module } from '../../types';

const md = String.raw;
const py = String.raw;

export const m5: Module = {
  id: 'm5',
  index: 5,
  title: b('Tài chính Doanh nghiệp & Định giá Tài sản', 'Corporate Finance & Valuation'),
  subtitle: b(
    'Giá trị của mọi tài sản là dòng tiền tương lai chiết khấu về hiện tại. Phần còn lại là chi tiết và sự khiêm tốn.',
    'Every asset is worth its future cash flows discounted to today. The rest is detail and humility.',
  ),
  outcome: b(
    'Tự dựng một mô hình DCF đơn giản, ước tính WACC, kiểm tra chéo bằng P/E và EV/EBITDA, và nói được giá thị trường đang ngầm giả định điều gì.',
    'Build a simple DCF, estimate WACC, cross-check with P/E and EV/EBITDA, and say what the market price is implicitly assuming.',
  ),
  tool: 'dcf',
  capstone: b(
    'Định giá một doanh nghiệp niêm yết bằng DCF và một phương pháp so sánh. Ghi rõ 3 giả định quan trọng nhất, khoảng giá trị (không phải một con số), và tăng trưởng ngầm định trong giá thị trường hiện tại.',
    'Value a listed company with a DCF and one multiple. State your three key assumptions, a value range (not a single number), and the growth implied by today’s market price.',
  ),
  lessons: [
    {
      id: 'm5-l1',
      title: b('Giá trị thời gian của tiền', 'The time value of money'),
      minutes: 15,
      summary: b(
        'Một đồng hôm nay đáng giá hơn một đồng ngày mai. Lãi kép là cỗ máy mạnh nhất trong tài chính.',
        'A dong today is worth more than a dong tomorrow. Compounding is the most powerful machine in finance.',
      ),
      core: b(
        md`## Trực giác
Một đồng hôm nay có thể đem gửi để sinh lãi, và tương lai luôn có rủi ro. Vì vậy một đồng nhận sau phải được **chiết khấu**.

## Công thức nền tảng
$$FV = PV(1+r)^n \qquad PV = \frac{FV}{(1+r)^n}$$

**Dòng tiền đều (annuity)** $C$ trong $n$ kỳ:
$$PV = C \cdot \frac{1 - (1+r)^{-n}}{r}$$

**Dòng tiền vĩnh viễn tăng trưởng (growing perpetuity):**
$$PV = \frac{C_1}{r - g} \qquad (r > g)$$

**NPV và IRR:**
$$NPV = \sum_{t=0}^{n} \frac{CF_t}{(1+r)^t} \qquad IRR: \; NPV(IRR) = 0$$
Chấp nhận dự án khi $NPV > 0$, tức $IRR > r$.

## Ba điều trực giác hay đánh lừa
1. **Lãi kép tăng theo hàm mũ.** 10%/năm trong 30 năm là gấp 17,4 lần, không phải gấp 4.
2. **Lãi suất danh nghĩa và hiệu dụng:** 12%/năm ghép lãi hàng tháng là $(1{,}01)^{12} - 1 = 12{,}68\%$.
3. **Phần lớn giá trị của dòng tiền vĩnh viễn nằm ở xa.** Với $r = 10\%$, $g = 5\%$, dòng tiền sau năm thứ 10 chiếm khoảng 60% giá trị. Đó là lý do định giá cổ phiếu tăng trưởng rất nhạy với lãi suất.`,
        md`## Intuition
A dong today can earn interest, and the future is always risky. So a dong received later must be **discounted**.

## Core formulas
$$FV = PV(1+r)^n \qquad PV = \frac{FV}{(1+r)^n}$$

A level **annuity** $C$ for $n$ periods:
$$PV = C \cdot \frac{1 - (1+r)^{-n}}{r}$$

A **growing perpetuity:**
$$PV = \frac{C_1}{r - g} \qquad (r > g)$$

**NPV and IRR:**
$$NPV = \sum_{t=0}^{n} \frac{CF_t}{(1+r)^t} \qquad IRR: \; NPV(IRR) = 0$$
Accept a project when $NPV > 0$, i.e. $IRR > r$.

## Three ways intuition misleads
1. **Compounding is exponential.** 10% a year for 30 years is 17.4 times, not 4.
2. **Nominal versus effective rates:** 12% a year compounded monthly is $(1.01)^{12} - 1 = 12.68\%$.
3. **Most of a perpetuity's value lies far out.** With $r = 10\%$ and $g = 5\%$, cash after year 10 is about 60% of the value. That is why growth-stock valuations are so rate-sensitive.`,
      ),
      examples: b(
        md`## Vay mua nhà 2 tỷ đồng, 20 năm
Lãi suất 10%/năm, trả đều hàng tháng ($r = 0{,}833\%$, $n = 240$):
$$C = \frac{2.000.000.000 \times 0{,}00833}{1 - 1{,}00833^{-240}} \approx 19{,}3\ \text{triệu/tháng}$$
Tổng trả khoảng **4,63 tỷ**, tức tiền lãi nhiều hơn tiền gốc. Nếu lãi suất thả nổi lên 13%, khoản trả tăng lên khoảng 23,4 triệu, tăng 21%. Đây là cách tăng lãi suất truyền thẳng vào ví hộ gia đình.

## Tiết kiệm hưu trí
Tiết kiệm 5 triệu mỗi tháng trong 30 năm:
- Lợi suất 4%/năm: khoảng **3,5 tỷ**
- Lợi suất 10%/năm: khoảng **11,3 tỷ**

Chênh lệch 6 điểm phần trăm lợi suất tạo ra chênh lệch gần 8 tỷ. Bắt đầu sớm 10 năm còn quan trọng hơn tìm được lợi suất cao.

## Dự án: NPV và IRR
Đầu tư 1.000 hôm nay, thu 300 mỗi năm trong 5 năm. Chi phí vốn 10%:
$$NPV = -1000 + 300 \times 3{,}791 = +137 \qquad IRR \approx 15{,}2\%$$
Dự án đáng làm. Nhưng nếu chi phí vốn lên 16% thì NPV âm: cùng một dự án, kết luận đổi theo lãi suất.`,
        md`## A VND 2 billion, 20-year mortgage
At 10% a year with monthly payments ($r = 0.833\%$, $n = 240$):
$$C = \frac{2{,}000{,}000{,}000 \times 0.00833}{1 - 1.00833^{-240}} \approx 19.3\ \text{million a month}$$
Total paid is about **4.63 billion** — more interest than principal. If the floating rate goes to 13%, the payment rises to about 23.4 million, up 21%. That is how rate hikes reach household wallets directly.

## Saving for retirement
Saving 5 million a month for 30 years:
- At 4% a year: about **3.5 billion**
- At 10% a year: about **11.3 billion**

Six points of return make an 8-billion difference. Starting ten years earlier matters even more than finding higher returns.

## A project: NPV and IRR
Invest 1,000 today and receive 300 a year for five years. Cost of capital 10%:
$$NPV = -1000 + 300 \times 3.791 = +137 \qquad IRR \approx 15.2\%$$
Worth doing. At a 16% cost of capital NPV turns negative: same project, a different verdict as rates change.`,
      ),
      lab: {
        kind: 'python',
        mission: b(
          'Chạy code rồi tự trả lời: (1) Khoản vay nhà của bạn (thay số thật) mất bao nhiêu tiền lãi? (2) Tìm IRR bằng cách tự viết vòng lặp tìm nghiệm, không dùng thư viện. (3) Với dòng tiền vĩnh viễn, bao nhiêu % giá trị nằm sau năm 10 khi r = 8% và g = 6%?',
          'Run the code and answer: (1) How much interest does your mortgage (use real numbers) cost? (2) Find the IRR with your own root-finding loop, no library. (3) For a growing perpetuity, what share of value lies beyond year 10 when r = 8% and g = 6%?',
        ),
        code: py`# Time value of money toolkit
import numpy as np

def annuity_payment(principal, annual_rate, years, per_year=12):
    r = annual_rate / per_year
    n = years * per_year
    return principal * r / (1 - (1 + r) ** -n)

loan = 2_000_000_000
for rate in [0.08, 0.10, 0.13]:
    pmt = annuity_payment(loan, rate, 20)
    print(f"Mortgage {rate:.0%}: {pmt / 1e6:6.2f} million/month, total interest {(pmt * 240 - loan) / 1e9:.2f} billion")

def npv(rate, cfs):
    return sum(cf / (1 + rate) ** t for t, cf in enumerate(cfs))

def irr(cfs, lo=-0.99, hi=1.0, tol=1e-7):
    for _ in range(200):                 # bisection
        mid = (lo + hi) / 2
        if npv(lo, cfs) * npv(mid, cfs) <= 0:
            hi = mid
        else:
            lo = mid
        if hi - lo < tol:
            break
    return mid

project = [-1000, 300, 300, 300, 300, 300]
print(f"\nNPV at 10% = {npv(0.10, project):.1f}   IRR = {irr(project):.2%}")

rates = np.linspace(0.02, 0.25, 24)
chart(rates * 100, [npv(r, project) for r in rates], title='NPV profile', xlabel='Discount rate (%)', ylabel='NPV')

# Where does a growing perpetuity's value sit?
r, g, c1 = 0.10, 0.05, 100
total = c1 / (r - g)
first10 = sum(c1 * (1 + g) ** (t - 1) / (1 + r) ** t for t in range(1, 11))
print(f"\nPerpetuity value {total:.0f}; first 10 years = {first10 / total:.0%}, after year 10 = {1 - first10 / total:.0%}")

years = np.arange(0, 31)
chart(years, {'4%': 100 * 1.04 ** years, '7%': 100 * 1.07 ** years, '10%': 100 * 1.10 ** years},
      title='Growth of 100 at different rates', xlabel='Years')
`,
      },
      quiz: [
        {
          id: 'm5-l1-q1',
          scenario: b(
            'Lãi suất chiết khấu tăng từ 8% lên 10%. Tài sản nào giảm giá trị nhiều nhất theo tỷ lệ phần trăm?',
            'The discount rate rises from 8% to 10%. Which asset loses the most value in percentage terms?',
          ),
          options: [
            {
              text: b('Khoản nhận 1.000 sau 1 năm', 'A payment of 1,000 in one year'),
              why: b('Chỉ giảm khoảng 1,8%: dòng tiền gần ít bị ảnh hưởng.', 'Only about 1.8%: near cash flows are barely affected.'),
            },
            {
              text: b('Cổ phiếu tăng trưởng có dòng tiền vĩnh viễn tăng 6%/năm', 'A growth stock with cash flows growing 6% a year forever'),
              correct: true,
              why: b('C/(r − g): mẫu số từ 2% lên 4%, giá trị giảm một nửa. Dòng tiền càng xa càng nhạy với lãi suất.', 'C/(r − g): the denominator goes from 2% to 4%, halving the value. The further out the cash, the more rate-sensitive.'),
            },
            {
              text: b('Trái phiếu 5 năm', 'A five-year bond'),
              why: b('Giảm khoảng 8%, nhiều hơn khoản 1 năm nhưng ít hơn nhiều so với dòng tiền vĩnh viễn tăng trưởng.', 'About 8%: more than the one-year payment, far less than a growing perpetuity.'),
            },
          ],
        },
        {
          id: 'm5-l1-q2',
          scenario: b(
            'Dự án A: IRR 30%, quy mô 100 triệu. Dự án B: IRR 18%, quy mô 10 tỷ. Chi phí vốn 12%, chỉ chọn được một. Nên chọn theo tiêu chí nào?',
            'Project A: IRR 30%, size 100 million. Project B: IRR 18%, size 10 billion. Cost of capital 12%; only one can be chosen. Which criterion decides?',
          ),
          options: [
            {
              text: b('IRR cao hơn, nên chọn A', 'The higher IRR: choose A'),
              why: b('IRR là tỷ lệ, không phải lượng giá trị tạo ra. A tạo ra rất ít tiền tuyệt đối.', 'IRR is a rate, not an amount of value. A creates very little in absolute terms.'),
            },
            {
              text: b('NPV cao hơn, nhiều khả năng là B', 'The higher NPV: most likely B'),
              correct: true,
              why: b('NPV đo giá trị tăng thêm cho chủ sở hữu bằng tiền. Khi dự án loại trừ nhau, NPV thắng IRR.', 'NPV measures the value added to owners in money. For mutually exclusive projects NPV beats IRR.'),
            },
            {
              text: b('Thời gian hoàn vốn ngắn hơn', 'The shorter payback period'),
              why: b('Thời gian hoàn vốn bỏ qua giá trị thời gian và dòng tiền sau mốc hoàn vốn.', 'Payback ignores the time value of money and cash flows after the payback date.'),
            },
          ],
        },
      ],
    },
    {
      id: 'm5-l2',
      title: b('Chi phí vốn: CAPM và WACC', 'The cost of capital: CAPM and WACC'),
      minutes: 17,
      summary: b(
        'Lãi suất chiết khấu không phải con số tùy chọn. Nó là lợi suất mà nhà đầu tư đòi hỏi để chịu đúng rủi ro đó.',
        'The discount rate is not a free choice. It is the return investors demand for bearing exactly that risk.',
      ),
      core: b(
        md`## Trực giác
Chi phí vốn là **chi phí cơ hội**: nếu cổ đông có thể kiếm 14% ở một khoản đầu tư rủi ro tương đương, doanh nghiệp phải kiếm được ít nhất 14% trên tiền của họ.

## Chi phí vốn chủ sở hữu: CAPM
$$k_e = r_f + \beta \times ERP + CRP$$
- $r_f$: lợi suất phi rủi ro (trái phiếu chính phủ dài hạn)
- $\beta$: độ nhạy của cổ phiếu với thị trường
- $ERP$: phần bù rủi ro vốn cổ phần (equity risk premium), thường 4–6% ở thị trường phát triển
- $CRP$: phần bù rủi ro quốc gia, nếu $r_f$ lấy từ thị trường khác

Chỉ rủi ro **hệ thống** (không đa dạng hóa được) mới được trả công. Rủi ro riêng của một công ty có thể triệt tiêu bằng đa dạng hóa nên không làm tăng $k_e$.

## Chi phí bình quân gia quyền: WACC
$$WACC = \frac{E}{D+E}\,k_e + \frac{D}{D+E}\,k_d\,(1-t)$$
Nợ rẻ hơn vốn chủ vì chủ nợ được trả trước và lãi vay được **khấu trừ thuế**.

## Vì sao không vay thật nhiều để hạ WACC
Vay thêm thì $\beta$ vốn chủ tăng (đòn bẩy làm lợi nhuận cổ đông biến động hơn) và $k_d$ tăng (rủi ro vỡ nợ). Đến một mức nào đó WACC tăng trở lại. **Beta có đòn bẩy:**
$$\beta_L = \beta_U\left[1 + (1-t)\frac{D}{E}\right]$$

> Sai 1 điểm phần trăm WACC có thể làm sai giá trị 15–25%. Luôn trình bày kết quả dưới dạng ma trận độ nhạy.`,
        md`## Intuition
The cost of capital is an **opportunity cost**: if shareholders could earn 14% elsewhere at similar risk, the firm must earn at least 14% on their money.

## Cost of equity: CAPM
$$k_e = r_f + \beta \times ERP + CRP$$
- $r_f$: the risk-free rate (a long government bond)
- $\beta$: the stock's sensitivity to the market
- $ERP$: the equity risk premium, typically 4–6% in developed markets
- $CRP$: a country risk premium, if $r_f$ comes from another market

Only **systematic** (undiversifiable) risk is rewarded. Company-specific risk can be diversified away, so it does not raise $k_e$.

## The weighted average cost of capital: WACC
$$WACC = \frac{E}{D+E}\,k_e + \frac{D}{D+E}\,k_d\,(1-t)$$
Debt is cheaper than equity because lenders are paid first and interest is **tax-deductible**.

## Why not borrow heavily to cut WACC?
More debt raises equity beta (leverage makes shareholder returns more volatile) and raises $k_d$ (default risk). Beyond some point WACC rises again. **Levered beta:**
$$\beta_L = \beta_U\left[1 + (1-t)\frac{D}{E}\right]$$

> One point of WACC error can move value by 15–25%. Always present results as a sensitivity matrix.`,
      ),
      examples: b(
        md`## Ví dụ số: một doanh nghiệp Việt Nam
- Lợi suất trái phiếu Chính phủ 10 năm: **3,0%**
- Phần bù rủi ro thị trường Việt Nam (đã gồm rủi ro quốc gia): **8,0%**
- Beta: **1,1**
- Chi phí vay trước thuế **8,5%**, thuế suất thu nhập doanh nghiệp **20%**
- Cơ cấu vốn theo giá thị trường: **30% nợ, 70% vốn chủ**

$$k_e = 3{,}0\% + 1{,}1 \times 8{,}0\% = 11{,}8\%$$
$$WACC = 0{,}7 \times 11{,}8\% + 0{,}3 \times 8{,}5\% \times 0{,}8 = 8{,}26\% + 2{,}04\% = 10{,}3\%$$

## Lãi suất phi rủi ro thay đổi thì sao
Từ năm 2021 đến 2023, lợi suất trái phiếu Mỹ 10 năm tăng từ khoảng 1,5% lên gần 5%. Với cùng beta và ERP, WACC của mọi doanh nghiệp Mỹ tăng khoảng 3 điểm phần trăm. Cổ phiếu công nghệ không lợi nhuận, vốn có dòng tiền rất xa, giảm 60–80%. Không cần kinh doanh xấu đi; chỉ mẫu số thay đổi.

## Những lỗi thường gặp
- Dùng **giá trị sổ sách** thay vì giá trị thị trường cho trọng số.
- Dùng beta lịch sử của cổ phiếu ít thanh khoản (beta thấp giả tạo).
- Quên thêm rủi ro quốc gia khi dùng $r_f$ của Mỹ cho doanh nghiệp Việt Nam.
- Dùng cùng một WACC cho mọi dự án dù rủi ro khác nhau.`,
        md`## Worked numbers: a Vietnamese company
- 10-year government bond yield: **3.0%**
- Vietnam market risk premium (country risk included): **8.0%**
- Beta: **1.1**
- Pre-tax cost of debt **8.5%**, corporate tax **20%**
- Market-value capital structure: **30% debt, 70% equity**

$$k_e = 3.0\% + 1.1 \times 8.0\% = 11.8\%$$
$$WACC = 0.7 \times 11.8\% + 0.3 \times 8.5\% \times 0.8 = 8.26\% + 2.04\% = 10.3\%$$

## When the risk-free rate moves
From 2021 to 2023 the US 10-year yield rose from about 1.5% to nearly 5%. With unchanged beta and ERP, every US company's WACC rose about three points. Unprofitable tech stocks, with very distant cash flows, fell 60–80%. The business did not have to worsen; only the denominator changed.

## Common mistakes
- Using **book values** instead of market values for the weights.
- Using the historical beta of an illiquid stock (artificially low).
- Forgetting country risk when using a US $r_f$ for a Vietnamese company.
- Applying one WACC to every project regardless of risk.`,
      ),
      lab: {
        kind: 'sim',
        sim: 'dcf',
        mission: b(
          'Nhiệm vụ: trong khung WACC, tăng tỷ trọng nợ từ 30% lên 60% nhưng KHÔNG đổi beta. WACC giảm và giá trị tăng, đúng không? Bây giờ tự tính beta có đòn bẩy mới bằng công thức trong bài và nhập vào. Kết quả còn hấp dẫn nữa không? Đó là cái bẫy "nợ rẻ".',
          'Mission: in the WACC panel raise debt weight from 30% to 60% but DO NOT change beta. WACC falls and value rises, right? Now compute the new levered beta with the formula from the lesson and enter it. Is the result still attractive? That is the "cheap debt" trap.',
        ),
      },
      quiz: [
        {
          id: 'm5-l2-q1',
          scenario: b(
            'Một công ty dược có rủi ro riêng rất cao (kết quả thử nghiệm lâm sàng nhị phân) nhưng doanh thu gần như không liên quan đến chu kỳ kinh tế. Theo CAPM, chi phí vốn chủ của nó thế nào?',
            'A biotech has very high company-specific risk (binary trial results) but revenue almost unrelated to the business cycle. Under CAPM, what is its cost of equity?',
          ),
          options: [
            {
              text: b('Rất cao, vì cổ phiếu biến động mạnh', 'Very high, because the stock is volatile'),
              why: b('Biến động do rủi ro riêng có thể đa dạng hóa nên CAPM không trả công cho nó.', 'Volatility from specific risk is diversifiable, so CAPM does not reward it.'),
            },
            {
              text: b('Tương đối thấp, vì beta thấp; rủi ro riêng nên được phản ánh trong dòng tiền theo xác suất', 'Relatively low, because beta is low; specific risk belongs in probability-weighted cash flows'),
              correct: true,
              why: b('Cách làm đúng: ước tính dòng tiền kỳ vọng theo xác suất thành công thay vì cộng thêm phần bù tùy tiện vào lãi suất chiết khấu.', 'The right approach: probability-weight the cash flows by success odds instead of padding the discount rate.'),
            },
            {
              text: b('Bằng lãi suất phi rủi ro', 'Equal to the risk-free rate'),
              why: b('Chỉ đúng nếu beta bằng 0 tuyệt đối.', 'Only if beta is exactly zero.'),
            },
          ],
        },
        {
          id: 'm5-l2-q2',
          scenario: b(
            'Lợi suất trái phiếu chính phủ tăng 2 điểm phần trăm, mọi thứ khác giữ nguyên. Nhóm cổ phiếu nào chịu tác động định giá lớn nhất?',
            'Government bond yields rise two points, all else equal. Which group of stocks takes the biggest valuation hit?',
          ),
          options: [
            {
              text: b('Ngân hàng có lợi nhuận hiện tại cao, cổ tức đều', 'Banks with high current earnings and steady dividends'),
              why: b('Dòng tiền gần, và biên lãi ròng của ngân hàng còn có thể hưởng lợi từ lãi suất cao hơn.', 'Near-term cash, and bank margins may even benefit from higher rates.'),
            },
            {
              text: b('Công ty công nghệ chưa có lãi, kỳ vọng lợi nhuận lớn sau 10 năm', 'Unprofitable tech firms expecting big profits in ten years'),
              correct: true,
              why: b('Dòng tiền xa có "duration" dài nhất, nên nhạy nhất với lãi suất chiết khấu.', 'Distant cash flows have the longest "duration" and so the greatest rate sensitivity.'),
            },
            {
              text: b('Như nhau với mọi cổ phiếu', 'The same for every stock'),
              why: b('Mức độ phụ thuộc vào thời điểm phát sinh dòng tiền.', 'It depends on when the cash flows arrive.'),
            },
          ],
        },
      ],
    },
    {
      id: 'm5-l3',
      title: b('Mô hình chiết khấu dòng tiền (DCF)', 'Discounted cash flow (DCF) modelling'),
      minutes: 20,
      summary: b(
        'DCF không dự báo tương lai. Nó buộc bạn nói rõ các giả định và cho biết giá thị trường đang ngầm tin vào điều gì.',
        'A DCF does not predict the future. It forces you to state assumptions and reveals what the market price implicitly believes.',
      ),
      core: b(
        md`## Cấu trúc một mô hình DCF
1. **Dự phóng FCFF** 5–10 năm: doanh thu, biên EBIT, thuế, tái đầu tư.
2. **Giá trị cuối kỳ (terminal value)** theo mô hình tăng trưởng Gordon:
$$TV_n = \frac{FCFF_{n+1}}{WACC - g}$$
3. **Chiết khấu** mọi dòng tiền về hiện tại bằng WACC → **giá trị doanh nghiệp (EV)**.
4. **Cầu nối sang vốn chủ:** $\text{Giá trị vốn chủ} = EV - \text{Nợ vay} + \text{Tiền} - \text{Lợi ích thiểu số}$.
5. Chia cho số cổ phiếu → **giá trị nội tại mỗi cổ phiếu**.

## Tái đầu tư và tăng trưởng nhất quán
Tăng trưởng không miễn phí:
$$g = \text{Tỷ lệ tái đầu tư} \times ROIC \quad\Rightarrow\quad \text{Tỷ lệ tái đầu tư} = \frac{g}{ROIC}$$
Mô hình giả định tăng trưởng 8% mà không trích tiền tái đầu tư là mô hình sai.

## Các quy tắc giữ cho mô hình trung thực
- $g$ dài hạn **không vượt** tăng trưởng GDP danh nghĩa dài hạn (khoảng 2–4% với Mỹ, 4–6% với Việt Nam).
- Kiểm tra tỷ trọng terminal value: nếu trên **75%** giá trị, kết quả gần như chỉ phản ánh giả định cuối kỳ.
- Kiểm tra bội số ngầm định: TV chia EBITDA năm cuối có hợp lý so với ngành không?

## DCF ngược (reverse DCF)
Thay vì hỏi "công ty đáng giá bao nhiêu", hãy hỏi: **"giá hiện tại đòi hỏi tăng trưởng bao nhiêu?"** Đây là cách dùng DCF mạnh nhất, vì nó biến cuộc tranh luận thành câu hỏi có thể kiểm chứng.`,
        md`## Structure of a DCF
1. **Forecast FCFF** for 5–10 years: revenue, EBIT margin, tax, reinvestment.
2. **Terminal value** with the Gordon growth model:
$$TV_n = \frac{FCFF_{n+1}}{WACC - g}$$
3. **Discount** all cash flows at WACC → **enterprise value (EV)**.
4. **Bridge to equity:** $\text{Equity value} = EV - \text{Debt} + \text{Cash} - \text{Minority interests}$.
5. Divide by shares → **intrinsic value per share**.

## Consistent reinvestment and growth
Growth is not free:
$$g = \text{Reinvestment rate} \times ROIC \quad\Rightarrow\quad \text{Reinvestment rate} = \frac{g}{ROIC}$$
A model assuming 8% growth with no reinvestment is wrong.

## Rules that keep a model honest
- Long-run $g$ must **not exceed** long-run nominal GDP growth (about 2–4% for the US, 4–6% for Vietnam).
- Check the terminal-value share: above **75%** of value, the result mostly reflects the terminal assumption.
- Check the implied multiple: is TV over final-year EBITDA sensible against the industry?

## Reverse DCF
Instead of "what is the company worth?", ask **"what growth does today's price require?"** This is the most powerful use of a DCF, because it turns a debate into a testable question.`,
      ),
      examples: b(
        md`## Ví dụ số: DCF 5 năm
Doanh thu năm gốc 10.000 tỷ, tăng 12%/năm, biên EBIT 15%, thuế 20%, tái đầu tư bằng 40% NOPAT, WACC 11%, $g$ dài hạn 4%. Nợ ròng 3.000 tỷ, 500 triệu cổ phiếu.

| Năm | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Doanh thu | 11.200 | 12.544 | 14.049 | 15.735 | 17.623 |
| NOPAT | 1.344 | 1.505 | 1.686 | 1.888 | 2.115 |
| FCFF | 806 | 903 | 1.012 | 1.133 | 1.269 |
| Hệ số chiết khấu | 0,901 | 0,812 | 0,731 | 0,659 | 0,593 |

- Giá trị hiện tại của 5 năm ≈ **3.700 tỷ**
- $TV_5 = 1.269 \times 1{,}04 / (0{,}11 - 0{,}04) \approx 18.854$, quy về hiện tại ≈ **11.190 tỷ**
- $EV \approx 14.890$, giá trị vốn chủ ≈ 11.890 tỷ → khoảng **23.800 đồng/cổ phiếu**
- Terminal value chiếm **75%** EV: mức cảnh báo.

## Độ nhạy
Cùng mô hình, đổi WACC và $g$:
| | g = 3% | g = 4% | g = 5% |
|---|---|---|---|
| WACC 10% | ≈ 24.800 | ≈ 28.900 | ≈ 34.700 |
| WACC 11% | ≈ 20.800 | ≈ 23.800 | ≈ 27.800 |
| WACC 12% | ≈ 17.700 | ≈ 19.900 | ≈ 22.800 |

Khoảng giá trị là **17.700–34.700**, tức gần gấp đôi từ đầu này sang đầu kia. Ai đưa ra một con số chính xác đến hàng đơn vị là đang giả vờ.

## DCF ngược
Nếu cổ phiếu đang giao dịch 40.000 đồng, mô hình cần tăng trưởng khoảng 23%/năm trong 5 năm với cùng biên lợi nhuận. Câu hỏi đầu tư trở thành: *doanh nghiệp có thể tăng trưởng 23%/năm không?*`,
        md`## Worked numbers: a five-year DCF
Base-year revenue VND 10,000 billion growing 12% a year, EBIT margin 15%, tax 20%, reinvestment 40% of NOPAT, WACC 11%, long-run $g$ 4%. Net debt 3,000 billion, 500 million shares.

| Year | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Revenue | 11,200 | 12,544 | 14,049 | 15,735 | 17,623 |
| NOPAT | 1,344 | 1,505 | 1,686 | 1,888 | 2,115 |
| FCFF | 806 | 903 | 1,012 | 1,133 | 1,269 |
| Discount factor | 0.901 | 0.812 | 0.731 | 0.659 | 0.593 |

- PV of five years ≈ **3,700 billion**
- $TV_5 = 1{,}269 \times 1.04 / (0.11 - 0.04) \approx 18{,}854$, worth ≈ **11,190 billion** today
- $EV \approx 14{,}890$, equity ≈ 11,890 billion → about **VND 23,800 a share**
- Terminal value is **75%** of EV: the warning level.

## Sensitivity
Same model, varying WACC and $g$:
| | g = 3% | g = 4% | g = 5% |
|---|---|---|---|
| WACC 10% | ≈ 24,800 | ≈ 28,900 | ≈ 34,700 |
| WACC 11% | ≈ 20,800 | ≈ 23,800 | ≈ 27,800 |
| WACC 12% | ≈ 17,700 | ≈ 19,900 | ≈ 22,800 |

The value range is **17,700–34,700** — nearly double from one end to the other. Anyone quoting a figure to the last dong is pretending.

## Reverse DCF
If the stock trades at 40,000, the model needs about 23% annual growth for five years at the same margin. The investment question becomes: *can this business grow 23% a year?*`,
      ),
      lab: {
        kind: 'sim',
        sim: 'dcf',
        mission: b(
          'Nhiệm vụ: (1) Nhập giá thị trường 40.000 và dùng nút "DCF ngược" để tìm tăng trưởng ngầm định. (2) Đặt tăng trưởng 20% nhưng giữ tỷ lệ tái đầu tư 40%: kiểm tra ROIC ngầm định mà công cụ báo. Có khả thi không? (3) Ghi khoảng giá trị (không phải một con số) vào Sổ tay.',
          'Mission: (1) Enter a market price of 40,000 and use "Reverse DCF" to find the implied growth. (2) Set growth to 20% but keep reinvestment at 40%: check the implied ROIC the tool reports. Is it plausible? (3) Record a value range (not one number) in the Journal.',
        ),
      },
      quiz: [
        {
          id: 'm5-l3-q1',
          scenario: b(
            'Mô hình DCF của bạn cho kết quả 85% giá trị nằm ở terminal value, với giả định tăng trưởng dài hạn 7% cho một doanh nghiệp Mỹ. Vấn đề chính là gì?',
            'Your DCF puts 85% of value in the terminal value, assuming 7% perpetual growth for a US company. What is the main problem?',
          ),
          options: [
            {
              text: b('Không có vấn đề, terminal value luôn lớn', 'No problem; terminal value is always large'),
              why: b('Lớn là bình thường, nhưng 85% cùng g vượt tăng trưởng GDP danh nghĩa dài hạn là dấu hiệu mô hình bị thổi phồng.', 'Large is normal; 85% with g above long-run nominal GDP signals an inflated model.'),
            },
            {
              text: b('g = 7% vĩnh viễn vượt tăng trưởng danh nghĩa của nền kinh tế, ngầm định công ty cuối cùng lớn hơn cả nước Mỹ', 'Perpetual g of 7% exceeds the economy’s nominal growth, implying the firm eventually outgrows America'),
              correct: true,
              why: b('Hạ g về 3–4% và kéo dài giai đoạn tăng trưởng cao nếu cần, thay vì nhồi vào terminal value.', 'Cut g to 3–4% and extend the high-growth stage if needed, instead of loading the terminal value.'),
            },
            {
              text: b('Nên dùng lãi suất chiết khấu thấp hơn', 'Use a lower discount rate'),
              why: b('Hạ WACC còn làm terminal value lớn hơn nữa.', 'A lower WACC makes the terminal value even larger.'),
            },
          ],
        },
        {
          id: 'm5-l3-q2',
          scenario: b(
            'Một nhà phân tích định giá một chuỗi bán lẻ ở mức 50.000 đồng với tăng trưởng 15%/năm, nhưng giả định tái đầu tư bằng 0 vì "công ty đã có đủ cửa hàng". Lỗi logic là gì?',
            'An analyst values a retail chain at VND 50,000 with 15% growth, but assumes zero reinvestment because "it already has enough stores". What is the logical error?',
          ),
          options: [
            {
              text: b('Tăng trưởng 15% đòi hỏi tái đầu tư bằng g/ROIC; giả định bằng 0 là đếm lợi ích tăng trưởng mà không trả chi phí', 'Growth of 15% requires reinvestment of g/ROIC; assuming zero counts the benefit of growth without its cost'),
              correct: true,
              why: b('Với ROIC 20%, tăng 15% cần tái đầu tư 75% NOPAT. FCF thực thấp hơn nhiều so với mô hình.', 'With a 20% ROIC, 15% growth needs 75% of NOPAT reinvested. True FCF is far lower than modelled.'),
            },
            {
              text: b('Nên dùng P/E thay cho DCF', 'Use P/E instead of DCF'),
              why: b('Đổi phương pháp không sửa được giả định thiếu nhất quán.', 'Switching methods does not fix an inconsistent assumption.'),
            },
            {
              text: b('Không có lỗi vì cửa hàng cũ có thể tăng doanh số', 'No error; existing stores can grow sales'),
              why: b('Tăng doanh số cùng cửa hàng vẫn cần thêm hàng tồn kho và vốn lưu động, và hiếm khi duy trì được 15%/năm.', 'Same-store growth still needs inventory and working capital, and rarely sustains 15% a year.'),
            },
          ],
        },
      ],
    },
    {
      id: 'm5-l4',
      title: b('Định giá tương đối: P/E, EV/EBITDA, P/B', 'Relative valuation: P/E, EV/EBITDA, P/B'),
      minutes: 16,
      summary: b(
        'Bội số là DCF được nén thành một con số. Hiểu nó được tạo từ đâu thì mới so sánh đúng được.',
        'A multiple is a DCF compressed into one number. Know what it is made of, or you will compare the wrong things.',
      ),
      core: b(
        md`## Ba bội số chính
| Bội số | Dùng khi | Không nên dùng khi |
|---|---|---|
| **P/E** | Lợi nhuận ổn định, cơ cấu vốn tương tự | Lỗ, lợi nhuận bất thường, đòn bẩy khác biệt |
| **EV/EBITDA** | So sánh các công ty có cơ cấu nợ khác nhau, ngành thâm dụng vốn | Capex rất khác nhau giữa các công ty |
| **P/B** | Ngân hàng, bảo hiểm, công ty tài sản | Doanh nghiệp tài sản vô hình (phần mềm, thương hiệu) |

## Bội số đến từ đâu
Từ mô hình Gordon, với tỷ lệ chi trả cổ tức $(1-b)$:
$$\frac{P}{E} = \frac{(1-b)(1+g)}{k_e - g} \quad\text{với}\quad g = b \times ROE$$
$$\frac{P}{B} = \frac{ROE - g}{k_e - g}$$

Hệ quả quan trọng:
- **P/E cao** được biện minh bởi tăng trưởng cao **và** ROE cao **và** rủi ro thấp.
- **P/B > 1** chỉ hợp lý khi $ROE > k_e$. Ngân hàng có ROE 10% và chi phí vốn 14% đáng được giao dịch **dưới** giá trị sổ sách.

## Quy trình định giá tương đối
1. Chọn nhóm so sánh thật sự tương đồng (mô hình kinh doanh, quy mô, thị trường).
2. Dùng **trung vị** thay vì bình quân để tránh ngoại lệ.
3. **Điều chỉnh** theo khác biệt về tăng trưởng và ROE (hồi quy bội số theo các yếu tố cơ bản).
4. Tự hỏi: **cả ngành có đang bị định giá sai không?** So sánh tương đối không bảo vệ bạn khỏi bong bóng.

> "Cổ phiếu này rẻ vì P/E chỉ 6" là câu nói thiếu một nửa. Phải hỏi tiếp: rẻ so với cái gì, và thị trường đang lo điều gì?`,
        md`## The three main multiples
| Multiple | Use when | Avoid when |
|---|---|---|
| **P/E** | Stable earnings, similar capital structures | Losses, one-off profits, differing leverage |
| **EV/EBITDA** | Comparing firms with different debt, capital-heavy industries | Capex differs widely between firms |
| **P/B** | Banks, insurers, asset-heavy firms | Intangible-asset businesses (software, brands) |

## Where multiples come from
From the Gordon model, with payout ratio $(1-b)$:
$$\frac{P}{E} = \frac{(1-b)(1+g)}{k_e - g} \quad\text{with}\quad g = b \times ROE$$
$$\frac{P}{B} = \frac{ROE - g}{k_e - g}$$

Key consequences:
- A **high P/E** is justified by high growth **and** high ROE **and** low risk.
- **P/B > 1** makes sense only when $ROE > k_e$. A bank earning a 10% ROE with a 14% cost of equity deserves to trade **below** book.

## The relative-valuation process
1. Pick a truly comparable peer group (business model, size, market).
2. Use the **median**, not the mean, to avoid outliers.
3. **Adjust** for differences in growth and ROE (regress multiples on fundamentals).
4. Ask: **is the whole sector mispriced?** Relative valuation does not protect you from a bubble.

> "This stock is cheap at a P/E of 6" is half a sentence. Ask next: cheap relative to what, and what is the market worried about?`,
      ),
      examples: b(
        md`## Ví dụ số: P/B hợp lý của ngân hàng
Chi phí vốn chủ 14%, tăng trưởng dài hạn 8%.
| ROE | P/B hợp lý |
|---|---|
| 10% | (10 − 8)/(14 − 8) = **0,33** |
| 14% | **1,00** |
| 20% | (20 − 8)/(14 − 8) = **2,00** |

Ở Việt Nam, các ngân hàng có ROE trên 20% thường được giao dịch với P/B 1,5–2,5 lần, còn ngân hàng ROE thấp hoặc có nợ xấu tiềm ẩn thì dưới 1 lần. Thị trường đang làm đúng phép tính này.

## Ví dụ số: EV/EBITDA tránh bẫy đòn bẩy
| | Công ty A | Công ty B |
|---|---|---|
| Vốn hóa | 8.000 | 8.000 |
| Nợ ròng | 0 | 6.000 |
| EBITDA | 1.600 | 1.600 |
| Lợi nhuận ròng | 1.000 | 600 |
| **P/E** | 8,0 | 13,3 |
| **EV/EBITDA** | 5,0 | 8,75 |

Nhìn P/E, B có vẻ đắt vì lãi vay ăn mòn lợi nhuận. Nhìn EV/EBITDA, B thực sự đắt hơn A nhiều vì người mua B còn phải gánh 6.000 nợ.

## Bẫy giá trị (value trap)
Năm 2021 nhiều cổ phiếu thép Việt Nam có P/E chỉ 4–5 lần khi giá thép đỉnh. Năm sau lợi nhuận lao dốc, một số công ty lỗ. **P/E thấp nhất thường xuất hiện ở đỉnh chu kỳ** của ngành hàng hóa, vì lợi nhuận đỉnh không lặp lại. Với ngành chu kỳ, hãy dùng lợi nhuận bình quân cả chu kỳ.`,
        md`## Worked numbers: a bank's fair P/B
Cost of equity 14%, long-run growth 8%.
| ROE | Fair P/B |
|---|---|
| 10% | (10 − 8)/(14 − 8) = **0.33** |
| 14% | **1.00** |
| 20% | (20 − 8)/(14 − 8) = **2.00** |

In Vietnam banks with ROEs above 20% often trade at 1.5–2.5 times book, while low-ROE banks or those with hidden bad debts trade below 1. The market is doing this arithmetic.

## Worked numbers: EV/EBITDA avoids the leverage trap
| | Company A | Company B |
|---|---|---|
| Market cap | 8,000 | 8,000 |
| Net debt | 0 | 6,000 |
| EBITDA | 1,600 | 1,600 |
| Net income | 1,000 | 600 |
| **P/E** | 8.0 | 13.3 |
| **EV/EBITDA** | 5.0 | 8.75 |

On P/E, B looks expensive because interest eats its profit. On EV/EBITDA, B is truly much dearer than A, since a buyer of B also takes on 6,000 of debt.

## The value trap
In 2021 many Vietnamese steel stocks traded at P/Es of only 4–5 at peak steel prices. A year later profits collapsed and some firms made losses. **The lowest P/E often appears at the top of a commodity cycle**, because peak profits do not recur. For cyclicals use average through-the-cycle earnings.`,
      ),
      lab: {
        kind: 'python',
        mission: b(
          'Chạy hồi quy P/E theo tăng trưởng và ROE trên 10 công ty hư cấu. Công ty nào "rẻ" nhất sau khi đã điều chỉnh theo yếu tố cơ bản? Nó có trùng với công ty có P/E thấp nhất không? Vì sao điều đó quan trọng?',
          'Regress P/E on growth and ROE across ten fictional companies. Which is "cheapest" after adjusting for fundamentals? Is it the one with the lowest raw P/E? Why does that matter?',
        ),
        code: py`# Relative valuation: adjust multiples for fundamentals
peers = load('peers')
print(peers.to_string(index=False))

print(f"\nMedian P/E {peers.pe.median():.1f}   median EV/EBITDA {peers.ev_ebitda.median():.1f}   median P/B {peers.pb.median():.1f}")

print("\n=== P/E explained by growth and ROE ===")
model = ols(peers.pe, peers[['growth', 'roe']])

peers['fair_pe'] = model['coef'][0] + model['coef'][1] * peers.growth + model['coef'][2] * peers.roe
peers['discount'] = (peers.pe / peers.fair_pe - 1) * 100
ranked = peers.sort_values('discount')[['ticker', 'pe', 'fair_pe', 'discount', 'growth', 'roe', 'net_debt_ebitda']]
print("\nCheapest relative to fundamentals (negative = trades below fair P/E):")
print(ranked.round(1).to_string(index=False))

chart(peers.growth, peers.pe, kind='scatter', fit=True, title='P/E vs expected growth', xlabel='Growth (%)', ylabel='P/E')

# Justified P/B for a bank
ke, g = 0.14, 0.08
for roe in [0.10, 0.14, 0.20, 0.25]:
    print(f"ROE {roe:.0%}: justified P/B = {(roe - g) / (ke - g):.2f}")
`,
      },
      quiz: [
        {
          id: 'm5-l4-q1',
          scenario: b(
            'Ngân hàng X có ROE 9%, chi phí vốn chủ ước tính 14%, và đang giao dịch ở P/B 1,2 lần. Một môi giới nói "rẻ vì P/B gần 1". Đánh giá nào đúng?',
            'Bank X has an ROE of 9%, an estimated cost of equity of 14%, and trades at 1.2 times book. A broker says "cheap, P/B is near 1". Which assessment is right?',
          ),
          options: [
            {
              text: b('Đồng ý, P/B 1,2 là thấp với một ngân hàng', 'Agree; 1.2 is low for a bank'),
              why: b('P/B thấp hay cao chỉ có nghĩa khi so với ROE và chi phí vốn.', 'A P/B is low or high only relative to ROE and the cost of capital.'),
            },
            {
              text: b('Đắt: ROE thấp hơn chi phí vốn nên P/B hợp lý phải dưới 1', 'Expensive: ROE is below the cost of equity, so fair P/B should be below 1'),
              correct: true,
              why: b('Ngân hàng đang phá hủy giá trị trên mỗi đồng vốn giữ lại; trả 1,2 lần sổ sách là trả cao.', 'The bank destroys value on each retained dong; paying 1.2 times book overpays.'),
            },
            {
              text: b('Không đủ thông tin để nói gì', 'There is not enough information to say anything'),
              why: b('ROE và chi phí vốn là đủ để kết luận về chiều hướng.', 'ROE and the cost of equity are enough to judge the direction.'),
            },
          ],
        },
        {
          id: 'm5-l4-q2',
          scenario: b(
            'Ở đỉnh chu kỳ giá phân bón, một công ty phân bón có P/E 4 lần, thấp nhất 10 năm. Rủi ro chính khi mua dựa trên con số này là gì?',
            'At the top of the fertiliser price cycle, a fertiliser maker trades at a P/E of 4, its lowest in ten years. What is the main risk in buying on that number?',
          ),
          options: [
            {
              text: b('Lợi nhuận đỉnh chu kỳ sẽ không lặp lại; P/E trên lợi nhuận bình thường hóa có thể cao gấp nhiều lần', 'Peak-cycle profit will not recur; P/E on normalised earnings may be several times higher'),
              correct: true,
              why: b('Với ngành chu kỳ, P/E thấp thường là tín hiệu bán, P/E cao lúc đáy thường là tín hiệu mua.', 'For cyclicals a low P/E is often a sell signal and a high P/E at the trough often a buy.'),
            },
            {
              text: b('Không có rủi ro, P/E 4 là quá rẻ', 'No risk; a P/E of 4 is too cheap to lose'),
              why: b('Nếu lợi nhuận giảm 75%, P/E 4 trở thành 16 ngay lập tức.', 'If profit falls 75%, a P/E of 4 becomes 16 overnight.'),
            },
            {
              text: b('Rủi ro thanh khoản cổ phiếu', 'Share liquidity risk'),
              why: b('Có thể có, nhưng không phải rủi ro chính trong lập luận định giá này.', 'Possibly, but not the main flaw in this valuation argument.'),
            },
          ],
        },
      ],
    },
  ],
};

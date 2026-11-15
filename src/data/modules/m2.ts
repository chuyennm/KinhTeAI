import { b, type Module } from '../../types';

const md = String.raw;
const py = String.raw;

export const m2: Module = {
  id: 'm2',
  index: 2,
  title: b('Kinh tế Vĩ mô & Chính sách Tiền tệ', 'Macroeconomics & Monetary Policy'),
  subtitle: b(
    'Tăng trưởng, lạm phát, việc làm và cách ngân hàng trung ương điều khiển chu kỳ.',
    'Growth, inflation, jobs and how central banks steer the cycle.',
  ),
  outcome: b(
    'Đọc một bản tin GDP, CPI hay quyết định lãi suất và giải thích được nó nghĩa là gì cho tín dụng, tỷ giá và giá tài sản trong 12–18 tháng tới.',
    'Read a GDP print, a CPI release or a rate decision and explain what it means for credit, the currency and asset prices over the next 12–18 months.',
  ),
  tool: 'central-bank',
  capstone: b(
    'Viết luận điểm về hướng đi lãi suất điều hành của NHNN trong 12 tháng tới: dữ liệu nào ủng hộ, Fed và tỷ giá ràng buộc thế nào, và dữ kiện nào sẽ chứng minh bạn sai.',
    'Write a thesis on the direction of the SBV policy rate over the next 12 months: which data support it, how the Fed and the exchange rate constrain it, and what evidence would prove you wrong.',
  ),
  lessons: [
    {
      id: 'm2-l1',
      title: b('GDP thực và GDP danh nghĩa', 'Real versus nominal GDP'),
      minutes: 15,
      summary: b(
        'GDP tăng 10% có thể là tin tốt hoặc chỉ là giá tăng. Tách "lượng" khỏi "giá" là kỹ năng vĩ mô đầu tiên.',
        'GDP up 10% may be good news or just higher prices. Separating volume from price is the first macro skill.',
      ),
      core: b(
        md`## Trực giác
GDP là tổng giá trị hàng hóa và dịch vụ cuối cùng một nền kinh tế tạo ra trong một kỳ. Giống doanh thu của một cửa hàng: doanh thu tăng có thể do bán **nhiều hàng hơn** hoặc do **tăng giá**. Chỉ vế đầu mới làm đời sống khá lên.

## Công thức
Theo phía chi tiêu:
$$Y = C + I + G + (X - M)$$
- $C$ tiêu dùng hộ gia đình, $I$ đầu tư, $G$ chi tiêu chính phủ, $X - M$ xuất khẩu ròng.

Tách giá và lượng:
$$\text{GDP thực} = \frac{\text{GDP danh nghĩa}}{\text{Chỉ số giảm phát (deflator)}} \qquad 1+g_{thực} = \frac{1+g_{danh\,nghĩa}}{1+\pi}$$

Xấp xỉ nhanh: tăng trưởng thực ≈ tăng trưởng danh nghĩa − lạm phát.

## Những điều cần nhớ khi đọc số liệu
- **So cùng kỳ (YoY)** và **so quý trước quy năm (QoQ annualized)** là hai con số rất khác nhau. Mỹ công bố kiểu thứ hai, Việt Nam công bố kiểu thứ nhất.
- **GDP bình quân đầu người** và **ngang giá sức mua (PPP)** mới cho biết mức sống.
- **Quy tắc 70:** số năm để quy mô tăng gấp đôi ≈ $70 / g$. Tăng 7%/năm thì gấp đôi sau 10 năm; 2,5%/năm thì mất 28 năm.

## GDP không đo được gì
Phân phối thu nhập, khu vực phi chính thức, chất lượng môi trường, và việc tăng trưởng đến từ năng suất hay từ vay nợ. Câu hỏi bậc 2 luôn là: *tăng trưởng này được tài trợ bằng gì?*`,
        md`## Intuition
GDP is the total value of final goods and services an economy produces in a period. Think of a shop's revenue: it can rise because the shop sells **more** or because it **raises prices**. Only the first makes people better off.

## Formulas
From the expenditure side:
$$Y = C + I + G + (X - M)$$
- $C$ household consumption, $I$ investment, $G$ government spending, $X - M$ net exports.

Separating price and volume:
$$\text{Real GDP} = \frac{\text{Nominal GDP}}{\text{Deflator}} \qquad 1+g_{real} = \frac{1+g_{nominal}}{1+\pi}$$

Quick approximation: real growth ≈ nominal growth − inflation.

## Reading the numbers
- **Year-on-year (YoY)** and **quarter-on-quarter annualised** are very different figures. The US reports the latter, Vietnam the former.
- **GDP per capita** and **purchasing-power parity (PPP)** tell you about living standards.
- **Rule of 70:** years to double ≈ $70 / g$. At 7% a year, 10 years; at 2.5%, 28 years.

## What GDP does not measure
Income distribution, the informal sector, environmental quality, and whether growth comes from productivity or from borrowing. The second-order question is always: *what is financing this growth?*`,
      ),
      examples: b(
        md`## Ví dụ số
Một nền kinh tế có GDP danh nghĩa tăng 10%, chỉ số giảm phát tăng 4%:
$$g_{thực} = \frac{1{,}10}{1{,}04} - 1 = 5{,}77\%$$
Cách xấp xỉ (10 − 4 = 6%) sai lệch nhỏ khi lạm phát thấp nhưng sai lớn khi lạm phát cao.

## Việt Nam 2024
- Tăng trưởng GDP thực khoảng **7,1%**, quy mô khoảng **476 tỷ USD**, bình quân đầu người khoảng **4.700 USD**.
- Độ mở rất lớn: xuất khẩu cộng nhập khẩu gần **gấp đôi GDP**. Vì vậy $X - M$ và chu kỳ đơn hàng toàn cầu chi phối tăng trưởng mạnh hơn ở hầu hết các nước khác.
- Năm 2021 tăng trưởng chỉ 2,6% do giãn cách; năm 2022 bật lên 8,0% phần lớn nhờ **nền thấp (base effect)**. Luôn phải hỏi con số được so với nền nào.

## Mỹ
- Quy mô khoảng **29 nghìn tỷ USD**, tiêu dùng hộ gia đình chiếm gần **70%** GDP. Vì thế chỉ số bán lẻ và thị trường lao động là thứ Phố Wall soi kỹ nhất.
- Năm 2022 GDP thực giảm hai quý liên tiếp nhưng không được coi là suy thoái, vì việc làm vẫn tăng mạnh. "Hai quý âm" chỉ là quy tắc ngón tay cái.

## So sánh cấu trúc
| | Việt Nam | Mỹ |
|---|---|---|
| Động lực chính | Xuất khẩu, FDI, đầu tư | Tiêu dùng |
| Cú sốc dễ tổn thương | Cầu thế giới, tỷ giá | Thu nhập và tín dụng hộ gia đình |`,
        md`## Worked numbers
Nominal GDP grows 10% and the deflator rises 4%:
$$g_{real} = \frac{1.10}{1.04} - 1 = 5.77\%$$
The shortcut (10 − 4 = 6%) is close at low inflation and badly off at high inflation.

## Vietnam 2024
- Real GDP growth about **7.1%**, size about **USD 476 billion**, about **USD 4,700** per head.
- Extremely open: exports plus imports are nearly **twice GDP**. So $X - M$ and the global order cycle drive growth more than in most countries.
- Growth was only 2.6% in 2021 under lockdowns; the 8.0% rebound in 2022 owed much to the **base effect**. Always ask what a number is being compared with.

## United States
- About **USD 29 trillion**, with household consumption close to **70%** of GDP. Hence Wall Street's obsession with retail sales and the labour market.
- In 2022 real GDP fell for two straight quarters, yet no recession was declared because jobs kept growing strongly. "Two negative quarters" is only a rule of thumb.

## Structural contrast
| | Vietnam | United States |
|---|---|---|
| Main engine | Exports, FDI, investment | Consumption |
| Vulnerable to | World demand, the exchange rate | Household income and credit |`,
      ),
      lab: {
        kind: 'python',
        mission: b(
          'Chạy code. Trước khi xem kết quả, hãy đoán: từ 2005 đến 2024, quy mô kinh tế thực của Việt Nam tăng gấp mấy lần, của Mỹ gấp mấy lần? Sau đó tìm năm có độ chênh tăng trưởng lớn nhất.',
          'Run the code. Before looking, guess: from 2005 to 2024, how many times did Vietnam’s real economy multiply, and the US’s? Then find the year with the widest growth gap.',
        ),
        code: py`# Real growth compounding: Vietnam vs United States
us = load('us_macro')
vn = load('vn_macro')

df = vn[['year', 'gdp_growth']].merge(us[['year', 'gdp_growth']], on='year', suffixes=('_vn', '_us'))
df['vn_index'] = (1 + df.gdp_growth_vn / 100).cumprod() * 100
df['us_index'] = (1 + df.gdp_growth_us / 100).cumprod() * 100
print(df.round(1).to_string(index=False))

n = len(df)
for c, name in [('vn', 'Vietnam'), ('us', 'United States')]:
    total = df[f'{c}_index'].iloc[-1] / 100
    cagr = total ** (1 / n) - 1
    print(f"\n{name}: real output x{total:.2f} over {n} years, CAGR {cagr:.2%}, doubles every {70 / (cagr * 100):.0f} years")

chart(df.year, {'Vietnam': df.vn_index, 'United States': df.us_index},
      title='Real GDP index (year before start = 100)', xlabel='Year')

# Nominal vs real: the exact formula versus the shortcut
for g_nom, infl in [(10, 4), (25, 18), (6, 2)]:
    exact = (1 + g_nom / 100) / (1 + infl / 100) - 1
    print(f"nominal {g_nom}% , inflation {infl}% -> real {exact:.2%} (shortcut {g_nom - infl}%)")
`,
      },
      quiz: [
        {
          id: 'm2-l1-q1',
          scenario: b(
            'Năm 2011 một nước báo cáo GDP danh nghĩa tăng 26% trong khi lạm phát (deflator) là 21%. Một bài báo viết "kinh tế bùng nổ với tăng trưởng 26%". Nhận định đúng là gì?',
            'In 2011 a country reports nominal GDP up 26% with inflation (deflator) at 21%. A newspaper writes "economy booms with 26% growth". What is the correct reading?',
          ),
          options: [
            {
              text: b('Đúng, đây là tăng trưởng rất mạnh', 'Correct, this is very strong growth'),
              why: b('Phần lớn mức tăng là do giá, không phải do sản lượng.', 'Most of the increase is price, not volume.'),
            },
            {
              text: b('Tăng trưởng thực chỉ khoảng 4%, phần còn lại là lạm phát', 'Real growth is only about 4%; the rest is inflation'),
              correct: true,
              why: b('1,26 / 1,21 − 1 ≈ 4,1%. Khi lạm phát cao, phải dùng công thức chia chứ không trừ.', '1.26 / 1.21 − 1 ≈ 4.1%. With high inflation use the division formula, not subtraction.'),
            },
            {
              text: b('Kinh tế đang suy thoái vì lạm phát quá cao', 'The economy is in recession because inflation is so high'),
              why: b('Lạm phát cao không đồng nghĩa suy thoái; sản lượng thực vẫn tăng khoảng 4%.', 'High inflation is not recession; real output still grew about 4%.'),
            },
          ],
        },
        {
          id: 'm2-l1-q2',
          scenario: b(
            'Sau một năm giãn cách, GDP quý 3 tăng 13,7% so với cùng kỳ. Nhà phân tích bậc 2 sẽ làm gì trước khi kết luận về sức khỏe nền kinh tế?',
            'After a lockdown year, Q3 GDP is up 13.7% year on year. What does a second-level analyst do before judging the economy’s health?',
          ),
          options: [
            {
              text: b('So sánh mức sản lượng với cùng quý hai năm trước để loại hiệu ứng nền thấp', 'Compare the output level with the same quarter two years earlier to strip out the base effect'),
              correct: true,
              why: b('Quý nền bị co lại bất thường nên tỷ lệ YoY bị thổi phồng. Nhìn mức (level) hoặc CAGR 2 năm mới thấy xu hướng thật.', 'The base quarter was abnormally depressed, inflating the YoY rate. The level or the two-year CAGR shows the true trend.'),
            },
            {
              text: b('Kết luận nền kinh tế đang quá nóng và cần thắt chặt ngay', 'Conclude the economy is overheating and needs tightening now'),
              why: b('Con số cao chủ yếu là số học của nền thấp, chưa nói gì về áp lực cầu.', 'The high figure is mostly base-effect arithmetic and says little about demand pressure.'),
            },
            {
              text: b('Nhân 13,7% với 4 để ra tăng trưởng cả năm', 'Multiply 13.7% by 4 to get annual growth'),
              why: b('Số YoY đã là tỷ lệ theo năm; nhân 4 chỉ áp dụng cho số so quý trước chưa quy năm.', 'A YoY figure is already an annual rate; multiplying by four applies only to un-annualised QoQ figures.'),
            },
          ],
        },
      ],
    },
    {
      id: 'm2-l2',
      title: b('Lạm phát: CPI, lạm phát lõi và lãi suất thực', 'Inflation: CPI, core measures and real rates'),
      minutes: 17,
      summary: b(
        'Lạm phát là biến số mà mọi ngân hàng trung ương nhắm tới. Hiểu cách đo nó là hiểu được nửa chính sách tiền tệ.',
        'Inflation is the variable every central bank targets. Understand how it is measured and you understand half of monetary policy.',
      ),
      core: b(
        md`## Trực giác
Lạm phát là tốc độ mất sức mua của tiền. Nó được đo bằng giá của một **giỏ hàng cố định** mà hộ gia đình điển hình mua.

## Các thước đo
- **CPI (Consumer Price Index):** giỏ hàng tiêu dùng. Ở Việt Nam nhóm ăn uống chiếm khoảng một phần ba giỏ; ở Mỹ nhà ở (shelter) chiếm hơn một phần ba.
- **Lạm phát lõi (core):** loại lương thực và năng lượng vốn biến động mạnh, để thấy xu hướng nền.
- **PCE và Core PCE:** thước đo Fed ưa dùng, mục tiêu **2%**. Giỏ PCE thay đổi theo hành vi thay thế của người tiêu dùng nên thường thấp hơn CPI vài phần mười điểm.

## Công thức
$$\pi_t = \frac{CPI_t - CPI_{t-12}}{CPI_{t-12}}$$
**Phương trình Fisher** nối lãi suất danh nghĩa $i$ với lãi suất thực $r$:
$$1 + i = (1+r)(1+\pi^e) \quad\Rightarrow\quad r \approx i - \pi^e$$

Lãi suất **thực** mới là thứ quyết định việc tiết kiệm, vay mượn và định giá tài sản. Lãi suất tiết kiệm 5% khi lạm phát 7% nghĩa là bạn đang nghèo đi 2% mỗi năm.

## Ba cái bẫy khi đọc số lạm phát
1. **Hiệu ứng nền (base effect):** lạm phát YoY giảm không có nghĩa giá giảm, chỉ là giá tăng chậm lại.
2. **Giảm lạm phát (disinflation) khác giảm phát (deflation).**
3. **Lạm phát cầu kéo** (kinh tế quá nóng) cần thắt chặt; **lạm phát chi phí đẩy** (cú sốc cung) thì thắt chặt gây đau mà ít hiệu quả. Chẩn đoán sai loại lạm phát là sai lầm chính sách kinh điển.`,
        md`## Intuition
Inflation is the rate at which money loses purchasing power. It is measured by pricing a **fixed basket** bought by a typical household.

## The gauges
- **CPI (Consumer Price Index):** the consumer basket. In Vietnam food and catering are about a third of it; in the US shelter is more than a third.
- **Core inflation:** strips out volatile food and energy to reveal the underlying trend.
- **PCE and Core PCE:** the Fed's preferred gauge, target **2%**. The PCE basket adjusts for substitution, so it usually runs a few tenths below CPI.

## Formulas
$$\pi_t = \frac{CPI_t - CPI_{t-12}}{CPI_{t-12}}$$
The **Fisher equation** links the nominal rate $i$ and the real rate $r$:
$$1 + i = (1+r)(1+\pi^e) \quad\Rightarrow\quad r \approx i - \pi^e$$

The **real** rate is what drives saving, borrowing and asset valuation. A 5% deposit rate with 7% inflation means you get 2% poorer each year.

## Three traps in reading inflation
1. **Base effects:** falling YoY inflation does not mean prices fall, only that they rise more slowly.
2. **Disinflation is not deflation.**
3. **Demand-pull** inflation (an overheated economy) calls for tightening; **cost-push** inflation (a supply shock) makes tightening painful and less effective. Misdiagnosing the type is the classic policy error.`,
      ),
      examples: b(
        md`## Ví dụ số: hiệu ứng nền
CPI Mỹ (chuẩn hóa): tháng 6/2021 = 100; tháng 6/2022 = 109,1; tháng 6/2023 = 112,4.

- Lạm phát YoY tháng 6/2022: **9,1%** (đỉnh 40 năm)
- Lạm phát YoY tháng 6/2023: $112{,}4 / 109{,}1 - 1 =$ **3,0%**

Tiêu đề báo viết "lạm phát giảm mạnh", nhưng mặt bằng giá vẫn cao hơn hai năm trước **12,4%** và không quay lại. Đó là lý do người dân vẫn bất mãn dù số liệu đẹp lên.

## Lãi suất thực ở Mỹ
- Cuối 2021: lãi suất Fed 0,25%, lạm phát khoảng 7% → lãi suất thực khoảng **−6,75%**: chính sách cực kỳ nới lỏng dù kinh tế đã nóng.
- Cuối 2023: lãi suất Fed 5,5%, lạm phát khoảng 3,4% → lãi suất thực khoảng **+2%**: thắt chặt thực sự.

## Việt Nam
- Năm 2008 và 2011 lạm phát bình quân lần lượt khoảng **23%** và **18,6%**, sau các giai đoạn tín dụng tăng 30–50% mỗi năm.
- Từ 2014 đến nay lạm phát bình quân được giữ dưới 4%. Một phần nhờ nhà nước **quản lý giá** điện, y tế, giáo dục và điều chỉnh theo lộ trình, nên CPI Việt Nam phản ứng với cú sốc chậm và êm hơn CPI Mỹ.
- Vì nhóm ăn uống chiếm tỷ trọng lớn, **giá thịt lợn và giá gạo** tác động đến CPI Việt Nam mạnh hơn giá thuê nhà.`,
        md`## Worked numbers: the base effect
US CPI (rebased): June 2021 = 100; June 2022 = 109.1; June 2023 = 112.4.

- YoY inflation in June 2022: **9.1%** (a 40-year high)
- YoY inflation in June 2023: $112.4 / 109.1 - 1 =$ **3.0%**

Headlines said "inflation plunges", yet the price level was still **12.4%** above two years earlier and never came back. That is why people stayed unhappy as the data improved.

## Real rates in the US
- End-2021: Fed funds 0.25%, inflation about 7% → real rate about **−6.75%**: extremely loose policy in an already hot economy.
- End-2023: Fed funds 5.5%, inflation about 3.4% → real rate about **+2%**: genuinely tight.

## Vietnam
- In 2008 and 2011 average inflation was about **23%** and **18.6%**, following years of 30–50% annual credit growth.
- Since 2014 average inflation has stayed below 4%. That owes partly to **administered prices** for power, health care and education, adjusted on a schedule — so Vietnam's CPI reacts to shocks more slowly and smoothly than the US CPI.
- With food so heavy in the basket, **pork and rice prices** move Vietnam's CPI more than rents do.`,
      ),
      lab: {
        kind: 'python',
        mission: b(
          'Chạy code và tìm các năm lãi suất thực của Mỹ âm sâu nhất. Chuyện gì xảy ra với giá vàng trong các giai đoạn đó? Ghi giả thuyết của bạn vào Sổ tay trước khi học Module 6 để kiểm định.',
          'Run the code and find the years when the US real rate was most negative. What happened to gold in those periods? Write your hypothesis in the Journal before testing it in Module 6.',
        ),
        code: py`# Real interest rates and the price level
us = load('us_macro')
us['real_ff'] = us.fed_funds - us.cpi_yoy                 # Fisher approximation (ex post)
us['price_level'] = (1 + us.cpi_yoy / 100).cumprod() * 100

print(us[['year', 'cpi_yoy', 'fed_funds', 'real_ff', 'price_level']].round(2).to_string(index=False))

lost = 1 - 100 / us.price_level.iloc[-1]
print(f"\nPurchasing power of 1 USD lost since {us.year.iloc[0] - 1}: {lost:.1%}")
print(f"Years with negative real policy rate: {(us.real_ff < 0).sum()} of {len(us)}")

chart(us.year, {'Fed funds': us.fed_funds, 'CPI inflation': us.cpi_yoy, 'Real rate': us.real_ff},
      title='US policy rate, inflation and the real rate (%)', xlabel='Year')

# Vietnam: inflation after credit booms
vn = load('vn_macro')
print("\nVietnam: credit growth this year vs inflation next year")
print(f"correlation = {vn.credit_growth[:-1].reset_index(drop=True).corr(vn.cpi_yoy[1:].reset_index(drop=True)):.2f}")
chart(vn.year, {'CPI inflation': vn.cpi_yoy, 'Credit growth': vn.credit_growth},
      title='Vietnam: credit growth and inflation (%)', xlabel='Year')
`,
      },
      quiz: [
        {
          id: 'm2-l2-q1',
          scenario: b(
            'Lạm phát YoY của một nước giảm từ 8% xuống 3% trong 12 tháng. Một người bạn nói: "Tuyệt, giá cả đã quay về như cũ." Phát biểu nào đúng?',
            'A country’s YoY inflation falls from 8% to 3% in twelve months. A friend says: "Great, prices are back to where they were." Which statement is right?',
          ),
          options: [
            {
              text: b('Bạn ấy đúng, giá đã giảm khoảng 5%', 'Your friend is right; prices fell about 5%'),
              why: b('Tốc độ tăng giảm 5 điểm phần trăm, còn mức giá vẫn tiếp tục tăng.', 'The rate of increase fell five points; the price level kept rising.'),
            },
            {
              text: b('Giá vẫn tăng thêm 3%, cộng dồn lên mức đã cao hơn 8% trước đó', 'Prices rose another 3%, on top of a level already 8% higher'),
              correct: true,
              why: b('Đây là giảm lạm phát (disinflation). Mặt bằng giá cao hơn hai năm trước khoảng 11%.', 'This is disinflation. The price level is about 11% above two years earlier.'),
            },
            {
              text: b('Nền kinh tế đang giảm phát', 'The economy is in deflation'),
              why: b('Giảm phát đòi hỏi lạm phát âm, tức mức giá chung giảm.', 'Deflation requires negative inflation, i.e. a falling price level.'),
            },
          ],
        },
        {
          id: 'm2-l2-q2',
          scenario: b(
            'Giá dầu thế giới tăng 60% do xung đột, đẩy CPI lên 6% trong khi tiêu dùng nội địa đang yếu và thất nghiệp tăng. Ngân hàng trung ương nên suy nghĩ thế nào?',
            'World oil prices jump 60% on a conflict, pushing CPI to 6% while domestic consumption is weak and unemployment rising. How should the central bank think?',
          ),
          options: [
            {
              text: b('Tăng lãi suất mạnh ngay, vì lạm phát là lạm phát', 'Hike hard at once; inflation is inflation'),
              why: b('Lãi suất không tạo ra thêm dầu. Thắt mạnh vào một nền kinh tế yếu sẽ khuếch đại suy giảm.', 'Rates do not produce more oil. Tightening hard into a weak economy amplifies the downturn.'),
            },
            {
              text: b('Nhận diện đây là lạm phát chi phí đẩy; theo dõi lạm phát lõi và kỳ vọng lạm phát trước khi thắt chặt', 'Recognise cost-push inflation; watch core inflation and expectations before tightening'),
              correct: true,
              why: b('Chỉ khi cú sốc lan sang lõi và kỳ vọng (vòng xoáy lương–giá) thì mới cần thắt quyết liệt.', 'Forceful tightening is needed only if the shock spreads to core and expectations (a wage–price spiral).'),
            },
            {
              text: b('Giảm lãi suất để bù cho giá dầu cao', 'Cut rates to offset expensive oil'),
              why: b('Nới lỏng khi lạm phát 6% có nguy cơ làm kỳ vọng lạm phát mất neo.', 'Easing with inflation at 6% risks de-anchoring expectations.'),
            },
          ],
        },
      ],
    },
    {
      id: 'm2-l3',
      title: b('Thất nghiệp và đường cong Phillips', 'Unemployment and the Phillips curve'),
      minutes: 16,
      summary: b(
        'Có thật là muốn giảm lạm phát thì phải chấp nhận thất nghiệp? Câu trả lời là "trong ngắn hạn, đôi khi".',
        'Must lower inflation cost jobs? The honest answer: in the short run, sometimes.',
      ),
      core: b(
        md`## Trực giác
Khi doanh nghiệp tranh nhau tuyển người, lương tăng, chi phí tăng và giá tăng theo. Khi nhiều người mất việc, áp lực lương biến mất. Mối quan hệ ngược chiều giữa thất nghiệp và lạm phát này gọi là **đường cong Phillips**.

## Công thức
Phiên bản hiện đại có kỳ vọng:
$$\pi_t = \pi^e_t - \beta\,(u_t - u^*) + \varepsilon_t$$
- $u^*$ là **tỷ lệ thất nghiệp tự nhiên (NAIRU)**: mức thất nghiệp không làm lạm phát tăng tốc.
- $\pi^e$ là kỳ vọng lạm phát. Khi kỳ vọng được **neo** vững, đường cong gần như phẳng.
- $\varepsilon$ là cú sốc cung.

**Định luật Okun** nối thất nghiệp với sản lượng:
$$\frac{Y - Y^*}{Y^*} \approx -2\,(u - u^*)$$
Thất nghiệp cao hơn mức tự nhiên 1 điểm thì sản lượng thấp hơn tiềm năng khoảng 2%.

## Ngắn hạn và dài hạn
- **Ngắn hạn** có đánh đổi: kích cầu làm giảm thất nghiệp nhưng tăng lạm phát.
- **Dài hạn** thì không: người lao động điều chỉnh kỳ vọng, đường cong dựng đứng tại $u^*$. Cố giữ thất nghiệp dưới $u^*$ chỉ tạo lạm phát tăng tốc.

## Tỷ lệ hy sinh (sacrifice ratio)
Số điểm phần trăm GDP phải mất để giảm 1 điểm lạm phát. Uy tín của ngân hàng trung ương càng cao thì tỷ lệ này càng thấp, vì kỳ vọng tự điều chỉnh mà không cần suy thoái sâu.

> Đường cong Phillips là quan hệ **thống kê không ổn định**. Bài lab bên cạnh cho bạn tự kiểm chứng nó yếu đến mức nào trên dữ liệu thật.`,
        md`## Intuition
When firms compete for workers, wages rise, costs rise and prices follow. When many people lose jobs, wage pressure vanishes. This inverse relationship between unemployment and inflation is the **Phillips curve**.

## Formulas
The modern, expectations-augmented version:
$$\pi_t = \pi^e_t - \beta\,(u_t - u^*) + \varepsilon_t$$
- $u^*$ is the **natural rate of unemployment (NAIRU)**: the rate that does not make inflation accelerate.
- $\pi^e$ is expected inflation. When expectations are firmly **anchored**, the curve is nearly flat.
- $\varepsilon$ is a supply shock.

**Okun's law** links unemployment to output:
$$\frac{Y - Y^*}{Y^*} \approx -2\,(u - u^*)$$
One point of unemployment above the natural rate means output about 2% below potential.

## Short run versus long run
- In the **short run** there is a trade-off: stimulus lowers unemployment and raises inflation.
- In the **long run** there is none: workers adjust expectations and the curve is vertical at $u^*$. Holding unemployment below $u^*$ only produces accelerating inflation.

## The sacrifice ratio
The percentage points of GDP lost per point of disinflation. The more credible the central bank, the lower the ratio, because expectations adjust without a deep recession.

> The Phillips curve is an **unstable statistical relationship**. The lab lets you check on real data just how weak it is.`,
      ),
      examples: b(
        md`## Mỹ: cú sốc Volcker 1979–1983
Lạm phát lên khoảng 13,5% năm 1980. Chủ tịch Fed Paul Volcker đẩy lãi suất liên ngân hàng lên gần 20%. Thất nghiệp đạt đỉnh **10,8%** cuối năm 1982, lạm phát rơi về khoảng 3,2% năm 1983. Cái giá là hai cuộc suy thoái liên tiếp. Tỷ lệ hy sinh cao vì sau một thập kỷ lạm phát, không ai còn tin Fed.

## Mỹ: "hạ cánh mềm" 2022–2024
Lạm phát giảm từ 9,1% xuống dưới 3% trong khi thất nghiệp chỉ tăng từ 3,5% lên khoảng 4,2%. Vì sao lần này rẻ hơn nhiều? Hai lý do: phần lớn lạm phát là **cú sốc cung** tự tan khi chuỗi cung ứng lành lại, và **kỳ vọng dài hạn vẫn được neo** quanh 2% nhờ uy tín Fed tích lũy suốt 40 năm.

## Ví dụ số: định luật Okun
Thất nghiệp tự nhiên 4,5%, thất nghiệp thực tế 6,5%:
$$\text{Khoảng cách sản lượng} \approx -2 \times (6{,}5 - 4{,}5) = -4\%$$
Với GDP 29 nghìn tỷ USD, nền kinh tế đang sản xuất thấp hơn tiềm năng khoảng 1,16 nghìn tỷ USD mỗi năm.

## Việt Nam: vì sao con số thất nghiệp ít nói lên điều gì
Tỷ lệ thất nghiệp chính thức thường chỉ quanh **2–2,5%**, kể cả trong năm 2021. Lý do: khoảng hai phần ba lao động làm việc **phi chính thức** và không có bảo hiểm thất nghiệp, nên mất việc là phải làm việc khác ngay. Để đo độ chùng của thị trường lao động Việt Nam, hãy nhìn **tỷ lệ thiếu việc làm**, thu nhập bình quân, số đơn hàng và số giờ làm thêm ở các khu công nghiệp.`,
        md`## US: the Volcker shock, 1979–1983
Inflation hit about 13.5% in 1980. Fed chair Paul Volcker drove the funds rate to nearly 20%. Unemployment peaked at **10.8%** in late 1982 and inflation fell to about 3.2% in 1983. The price was two back-to-back recessions. The sacrifice ratio was high because, after a decade of inflation, nobody believed the Fed.

## US: the "soft landing" of 2022–2024
Inflation fell from 9.1% to below 3% while unemployment rose only from 3.5% to about 4.2%. Why so much cheaper? Two reasons: much of the inflation was a **supply shock** that faded as supply chains healed, and **long-run expectations stayed anchored** near 2% thanks to 40 years of accumulated Fed credibility.

## Worked numbers: Okun's law
Natural unemployment 4.5%, actual 6.5%:
$$\text{Output gap} \approx -2 \times (6.5 - 4.5) = -4\%$$
With GDP of USD 29 trillion, the economy is producing about USD 1.16 trillion a year below potential.

## Vietnam: why the unemployment rate says little
The official rate hovers around **2–2.5%**, even in 2021. The reason: roughly two-thirds of workers are **informal** and have no unemployment insurance, so losing a job means taking another at once. To gauge slack in Vietnam, look at **underemployment**, average earnings, order books and overtime hours in industrial zones.`,
      ),
      lab: {
        kind: 'python',
        mission: b(
          'Chạy hồi quy lạm phát theo thất nghiệp trên dữ liệu Mỹ 2000–2024. R² là bao nhiêu? Hệ số có ý nghĩa thống kê không? Rồi bỏ ba năm 2021–2023 và chạy lại. Bạn rút ra điều gì về độ tin cậy của "quy luật" này?',
          'Regress inflation on unemployment with US data for 2000–2024. What is R²? Is the slope significant? Then drop 2021–2023 and rerun. What do you conclude about the reliability of this "law"?',
        ),
        code: py`# How strong is the Phillips curve in the data?
us = load('us_macro')

print("=== Full sample 2000-2024 ===")
full = ols(us.cpi_yoy, us.unemployment, names=['unemployment'])
chart(us.unemployment, us.cpi_yoy, kind='scatter', fit=True,
      title='US Phillips curve, 2000-2024', xlabel='Unemployment rate (%)', ylabel='CPI inflation (%)')

print("\n=== Excluding the 2021-2023 supply shock ===")
calm = us[(us.year < 2021) | (us.year > 2023)]
sub = ols(calm.cpi_yoy, calm.unemployment, names=['unemployment'])

print(f"\nSlope full sample: {full['coef'][1]:.2f}   slope without 2021-23: {sub['coef'][1]:.2f}")
print("Interpretation: a 1-point rise in unemployment is associated with this change in inflation.")

# Okun's law check: change in unemployment vs GDP growth
us['d_unemp'] = us.unemployment.diff()
print("\n=== Okun's law: change in unemployment on real GDP growth ===")
okun = ols(us.d_unemp[1:], us.gdp_growth[1:], names=['gdp_growth'])
print(f"Growth needed to keep unemployment stable ~ {-okun['coef'][0] / okun['coef'][1]:.1f}% per year")
`,
      },
      quiz: [
        {
          id: 'm2-l3-q1',
          scenario: b(
            'Một chính phủ muốn giữ thất nghiệp ở 3% trong khi mức tự nhiên ước tính là 5%, bằng cách kích cầu liên tục trong nhiều năm. Kết quả dài hạn có khả năng nhất là gì?',
            'A government wants to hold unemployment at 3% when the natural rate is about 5%, through years of continuous stimulus. What is the likely long-run result?',
          ),
          options: [
            {
              text: b('Thất nghiệp ổn định ở 3% với lạm phát cao hơn một chút nhưng ổn định', 'Unemployment settles at 3% with slightly higher but stable inflation'),
              why: b('Đó là quan điểm trước thập niên 1970. Khi kỳ vọng điều chỉnh, cần lạm phát ngày càng cao hơn để giữ mức thất nghiệp đó.', 'That was the pre-1970s view. Once expectations adjust, ever-higher inflation is needed to hold that rate.'),
            },
            {
              text: b('Lạm phát tăng tốc dần, và thất nghiệp rốt cuộc quay về khoảng 5%', 'Inflation accelerates and unemployment eventually returns to about 5%'),
              correct: true,
              why: b('Đường Phillips dài hạn dựng đứng tại mức tự nhiên. Đây là bài học của thập niên 1970.', 'The long-run Phillips curve is vertical at the natural rate — the lesson of the 1970s.'),
            },
            {
              text: b('Lạm phát giảm vì nhiều người có việc làm hơn nên sản xuất nhiều hơn', 'Inflation falls because more people working means more output'),
              why: b('Sản lượng vượt tiềm năng tạo áp lực lương và giá chứ không giảm giá.', 'Output above potential creates wage and price pressure, not relief.'),
            },
          ],
        },
        {
          id: 'm2-l3-q2',
          scenario: b(
            'Hai nước cùng cần giảm lạm phát từ 10% xuống 3%. Nước A có ngân hàng trung ương độc lập, uy tín cao. Nước B thường xuyên in tiền tài trợ ngân sách. Nước nào chịu chi phí việc làm thấp hơn và vì sao?',
            'Two countries must cut inflation from 10% to 3%. Country A has an independent, credible central bank. Country B routinely prints money to fund its budget. Which pays the smaller cost in jobs, and why?',
          ),
          options: [
            {
              text: b('Nước A, vì kỳ vọng lạm phát giảm nhanh theo cam kết nên không cần suy thoái sâu', 'A: expectations fall quickly with the commitment, so no deep recession is needed'),
              correct: true,
              why: b('Uy tín làm π^e dịch chuyển cùng mục tiêu, tức tỷ lệ hy sinh thấp.', 'Credibility moves π^e with the target, meaning a low sacrifice ratio.'),
            },
            {
              text: b('Nước B, vì họ có thể in tiền để hỗ trợ người thất nghiệp', 'B: it can print money to support the unemployed'),
              why: b('In tiền chính là nguồn gốc lạm phát; nó phá hủy uy tín cần có để giảm lạm phát rẻ.', 'Printing money is the source of the inflation and destroys the credibility needed for cheap disinflation.'),
            },
            {
              text: b('Như nhau, vì tỷ lệ hy sinh là hằng số', 'The same; the sacrifice ratio is a constant'),
              why: b('Tỷ lệ hy sinh phụ thuộc mạnh vào uy tín và cơ chế hình thành kỳ vọng.', 'The sacrifice ratio depends heavily on credibility and how expectations form.'),
            },
          ],
        },
      ],
    },
    {
      id: 'm2-l4',
      title: b('Tiền, tín dụng và ngân hàng trung ương: Fed và NHNN', 'Money, credit and central banks: the Fed and the SBV'),
      minutes: 22,
      summary: b(
        'Ngân hàng trung ương không "in tiền" theo nghĩa đen. Họ điều khiển giá và lượng của tín dụng, và tác động đến với nền kinh tế sau một độ trễ dài.',
        'Central banks do not literally "print money". They steer the price and quantity of credit, and the effects arrive after a long lag.',
      ),
      core: b(
        md`## Trực giác
Phần lớn tiền trong nền kinh tế không phải tiền giấy mà là **tiền gửi do ngân hàng thương mại tạo ra khi cho vay**. Ngân hàng trung ương điều khiển quá trình này giống người lái tàu chở dầu: bẻ lái hôm nay, tàu đổi hướng sau nhiều tháng.

## Công thức
**Phương trình số lượng tiền:**
$$M \times V = P \times Y$$
$M$ cung tiền (thường dùng M2), $V$ vòng quay tiền (velocity), $P$ mức giá, $Y$ sản lượng thực. Nếu $V$ ổn định, cung tiền tăng nhanh hơn sản lượng sẽ đẩy giá lên. Nhưng $V$ **không ổn định**: nó sụp trong khủng hoảng khi mọi người găm tiền.

**Số nhân tiền (đơn giản hóa):** $m = \dfrac{1}{\text{tỷ lệ dự trữ bắt buộc}}$

## Bộ công cụ
| Công cụ | Cơ chế |
|---|---|
| Lãi suất điều hành | Định giá vốn ngắn hạn cho hệ thống ngân hàng |
| Nghiệp vụ thị trường mở (OMO) | Bơm hoặc hút thanh khoản qua mua bán giấy tờ có giá |
| Dự trữ bắt buộc | Quy định phần tiền gửi không được cho vay |
| QE / QT | Mua hoặc giảm nắm giữ trái phiếu dài hạn để tác động lãi suất dài hạn |

## Fed và NHNN khác nhau thế nào
- **Fed:** nhiệm vụ kép (ổn định giá và toàn dụng lao động), mục tiêu lạm phát 2%, FOMC họp 8 lần mỗi năm, công cụ chính là biên độ lãi suất liên bang. Giao tiếp qua biểu đồ dot plot và họp báo.
- **NHNN (SBV):** đa mục tiêu (lạm phát, tăng trưởng, tỷ giá, an toàn hệ thống). Ngoài lãi suất tái cấp vốn và tái chiết khấu còn dùng **hạn mức tăng trưởng tín dụng (room tín dụng)**, tỷ giá trung tâm với biên độ ±5%, tín phiếu và mua bán ngoại tệ. Công cụ **định lượng** quan trọng không kém công cụ **giá**.

## Độ trễ
Tác động đầy đủ của một lần đổi lãi suất lên lạm phát thường mất **12–18 tháng**. Vì vậy ngân hàng trung ương phải hành động theo **dự báo**, và rất dễ thắt quá tay hoặc nới quá muộn.`,
        md`## Intuition
Most money is not banknotes; it is **deposits created by commercial banks when they lend**. A central bank steers this process like the pilot of an oil tanker: turn the wheel today and the ship changes course months later.

## Formulas
**The quantity equation:**
$$M \times V = P \times Y$$
$M$ money supply (usually M2), $V$ velocity, $P$ the price level, $Y$ real output. If $V$ is stable, money growing faster than output pushes prices up. But $V$ is **not stable**: it collapses in crises when everyone hoards cash.

**The money multiplier (simplified):** $m = \dfrac{1}{\text{required reserve ratio}}$

## The toolkit
| Tool | Mechanism |
|---|---|
| Policy rate | Sets the price of short-term funding for banks |
| Open-market operations (OMO) | Add or drain liquidity by trading securities |
| Reserve requirements | Fix the share of deposits that cannot be lent |
| QE / QT | Buy or run off long-term bonds to move long-term rates |

## How the Fed and the SBV differ
- **Fed:** a dual mandate (price stability and maximum employment), a 2% inflation target, eight FOMC meetings a year, the federal funds range as the main tool. It communicates through the dot plot and press conferences.
- **SBV (State Bank of Vietnam):** multiple objectives (inflation, growth, the exchange rate, system safety). Besides the refinancing and rediscount rates it uses **credit-growth quotas**, a central exchange rate with a ±5% band, bills and FX intervention. **Quantity** tools matter as much as **price** tools.

## Lags
The full effect of a rate change on inflation usually takes **12–18 months**. So central banks must act on **forecasts** — and easily tighten too much or ease too late.`,
      ),
      examples: b(
        md`## Mỹ 2020–2023: phương trình số lượng tiền trong đời thực
- Cung tiền M2 tăng hơn **25%** so với cùng kỳ vào đầu năm 2021, mức cao nhất từ Thế chiến II, do gói cứu trợ tài khóa được Fed tài trợ gián tiếp qua QE.
- Năm 2020 vòng quay tiền $V$ sụp nên lạm phát chưa xuất hiện. Nhiều người kết luận "in tiền không gây lạm phát".
- Khi kinh tế mở cửa, $V$ hồi phục trong lúc $M$ đã phình to: lạm phát lên **9,1%** giữa năm 2022.
- Fed tăng lãi suất từ 0,25% lên 5,5% trong 16 tháng. M2 **giảm** lần đầu tiên sau nhiều thập kỷ.

Bài học: phương trình luôn đúng (nó là đồng nhất thức), nhưng dự báo bằng nó đòi hỏi phải đoán được $V$.

## Ví dụ số: số nhân tiền
Dự trữ bắt buộc 10% thì 100 đồng tiền cơ sở có thể tạo tối đa 1.000 đồng tiền gửi. Giảm xuống 5% thì trần lý thuyết là 2.000 đồng. Thực tế số nhân thấp hơn vì ngân hàng giữ dự trữ dư và nhu cầu vay có hạn: "không thể đẩy sợi dây".

## Việt Nam 2022–2023
- **Tháng 9–10/2022:** Fed tăng mạnh, VND mất giá. NHNN tăng lãi suất tái cấp vốn hai lần, từ 4% lên **6%**, nới biên độ tỷ giá từ ±3% lên **±5%** và bán dự trữ ngoại hối.
- **Tháng 3–6/2023:** áp lực tỷ giá dịu đi, kinh tế yếu. NHNN giảm bốn lần, đưa lãi suất tái cấp vốn về **4,5%**.
- Tuy vậy tín dụng năm 2023 vẫn tăng chậm trong nhiều tháng dù lãi suất đã giảm. Hạn mức tín dụng còn dư mà doanh nghiệp không vay. Đây là ví dụ sống về việc **giá vốn giảm không tự động tạo ra nhu cầu vốn**.

## Vì sao Việt Nam dùng room tín dụng
Tín dụng trên GDP khoảng **130%**, cao so với thu nhập, và thị trường vốn còn mỏng nên ngân hàng là kênh cấp vốn chính. Khống chế lượng trực tiếp là cách chắc chắn hơn so với chỉ dựa vào lãi suất.`,
        md`## US 2020–2023: the quantity equation in the wild
- M2 grew more than **25%** year on year in early 2021, the fastest since the second world war, as fiscal relief was indirectly financed by Fed QE.
- In 2020 velocity $V$ collapsed, so inflation did not appear. Many concluded that "printing money is not inflationary".
- As the economy reopened, $V$ recovered while $M$ was already swollen: inflation hit **9.1%** in mid-2022.
- The Fed raised rates from 0.25% to 5.5% in 16 months. M2 **shrank** for the first time in decades.

Lesson: the equation always holds (it is an identity), but forecasting with it requires guessing $V$.

## Worked numbers: the money multiplier
With a 10% reserve requirement, 100 of base money can support at most 1,000 of deposits. At 5% the theoretical ceiling is 2,000. In practice the multiplier is lower because banks hold excess reserves and loan demand is finite: "you cannot push on a string".

## Vietnam 2022–2023
- **September–October 2022:** the Fed hikes hard and the dong weakens. The SBV raises the refinancing rate twice, from 4% to **6%**, widens the FX band from ±3% to **±5%** and sells reserves.
- **March–June 2023:** FX pressure eases and the economy is weak. The SBV cuts four times, taking the refinancing rate to **4.5%**.
- Yet credit grew slowly for months in 2023 even with lower rates. Quota was available and firms did not borrow — a live example that **cheaper money does not automatically create demand for money**.

## Why Vietnam uses credit quotas
Credit is about **130%** of GDP — high for the income level — and capital markets are thin, so banks are the main funding channel. Capping quantity directly is more certain than relying on rates alone.`,
      ),
      lab: {
        kind: 'sim',
        sim: 'central-bank',
        mission: b(
          'Nhiệm vụ: (1) Chọn cú sốc "Giá dầu tăng" và cố đưa lạm phát về mục tiêu trong 8 quý mà GDP không âm. (2) Tăng dự trữ bắt buộc thay vì lãi suất: tín dụng và tỷ giá phản ứng khác gì? (3) Để ý độ trễ: lạm phát đổi hướng sau bao nhiêu quý kể từ lúc bạn đổi lãi suất?',
          'Mission: (1) Pick the "Oil price spike" shock and bring inflation back to target within 8 quarters without negative GDP growth. (2) Raise reserve requirements instead of the rate: how do credit and the currency react differently? (3) Watch the lag: how many quarters after your rate move does inflation turn?',
        ),
      },
      quiz: [
        {
          id: 'm2-l4-q1',
          scenario: b(
            'Ngân hàng trung ương vừa tăng lãi suất 100 điểm cơ bản. Ba tháng sau lạm phát vẫn chưa giảm và báo chí kêu gọi tăng thêm 200 điểm nữa ngay. Lập luận nào hợp lý nhất?',
            'A central bank has just raised rates by 100 basis points. Three months later inflation has not fallen and the press demands another 200 points at once. What is the soundest argument?',
          ),
          options: [
            {
              text: b('Chính sách đã thất bại, phải tăng gấp đôi liều', 'Policy has failed; double the dose'),
              why: b('Ba tháng là quá ngắn để đánh giá. Tăng dồn dập khi chưa thấy tác động của lần trước là công thức gây suy thoái.', 'Three months is far too short. Piling on hikes before the last ones bite is a recipe for recession.'),
            },
            {
              text: b('Chính sách tiền tệ có độ trễ 12–18 tháng; cần theo dõi các chỉ báo sớm như tín dụng và kỳ vọng', 'Policy works with a 12–18 month lag; watch leading indicators such as credit and expectations'),
              correct: true,
              why: b('Tín dụng, thị trường nhà và kỳ vọng phản ứng trước; CPI phản ứng sau cùng.', 'Credit, housing and expectations react first; CPI reacts last.'),
            },
            {
              text: b('Lãi suất không ảnh hưởng đến lạm phát', 'Rates do not affect inflation'),
              why: b('Có ảnh hưởng, chỉ là chậm và qua nhiều kênh truyền dẫn.', 'They do — slowly and through several transmission channels.'),
            },
          ],
        },
        {
          id: 'm2-l4-q2',
          scenario: b(
            'NHNN giảm lãi suất điều hành 150 điểm cơ bản nhưng sau hai quý tín dụng gần như không tăng. Giải thích nào phù hợp nhất?',
            'The SBV cuts policy rates by 150 basis points, yet after two quarters credit has barely grown. Which explanation fits best?',
          ),
          options: [
            {
              text: b('Ngân hàng không muốn cho vay vì lãi suất thấp làm giảm lợi nhuận', 'Banks refuse to lend because low rates hurt profits'),
              why: b('Biên lãi ròng phụ thuộc chênh lệch huy động và cho vay, không phải mức lãi suất tuyệt đối.', 'Net interest margin depends on the deposit–lending spread, not the absolute rate level.'),
            },
            {
              text: b('Cầu tín dụng yếu: doanh nghiệp thiếu đơn hàng và bảng cân đối xấu nên không muốn vay dù vốn rẻ', 'Weak credit demand: firms lack orders and have damaged balance sheets, so they do not borrow even at lower cost'),
              correct: true,
              why: b('Đây là hiện tượng "đẩy sợi dây". Chính sách tiền tệ hãm thì mạnh, kích thì yếu khi niềm tin thấp.', 'This is "pushing on a string". Monetary policy brakes well but accelerates poorly when confidence is low.'),
            },
            {
              text: b('Cung tiền đã tự động tăng nên không cần tín dụng', 'Money supply rose automatically, so credit is not needed'),
              why: b('Trong hệ thống dựa vào ngân hàng, cung tiền tăng chủ yếu qua chính việc cho vay.', 'In a bank-based system money supply grows mainly through lending itself.'),
            },
          ],
        },
      ],
    },
    {
      id: 'm2-l5',
      title: b('Chính sách tài khóa và nợ công', 'Fiscal policy and public debt'),
      minutes: 16,
      summary: b(
        'Chính phủ chi tiêu và đánh thuế để ổn định nền kinh tế. Giới hạn của nó nằm ở một bất đẳng thức đơn giản giữa lãi suất và tăng trưởng.',
        'Governments tax and spend to stabilise the economy. The limit lies in one simple inequality between the interest rate and growth.',
      ),
      core: b(
        md`## Trực giác
Khi hộ gia đình và doanh nghiệp cùng thắt lưng buộc bụng, chi tiêu của người này mất đi là thu nhập của người kia mất đi. Chính phủ là chủ thể duy nhất có thể chi **ngược chu kỳ** để lấp khoảng trống.

## Số nhân tài khóa
$$k = \frac{1}{1 - MPC\,(1-t) + m}$$
$MPC$ là khuynh hướng tiêu dùng biên, $t$ thuế suất, $m$ khuynh hướng nhập khẩu biên. Nền kinh tế càng mở ($m$ lớn) thì số nhân càng nhỏ vì cầu "rò rỉ" ra nước ngoài.

Số nhân **lớn** khi kinh tế suy thoái, lãi suất chạm đáy và chi cho đầu tư công. Số nhân **nhỏ** khi kinh tế đã toàn dụng: chi thêm chỉ đẩy lãi suất lên và **lấn át (crowding out)** đầu tư tư nhân.

## Động học nợ công
Gọi $d$ là nợ trên GDP, $r$ lãi suất thực, $g$ tăng trưởng thực, $pb$ thặng dư ngân sách cơ bản (chưa tính lãi) trên GDP:
$$\Delta d \approx (r - g)\,d - pb$$

- Nếu $r < g$: nợ trên GDP tự giảm dần ngay cả khi vẫn thâm hụt nhẹ.
- Nếu $r > g$: phải có thặng dư cơ bản, nếu không nợ sẽ lăn như quả cầu tuyết.

## Ba loại chính sách
- **Bộ ổn định tự động:** thuế lũy tiến và trợ cấp thất nghiệp tự kích hoạt khi suy thoái.
- **Tùy nghi:** gói kích thích, giảm thuế.
- **Phối hợp với tiền tệ:** tài khóa lỏng cộng tiền tệ lỏng thì kích cầu mạnh nhất nhưng rủi ro lạm phát cao nhất, như Mỹ 2020–2021.

> Câu hỏi bậc 2: ai mua trái phiếu chính phủ? Nếu là ngân hàng trung ương thì đó là tiền mới. Nếu là khu vực tư nhân thì đó là vốn bị rút khỏi nơi khác.`,
        md`## Intuition
When households and firms tighten their belts together, one person's lost spending is another's lost income. The government is the only actor able to spend **counter-cyclically** to fill the gap.

## The fiscal multiplier
$$k = \frac{1}{1 - MPC\,(1-t) + m}$$
$MPC$ is the marginal propensity to consume, $t$ the tax rate, $m$ the marginal propensity to import. The more open the economy (large $m$), the smaller the multiplier, because demand "leaks" abroad.

The multiplier is **large** in a slump, at the rate floor, and for public investment. It is **small** at full employment: extra spending just raises rates and **crowds out** private investment.

## Public-debt dynamics
Let $d$ be debt to GDP, $r$ the real interest rate, $g$ real growth and $pb$ the primary surplus (before interest) to GDP:
$$\Delta d \approx (r - g)\,d - pb$$

- If $r < g$: debt to GDP drifts down even with small deficits.
- If $r > g$: a primary surplus is required, or debt snowballs.

## Three kinds of policy
- **Automatic stabilisers:** progressive taxes and unemployment benefits kick in by themselves in a downturn.
- **Discretionary:** stimulus packages, tax cuts.
- **Mix with monetary policy:** loose fiscal plus loose money stimulates most and risks inflation most — the US in 2020–2021.

> The second-order question: who buys the government's bonds? If the central bank, it is new money. If the private sector, it is capital withdrawn from elsewhere.`,
      ),
      examples: b(
        md`## Ví dụ số: số nhân
$MPC = 0{,}8$, $t = 0{,}2$, $m = 0{,}3$:
$$k = \frac{1}{1 - 0{,}8 \times 0{,}8 + 0{,}3} = \frac{1}{0{,}66} \approx 1{,}52$$
Nếu nền kinh tế đóng ($m = 0$) số nhân là 2,78. Việt Nam có độ mở rất lớn nên một phần đáng kể của kích cầu tiêu dùng chảy sang nhập khẩu.

## Ví dụ số: nợ công
Nợ 100% GDP, lãi suất thực 4%, tăng trưởng 2%. Để giữ nợ ổn định:
$$pb = (r - g)\,d = 2\%\ \text{GDP}$$
Nếu đang thâm hụt cơ bản 3% GDP thì nợ tăng 5 điểm phần trăm GDP mỗi năm.

## Mỹ
Nợ liên bang khoảng **120% GDP**, thâm hụt quanh **6% GDP** ngay cả khi kinh tế toàn dụng. Khi lãi suất còn gần 0 thì $r < g$ và nợ có vẻ miễn phí. Sau 2022 chi trả lãi vượt 1 nghìn tỷ USD mỗi năm, lớn hơn chi quốc phòng. Đó là lý do lợi suất trái phiếu dài hạn nhạy cảm với tin tức ngân sách.

## Việt Nam
- Nợ công khoảng **36–37% GDP**, thấp xa mức trần 60% do Quốc hội đặt, nên dư địa tài khóa còn lớn.
- Công cụ chính là **đầu tư công** (cao tốc Bắc–Nam, sân bay Long Thành) và **giảm thuế VAT từ 10% xuống 8%**, áp dụng nhiều đợt từ 2022.
- Nút thắt không phải thiếu tiền mà là **tốc độ giải ngân**: thủ tục và giải phóng mặt bằng khiến vốn thường dồn vào cuối năm. Số nhân lý thuyết chỉ thành hiện thực khi tiền thực sự ra công trường.

## Phối hợp chính sách
| Tài khóa | Tiền tệ | Kết quả điển hình |
|---|---|---|
| Lỏng | Lỏng | Bùng nổ rồi lạm phát (Mỹ 2021) |
| Lỏng | Chặt | Lãi suất cao, đồng tiền mạnh (Mỹ 2023) |
| Chặt | Lỏng | Lãi suất thấp, tăng trưởng yếu (Eurozone 2012–2015) |`,
        md`## Worked numbers: the multiplier
$MPC = 0.8$, $t = 0.2$, $m = 0.3$:
$$k = \frac{1}{1 - 0.8 \times 0.8 + 0.3} = \frac{1}{0.66} \approx 1.52$$
In a closed economy ($m = 0$) the multiplier is 2.78. Vietnam is extremely open, so a good share of consumer stimulus flows into imports.

## Worked numbers: public debt
Debt of 100% of GDP, a real rate of 4%, growth of 2%. To hold debt steady:
$$pb = (r - g)\,d = 2\%\ \text{of GDP}$$
With a primary deficit of 3% of GDP instead, debt rises five points of GDP a year.

## United States
Federal debt is about **120% of GDP** with deficits near **6% of GDP** even at full employment. When rates were near zero, $r < g$ and debt looked free. After 2022 interest payments passed USD 1 trillion a year, more than defence. That is why long bond yields react to budget news.

## Vietnam
- Public debt is about **36–37% of GDP**, far below the 60% ceiling set by the National Assembly, so fiscal space is ample.
- The main tools are **public investment** (the North–South expressway, Long Thanh airport) and the **VAT cut from 10% to 8%**, applied in several rounds since 2022.
- The bottleneck is not money but **disbursement speed**: procedures and land clearance push spending to year-end. The theoretical multiplier becomes real only when cash reaches the building site.

## Policy mix
| Fiscal | Monetary | Typical outcome |
|---|---|---|
| Loose | Loose | Boom, then inflation (US 2021) |
| Loose | Tight | High rates, strong currency (US 2023) |
| Tight | Loose | Low rates, weak growth (euro area 2012–2015) |`,
      ),
      lab: {
        kind: 'python',
        mission: b(
          'Chạy mô phỏng nợ công 20 năm. Sau đó tự tạo kịch bản thứ tư: nợ 37% GDP, lãi suất thực 3%, tăng trưởng 6,5%, thâm hụt cơ bản 2,5% GDP (gần với Việt Nam). Nợ sẽ đi về đâu? Vì sao tăng trưởng cao là "tấm đệm" quan trọng nhất?',
          'Run the 20-year debt simulation. Then add a fourth scenario: debt 37% of GDP, real rate 3%, growth 6.5%, primary deficit 2.5% of GDP (close to Vietnam). Where does debt go? Why is high growth the most important cushion?',
        ),
        code: py`# Public-debt dynamics:  d[t+1] = d[t] * (1 + r) / (1 + g) - primary_balance
import numpy as np

def debt_path(d0, r, g, pb, years=20):
    d = [d0]
    for _ in range(years):
        d.append(d[-1] * (1 + r / 100) / (1 + g / 100) - pb)
    return np.array(d)

scenarios = {
    'r<g, small deficit':  dict(d0=100, r=1.0, g=3.0, pb=-1.0),
    'r>g, same deficit':   dict(d0=100, r=4.0, g=2.0, pb=-1.0),
    'r>g, surplus 2%':     dict(d0=100, r=4.0, g=2.0, pb=2.0),
    # add your own scenario here
}

years = np.arange(0, 21)
paths = {}
for name, s in scenarios.items():
    paths[name] = debt_path(**s)
    stabilising = (s['r'] - s['g']) / 100 * s['d0']
    print(f"{name:22s} debt/GDP after 20y = {paths[name][-1]:6.1f}%   (stabilising primary balance = {stabilising:+.1f}% of GDP)")

chart(years, paths, title='Debt-to-GDP paths (%)', xlabel='Years from now')

# Fiscal multiplier and openness
print("\nFiscal multiplier by openness (MPC 0.8, tax rate 0.2):")
for m in [0.0, 0.15, 0.3, 0.6]:
    print(f"  import propensity {m:.2f} -> multiplier {1 / (1 - 0.8 * 0.8 + m):.2f}")
`,
      },
      quiz: [
        {
          id: 'm2-l5-q1',
          scenario: b(
            'Một nước có nợ công 90% GDP, lãi suất thực vay nợ 5%, tăng trưởng thực 1% và ngân sách cơ bản cân bằng. Không có gì thay đổi thì điều gì xảy ra?',
            'A country has public debt of 90% of GDP, a real borrowing rate of 5%, real growth of 1% and a balanced primary budget. If nothing changes, what happens?',
          ),
          options: [
            {
              text: b('Nợ trên GDP ổn định vì ngân sách cơ bản cân bằng', 'Debt to GDP is stable because the primary budget is balanced'),
              why: b('Cân bằng cơ bản chỉ đủ khi r = g. Ở đây lãi vẫn phải trả bằng cách vay thêm.', 'A primary balance suffices only when r = g. Here interest is still paid by borrowing more.'),
            },
            {
              text: b('Nợ trên GDP tăng khoảng 3,6 điểm phần trăm mỗi năm và tăng tốc dần', 'Debt to GDP rises about 3.6 points a year and accelerates'),
              correct: true,
              why: b('(r − g) × d = 4% × 90% = 3,6 điểm. Nợ càng lớn, mức tăng tuyệt đối càng lớn: hiệu ứng quả cầu tuyết.', '(r − g) × d = 4% × 90% = 3.6 points. The bigger the debt, the bigger the rise: a snowball.'),
            },
            {
              text: b('Nợ trên GDP giảm dần nhờ tăng trưởng dương', 'Debt to GDP falls thanks to positive growth'),
              why: b('Tăng trưởng dương là chưa đủ; nó phải cao hơn lãi suất thực.', 'Positive growth is not enough; it must exceed the real interest rate.'),
            },
          ],
        },
        {
          id: 'm2-l5-q2',
          scenario: b(
            'Nền kinh tế đang toàn dụng lao động, lạm phát 5%. Chính phủ công bố gói chi tiêu lớn tài trợ bằng phát hành trái phiếu. Hệ quả bậc 2 có khả năng nhất là gì?',
            'The economy is at full employment with 5% inflation. The government announces a large spending package financed by bonds. What is the most likely second-order effect?',
          ),
          options: [
            {
              text: b('GDP thực tăng mạnh theo số nhân 1,5', 'Real GDP jumps by the 1.5 multiplier'),
              why: b('Khi đã toàn dụng không còn nguồn lực nhàn rỗi để huy động; số nhân thực gần 0.', 'At full employment there are no idle resources to mobilise; the real multiplier is near zero.'),
            },
            {
              text: b('Lợi suất trái phiếu tăng, lấn át đầu tư tư nhân, và ngân hàng trung ương phải thắt chặt hơn', 'Bond yields rise, private investment is crowded out, and the central bank must tighten more'),
              correct: true,
              why: b('Cầu thêm vào nền kinh tế hết công suất biến thành lạm phát và lãi suất cao hơn chứ không thành sản lượng.', 'Extra demand in a capacity-constrained economy becomes inflation and higher rates, not output.'),
            },
            {
              text: b('Lạm phát giảm vì chính phủ hút tiền qua trái phiếu', 'Inflation falls because bond sales absorb money'),
              why: b('Tiền thu từ trái phiếu được chi ra ngay, nên tổng cầu tăng chứ không giảm.', 'The proceeds are spent straight away, so aggregate demand rises rather than falls.'),
            },
          ],
        },
      ],
    },
  ],
};

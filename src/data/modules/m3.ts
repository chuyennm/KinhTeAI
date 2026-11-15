import { b, type Module } from '../../types';

const md = String.raw;
const py = String.raw;

export const m3: Module = {
  id: 'm3',
  index: 3,
  title: b('Kinh tế Quốc tế & Liên thị trường', 'International Economics & Intermarket Analysis'),
  subtitle: b(
    'Tỷ giá, dòng vốn, đường cong lợi suất và cách các loại tài sản "nói chuyện" với nhau.',
    'Exchange rates, capital flows, the yield curve and how asset classes talk to each other.',
  ),
  outcome: b(
    'Nhìn vào DXY, lợi suất Mỹ 10 năm và giá vàng rồi suy ra áp lực lên tỷ giá USD/VND, dòng vốn ngoại và dư địa chính sách của NHNN.',
    'Look at the DXY, the US 10-year yield and gold, and infer the pressure on USD/VND, foreign flows and the SBV’s room for manoeuvre.',
  ),
  tool: 'yield-curve',
  capstone: b(
    'Viết luận điểm 6–12 tháng về tỷ giá USD/VND: chênh lệch lãi suất, cán cân thanh toán và dự trữ ngoại hối nói gì, kịch bản nào khiến bạn sai.',
    'Write a 6–12 month thesis on USD/VND: what the rate differential, the balance of payments and FX reserves imply, and which scenario would prove you wrong.',
  ),
  lessons: [
    {
      id: 'm3-l1',
      title: b('Tỷ giá và ngang giá lãi suất', 'Exchange rates and interest parity'),
      minutes: 17,
      summary: b(
        'Tỷ giá là giá của một đồng tiền tính bằng đồng tiền khác. Hai lực kéo nó: chênh lệch lạm phát về dài hạn và chênh lệch lãi suất về ngắn hạn.',
        'An exchange rate is the price of one currency in another. Two forces pull it: inflation differentials in the long run and interest differentials in the short run.',
      ),
      core: b(
        md`## Trực giác
Nếu gửi tiền USD được 5% còn gửi VND chỉ được 3%, dòng tiền sẽ chạy sang USD cho đến khi thị trường kỳ vọng VND **mất giá vừa đủ** để xóa lợi thế đó. Tỷ giá là van cân bằng giữa hai mặt bằng lãi suất.

## Ba khái niệm nền
- **Tỷ giá danh nghĩa** $S$: số VND đổi 1 USD. $S$ tăng nghĩa là VND mất giá.
- **Tỷ giá thực (real exchange rate):** $RER = S \times \dfrac{P^*}{P}$, đo sức cạnh tranh hàng hóa.
- **Tỷ giá kỳ hạn** $F$: giá chốt hôm nay cho giao dịch tương lai.

## Ngang giá sức mua (PPP)
Về dài hạn, đồng tiền của nước lạm phát cao hơn sẽ mất giá tương ứng:
$$\%\Delta S \approx \pi_{VN} - \pi_{US}$$

## Ngang giá lãi suất
**Có bảo hiểm (CIP)**, gần như luôn đúng vì là quan hệ kinh doanh chênh lệch giá:
$$F = S \times \frac{1 + i_{VND}}{1 + i_{USD}}$$
**Không bảo hiểm (UIP)**, là lý thuyết về kỳ vọng và thường sai trong ngắn hạn:
$$E[\%\Delta S] \approx i_{VND} - i_{USD}$$
UIP sai chính là lý do **carry trade** (vay đồng lãi thấp, gửi đồng lãi cao) có lãi trong nhiều năm rồi lỗ rất nhanh khi thị trường hoảng loạn.

## Cơ chế tỷ giá của Việt Nam
NHNN công bố **tỷ giá trung tâm** mỗi ngày, dựa trên giỏ tám đồng tiền và cung cầu thị trường. Ngân hàng thương mại được giao dịch trong biên độ **±5%** quanh mức đó. Đây là **thả nổi có quản lý (managed float)**: không cố định, cũng không thả tự do.

> Câu hỏi bậc 2: VND mất giá có lợi cho xuất khẩu, nhưng Việt Nam nhập phần lớn nguyên liệu và vay nợ bằng USD. Ai được, ai mất?`,
        md`## Intuition
If a dollar deposit pays 5% and a dong deposit only 3%, money flows to the dollar until markets expect the dong to **depreciate just enough** to erase the advantage. The exchange rate is the valve that balances two interest-rate levels.

## Three basics
- **Nominal rate** $S$: dong per dollar. A higher $S$ means a weaker dong.
- **Real exchange rate:** $RER = S \times \dfrac{P^*}{P}$, a gauge of goods competitiveness.
- **Forward rate** $F$: a price fixed today for a future exchange.

## Purchasing-power parity (PPP)
In the long run the currency with higher inflation depreciates accordingly:
$$\%\Delta S \approx \pi_{VN} - \pi_{US}$$

## Interest parity
**Covered (CIP)** — almost always holds, because it is an arbitrage relation:
$$F = S \times \frac{1 + i_{VND}}{1 + i_{USD}}$$
**Uncovered (UIP)** — a theory about expectations that often fails in the short run:
$$E[\%\Delta S] \approx i_{VND} - i_{USD}$$
The failure of UIP is exactly why the **carry trade** (borrow the low-rate currency, hold the high-rate one) earns for years and then loses very fast in a panic.

## Vietnam's regime
The SBV publishes a daily **central rate** based on a basket of eight currencies and market supply and demand. Banks may trade within **±5%** of it. This is a **managed float**: neither fixed nor free.

> The second-order question: a weaker dong helps exporters, but Vietnam imports most of its inputs and borrows in dollars. Who wins and who loses?`,
      ),
      examples: b(
        md`## Ví dụ số: tỷ giá kỳ hạn
Tỷ giá giao ngay 25.000 VND/USD, lãi suất VND 6%/năm, lãi suất USD 4%/năm. Tỷ giá kỳ hạn 1 năm:
$$F = 25.000 \times \frac{1{,}06}{1{,}04} \approx 25.481$$
Kỳ hạn cao hơn giao ngay khoảng 1,9%, đúng bằng chênh lệch lãi suất. Doanh nghiệp nhập khẩu muốn bảo hiểm tỷ giá phải trả "phí" này.

## Điều gì xảy ra khi chênh lệch đảo chiều
Năm 2022–2024 lãi suất USD (5,25–5,5%) **cao hơn** lãi suất VND liên ngân hàng trong nhiều giai đoạn. Khi đó giữ USD vừa an toàn vừa lãi cao hơn, nên doanh nghiệp găm ngoại tệ và ngân hàng mua USD. VND mất giá khoảng **3%** năm 2023 và **5%** năm 2024 dù Việt Nam xuất siêu lớn. Chênh lệch lãi suất thắng cán cân thương mại trong ngắn hạn.

## PPP trong dài hạn
Từ 2005 đến 2024, USD/VND đi từ khoảng 15.900 lên khoảng 25.500, tức VND mất giá bình quân khoảng **2,5% mỗi năm**. Cùng giai đoạn lạm phát Việt Nam cao hơn Mỹ bình quân khoảng 4 điểm phần trăm. Tức VND mất giá danh nghĩa **ít hơn** PPP gợi ý, nghĩa là tỷ giá thực của VND **tăng**: hàng Việt Nam đắt lên tương đối, được bù lại bằng năng suất tăng nhờ FDI.

## Carry trade đồng yên
Nhiều năm nhà đầu tư vay JPY lãi suất 0% để mua tài sản USD. Đầu tháng 8/2024, Ngân hàng Trung ương Nhật tăng lãi suất và số liệu việc làm Mỹ yếu. JPY tăng khoảng 10% trong vài tuần, các vị thế bị đóng ồ ạt và chỉ số Nikkei giảm hơn **12% trong một ngày**. Carry trade giống "nhặt tiền lẻ trước xe lu".`,
        md`## Worked numbers: the forward rate
Spot is 25,000 dong per dollar, the dong rate 6% a year, the dollar rate 4%. The one-year forward:
$$F = 25{,}000 \times \frac{1.06}{1.04} \approx 25{,}481$$
The forward sits about 1.9% above spot — exactly the rate differential. An importer hedging FX risk pays this "premium".

## What happens when the differential flips
In 2022–2024 dollar rates (5.25–5.5%) were **above** dong interbank rates for long stretches. Holding dollars was both safer and better paid, so firms hoarded FX and banks bought dollars. The dong fell about **3%** in 2023 and **5%** in 2024 despite a large trade surplus. In the short run the rate differential beats the trade balance.

## PPP over the long run
From 2005 to 2024 USD/VND went from about 15,900 to about 25,500 — an average depreciation of roughly **2.5% a year**. Over the same period Vietnam's inflation exceeded America's by about four points a year. So the dong depreciated **less** than PPP implies, meaning its real exchange rate **appreciated**: Vietnamese goods became relatively dearer, offset by FDI-driven productivity gains.

## The yen carry trade
For years investors borrowed yen at 0% to buy dollar assets. In early August 2024 the Bank of Japan raised rates and US jobs data disappointed. The yen rose about 10% in weeks, positions were unwound en masse and the Nikkei fell more than **12% in a day**. The carry trade is "picking up pennies in front of a steamroller".`,
      ),
      lab: {
        kind: 'python',
        mission: b(
          'Chạy code để xem VND mất giá từng năm so với chênh lệch lạm phát Việt Nam–Mỹ. Năm nào VND mất giá mạnh nhất, và lúc đó lạm phát Việt Nam ra sao? Sau đó đổi lãi suất trong phần CIP để thấy khi nào tỷ giá kỳ hạn thấp hơn giao ngay.',
          'Run the code to compare the dong’s yearly depreciation with the Vietnam–US inflation gap. Which year saw the sharpest fall, and what was Vietnamese inflation then? Then change the rates in the CIP section to see when the forward falls below spot.',
        ),
        code: py`# Exchange rate, purchasing-power parity and covered interest parity
vn = load('vn_macro')
us = load('us_macro')[['year', 'cpi_yoy']].rename(columns={'cpi_yoy': 'us_cpi'})
df = vn.merge(us, on='year')

df['depreciation'] = df.usdvnd.pct_change() * 100          # + means weaker dong
df['infl_gap'] = df.cpi_yoy - df.us_cpi                     # relative PPP predictor
print(df[['year', 'usdvnd', 'depreciation', 'infl_gap']].round(1).to_string(index=False))

n = len(df) - 1
avg_dep = ((df.usdvnd.iloc[-1] / df.usdvnd.iloc[0]) ** (1 / n) - 1) * 100
print(f"\nAverage depreciation {avg_dep:.2f}%/yr vs average inflation gap {df.infl_gap[1:].mean():.2f}%/yr")
print("-> the dong fell LESS than PPP implies: its real exchange rate appreciated.")

chart(df.year[1:], {'Dong depreciation': df.depreciation[1:], 'Inflation gap VN-US': df.infl_gap[1:]},
      kind='bar', title='Depreciation vs inflation gap (%)', xlabel='Year')

# Real exchange rate index (up = Vietnamese goods relatively more expensive)
rer = (1 + df.infl_gap[1:] / 100).cumprod() / (df.usdvnd[1:] / df.usdvnd.iloc[0])
chart(df.year[1:], rer * 100, title='Real appreciation of the dong vs USD (index)', xlabel='Year')

# Covered interest parity
spot, i_vnd, i_usd = 25000, 0.06, 0.04       # try i_vnd = 0.03, i_usd = 0.055
forward = spot * (1 + i_vnd) / (1 + i_usd)
print(f"\nCIP: spot {spot:,} -> 1y forward {forward:,.0f} ({forward / spot - 1:+.2%})")
`,
      },
      quiz: [
        {
          id: 'm3-l1-q1',
          scenario: b(
            'Việt Nam đang xuất siêu 20 tỷ USD, nhưng lãi suất USD cao hơn lãi suất VND 2 điểm phần trăm và thị trường kỳ vọng Fed giữ lãi suất cao lâu. Áp lực ngắn hạn lên USD/VND có khả năng nhất là gì?',
            'Vietnam runs a USD 20 billion trade surplus, but dollar rates are two points above dong rates and markets expect the Fed to stay high for long. What is the most likely short-run pressure on USD/VND?',
          ),
          options: [
            {
              text: b('VND tăng giá mạnh vì xuất siêu mang USD về', 'The dong strengthens sharply because the surplus brings in dollars'),
              why: b('Xuất siêu chỉ tạo cung USD nếu doanh nghiệp bán USD. Khi giữ USD có lợi hơn, họ găm lại.', 'A surplus creates dollar supply only if exporters sell. When holding dollars pays more, they hoard.'),
            },
            {
              text: b('VND chịu áp lực mất giá vì dòng tiền ưa nắm giữ USD lãi suất cao', 'The dong is under pressure as money prefers high-yielding dollars'),
              correct: true,
              why: b('Trong ngắn hạn tài khoản tài chính và hành vi găm giữ chi phối, không phải cán cân thương mại.', 'In the short run the financial account and hoarding behaviour dominate, not the trade balance.'),
            },
            {
              text: b('Không có áp lực vì tỷ giá do NHNN quyết định', 'No pressure; the SBV sets the rate'),
              why: b('NHNN chỉ đặt tỷ giá trung tâm và biên độ; giữ tỷ giá ngược lực thị trường phải trả giá bằng dự trữ hoặc lãi suất.', 'The SBV sets a central rate and a band; holding the line against the market costs reserves or higher rates.'),
            },
          ],
        },
        {
          id: 'm3-l1-q2',
          scenario: b(
            'Một quỹ vay JPY lãi suất 0,1% để mua trái phiếu MXN lãi suất 11% và không bảo hiểm tỷ giá. Rủi ro chính của chiến lược này là gì?',
            'A fund borrows yen at 0.1% to buy peso bonds yielding 11%, unhedged. What is the main risk?',
          ),
          options: [
            {
              text: b('Rủi ro lãi suất peso giảm nhẹ', 'Peso rates drifting lower'),
              why: b('Lãi suất giảm còn làm giá trái phiếu tăng. Đây không phải rủi ro lớn nhất.', 'Lower rates would actually lift bond prices. That is not the big risk.'),
            },
            {
              text: b('JPY tăng giá đột ngột khi thị trường hoảng loạn, xóa nhiều năm lợi nhuận trong vài ngày', 'A sudden yen rally in a panic erases years of carry in days'),
              correct: true,
              why: b('Carry trade có phân phối lợi nhuận lệch trái: lãi nhỏ đều đặn, lỗ lớn hiếm gặp. Mọi người cùng thoát một cửa.', 'Carry returns are negatively skewed: steady small gains, rare large losses — and everyone exits through one door.'),
            },
            {
              text: b('Không có rủi ro vì chênh lệch lãi suất là lợi nhuận chắc chắn', 'None; the rate differential is locked-in profit'),
              why: b('Nếu chắc chắn thì CIP đã triệt tiêu nó. Lợi nhuận này là phần bù cho rủi ro tỷ giá.', 'If it were certain, CIP would have removed it. The return is compensation for currency risk.'),
            },
          ],
        },
      ],
    },
    {
      id: 'm3-l2',
      title: b('Cán cân thanh toán và dòng vốn FDI, FII', 'The balance of payments and FDI/FII flows'),
      minutes: 16,
      summary: b(
        'Cán cân thanh toán là sổ cái ghi mọi giao dịch của một nước với thế giới. Nó cho biết đồng tiền đang được chống đỡ bằng gì.',
        'The balance of payments is the ledger of a country’s dealings with the world. It shows what is propping up the currency.',
      ),
      core: b(
        md`## Trực giác
Một quốc gia giống một hộ gia đình: nếu chi nhiều hơn thu (thâm hụt vãng lai) thì phải vay hoặc bán tài sản (thặng dư tài chính), hoặc rút tiền tiết kiệm (giảm dự trữ ngoại hối). Sổ sách luôn phải cân.

## Cấu trúc
$$\underbrace{CA}_{\text{vãng lai}} + \underbrace{KA}_{\text{vốn}} + \underbrace{FA}_{\text{tài chính}} + \text{sai số} = \Delta\,\text{Dự trữ}$$

- **Cán cân vãng lai (current account):** thương mại hàng hóa và dịch vụ, thu nhập đầu tư, kiều hối.
- **Cán cân tài chính (financial account):** FDI, đầu tư gián tiếp (FII), vay nợ, tiền gửi.
- **Dự trữ ngoại hối:** phần chênh lệch mà ngân hàng trung ương hấp thụ.

Một đồng nhất thức quan trọng:
$$CA = S - I$$
Thâm hụt vãng lai nghĩa là quốc gia **đầu tư nhiều hơn tiết kiệm** và đang nhập khẩu vốn.

## FDI và FII: chất lượng dòng vốn
| | FDI | FII (vốn gián tiếp) |
|---|---|---|
| Bản chất | Xây nhà máy, nắm quyền kiểm soát | Mua cổ phiếu, trái phiếu |
| Tính ổn định | "Dính", khó rút | "Nóng", rút trong vài ngày |
| Phản ứng với lãi suất Mỹ | Yếu | Rất mạnh |

Thâm hụt vãng lai được tài trợ bằng FDI thì bền. Tài trợ bằng vốn nóng ngắn hạn là công thức của khủng hoảng (châu Á 1997).

## Thước đo an toàn dự trữ
- Số **tháng nhập khẩu** mà dự trữ trang trải được. Ngưỡng tối thiểu theo thông lệ là 3 tháng.
- Dự trữ so với **nợ nước ngoài ngắn hạn** (quy tắc Guidotti–Greenspan: ít nhất 100%).

> Câu hỏi bậc 2: mục "sai số và bỏ sót" lớn và âm kéo dài thường là dấu hiệu vốn chảy ra ngoài kênh chính thức.`,
        md`## Intuition
A country is like a household: if it spends more than it earns (a current-account deficit) it must borrow or sell assets (a financial-account surplus), or draw on savings (falling FX reserves). The books always balance.

## Structure
$$\underbrace{CA}_{\text{current}} + \underbrace{KA}_{\text{capital}} + \underbrace{FA}_{\text{financial}} + \text{errors} = \Delta\,\text{Reserves}$$

- **Current account:** trade in goods and services, investment income, remittances.
- **Financial account:** FDI, portfolio investment (FII), loans, deposits.
- **FX reserves:** the residual the central bank absorbs.

A key identity:
$$CA = S - I$$
A current-account deficit means the country **invests more than it saves** and is importing capital.

## FDI versus FII: the quality of flows
| | FDI | FII (portfolio) |
|---|---|---|
| Nature | Builds factories, takes control | Buys stocks and bonds |
| Stability | "Sticky", hard to withdraw | "Hot", gone in days |
| Sensitivity to US rates | Weak | Very strong |

A deficit funded by FDI is durable. One funded by short-term hot money is the recipe for a crisis (Asia 1997).

## Reserve adequacy
- **Months of imports** covered by reserves. The conventional minimum is three.
- Reserves relative to **short-term external debt** (the Guidotti–Greenspan rule: at least 100%).

> The second-order question: a large, persistently negative "errors and omissions" line usually signals capital leaving through unofficial channels.`,
      ),
      examples: b(
        md`## Việt Nam 2024 (số làm tròn)
| Khoản mục | Tỷ USD |
|---|---|
| Xuất khẩu hàng hóa | ≈ 405 |
| Nhập khẩu hàng hóa | ≈ 381 |
| **Thặng dư thương mại hàng hóa** | **≈ +25** |
| FDI thực hiện | ≈ 25 |
| Kiều hối | ≈ 16 |

Trên giấy, nguồn cung USD rất dồi dào. Vậy vì sao VND vẫn mất giá khoảng 5%?

- Khu vực FDI tạo ra phần lớn thặng dư thương mại, rồi **chuyển lợi nhuận về nước** (ghi âm ở mục thu nhập đầu tư).
- Cán cân **dịch vụ** thâm hụt (vận tải, bảo hiểm).
- Khối ngoại **bán ròng cổ phiếu** kỷ lục, khoảng 3–4 tỷ USD.
- Doanh nghiệp và người dân **găm giữ USD** vì lãi suất USD cao hơn.

Bài học: phải đọc toàn bộ cán cân thanh toán, không chỉ cán cân thương mại.

## Ví dụ số: mức an toàn dự trữ
Dự trữ khoảng 80 tỷ USD, nhập khẩu 381 tỷ USD mỗi năm, tức khoảng 31,8 tỷ USD mỗi tháng:
$$\frac{80}{31{,}8} \approx 2{,}5\ \text{tháng nhập khẩu}$$
Dưới ngưỡng 3 tháng theo thông lệ. Đây là lý do NHNN thận trọng khi bán dự trữ và ưu tiên dùng tín phiếu, lãi suất liên ngân hàng để giữ tỷ giá. (Con số dự trữ là ước tính; NHNN không công bố thường xuyên.)

## Khủng hoảng châu Á 1997
Thái Lan neo đồng baht vào USD, thâm hụt vãng lai khoảng **8% GDP**, tài trợ bằng vay ngắn hạn USD để đầu tư bất động sản. Khi dòng vốn đảo chiều, dự trữ cạn trong vài tháng. Tháng 7/1997 baht bị thả nổi và mất hơn một nửa giá trị. Doanh nghiệp vay USD, thu baht phá sản hàng loạt. Ba yếu tố độc hại: tỷ giá cố định, vốn nóng và **lệch pha tiền tệ (currency mismatch)**.

## Mỹ: ngoại lệ
Mỹ thâm hụt vãng lai liên tục nhiều thập kỷ mà không gặp khủng hoảng, vì cả thế giới muốn nắm giữ tài sản USD. Đây là "đặc quyền quá đáng" của đồng tiền dự trữ.`,
        md`## Vietnam 2024 (rounded)
| Item | USD billion |
|---|---|
| Goods exports | ≈ 405 |
| Goods imports | ≈ 381 |
| **Goods trade surplus** | **≈ +25** |
| FDI disbursed | ≈ 25 |
| Remittances | ≈ 16 |

On paper dollars were plentiful. So why did the dong still lose about 5%?

- The FDI sector generates most of the trade surplus and then **repatriates profits** (a negative entry in investment income).
- The **services** balance is in deficit (shipping, insurance).
- Foreigners were record **net sellers of equities**, about USD 3–4 billion.
- Firms and households **hoarded dollars** because dollar rates were higher.

Lesson: read the whole balance of payments, not just the trade balance.

## Worked numbers: reserve adequacy
Reserves of about USD 80 billion, imports of USD 381 billion a year, i.e. about 31.8 billion a month:
$$\frac{80}{31.8} \approx 2.5\ \text{months of imports}$$
Below the conventional three-month floor. That is why the SBV is cautious about selling reserves and prefers bills and interbank rates to defend the currency. (The reserve figure is an estimate; the SBV does not publish it regularly.)

## The 1997 Asian crisis
Thailand pegged the baht to the dollar and ran a current-account deficit of about **8% of GDP**, funded by short-term dollar borrowing for property. When flows reversed, reserves ran out within months. In July 1997 the baht was floated and lost more than half its value. Firms with dollar debts and baht income failed in droves. Three toxic ingredients: a fixed rate, hot money and a **currency mismatch**.

## The US exception
America has run current-account deficits for decades without a crisis because the world wants dollar assets. This is the reserve currency's "exorbitant privilege".`,
      ),
      lab: {
        kind: 'python',
        mission: b(
          'Chạy code để dựng cán cân thanh toán đơn giản và tính số tháng nhập khẩu được bảo đảm. Sau đó thử cú sốc: vốn gián tiếp rút 10 tỷ USD và găm giữ ngoại tệ tăng thêm 8 tỷ. Dự trữ còn bao nhiêu tháng nhập khẩu? NHNN có những lựa chọn nào?',
          'Run the code to build a simple balance of payments and compute import cover. Then apply a shock: portfolio outflows of USD 10 billion and extra FX hoarding of 8 billion. How many months of imports are left? What options does the SBV have?',
        ),
        code: py`# A stylised balance of payments (USD billion) and reserve adequacy
bop = {
    'Goods exports':            405,
    'Goods imports':           -381,
    'Services balance':         -12,
    'Investment income (net)':  -24,   # FDI firms repatriating profit
    'Remittances':               16,
    'FDI inflow (net)':          20,
    'Portfolio flows (FII)':     -4,   # shock: try -14
    'Other / hoarding':         -22,   # shock: try -30
}
reserves_start = 92

current = sum(v for k, v in bop.items() if k in ['Goods exports', 'Goods imports', 'Services balance',
                                                 'Investment income (net)', 'Remittances'])
financial = sum(v for k, v in bop.items() if k in ['FDI inflow (net)', 'Portfolio flows (FII)', 'Other / hoarding'])
overall = current + financial
reserves_end = reserves_start + overall

for k, v in bop.items():
    print(f"{k:28s}{v:8.0f}")
print("-" * 36)
print(f"{'Current account':28s}{current:8.0f}")
print(f"{'Financial account':28s}{financial:8.0f}")
print(f"{'Overall balance':28s}{overall:8.0f}   <- change in FX reserves")

monthly_imports = -bop['Goods imports'] / 12
print(f"\nReserves: {reserves_start} -> {reserves_end:.0f} bn USD")
print(f"Import cover: {reserves_end / monthly_imports:.1f} months (rule of thumb: at least 3)")

chart(list(bop.keys()), list(bop.values()), kind='bar', title='Balance of payments items (USD bn)')

# Sticky vs hot money: who leaves when US yields jump?
import numpy as np
us = load('us_macro')
d10 = us.us10y.diff()
print(f"\nYears when US 10y yield rose > 1 point: {us.year[d10 > 1].tolist()}  <- typical portfolio-outflow years for emerging markets")
`,
      },
      quiz: [
        {
          id: 'm3-l2-q1',
          scenario: b(
            'Hai nước cùng thâm hụt vãng lai 5% GDP. Nước A tài trợ bằng FDI xây nhà máy xuất khẩu. Nước B tài trợ bằng tiền gửi ngắn hạn của nước ngoài vào ngân hàng để cho vay bất động sản. Khi Fed tăng lãi suất mạnh, nước nào dễ gặp khủng hoảng hơn?',
            'Two countries run current-account deficits of 5% of GDP. Country A funds it with FDI building export factories. Country B funds it with short-term foreign deposits that banks lend to property. When the Fed hikes hard, which is more crisis-prone?',
          ),
          options: [
            {
              text: b('Nước A, vì FDI lớn hơn nên rút ra cũng lớn hơn', 'A: bigger FDI means bigger withdrawals'),
              why: b('Nhà máy không thể rút đi trong một tuần. FDI là dòng vốn ổn định nhất.', 'Factories cannot leave in a week. FDI is the stickiest flow.'),
            },
            {
              text: b('Nước B, vì vốn ngắn hạn rút nhanh trong khi tài sản là bất động sản khó bán', 'B: short-term money flees fast while the assets are illiquid property'),
              correct: true,
              why: b('Lệch pha kỳ hạn và tiền tệ: nợ ngắn hạn bằng ngoại tệ, tài sản dài hạn bằng nội tệ. Đây là cấu trúc của Thái Lan 1997.', 'A maturity and currency mismatch: short-term FX liabilities against long-term local assets — Thailand in 1997.'),
            },
            {
              text: b('Như nhau, vì mức thâm hụt bằng nhau', 'Equally; the deficits are the same size'),
              why: b('Quy mô thâm hụt quan trọng, nhưng cách tài trợ quyết định mức độ mong manh.', 'Size matters, but how the deficit is financed decides its fragility.'),
            },
          ],
        },
        {
          id: 'm3-l2-q2',
          scenario: b(
            'Một nước báo cáo xuất siêu hàng hóa kỷ lục, nhưng dự trữ ngoại hối giảm và đồng nội tệ yếu đi. Nhà phân tích nên kiểm tra điều gì trước tiên?',
            'A country reports a record goods surplus, yet its reserves fall and its currency weakens. What should an analyst check first?',
          ),
          options: [
            {
              text: b('Các khoản mục còn lại: thu nhập đầu tư chuyển ra, cán cân dịch vụ, dòng vốn gián tiếp và mục sai số', 'The other lines: income outflows, services, portfolio flows and errors and omissions'),
              correct: true,
              why: b('Thặng dư hàng hóa có thể bị bù trừ bởi chuyển lợi nhuận FDI, thâm hụt dịch vụ, vốn rút ra và găm giữ ngoại tệ.', 'A goods surplus can be offset by FDI profit repatriation, a services deficit, outflows and FX hoarding.'),
            },
            {
              text: b('Số liệu xuất khẩu chắc chắn bị khai khống', 'The export data must be falsified'),
              why: b('Không cần giả định gian lận; đồng nhất thức cán cân thanh toán đã đủ giải thích.', 'No fraud is needed; the balance-of-payments identity explains it.'),
            },
            {
              text: b('Lạm phát trong nước', 'Domestic inflation'),
              why: b('Lạm phát ảnh hưởng tỷ giá dài hạn nhưng không giải thích nghịch lý kế toán này.', 'Inflation matters for the long-run exchange rate but does not explain this accounting puzzle.'),
            },
          ],
        },
      ],
    },
    {
      id: 'm3-l3',
      title: b('Bộ ba bất khả thi', 'The impossible trinity'),
      minutes: 16,
      summary: b(
        'Không quốc gia nào có thể đồng thời có tỷ giá cố định, dòng vốn tự do và chính sách tiền tệ độc lập. Mọi ngân hàng trung ương đều phải chọn.',
        'No country can have a fixed exchange rate, free capital flows and an independent monetary policy at once. Every central bank must choose.',
      ),
      core: b(
        md`## Trực giác
Giả sử Việt Nam muốn giữ USD/VND cố định, cho vốn ra vào tự do, và cắt lãi suất xuống thấp hơn Mỹ để kích thích kinh tế. Ngay lập tức tiền sẽ bán VND mua USD để hưởng lãi cao hơn. Muốn giữ tỷ giá, NHNN phải bán dự trữ cho đến khi cạn, hoặc tăng lãi suất trở lại, hoặc chặn dòng vốn. Một trong ba mục tiêu buộc phải nhường.

## Ba đỉnh của tam giác
1. **Tỷ giá ổn định**
2. **Dòng vốn tự do**
3. **Chính sách tiền tệ độc lập**

Chỉ chọn được **hai**:

| Lựa chọn | Từ bỏ | Ví dụ |
|---|---|---|
| Tỷ giá cố định + vốn tự do | Tiền tệ độc lập | Hồng Kông, khu vực đồng euro |
| Vốn tự do + tiền tệ độc lập | Tỷ giá ổn định | Mỹ, Nhật, Anh |
| Tỷ giá cố định + tiền tệ độc lập | Vốn tự do | Trung Quốc trước đây |

## Cơ chế qua ngang giá lãi suất
$$i_{VND} - i_{USD} \approx E[\%\Delta S]$$
Nếu vốn tự do và tỷ giá cố định ($E[\%\Delta S] = 0$) thì buộc $i_{VND} = i_{USD}$. Lãi suất trong nước do Fed quyết định.

## Việt Nam đứng ở đâu
Việt Nam chọn **vị trí trung gian**: tỷ giá thả nổi có quản lý trong biên độ, kiểm soát vốn một phần (giới hạn sở hữu nước ngoài, quản lý vay nợ nước ngoài), và độc lập tiền tệ có giới hạn. Vị trí này linh hoạt khi sóng yên, nhưng khi Fed tăng mạnh thì cả ba mục tiêu cùng bị kéo căng.

## Bốn "van xả" của NHNN khi có áp lực
1. Để tỷ giá mất giá trong biên độ
2. Bán dự trữ ngoại hối
3. Tăng lãi suất hoặc hút thanh khoản bằng tín phiếu
4. Biện pháp hành chính đối với thị trường ngoại tệ và vàng

Mỗi van đều có chi phí. Nghệ thuật điều hành là phối hợp chúng.`,
        md`## Intuition
Suppose Vietnam wanted a fixed USD/VND, free capital movement, and rates cut below America's to stimulate growth. At once money would sell dong for dollars to earn the higher yield. To hold the peg the SBV would have to sell reserves until they ran out, or raise rates again, or block capital. One of the three goals must give.

## The three corners
1. **A stable exchange rate**
2. **Free capital flows**
3. **Independent monetary policy**

You may pick only **two**:

| Choice | Given up | Examples |
|---|---|---|
| Fixed rate + free capital | Monetary independence | Hong Kong, the euro area |
| Free capital + independence | Exchange-rate stability | US, Japan, UK |
| Fixed rate + independence | Free capital | China in the past |

## The mechanism through interest parity
$$i_{VND} - i_{USD} \approx E[\%\Delta S]$$
With free capital and a fixed rate ($E[\%\Delta S] = 0$), $i_{VND} = i_{USD}$ is forced. Domestic rates are set by the Fed.

## Where Vietnam stands
Vietnam picks a **middle position**: a managed float within a band, partial capital controls (foreign-ownership limits, managed external borrowing) and limited monetary independence. It is flexible in calm seas, but when the Fed hikes hard all three goals are stretched together.

## The SBV's four release valves under pressure
1. Let the currency weaken within the band
2. Sell FX reserves
3. Raise rates or drain liquidity with bills
4. Administrative measures in the FX and gold markets

Each valve has a cost. The art of policy is combining them.`,
      ),
      examples: b(
        md`## Việt Nam, mùa thu 2022: cả bốn van cùng mở
Fed tăng lãi suất 75 điểm cơ bản bốn lần liên tiếp, DXY lên 114, cao nhất 20 năm.

| Van | Hành động của NHNN |
|---|---|
| Tỷ giá | Nới biên độ từ ±3% lên **±5%** (17/10/2022); VND mất giá khoảng 9% tại đỉnh |
| Dự trữ | Bán ước khoảng **20% dự trữ** ngoại hối |
| Lãi suất | Tăng lãi suất điều hành **200 điểm cơ bản** trong một tháng |
| Hành chính | Siết thanh khoản, kiểm soát giao dịch ngoại tệ |

Cái giá: lãi suất tăng đúng lúc thị trường trái phiếu doanh nghiệp và bất động sản khủng hoảng niềm tin. Mục tiêu tỷ giá được ưu tiên hơn mục tiêu tăng trưởng trong vài tháng.

## Hồng Kông: từ bỏ hoàn toàn tiền tệ độc lập
HKD neo vào USD ở mức 7,75–7,85 từ năm 1983. Khi Fed tăng lãi suất lên 5,5%, lãi suất Hồng Kông phải theo dù kinh tế Hồng Kông gắn với Trung Quốc đang yếu. Giá nhà giảm hơn 20% từ đỉnh. Đó là chi phí của việc nhập khẩu chính sách tiền tệ.

## Vương quốc Anh 1992: "Thứ Tư đen tối"
Bảng Anh neo vào Mark Đức trong cơ chế ERM. Đức tăng lãi suất để chống lạm phát sau thống nhất, trong khi Anh đang suy thoái và cần lãi suất thấp. George Soros và các quỹ đặt cược rằng Anh không thể chịu được lãi suất cao. Ngày 16/9/1992, Ngân hàng Trung ương Anh tăng lãi suất từ 10% lên 15% trong một ngày rồi vẫn phải bỏ neo. Bài học: thị trường tấn công khi thấy cam kết tỷ giá **mâu thuẫn với nhu cầu của nền kinh tế trong nước**.

## Thị trường vàng SJC: van xả không chính thức
Khi người dân lo VND mất giá mà không dễ mua USD, họ mua vàng. Do nguồn cung vàng miếng trong nước bị giới hạn bởi quy định về nhập khẩu, giá vàng SJC có lúc cao hơn giá thế giới quy đổi **15–20 triệu đồng mỗi lượng** (2024). Mức chênh này là nhiệt kế đo áp lực lên bộ ba bất khả thi.`,
        md`## Vietnam, autumn 2022: all four valves open
The Fed raised rates by 75 basis points four times running; the DXY hit 114, a 20-year high.

| Valve | SBV action |
|---|---|
| Exchange rate | Band widened from ±3% to **±5%** (17 Oct 2022); the dong fell about 9% at the trough |
| Reserves | Sold an estimated **20% of FX reserves** |
| Rates | Policy rates up **200 basis points** in a month |
| Administrative | Tighter liquidity, FX transaction controls |

The price: rates rose just as the corporate-bond and property markets suffered a crisis of confidence. For some months the exchange-rate goal outranked growth.

## Hong Kong: monetary independence fully surrendered
The HKD has been pegged to the dollar at 7.75–7.85 since 1983. When the Fed went to 5.5%, Hong Kong rates had to follow even though its economy, tied to a weak China, needed the opposite. Home prices fell more than 20% from the peak. That is the cost of importing monetary policy.

## Britain 1992: "Black Wednesday"
Sterling was pegged to the Deutschmark in the ERM. Germany raised rates to fight post-unification inflation while Britain was in recession and needed low rates. George Soros and other funds bet that Britain could not bear high rates. On 16 September 1992 the Bank of England raised rates from 10% to 15% in a day and still had to abandon the peg. Lesson: markets attack when a currency commitment **conflicts with the needs of the domestic economy**.

## The SJC gold market: an unofficial valve
When people fear dong depreciation but cannot easily buy dollars, they buy gold. Because the domestic supply of gold bars is restricted by import rules, SJC gold at times traded **VND 15–20 million per tael** above the converted world price (2024). That premium is a thermometer for pressure on the trinity.`,
      ),
      lab: {
        kind: 'sim',
        sim: 'central-bank',
        mission: b(
          'Nhiệm vụ: đặt lãi suất Fed lên 5,5% và giữ lãi suất trong nước ở 4,5%. Quan sát chỉ báo "Áp lực tỷ giá". (1) Thử giữ tỷ giá bằng cách tăng lãi suất: GDP và tín dụng trả giá bao nhiêu? (2) Thử chấp nhận mất giá: lạm phát nhập khẩu thay đổi ra sao? Không có lựa chọn nào miễn phí.',
          'Mission: set the Fed rate to 5.5% and hold the domestic rate at 4.5%. Watch the "FX pressure" gauge. (1) Defend the currency by raising rates: what do GDP and credit pay? (2) Accept depreciation instead: what happens to imported inflation? No option is free.',
        ),
      },
      quiz: [
        {
          id: 'm3-l3-q1',
          scenario: b(
            'Một nền kinh tế nhỏ neo cứng đồng tiền vào USD và cho phép vốn tự do. Kinh tế trong nước suy thoái, nhưng Fed đang tăng lãi suất. Ngân hàng trung ương nước này có thể làm gì với lãi suất?',
            'A small economy has a hard peg to the dollar and free capital flows. It is in recession while the Fed is hiking. What can its central bank do with rates?',
          ),
          options: [
            {
              text: b('Giảm lãi suất để chống suy thoái', 'Cut rates to fight the recession'),
              why: b('Giảm lãi suất khi Fed tăng sẽ kích hoạt dòng vốn tháo chạy và phá vỡ tỷ giá neo.', 'Cutting while the Fed hikes triggers capital flight and breaks the peg.'),
            },
            {
              text: b('Buộc phải tăng lãi suất theo Fed dù kinh tế đang yếu', 'It must raise rates with the Fed despite the weak economy'),
              correct: true,
              why: b('Đã chọn tỷ giá cố định và vốn tự do thì phải từ bỏ chính sách tiền tệ độc lập.', 'Having chosen a fixed rate and free capital, it has given up monetary independence.'),
            },
            {
              text: b('Giữ nguyên lãi suất và mọi thứ sẽ ổn', 'Hold rates and all will be fine'),
              why: b('Chênh lệch lãi suất mở rộng sẽ hút cạn dự trữ ngoại hối.', 'A widening rate gap drains FX reserves.'),
            },
          ],
        },
        {
          id: 'm3-l3-q2',
          scenario: b(
            'Fed tăng lãi suất mạnh. NHNN quyết định không tăng lãi suất, không bán dự trữ và không siết giao dịch ngoại tệ. Biến số nào bắt buộc phải điều chỉnh?',
            'The Fed hikes hard. The SBV decides not to raise rates, not to sell reserves and not to tighten FX controls. Which variable must adjust?',
          ),
          options: [
            {
              text: b('Tỷ giá: VND phải mất giá', 'The exchange rate: the dong must depreciate'),
              correct: true,
              why: b('Khi ba van còn lại đóng, toàn bộ áp lực dồn vào tỷ giá. Hệ quả tiếp theo là lạm phát nhập khẩu và gánh nặng nợ ngoại tệ.', 'With the other three valves shut, all pressure falls on the currency — followed by imported inflation and heavier FX debt.'),
            },
            {
              text: b('Không biến số nào, vì NHNN kiểm soát được tỷ giá', 'None; the SBV controls the rate'),
              why: b('Kiểm soát tỷ giá đòi hỏi dùng ít nhất một công cụ. Không dùng công cụ nào thì thị trường quyết định.', 'Controlling the rate requires using at least one tool. With none, the market decides.'),
            },
            {
              text: b('Lãi suất Fed sẽ giảm để phù hợp với Việt Nam', 'The Fed will cut to suit Vietnam'),
              why: b('Fed đặt lãi suất theo điều kiện kinh tế Mỹ.', 'The Fed sets rates for US conditions.'),
            },
          ],
        },
      ],
    },
    {
      id: 'm3-l4',
      title: b('Đường cong lợi suất và phân tích liên thị trường', 'The yield curve and intermarket analysis'),
      minutes: 20,
      summary: b(
        'Trái phiếu, đô la, vàng và cổ phiếu được định giá bằng cùng một biến số: lãi suất thực. Đọc được đường cong lợi suất là đọc được kỳ vọng của cả thị trường.',
        'Bonds, the dollar, gold and equities are priced off the same variable: the real interest rate. Read the yield curve and you read the market’s expectations.',
      ),
      core: b(
        md`## Trực giác
Đường cong lợi suất (yield curve) vẽ lợi suất trái phiếu chính phủ theo kỳ hạn. Bình thường nó **dốc lên**: cho vay càng dài càng đòi lãi cao. Khi nó **đảo ngược** (ngắn hạn cao hơn dài hạn), thị trường đang nói: "lãi suất hiện tại quá cao, sẽ phải giảm vì kinh tế sắp yếu đi".

## Lợi suất dài hạn gồm những gì
$$y_{10Y} \approx \underbrace{\overline{i^e}}_{\text{lãi suất ngắn hạn kỳ vọng bình quân}} + \underbrace{TP}_{\text{phần bù kỳ hạn}}$$
$$y_{danh\,nghĩa} = y_{thực} + \pi^e$$

## Giá trái phiếu và thời gian đáo hạn bình quân (duration)
Giá và lợi suất luôn ngược chiều:
$$\frac{\Delta P}{P} \approx -D \times \Delta y$$
Trái phiếu 10 năm có $D \approx 8$: lợi suất tăng 1 điểm phần trăm thì giá giảm khoảng 8%.

## Chỉ báo suy thoái
Chênh lệch **10 năm trừ 2 năm** (hoặc 10 năm trừ 3 tháng) âm đã xuất hiện trước mọi cuộc suy thoái ở Mỹ từ thập niên 1970, với độ trễ 6–24 tháng. Nhưng nó cũng từng báo động sớm và lần 2022–2024 thì chưa kèm suy thoái.

## Bản đồ liên thị trường
| Khi lợi suất **thực** Mỹ tăng | Lý do |
|---|---|
| USD (DXY) mạnh lên | Tài sản USD hấp dẫn hơn |
| Vàng chịu áp lực | Vàng không sinh lãi; chi phí cơ hội tăng |
| Cổ phiếu tăng trưởng giảm | Dòng tiền xa bị chiết khấu mạnh hơn |
| Thị trường mới nổi bị rút vốn | Chênh lệch lãi suất thu hẹp |

> Tương quan **không cố định**. Cổ phiếu và trái phiếu ngược chiều trong 20 năm lạm phát thấp, rồi cùng giảm năm 2022. Vàng từng bám sát lợi suất thực, rồi tách ra sau 2022 khi các ngân hàng trung ương mua mạnh. Luôn hỏi: *chế độ (regime) nào đang chi phối?*`,
        md`## Intuition
The yield curve plots government-bond yields by maturity. Normally it **slopes up**: longer loans demand more. When it **inverts** (short rates above long rates) the market is saying: "current rates are too high and will have to fall because the economy is about to weaken".

## What a long yield is made of
$$y_{10Y} \approx \underbrace{\overline{i^e}}_{\text{average expected short rate}} + \underbrace{TP}_{\text{term premium}}$$
$$y_{nominal} = y_{real} + \pi^e$$

## Bond prices and duration
Price and yield always move in opposite directions:
$$\frac{\Delta P}{P} \approx -D \times \Delta y$$
A 10-year bond has $D \approx 8$: a one-point rise in yield cuts the price about 8%.

## The recession signal
A negative **10-year minus 2-year** spread (or 10-year minus 3-month) has preceded every US recession since the 1970s, with a 6–24 month lag. But it has also cried wolf, and the 2022–2024 inversion has not been followed by a recession.

## The intermarket map
| When US **real** yields rise | Why |
|---|---|
| The dollar (DXY) strengthens | Dollar assets become more attractive |
| Gold comes under pressure | Gold pays no income; its opportunity cost rises |
| Growth stocks fall | Distant cash flows are discounted harder |
| Emerging markets lose capital | The rate differential narrows |

> Correlations are **not constants**. Stocks and bonds moved inversely through 20 years of low inflation, then fell together in 2022. Gold tracked real yields, then decoupled after 2022 as central banks bought heavily. Always ask: *which regime is in charge?*`,
      ),
      examples: b(
        md`## Ví dụ số: rủi ro lãi suất
Bạn nắm 1 tỷ đồng trái phiếu kỳ hạn 10 năm, duration 8. Lợi suất tăng từ 1,5% lên 3,9% (đúng như Mỹ năm 2022):
$$\frac{\Delta P}{P} \approx -8 \times 2{,}4\% = -19\%$$
"Tài sản an toàn" mất gần một phần năm giá trị. Đây là điều đã xảy ra với danh mục của Silicon Valley Bank.

## Đường cong đảo ngược dài nhất lịch sử
Chênh lệch 10 năm trừ 2 năm của Mỹ âm từ **tháng 7/2022 đến tháng 9/2024**, khoảng 26 tháng, sâu nhất gần −1 điểm phần trăm giữa năm 2023. Trước đó tháng 12/2006 đường cong cũng đảo ngược và suy thoái đến sau một năm. Lần này chưa có suy thoái, một phần nhờ tài khóa rất lỏng và hộ gia đình đã chốt lãi suất vay nhà thấp từ trước.

## Năm 2022: khi tấm khiên 60/40 vỡ
Danh mục 60% cổ phiếu và 40% trái phiếu dựa trên giả định hai loại tài sản bù trừ nhau. Năm 2022 S&P 500 giảm khoảng **19%** và trái phiếu Mỹ giảm khoảng **13%** cùng lúc, vì cú sốc là **lạm phát** chứ không phải tăng trưởng. Khi lạm phát là vấn đề, lãi suất tăng làm cả hai cùng giảm.

## Vàng và lợi suất thực
- 2008–2012: lợi suất thực giảm xuống âm, vàng tăng từ khoảng 870 lên 1.660 USD mỗi ounce.
- 2013: Fed báo hiệu giảm mua trái phiếu, lợi suất thực bật tăng, vàng giảm **27%**.
- 2022–2024: lợi suất thực tăng mạnh nhưng vàng vẫn tăng lên trên 2.600 USD. Lực mới: các ngân hàng trung ương (Trung Quốc, Ấn Độ, Ba Lan…) mua hơn 1.000 tấn mỗi năm sau khi dự trữ của Nga bị đóng băng.

## Truyền dẫn sang Việt Nam
Lợi suất Mỹ tăng → DXY tăng → USD/VND chịu áp lực → NHNN hút thanh khoản → lãi suất liên ngân hàng tăng → khối ngoại bán ròng → VN-Index điều chỉnh. Chuỗi này lặp lại vào tháng 10/2022, tháng 8–10/2023 và tháng 4/2024.`,
        md`## Worked numbers: interest-rate risk
You hold VND 1 billion of 10-year bonds with a duration of 8. Yields rise from 1.5% to 3.9% (as in the US in 2022):
$$\frac{\Delta P}{P} \approx -8 \times 2.4\% = -19\%$$
A "safe asset" loses almost a fifth of its value. This is what happened to Silicon Valley Bank's portfolio.

## The longest inversion on record
The US 10-year minus 2-year spread was negative from **July 2022 to September 2024**, about 26 months, bottoming near −1 point in mid-2023. Earlier, in December 2006, the curve inverted and recession arrived a year later. This time none has followed, partly thanks to very loose fiscal policy and households that had locked in low mortgage rates.

## 2022: the 60/40 shield cracks
A portfolio of 60% stocks and 40% bonds assumes the two offset each other. In 2022 the S&P 500 fell about **19%** and US bonds about **13%** together, because the shock was **inflation**, not growth. When inflation is the problem, rising rates hurt both.

## Gold and real yields
- 2008–2012: real yields fell below zero; gold rose from about USD 870 to 1,660 an ounce.
- 2013: the Fed signalled tapering, real yields jumped and gold fell **27%**.
- 2022–2024: real yields rose sharply yet gold climbed above USD 2,600. A new force: central banks (China, India, Poland…) buying over 1,000 tonnes a year after Russia's reserves were frozen.

## Transmission to Vietnam
US yields up → DXY up → pressure on USD/VND → the SBV drains liquidity → interbank rates rise → foreigners sell → the VN-Index corrects. This chain played out in October 2022, August–October 2023 and April 2024.`,
      ),
      lab: {
        kind: 'sim',
        sim: 'yield-curve',
        mission: b(
          'Nhiệm vụ: (1) So sánh đường cong tháng 12/2021 với tháng 7/2023: đầu nào dịch chuyển nhiều hơn, vì sao? (2) Trong ma trận tương quan, chọn giai đoạn 2000–2012 rồi 2013–2024: tương quan giữa vàng và lợi suất thực đổi thế nào? (3) Ghi một giả thuyết vào Sổ tay về "chế độ" hiện tại.',
          'Mission: (1) Compare the December 2021 curve with July 2023: which end moved more, and why? (2) In the correlation matrix pick 2000–2012 and then 2013–2024: how does the gold–real-yield correlation change? (3) Write a hypothesis in the Journal about the current "regime".',
        ),
      },
      quiz: [
        {
          id: 'm3-l4-q1',
          scenario: b(
            'Lợi suất trái phiếu Mỹ 2 năm là 4,9%, 10 năm là 3,9%. Thị trường đang "nói" điều gì?',
            'The US 2-year yield is 4.9% and the 10-year is 3.9%. What is the market "saying"?',
          ),
          options: [
            {
              text: b('Nhà đầu tư kỳ vọng lạm phát dài hạn tăng mạnh', 'Investors expect long-run inflation to surge'),
              why: b('Nếu vậy lợi suất dài hạn phải cao hơn ngắn hạn, không phải thấp hơn.', 'In that case long yields would be above short yields, not below.'),
            },
            {
              text: b('Thị trường kỳ vọng Fed sẽ phải cắt lãi suất trong tương lai vì kinh tế yếu đi', 'The market expects the Fed to cut later because the economy will weaken'),
              correct: true,
              why: b('Lợi suất dài hạn là bình quân lãi suất ngắn hạn kỳ vọng. Nó thấp hơn hiện tại nghĩa là thị trường thấy lãi suất sẽ giảm.', 'A long yield averages expected short rates. Below today’s rate means the market sees rates falling.'),
            },
            {
              text: b('Trái phiếu 10 năm rủi ro thấp hơn trái phiếu 2 năm', 'The 10-year bond is less risky than the 2-year'),
              why: b('Trái phiếu dài hạn có duration cao hơn nên rủi ro giá lớn hơn.', 'Longer bonds have higher duration and so more price risk.'),
            },
          ],
        },
        {
          id: 'm3-l4-q2',
          scenario: b(
            'Một nhà phân tích nói: "Lợi suất thực Mỹ đang tăng nên vàng chắc chắn giảm, lịch sử 2006–2021 đã chứng minh." Phản biện bậc 2 tốt nhất là gì?',
            'An analyst says: "US real yields are rising, so gold must fall — 2006–2021 proves it." What is the best second-level rebuttal?',
          ),
          options: [
            {
              text: b('Tương quan lịch sử chỉ đúng trong một chế độ; cần kiểm tra xem người mua biên hiện nay có còn là nhà đầu tư nhạy với lãi suất không', 'A historical correlation holds within a regime; check whether the marginal buyer is still a rate-sensitive investor'),
              correct: true,
              why: b('Sau 2022 người mua biên là các ngân hàng trung ương đa dạng hóa dự trữ, vốn không nhạy với lợi suất thực. Quan hệ cũ đã yếu đi.', 'After 2022 the marginal buyer was reserve-diversifying central banks, insensitive to real yields. The old link weakened.'),
            },
            {
              text: b('Vàng luôn tăng trong dài hạn nên không cần phân tích', 'Gold always rises in the long run, so no analysis is needed'),
              why: b('Vàng giảm giá thực trong suốt giai đoạn 1980–2000. "Luôn tăng" không phải lập luận.', 'Gold fell in real terms throughout 1980–2000. "Always rises" is not an argument.'),
            },
            {
              text: b('Lợi suất thực không liên quan gì đến vàng', 'Real yields have nothing to do with gold'),
              why: b('Chi phí cơ hội vẫn là một động lực; nó chỉ không còn là động lực duy nhất.', 'Opportunity cost is still a driver; it is just no longer the only one.'),
            },
          ],
        },
      ],
    },
  ],
};

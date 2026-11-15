import { b, type Module } from '../../types';

const md = String.raw;
const py = String.raw;

export const m1: Module = {
  id: 'm1',
  index: 1,
  title: b('Kinh tế Vi mô & Cấu trúc Thị trường', 'Microeconomics & Market Structure'),
  subtitle: b(
    'Giá hình thành thế nào, ai chịu thuế, và doanh nghiệp có quyền lực định giá đến đâu.',
    'How prices form, who really pays a tax, and how much pricing power a firm has.',
  ),
  outcome: b(
    'Đọc một tin về giá cả, thuế hay cạnh tranh và tự suy ra: giá, sản lượng và lợi nhuận sẽ dịch chuyển theo hướng nào, bao nhiêu.',
    'Read a headline about prices, taxes or competition and work out which way — and roughly how far — price, volume and profit will move.',
  ),
  tool: 'supply-demand',
  capstone: b(
    'Chọn một ngành ở Việt Nam (viễn thông, hàng không, xi măng, bán lẻ…). Viết luận điểm: ngành này thuộc cấu trúc thị trường nào, quyền lực định giá đến từ đâu, và điều gì sẽ phá vỡ nó trong 3 năm tới.',
    'Pick one industry (telecoms, airlines, cement, retail…). Write a thesis: which market structure it is, where its pricing power comes from, and what would break that power within three years.',
  ),
  lessons: [
    {
      id: 'm1-l1',
      title: b('Cung, cầu và điểm cân bằng', 'Supply, demand and equilibrium'),
      minutes: 18,
      summary: b(
        'Giá là tín hiệu cân bằng giữa người sẵn sàng mua và người sẵn sàng bán. Thuế và giá trần làm méo tín hiệu đó theo cách đo đếm được.',
        'Price is the signal that balances willing buyers and willing sellers. Taxes and price caps distort that signal in measurable ways.',
      ),
      core: b(
        md`## Trực giác
Hãy hình dung chợ đầu mối lúc 4 giờ sáng. Không ai ra lệnh giá rau hôm nay là bao nhiêu, nhưng đến 6 giờ thì hàng gần như bán hết với một mức giá mà cả hai bên chấp nhận. Mức giá đó là **điểm cân bằng (equilibrium)**.

- **Đường cầu (demand)** dốc xuống: giá càng cao, người mua càng ít.
- **Đường cung (supply)** dốc lên: giá càng cao, người bán càng muốn bán nhiều.

## Công thức (dạng tuyến tính)
$$P = a - bQ \quad\text{(cầu)} \qquad P = c + dQ \quad\text{(cung)}$$
$$Q^* = \frac{a-c}{b+d}, \qquad P^* = a - bQ^*$$

## Hai lỗi người mới hay mắc
1. **Nhầm "dịch chuyển đường" với "di chuyển dọc đường".** Giá thay đổi làm ta *trượt dọc* đường cầu. Thu nhập, thị hiếu, giá hàng thay thế mới làm *cả đường* dịch chuyển.
2. **Tin rằng thuế đánh vào ai thì người đó chịu.** Gánh nặng thuế (tax incidence) rơi vào bên **kém co giãn hơn**, bất kể luật ghi ai nộp:
$$\text{Phần người mua chịu} = \frac{b}{b+d}$$

## Khi nhà nước can thiệp
- **Thuế** $t$ tạo khoảng chênh giữa giá người mua trả và giá người bán nhận. Sản lượng giảm, phần giao dịch biến mất gọi là **tổn thất vô ích (deadweight loss)**: $DWL = \tfrac12\, t\,(Q^* - Q_t)$.
- **Giá trần (price ceiling)** thấp hơn $P^*$ gây **thiếu hụt (shortage)**: lượng cầu tăng trong khi lượng cung giảm.

> Câu hỏi bậc 2 luôn phải hỏi: khi giá không được phép cân bằng thị trường, thứ gì sẽ làm việc đó thay? Thường là xếp hàng, chất lượng giảm, hoặc chợ đen.`,
        md`## Intuition
Picture a wholesale market at 4 a.m. Nobody decrees today's price of vegetables, yet by 6 a.m. almost everything has sold at a price both sides accept. That price is the **equilibrium**.

- The **demand** curve slopes down: the higher the price, the fewer the buyers.
- The **supply** curve slopes up: the higher the price, the more sellers want to sell.

## Formulas (linear form)
$$P = a - bQ \quad\text{(demand)} \qquad P = c + dQ \quad\text{(supply)}$$
$$Q^* = \frac{a-c}{b+d}, \qquad P^* = a - bQ^*$$

## Two classic beginner mistakes
1. **Confusing a shift of the curve with a movement along it.** A price change slides you *along* the demand curve. Income, tastes and substitute prices move the *whole curve*.
2. **Believing the party named in the law bears the tax.** Tax incidence falls on the **less elastic** side, whoever writes the cheque:
$$\text{Buyers' share} = \frac{b}{b+d}$$

## When the state steps in
- A **tax** $t$ drives a wedge between what buyers pay and what sellers receive. Volume falls; the trades that vanish are the **deadweight loss**: $DWL = \tfrac12\, t\,(Q^* - Q_t)$.
- A **price ceiling** below $P^*$ creates a **shortage**: quantity demanded rises while quantity supplied falls.

> The second-order question to always ask: when price is not allowed to clear the market, what does the job instead? Usually queues, lower quality, or a black market.`,
      ),
      examples: b(
        md`## Ví dụ số
Cầu: $P = 100 - Q$. Cung: $P = 20 + Q$ (nghìn đồng, triệu đơn vị).

| | Không thuế | Thuế 20 |
|---|---|---|
| Sản lượng | 40 | 30 |
| Giá người mua trả | 60 | 70 |
| Giá người bán nhận | 60 | 50 |
| Thu ngân sách | 0 | 600 |
| Tổn thất vô ích | 0 | 100 |

Hai đường có độ dốc bằng nhau nên mỗi bên chịu đúng một nửa thuế. Nếu cầu dốc gấp đôi ($b=2$), người mua chịu $2/3$.

## Việt Nam: giá trần vé máy bay nội địa
Vé phổ thông nội địa bị áp giá trần theo cự ly (đường bay dài nhất khoảng 3,75 triệu đồng từ tháng 3/2024). Mùa thấp điểm, giá cân bằng nằm dưới trần nên trần **không có tác dụng**. Dịp Tết, giá cân bằng vượt trần và kết quả đúng như mô hình dự báo: vé hết sớm, hãng dồn ghế sang hạng giá cao và tăng phụ thu. Thiếu hụt được "giải quyết" bằng việc ai đặt sớm thì có vé.

## Thế giới: kiểm soát tiền thuê nhà
Stockholm và San Francisco giữ tiền thuê dưới mức thị trường. Bậc 1: người đang thuê được lợi. Bậc 2: chủ nhà chuyển căn hộ sang bán hoặc bỏ cải tạo, nguồn cung cho thuê co lại. Bậc 3: người trẻ và người mới đến phải chờ nhiều năm, tức chính nhóm chính sách muốn bảo vệ lại chịu thiệt.`,
        md`## Worked numbers
Demand: $P = 100 - Q$. Supply: $P = 20 + Q$ (thousand VND, million units).

| | No tax | Tax of 20 |
|---|---|---|
| Quantity | 40 | 30 |
| Price buyers pay | 60 | 70 |
| Price sellers receive | 60 | 50 |
| Tax revenue | 0 | 600 |
| Deadweight loss | 0 | 100 |

The slopes are equal, so each side bears exactly half. Make demand twice as steep ($b=2$) and buyers bear $2/3$.

## Vietnam: the cap on domestic airfares
Domestic economy fares are capped by distance (about VND 3.75 million on the longest routes since March 2024). Off-season the equilibrium fare sits below the cap, so the cap **does nothing**. Around Tết the equilibrium rises above it and the model's prediction shows up: seats sell out early, airlines shift inventory to higher fare buckets and add surcharges. The shortage is "resolved" by who books first.

## Global: rent control
Stockholm and San Francisco hold rents below market. First order: sitting tenants gain. Second order: landlords sell units or stop renovating, so rental supply shrinks. Third order: the young and newcomers wait for years — the very group the policy meant to protect loses.`,
      ),
      lab: {
        kind: 'sim',
        sim: 'supply-demand',
        mission: b(
          'Nhiệm vụ: (1) Đặt thuế = 20 và ghi lại ai chịu bao nhiêu. (2) Tăng độ dốc đường cầu lên gấp đôi, dự đoán TRƯỚC rồi kiểm tra: phần người mua chịu tăng hay giảm? (3) Bỏ thuế, kéo giá trần xuống dưới giá cân bằng và đọc mức thiếu hụt.',
          'Mission: (1) Set the tax to 20 and note who bears how much. (2) Double the demand slope — predict FIRST, then check: does the buyers’ share rise or fall? (3) Remove the tax, drag the price ceiling below equilibrium and read the shortage.',
        ),
      },
      quiz: [
        {
          id: 'm1-l1-q1',
          scenario: b(
            'Chính phủ đánh thuế 5.000 đồng/lít lên xăng và luật quy định doanh nghiệp đầu mối phải nộp. Trong ngắn hạn người dân hầu như không thể đổi phương tiện. Ai thực sự chịu phần lớn khoản thuế?',
            'A government levies a VND 5,000/litre tax on petrol, legally paid by distributors. In the short run drivers can hardly switch transport. Who really bears most of the tax?',
          ),
          options: [
            {
              text: b('Doanh nghiệp đầu mối, vì luật quy định họ nộp', 'Distributors, because the law makes them pay'),
              why: b('Người nộp theo luật không quyết định người chịu thuế. Độ co giãn mới quyết định.', 'Who remits the tax does not decide who bears it. Elasticities do.'),
            },
            {
              text: b('Người tiêu dùng, vì cầu xăng ngắn hạn rất kém co giãn', 'Consumers, because short-run petrol demand is very inelastic'),
              correct: true,
              why: b('Bên kém co giãn hơn không có lựa chọn thay thế nên phải chấp nhận giá cao hơn gần bằng mức thuế.', 'The less elastic side has no alternative, so it absorbs a price rise close to the full tax.'),
            },
            {
              text: b('Chia đều 50/50 giữa hai bên', 'Split 50/50 between the two sides'),
              why: b('Chỉ chia đều khi hai đường có độ dốc bằng nhau. Ở đây cầu dốc hơn nhiều.', 'An even split needs equal slopes. Here demand is much steeper.'),
            },
          ],
        },
        {
          id: 'm1-l1-q2',
          scenario: b(
            'Một thành phố áp giá trần tiền thuê nhà thấp hơn 20% so với giá thị trường. Hệ quả bậc 2 nào có khả năng xảy ra nhất sau 5 năm?',
            'A city caps rents 20% below the market level. Which second-order effect is most likely after five years?',
          ),
          options: [
            {
              text: b('Nguồn cung nhà cho thuê tăng vì nhiều người thuê hơn', 'Rental supply grows because more people rent'),
              why: b('Lượng cầu tăng không tạo ra lượng cung. Giá thấp làm chủ nhà kém muốn cho thuê.', 'More demand does not create supply. A lower price makes landlords less willing to rent out.'),
            },
            {
              text: b('Nguồn cung co lại và chất lượng nhà xuống cấp', 'Supply shrinks and housing quality deteriorates'),
              correct: true,
              why: b('Chủ nhà chuyển sang bán hoặc ngừng đầu tư bảo trì vì lợi suất cho thuê bị ép xuống.', 'Owners sell or stop maintaining units because rental yields are squeezed.'),
            },
            {
              text: b('Không có gì thay đổi vì giá trần chỉ là con số trên giấy', 'Nothing changes; a cap is only a number on paper'),
              why: b('Giá trần thấp hơn giá cân bằng là ràng buộc thực: nó tạo thiếu hụt.', 'A cap below equilibrium binds and creates a shortage.'),
            },
          ],
        },
      ],
    },
    {
      id: 'm1-l2',
      title: b('Độ co giãn: thước đo độ nhạy', 'Elasticity: measuring sensitivity'),
      minutes: 16,
      summary: b(
        'Tăng giá 10% thì doanh thu tăng hay giảm? Câu trả lời nằm ở một con số: độ co giãn.',
        'Raise price 10% — does revenue go up or down? One number answers it: elasticity.',
      ),
      core: b(
        md`## Trực giác
Độ co giãn trả lời câu hỏi: *khách hàng nhạy với giá đến mức nào?* Điện, xăng, thuốc men: tăng giá vẫn phải mua (kém co giãn). Trà sữa, vé xem phim: tăng giá là khách bỏ đi (co giãn mạnh).

## Công thức
$$E_d = \frac{\%\Delta Q}{\%\Delta P}$$
Dùng **công thức trung điểm (midpoint)** để kết quả không phụ thuộc chiều tính:
$$E_d = \frac{(Q_2-Q_1)/\bar Q}{(P_2-P_1)/\bar P}$$

| $|E_d|$ | Tên gọi | Tăng giá thì doanh thu… |
|---|---|---|
| < 1 | Kém co giãn (inelastic) | **tăng** |
| = 1 | Co giãn đơn vị | không đổi |
| > 1 | Co giãn (elastic) | **giảm** |

## Điều gì quyết định độ co giãn
- Có **hàng thay thế** gần không
- Món hàng chiếm bao nhiêu phần **thu nhập**
- **Thời gian**: dài hạn luôn co giãn hơn ngắn hạn (người ta kịp đổi xe, đổi thói quen)

## Hai họ hàng quan trọng
- **Co giãn theo thu nhập (income elasticity):** âm với hàng thứ cấp, lớn hơn 1 với hàng xa xỉ.
- **Co giãn chéo (cross elasticity):** dương với hàng thay thế, âm với hàng bổ sung.

> Trên một đường cầu thẳng, độ co giãn **không cố định**: phần giá cao thì co giãn, phần giá thấp thì kém co giãn. Doanh thu đạt cực đại đúng tại $|E_d| = 1$.`,
        md`## Intuition
Elasticity answers: *how price-sensitive are customers?* Electricity, petrol, medicine: people keep buying when the price rises (inelastic). Bubble tea, cinema tickets: customers walk away (elastic).

## Formula
$$E_d = \frac{\%\Delta Q}{\%\Delta P}$$
Use the **midpoint formula** so the answer does not depend on direction:
$$E_d = \frac{(Q_2-Q_1)/\bar Q}{(P_2-P_1)/\bar P}$$

| $|E_d|$ | Name | A price rise makes revenue… |
|---|---|---|
| < 1 | Inelastic | **rise** |
| = 1 | Unit elastic | unchanged |
| > 1 | Elastic | **fall** |

## What drives elasticity
- Availability of close **substitutes**
- The share of **income** the good takes
- **Time**: the long run is always more elastic than the short run (people change cars and habits)

## Two important relatives
- **Income elasticity:** negative for inferior goods, above 1 for luxuries.
- **Cross elasticity:** positive for substitutes, negative for complements.

> Along a straight demand line elasticity is **not constant**: elastic at high prices, inelastic at low ones. Revenue peaks exactly where $|E_d| = 1$.`,
      ),
      examples: b(
        md`## Ví dụ số: quán cà phê
Giá ly cà phê tăng từ 50 lên 55 nghìn đồng, lượng bán mỗi tháng giảm từ 1.000 xuống 950 ly.

$$\%\Delta P = \frac{5}{52{,}5} = 9{,}5\% \qquad \%\Delta Q = \frac{-50}{975} = -5{,}1\% \qquad E_d = -0{,}54$$

Cầu kém co giãn nên doanh thu **tăng** từ 50,0 lên 52,25 triệu đồng. Nếu thay vào đó lượng bán giảm còn 850 ly ($E_d \approx -1{,}7$), doanh thu giảm còn 46,75 triệu.

## Việt Nam: giá điện
Điện sinh hoạt gần như không có hàng thay thế trong ngắn hạn, nên mỗi lần điều chỉnh giá bán lẻ thì sản lượng tiêu thụ hầu như không giảm và doanh thu ngành điện tăng gần tương ứng. Về dài hạn câu chuyện khác: điện mặt trời mái nhà và thiết bị tiết kiệm điện làm cầu co giãn hơn.

## Thế giới: cú sốc dầu 2022
Giá dầu Brent vượt 120 USD/thùng nhưng tiêu thụ xăng ở Mỹ chỉ giảm vài phần trăm. Cầu năng lượng ngắn hạn kém co giãn là lý do cú sốc cung đẩy **giá** lên rất mạnh thay vì đẩy **lượng** xuống, và cũng là lý do lạm phát năng lượng lan nhanh.

## Ứng dụng khi phân tích cổ phiếu
Doanh nghiệp bán hàng kém co giãn (điện, nước, thuốc, bia) có thể **chuyển lạm phát chi phí sang giá bán**. Đó chính là "quyền lực định giá" (pricing power) mà nhà đầu tư tìm kiếm.`,
        md`## Worked numbers: a coffee shop
The price of a coffee rises from 50 to 55 thousand VND; monthly volume falls from 1,000 to 950 cups.

$$\%\Delta P = \frac{5}{52.5} = 9.5\% \qquad \%\Delta Q = \frac{-50}{975} = -5.1\% \qquad E_d = -0.54$$

Demand is inelastic, so revenue **rises** from 50.0 to 52.25 million VND. Had volume dropped to 850 cups ($E_d \approx -1.7$), revenue would fall to 46.75 million.

## Vietnam: electricity tariffs
Household electricity has almost no short-run substitute, so each retail tariff adjustment barely dents consumption and the power sector's revenue rises nearly one-for-one. The long run differs: rooftop solar and efficient appliances make demand more elastic.

## Global: the 2022 oil shock
Brent crude passed USD 120 a barrel, yet US petrol consumption fell only a few percent. Inelastic short-run energy demand is why a supply shock pushes **price** up sharply rather than **quantity** down — and why energy inflation spreads fast.

## Use in equity analysis
Firms selling inelastic goods (power, water, medicine, beer) can **pass cost inflation into prices**. That is the "pricing power" investors look for.`,
      ),
      lab: {
        kind: 'python',
        mission: b(
          'Chạy code, rồi sửa hệ số a và b của đường cầu. Dự đoán trước: giá tối đa hóa doanh thu sẽ nằm ở đâu? Kiểm tra rằng tại đó |E| = 1.',
          'Run the code, then change the demand coefficients a and b. Predict first: where will the revenue-maximising price be? Verify that |E| = 1 there.',
        ),
        code: py`# Elasticity along a linear demand curve:  Q = a - b*P
import numpy as np

a, b = 2000, 20            # try changing these
P = np.arange(10, 100, 5)
Q = a - b * P
revenue = P * Q
elasticity = -b * P / Q    # point elasticity dQ/dP * P/Q

print(f"{'Price':>6}{'Qty':>8}{'Revenue':>10}{'Elasticity':>12}")
for p, q, r, e in zip(P, Q, revenue, elasticity):
    zone = 'elastic' if abs(e) > 1 else 'inelastic'
    print(f"{p:6.0f}{q:8.0f}{r:10.0f}{e:12.2f}  {zone}")

best = P[revenue.argmax()]
print(f"\nRevenue peaks at P = {best}, where elasticity = {elasticity[revenue.argmax()]:.2f}")
print(f"Theory: P* = a / (2b) = {a / (2 * b):.1f}")

chart(P, revenue, title='Total revenue vs price', xlabel='Price', ylabel='Revenue')

# Midpoint (arc) elasticity for the coffee-shop example
p1, p2, q1, q2 = 50, 55, 1000, 950
arc = ((q2 - q1) / ((q1 + q2) / 2)) / ((p2 - p1) / ((p1 + p2) / 2))
print(f"\nCoffee shop arc elasticity = {arc:.2f}; revenue {p1*q1:,} -> {p2*q2:,}")
`,
      },
      quiz: [
        {
          id: 'm1-l2-q1',
          scenario: b(
            'Một hãng bia ước tính độ co giãn của cầu theo giá là −0,6. Giá lúa mạch tăng mạnh. Ban lãnh đạo đang cân nhắc tăng giá bán 8%. Doanh thu sẽ thay đổi thế nào?',
            'A brewer estimates its price elasticity of demand at −0.6. Barley costs jump. Management considers an 8% price rise. What happens to revenue?',
          ),
          options: [
            {
              text: b('Tăng khoảng 3%', 'Rises by about 3%'),
              correct: true,
              why: b('Sản lượng giảm 0,6 × 8% = 4,8%; doanh thu ≈ 1,08 × 0,952 − 1 ≈ +2,8%.', 'Volume falls 0.6 × 8% = 4.8%; revenue ≈ 1.08 × 0.952 − 1 ≈ +2.8%.'),
            },
            {
              text: b('Giảm vì khách mua ít đi', 'Falls because customers buy less'),
              why: b('Khách mua ít đi thật, nhưng mức giảm lượng (4,8%) nhỏ hơn mức tăng giá (8%).', 'Volume does fall, but by less (4.8%) than the price rises (8%).'),
            },
            {
              text: b('Tăng đúng 8%', 'Rises by exactly 8%'),
              why: b('Chỉ đúng khi cầu hoàn toàn không co giãn (E = 0).', 'Only true for perfectly inelastic demand (E = 0).'),
            },
          ],
        },
        {
          id: 'm1-l2-q2',
          scenario: b(
            'Một ứng dụng gọi xe đang định giá ở đoạn cầu có |E| = 1,8 và muốn tăng doanh thu ngay trong quý này. Nên làm gì?',
            'A ride-hailing app prices on a stretch of demand where |E| = 1.8 and wants more revenue this quarter. What should it do?',
          ),
          options: [
            {
              text: b('Tăng giá', 'Raise the price'),
              why: b('Ở vùng co giãn, tăng giá làm lượng giảm mạnh hơn và doanh thu giảm.', 'In the elastic zone a price rise cuts volume by more, so revenue falls.'),
            },
            {
              text: b('Giảm giá', 'Cut the price'),
              correct: true,
              why: b('|E| > 1 nghĩa là lượng tăng nhanh hơn mức giảm giá, nên doanh thu tăng. Lợi nhuận thì còn tùy chi phí biên.', '|E| > 1 means volume grows faster than price falls, so revenue rises. Profit still depends on marginal cost.'),
            },
            {
              text: b('Giữ nguyên, vì doanh thu đã cực đại', 'Hold; revenue is already maximised'),
              why: b('Doanh thu cực đại tại |E| = 1, không phải 1,8.', 'Revenue peaks at |E| = 1, not 1.8.'),
            },
          ],
        },
      ],
    },
    {
      id: 'm1-l3',
      title: b('Chi phí biên, doanh thu biên và thặng dư', 'Marginal cost, marginal revenue and surplus'),
      minutes: 18,
      summary: b(
        'Mọi quyết định tốt trong kinh tế được ra "ở biên": đơn vị kế tiếp mang về bao nhiêu và tốn bao nhiêu.',
        'Good economic decisions are made "at the margin": what the next unit brings in versus what it costs.',
      ),
      core: b(
        md`## Trực giác
Chuyến bay sắp cất cánh còn 10 ghế trống. Chi phí trung bình mỗi ghế là 1,5 triệu, nhưng chi phí **thêm một khách** chỉ là suất ăn và chút nhiên liệu, khoảng 150 nghìn. Bán ghế giờ chót với giá 600 nghìn vẫn có lãi. Đó là tư duy biên: bỏ qua chi phí đã chìm, chỉ nhìn phần tăng thêm.

## Công thức
- **Chi phí biên (marginal cost):** $MC = \dfrac{\Delta TC}{\Delta Q}$
- **Doanh thu biên (marginal revenue):** $MR = \dfrac{\Delta TR}{\Delta Q}$
- **Quy tắc tối đa hóa lợi nhuận:** sản xuất đến khi
$$MR = MC$$

Trong cạnh tranh hoàn hảo doanh nghiệp là người chấp nhận giá nên $MR = P$ và quy tắc trở thành $P = MC$. Doanh nghiệp có quyền lực thị trường thì $MR < P$ (muốn bán thêm phải hạ giá cho mọi đơn vị), nên họ sản xuất **ít hơn** và bán **đắt hơn**.

## Thặng dư
- **Thặng dư tiêu dùng (consumer surplus):** phần chênh giữa mức sẵn lòng trả và giá thực trả, là tam giác phía trên giá.
- **Thặng dư sản xuất (producer surplus):** phần chênh giữa giá nhận được và chi phí biên, là tam giác phía dưới giá.
- Tổng hai phần lớn nhất tại điểm cân bằng cạnh tranh. Mọi mức sản lượng khác đều tạo **tổn thất vô ích**.

## Quy tắc đóng cửa ngắn hạn
Vẫn nên hoạt động khi giá bù được **chi phí biến đổi bình quân** ($P \ge AVC$), dù đang lỗ kế toán, vì chi phí cố định đằng nào cũng mất.`,
        md`## Intuition
A flight is about to depart with 10 empty seats. Average cost per seat is VND 1.5 million, but the cost of **one more passenger** is a meal and a little fuel — about 150 thousand. A last-minute seat at 600 thousand is still profitable. That is marginal thinking: ignore sunk costs, look only at the increment.

## Formulas
- **Marginal cost:** $MC = \dfrac{\Delta TC}{\Delta Q}$
- **Marginal revenue:** $MR = \dfrac{\Delta TR}{\Delta Q}$
- **Profit-maximising rule:** produce until
$$MR = MC$$

Under perfect competition the firm is a price taker, so $MR = P$ and the rule becomes $P = MC$. A firm with market power has $MR < P$ (to sell more it must cut the price on every unit), so it produces **less** and charges **more**.

## Surplus
- **Consumer surplus:** willingness to pay minus price paid — the triangle above the price.
- **Producer surplus:** price received minus marginal cost — the triangle below the price.
- Their sum is largest at the competitive equilibrium. Any other output creates a **deadweight loss**.

## Short-run shutdown rule
Keep operating while price covers **average variable cost** ($P \ge AVC$), even at an accounting loss, because fixed costs are lost either way.`,
      ),
      examples: b(
        md`## Ví dụ số: doanh nghiệp có quyền định giá
Cầu: $P = 100 - Q$. Tổng chi phí: $TC = 200 + 10Q + 0{,}5Q^2$.

$$MR = 100 - 2Q \qquad MC = 10 + Q \qquad MR = MC \Rightarrow Q = 30,\; P = 70$$

- Doanh thu 2.100, chi phí 950, **lợi nhuận 1.150**.
- Nếu ngành cạnh tranh ($P = MC$): $Q = 45$, $P = 55$.
- Tổn thất vô ích do quyền lực thị trường: $\tfrac12 \times (70-40) \times (45-30) = 225$.

## Việt Nam: nhà máy thép khi giá giảm
Năm 2022 giá thép xây dựng lao dốc. Nhiều lò cao vẫn chạy dù lỗ, vì dừng lò tốn kém và giá bán vẫn cao hơn chi phí biến đổi (quặng, than, điện). Chỉ khi giá thủng cả chi phí biến đổi thì doanh nghiệp mới tắt lò. Đây là quy tắc $P \ge AVC$ ngoài đời thực.

## Thế giới: phần mềm và chi phí biên gần bằng 0
Thêm một người dùng Netflix hay một bản sao phần mềm gần như không tốn gì. Khi $MC \approx 0$, cạnh tranh về giá có thể kéo giá về 0, nên các hãng công nghệ phải dựa vào hiệu ứng mạng lưới và sự khác biệt để giữ giá. Hiểu chi phí biên là hiểu vì sao biên lợi nhuận gộp của ngành phần mềm trên 70% còn ngành bán lẻ chỉ quanh 20%.`,
        md`## Worked numbers: a firm with pricing power
Demand: $P = 100 - Q$. Total cost: $TC = 200 + 10Q + 0.5Q^2$.

$$MR = 100 - 2Q \qquad MC = 10 + Q \qquad MR = MC \Rightarrow Q = 30,\; P = 70$$

- Revenue 2,100, cost 950, **profit 1,150**.
- If the industry were competitive ($P = MC$): $Q = 45$, $P = 55$.
- Deadweight loss from market power: $\tfrac12 \times (70-40) \times (45-30) = 225$.

## Vietnam: steel mills when prices fall
In 2022 construction-steel prices slumped. Many blast furnaces kept running at a loss because stopping is costly and the price still exceeded variable cost (ore, coal, power). Only when price falls through variable cost do mills shut. This is the $P \ge AVC$ rule in the wild.

## Global: software and near-zero marginal cost
One more Netflix user or software copy costs almost nothing. With $MC \approx 0$, price competition can drive prices to zero, so tech firms rely on network effects and differentiation. Marginal cost explains why software gross margins exceed 70% while retail sits near 20%.`,
      ),
      lab: {
        kind: 'python',
        mission: b(
          'Chạy code rồi tăng chi phí cố định từ 200 lên 800. Dự đoán trước: sản lượng tối ưu có đổi không? Sau đó thử thêm thuế 12 trên mỗi đơn vị vào chi phí biên.',
          'Run the code, then raise fixed cost from 200 to 800. Predict first: does optimal output change? Then add a per-unit tax of 12 to marginal cost.',
        ),
        code: py`# Profit maximisation: MR = MC
import numpy as np

fixed = 200                      # try 800: does the optimum move?
Q = np.arange(1, 81)
P = 100 - Q                      # demand
TR = P * Q
TC = fixed + 10 * Q + 0.5 * Q**2
profit = TR - TC
MR = 100 - 2 * Q
MC = 10 + Q

q_star = Q[profit.argmax()]
print(f"Profit-maximising output Q* = {q_star}, price = {100 - q_star}")
print(f"Revenue = {TR[q_star-1]:.0f}  Cost = {TC[q_star-1]:.0f}  Profit = {profit.max():.0f}")
print(f"At Q*, MR = {MR[q_star-1]} and MC = {MC[q_star-1]}")

q_comp = Q[np.abs(P - MC).argmin()]   # competitive benchmark: P = MC
dwl = 0.5 * ((100 - q_star) - (10 + q_star)) * (q_comp - q_star)
print(f"\nCompetitive output = {q_comp}, price = {100 - q_comp}")
print(f"Deadweight loss from market power = {dwl:.0f}")

cs = 0.5 * (100 - (100 - q_star)) * q_star
print(f"Consumer surplus at monopoly price = {cs:.0f}")

chart(Q, {'MR': MR, 'MC': MC, 'Price (demand)': P}, title='MR, MC and demand', xlabel='Quantity')
chart(Q, profit, title='Profit by output level', xlabel='Quantity', ylabel='Profit')
`,
      },
      quiz: [
        {
          id: 'm1-l3-q1',
          scenario: b(
            'Một khách sạn 100 phòng có chi phí cố định 80 triệu đồng mỗi đêm, chi phí biến đổi 200 nghìn mỗi phòng có khách. Mùa thấp điểm, giá thị trường chỉ còn 500 nghìn mỗi phòng và khách sạn lỗ kế toán. Quyết định đúng là gì?',
            'A 100-room hotel has fixed costs of VND 80 million a night and variable cost of 200 thousand per occupied room. Off-season the market rate is only 500 thousand and the hotel books an accounting loss. What is the right call?',
          ),
          options: [
            {
              text: b('Đóng cửa mùa thấp điểm vì đang lỗ', 'Close for the off-season because it is losing money'),
              why: b('Đóng cửa thì vẫn mất 80 triệu chi phí cố định mà không thu được đồng nào.', 'Closing still loses the 80 million of fixed cost while earning nothing.'),
            },
            {
              text: b('Tiếp tục mở vì mỗi phòng bán được đóng góp 300 nghìn để bù chi phí cố định', 'Stay open: each room sold contributes 300 thousand toward fixed costs'),
              correct: true,
              why: b('Giá 500 > chi phí biến đổi 200, nên mỗi phòng làm khoản lỗ nhỏ đi. Đây là quy tắc P ≥ AVC.', 'Price 500 > variable cost 200, so every room shrinks the loss. This is the P ≥ AVC rule.'),
            },
            {
              text: b('Tăng giá lên 1 triệu để bù đủ chi phí bình quân', 'Raise the rate to 1 million to cover average cost'),
              why: b('Khách sạn là người chấp nhận giá trong mùa thấp điểm; tăng giá trên thị trường chỉ làm mất khách.', 'Off-season the hotel is a price taker; pricing above market just loses guests.'),
            },
          ],
        },
        {
          id: 'm1-l3-q2',
          scenario: b(
            'Chi phí thuê mặt bằng của một chuỗi bán lẻ tăng 30%. Tiền thuê là chi phí cố định. Theo lý thuyết, giá bán tối ưu trong ngắn hạn sẽ thay đổi ra sao?',
            'A retail chain’s rent rises 30%. Rent is a fixed cost. In theory, how does the optimal short-run price change?',
          ),
          options: [
            {
              text: b('Không đổi, vì chi phí cố định không ảnh hưởng MR và MC', 'It does not: fixed costs affect neither MR nor MC'),
              correct: true,
              why: b('Giá tối ưu xác định bởi MR = MC. Chi phí cố định chỉ quyết định có nên tồn tại về dài hạn hay không.', 'The optimum is set by MR = MC. Fixed costs only decide whether to stay in business in the long run.'),
            },
            {
              text: b('Tăng 30% để chuyển hết chi phí cho khách', 'Up 30% to pass the cost on'),
              why: b('Nếu tăng giá làm tăng lợi nhuận thì chuỗi đã tăng từ trước khi tiền thuê tăng.', 'If a price rise raised profit, the chain would have done it before the rent went up.'),
            },
            {
              text: b('Giảm để bán được nhiều hàng hơn bù chi phí', 'Down, to sell more and cover the cost'),
              why: b('Bán nhiều hơn mức MR = MC nghĩa là mỗi đơn vị thêm mang về ít hơn chi phí của nó.', 'Selling beyond MR = MC means each extra unit brings in less than it costs.'),
            },
          ],
        },
      ],
    },
    {
      id: 'm1-l4',
      title: b('Cấu trúc thị trường và lý thuyết trò chơi', 'Market structure and game theory'),
      minutes: 20,
      summary: b(
        'Lợi nhuận bền vững đến từ cấu trúc ngành. Lý thuyết trò chơi giải thích vì sao các ông lớn vừa muốn hợp tác vừa muốn phản bội.',
        'Durable profit comes from industry structure. Game theory explains why giants want both to cooperate and to cheat.',
      ),
      core: b(
        md`## Bốn cấu trúc thị trường
| | Số người bán | Quyền định giá | Ví dụ |
|---|---|---|---|
| Cạnh tranh hoàn hảo | Rất nhiều | Không | Nông sản, ngoại hối |
| Cạnh tranh độc quyền | Nhiều | Thấp | Quán ăn, thời trang |
| Độc quyền nhóm (oligopoly) | Vài | Cao, phụ thuộc lẫn nhau | Viễn thông, hàng không |
| Độc quyền (monopoly) | Một | Rất cao | Truyền tải điện |

## Đo quyền lực thị trường
- **Chỉ số Lerner:** $L = \dfrac{P - MC}{P} = \dfrac{1}{|E_d|}$. Cầu càng kém co giãn, biên lợi nhuận càng dày.
- **Chỉ số HHI:** tổng bình phương thị phần (tính theo %). Trên 2.500 là tập trung cao.

## Lý thuyết trò chơi
Trong độc quyền nhóm, lợi nhuận của mỗi hãng phụ thuộc vào hành động của đối thủ. **Cân bằng Nash (Nash equilibrium)** là trạng thái mà không ai muốn đơn phương đổi chiến lược khi biết chiến lược của người kia.

**Thế lưỡng nan của người tù** trong định giá: cả hai cùng giữ giá cao thì cùng lợi, nhưng mỗi bên đều có động cơ lén giảm giá để giành thị phần. Kết cục Nash là cả hai giảm giá và cùng thiệt.

## Điều gì giúp hợp tác bền
- Trò chơi **lặp lại nhiều lần** (sợ bị trả đũa)
- Ít người chơi, sản phẩm đồng nhất, giá dễ quan sát
- Rào cản gia nhập cao

> Khi phân tích một ngành, hãy hỏi: trò chơi ở đây là lặp lại hay một lần? Ai có động cơ phá giá? Người mới vào ngành khó đến đâu?`,
        md`## Four market structures
| | Sellers | Pricing power | Examples |
|---|---|---|---|
| Perfect competition | Very many | None | Farm goods, FX |
| Monopolistic competition | Many | Low | Restaurants, fashion |
| Oligopoly | A few | High, interdependent | Telecoms, airlines |
| Monopoly | One | Very high | Power transmission |

## Measuring market power
- **Lerner index:** $L = \dfrac{P - MC}{P} = \dfrac{1}{|E_d|}$. The less elastic the demand, the fatter the margin.
- **HHI:** the sum of squared market shares (in %). Above 2,500 is highly concentrated.

## Game theory
In an oligopoly each firm's profit depends on rivals' actions. A **Nash equilibrium** is a state where nobody wants to change strategy unilaterally, given what the others do.

The **prisoner's dilemma** in pricing: both do well by holding prices high, but each is tempted to undercut for share. The Nash outcome is that both cut and both lose.

## What sustains cooperation
- A **repeated game** (fear of retaliation)
- Few players, homogeneous product, observable prices
- High barriers to entry

> When analysing an industry ask: is the game repeated or one-shot? Who has the incentive to undercut? How hard is entry?`,
      ),
      examples: b(
        md`## Ví dụ số: ma trận lợi nhuận
Hai hãng A và B chọn **giá cao** hoặc **giá thấp**. Lợi nhuận (A, B):

| | B giá cao | B giá thấp |
|---|---|---|
| **A giá cao** | (10, 10) | (2, 14) |
| **A giá thấp** | (14, 2) | (5, 5) |

Dù B làm gì, A luôn lãi hơn khi chọn giá thấp (14 > 10 và 5 > 2). B cũng vậy. Cân bằng Nash là (5, 5), dù (10, 10) tốt hơn cho cả hai.

## HHI
Thị trường có ba hãng với thị phần 50%, 30%, 20%: $HHI = 2500 + 900 + 400 = 3800$, tức tập trung rất cao. Mười hãng mỗi hãng 10% thì HHI chỉ là 1.000.

## Việt Nam: viễn thông di động và gọi xe
Thị trường di động do ba nhà mạng lớn chi phối, sản phẩm gần như đồng nhất, giá cước dễ quan sát. Đây là điều kiện lý tưởng cho hợp tác ngầm, nên biên lợi nhuận ngành ổn định trong nhiều năm. Ngược lại, khi các ứng dụng gọi xe mới vào thị trường, họ chơi trò "một lần": đốt tiền khuyến mãi để giành thị phần, và cả ngành lỗ cho đến khi một bên rút lui.

## Thế giới: OPEC+
OPEC+ là cartel kinh điển: cùng cắt sản lượng để giữ giá dầu cao. Nhưng mỗi thành viên đều có động cơ bơm vượt hạn ngạch. Tháng 3/2020, Nga và Ả Rập Xê Út không thỏa thuận được và lao vào chiến tranh giá, khiến Brent mất hơn một nửa giá trị trong vài tuần. Thế lưỡng nan người tù không phải là lý thuyết suông.`,
        md`## Worked numbers: a payoff matrix
Firms A and B each choose a **high** or **low** price. Profits (A, B):

| | B high | B low |
|---|---|---|
| **A high** | (10, 10) | (2, 14) |
| **A low** | (14, 2) | (5, 5) |

Whatever B does, A earns more with a low price (14 > 10 and 5 > 2). The same holds for B. The Nash equilibrium is (5, 5), even though (10, 10) is better for both.

## HHI
Three firms with 50%, 30% and 20% shares: $HHI = 2500 + 900 + 400 = 3800$ — very concentrated. Ten firms with 10% each give only 1,000.

## Vietnam: mobile telecoms and ride-hailing
Mobile is dominated by three large carriers with near-identical products and visible tariffs — ideal conditions for tacit cooperation, hence stable margins for years. By contrast, when new ride-hailing apps entered they played a "one-shot" game: burning cash on promotions for share, with the whole industry losing money until someone withdrew.

## Global: OPEC+
OPEC+ is the textbook cartel: cut output together to hold oil prices up. Yet every member is tempted to pump above quota. In March 2020 Russia and Saudi Arabia failed to agree and launched a price war; Brent lost more than half its value within weeks. The prisoner's dilemma is not just theory.`,
      ),
      lab: {
        kind: 'python',
        mission: b(
          'Chạy code để tìm cân bằng Nash. Sau đó sửa ma trận: nếu hãng phá giá bị "trả đũa" làm lợi nhuận phản bội giảm từ 14 xuống 9 thì cân bằng thay đổi thế nào? Đây chính là hiệu ứng của trò chơi lặp lại.',
          'Run the code to find the Nash equilibrium. Then edit the matrix: if retaliation cuts the cheating payoff from 14 to 9, how does the equilibrium change? That is the effect of a repeated game.',
        ),
        code: py`# Find pure-strategy Nash equilibria of a two-player game, and compute HHI
import numpy as np

strategies = ['High price', 'Low price']
# payoff[i][j] when row player picks i and column player picks j
A = np.array([[10, 2],
              [14, 5]])          # row player (firm A)  -> try changing 14 to 9
B = np.array([[10, 14],
              [2, 5]])           # column player (firm B) -> and this 14 to 9

print("Payoff matrix (A, B):")
for i, s in enumerate(strategies):
    print(f"  A {s:10s}", [(int(A[i, j]), int(B[i, j])) for j in range(2)])

found = []
for i in range(A.shape[0]):
    for j in range(A.shape[1]):
        a_best = A[i, j] >= A[:, j].max()     # A cannot do better given B plays j
        b_best = B[i, j] >= B[i, :].max()     # B cannot do better given A plays i
        if a_best and b_best:
            found.append((i, j))

print()
for i, j in found:
    print(f"Nash equilibrium: A = {strategies[i]}, B = {strategies[j]}  -> payoffs {(int(A[i,j]), int(B[i,j]))}")
if not found:
    print("No pure-strategy Nash equilibrium")

# Market concentration
def hhi(shares):
    return sum(s**2 for s in shares)

for name, shares in {'3 firms 50/30/20': [50, 30, 20], '10 equal firms': [10] * 10, 'after 50+20 merger': [70, 30]}.items():
    h = hhi(shares)
    level = 'highly concentrated' if h > 2500 else 'moderately concentrated' if h > 1500 else 'competitive'
    print(f"HHI {name:20s} = {h:5.0f}  ({level})")

# Lerner index from the previous lesson: P = 70, MC = 40
print(f"\nLerner index = {(70 - 40) / 70:.3f}  -> implied |elasticity| = {70 / (70 - 40):.2f}")
`,
      },
      quiz: [
        {
          id: 'm1-l4-q1',
          scenario: b(
            'Ngành xi măng ở một vùng có 4 nhà máy, sản phẩm đồng nhất, giá niêm yết công khai, và xây nhà máy mới mất 3 năm. Nhu cầu đang ổn định. Dự báo hợp lý nhất về giá là gì?',
            'A regional cement industry has four plants, a homogeneous product, public list prices, and new plants take three years to build. Demand is steady. What is the most reasonable price forecast?',
          ),
          options: [
            {
              text: b('Giá sẽ rơi về chi phí biên do cạnh tranh', 'Prices fall to marginal cost through competition'),
              why: b('Đó là kết cục của cạnh tranh hoàn hảo hoặc trò chơi một lần, không phải của độc quyền nhóm lặp lại với rào cản cao.', 'That is the outcome of perfect competition or a one-shot game, not of a repeated oligopoly with high barriers.'),
            },
            {
              text: b('Giá nhiều khả năng được giữ ổn định trên chi phí biên nhờ hợp tác ngầm', 'Prices likely hold above marginal cost through tacit coordination'),
              correct: true,
              why: b('Ít người chơi, giá dễ quan sát, trò chơi lặp lại và rào cản gia nhập cao là bốn điều kiện giúp hợp tác bền.', 'Few players, observable prices, a repeated game and high entry barriers are the four conditions that sustain cooperation.'),
            },
            {
              text: b('Giá sẽ tăng không giới hạn vì ngành tập trung', 'Prices rise without limit because the industry is concentrated'),
              why: b('Giá bị chặn bởi độ co giãn của cầu, hàng nhập khẩu và nguy cơ bị cơ quan cạnh tranh điều tra.', 'Price is capped by demand elasticity, imports and antitrust risk.'),
            },
          ],
        },
        {
          id: 'm1-l4-q2',
          scenario: b(
            'Hai sàn thương mại điện tử đang cùng trợ giá vận chuyển và cùng lỗ. Điều gì có khả năng chấm dứt cuộc chiến này nhất?',
            'Two e-commerce platforms both subsidise shipping and both lose money. What is most likely to end the war?',
          ),
          options: [
            {
              text: b('Một bên tự nguyện tăng giá trước để làm gương', 'One side voluntarily raises prices first to set an example'),
              why: b('Trong thế lưỡng nan người tù, bên tăng giá trước sẽ mất thị phần ngay nếu bên kia không theo.', 'In a prisoner’s dilemma the first mover loses share at once if the rival does not follow.'),
            },
            {
              text: b('Nguồn vốn tài trợ cạn dần khiến cả hai phải ưu tiên lợi nhuận', 'Funding dries up, forcing both to prioritise profit'),
              correct: true,
              why: b('Khi không còn tiền để đốt, phản bội không còn khả thi và cả hai cùng chuyển sang cân bằng giá cao hơn.', 'Once there is no cash to burn, defection stops being feasible and both move to a higher-price equilibrium.'),
            },
            {
              text: b('Khách hàng trở nên trung thành hơn nhờ khuyến mãi', 'Customers become loyal thanks to the promotions'),
              why: b('Khuyến mãi dạy khách hàng nhạy với giá hơn chứ không trung thành hơn.', 'Promotions train customers to be more price-sensitive, not more loyal.'),
            },
          ],
        },
      ],
    },
  ],
};

import { b, type CaseStudy } from '../types';

const md = String.raw;

export const caseStudies: CaseStudy[] = [
  {
    id: 'fed-2022',
    category: 'global',
    period: '2021–2023',
    title: b(
      'Cú sốc lạm phát toàn cầu và chu kỳ tăng lãi suất nhanh nhất 40 năm của Fed',
      'The global inflation shock and the Fed’s fastest hiking cycle in 40 years',
    ),
    context: b(
      md`**Tháng 12/2021.** Mỹ vừa trải qua gói hỗ trợ tài khóa khoảng **5 nghìn tỷ USD** (2020–2021), lãi suất Fed ở **0–0,25%**, và Fed vẫn đang mua 120 tỷ USD trái phiếu mỗi tháng (QE). Chuỗi cung ứng tắc nghẽn: cước container Thượng Hải–Los Angeles gấp khoảng 10 lần trước dịch.

Suốt năm 2021 Fed gọi lạm phát là **"tạm thời" (transitory)**, lập luận rằng giá xe cũ và cước vận tải sẽ tự giảm khi nền kinh tế mở cửa hoàn toàn. Thị trường lao động thì cực kỳ căng: cứ 1 người thất nghiệp có gần 2 vị trí tuyển dụng, và lương nhóm thu nhập thấp tăng nhanh nhất nhiều thập kỷ.

Đến cuối năm, Chủ tịch Powell nói đã đến lúc "bỏ chữ tạm thời". Bạn là thành viên FOMC trong cuộc họp tháng 3/2022.`,
      md`**December 2021.** America has just delivered about **USD 5 trillion** of fiscal support (2020–2021), the Fed funds rate is at **0–0.25%**, and the Fed is still buying USD 120 billion of bonds a month (QE). Supply chains are clogged: Shanghai–Los Angeles container rates are about ten times pre-pandemic levels.

Throughout 2021 the Fed called inflation **"transitory"**, arguing that used-car prices and freight would ease once the economy fully reopened. The labour market is extremely tight: nearly two job openings per unemployed person, and low-income wages are rising at the fastest pace in decades.

By year-end Chair Powell says it is time to "retire the word transitory". You sit on the FOMC at the March 2022 meeting.`,
    ),
    data: [
      { label: b('Lạm phát CPI (YoY, 12/2021)', 'CPI inflation (YoY, Dec 2021)'), value: '7.0%' },
      { label: b('Lạm phát PCE lõi', 'Core PCE inflation'), value: '4.9%' },
      { label: b('Tỷ lệ thất nghiệp', 'Unemployment rate'), value: '3.9%' },
      { label: b('Lãi suất Fed', 'Fed funds rate'), value: '0–0.25%' },
      { label: b('Lãi suất thực (Fed − CPI)', 'Real rate (Fed − CPI)'), value: '≈ −6.8%', note: b('Nới lỏng nhất kể từ thập niên 1970', 'The loosest since the 1970s') },
      { label: b('Lợi suất Mỹ 10 năm', 'US 10-year yield'), value: '1.52%' },
      { label: b('Tăng trưởng cung tiền M2 (YoY)', 'M2 growth (YoY)'), value: '≈ 13%', note: b('Đỉnh ≈ 27% tháng 2/2021', 'Peaked at ≈ 27% in Feb 2021') },
    ],
    question: b(
      'Với vai trò thành viên FOMC tháng 3/2022, bạn bỏ phiếu cho lộ trình nào?',
      'As an FOMC member in March 2022, which path do you vote for?',
    ),
    options: [
      {
        id: 'a',
        verdict: 'poor',
        label: b('Chờ thêm: tăng 0,25% rồi tạm dừng, vì cú sốc cung sẽ tự tan', 'Wait: hike 0.25% and pause, since the supply shock will fade'),
        feedback: b(
          'Đây gần như là lựa chọn mà Fed đã làm trong năm 2021, và nó đã thất bại. Cú sốc cung có tan dần, nhưng cầu nóng và thị trường lao động căng đã khiến lạm phát lan sang dịch vụ và lương. Chậm trễ thêm làm tăng rủi ro kỳ vọng lạm phát mất neo, buộc phải thắt mạnh hơn về sau.',
          'This is close to what the Fed did through 2021, and it failed. The supply shock did fade, but hot demand and a tight labour market spread inflation into services and wages. Further delay risked unanchoring expectations and would force harsher tightening later.',
        ),
      },
      {
        id: 'b',
        verdict: 'best',
        label: b('Bắt đầu tăng ngay, đẩy nhanh (bước 0,5–0,75%) và dừng QE, chấp nhận rủi ro suy thoái nhẹ', 'Start hiking now, accelerate (0.5–0.75% steps) and end QE, accepting a mild recession risk'),
        feedback: b(
          'Đây là điều Fed thực sự làm sau tháng 3/2022: 11 lần tăng, tổng cộng 525 điểm cơ bản trong 16 tháng, kèm thu hẹp bảng cân đối (QT). Nhìn lại, đa số nhà kinh tế cho rằng hướng đi đúng nhưng bắt đầu muộn khoảng 6–9 tháng.',
          'This is what the Fed actually did after March 2022: eleven hikes totalling 525 basis points in 16 months, plus balance-sheet runoff (QT). In hindsight most economists consider the direction right but the start 6–9 months late.',
        ),
      },
      {
        id: 'c',
        verdict: 'partial',
        label: b('Sốc kiểu Volcker: tăng 3% trong một cuộc họp để dập lạm phát dứt điểm', 'A Volcker shock: hike 3% at one meeting to crush inflation outright'),
        feedback: b(
          'Phát tín hiệu cứng rắn rất mạnh, nhưng gây sốc lớn cho thị trường tài chính đang có đòn bẩy cao và có thể làm vỡ hệ thống ngân hàng nhanh hơn nữa (SVB sụp đổ ngay cả với lộ trình từ từ). Năm 2022 kỳ vọng lạm phát dài hạn vẫn neo quanh 2–2,5%, khác với năm 1980, nên không cần liều thuốc mạnh đến vậy.',
          'A very hawkish signal, but a massive shock to leveraged markets that could break banks even faster (SVB failed even under a gradual path). In 2022 long-run inflation expectations stayed anchored near 2–2.5%, unlike in 1980, so such a dose was unnecessary.',
        ),
      },
    ],
    orders: {
      first: b(
        md`- Lãi suất Fed từ 0,25% lên **5,25–5,5%** (tháng 7/2023).
- Lợi suất 10 năm từ 1,5% lên gần **5%** (tháng 10/2023); lãi suất vay mua nhà 30 năm vượt **7,5%**.
- Lạm phát CPI đạt đỉnh **9,1%** (tháng 6/2022) rồi giảm về khoảng **3%** giữa năm 2023.
- S&P 500 giảm khoảng **25%** từ đỉnh tới đáy năm 2022; Nasdaq giảm khoảng **35%**. Trái phiếu Mỹ có năm tệ nhất trong lịch sử hiện đại.`,
        md`- The Fed funds rate went from 0.25% to **5.25–5.5%** (July 2023).
- The 10-year yield rose from 1.5% to nearly **5%** (October 2023); 30-year mortgage rates passed **7.5%**.
- CPI inflation peaked at **9.1%** (June 2022) and fell to about **3%** by mid-2023.
- The S&P 500 fell about **25%** peak to trough in 2022; the Nasdaq about **35%**. US bonds had their worst year in modern history.`,
      ),
      second: b(
        md`- **USD mạnh nhất 20 năm** (DXY 114, tháng 9/2022): yên Nhật về 150, bảng Anh chạm đáy lịch sử, các nước mới nổi bán dự trữ để giữ tỷ giá. Việt Nam nới biên độ tỷ giá và tăng lãi suất 200 điểm cơ bản.
- **Ngân hàng khu vực Mỹ vỡ:** Silicon Valley Bank (3/2023) nắm nhiều trái phiếu dài hạn mua lúc lãi suất thấp; lỗ chưa thực hiện cộng với rút tiền ồ ạt khiến ngân hàng sụp trong 36 giờ. Signature Bank và First Republic theo sau.
- **Thị trường nhà đóng băng:** người đã vay lãi suất 3% không muốn bán nhà, nguồn cung nhà cũ giảm mạnh và giá nhà không giảm như dự đoán.`,
        md`- **The strongest dollar in 20 years** (DXY 114, September 2022): the yen hit 150, sterling a record low, emerging markets sold reserves to defend currencies. Vietnam widened its FX band and raised rates 200 basis points.
- **US regional banks broke:** Silicon Valley Bank (March 2023) held long bonds bought at low yields; unrealised losses plus a deposit run brought it down in 36 hours. Signature Bank and First Republic followed.
- **Housing froze:** owners with 3% mortgages would not sell, existing-home supply collapsed and prices did not fall as expected.`,
      ),
      third: b(
        md`- **Không có suy thoái (tính đến 2024):** thất nghiệp chỉ tăng lên khoảng 4,2%. Lý do: tài khóa vẫn rất lỏng (thâm hụt khoảng 6% GDP), hộ gia đình và doanh nghiệp đã chốt lãi suất thấp dài hạn nên tăng lãi suất truyền dẫn chậm, và cú sốc cung tự tan.
- **Uy tín của Fed được khôi phục** nhưng câu hỏi "lãi suất trung tính mới" (r*) có cao hơn trước 2020 không trở thành tranh luận trung tâm, ảnh hưởng định giá mọi tài sản dài hạn.
- **Chi phí lãi vay của chính phủ Mỹ vượt 1 nghìn tỷ USD/năm**, khiến câu chuyện bền vững nợ công quay lại thị trường trái phiếu.
- **Đường cong lợi suất đảo ngược dài kỷ lục** mà không có suy thoái, buộc giới phân tích xem lại một chỉ báo từng được coi là gần như chắc chắn.`,
        md`- **No recession (as of 2024):** unemployment rose only to about 4.2%. Why: fiscal policy stayed very loose (deficits near 6% of GDP), households and firms had locked in low long-term rates so transmission was slow, and the supply shock faded by itself.
- **Fed credibility was restored**, but whether the "new neutral rate" (r*) is higher than before 2020 became the central debate, affecting the valuation of every long-duration asset.
- **US government interest costs passed USD 1 trillion a year**, bringing debt sustainability back into the bond market.
- **A record-long yield-curve inversion with no recession** forced analysts to rethink a signal once seen as near-infallible.`,
      ),
    },
    takeaways: b(
      md`- Chẩn đoán loại lạm phát (cung hay cầu) quyết định liều thuốc; năm 2021–2022 là **cả hai**.
- Tăng lãi suất thì luôn có thứ gì đó vỡ, thường là nơi có **lệch pha kỳ hạn** (SVB).
- Độ trễ truyền dẫn phụ thuộc cấu trúc nợ: nền kinh tế vay lãi cố định dài hạn phản ứng chậm hơn nhiều.`,
      md`- Diagnosing the type of inflation (supply or demand) sets the dose; 2021–2022 was **both**.
- When rates rise something always breaks, usually wherever there is a **maturity mismatch** (SVB).
- Transmission lags depend on debt structure: an economy borrowing at long fixed rates reacts far more slowly.`,
    ),
    linkedLessons: ['m2-l2', 'm2-l3', 'm2-l4', 'm3-l4'],
  },
  {
    id: 'vn-trinity',
    category: 'vietnam',
    period: '2022–2024',
    title: b(
      'Việt Nam giữa bộ ba bất khả thi: lãi suất, tỷ giá USD/VND, tăng trưởng và cơn sốt vàng SJC',
      'Vietnam inside the impossible trinity: rates, USD/VND, growth and the SJC gold frenzy',
    ),
    context: b(
      md`**Tháng 9/2022.** Fed vừa tăng lãi suất 75 điểm cơ bản lần thứ ba liên tiếp, DXY vượt 110. Lãi suất USD lần đầu tiên sau nhiều năm **cao hơn** lãi suất VND liên ngân hàng ở một số kỳ hạn.

Trong nước, GDP đang hồi phục mạnh (cả năm 2022 tăng 8%), nhưng thị trường **trái phiếu doanh nghiệp** đang khủng hoảng niềm tin sau một số vụ bắt giữ lãnh đạo tập đoàn bất động sản (tháng 4 và tháng 10/2022). Hàng loạt chủ đầu tư không đảo được nợ. VN-Index đã giảm khoảng 30% từ đỉnh.

Dự trữ ngoại hối ước tính khoảng **108 tỷ USD** đầu năm. VND đã mất giá khoảng 3–4% từ đầu năm và áp lực đang tăng. Bạn là cố vấn của Thống đốc NHNN.`,
      md`**September 2022.** The Fed has just hiked 75 basis points for the third time in a row and the DXY is above 110. For the first time in years, dollar rates are **above** dong interbank rates at some tenors.

At home GDP is rebounding strongly (8% for 2022), but the **corporate-bond** market is in a crisis of confidence after arrests of property-group executives (April and October 2022). Developers cannot roll their debt. The VN-Index is down about 30% from its peak.

FX reserves were an estimated **USD 108 billion** at the start of the year. The dong has lost about 3–4% year to date and pressure is building. You advise the SBV governor.`,
    ),
    data: [
      { label: b('Lãi suất Fed', 'Fed funds rate'), value: '3.0–3.25%', note: b('Dự báo lên trên 4% cuối năm', 'Forecast above 4% by year-end') },
      { label: b('Lãi suất tái cấp vốn NHNN', 'SBV refinancing rate'), value: '4.0%' },
      { label: b('USD/VND', 'USD/VND'), value: '≈ 23,700', note: b('Biên độ ±3%', 'Band ±3%') },
      { label: b('Lạm phát CPI Việt Nam', 'Vietnam CPI inflation'), value: '≈ 3.9%' },
      { label: b('Tăng trưởng tín dụng (từ đầu năm)', 'Credit growth (YTD)'), value: '≈ 11%', note: b('Room cả năm ≈ 14%', 'Full-year quota ≈ 14%') },
      { label: b('Dự trữ ngoại hối (ước tính)', 'FX reserves (estimate)'), value: '≈ USD 90–100 bn' },
      { label: b('Chênh lệch vàng SJC so với thế giới', 'SJC gold premium over world'), value: '≈ VND 15–18 m/tael' },
    ],
    question: b(
      'Bạn khuyến nghị Thống đốc phối hợp các "van xả" như thế nào trong quý 4/2022?',
      'How do you advise the governor to combine the "release valves" in Q4 2022?',
    ),
    options: [
      {
        id: 'a',
        verdict: 'poor',
        label: b('Giữ tỷ giá cố định bằng mọi giá: bán dự trữ không giới hạn, không tăng lãi suất', 'Hold the rate at all costs: unlimited reserve sales, no rate hike'),
        feedback: b(
          'Dự trữ chỉ khoảng 2,5–3 tháng nhập khẩu. Bán không giới hạn sẽ làm thị trường thấy dự trữ cạn dần và tấn công mạnh hơn, giống Thái Lan 1997. Giữ lãi suất thấp khi Fed tăng còn khuyến khích găm giữ USD.',
          'Reserves cover only about 2.5–3 months of imports. Unlimited sales would show the market reserves draining and invite a stronger attack, as in Thailand 1997. Holding rates low while the Fed hikes also rewards dollar hoarding.',
        ),
      },
      {
        id: 'b',
        verdict: 'best',
        label: b('Phối hợp: nới biên độ để tỷ giá mất giá có kiểm soát, tăng lãi suất vừa phải, bán một phần dự trữ, rồi đảo chiều khi áp lực dịu', 'Mix: widen the band for controlled depreciation, raise rates moderately, sell some reserves, and reverse when pressure eases'),
        feedback: b(
          'Đây gần với điều NHNN đã làm: tăng lãi suất 100 điểm cơ bản hai lần (tháng 9 và 10), nới biên độ lên ±5% (17/10/2022), bán ước khoảng 20 tỷ USD dự trữ. VND mất giá khoảng 9% tại đáy rồi phục hồi khi DXY quay đầu từ tháng 11. Đến tháng 3–6/2023 NHNN giảm lãi suất bốn lần.',
          'Close to what the SBV did: two 100-basis-point hikes (September and October), a band widened to ±5% (17 October 2022), and an estimated USD 20 billion of reserve sales. The dong fell about 9% at the trough, then recovered as the DXY turned in November. In March–June 2023 the SBV cut four times.',
        ),
      },
      {
        id: 'c',
        verdict: 'partial',
        label: b('Thả nổi hoàn toàn tỷ giá để giữ lãi suất thấp cứu thị trường bất động sản', 'Float freely to keep rates low and rescue property'),
        feedback: b(
          'Giữ được độc lập tiền tệ, nhưng VND có thể mất giá 15–20% trong vài tuần khi tâm lý đang hoảng loạn. Doanh nghiệp có nợ USD và nhập khẩu nguyên liệu chịu cú sốc lớn, lạm phát nhập khẩu tăng, và niềm tin vào VND, vốn là trụ cột ổn định vĩ mô, bị tổn hại.',
          'It preserves monetary independence, but the dong could fall 15–20% within weeks amid panic. Firms with dollar debt and imported inputs take a big hit, imported inflation rises, and confidence in the dong — a pillar of macro stability — is damaged.',
        ),
      },
    ],
    orders: {
      first: b(
        md`- Lãi suất liên ngân hàng qua đêm có lúc vượt **6%**; lãi suất huy động 12 tháng ở nhiều ngân hàng vượt **9–10%**.
- USD/VND đạt đỉnh khoảng **24.800–24.900** (giá ngân hàng) đầu tháng 11/2022, rồi giảm về khoảng 23.600 vào đầu 2023.
- Dự trữ ngoại hối giảm xuống khoảng **86–88 tỷ USD** cuối năm 2022 (ước tính).`,
        md`- Overnight interbank rates at times exceeded **6%**; 12-month deposit rates at many banks passed **9–10%**.
- USD/VND peaked around **24,800–24,900** (bank rates) in early November 2022, then fell back to about 23,600 in early 2023.
- FX reserves fell to an estimated **USD 86–88 billion** by end-2022.`,
      ),
      second: b(
        md`- **Lãi suất cao trùng khủng hoảng trái phiếu** làm thanh khoản bất động sản đóng băng; nhiều chủ đầu tư phải giãn nợ theo Nghị định 08/2023.
- **Tăng trưởng GDP chậm lại** từ 8% (2022) xuống khoảng **5%** (2023), xuất khẩu giảm khoảng 4,4% do cầu thế giới yếu.
- **Tín dụng tăng chậm dù lãi suất đã giảm:** đến giữa 2023 room còn rất nhiều nhưng doanh nghiệp không vay, minh họa cho việc "đẩy sợi dây".
- **Vàng SJC:** người dân dồn vào vàng như kênh trú ẩn, chênh lệch so với giá thế giới lên tới **khoảng 18–20 triệu đồng/lượng** đầu năm 2024.`,
        md`- **High rates coincided with the bond crisis**, freezing property liquidity; many developers extended debt under Decree 08/2023.
- **GDP growth slowed** from 8% (2022) to about **5%** (2023); exports fell about 4.4% on weak world demand.
- **Credit grew slowly despite lower rates:** by mid-2023 quota was ample but firms would not borrow — "pushing on a string".
- **SJC gold:** households piled into gold as a refuge; the premium over the world price reached **about VND 18–20 million per tael** in early 2024.`,
      ),
      third: b(
        md`- **Từ tháng 4/2024 NHNN can thiệp trực tiếp thị trường vàng:** đấu thầu vàng miếng rồi bán trực tiếp qua bốn ngân hàng thương mại nhà nước và SJC. Chênh lệch thu hẹp về khoảng **3–5 triệu đồng/lượng**.
- **Cuộc tranh luận về cơ chế quản lý vàng** (độc quyền sản xuất vàng miếng theo Nghị định 24/2012) mở lại, với định hướng sửa đổi để giảm chênh lệch bền vững.
- **Bài học cho 2024:** khi DXY tăng trở lại, NHNN dùng **tín phiếu** để hút thanh khoản và đẩy lãi suất liên ngân hàng lên thay vì tăng lãi suất điều hành. Đây là cách tách lãi suất thị trường ngắn hạn khỏi lãi suất cho vay của nền kinh tế, một cách điều hành tinh vi hơn so với năm 2022.`,
        md`- **From April 2024 the SBV intervened directly in gold:** auctions of gold bars, then direct sales through four state-owned banks and SJC. The premium narrowed to about **VND 3–5 million per tael**.
- **The debate over gold management** (the gold-bar production monopoly under Decree 24/2012) reopened, with plans to amend it to keep the premium down durably.
- **The lesson applied in 2024:** when the DXY rose again, the SBV used **bills** to drain liquidity and lift interbank rates instead of raising policy rates — separating short-term market rates from economy-wide lending rates, a subtler approach than in 2022.`,
      ),
    },
    takeaways: b(
      md`- Ở nền kinh tế mở, **Fed là biến số ngoại sinh lớn nhất** đối với lãi suất Việt Nam.
- Không có van xả nào miễn phí; điều hành tốt là **chia nhỏ chi phí** qua nhiều kênh và đảo chiều nhanh khi áp lực dịu.
- Chênh lệch giá vàng SJC là **nhiệt kế niềm tin** vào VND và hiệu quả của cơ chế quản lý.`,
      md`- In an open economy **the Fed is the biggest external variable** for Vietnamese rates.
- No valve is free; good policy **spreads the cost** across several channels and reverses quickly once pressure eases.
- The SJC gold premium is a **thermometer of confidence** in the dong and of the management regime.`,
    ),
    linkedLessons: ['m3-l1', 'm3-l2', 'm3-l3', 'm2-l4'],
  },
  {
    id: 'evergrande',
    category: 'corporate',
    period: '2017–2024',
    title: b(
      'Evergrande: đòn bẩy, tiền trả trước và sự sụp đổ của nhà phát triển bất động sản lớn nhất thế giới',
      'Evergrande: leverage, presales and the collapse of the world’s most indebted developer',
    ),
    context: b(
      md`**Cuối năm 2019.** China Evergrande là một trong ba chủ đầu tư lớn nhất Trung Quốc, với hơn **1.300 dự án** ở khoảng 280 thành phố. Tổng nợ phải trả vượt **1,9 nghìn tỷ nhân dân tệ** (khoảng 280 tỷ USD), trong đó phần lớn là **tiền người mua nhà trả trước** và **nợ phải trả nhà cung cấp và nhà thầu**.

Mô hình kinh doanh: mua đất bằng vay nợ, mở bán căn hộ trước khi xây, dùng tiền người mua để trả cho dự án cũ và mua đất mới. Doanh số tăng đều, lợi nhuận báo cáo dương. Tập đoàn còn mở rộng sang xe điện, nước khoáng, đội bóng đá.

Bạn là chuyên viên phân tích tín dụng tại một quỹ trái phiếu châu Á. Evergrande đang chào bán trái phiếu USD lợi suất khoảng **11–13%**, cao hơn nhiều so với trái phiếu cùng xếp hạng.`,
      md`**Late 2019.** China Evergrande is one of the three largest developers in China, with more than **1,300 projects** in about 280 cities. Total liabilities exceed **RMB 1.9 trillion** (about USD 280 billion), mostly **homebuyer presale deposits** and **payables to suppliers and contractors**.

The model: buy land with debt, sell flats before building, use buyers' money to finish old projects and buy new land. Sales rise steadily and reported profit is positive. The group has also expanded into electric cars, bottled water and a football club.

You are a credit analyst at an Asian bond fund. Evergrande is offering dollar bonds yielding about **11–13%**, far above bonds of similar rating.`,
    ),
    data: [
      { label: b('Tổng tài sản', 'Total assets'), value: '≈ RMB 2.2 tn' },
      { label: b('Tổng nợ phải trả / Tổng tài sản', 'Total liabilities / assets'), value: '≈ 85%' },
      { label: b('Nợ vay có lãi', 'Interest-bearing debt'), value: '≈ RMB 700 bn+', note: b('Khoảng 40% đáo hạn trong 12 tháng', 'About 40% due within 12 months') },
      { label: b('Tiền mặt / Nợ vay ngắn hạn', 'Cash / short-term debt'), value: '< 1.0x' },
      { label: b('Tồn kho (dự án dở dang, đất)', 'Inventory (projects, land)'), value: '≈ 55–60% of assets' },
      { label: b('Dòng tiền từ hoạt động kinh doanh', 'Cash flow from operations'), value: '< 0', note: b('Âm nhiều năm liền', 'Negative for several years') },
      { label: b('Lợi suất trái phiếu USD', 'USD bond yield'), value: '≈ 11–13%' },
    ],
    question: b(
      'Bạn khuyến nghị gì về trái phiếu USD của Evergrande cho quỹ?',
      'What do you recommend on Evergrande’s dollar bonds for the fund?',
    ),
    options: [
      {
        id: 'a',
        verdict: 'poor',
        label: b('Mua mạnh: lợi suất cao, "quá lớn để sụp đổ", nhà nước sẽ cứu', 'Buy big: high yield, "too big to fail", the state will rescue it'),
        feedback: b(
          'Đây là lập luận phổ biến nhất năm 2019–2020 và là lập luận sai đắt giá nhất. Bắc Kinh ưu tiên bảo vệ người mua nhà và hệ thống tài chính trong nước, không phải chủ nợ nước ngoài. Trái chủ USD rốt cuộc thu hồi chỉ vài xu trên mỗi đô la.',
          'The most common argument of 2019–2020 and the costliest mistake. Beijing prioritised homebuyers and the domestic financial system, not foreign creditors. Dollar bondholders eventually recovered only cents on the dollar.',
        ),
      },
      {
        id: 'b',
        verdict: 'best',
        label: b('Tránh hoặc bán: cấu trúc vốn phụ thuộc vào tiền mới liên tục; bất kỳ cú siết tín dụng nào cũng gây vỡ nợ', 'Avoid or sell: the capital structure needs constant new money; any credit squeeze means default'),
        feedback: b(
          'Đúng. CFO âm kéo dài, lệch pha kỳ hạn, tiền mặt không đủ trả nợ ngắn hạn, và tài sản chủ yếu là đất, dự án dở dang khó bán. Lợi suất 12% không phải "món hời" mà là thị trường đang định giá rủi ro vỡ nợ cao.',
          'Right. Persistently negative CFO, a maturity mismatch, cash below short-term debt, and assets mostly illiquid land and unfinished projects. A 12% yield was not a bargain; it was the market pricing high default risk.',
        ),
      },
      {
        id: 'c',
        verdict: 'partial',
        label: b('Mua lượng nhỏ trái phiếu ngắn hạn nhất, đáo hạn trong 6 tháng', 'Buy a small amount of the shortest bond, maturing within six months'),
        feedback: b(
          'Hợp lý hơn về quản trị rủi ro vì đặt cược ngắn và nhỏ, và nhiều trái phiếu ngắn hạn đã được trả đúng hạn trong 2020. Nhưng đây là đánh cược vào thời điểm chứ không phải phân tích cơ bản; nhà đầu tư đảo vị thế liên tục cuối cùng vẫn bị kẹt năm 2021.',
          'More sensible risk management — short and small — and many short bonds were repaid on time in 2020. But it is a timing bet, not fundamental analysis; investors who kept rolling were caught in 2021.',
        ),
      },
    ],
    orders: {
      first: b(
        md`- **Tháng 8/2020:** Trung Quốc ban hành quy định **"Ba lằn ranh đỏ" (three red lines)**: (1) nợ phải trả trừ tiền trả trước / tài sản < 70%, (2) nợ ròng / vốn chủ < 100%, (3) tiền mặt / nợ ngắn hạn > 1. Evergrande vi phạm **cả ba**, nên bị cấm tăng nợ vay.
- Không vay thêm được, tập đoàn bán nhà giảm giá 25–30% để thu tiền, trả nhà thầu bằng **thương phiếu** rồi không thanh toán được.
- **Tháng 12/2021:** Evergrande chính thức vỡ nợ trái phiếu USD.`,
        md`- **August 2020:** China introduces the **"three red lines"**: (1) liabilities excluding advances / assets < 70%, (2) net debt / equity < 100%, (3) cash / short-term debt > 1. Evergrande breaches **all three** and is barred from adding debt.
- Unable to borrow, it sells homes at 25–30% discounts for cash, pays contractors with **commercial paper** and then defaults on that.
- **December 2021:** Evergrande formally defaults on its dollar bonds.`,
      ),
      second: b(
        md`- **Lây lan sang cả ngành:** Country Garden, Sunac, Kaisa và hàng chục chủ đầu tư khác vỡ nợ trong 2021–2023. Trái phiếu lợi suất cao bất động sản Trung Quốc mất phần lớn giá trị.
- **Người mua nhà ngừng trả nợ vay (2022):** hàng trăm dự án dừng thi công, người mua tẩy chay trả góp cho những căn nhà chưa được xây.
- **Doanh số nhà mới giảm khoảng một nửa** so với đỉnh 2021; giá đất sụt làm nguồn thu ngân sách địa phương (phụ thuộc bán quyền sử dụng đất) giảm mạnh.`,
        md`- **Contagion across the sector:** Country Garden, Sunac, Kaisa and dozens of others defaulted in 2021–2023. Chinese high-yield property bonds lost most of their value.
- **Mortgage boycotts (2022):** hundreds of projects stalled and buyers stopped paying mortgages on homes not being built.
- **New-home sales roughly halved** from the 2021 peak; falling land prices cut local-government revenue, which depends on land sales.`,
      ),
      third: b(
        md`- **Tháng 1/2024:** tòa án Hồng Kông ra lệnh **thanh lý** Evergrande. Nhà sáng lập Hứa Gia Ấn bị điều tra; cơ quan quản lý cáo buộc công ty **thổi phồng doanh thu khoảng 564 tỷ nhân dân tệ** trong 2019–2020.
- **Hiệu ứng tài sản và giảm phát:** bất động sản chiếm phần lớn tài sản hộ gia đình Trung Quốc; giá nhà giảm làm tiêu dùng yếu, lạm phát Trung Quốc quanh 0% trong 2023–2024, và lợi suất trái phiếu chính phủ 10 năm xuống dưới 2%.
- **Bài học cho Việt Nam:** khủng hoảng trái phiếu doanh nghiệp 2022 có cùng cấu trúc (nợ ngắn hạn, tài sản là đất, phụ thuộc dòng tiền mới), dù quy mô nhỏ hơn nhiều.`,
        md`- **January 2024:** a Hong Kong court orders Evergrande **liquidated**. Founder Hui Ka Yan is investigated; regulators allege the firm **overstated revenue by about RMB 564 billion** in 2019–2020.
- **Wealth effect and deflation:** property is the bulk of Chinese household wealth; falling prices weakened consumption, Chinese inflation hovered near 0% in 2023–2024 and the 10-year government yield fell below 2%.
- **A lesson for Vietnam:** the 2022 corporate-bond crisis had the same structure (short-term debt, land as assets, dependence on new money), though at a far smaller scale.`,
      ),
    },
    takeaways: b(
      md`- **Lợi suất cao là giá của rủi ro**, không phải phần thưởng miễn phí.
- **CFO âm kéo dài + lệch pha kỳ hạn + tiền mặt < nợ ngắn hạn** là bộ ba cảnh báo mạnh nhất với doanh nghiệp đòn bẩy.
- "Quá lớn để sụp đổ" là câu hỏi chính trị: phải hỏi **chính phủ muốn cứu ai**, không phải có cứu hay không.`,
      md`- **A high yield is the price of risk**, not a free reward.
- **Persistently negative CFO + maturity mismatch + cash below short-term debt** is the strongest warning trio for a leveraged firm.
- "Too big to fail" is a political question: ask **whom the government wants to save**, not whether it will.`,
    ),
    linkedLessons: ['m4-l1', 'm4-l3', 'm4-l4', 'm5-l2'],
  },
  {
    id: 'inverted-curve',
    category: 'intermarket',
    period: '2022–2024',
    title: b(
      'Đường cong lợi suất đảo ngược, lãi suất thực và cuộc đua giữa vàng và cổ phiếu',
      'The inverted yield curve, real rates and the race between gold and equities',
    ),
    context: b(
      md`**Tháng 7/2023.** Chênh lệch lợi suất Mỹ 10 năm trừ 2 năm ở mức **−1,0 điểm phần trăm**, sâu nhất từ năm 1981, và đã đảo ngược 12 tháng liên tục. Trong lịch sử, mọi lần đảo ngược sâu như vậy đều có suy thoái theo sau trong 6–24 tháng.

Lợi suất thực 10 năm (TIPS) khoảng **+1,6%**, cao nhất từ năm 2009. Theo mô hình truyền thống, lãi suất thực cao là xấu cho vàng (không sinh lãi) và xấu cho cổ phiếu tăng trưởng (dòng tiền xa bị chiết khấu mạnh).

Nhưng từ năm 2022 các ngân hàng trung ương mua vàng kỷ lục, và một nhóm nhỏ cổ phiếu công nghệ hưởng lợi từ trí tuệ nhân tạo đang tăng mạnh. Bạn quản lý một danh mục đa tài sản 100 triệu USD cho 12–18 tháng tới.`,
      md`**July 2023.** The US 10-year minus 2-year spread stands at **−1.0 point**, the deepest since 1981, after 12 straight months of inversion. Historically every inversion this deep was followed by recession within 6–24 months.

The 10-year real yield (TIPS) is about **+1.6%**, the highest since 2009. On the traditional model, high real rates are bad for gold (which pays nothing) and bad for growth stocks (distant cash flows discounted harder).

Yet since 2022 central banks have bought record amounts of gold, and a handful of tech stocks riding artificial intelligence are surging. You run a USD 100 million multi-asset portfolio for the next 12–18 months.`,
    ),
    data: [
      { label: b('Lợi suất Mỹ 2 năm', 'US 2-year yield'), value: '4.88%' },
      { label: b('Lợi suất Mỹ 10 năm', 'US 10-year yield'), value: '3.97%' },
      { label: b('Lợi suất thực 10 năm (TIPS)', '10-year real yield (TIPS)'), value: '≈ 1.6%' },
      { label: b('Lạm phát CPI', 'CPI inflation'), value: '3.0%' },
      { label: b('Giá vàng', 'Gold price'), value: '≈ USD 1,950/oz' },
      { label: b('S&P 500 (P/E kỳ vọng)', 'S&P 500 (forward P/E)'), value: '≈ 4,550 (≈ 19x)' },
      { label: b('Vàng ngân hàng trung ương mua ròng (2022)', 'Central-bank gold purchases (2022)'), value: '≈ 1,080 tonnes', note: b('Cao nhất từ 1950', 'Highest since 1950') },
    ],
    question: b(
      'Bạn phân bổ danh mục ra sao cho 12–18 tháng tới?',
      'How do you allocate the portfolio for the next 12–18 months?',
    ),
    options: [
      {
        id: 'a',
        verdict: 'partial',
        label: b('Phòng thủ tối đa: 70% tín phiếu kho bạc lãi 5,5%, 30% trái phiếu dài hạn chờ suy thoái', 'Maximum defence: 70% T-bills at 5.5%, 30% long bonds waiting for recession'),
        feedback: b(
          'Tín phiếu 5,5% là lựa chọn an toàn tốt và trái phiếu dài hạn tăng giá khi lợi suất giảm từ cuối 2023. Nhưng suy thoái không đến: S&P 500 tăng khoảng 30% và vàng tăng hơn 30% trong 12–18 tháng sau đó. Đặt cược toàn bộ vào một kịch bản là chi phí cơ hội rất lớn.',
          'T-bills at 5.5% were a good safe choice and long bonds rallied as yields fell from late 2023. But recession never came: the S&P 500 rose about 30% and gold more than 30% over the next 12–18 months. Betting everything on one scenario carried a huge opportunity cost.',
        ),
      },
      {
        id: 'b',
        verdict: 'best',
        label: b('Đa dạng hóa theo kịch bản: tín phiếu làm nền, giữ cổ phiếu chất lượng, thêm vàng vì người mua biên đã thay đổi', 'Diversify by scenario: T-bills as ballast, keep quality equities, add gold because the marginal buyer changed'),
        feedback: b(
          'Tư duy bậc 2: thừa nhận tín hiệu suy thoái nhưng không đặt cược toàn bộ vào nó, và nhận ra rằng mô hình vàng–lãi suất thực đã đổi chế độ khi ngân hàng trung ương trở thành người mua biên. Vàng lên trên 2.600 USD cuối 2024 dù lãi suất thực vẫn cao.',
          'Second-level thinking: respect the recession signal without betting the house on it, and recognise that the gold–real-rate model changed regime once central banks became the marginal buyer. Gold passed USD 2,600 by late 2024 despite high real rates.',
        ),
      },
      {
        id: 'c',
        verdict: 'poor',
        label: b('Bán hết vàng (lãi suất thực cao), bán khống cổ phiếu (đường cong báo suy thoái)', 'Sell all gold (high real rates) and short equities (the curve signals recession)'),
        feedback: b(
          'Hai mô hình lịch sử áp dụng máy móc, cùng sai một lúc. Bán khống cổ phiếu trong năm 2023–2024 lỗ khoảng 30–40%, bán vàng bỏ lỡ một trong những năm tăng tốt nhất thập kỷ. Tương quan lịch sử không phải định luật vật lý.',
          'Two historical models applied mechanically, both wrong at once. Shorting equities in 2023–2024 lost about 30–40% and selling gold missed one of the decade’s best rallies. Historical correlations are not laws of physics.',
        ),
      },
    ],
    orders: {
      first: b(
        md`- Lợi suất 10 năm tiếp tục tăng lên gần **5%** (tháng 10/2023) do lo ngại cung trái phiếu và **phần bù kỳ hạn** tăng, rồi giảm mạnh về khoảng 3,9% cuối năm khi Fed báo hiệu dừng tăng.
- Đường cong **hết đảo ngược** tháng 9/2024 khi Fed bắt đầu giảm lãi suất 50 điểm cơ bản.
- S&P 500 tăng từ khoảng 4.550 lên khoảng **5.880** cuối 2024; vàng tăng từ khoảng 1.950 lên khoảng **2.620 USD**.`,
        md`- The 10-year yield kept rising to nearly **5%** (October 2023) on bond-supply worries and a rising **term premium**, then fell to about 3.9% by year-end as the Fed signalled a halt.
- The curve **un-inverted** in September 2024 when the Fed began cutting with a 50-basis-point move.
- The S&P 500 rose from about 4,550 to about **5,880** by end-2024; gold from about 1,950 to about **USD 2,620**.`,
      ),
      second: b(
        md`- **Lợi nhuận tập trung cực độ:** nhóm "Magnificent 7" (Apple, Microsoft, Nvidia, Alphabet, Amazon, Meta, Tesla) chiếm phần lớn mức tăng của S&P 500 năm 2023. Chỉ số trọng số đều tăng ít hơn nhiều. Nhìn chỉ số có thể đánh lừa về "sức khỏe" của thị trường.
- **Vàng tách khỏi lãi suất thực:** tương quan âm truyền thống gần như biến mất. Động lực mới là **phi đô la hóa dự trữ** sau khi khoảng 300 tỷ USD dự trữ của Nga bị phong tỏa năm 2022, cùng với nhu cầu từ Trung Quốc và Ấn Độ.
- **Việt Nam:** giá vàng trong nước tăng theo giá thế giới cộng thêm phần chênh, tạo ra cơn sốt vàng SJC đầu năm 2024.`,
        md`- **Extreme concentration:** the "Magnificent 7" (Apple, Microsoft, Nvidia, Alphabet, Amazon, Meta, Tesla) delivered most of the S&P 500's 2023 gain. The equal-weight index rose far less. The headline index can mislead about market "health".
- **Gold decoupled from real rates:** the traditional negative correlation nearly vanished. The new driver was **reserve de-dollarisation** after about USD 300 billion of Russian reserves were frozen in 2022, plus demand from China and India.
- **Vietnam:** domestic gold tracked the world price plus a premium, feeding the SJC gold frenzy of early 2024.`,
      ),
      third: b(
        md`- **Uy tín của chỉ báo đường cong lợi suất bị nghi ngờ.** Một số giải thích: (1) QE làm phần bù kỳ hạn âm bất thường, nên đảo ngược "sâu" một cách giả tạo; (2) hộ gia đình và doanh nghiệp đã chốt nợ dài hạn lãi thấp nên ít nhạy với lãi suất ngắn; (3) tài khóa lỏng chống đỡ tăng trưởng. Chỉ báo có thể chỉ đang **trễ** chứ không phải sai.
- **Mô hình định giá vàng phải viết lại:** nhà phân tích chuyển từ "vàng = hàm của lãi suất thực" sang mô hình có thêm cầu ngân hàng trung ương và rủi ro địa chính trị.
- **Bài học về chế độ (regime):** cùng một dữ liệu (lãi suất thực cao, đường cong đảo ngược) nhưng kết quả khác lịch sử vì cấu trúc người tham gia thị trường đã thay đổi.`,
        md`- **The yield-curve signal's credibility was questioned.** Explanations: (1) QE pushed the term premium abnormally negative, making the inversion artificially "deep"; (2) households and firms had locked in cheap long-term debt and were less sensitive to short rates; (3) loose fiscal policy propped up growth. The signal may be **late** rather than wrong.
- **Gold valuation models were rewritten:** analysts moved from "gold = f(real rates)" to models adding central-bank demand and geopolitical risk.
- **A lesson about regimes:** the same data (high real rates, an inverted curve) gave a different outcome because the structure of market participants had changed.`,
      ),
    },
    takeaways: b(
      md`- Chỉ báo lịch sử cho biết **xác suất**, không cho biết **thời điểm** hay sự chắc chắn.
- Luôn hỏi **ai là người mua/bán biên** và họ có nhạy với biến số mà mô hình của bạn dựa vào không.
- Đa dạng hóa theo **kịch bản** tốt hơn đặt cược toàn bộ vào một dự báo.`,
      md`- Historical signals give **probabilities**, not **timing** or certainty.
- Always ask **who the marginal buyer or seller is** and whether they respond to the variable your model relies on.
- Diversifying across **scenarios** beats betting everything on one forecast.`,
    ),
    linkedLessons: ['m3-l4', 'm6-l1', 'm6-l3', 'm6-l4'],
  },
];

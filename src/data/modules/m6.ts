import { b, type Module } from '../../types';

const md = String.raw;
const py = String.raw;

export const m6: Module = {
  id: 'm6',
  index: 6,
  title: b('Kinh tế Lượng & Tư duy Phản biện Bậc 2', 'Applied Econometrics & Second-Level Thinking'),
  subtitle: b(
    'Biến dữ liệu thành bằng chứng, và biết khi nào bằng chứng đó không chứng minh được điều gì.',
    'Turn data into evidence — and know when that evidence proves nothing.',
  ),
  outcome: b(
    'Tự viết Python để kiểm định một luận điểm kinh tế trên dữ liệu thật, đọc đúng hệ số, p-value, R², và nhận ra tương quan giả, thiên lệch biến bỏ sót và chuỗi không dừng.',
    'Write Python to test an economic claim on real data, read coefficients, p-values and R² correctly, and spot spurious correlation, omitted-variable bias and non-stationary series.',
  ),
  tool: 'python-lab',
  capstone: b(
    'Lấy một luận điểm trong Sổ tay của bạn và kiểm định nó trong Python Lab: viết giả thuyết H0/H1, chạy hồi quy, báo cáo hệ số và p-value, và nêu ít nhất 2 lý do kết quả có thể sai (thiên lệch, đồng thời, không dừng).',
    'Take one thesis from your Journal and test it in the Python Lab: state H0/H1, run a regression, report the coefficient and p-value, and give at least two reasons the result might be wrong (bias, simultaneity, non-stationarity).',
  ),
  lessons: [
    {
      id: 'm6-l1',
      title: b('Thống kê mô tả và phân phối lợi suất', 'Descriptive statistics and return distributions'),
      minutes: 15,
      summary: b(
        'Trung bình nói lên rất ít. Độ lệch chuẩn, độ lệch và đuôi dày mới cho biết bạn có thể mất bao nhiêu.',
        'The mean says little. Standard deviation, skew and fat tails tell you how much you can lose.',
      ),
      core: b(
        md`## Các thước đo cơ bản
- **Trung bình** $\bar x$, **trung vị**, **độ lệch chuẩn** $\sigma = \sqrt{\tfrac{1}{n-1}\sum (x_i - \bar x)^2}$
- **Hệ số tương quan:** $\rho_{xy} = \dfrac{\text{cov}(x,y)}{\sigma_x \sigma_y} \in [-1, 1]$
- **Độ lệch (skewness):** âm nghĩa là thỉnh thoảng có cú rơi rất mạnh
- **Độ nhọn (kurtosis):** lớn hơn 3 nghĩa là **đuôi dày** (fat tails), biến cố cực đoan thường xuyên hơn phân phối chuẩn

## Lợi suất trung bình cộng và trung bình nhân
$$\text{CAGR} \approx \bar r - \frac{\sigma^2}{2}$$
Một tài sản tăng 50% rồi giảm 50% có trung bình cộng 0% nhưng bạn **mất 25%**. Biến động cao âm thầm ăn mòn lợi suất kép.

## Tỷ lệ Sharpe
$$\text{Sharpe} = \frac{\bar r - r_f}{\sigma}$$
Lợi suất trên một đơn vị rủi ro. Danh mục lợi suất 12% với $\sigma = 20\%$ kém hơn danh mục 9% với $\sigma = 8\%$ (khi $r_f = 4\%$).

## Sụt giảm tối đa (maximum drawdown)
Mức giảm lớn nhất từ đỉnh xuống đáy. Đây là con số quyết định nhà đầu tư có chịu nổi chiến lược hay không, vì ít ai giữ được bình tĩnh khi danh mục mất một nửa.

> Câu hỏi bậc 2: số liệu năm có làm mượt mất những cú sốc trong năm không? Năm 2020 S&P 500 tăng 16% nhưng có lúc giảm 34% trong 5 tuần.`,
        md`## Basic measures
- **Mean** $\bar x$, **median**, **standard deviation** $\sigma = \sqrt{\tfrac{1}{n-1}\sum (x_i - \bar x)^2}$
- **Correlation:** $\rho_{xy} = \dfrac{\text{cov}(x,y)}{\sigma_x \sigma_y} \in [-1, 1]$
- **Skewness:** negative means occasional very sharp falls
- **Kurtosis:** above 3 means **fat tails** — extreme events more often than a normal distribution

## Arithmetic versus geometric returns
$$\text{CAGR} \approx \bar r - \frac{\sigma^2}{2}$$
An asset that rises 50% then falls 50% averages 0%, yet you **lose 25%**. High volatility quietly erodes compound returns.

## The Sharpe ratio
$$\text{Sharpe} = \frac{\bar r - r_f}{\sigma}$$
Return per unit of risk. A portfolio earning 12% with $\sigma = 20\%$ is worse than one earning 9% with $\sigma = 8\%$ (with $r_f = 4\%$).

## Maximum drawdown
The largest peak-to-trough fall. It decides whether an investor can actually live with a strategy, since few stay calm when a portfolio halves.

> The second-order question: do annual figures smooth away intra-year shocks? In 2020 the S&P 500 rose 16% but at one point fell 34% in five weeks.`,
      ),
      examples: b(
        md`## Ví dụ số: biến động ăn mòn lợi suất
| | Năm 1 | Năm 2 | TB cộng | Kết quả thực |
|---|---|---|---|---|
| Tài sản A | +10% | +10% | 10% | +21,0% |
| Tài sản B | +60% | −40% | 10% | −4,0% |

Cùng trung bình cộng 10%, nhưng B làm bạn lỗ.

## S&P 500 và vàng, 2000–2024 (số liệu năm)
- S&P 500 có ba năm giảm sâu: 2001–2002 (bong bóng dot-com), 2008 (−38%) và 2022 (−19%). Tính theo số cuối năm, sụt giảm tối đa chỉ khoảng **−38%** (2008); tính theo đỉnh–đáy trong năm thì là khoảng **−49%** (2000–2002) và **−57%** (2007–2009). Số liệu năm che giấu một phần nỗi đau thật.
- Vàng có giai đoạn 2012–2015 giảm khoảng **−36%**, kéo dài 3 năm.

Tài sản nào cũng có những năm khiến người nắm giữ muốn bỏ cuộc. Kỷ luật quan trọng hơn dự báo.

## VN-Index
Từ đỉnh tháng 4/2022 quanh 1.530 điểm đến đáy tháng 11/2022 quanh 910 điểm, VN-Index mất khoảng **40%** trong 7 tháng. Nhà đầu tư dùng margin bị bán giải chấp hàng loạt, khuếch đại cú rơi. Đây là đuôi dày trong thực tế.`,
        md`## Worked numbers: volatility erodes returns
| | Year 1 | Year 2 | Arithmetic mean | Actual result |
|---|---|---|---|---|
| Asset A | +10% | +10% | 10% | +21.0% |
| Asset B | +60% | −40% | 10% | −4.0% |

Same 10% average, yet B loses you money.

## S&P 500 and gold, 2000–2024 (annual data)
- The S&P 500 had three deep falls: 2001–2002 (the dot-com bust), 2008 (−38%) and 2022 (−19%). On year-end figures the maximum drawdown is only about **−38%** (2008); measured peak to trough within the year it was about **−49%** (2000–2002) and **−57%** (2007–2009). Annual data hide part of the real pain.
- Gold fell about **−36%** from 2012 to 2015, a three-year slide.

Every asset has years that make holders want to quit. Discipline matters more than forecasts.

## The VN-Index
From its April 2022 peak near 1,530 to its November 2022 trough near 910, the VN-Index lost about **40%** in seven months. Margin calls forced mass selling and amplified the fall. Fat tails in real life.`,
      ),
      lab: {
        kind: 'python',
        mission: b(
          'Chạy code. Dự đoán trước: tài sản nào có Sharpe cao nhất giai đoạn 2000–2024, S&P 500 hay vàng? Rồi thêm một danh mục 60% S&P + 40% vàng và so sánh sụt giảm tối đa. Đa dạng hóa giúp được bao nhiêu?',
          'Run the code. Predict first: which had the higher Sharpe over 2000–2024, the S&P 500 or gold? Then add a 60% S&P + 40% gold portfolio and compare maximum drawdowns. How much does diversification help?',
        ),
        code: py`# Return statistics for US equities and gold
us = load('us_macro')
r = pd.DataFrame({
    'year': us.year,
    'sp500': us.sp500.pct_change() * 100,
    'gold': us.gold.pct_change() * 100,
}).dropna()
r['mix_60_40'] = 0.6 * r.sp500 + 0.4 * r.gold     # rebalanced yearly
rf = 2.0                                           # rough average T-bill rate, %

def stats(x):
    wealth = (1 + x / 100).cumprod()
    dd = (wealth / wealth.cummax() - 1).min() * 100
    cagr = (wealth.iloc[-1] ** (1 / len(x)) - 1) * 100
    return {'mean': x.mean(), 'stdev': x.std(), 'CAGR': cagr, 'Sharpe': (x.mean() - rf) / x.std(),
            'worst': x.min(), 'max DD': dd, 'skew': x.skew()}

table = pd.DataFrame({c: stats(r[c]) for c in ['sp500', 'gold', 'mix_60_40']}).T
print(table.round(2))

print(f"\nCorrelation S&P 500 vs gold (annual returns): {r.sp500.corr(r.gold):.2f}")
print(f"Volatility drag check (S&P): mean - var/2 = {r.sp500.mean() - r.sp500.var() / 200:.2f}% vs CAGR {table.loc['sp500', 'CAGR']:.2f}%")

chart(r.year, {'S&P 500': r.sp500, 'Gold': r.gold}, kind='bar', title='Annual returns (%)', xlabel='Year')
wealth = pd.DataFrame({c: (1 + r[c] / 100).cumprod() * 100 for c in ['sp500', 'gold', 'mix_60_40']})
chart(r.year, {'S&P 500': wealth.sp500, 'Gold': wealth.gold, '60/40 mix': wealth.mix_60_40},
      title='Growth of 100 (price only, no dividends)', xlabel='Year')
`,
      },
      quiz: [
        {
          id: 'm6-l1-q1',
          scenario: b(
            'Quỹ A có lợi suất trung bình cộng 15%/năm với độ lệch chuẩn 35%. Quỹ B có 11%/năm với độ lệch chuẩn 10%. Quỹ nào nhiều khả năng mang lại tài sản lớn hơn sau 20 năm?',
            'Fund A averages 15% a year with a 35% standard deviation. Fund B averages 11% with 10%. Which is likely to leave you wealthier after 20 years?',
          ),
          options: [
            {
              text: b('Quỹ A, vì trung bình cao hơn', 'Fund A, because its average is higher'),
              why: b('Lợi suất kép ≈ 15% − 35²/200 ≈ 8,9%, thấp hơn B.', 'Its compound return ≈ 15% − 35²/200 ≈ 8.9%, below B.'),
            },
            {
              text: b('Quỹ B, vì lợi suất kép ≈ 10,5% cao hơn A do biến động thấp', 'Fund B: its compound return ≈ 10.5% beats A thanks to low volatility'),
              correct: true,
              why: b('Biến động làm giảm lợi suất kép khoảng σ²/2. Trung bình cộng không phải thứ bạn nhận được.', 'Volatility cuts compound returns by roughly σ²/2. The arithmetic mean is not what you take home.'),
            },
            {
              text: b('Như nhau về dài hạn', 'The same in the long run'),
              why: b('Khác biệt cộng dồn rất lớn sau 20 năm.', 'The difference compounds hugely over 20 years.'),
            },
          ],
        },
        {
          id: 'm6-l1-q2',
          scenario: b(
            'Một chiến lược bán quyền chọn có 95 tháng lãi 1% và 5 tháng lỗ 25%. Thống kê mô tả nào cảnh báo rõ nhất rủi ro này?',
            'An option-selling strategy has 95 months of +1% and 5 months of −25%. Which descriptive statistic flags the risk most clearly?',
          ),
          options: [
            {
              text: b('Tỷ lệ tháng thắng 95%', 'The 95% win rate'),
              why: b('Tỷ lệ thắng cao chính là thứ che giấu rủi ro.', 'A high win rate is exactly what hides the risk.'),
            },
            {
              text: b('Độ lệch âm lớn và sụt giảm tối đa', 'Large negative skew and maximum drawdown'),
              correct: true,
              why: b('Phân phối lệch trái: lãi nhỏ thường xuyên, lỗ lớn hiếm gặp. Tổng cộng 95 − 125 = −30%.', 'Left-skewed: frequent small gains, rare big losses. In total 95 − 125 = −30%.'),
            },
            {
              text: b('Trung bình tháng dương', 'A positive monthly mean'),
              why: b('Trung bình tháng thực ra âm: (95 − 125)/100 = −0,3%.', 'The monthly mean is actually negative: (95 − 125)/100 = −0.3%.'),
            },
          ],
        },
      ],
    },
    {
      id: 'm6-l2',
      title: b('Hồi quy tuyến tính OLS', 'Ordinary least squares regression'),
      minutes: 20,
      summary: b(
        'OLS vẽ đường thẳng phù hợp nhất qua đám mây dữ liệu. Kỹ năng thật là đọc đúng những gì đường thẳng đó nói và không nói.',
        'OLS draws the best-fitting line through a cloud of data. The real skill is reading what that line does and does not say.',
      ),
      core: b(
        md`## Mô hình
$$y_i = \beta_0 + \beta_1 x_{1i} + \dots + \beta_k x_{ki} + \varepsilon_i$$
OLS chọn các $\beta$ để **tối thiểu tổng bình phương phần dư**:
$$\hat\beta = (X^\top X)^{-1} X^\top y$$

## Đọc kết quả
- **Hệ số $\hat\beta_1$:** khi $x_1$ tăng 1 đơn vị và **các biến khác giữ nguyên**, $y$ thay đổi trung bình $\hat\beta_1$ đơn vị.
- **Sai số chuẩn (standard error)** và **thống kê t** $= \hat\beta / SE$: $|t| > 2$ là xấp xỉ có ý nghĩa ở mức 5%.
- **p-value:** xác suất thấy hệ số lớn như vậy **nếu hệ số thật bằng 0**. Không phải xác suất giả thuyết của bạn đúng.
- **R²:** tỷ lệ biến động của $y$ được giải thích. R² cao không có nghĩa mô hình đúng; R² thấp không có nghĩa hệ số vô dụng.

## Các giả định cần kiểm tra
1. **Tuyến tính** trong tham số
2. **Ngoại sinh:** $E[\varepsilon \mid X] = 0$, tức không có biến bỏ sót tương quan với $x$
3. **Phương sai sai số không đổi** (homoskedasticity)
4. **Không tự tương quan** của sai số (thường bị vi phạm với dữ liệu chuỗi thời gian)
5. Không **đa cộng tuyến** hoàn hảo

## Thiên lệch do bỏ sót biến
Nếu biến $z$ ảnh hưởng $y$ và tương quan với $x$ mà bạn không đưa vào mô hình, hệ số của $x$ sẽ "nhận công" thay cho $z$:
$$\text{bias} = \beta_z \times \frac{\text{cov}(x,z)}{\text{var}(x)}$$

> Mẫu nhỏ (25 năm) thì sai số chuẩn lớn. Đừng kết luận mạnh từ một hồi quy trên 25 điểm dữ liệu.`,
        md`## The model
$$y_i = \beta_0 + \beta_1 x_{1i} + \dots + \beta_k x_{ki} + \varepsilon_i$$
OLS picks the $\beta$s that **minimise the sum of squared residuals**:
$$\hat\beta = (X^\top X)^{-1} X^\top y$$

## Reading the output
- **Coefficient $\hat\beta_1$:** when $x_1$ rises by one unit, **holding the others fixed**, $y$ changes on average by $\hat\beta_1$.
- **Standard error** and the **t-statistic** $= \hat\beta / SE$: $|t| > 2$ is roughly significant at 5%.
- **p-value:** the probability of seeing a coefficient this large **if the true coefficient were zero**. Not the probability that your hypothesis is true.
- **R²:** the share of $y$'s variation explained. A high R² does not make a model right; a low R² does not make a coefficient useless.

## Assumptions to check
1. **Linearity** in the parameters
2. **Exogeneity:** $E[\varepsilon \mid X] = 0$ — no omitted variable correlated with $x$
3. **Constant error variance** (homoskedasticity)
4. **No autocorrelation** of errors (often violated with time series)
5. No perfect **multicollinearity**

## Omitted-variable bias
If $z$ affects $y$ and is correlated with $x$ but left out, $x$'s coefficient takes the credit for $z$:
$$\text{bias} = \beta_z \times \frac{\text{cov}(x,z)}{\text{var}(x)}$$

> Small samples (25 years) mean large standard errors. Do not draw strong conclusions from a regression on 25 data points.`,
      ),
      examples: b(
        md`## Ví dụ: vàng và lãi suất thực
Lý thuyết nói lãi suất thực tăng thì vàng yếu. Nhưng hồi quy lợi suất vàng hằng năm theo thay đổi lãi suất thực của Mỹ trên dữ liệu 2000–2024 của ứng dụng cho hệ số **dương nhỏ với p ≈ 0,6**, tức không phân biệt được với 0. Khi thêm biến DXY, chính đồng USD mới là biến có ý nghĩa (hệ số ≈ −0,85, p ≈ 0,03). Vì sao lý thuyết không hiện ra?
- Mẫu chỉ 24 quan sát, sai số chuẩn lớn.
- Lãi suất thực ở đây là ước tính thô: lãi suất Fed cuối năm trừ lạm phát bình quân năm, không phải lợi suất TIPS 10 năm mà thị trường vàng thực sự theo dõi.
- Sau 2022 ngân hàng trung ương mua vàng mạnh (một biến bị bỏ sót).

Bài học: **một kết quả không có ý nghĩa thống kê không chứng minh lý thuyết sai**; nó có thể chỉ cho thấy dữ liệu hoặc thước đo của bạn quá thô.

## Ví dụ: thiên lệch do bỏ sót biến
Một nghiên cứu thấy "người có thẻ tín dụng hạng bạch kim có điểm tín dụng cao hơn", rồi kết luận nên cấp thêm thẻ bạch kim để cải thiện điểm tín dụng. Biến bị bỏ sót là **thu nhập**: nó làm tăng cả hai.

Trong tài chính: "công ty mua lại cổ phiếu có lợi suất cổ phiếu cao hơn". Một phần là vì chỉ công ty **có nhiều tiền mặt và lợi nhuận tốt** mới mua lại được. Mua lại cổ phiếu có thể không phải là nguyên nhân.

## Đọc p-value đúng cách
p-value = 0,03 **không** có nghĩa "97% khả năng giả thuyết đúng". Nó có nghĩa: nếu thật sự không có quan hệ nào, cơ hội thấy kết quả mạnh như vậy chỉ khoảng 3%. Nếu bạn đã thử 30 biến khác nhau rồi mới tìm ra biến này, thì việc thấy một biến có p < 0,05 là điều gần như chắc chắn xảy ra (**p-hacking**).`,
        md`## Example: gold and real rates
Theory says higher real rates mean weaker gold. Yet regressing annual gold returns on changes in the US real rate with the app's 2000–2024 data gives a **small positive coefficient with p ≈ 0.6** — indistinguishable from zero. Add the DXY and it is the dollar that is significant (coefficient ≈ −0.85, p ≈ 0.03). Why doesn't the theory show up?
- Only 24 observations, so large standard errors.
- The real rate here is crude: the year-end Fed rate minus average inflation, not the 10-year TIPS yield the gold market actually watches.
- After 2022 central banks bought heavily (an omitted variable).

The lesson: **an insignificant result does not prove a theory wrong**; it may only show that your data or measure is too coarse.

## Example: omitted-variable bias
A study finds "platinum-card holders have higher credit scores" and concludes that issuing more platinum cards would raise scores. The omitted variable is **income**, which drives both.

In finance: "companies that buy back shares outperform". Partly because only firms with **ample cash and good profits** can buy back. The buy-back may not be the cause.

## Reading p-values properly
A p-value of 0.03 does **not** mean "97% chance the hypothesis is true". It means: if there were truly no relationship, a result this strong would appear only about 3% of the time. If you tried 30 variables before finding this one, seeing one with p < 0.05 is almost guaranteed (**p-hacking**).`,
      ),
      lab: {
        kind: 'python',
        mission: b(
          'Chạy hai mô hình. Hệ số lãi suất thực có ý nghĩa không? Khi thêm DXY, R² và hệ số thay đổi thế nào? Sau đó tự viết mô hình thứ ba: lợi suất S&P 500 theo thay đổi lợi suất 10 năm. Kết luận nào bạn ĐƯỢC và KHÔNG được rút ra?',
          'Run both models. Is the real-rate coefficient significant? How do R² and the coefficients change when you add the DXY? Then write a third model: S&P 500 returns on the change in the 10-year yield. Which conclusions are you allowed to draw, and which not?',
        ),
        code: py`# What moves gold? Simple vs multiple regression
us = load('us_macro')
df = pd.DataFrame({
    'year': us.year,
    'gold_ret': us.gold.pct_change() * 100,
    'd_real': (us.fed_funds - us.cpi_yoy).diff(),
    'dxy_ret': us.dxy.pct_change() * 100,
    'd_10y': us.us10y.diff(),
}).dropna()

print("=== Model 1: gold return on change in real policy rate ===")
m1 = ols(df.gold_ret, df[['d_real']])

print("\n=== Model 2: add the dollar (DXY) ===")
m2 = ols(df.gold_ret, df[['d_real', 'dxy_ret']])

print(f"\nReal-rate coefficient moved from {m1['coef'][1]:.2f} to {m2['coef'][1]:.2f} once the dollar is controlled for.")
print(f"corr(d_real, dxy_ret) = {df.d_real.corr(df.dxy_ret):.2f}  <- correlated regressors: leaving one out shifts the other's coefficient")

chart(df.dxy_ret, df.gold_ret, kind='scatter', fit=True,
      title='Gold vs dollar, annual % change', xlabel='DXY % change', ylabel='Gold % change')

# Residual check: are errors well-behaved?
res = m2['resid']
print(f"\nResidual mean {res.mean():.3f}, first-order autocorrelation {np.corrcoef(res[:-1], res[1:])[0, 1]:.2f}")

# Your turn: regress S&P 500 returns on the change in the 10y yield
`,
      },
      quiz: [
        {
          id: 'm6-l2-q1',
          scenario: b(
            'Hồi quy lợi suất cổ phiếu theo tăng trưởng GDP cho hệ số 1,8 với p-value 0,04 và R² = 0,12 trên 25 năm dữ liệu. Diễn giải nào chính xác nhất?',
            'A regression of stock returns on GDP growth gives a coefficient of 1.8, p = 0.04 and R² = 0.12 over 25 years. Which reading is most accurate?',
          ),
          options: [
            {
              text: b('96% khả năng tăng trưởng GDP làm cổ phiếu tăng', 'There is a 96% chance that GDP growth drives stocks up'),
              why: b('p-value không phải xác suất giả thuyết đúng, và hồi quy không chứng minh quan hệ nhân quả.', 'A p-value is not the probability that a hypothesis is true, and regression does not prove causation.'),
            },
            {
              text: b('Có quan hệ dương có ý nghĩa thống kê nhưng yếu: GDP chỉ giải thích khoảng 12% biến động lợi suất, và mẫu nhỏ', 'A statistically significant but weak positive link: GDP explains only about 12% of return variation, and the sample is small'),
              correct: true,
              why: b('Đọc đủ ba thứ: chiều, độ mạnh (R²), độ tin cậy (p và cỡ mẫu). Dự báo bằng mô hình này sẽ rất không chính xác.', 'Read all three: direction, strength (R²) and reliability (p and sample size). Forecasting with this would be very imprecise.'),
            },
            {
              text: b('Mô hình vô dụng vì R² thấp', 'The model is useless because R² is low'),
              why: b('R² thấp là bình thường với lợi suất tài sản; hệ số vẫn có thể mang thông tin.', 'Low R² is normal for asset returns; the coefficient can still be informative.'),
            },
          ],
        },
        {
          id: 'm6-l2-q2',
          scenario: b(
            'Một nhà phân tích thử 40 chỉ báo kỹ thuật và tìm ra 2 chỉ báo dự báo được VN-Index với p < 0,05. Phản ứng đúng là gì?',
            'An analyst tests 40 technical indicators and finds two that predict the VN-Index with p < 0.05. What is the right reaction?',
          ),
          options: [
            {
              text: b('Dùng ngay hai chỉ báo này để giao dịch', 'Trade on these two at once'),
              why: b('Với 40 phép thử, kỳ vọng có khoảng 2 kết quả "có ý nghĩa" chỉ do ngẫu nhiên.', 'With 40 tests, about two "significant" results are expected by pure chance.'),
            },
            {
              text: b('Nghi ngờ p-hacking: kiểm tra trên dữ liệu ngoài mẫu và đòi hỏi một cơ chế kinh tế giải thích được', 'Suspect p-hacking: test out of sample and demand an economic mechanism'),
              correct: true,
              why: b('Kiểm định bội (multiple testing) làm p-value mất giá trị. Dữ liệu mới và lý thuyết là hai lớp bảo vệ.', 'Multiple testing devalues p-values. Fresh data and theory are the two safeguards.'),
            },
            {
              text: b('Kết luận thị trường hiệu quả nên không chỉ báo nào hoạt động', 'Conclude the market is efficient, so no indicator can work'),
              why: b('Đó cũng là kết luận vội; dữ liệu này đơn giản chưa chứng minh được gì.', 'Also hasty; this data simply proves nothing either way.'),
            },
          ],
        },
      ],
    },
    {
      id: 'm6-l3',
      title: b('Chuỗi thời gian và hồi quy giả mạo', 'Time series and spurious regression'),
      minutes: 17,
      summary: b(
        'Hai chuỗi cùng đi lên theo thời gian sẽ luôn có vẻ tương quan mạnh, kể cả khi chúng chẳng liên quan gì đến nhau.',
        'Any two series that trend upward over time will look strongly correlated, even if they are unrelated.',
      ),
      core: b(
        md`## Chuỗi dừng và không dừng
- **Chuỗi dừng (stationary):** trung bình và phương sai không đổi theo thời gian, ví dụ lạm phát, lợi suất hằng năm.
- **Chuỗi không dừng:** có xu hướng hoặc **bước ngẫu nhiên (random walk)**, ví dụ giá cổ phiếu, GDP danh nghĩa, giá vàng.
$$\text{Bước ngẫu nhiên: } y_t = y_{t-1} + \varepsilon_t$$

## Hồi quy giả mạo (spurious regression)
Hồi quy hai chuỗi không dừng độc lập với nhau thường cho R² cao và t-stat lớn. Granger và Newbold (1974) cho thấy điều này xảy ra **phần lớn thời gian**. Hai cách xử lý cơ bản:
1. **Lấy sai phân:** dùng $\Delta y_t$ hoặc tỷ lệ tăng trưởng thay vì mức.
2. Kiểm tra **đồng liên kết (cointegration)**: nếu tồn tại một tổ hợp tuyến tính dừng, hai chuỗi thật sự gắn với nhau dài hạn.

## Tự tương quan
Giá trị hôm nay liên quan với giá trị hôm qua:
$$\rho_k = \text{corr}(y_t, y_{t-k})$$
Lạm phát có tự tương quan cao (quán tính), lợi suất cổ phiếu hằng ngày thì gần như không.

## Độ trễ và quan hệ dẫn trước
Nhiều quan hệ vĩ mô có **độ trễ**: lãi suất hôm nay ảnh hưởng lạm phát sau 4–6 quý; đường cong lợi suất đảo ngược dẫn trước suy thoái 6–24 tháng. Tương quan chéo theo độ trễ giúp tìm ra cấu trúc này.

## Nhân quả Granger
$x$ "Granger-gây ra" $y$ nếu quá khứ của $x$ giúp dự báo $y$ tốt hơn chỉ dùng quá khứ của $y$. Đây là **khả năng dự báo**, không phải nhân quả thật.`,
        md`## Stationary versus non-stationary
- **Stationary:** mean and variance constant over time, e.g. inflation, annual returns.
- **Non-stationary:** trending or a **random walk**, e.g. stock prices, nominal GDP, gold prices.
$$\text{Random walk: } y_t = y_{t-1} + \varepsilon_t$$

## Spurious regression
Regressing two independent non-stationary series often yields a high R² and large t-statistics. Granger and Newbold (1974) showed this happens **most of the time**. Two basic remedies:
1. **Difference:** use $\Delta y_t$ or growth rates instead of levels.
2. Test for **cointegration**: if a linear combination is stationary, the two series are genuinely linked in the long run.

## Autocorrelation
Today's value relates to yesterday's:
$$\rho_k = \text{corr}(y_t, y_{t-k})$$
Inflation is highly autocorrelated (it has inertia); daily stock returns are almost not.

## Lags and leading relationships
Many macro links have **lags**: today's rate affects inflation 4–6 quarters later; an inverted curve leads recessions by 6–24 months. Lagged cross-correlations help reveal this structure.

## Granger causality
$x$ "Granger-causes" $y$ if $x$'s past improves forecasts of $y$ beyond $y$'s own past. This is **predictive ability**, not true causation.`,
      ),
      examples: b(
        md`## Ví dụ kinh điển: tương quan giả
Giá vàng và chỉ số S&P 500 từ 2000 đến 2024 đều tăng mạnh. Hồi quy theo **mức giá** cho R² rất cao. Nhưng hồi quy theo **lợi suất hằng năm** thì tương quan gần bằng 0. Hai tài sản không di chuyển cùng nhau từ năm này sang năm khác; chúng chỉ cùng tăng theo thời gian (và theo lạm phát).

## Mô phỏng: hai bước ngẫu nhiên độc lập
Tạo 1.000 cặp chuỗi bước ngẫu nhiên hoàn toàn độc lập, mỗi chuỗi 50 điểm, rồi hồi quy chuỗi này theo chuỗi kia. Khoảng **hai phần ba** số lần hồi quy (thường 65–75%, tùy mẫu ngẫu nhiên) cho $|t| > 2$. Nếu dùng sai phân, tỷ lệ này giảm về khoảng 5% như lý thuyết.

## Ứng dụng: tín dụng dẫn trước lạm phát ở Việt Nam
Tương quan giữa tăng trưởng tín dụng **năm t** và lạm phát **năm t+1** cao hơn tương quan cùng năm. Nhìn lại 2007–2008 (tín dụng tăng 54%, lạm phát 23% năm sau) và 2010–2011. Quan hệ dẫn trước này là lý do NHNN theo dõi room tín dụng chặt chẽ.`,
        md`## Classic example: a spurious correlation
Gold and the S&P 500 both rose strongly from 2000 to 2024. Regressing **price levels** gives a very high R². Regressing **annual returns** gives a correlation near zero. The assets do not move together year to year; they merely both rose over time (and with inflation).

## Simulation: two independent random walks
Generate 1,000 pairs of completely independent 50-point random walks and regress one on the other. Roughly **two-thirds** of the regressions (typically 65–75%, depending on the random draw) show $|t| > 2$. Using differences brings that down to about 5%, as theory predicts.

## Application: credit leads inflation in Vietnam
The correlation between credit growth in **year t** and inflation in **year t+1** is higher than the same-year correlation. Look at 2007–2008 (credit up 54%, inflation 23% the year after) and 2010–2011. This leading relationship is why the SBV watches credit quotas closely.`,
      ),
      lab: {
        kind: 'python',
        mission: b(
          'Chạy mô phỏng hồi quy giả mạo và đếm tỷ lệ "có ý nghĩa" ở mức và ở sai phân. Sau đó kiểm tra: với dữ liệu Việt Nam, độ trễ nào của tăng trưởng tín dụng tương quan mạnh nhất với lạm phát?',
          'Run the spurious-regression simulation and count the "significant" share in levels and in differences. Then check: in Vietnamese data, which lag of credit growth correlates most strongly with inflation?',
        ),
        code: py`# Spurious regression: why you must difference trending series
import numpy as np
rng = np.random.default_rng(42)

def tstat(y, x):
    X = np.column_stack([np.ones(len(x)), x])
    beta, *_ = np.linalg.lstsq(X, y, rcond=None)
    resid = y - X @ beta
    s2 = resid @ resid / (len(y) - 2)
    se = np.sqrt(s2 * np.linalg.inv(X.T @ X)[1, 1])
    return beta[1] / se

trials, n = 1000, 50
sig_levels = sig_diffs = 0
for _ in range(trials):
    a = np.cumsum(rng.normal(size=n))      # random walk
    b = np.cumsum(rng.normal(size=n))      # independent random walk
    sig_levels += abs(tstat(a, b)) > 2
    sig_diffs += abs(tstat(np.diff(a), np.diff(b))) > 2
print(f"Independent random walks judged 'significant': levels {sig_levels / trials:.0%}, differences {sig_diffs / trials:.0%}")

# Real data: gold vs S&P in levels and in returns
us = load('us_macro')
print(f"\nGold vs S&P 500 correlation: levels {us.gold.corr(us.sp500):.2f}, annual returns {us.gold.pct_change().corr(us.sp500.pct_change()):.2f}")

# Lead-lag: Vietnamese credit growth and inflation
vn = load('vn_macro')
print("\nCorrelation of credit growth (t) with inflation (t + lag):")
lags = [0, 1, 2]
corrs = []
for lag in lags:
    c = vn.credit_growth.iloc[:len(vn) - lag].reset_index(drop=True).corr(vn.cpi_yoy.iloc[lag:].reset_index(drop=True))
    corrs.append(c)
    print(f"  lag {lag}: {c:.2f}")
chart([f'lag {l}' for l in lags], corrs, kind='bar', title='Credit growth leads inflation?')

# Autocorrelation of inflation (persistence)
print(f"\nUS inflation autocorrelation (1 year): {us.cpi_yoy.autocorr(1):.2f}")
print(f"S&P 500 annual return autocorrelation: {us.sp500.pct_change().autocorr(1):.2f}")
`,
      },
      quiz: [
        {
          id: 'm6-l3-q1',
          scenario: b(
            'Một bài viết khẳng định: "Từ 2005 đến 2024, GDP danh nghĩa Việt Nam và số cửa hàng trà sữa có tương quan 0,96, vậy trà sữa thúc đẩy tăng trưởng." Lỗi phương pháp chính là gì?',
            'An article claims: "From 2005 to 2024 Vietnam’s nominal GDP and the number of bubble-tea shops correlate at 0.96, so bubble tea drives growth." What is the main methodological flaw?',
          ),
          options: [
            {
              text: b('Hai chuỗi đều có xu hướng tăng theo thời gian nên tương quan theo mức là giả mạo; cần dùng tốc độ thay đổi và tìm cơ chế', 'Both series trend upward, so the level correlation is spurious; use rates of change and look for a mechanism'),
              correct: true,
              why: b('Bất kỳ hai thứ cùng tăng theo thời gian đều tương quan cao theo mức. Thêm nữa, chiều nhân quả hợp lý là ngược lại: thu nhập tăng nên người ta uống trà sữa nhiều hơn.', 'Anything that grows over time correlates in levels. And the plausible causality runs the other way: higher incomes buy more bubble tea.'),
            },
            {
              text: b('Mẫu quá lớn', 'The sample is too large'),
              why: b('20 năm là mẫu nhỏ; vấn đề không nằm ở cỡ mẫu.', 'Twenty years is small; size is not the problem.'),
            },
            {
              text: b('Tương quan 0,96 là chưa đủ cao', 'A correlation of 0.96 is not high enough'),
              why: b('Độ cao của tương quan không cứu được một thiết kế sai.', 'No correlation level rescues a flawed design.'),
            },
          ],
        },
        {
          id: 'm6-l3-q2',
          scenario: b(
            'Bạn thấy tăng trưởng tín dụng năm nay tương quan 0,6 với lạm phát năm sau, nhưng chỉ 0,3 với lạm phát cùng năm. Kết luận hợp lý nhất là gì?',
            'You find credit growth this year correlates 0.6 with next year’s inflation but only 0.3 with same-year inflation. What is the most reasonable conclusion?',
          ),
          options: [
            {
              text: b('Tín dụng chắc chắn gây ra lạm phát', 'Credit certainly causes inflation'),
              why: b('Dẫn trước trong dữ liệu là dấu hiệu, không phải chứng minh nhân quả.', 'A data lead is a hint, not proof of causation.'),
            },
            {
              text: b('Tín dụng có giá trị như chỉ báo dẫn trước, phù hợp với cơ chế có độ trễ, nhưng cần thận trọng vì mẫu nhỏ và có thể có biến chung', 'Credit is useful as a leading indicator, consistent with a lagged mechanism, but be cautious given the small sample and possible common drivers'),
              correct: true,
              why: b('Kết luận đúng mức: có cơ chế kinh tế hợp lý, có bằng chứng dẫn trước, và nêu rõ giới hạn.', 'A calibrated conclusion: a plausible mechanism, a leading pattern, and stated limits.'),
            },
            {
              text: b('Tương quan cùng năm thấp hơn nên không có quan hệ', 'Same-year correlation is lower, so there is no link'),
              why: b('Bỏ qua độ trễ là bỏ qua cách chính sách tiền tệ vận hành.', 'Ignoring lags ignores how monetary policy works.'),
            },
          ],
        },
      ],
    },
    {
      id: 'm6-l4',
      title: b('Tương quan, nhân quả và tư duy bậc 2', 'Correlation, causation and second-level thinking'),
      minutes: 18,
      summary: b(
        'Tư duy bậc 1 hỏi "tin này tốt hay xấu?". Tư duy bậc 2 hỏi "thị trường đã kỳ vọng gì, và rồi sao nữa?".',
        'First-level thinking asks "is this good or bad?". Second-level thinking asks "what was already expected, and then what?"',
      ),
      core: b(
        md`## Ba cách tương quan đánh lừa bạn
1. **Biến gây nhiễu (confounder):** $z$ gây ra cả $x$ và $y$.
2. **Nhân quả ngược (reverse causality):** $y$ gây ra $x$.
3. **Thiên lệch chọn mẫu (selection / survivorship bias):** chỉ nhìn thấy những gì sống sót.

## Các công cụ suy luận nhân quả
- **Thí nghiệm ngẫu nhiên:** tiêu chuẩn vàng, hiếm có trong kinh tế vĩ mô.
- **Thí nghiệm tự nhiên:** một cú sốc bên ngoài tác động nhóm này mà không tác động nhóm kia.
- **Khác biệt kép (difference-in-differences):** so sánh thay đổi của nhóm chịu tác động với thay đổi của nhóm đối chứng.
$$\hat\delta_{DiD} = (\bar y_{T,sau} - \bar y_{T,trước}) - (\bar y_{C,sau} - \bar y_{C,trước})$$
- **Biến công cụ (instrumental variable):** dùng một biến chỉ tác động $y$ thông qua $x$.

## Tư duy bậc 2
Howard Marks: tư duy bậc 1 nói "công ty tốt, mua đi". Tư duy bậc 2 nói "công ty tốt, nhưng ai cũng nghĩ vậy nên giá đã quá cao, bán đi".

**Giá phản ánh kỳ vọng.** Thứ làm giá thay đổi là **sai lệch so với kỳ vọng**:
$$\text{Phản ứng giá} \approx f(\text{Thực tế} - \text{Kỳ vọng})$$

## Danh sách kiểm tra bậc 2
1. Đồng thuận hiện nay là gì, và đã được phản ánh vào giá chưa?
2. Ai sẽ phản ứng với sự kiện này (ngân hàng trung ương, đối thủ, chính phủ), và phản ứng đó thay đổi kết cục thế nào?
3. Hệ quả bậc 2 và bậc 3 trong 6–24 tháng là gì?
4. Điều gì sẽ chứng minh tôi sai, và tôi sẽ thấy nó ở đâu?
5. Phân phối kết quả ra sao? Có rủi ro đuôi bất đối xứng không?

> Phương pháp Bayes: bắt đầu với một xác suất ban đầu, cập nhật theo bằng chứng mới, và **không bao giờ** đặt 0% hay 100%.`,
        md`## Three ways correlation fools you
1. **Confounders:** $z$ causes both $x$ and $y$.
2. **Reverse causality:** $y$ causes $x$.
3. **Selection / survivorship bias:** you only see what survived.

## Causal-inference tools
- **Randomised experiments:** the gold standard, rare in macroeconomics.
- **Natural experiments:** an outside shock hits one group and not another.
- **Difference-in-differences:** compare the change in the treated group with the change in a control group.
$$\hat\delta_{DiD} = (\bar y_{T,post} - \bar y_{T,pre}) - (\bar y_{C,post} - \bar y_{C,pre})$$
- **Instrumental variables:** use a variable that affects $y$ only through $x$.

## Second-level thinking
Howard Marks: first-level thinking says "good company, buy". Second-level thinking says "good company, but everyone thinks so, so the price is too high — sell".

**Prices reflect expectations.** What moves prices is the **surprise relative to expectations**:
$$\text{Price reaction} \approx f(\text{Outcome} - \text{Expectation})$$

## A second-level checklist
1. What is the consensus, and is it already in the price?
2. Who will react (central banks, rivals, government), and how does that change the outcome?
3. What are the second- and third-order effects over 6–24 months?
4. What would prove me wrong, and where would I see it?
5. What does the distribution of outcomes look like? Are tail risks asymmetric?

> Bayesian method: start with a prior probability, update with new evidence, and **never** assign 0% or 100%.`,
      ),
      examples: b(
        md`## Thiên lệch kẻ sống sót
"Các quỹ đầu tư trong 10 năm qua có lợi suất bình quân vượt chỉ số." Nhưng bình quân chỉ tính các quỹ **còn tồn tại**. Quỹ hoạt động kém đã đóng cửa hoặc sáp nhập và biến mất khỏi dữ liệu. Các nghiên cứu như SPIVA cho thấy trong 15 năm, **khoảng 90%** quỹ cổ phiếu chủ động tại Mỹ thua chỉ số S&P 500.

## Ví dụ số: khác biệt kép
Một tỉnh giảm thủ tục cấp phép đầu tư năm 2020. Vốn FDI trước và sau:
| | Trước | Sau | Thay đổi |
|---|---|---|---|
| Tỉnh cải cách | 400 | 700 | +300 |
| Tỉnh đối chứng tương tự | 380 | 560 | +180 |
$$\hat\delta = 300 - 180 = +120$$
Không phải toàn bộ 300 là nhờ cải cách. 180 là xu hướng chung (dòng FDI dịch chuyển khỏi Trung Quốc). Tác động ước tính của cải cách là khoảng 120.

## Tư duy bậc 2: "tin tốt là tin xấu"
Năm 2023 nhiều lần số liệu việc làm Mỹ mạnh hơn dự báo khiến cổ phiếu **giảm**. Bậc 1: kinh tế tốt, cổ phiếu phải tăng. Bậc 2: việc làm mạnh nên Fed giữ lãi suất cao lâu hơn, lợi suất trái phiếu tăng và định giá cổ phiếu chịu áp lực. Phản ứng thị trường phụ thuộc vào **ai đang là người định giá biên** và họ lo điều gì.

## Tư duy bậc 3: hệ quả của hệ quả
Fed tăng lãi suất (bậc 1: lãi vay tăng) → trái phiếu dài hạn trong bảng cân đối ngân hàng mất giá (bậc 2) → người gửi tiền không bảo hiểm rút tiền khỏi SVB qua ứng dụng điện thoại, ngân hàng sụp trong 36 giờ (bậc 3) → Fed phải mở chương trình cho vay khẩn cấp, tức nới lỏng thanh khoản ngay giữa chu kỳ thắt chặt (bậc 4).`,
        md`## Survivorship bias
"Funds over the last ten years beat the index on average." But the average includes only funds **still alive**. Poor performers closed or merged and vanished from the data. Studies such as SPIVA show that over 15 years **about 90%** of active US equity funds trail the S&P 500.

## Worked numbers: difference-in-differences
A province cut investment-licensing red tape in 2020. FDI before and after:
| | Before | After | Change |
|---|---|---|---|
| Reforming province | 400 | 700 | +300 |
| Similar control province | 380 | 560 | +180 |
$$\hat\delta = 300 - 180 = +120$$
Not all 300 is due to the reform. 180 is the common trend (FDI relocating from China). The estimated reform effect is about 120.

## Second-level: "good news is bad news"
Several times in 2023 stronger-than-expected US jobs data sent stocks **down**. First level: a strong economy should lift stocks. Second level: strong jobs mean the Fed holds rates higher for longer, bond yields rise and equity valuations suffer. The reaction depends on **who sets the marginal price** and what they fear.

## Third-level: consequences of consequences
The Fed hikes (first order: borrowing costs rise) → long bonds on bank balance sheets lose value (second) → uninsured depositors pull money from SVB through phone apps and the bank fails in 36 hours (third) → the Fed opens an emergency lending facility, easing liquidity in the middle of a tightening cycle (fourth).`,
      ),
      lab: {
        kind: 'python',
        mission: b(
          'Chạy mô phỏng thiên lệch kẻ sống sót: 1.000 quỹ không có kỹ năng gì. Sau 10 năm, các quỹ còn sống trông giỏi đến mức nào? Sau đó sửa tham số "kỹ năng" để thấy cần lợi thế bao nhiêu mới vượt được phí 1,5%/năm.',
          'Run the survivorship-bias simulation: 1,000 funds with zero skill. After ten years, how good do the survivors look? Then change the "skill" parameter to see how much edge is needed to beat a 1.5% annual fee.',
        ),
        code: py`# Survivorship bias: 1,000 funds with ZERO skill
import numpy as np
rng = np.random.default_rng(7)

n_funds, years = 1000, 10
skill = 0.0           # annual alpha before fees, %; try 1.0 or 2.0
fee = 1.5             # annual fee, %
market = 7.0          # market return, %
vol = 6.0             # tracking error vs market, %

excess = rng.normal(skill - fee, vol, size=(n_funds, years))
wealth = np.cumprod(1 + (market + excess) / 100, axis=1)
index_wealth = (1 + market / 100) ** np.arange(1, years + 1)

# a fund closes if it trails the index by more than 15% at any year-end
alive = np.ones(n_funds, dtype=bool)
for t in range(years):
    alive &= wealth[:, t] / index_wealth[t] > 0.85

final_excess = (wealth[:, -1] ** (1 / years) - 1) * 100 - market
print(f"Funds still alive after {years} years: {alive.sum()} of {n_funds}")
print(f"Average annual excess return, ALL funds:       {final_excess.mean():+.2f}%")
print(f"Average annual excess return, SURVIVORS only:  {final_excess[alive].mean():+.2f}%  <- what the brochures show")
print(f"Share of all funds beating the index: {(final_excess > 0).mean():.0%}")

chart(['All funds', 'Survivors'], [final_excess.mean(), final_excess[alive].mean()], kind='bar',
      title='Average annual excess return (%)')

# Difference-in-differences from the lesson
treated_pre, treated_post, control_pre, control_post = 400, 700, 380, 560
did = (treated_post - treated_pre) - (control_post - control_pre)
print(f"\nDiD estimate of the licensing reform: {did:+d}  (naive before/after: {treated_post - treated_pre:+d})")
`,
      },
      quiz: [
        {
          id: 'm6-l4-q1',
          scenario: b(
            'Ngân hàng trung ương công bố giảm lãi suất 0,25%. Thị trường đã kỳ vọng giảm 0,5%. Phản ứng hợp lý nhất của đồng nội tệ và thị trường cổ phiếu là gì?',
            'The central bank announces a 0.25% rate cut. The market expected 0.5%. What is the most likely reaction of the currency and equities?',
          ),
          options: [
            {
              text: b('Cổ phiếu tăng vì lãi suất giảm', 'Stocks rise because rates fell'),
              why: b('Đây là tư duy bậc 1. So với kỳ vọng, chính sách thực tế là "chặt" hơn.', 'That is first-level thinking. Relative to expectations, policy is actually tighter.'),
            },
            {
              text: b('Đồng nội tệ mạnh lên và cổ phiếu có thể giảm, vì mức giảm thấp hơn kỳ vọng tức là chặt hơn dự kiến', 'The currency strengthens and stocks may fall, because a smaller-than-expected cut is tighter than priced'),
              correct: true,
              why: b('Giá phản ứng với phần bất ngờ: thực tế − kỳ vọng = +0,25% theo hướng thắt chặt.', 'Prices react to the surprise: outcome − expectation = +0.25% in the tightening direction.'),
            },
            {
              text: b('Không có phản ứng vì đã giảm lãi suất như dự báo', 'No reaction; rates were cut as forecast'),
              why: b('Quy mô cắt giảm khác với kỳ vọng, và quy mô là điều quan trọng.', 'The size differed from expectations, and size is what matters.'),
            },
          ],
        },
        {
          id: 'm6-l4-q2',
          scenario: b(
            'Số liệu cho thấy các tỉnh có nhiều sân golf có GDP bình quân đầu người cao hơn. Một đề xuất kêu gọi xây sân golf để tăng trưởng. Phản biện mạnh nhất là gì?',
            'Data show provinces with more golf courses have higher GDP per head. A proposal says build golf courses to grow. What is the strongest rebuttal?',
          ),
          options: [
            {
              text: b('Nhân quả ngược và biến gây nhiễu: thu nhập cao và FDI tạo ra cầu sân golf, không phải ngược lại', 'Reverse causality and confounding: high incomes and FDI create demand for golf, not the other way round'),
              correct: true,
              why: b('Muốn biết tác động nhân quả cần một thiết kế như khác biệt kép hoặc thí nghiệm tự nhiên, không chỉ tương quan.', 'Estimating a causal effect needs a design such as difference-in-differences or a natural experiment, not just correlation.'),
            },
            {
              text: b('Tương quan không đủ mạnh', 'The correlation is not strong enough'),
              why: b('Tương quan mạnh đến đâu cũng không giải quyết vấn đề chiều nhân quả.', 'No strength of correlation settles the direction of causality.'),
            },
            {
              text: b('Sân golf không tạo việc làm', 'Golf courses create no jobs'),
              why: b('Có tạo một ít, nhưng đây không phải lỗi logic trung tâm của đề xuất.', 'They create a few; that is not the central logical flaw.'),
            },
          ],
        },
      ],
    },
  ],
};

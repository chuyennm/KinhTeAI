import { Markdown } from '../components/Markdown';
import { PageHeader } from '../components/ui';
import { useI18n } from '../i18n';

const md = String.raw;

const GUIDE = {
  vi: md`## Vì sao học kinh tế qua sách vở thường thất bại
| Khó khăn khi học truyền thống | KinhTeAI xử lý thế nào |
|---|---|
| **Đọc thụ động:** đọc xong thấy hiểu, một tuần sau quên gần hết | Mỗi bài buộc bạn **dự đoán trước**, làm nhiệm vụ trong phòng thí nghiệm và trả lời tình huống. Câu sai tự vào hàng đợi **ôn tập ngắt quãng** |
| **Công thức tách rời thực tế:** thuộc $MV = PY$ nhưng không biết dùng khi đọc tin | Mỗi công thức có ví dụ số từ Việt Nam và thế giới, và một **mô phỏng** để bạn tự kéo thử |
| **Không có phản hồi:** tự học không ai chỉ ra mình sai ở đâu | **AI Tutor** phản biện luận điểm, chấm phần giải thích của bạn (Feynman) và giả lập khủng hoảng |
| **Thiên lệch hồi tưởng:** đọc lại khủng hoảng 2008 thấy "hiển nhiên" | **Case study** bắt bạn ra quyết định với dữ liệu *tại thời điểm đó* trước khi biết kết quả |
| **Không biết mình biết đến đâu** | Mỗi câu trả lời kèm **mức tự tin**; trang chủ đo xem bạn có tự tin quá mức không |
| **Học xong không làm được gì với dữ liệu thật** | **Python Lab** chạy numpy, pandas, scipy ngay trong trình duyệt với dữ liệu vĩ mô thật |
| **Không bao giờ phải chịu trách nhiệm cho dự báo** | **Sổ tay luận điểm** ghi dự báo kèm xác suất, điều kiện sai và ngày hậu kiểm |

## Vòng học 5 bước cho mỗi bài (khoảng 30 phút)
1. **Dự đoán** (2′): đọc tình huống đầu tiên của phần Kiểm tra tư duy, ghi câu trả lời bạn đoán.
2. **Hiểu bản chất** (8′): đọc phần cốt lõi, chép tay công thức một lần. Viết tay giúp nhớ hơn gõ phím.
3. **Làm** (10′): tự tính lại ví dụ trước khi đọc lời giải, rồi làm nhiệm vụ trong phòng thí nghiệm. Luôn **dự đoán trước khi kéo thanh trượt hoặc chạy code**.
4. **Kiểm tra** (5′): trả lời tình huống kèm mức tự tin. Đọc giải thích của **cả đáp án sai**.
5. **Giải thích lại** (5′): mở Tutor ở chế độ Feynman và giải thích bài học như đang dạy học sinh lớp 9. Phần bạn lúng túng chính là phần chưa hiểu.

## Nhịp học hằng tuần
| Ngày | Việc |
|---|---|
| Thứ 2 – Thứ 5 | 1 bài mỗi ngày + 10 phút ôn tập ngắt quãng |
| Thứ 6 | 1 case study: ra quyết định, rồi nhờ Tutor phản biện |
| Thứ 7 | Python Lab: kiểm định một giả thuyết bằng dữ liệu |
| Chủ nhật | Đọc tin vĩ mô tuần qua (lãi suất, CPI, tỷ giá) và viết hoặc cập nhật 1 luận điểm |

Theo nhịp này, bạn hoàn thành 25 bài trong khoảng **7–8 tuần**. Sau đó hãy học lại từ đầu với một chế độ khác: lần thứ hai, làm phần ví dụ mà không nhìn lời giải.

## Dùng AI đúng cách
- **Đừng hỏi AI đáp án trước khi tự nghĩ.** Hãy nói lập luận của bạn và yêu cầu phản biện.
- Dùng **Phản biện** cho mọi luận điểm trước khi lưu vào Sổ tay.
- Dùng **Giả lập** mỗi tuần một lần: vào vai Thống đốc NHNN hay CFO và chịu hệ quả quyết định của mình.
- **Kiểm chứng số liệu AI đưa ra.** Mô hình ngôn ngữ có thể nhầm số; đối chiếu với nguồn chính thức (GSO, NHNN, FRED, báo cáo tài chính).
- Dùng **Sinh case** để tạo thêm case về những sự kiện bạn quan tâm, rồi giải chúng như các case gốc.

## Dùng lập trình để hiểu sâu
Viết code bắt bạn phải định nghĩa chính xác từng khái niệm. Bạn không thể "đại khái" về lãi suất thực khi phải viết <code>real = fed_funds - cpi</code>. Mỗi khi gặp một nhận định trên báo (ví dụ "vàng luôn tăng khi lãi suất giảm"), hãy mở Python Lab và kiểm tra nó trên dữ liệu.

## Lộ trình sau khi học xong KinhTeAI
1. **Đọc báo cáo thật:** báo cáo tài chính quý của 3 doanh nghiệp niêm yết, báo cáo chính sách tiền tệ của NHNN, biên bản họp FOMC.
2. **Theo dõi bảng dữ liệu cá nhân:** lãi suất liên ngân hàng, USD/VND, DXY, lợi suất Mỹ 10 năm, CPI, tín dụng, mỗi tuần một lần.
3. **Duy trì Sổ tay luận điểm:** 2 luận điểm mỗi tháng, hậu kiểm nghiêm túc. Sau 12 tháng bạn có hồ sơ dự báo của chính mình.
4. **Học tiếp theo chuẩn quốc tế:** chương trình CFA Level I (Economics, FSA, Corporate Issuers, Equity) có cấu trúc gần với 6 module này.

> Không có ứng dụng nào biến bạn thành chuyên gia. Điều làm được việc đó là **thực hành có chủ đích, nhận phản hồi, và chịu trách nhiệm cho dự báo của mình** trong thời gian dài. KinhTeAI được thiết kế để cả ba việc đó trở thành thói quen hằng ngày.

*Lưu ý: nội dung trong ứng dụng phục vụ giáo dục, không phải lời khuyên đầu tư cá nhân.*`,
  en: md`## Why learning economics from books usually fails
| Problem with traditional study | How KinhTeAI handles it |
|---|---|
| **Passive reading:** it feels clear, a week later most is gone | Every lesson makes you **predict first**, do a lab mission and answer scenarios. Wrong answers flow into **spaced repetition** |
| **Formulas cut off from reality:** you know $MV = PY$ but cannot use it on the news | Every formula has worked numbers from Vietnam and the world, and a **simulator** to play with |
| **No feedback:** self-study has nobody to say where you went wrong | The **AI Tutor** challenges your theses, grades your explanations (Feynman) and runs crisis roleplays |
| **Hindsight bias:** rereading 2008 makes it look "obvious" | **Case studies** make you decide with the data *as it stood* before you see the outcome |
| **Not knowing what you know** | Every answer carries a **confidence rating**; the dashboard measures overconfidence |
| **Finishing a course unable to touch real data** | The **Python Lab** runs numpy, pandas and scipy in your browser on real macro data |
| **Never being accountable for a forecast** | The **Thesis Journal** records forecasts with probabilities, failure conditions and a review date |

## A five-step loop for every lesson (about 30 minutes)
1. **Predict** (2′): read the first Concept-check scenario and write down your guess.
2. **Understand** (8′): read the core, copy the formulas by hand once. Handwriting beats typing for memory.
3. **Do** (10′): rework the examples before reading the solution, then do the lab mission. Always **predict before moving a slider or running code**.
4. **Check** (5′): answer the scenarios with a confidence rating. Read the explanation for **the wrong options too**.
5. **Explain back** (5′): open the tutor in Feynman mode and explain the lesson as if teaching a 15-year-old. Where you stumble is what you have not understood.

## A weekly rhythm
| Day | Task |
|---|---|
| Mon – Thu | One lesson a day + 10 minutes of spaced review |
| Fri | One case study: decide, then have the tutor challenge you |
| Sat | Python Lab: test one hypothesis with data |
| Sun | Read the week's macro news (rates, CPI, FX) and write or update one thesis |

At this pace you finish the 25 lessons in about **7–8 weeks**. Then go through again in a different mode: the second time, do the examples without looking at the solutions.

## Using AI the right way
- **Do not ask the AI for the answer before thinking.** State your reasoning and ask to be challenged.
- Run **Socratic** critique on every thesis before you save it.
- Do one **Roleplay** a week: play SBV governor or CFO and live with the consequences of your decisions.
- **Verify any figure the AI gives.** Language models can get numbers wrong; check official sources (GSO, SBV, FRED, company filings).
- Use **New case** to create cases on events you care about, then solve them like the built-in ones.

## Using code to understand deeply
Writing code forces precise definitions. You cannot be vague about the real rate when you must write <code>real = fed_funds - cpi</code>. Whenever you meet a claim in the press (say, "gold always rises when rates fall"), open the Python Lab and test it on data.

## After KinhTeAI
1. **Read real documents:** quarterly accounts of three listed companies, the SBV's monetary-policy reports, FOMC minutes.
2. **Keep a personal dashboard:** interbank rates, USD/VND, the DXY, the US 10-year yield, CPI and credit, once a week.
3. **Keep the Thesis Journal going:** two theses a month, reviewed honestly. After 12 months you have your own forecasting record.
4. **Continue to an international standard:** CFA Level I (Economics, FSA, Corporate Issuers, Equity) is structured much like these six modules.

> No app turns you into an expert. What does is **deliberate practice, feedback, and accountability for your forecasts** over a long time. KinhTeAI is designed to make all three a daily habit.

*Note: content in this app is for education, not personal investment advice.*`,
};

export function GuidePage() {
  const { tx, lang } = useI18n();
  return (
    <div className="max-w-4xl">
      <PageHeader kicker={tx('Phương pháp', 'Method')} title={tx('Cách học để trở thành chuyên gia', 'How to learn to expert level')} />
      <Markdown>{GUIDE[lang]}</Markdown>
    </div>
  );
}

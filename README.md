# KinhTeAI — Học Kinh tế & Tài chính cùng AI

**Tiếng Việt** · [English below](#english)

KinhTeAI là một ứng dụng web tiến bộ (PWA) chạy offline, đưa người học từ kinh tế học nền tảng đến mức chuyên viên phân tích: vĩ mô, thị trường, báo cáo tài chính, định giá và kinh tế lượng. Ứng dụng là trang tĩnh 100%, triển khai trên GitHub Pages, không cần máy chủ.

**Bản chạy thử:** https://chuyennm.github.io/KinhTeAI/

## Có gì bên trong

| Thành phần | Mô tả |
|---|---|
| **6 module, 25 bài học** | Vi mô → Vĩ mô & tiền tệ → Quốc tế & liên thị trường → Báo cáo tài chính → Định giá → Kinh tế lượng. Mỗi bài có 4 phần: Bản chất cốt lõi (KaTeX), Ví dụ thực tế (Việt Nam & thế giới), Phòng thí nghiệm, Kiểm tra tư duy |
| **5 bộ mô phỏng** | Cung–cầu & thuế/giá trần · Điều hành NHTW (độ trễ, cú sốc, tỷ giá) · Đường cong lợi suất & ma trận tương quan · Phân tích tỷ số & sức khỏe dòng tiền · DCF/WACC với ma trận độ nhạy và DCF ngược |
| **Python Lab** | Pyodide (CPython trên WebAssembly) chạy numpy, pandas, scipy ngay trong trình duyệt, nạp sẵn dữ liệu vĩ mô Mỹ & Việt Nam, có hàm `ols()`, `chart()`, `load()` |
| **4 case study 3 giai đoạn** | Fed 2021–2023 · Bộ ba bất khả thi Việt Nam & vàng SJC · Evergrande · Đường cong đảo ngược & vàng/cổ phiếu. Ra quyết định trước khi xem hệ quả bậc 1–2–3 |
| **AI Tutor (BYOK / Ollama)** | Hỏi đáp, Phản biện Socratic, kiểm tra Feynman, Giả lập điều hành, Sinh case study mới (lưu offline). Hỗ trợ Gemini, OpenAI, DeepSeek, Claude, Ollama và mọi endpoint tương thích OpenAI |
| **Sổ tay luận điểm** | Giả thuyết, dữ liệu, kỳ hạn, điều kiện vô hiệu, độ tự tin, hậu kiểm; Markdown; xuất/nhập JSON; đo tỷ lệ đúng và mức tự tin quá mức |
| **Ôn tập ngắt quãng** | Thẻ thuật ngữ và câu trả lời sai tự quay lại theo thuật toán SM-2 |
| **Song ngữ Việt / Anh** | Toàn bộ giao diện và nội dung; thuật ngữ chuẩn tiếng Anh giữ trong ngoặc |

## Phương pháp học

Ứng dụng được thiết kế để khắc phục các điểm yếu của việc học qua sách: đọc thụ động, không có phản hồi, thiên lệch hồi tưởng, không làm việc với dữ liệu thật và không bao giờ phải chịu trách nhiệm cho dự báo. Chi tiết ở trang **Phương pháp học** trong ứng dụng.

## Chạy trên máy

```bash
npm install
npm run dev        # http://localhost:5173/KinhTeAI/
npm run build      # xuất trang tĩnh vào dist/
npm run preview    # xem bản build
```

## Triển khai lên GitHub Pages

Workflow `.github/workflows/deploy.yml` tự build và deploy mỗi khi push lên nhánh `main`. Lần đầu, vào **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Cấu trúc dự án

```
src/
  data/
    curriculum.ts          # gom 6 module, tiện ích tra cứu
    modules/m1..m6.ts      # nội dung bài học song ngữ
    caseStudies.ts         # 4 case study 3 giai đoạn
    glossary.ts            # thuật ngữ song ngữ (thẻ ôn tập)
    macroDatasets.json     # dữ liệu vĩ mô Mỹ, Việt Nam, đường cong lợi suất
  services/
    aiService.ts           # BYOK / Ollama, streaming, prompt theo chế độ, sinh case
    pyodideService.ts      # tải Pyodide lười trong Web Worker
    srs.ts                 # lặp lại ngắt quãng SM-2
  db/indexedDb.ts          # IndexedDB (idb): tiến độ, câu trả lời, case, snippet, sổ tay; sao lưu JSON
  simulators/              # 5 bộ mô phỏng tương tác
  components/              # Layout, AI Tutor, Quiz, Markdown+KaTeX, Python runner
  pages/                   # các trang
public/pyodide-worker.js   # worker chạy Python
```

## Quyền riêng tư

Không có máy chủ KinhTeAI. Tiến độ học lưu trong IndexedDB của trình duyệt. API key lưu trong `localStorage` và chỉ được gửi thẳng tới nhà cung cấp bạn chọn.

## Lưu ý

Số liệu được tổng hợp, làm tròn từ nguồn công khai (GSO, NHNN, World Bank, IMF, FRED, US Treasury) cho mục đích giáo dục. Nội dung không phải lời khuyên đầu tư.

---

<a id="english"></a>

## English

KinhTeAI is an offline-first Progressive Web App that takes learners from foundational economics to junior-analyst level: macro, markets, financial statements, valuation and econometrics. It is a 100% static site deployed on GitHub Pages with no backend.

- **6 modules, 25 lessons**, each with Core intuition (KaTeX), Real-world examples (Vietnam and global), a Lab, and a scenario-based Concept check with confidence calibration.
- **5 simulators**: supply–demand with taxes and ceilings; a central-bank policy model with lags, shocks and FX; a yield-curve and cross-asset correlation explorer; a ratio and cash-flow health analyzer; a DCF/WACC calculator with sensitivity matrix and reverse DCF.
- **Python Lab**: Pyodide runs numpy, pandas and scipy in the browser with bundled US and Vietnam macro data and `ols()`, `chart()`, `load()` helpers.
- **Four three-stage case studies**: decide with the data as it stood, then see first-, second- and third-order consequences.
- **AI Tutor (bring your own key or Ollama)**: Explain, Socratic critique, Feynman check, Macro roleplay, and case-study generation saved to IndexedDB.
- **Thesis Journal** with invalidation criteria, confidence, post-mortems, Markdown and JSON export/import; **spaced repetition** for terms and missed questions.
- Full **Vietnamese / English** interface and content.

```bash
npm install && npm run dev
```

Content is for education only and is not investment advice.

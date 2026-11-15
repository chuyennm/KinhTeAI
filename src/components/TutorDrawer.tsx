import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db, logActivity } from '../db/indexedDb';
import { useI18n } from '../i18n';
import {
  buildSystemPrompt,
  chatStream,
  generateCaseStudy,
  isAiConfigured,
  loadAiConfig,
  PROVIDERS,
  type ChatMessage,
  type TutorMode,
} from '../services/aiService';
import { Markdown } from './Markdown';
import { useTutor } from './TutorContext';
import { Btn, inputCls } from './ui';

type Msg = { role: 'user' | 'assistant'; content: string; error?: boolean };
type History = Record<TutorMode, Msg[]>;
const EMPTY: History = { ask: [], socratic: [], feynman: [], roleplay: [], casegen: [] };

export function TutorDrawer() {
  const { tx, lang } = useI18n();
  const tutor = useTutor();
  const navigate = useNavigate();
  const [history, setHistory] = useState<History>(EMPTY);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [genChars, setGenChars] = useState(0);
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  const mode = tutor.mode;
  const messages = history[mode];
  const configured = isAiConfigured();
  const cfg = loadAiConfig();

  // Conversations survive reloads.
  useEffect(() => {
    db.kvGet<History>('tutorHistory', EMPTY).then((h) => {
      setHistory({ ...EMPTY, ...h });
      loaded.current = true;
    });
  }, []);
  useEffect(() => {
    if (loaded.current && !busy) db.kvSet('tutorHistory', history);
  }, [history, busy]);

  useEffect(() => {
    if (tutor.draftVersion > 0) setInput(tutor.draft);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tutor.draftVersion]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, tutor.isOpen, genChars]);

  const MODES: { id: TutorMode; label: string; hint: string; placeholder: string }[] = [
    {
      id: 'ask',
      label: tx('Hỏi đáp', 'Explain'),
      hint: tx('Hỏi bất cứ điều gì về bài đang học. Tutor thấy nội dung trên màn hình của bạn.', 'Ask anything about what you are studying. The tutor sees what is on your screen.'),
      placeholder: tx('Ví dụ: Vì sao lãi suất tăng thì giá trái phiếu giảm?', 'e.g. Why do bond prices fall when rates rise?'),
    },
    {
      id: 'socratic',
      label: tx('Phản biện', 'Socratic'),
      hint: tx('Nêu một luận điểm kinh tế/thị trường. Tutor sẽ KHÔNG đồng ý dễ dàng mà chỉ ra rủi ro bậc 2.', 'State an economic or market thesis. The tutor will NOT agree easily; it hunts for second-order risks.'),
      placeholder: tx('Ví dụ: NHNN giảm lãi suất 1% thì chứng khoán chắc chắn tăng vì…', 'e.g. If the SBV cuts rates by 1%, equities must rally because…'),
    },
    {
      id: 'feynman',
      label: 'Feynman',
      hint: tx('Giải thích một khái niệm bằng lời của bạn như dạy học sinh lớp 9. Tutor chấm và chỉ ra lỗ hổng.', 'Explain a concept in your own words as if teaching a 15-year-old. The tutor grades it and finds the gaps.'),
      placeholder: tx('Ví dụ: WACC là… vì…', 'e.g. WACC is… because…'),
    },
    {
      id: 'roleplay',
      label: tx('Giả lập', 'Roleplay'),
      hint: tx('Bạn vào vai Thống đốc NHNN, Chủ tịch Fed, CIO hay CFO trong một khủng hoảng 3 vòng và được chấm điểm.', 'Play SBV governor, Fed chair, CIO or CFO through a three-round crisis and get graded.'),
      placeholder: tx('Gõ "bắt đầu" hoặc mô tả kịch bản bạn muốn (ví dụ: cú sốc tỷ giá 2025)', 'Type "start" or describe the scenario you want (e.g. an FX shock)'),
    },
    {
      id: 'casegen',
      label: tx('Sinh Case', 'New case'),
      hint: tx('Nhập một chủ đề. Tutor viết case study 3 giai đoạn và lưu vào thư viện để học offline.', 'Enter a topic. The tutor writes a three-stage case study and saves it to your library for offline study.'),
      placeholder: tx('Ví dụ: Khủng hoảng tài chính châu Á 1997; Vỡ bong bóng dot-com; SVB 2023', 'e.g. 1997 Asian financial crisis; dot-com bust; SVB 2023'),
    },
  ];
  const current = MODES.find((m) => m.id === mode)!;

  const patch = (m: TutorMode, fn: (msgs: Msg[]) => Msg[]) => setHistory((h) => ({ ...h, [m]: fn(h[m]) }));

  function explainError(e: unknown): string {
    const msg = (e as Error)?.message ?? String(e);
    if (msg === 'AI_NOT_CONFIGURED') return tx('Chưa cấu hình AI. Mở Cài đặt để nhập API key hoặc kết nối Ollama.', 'AI is not configured. Open Settings to add an API key or connect Ollama.');
    if (/Failed to fetch|NetworkError|Load failed/i.test(msg)) {
      return tx(
        `Không kết nối được tới ${cfg.baseUrl}. Kiểm tra mạng; với Ollama hãy chạy "ollama serve" và đặt OLLAMA_ORIGINS cho phép trang này.`,
        `Could not reach ${cfg.baseUrl}. Check your connection; for Ollama run "ollama serve" and set OLLAMA_ORIGINS to allow this site.`,
      );
    }
    return msg;
  }

  async function send() {
    const text = input.trim();
    if (!text || busy) return;
    setInput('');
    setBusy(true);
    const ac = new AbortController();
    abortRef.current = ac;
    const m = mode;

    if (m === 'casegen') {
      patch(m, (msgs) => [...msgs, { role: 'user', content: text }]);
      setGenChars(1);
      try {
        const cs = await generateCaseStudy(text, lang, setGenChars, ac.signal);
        await db.put('cases', cs);
        logActivity();
        patch(m, (msgs) => [
          ...msgs,
          {
            role: 'assistant',
            content: tx(
              `Đã lưu case study **${cs.title.vi}** vào thư viện (dùng được offline).\n\n[Mở case study →](#/cases/${cs.id})`,
              `Saved the case study **${cs.title.en}** to your library (available offline).\n\n[Open the case study →](#/cases/${cs.id})`,
            ),
          },
        ]);
      } catch (e) {
        if ((e as Error).name !== 'AbortError') {
          patch(m, (msgs) => [...msgs, { role: 'assistant', content: explainError(e), error: true }]);
        }
      }
      setGenChars(0);
      setBusy(false);
      return;
    }

    const prior = history[m];
    const convo: ChatMessage[] = [
      { role: 'system', content: buildSystemPrompt(m, lang, tutor.getStudyContext()) },
      ...prior.filter((x) => !x.error).slice(-16).map((x) => ({ role: x.role, content: x.content })),
      { role: 'user', content: text },
    ];
    patch(m, (msgs) => [...msgs, { role: 'user', content: text }, { role: 'assistant', content: '' }]);
    try {
      const full = await chatStream(
        convo,
        (partial) => patch(m, (msgs) => [...msgs.slice(0, -1), { role: 'assistant', content: partial }]),
        { signal: ac.signal },
      );
      if (!full) throw new Error(tx('Mô hình trả về rỗng. Kiểm tra tên model trong Cài đặt.', 'The model returned nothing. Check the model name in Settings.'));
      logActivity();
    } catch (e) {
      if ((e as Error).name !== 'AbortError') {
        patch(m, (msgs) => {
          const last = msgs[msgs.length - 1];
          const keep = last?.role === 'assistant' && !last.content ? msgs.slice(0, -1) : msgs;
          return [...keep, { role: 'assistant', content: explainError(e), error: true }];
        });
      }
    }
    setBusy(false);
  }

  if (!tutor.isOpen) return null;

  return (
    <aside
      className="fixed inset-y-0 right-0 z-40 flex w-full max-w-[440px] flex-col border-l border-line bg-panel shadow-2xl"
      aria-label="KinhTeAI Tutor"
    >
      <div className="flex items-center gap-2 border-b border-line bg-navy px-4 py-3 text-offwhite">
        <span className="text-gold text-lg">✦</span>
        <div className="min-w-0 flex-1">
          <div className="font-serif font-semibold leading-tight">KinhTeAI Tutor</div>
          <div className="truncate text-[11px] text-slate-400">
            {configured ? `${PROVIDERS[cfg.provider].label} · ${cfg.model}` : tx('Chưa kết nối AI', 'AI not connected')}
          </div>
        </div>
        <button
          className="rounded px-2 py-1 text-xs text-slate-300 hover:bg-white/10"
          onClick={() => patch(mode, () => [])}
          title={tx('Xóa hội thoại của chế độ này', 'Clear this mode’s conversation')}
        >
          {tx('Xóa', 'Clear')}
        </button>
        <button className="rounded px-2 py-1 text-lg leading-none text-slate-300 hover:bg-white/10" onClick={tutor.close} aria-label="Close">
          ×
        </button>
      </div>

      <div className="flex gap-1 overflow-x-auto border-b border-line px-2 py-2">
        {MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => tutor.setMode(m.id)}
            className={`whitespace-nowrap rounded-full px-3 py-1 text-xs transition ${
              mode === m.id ? 'bg-gold text-navy font-semibold' : 'bg-panel2 text-muted hover:text-ink'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
        <p className="rounded-lg border border-gold/30 bg-gold/10 px-3 py-2 text-xs text-ink">{current.hint}</p>

        {!configured && (
          <div className="rounded-lg border border-line bg-panel2 p-3 text-sm">
            <p className="mb-2">
              {tx(
                'Tutor chạy bằng API key của chính bạn (Gemini, OpenAI, DeepSeek, Claude) hoặc Ollama trên máy bạn. Key chỉ lưu trong trình duyệt này.',
                'The tutor runs on your own API key (Gemini, OpenAI, DeepSeek, Claude) or on Ollama on your machine. The key stays in this browser only.',
              )}
            </p>
            <Btn
              variant="gold"
              onClick={() => {
                tutor.close();
                navigate('/settings');
              }}
            >
              {tx('Mở Cài đặt AI', 'Open AI settings')}
            </Btn>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'flex justify-end' : ''}>
            <div
              className={`max-w-[92%] rounded-xl px-3 py-2 text-sm ${
                m.role === 'user'
                  ? 'bg-up/15 border border-up/30 whitespace-pre-wrap break-words'
                  : m.error
                    ? 'bg-down/10 border border-down/40 text-down'
                    : 'bg-panel2 border border-line'
              }`}
            >
              {m.role === 'user' ? (
                m.content.length > 600 ? m.content.slice(0, 600) + '…' : m.content
              ) : m.content ? (
                <Markdown className="!text-sm !leading-6">{m.content}</Markdown>
              ) : (
                <span className="animate-pulse text-muted">●●●</span>
              )}
            </div>
          </div>
        ))}
        {genChars > 0 && (
          <div className="rounded-xl border border-line bg-panel2 px-3 py-2 text-sm text-muted">
            <span className="animate-pulse text-gold">✦</span> {tx('Đang soạn case study…', 'Writing the case study…')}{' '}
            <span className="num">{genChars}</span>
          </div>
        )}
      </div>

      <div className="border-t border-line p-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          rows={3}
          placeholder={current.placeholder}
          className={`${inputCls} resize-none`}
        />
        <div className="mt-2 flex items-center justify-between gap-2">
          <Link to="/settings" onClick={tutor.close} className="text-[11px] text-muted underline">
            {tx('Cài đặt AI', 'AI settings')}
          </Link>
          {busy ? (
            <Btn variant="danger" onClick={() => abortRef.current?.abort()}>
              ■ {tx('Dừng', 'Stop')}
            </Btn>
          ) : (
            <Btn variant="gold" onClick={send} disabled={!input.trim() || !configured}>
              {mode === 'casegen' ? tx('Sinh & lưu', 'Generate & save') : tx('Gửi', 'Send')} ↵
            </Btn>
          )}
        </div>
      </div>
    </aside>
  );
}

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { db, logActivity, uid } from '../db/indexedDb';
import { useI18n } from '../i18n';
import { pyodideService, type PyStatus } from '../services/pyodideService';
import { PyChart, type ChartSpec } from './PyChart';
import { useTutor } from './TutorContext';
import { Btn } from './ui';

type OutItem = { kind: 'text' | 'err' | 'result'; text: string } | { kind: 'chart'; spec: ChartSpec };

/** Split-screen Python editor + output. Code runs locally in Pyodide (WebAssembly). */
export function PythonRunner({
  initialCode,
  title,
  onRun,
  resetKey,
}: {
  initialCode: string;
  title?: string;
  onRun?: () => void;
  /** Changing this replaces the editor content with initialCode. */
  resetKey?: string;
}) {
  const { tx } = useI18n();
  const tutor = useTutor();
  const [code, setCode] = useState(initialCode);
  const [out, setOut] = useState<OutItem[]>([]);
  const [st, setSt] = useState<{ status: PyStatus; detail?: string }>(pyodideService.getStatus());
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const outRef = useRef<HTMLDivElement>(null);

  useEffect(() => pyodideService.onStatus((status, detail) => setSt({ status, detail })), []);
  useEffect(() => {
    setCode(initialCode);
    setOut([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);
  useEffect(() => {
    outRef.current?.scrollTo({ top: outRef.current.scrollHeight });
  }, [out]);

  const push = (item: OutItem) => setOut((o) => [...o, item]);

  async function run() {
    if (busy) return;
    setBusy(true);
    setOut([]);
    const res = await pyodideService.run(code, (e) => {
      for (const line of e.text.split('\n')) {
        if (line.startsWith('__CHART__')) {
          try {
            push({ kind: 'chart', spec: JSON.parse(line.slice(9)) });
          } catch {
            push({ kind: 'err', text: 'chart(): invalid data' });
          }
        } else {
          push({ kind: e.type === 'stderr' ? 'err' : 'text', text: line });
        }
      }
    });
    if (!res.ok) push({ kind: 'err', text: res.error ?? 'Error' });
    else if (res.result && res.result !== 'None') push({ kind: 'result', text: res.result });
    setBusy(false);
    if (res.ok) {
      onRun?.();
      logActivity();
    }
  }

  function onKey(e: KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      run();
      return;
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      const el = e.currentTarget;
      const { selectionStart: s, selectionEnd: en } = el;
      const next = code.slice(0, s) + '    ' + code.slice(en);
      setCode(next);
      requestAnimationFrame(() => el.setSelectionRange(s + 4, s + 4));
    }
  }

  async function save() {
    const firstLine = code.split('\n').find((l) => l.trim().startsWith('#'))?.replace(/^#\s*/, '');
    await db.put('snippets', {
      id: uid(),
      title: (title || firstLine || 'Snippet').slice(0, 80),
      code,
      updatedAt: Date.now(),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }

  function explain() {
    const text = out
      .filter((o): o is Extract<OutItem, { text: string }> => o.kind !== 'chart')
      .map((o) => o.text)
      .join('\n')
      .slice(0, 2500);
    tutor.open({
      mode: 'ask',
      draft: tx(
        `Giải thích kết quả Python này và ý nghĩa kinh tế của nó. Kết luận nào được phép rút ra, kết luận nào KHÔNG?\n\nCode:\n\`\`\`python\n${code.slice(0, 2500)}\n\`\`\`\n\nOutput:\n\`\`\`\n${text}\n\`\`\``,
        `Explain this Python output and its economic meaning. Which conclusions are justified and which are NOT?\n\nCode:\n\`\`\`python\n${code.slice(0, 2500)}\n\`\`\`\n\nOutput:\n\`\`\`\n${text}\n\`\`\``,
      ),
    });
  }

  const statusText: Record<PyStatus, string> = {
    idle: tx('Python chưa tải — bấm Chạy để tải (~15 MB lần đầu, sau đó dùng offline)', 'Python not loaded — press Run to fetch it (~15 MB once, then offline)'),
    loading: tx(`Đang tải ${st.detail ?? ''}…`, `Loading ${st.detail ?? ''}…`),
    ready: tx('Python sẵn sàng', 'Python ready'),
    running: tx('Đang chạy…', 'Running…'),
    error: tx(`Không tải được Python: ${st.detail ?? ''}. Cần mạng cho lần tải đầu tiên.`, `Could not load Python: ${st.detail ?? ''}. The first load needs a network connection.`),
  };
  const dot =
    st.status === 'ready' ? 'bg-up' : st.status === 'error' ? 'bg-down' : st.status === 'idle' ? 'bg-muted' : 'bg-gold animate-pulse';

  return (
    <div className="grid gap-3 lg:grid-cols-2">
      <div className="flex min-w-0 flex-col rounded-xl border border-line bg-[#0B1220] overflow-hidden">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-700/70 px-3 py-2">
          <Btn variant="primary" onClick={run} disabled={busy}>
            ▶ {tx('Chạy', 'Run')}
          </Btn>
          {busy && (
            <Btn variant="danger" onClick={() => pyodideService.stop()}>
              ■ {tx('Dừng', 'Stop')}
            </Btn>
          )}
          <Btn className="!text-slate-200 !border-slate-600 hover:!bg-slate-700/50" onClick={() => setCode(initialCode)}>
            ↺ {tx('Khôi phục', 'Reset')}
          </Btn>
          <Btn className="!text-slate-200 !border-slate-600 hover:!bg-slate-700/50" onClick={save}>
            {saved ? tx('✓ Đã lưu', '✓ Saved') : tx('Lưu snippet', 'Save snippet')}
          </Btn>
          <span className="ml-auto hidden text-[11px] text-slate-400 sm:inline">Ctrl + Enter</span>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={onKey}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          aria-label="Python code"
          className="min-h-[340px] flex-1 resize-y bg-transparent p-3 font-mono text-[13px] leading-5 text-slate-100 outline-none"
        />
      </div>

      <div className="flex min-w-0 flex-col rounded-xl border border-line bg-panel overflow-hidden">
        <div className="flex items-center gap-2 border-b border-line px-3 py-2 text-xs text-muted">
          <span className={`h-2 w-2 shrink-0 rounded-full ${dot}`} />
          <span className="truncate">{statusText[st.status]}</span>
          {out.length > 0 && !busy && (
            <Btn variant="gold" className="ml-auto shrink-0 !py-1 !text-xs" onClick={explain}>
              ✦ {tx('AI giải thích', 'Ask AI to explain')}
            </Btn>
          )}
        </div>
        <div ref={outRef} className="max-h-[520px] min-h-[340px] flex-1 overflow-auto p-3">
          {out.length === 0 && (
            <p className="text-sm text-muted">
              {tx(
                'Kết quả sẽ hiện ở đây. Có sẵn: numpy (np), pandas (pd), load("us_macro"), datasets(), chart(x, y), ols(y, X).',
                'Output appears here. Available: numpy (np), pandas (pd), load("us_macro"), datasets(), chart(x, y), ols(y, X).',
              )}
            </p>
          )}
          {out.map((o, i) =>
            o.kind === 'chart' ? (
              <PyChart key={i} spec={o.spec} />
            ) : (
              <pre
                key={i}
                className={`whitespace-pre-wrap break-words font-mono text-[12.5px] leading-5 ${
                  o.kind === 'err' ? 'text-down' : o.kind === 'result' ? 'text-gold' : 'text-ink'
                }`}
              >
                {o.text || ' '}
              </pre>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

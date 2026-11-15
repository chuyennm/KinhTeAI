import { useRef, useState } from 'react';
import { Btn, Card, PageHeader, inputCls } from '../components/ui';
import { downloadJson, exportBackup, importBackup, wipeAll } from '../db/indexedDb';
import { useI18n } from '../i18n';
import { chatStream, loadAiConfig, PROVIDERS, saveAiConfig, type AiConfig, type ProviderId } from '../services/aiService';

export function SettingsPage() {
  const { tx, lang, setLang } = useI18n();
  const [cfg, setCfg] = useState<AiConfig>(loadAiConfig());
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);
  const [testing, setTesting] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [msg, setMsg] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const meta = PROVIDERS[cfg.provider];

  function pick(p: ProviderId) {
    const next = { ...cfg, provider: p, baseUrl: PROVIDERS[p].baseUrl, model: PROVIDERS[p].model };
    setCfg(next);
    setStatus(null);
  }

  async function test() {
    saveAiConfig(cfg);
    setTesting(true);
    setStatus(null);
    try {
      const out = await chatStream([{ role: 'user', content: 'Reply with exactly: OK' }], () => undefined, { maxTokens: 20, temperature: 0 });
      setStatus({ ok: true, text: tx(`Kết nối thành công. Phản hồi: "${out.trim().slice(0, 60)}"`, `Connected. Reply: "${out.trim().slice(0, 60)}"`) });
    } catch (e) {
      const m = (e as Error).message;
      setStatus({
        ok: false,
        text: /Failed to fetch|NetworkError|Load failed/i.test(m)
          ? tx('Không kết nối được. Với Ollama: chạy ollama serve và đặt biến môi trường OLLAMA_ORIGINS để cho phép trang này.', 'Could not connect. For Ollama: run ollama serve and set OLLAMA_ORIGINS to allow this site.')
          : m,
      });
    }
    setTesting(false);
  }

  async function onImport(file: File) {
    try {
      const n = await importBackup(JSON.parse(await file.text()));
      setMsg(tx(`Đã khôi phục ${n} bản ghi.`, `Restored ${n} records.`));
    } catch (e) {
      setMsg(tx('Không đọc được tệp: ', 'Could not read the file: ') + (e as Error).message);
    }
  }

  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader kicker={tx('Cài đặt', 'Settings')} title={tx('AI, ngôn ngữ và dữ liệu', 'AI, language and data')} />

      <Card className="p-5">
        <h2 className="mb-1 font-serif text-lg font-semibold">{tx('Ngôn ngữ', 'Language')}</h2>
        <div className="flex gap-2">
          <Btn variant={lang === 'vi' ? 'gold' : 'ghost'} onClick={() => setLang('vi')}>Tiếng Việt</Btn>
          <Btn variant={lang === 'en' ? 'gold' : 'ghost'} onClick={() => setLang('en')}>English</Btn>
        </div>
      </Card>

      <Card className="space-y-4 p-5">
        <div>
          <h2 className="font-serif text-lg font-semibold">{tx('AI Tutor: dùng khóa của bạn (BYOK) hoặc mô hình chạy trên máy', 'AI Tutor: bring your own key or run a local model')}</h2>
          <p className="mt-1 text-sm text-muted">
            {tx(
              'KinhTeAI không có máy chủ. Trình duyệt của bạn gọi thẳng tới nhà cung cấp bạn chọn. API key chỉ lưu trong localStorage của trình duyệt này và không gửi đi đâu khác. Đừng dùng tính năng này trên máy tính công cộng.',
              'KinhTeAI has no server. Your browser calls the provider you choose directly. The API key is kept only in this browser’s localStorage and sent nowhere else. Do not use this on a shared computer.',
            )}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(PROVIDERS) as ProviderId[]).map((p) => (
            <Btn key={p} variant={cfg.provider === p ? 'gold' : 'ghost'} onClick={() => pick(p)}>
              {PROVIDERS[p].label}
            </Btn>
          ))}
        </div>
        {meta.needsKey || cfg.provider === 'custom' ? (
          <label className="block text-sm">
            <div className="mb-1 flex items-center justify-between">
              <span className="font-semibold">API key {!meta.needsKey && tx('(không bắt buộc)', '(optional)')}</span>
              {meta.keyUrl && (
                <a href={meta.keyUrl} target="_blank" rel="noreferrer" className="text-xs text-up underline">
                  {tx('Lấy key ở đâu?', 'Where do I get one?')}
                </a>
              )}
            </div>
            <div className="flex gap-2">
              <input type={showKey ? 'text' : 'password'} value={cfg.apiKey} onChange={(e) => setCfg({ ...cfg, apiKey: e.target.value })} autoComplete="off" spellCheck={false} className={`${inputCls} font-mono`} />
              <Btn onClick={() => setShowKey((s) => !s)}>{showKey ? tx('Ẩn', 'Hide') : tx('Hiện', 'Show')}</Btn>
            </div>
          </label>
        ) : (
          <div className="rounded-lg border border-line bg-panel2/50 p-3 text-sm text-muted">
            {tx('Ollama chạy trên máy bạn, không cần key. Cài đặt nhanh:', 'Ollama runs on your machine, no key needed. Quick setup:')}
            <pre className="mt-2 overflow-x-auto rounded bg-bg p-2 font-mono text-xs text-ink">{`ollama pull llama3.1
# allow this site to call Ollama from the browser
OLLAMA_ORIGINS="${location.origin}" ollama serve`}</pre>
          </div>
        )}
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block text-sm">
            <div className="mb-1 font-semibold">Base URL</div>
            <input value={cfg.baseUrl} onChange={(e) => setCfg({ ...cfg, baseUrl: e.target.value })} className={`${inputCls} font-mono text-xs`} />
          </label>
          <label className="block text-sm">
            <div className="mb-1 font-semibold">{tx('Tên model', 'Model name')}</div>
            <input value={cfg.model} onChange={(e) => setCfg({ ...cfg, model: e.target.value })} className={`${inputCls} font-mono text-xs`} />
          </label>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Btn
            variant="primary"
            onClick={() => {
              saveAiConfig(cfg);
              setStatus({ ok: true, text: tx('Đã lưu.', 'Saved.') });
            }}
          >
            {tx('Lưu', 'Save')}
          </Btn>
          <Btn variant="gold" onClick={test} disabled={testing}>
            {testing ? tx('Đang thử…', 'Testing…') : tx('Lưu & thử kết nối', 'Save & test')}
          </Btn>
          <Btn
            variant="danger"
            onClick={() => {
              const cleared = { ...cfg, apiKey: '' };
              setCfg(cleared);
              saveAiConfig(cleared);
              setStatus({ ok: true, text: tx('Đã xóa API key khỏi trình duyệt.', 'API key removed from this browser.') });
            }}
          >
            {tx('Xóa key', 'Remove key')}
          </Btn>
        </div>
        {status && <p className={`text-sm ${status.ok ? 'text-up' : 'text-down'}`}>{status.text}</p>}
      </Card>

      <Card className="space-y-3 p-5">
        <h2 className="font-serif text-lg font-semibold">{tx('Sao lưu & khôi phục', 'Backup & restore')}</h2>
        <p className="text-sm text-muted">
          {tx(
            'Mọi tiến độ, câu trả lời, case study do AI tạo, snippet Python và sổ tay đều nằm trong IndexedDB của trình duyệt này. Hãy xuất file JSON định kỳ để chuyển sang máy khác hoặc phòng khi xóa dữ liệu trình duyệt.',
            'All progress, answers, AI-generated cases, Python snippets and journal entries live in this browser’s IndexedDB. Export a JSON file regularly to move devices or guard against clearing browser data.',
          )}
        </p>
        <div className="flex flex-wrap gap-2">
          <Btn variant="primary" onClick={async () => downloadJson(`kinhteai-backup-${new Date().toISOString().slice(0, 10)}.json`, await exportBackup())}>
            {tx('Xuất toàn bộ dữ liệu', 'Export everything')}
          </Btn>
          <Btn onClick={() => fileRef.current?.click()}>{tx('Khôi phục từ file', 'Restore from file')}</Btn>
          <input ref={fileRef} type="file" accept="application/json,.json" className="hidden" onChange={(e) => e.target.files?.[0] && onImport(e.target.files[0])} />
          <Btn
            variant="danger"
            onClick={async () => {
              if (confirm(tx('Xóa VĨNH VIỄN mọi dữ liệu học tập trong trình duyệt này? Không thể hoàn tác. Hãy xuất bản sao lưu trước.', 'PERMANENTLY delete all learning data in this browser? This cannot be undone. Export a backup first.'))) {
                await wipeAll();
                setMsg(tx('Đã xóa dữ liệu.', 'Data deleted.'));
              }
            }}
          >
            {tx('Xóa toàn bộ dữ liệu', 'Delete all data')}
          </Btn>
        </div>
        {msg && <p className="text-sm text-gold">{msg}</p>}
      </Card>

      <p className="text-xs text-muted">
        {tx(
          'Số liệu vĩ mô được tổng hợp, làm tròn từ nguồn công khai (GSO, NHNN, World Bank, FRED, US Treasury) cho mục đích học tập. Nội dung không phải lời khuyên đầu tư.',
          'Macro figures are compiled and rounded from public sources (GSO, SBV, World Bank, FRED, US Treasury) for teaching. Nothing here is investment advice.',
        )}
      </p>
    </div>
  );
}

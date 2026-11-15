import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Markdown } from '../components/Markdown';
import { useTutor } from '../components/TutorContext';
import { Btn, Card, PageHeader, Slider, Tag, inputCls } from '../components/ui';
import { db, downloadJson, exportBackup, importBackup, uid, useStore } from '../db/indexedDb';
import { useI18n } from '../i18n';
import type { ThesisNote, ThesisStatus } from '../types';

const STATUS_TONE: Record<ThesisStatus, 'up' | 'down' | 'gold' | undefined> = {
  open: undefined,
  validated: 'up',
  invalidated: 'down',
  mixed: 'gold',
};

function blank(): ThesisNote {
  const now = Date.now();
  return {
    id: uid(),
    title: '',
    hypothesis: '',
    supportingData: '',
    horizon: '',
    reviewDate: new Date(now + 90 * 86_400_000).toISOString().slice(0, 10),
    invalidation: '',
    confidence: 65,
    status: 'open',
    postmortem: '',
    tags: [],
    createdAt: now,
    updatedAt: now,
  };
}

export function JournalPage() {
  const { tx } = useI18n();
  const tutor = useTutor();
  const location = useLocation();
  const theses = useStore('theses').sort((a, b) => b.updatedAt - a.updatedAt);
  const [editing, setEditing] = useState<ThesisNote | null>(null);
  const [preview, setPreview] = useState(false);
  const [filter, setFilter] = useState<ThesisStatus | 'all' | 'due'>('all');
  const fileRef = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const open = (location.state as { open?: string } | null)?.open;
    if (open) db.get('theses', open).then((t) => t && setEditing(t));
  }, [location.state]);

  const STATUS_LABEL: Record<ThesisStatus, string> = {
    open: tx('Đang theo dõi', 'Open'),
    validated: tx('Đúng', 'Validated'),
    invalidated: tx('Sai', 'Invalidated'),
    mixed: tx('Đúng một phần', 'Mixed'),
  };

  const today = new Date().toISOString().slice(0, 10);
  const due = theses.filter((t) => t.status === 'open' && t.reviewDate && t.reviewDate <= today);
  const shown = theses.filter((t) => (filter === 'all' ? true : filter === 'due' ? due.includes(t) : t.status === filter));
  const resolved = theses.filter((t) => t.status !== 'open');
  const hitRate = resolved.length ? resolved.filter((t) => t.status === 'validated').length / resolved.length : null;
  const avgConf = resolved.length ? resolved.reduce((s, t) => s + t.confidence, 0) / resolved.length : null;

  async function save(t: ThesisNote) {
    await db.put('theses', { ...t, title: t.title.trim() || tx('Luận điểm chưa đặt tên', 'Untitled thesis'), updatedAt: Date.now() });
    setEditing(null);
  }

  function critique(t: ThesisNote) {
    tutor.open({
      mode: 'socratic',
      draft: `# ${t.title}\n\n**${tx('Giả thuyết', 'Hypothesis')}:** ${t.hypothesis}\n\n**${tx('Dữ liệu ủng hộ', 'Supporting data')}:** ${t.supportingData}\n\n**${tx('Kỳ hạn', 'Horizon')}:** ${t.horizon}\n\n**${tx('Điều kiện vô hiệu', 'Invalidation')}:** ${t.invalidation}\n\n**${tx('Độ tự tin', 'Confidence')}:** ${t.confidence}%`,
    });
  }

  async function onImport(file: File) {
    try {
      const data = JSON.parse(await file.text());
      const n = await importBackup(data);
      setMsg(tx(`Đã nhập ${n} bản ghi.`, `Imported ${n} records.`));
    } catch (e) {
      setMsg(tx('Tệp không hợp lệ: ', 'Invalid file: ') + (e as Error).message);
    }
  }

  if (editing) {
    const set = <K extends keyof ThesisNote>(k: K, v: ThesisNote[K]) => setEditing({ ...editing, [k]: v });
    const field = (k: 'hypothesis' | 'supportingData' | 'invalidation' | 'postmortem', label: string, hint: string, rows = 4) => (
      <label className="block">
        <div className="mb-1 text-sm font-semibold">{label}</div>
        <div className="mb-1 text-xs text-muted">{hint}</div>
        {preview ? (
          <div className="min-h-[60px] rounded-lg border border-line bg-panel2/40 px-3 py-2">
            <Markdown className="!text-sm">{editing[k] || '—'}</Markdown>
          </div>
        ) : (
          <textarea value={editing[k]} onChange={(e) => set(k, e.target.value)} rows={rows} className={`${inputCls} font-mono text-[13px]`} />
        )}
      </label>
    );
    return (
      <div className="max-w-4xl">
        <PageHeader
          kicker={tx('Sổ tay luận điểm', 'Thesis journal')}
          title={editing.title || tx('Luận điểm mới', 'New thesis')}
          right={
            <div className="flex flex-wrap gap-2">
              <Btn onClick={() => setPreview((p) => !p)}>{preview ? tx('Sửa', 'Edit') : tx('Xem Markdown', 'Preview')}</Btn>
              <Btn variant="gold" onClick={() => critique(editing)}>
                ✦ {tx('AI phản biện', 'AI critique')}
              </Btn>
              <Btn onClick={() => setEditing(null)}>{tx('Hủy', 'Cancel')}</Btn>
              <Btn variant="primary" onClick={() => save(editing)}>
                {tx('Lưu', 'Save')}
              </Btn>
            </div>
          }
        />
        <div className="space-y-5">
          <input value={editing.title} onChange={(e) => set('title', e.target.value)} placeholder={tx('Tiêu đề, ví dụ: NHNN giữ lãi suất điều hành trong 2026', 'Title, e.g. The SBV holds its policy rate through 2026')} className={`${inputCls} text-lg font-semibold`} />
          {field('hypothesis', tx('Giả thuyết', 'Hypothesis'), tx('Một mệnh đề có thể kiểm chứng: điều gì, bao nhiêu, khi nào.', 'One testable claim: what, how much, by when.'))}
          {field('supportingData', tx('Dữ liệu ủng hộ', 'Supporting data'), tx('Số liệu, cơ chế và nguồn. Ghi cả dữ liệu NGƯỢC lại với bạn.', 'Figures, mechanisms and sources. Include the data AGAINST you too.'), 6)}
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="block text-sm">
              <div className="mb-1 font-semibold">{tx('Kỳ hạn', 'Time horizon')}</div>
              <input value={editing.horizon} onChange={(e) => set('horizon', e.target.value)} placeholder={tx('6–12 tháng', '6–12 months')} className={inputCls} />
            </label>
            <label className="block text-sm">
              <div className="mb-1 font-semibold">{tx('Ngày xem lại', 'Review date')}</div>
              <input type="date" value={editing.reviewDate} onChange={(e) => set('reviewDate', e.target.value)} className={inputCls} />
            </label>
            <label className="block text-sm">
              <div className="mb-1 font-semibold">{tx('Trạng thái', 'Status')}</div>
              <select value={editing.status} onChange={(e) => set('status', e.target.value as ThesisStatus)} className={inputCls}>
                {(Object.keys(STATUS_LABEL) as ThesisStatus[]).map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABEL[s]}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <Slider label={tx('Độ tự tin (xác suất luận điểm đúng)', 'Confidence (probability the thesis is right)')} value={editing.confidence} min={50} max={99} onChange={(v) => set('confidence', v)} fmt={(v) => `${v}%`} />
          {field('invalidation', tx('Điều kiện vô hiệu', 'Invalidation criteria'), tx('Dữ kiện quan sát được nào sẽ chứng minh bạn SAI? Viết trước, khi còn khách quan.', 'Which observable facts would prove you WRONG? Write them now, while you are still objective.'))}
          {editing.status !== 'open' && field('postmortem', tx('Hậu kiểm', 'Post-mortem'), tx('Điều gì thực sự xảy ra? Bạn đúng/sai vì lý do đúng hay vì may mắn?', 'What actually happened? Were you right or wrong for the right reasons, or by luck?'))}
          <label className="block text-sm">
            <div className="mb-1 font-semibold">Tags</div>
            <input value={editing.tags.join(', ')} onChange={(e) => set('tags', e.target.value.split(',').map((s) => s.trim()).filter(Boolean))} placeholder="fx, sbv, m3" className={inputCls} />
          </label>
          <div className="flex justify-between">
            <Btn
              variant="danger"
              onClick={async () => {
                if (confirm(tx('Xóa luận điểm này?', 'Delete this thesis?'))) {
                  await db.del('theses', editing.id);
                  setEditing(null);
                }
              }}
            >
              {tx('Xóa', 'Delete')}
            </Btn>
            <Btn variant="primary" onClick={() => save(editing)}>
              {tx('Lưu', 'Save')}
            </Btn>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        kicker={tx('Sổ tay luận điểm', 'Thesis journal')}
        title={tx('Viết ra, đặt cược, rồi hậu kiểm', 'Write it down, commit, then review')}
        sub={tx(
          'Chuyên gia khác người mới ở chỗ họ ghi lại dự báo kèm xác suất và điều kiện sai, rồi quay lại chấm điểm chính mình. Đây là cách duy nhất để thoát khỏi thiên lệch hồi tưởng.',
          'Experts differ from beginners in that they record forecasts with probabilities and failure conditions, then come back to grade themselves. It is the only way out of hindsight bias.',
        )}
        right={
          <div className="flex flex-wrap gap-2">
            <Btn variant="primary" onClick={() => setEditing(blank())}>
              + {tx('Luận điểm mới', 'New thesis')}
            </Btn>
            <Btn onClick={async () => downloadJson(`kinhteai-journal-${new Date().toISOString().slice(0, 10)}.json`, await exportBackup(['theses']))}>{tx('Xuất JSON', 'Export JSON')}</Btn>
            <Btn onClick={() => fileRef.current?.click()}>{tx('Nhập JSON', 'Import JSON')}</Btn>
            <input ref={fileRef} type="file" accept="application/json,.json" className="hidden" onChange={(e) => e.target.files?.[0] && onImport(e.target.files[0])} />
          </div>
        }
      />
      {msg && <p className="mb-3 text-sm text-gold">{msg}</p>}
      <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Card className="p-3">
          <div className="text-[11px] uppercase tracking-wide text-muted">{tx('Tổng số', 'Total')}</div>
          <div className="num text-lg font-semibold">{theses.length}</div>
        </Card>
        <Card className="p-3">
          <div className="text-[11px] uppercase tracking-wide text-muted">{tx('Đến hạn xem lại', 'Due for review')}</div>
          <div className={`num text-lg font-semibold ${due.length ? 'text-gold' : ''}`}>{due.length}</div>
        </Card>
        <Card className="p-3">
          <div className="text-[11px] uppercase tracking-wide text-muted">{tx('Tỷ lệ đúng', 'Hit rate')}</div>
          <div className="num text-lg font-semibold">{hitRate === null ? '—' : `${(hitRate * 100).toFixed(0)}%`}</div>
        </Card>
        <Card className="p-3">
          <div className="text-[11px] uppercase tracking-wide text-muted">{tx('Tự tin bình quân', 'Avg. confidence')}</div>
          <div className="num text-lg font-semibold">{avgConf === null ? '—' : `${avgConf.toFixed(0)}%`}</div>
          {hitRate !== null && avgConf !== null && (
            <div className="text-[11px] text-muted">{avgConf / 100 - hitRate > 0.1 ? tx('Bạn đang tự tin quá mức', 'You are overconfident') : tx('Hiệu chuẩn ổn', 'Reasonably calibrated')}</div>
          )}
        </Card>
      </div>
      <div className="mb-4 flex flex-wrap gap-1.5">
        {(['all', 'due', 'open', 'validated', 'invalidated', 'mixed'] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`rounded-full border px-3 py-1 text-xs ${filter === f ? 'border-gold bg-gold/15 text-gold' : 'border-line text-muted'}`}>
            {f === 'all' ? tx('Tất cả', 'All') : f === 'due' ? tx('Đến hạn', 'Due') : STATUS_LABEL[f]}
          </button>
        ))}
      </div>
      {shown.length === 0 ? (
        <Card className="p-6 text-center text-sm text-muted">
          {tx('Chưa có luận điểm nào. Bắt đầu với một câu hỏi bạn thật sự quan tâm, ví dụ: "Tỷ giá USD/VND cuối năm sẽ cao hơn hiện tại 3%?"', 'No theses yet. Start with a question you genuinely care about, e.g. "Will USD/VND be 3% higher by year-end?"')}
        </Card>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {shown.map((t) => (
            <button key={t.id} onClick={() => setEditing(t)} className="text-left">
              <Card className="h-full p-4 transition hover:border-gold/60">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <Tag tone={STATUS_TONE[t.status]}>{STATUS_LABEL[t.status]}</Tag>
                  <span className="num text-xs text-muted">{t.confidence}%</span>
                  {due.includes(t) && <Tag tone="gold">{tx('Đến hạn', 'Due')}</Tag>}
                  <span className="num ml-auto text-[11px] text-muted">{t.reviewDate}</span>
                </div>
                <div className="font-semibold">{t.title}</div>
                <p className="mt-1 line-clamp-2 text-sm text-muted">{t.hypothesis.replace(/[#*_>`]/g, '')}</p>
                {t.tags.length > 0 && <div className="mt-2 text-[11px] text-muted">#{t.tags.join(' #')}</div>}
              </Card>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

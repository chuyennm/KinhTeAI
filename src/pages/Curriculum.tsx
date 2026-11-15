import { Link, useNavigate, useParams } from 'react-router-dom';
import { Btn, Card, PageHeader, ProgressBar, Tag } from '../components/ui';
import { findModule, modules } from '../data/curriculum';
import { db, uid, useStore } from '../db/indexedDb';
import { useI18n } from '../i18n';
import type { LessonProgress, Module } from '../types';

export function moduleProgress(m: Module, progress: LessonProgress[]) {
  const done = m.lessons.filter((l) => progress.find((p) => p.lessonId === l.id)?.completedAt).length;
  return { done, total: m.lessons.length, pct: (done / m.lessons.length) * 100 };
}

export function CurriculumPage() {
  const { tx, tr } = useI18n();
  const progress = useStore('progress');
  const total = modules.reduce((s, m) => s + m.lessons.length, 0);
  const done = modules.reduce((s, m) => s + moduleProgress(m, progress).done, 0);

  return (
    <div>
      <PageHeader
        kicker={tx('Lộ trình 6 module', 'Six-module path')}
        title={tx('Từ nền tảng đến chuyên viên phân tích', 'From foundations to analyst')}
        sub={tx(
          'Đi theo thứ tự: vi mô → vĩ mô → quốc tế → báo cáo tài chính → định giá → kinh tế lượng. Mỗi module kết thúc bằng một luận điểm bạn tự viết và kiểm định.',
          'Go in order: micro → macro → international → financial statements → valuation → econometrics. Each module ends with a thesis you write and test yourself.',
        )}
        right={
          <div className="w-48">
            <div className="num mb-1 text-right text-sm text-muted">
              {done}/{total} {tx('bài', 'lessons')}
            </div>
            <ProgressBar value={(done / total) * 100} />
          </div>
        }
      />
      <div className="grid gap-4 md:grid-cols-2">
        {modules.map((m) => {
          const p = moduleProgress(m, progress);
          return (
            <Link key={m.id} to={`/learn/${m.id}`} className="group">
              <Card className="h-full p-5 transition group-hover:border-gold/60">
                <div className="mb-2 flex items-center justify-between">
                  <span className="num text-xs font-semibold uppercase tracking-widest text-gold">Module {m.index}</span>
                  {p.done === p.total ? <Tag tone="up">✓ {tx('Hoàn thành', 'Complete')}</Tag> : <span className="num text-xs text-muted">{p.done}/{p.total}</span>}
                </div>
                <h2 className="font-serif text-xl font-semibold leading-snug">{tr(m.title)}</h2>
                <p className="mt-1.5 text-sm text-muted">{tr(m.subtitle)}</p>
                <ProgressBar value={p.pct} className="mt-4" />
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function ModulePage() {
  const { moduleId = '' } = useParams();
  const { tx, tr } = useI18n();
  const navigate = useNavigate();
  const progress = useStore('progress');
  const m = findModule(moduleId);
  if (!m) return <p>{tx('Không tìm thấy module.', 'Module not found.')}</p>;
  const p = moduleProgress(m, progress);

  async function startCapstone() {
    const id = uid();
    const now = Date.now();
    const review = new Date(now + 90 * 86_400_000).toISOString().slice(0, 10);
    await db.put('theses', {
      id,
      title: `Module ${m!.index}: ${m!.title.vi}`,
      hypothesis: tr(m!.capstone),
      supportingData: '',
      horizon: tx('3–12 tháng', '3–12 months'),
      reviewDate: review,
      invalidation: '',
      confidence: 60,
      status: 'open',
      postmortem: '',
      tags: [m!.id, 'capstone'],
      createdAt: now,
      updatedAt: now,
    });
    navigate('/journal', { state: { open: id } });
  }

  return (
    <div>
      <PageHeader
        kicker={
          <Link to="/learn" className="hover:underline">
            ← {tx('Lộ trình', 'Curriculum')} · Module {m.index}
          </Link>
        }
        title={tr(m.title)}
        sub={tr(m.subtitle)}
      />
      <Card className="mb-5 border-up/40 bg-up/5 p-4">
        <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-up">{tx('Sau module này bạn làm được', 'After this module you can')}</div>
        <p className="text-sm">{tr(m.outcome)}</p>
      </Card>
      <ol className="space-y-3">
        {m.lessons.map((l, i) => {
          const lp = progress.find((x) => x.lessonId === l.id);
          return (
            <li key={l.id}>
              <Link to={`/lesson/${l.id}`}>
                <Card className="flex items-center gap-4 p-4 transition hover:border-gold/60">
                  <div className={`num flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold ${lp?.completedAt ? 'border-up bg-up text-navy' : 'border-line text-muted'}`}>
                    {lp?.completedAt ? '✓' : i + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold">{tr(l.title)}</div>
                    <div className="truncate text-sm text-muted">{tr(l.summary)}</div>
                  </div>
                  <div className="hidden shrink-0 text-right text-xs text-muted sm:block">
                    <div className="num">{l.minutes} {tx('phút', 'min')}</div>
                    {lp?.bestScore != null && <div className="num text-gold">{lp.bestScore}%</div>}
                  </div>
                </Card>
              </Link>
            </li>
          );
        })}
      </ol>
      <Card className="mt-6 p-5">
        <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-gold">{tx('Bài tập lớn của module', 'Module capstone')}</div>
        <p className="text-sm">{tr(m.capstone)}</p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Btn variant="gold" onClick={startCapstone}>
            ✎ {tx('Tạo bản nháp trong Sổ tay luận điểm', 'Start a draft in the Thesis Journal')}
          </Btn>
          {p.done < p.total && <span className="text-xs text-muted">{tx('Gợi ý: hoàn thành các bài trước đã.', 'Tip: finish the lessons first.')}</span>}
        </div>
      </Card>
    </div>
  );
}

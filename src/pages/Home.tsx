import { Link } from 'react-router-dom';
import { Card, PageHeader, ProgressBar, Stat } from '../components/ui';
import { caseStudies } from '../data/caseStudies';
import { allLessons, modules } from '../data/curriculum';
import { glossary } from '../data/glossary';
import { computeStreak, useKv, useStore } from '../db/indexedDb';
import { useI18n } from '../i18n';
import { isDue } from '../services/srs';
import { moduleProgress } from './Curriculum';

export function HomePage() {
  const { tx, tr } = useI18n();
  const progress = useStore('progress');
  const attempts = useStore('attempts');
  const srs = useStore('srs');
  const theses = useStore('theses');
  const decisions = useStore('caseDecisions');
  const days = useKv<string[]>('activityDays', []);

  const streak = computeStreak(days);
  const completed = progress.filter((p) => p.completedAt).length;
  const next = allLessons.find(({ lesson }) => !progress.find((p) => p.lessonId === lesson.id)?.completedAt);
  const dueCards = srs.filter((s) => isDue(s)).length;
  const today = new Date().toISOString().slice(0, 10);
  const dueTheses = theses.filter((t) => t.status === 'open' && t.reviewDate <= today).length;
  const accuracy = attempts.length ? attempts.filter((a) => a.correct).length / attempts.length : null;

  // Calibration: for each confidence bucket, how often were you right?
  const buckets = [55, 75, 95].map((c) => {
    const xs = attempts.filter((a) => a.confidence === c);
    return { c, n: xs.length, hit: xs.length ? xs.filter((a) => a.correct).length / xs.length : null };
  });
  const undecidedCase = caseStudies.find((c) => !decisions.find((d) => d.caseId === c.id));

  const last30 = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    return days.includes(k);
  });

  const tasks = [
    next && { to: `/lesson/${next.lesson.id}`, label: tx('Học bài tiếp theo', 'Next lesson'), detail: `M${next.module.index} · ${tr(next.lesson.title)}`, mins: next.lesson.minutes },
    dueCards > 0 && { to: '/review', label: tx('Ôn tập ngắt quãng', 'Spaced review'), detail: tx(`${dueCards} thẻ đến hạn`, `${dueCards} cards due`), mins: Math.max(3, Math.round(dueCards * 0.5)) },
    dueTheses > 0 && { to: '/journal', label: tx('Hậu kiểm luận điểm', 'Review your theses'), detail: tx(`${dueTheses} luận điểm đến hạn`, `${dueTheses} theses due`), mins: 10 },
    undecidedCase && { to: `/cases/${undecidedCase.id}`, label: tx('Thử thách case study', 'Case challenge'), detail: tr(undecidedCase.title), mins: 20 },
  ].filter(Boolean) as { to: string; label: string; detail: string; mins: number }[];

  return (
    <div>
      <PageHeader
        kicker={new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })}
        title={tx('Phiên học hôm nay', 'Today’s session')}
        sub={tx(
          'Học mỗi ngày 25–40 phút có chủ đích hiệu quả hơn đọc dồn 5 tiếng cuối tuần. Danh sách dưới đây được sắp xếp để bạn không phải tự nghĩ nên học gì.',
          'Twenty-five to forty deliberate minutes a day beats a five-hour weekend cram. The list below is ordered so you never have to decide what to study.',
        )}
      />
      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <div className="space-y-5">
          <Card className="p-5">
            <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold">{tx('Việc cần làm', 'To do')}</div>
            {tasks.length === 0 ? (
              <p className="text-sm text-up">{tx('Bạn đã hoàn thành mọi thứ. Hãy viết một luận điểm mới trong Sổ tay.', 'You have done everything. Write a new thesis in the Journal.')}</p>
            ) : (
              <ol className="space-y-2">
                {tasks.map((t, i) => (
                  <li key={t.to + i}>
                    <Link to={t.to} className="flex items-center gap-3 rounded-lg border border-line px-3 py-2.5 transition hover:border-gold/60">
                      <span className="num flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-panel2 text-xs font-semibold">{i + 1}</span>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold">{t.label}</div>
                        <div className="truncate text-xs text-muted">{t.detail}</div>
                      </div>
                      <span className="num shrink-0 text-xs text-muted">~{t.mins}′</span>
                    </Link>
                  </li>
                ))}
              </ol>
            )}
          </Card>

          <Card className="p-5">
            <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">{tx('Tiến độ theo module', 'Progress by module')}</div>
            <div className="space-y-3">
              {modules.map((m) => {
                const p = moduleProgress(m, progress);
                return (
                  <Link key={m.id} to={`/learn/${m.id}`} className="block">
                    <div className="mb-1 flex justify-between text-sm">
                      <span>
                        <span className="num text-gold">M{m.index}</span> {tr(m.title)}
                      </span>
                      <span className="num text-muted">
                        {p.done}/{p.total}
                      </span>
                    </div>
                    <ProgressBar value={p.pct} />
                  </Link>
                );
              })}
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <Stat label={tx('Chuỗi ngày học', 'Streak')} value={`${streak} 🔥`} tone="gold" />
            <Stat label={tx('Bài hoàn thành', 'Lessons done')} value={`${completed}/${allLessons.length}`} />
            <Stat label={tx('Độ chính xác', 'Accuracy')} value={accuracy === null ? '—' : `${(accuracy * 100).toFixed(0)}%`} sub={`${attempts.length} ${tx('câu', 'answers')}`} />
            <Stat label={tx('Thuật ngữ', 'Terms')} value={`${srs.filter((s) => s.cardId.startsWith('g:') && s.reps > 0).length}/${glossary.length}`} />
          </div>
          <Card className="p-4">
            <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted">{tx('30 ngày qua', 'Last 30 days')}</div>
            <div className="grid grid-cols-10 gap-1">
              {last30.map((on, i) => (
                <div key={i} className={`aspect-square rounded-sm ${on ? 'bg-up' : 'bg-panel2'}`} />
              ))}
            </div>
          </Card>
          <Card className="p-4">
            <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted">{tx('Hiệu chuẩn tự tin', 'Confidence calibration')}</div>
            <p className="mb-3 text-xs text-muted">
              {tx('Khi nói "rất chắc 95%", bạn có đúng 95% không? Nhà phân tích giỏi được hiệu chuẩn tốt.', 'When you say "95% sure", are you right 95% of the time? Good analysts are well calibrated.')}
            </p>
            <div className="space-y-2">
              {buckets.map((bk) => (
                <div key={bk.c} className="text-xs">
                  <div className="mb-0.5 flex justify-between">
                    <span>
                      {tx('Nói', 'Said')} {bk.c}%
                    </span>
                    <span className="num text-muted">
                      {bk.hit === null ? '—' : `${tx('thực tế', 'actual')} ${(bk.hit * 100).toFixed(0)}%`} · n={bk.n}
                    </span>
                  </div>
                  <div className="relative h-2 rounded bg-panel2">
                    <div className="absolute top-0 h-2 w-0.5 bg-gold" style={{ left: `${bk.c}%` }} />
                    {bk.hit !== null && <div className={`h-2 rounded ${bk.hit * 100 < bk.c - 10 ? 'bg-down' : 'bg-up'}`} style={{ width: `${bk.hit * 100}%` }} />}
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Link to="/guide">
            <Card className="border-gold/40 p-4 transition hover:border-gold">
              <div className="text-sm font-semibold text-gold">◎ {tx('Học thế nào cho hiệu quả?', 'How to learn effectively')}</div>
              <p className="mt-1 text-xs text-muted">{tx('Đọc phương pháp học của KinhTeAI trước khi bắt đầu.', 'Read the KinhTeAI method before you start.')}</p>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Markdown } from '../components/Markdown';
import { useTutor } from '../components/TutorContext';
import { Btn, Card, PageHeader, Tag } from '../components/ui';
import { caseStudies } from '../data/caseStudies';
import { findLesson } from '../data/curriculum';
import { db, downloadJson, logActivity, uid, useStore } from '../db/indexedDb';
import { useI18n } from '../i18n';
import type { CaseStudy } from '../types';

const CAT: Record<CaseStudy['category'], { vi: string; en: string }> = {
  global: { vi: 'Toàn cầu', en: 'Global' },
  vietnam: { vi: 'Vĩ mô Việt Nam', en: 'Vietnam macro' },
  corporate: { vi: 'Doanh nghiệp', en: 'Corporate' },
  intermarket: { vi: 'Liên thị trường', en: 'Intermarket' },
  generated: { vi: 'AI tạo', en: 'AI-generated' },
};

function useAllCases() {
  const saved = useStore('cases');
  return [...caseStudies, ...saved.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))];
}

export function CasesPage() {
  const { tx, tr, lang } = useI18n();
  const tutor = useTutor();
  const cases = useAllCases();
  const decisions = useStore('caseDecisions');

  return (
    <div>
      <PageHeader
        kicker={tx('Case Study thực chiến', 'Real-world case studies')}
        title={tx('Ra quyết định trước khi biết kết quả', 'Decide before you know the outcome')}
        sub={tx(
          'Mỗi case có 3 giai đoạn: bối cảnh và dữ liệu thô tại thời điểm đó, thử thách ra quyết định, rồi phân tích hệ quả bậc 1, 2, 3. Đây là cách nhà phân tích thật được đào tạo, vì hồi tưởng sau sự kiện luôn dễ.',
          'Each case has three stages: context and raw data as they stood, a decision challenge, then first-, second- and third-order consequences. This is how real analysts are trained, because hindsight is always easy.',
        )}
        right={
          <Btn variant="gold" onClick={() => tutor.open({ mode: 'casegen' })}>
            ✦ {tx('Sinh case mới bằng AI', 'Generate a case with AI')}
          </Btn>
        }
      />
      <div className="grid gap-4 md:grid-cols-2">
        {cases.map((c) => {
          const d = decisions.find((x) => x.caseId === c.id);
          const verdict = d ? c.options.find((o) => o.id === d.optionId)?.verdict : undefined;
          return (
            <Link key={c.id} to={`/cases/${c.id}`}>
              <Card className="h-full p-5 transition hover:border-gold/60">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Tag tone={c.generated ? 'gold' : undefined}>{lang === 'vi' ? CAT[c.category].vi : CAT[c.category].en}</Tag>
                  <span className="num text-xs text-muted">{c.period}</span>
                  {verdict && (
                    <Tag tone={verdict === 'best' ? 'up' : verdict === 'poor' ? 'down' : 'gold'}>
                      {tx('Đã quyết định', 'Decided')}
                    </Tag>
                  )}
                </div>
                <h2 className="font-serif text-lg font-semibold leading-snug">{tr(c.title)}</h2>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

type Stage = 1 | 2 | 3;

export function CaseDetailPage() {
  const { caseId = '' } = useParams();
  const { tx, tr, lang } = useI18n();
  const tutor = useTutor();
  const navigate = useNavigate();
  const cases = useAllCases();
  const decisions = useStore('caseDecisions');
  const c = cases.find((x) => x.id === caseId);
  const decision = decisions.find((x) => x.caseId === caseId);
  const [stage, setStage] = useState<Stage>(1);
  const [choice, setChoice] = useState<string | null>(null);
  const [reasoning, setReasoning] = useState('');

  useEffect(() => {
    setStage(1);
    setChoice(null);
    setReasoning('');
  }, [caseId]);

  useEffect(() => {
    if (!c) return;
    const parts = [`Case study: ${c.title.en} (${c.period})`, `Context: ${tr(c.context)}`, `Decision question: ${tr(c.question)}`];
    if (stage === 3) parts.push(`Outcome first order: ${tr(c.orders.first)}`, `Second: ${tr(c.orders.second)}`, `Third: ${tr(c.orders.third)}`);
    else parts.push('The learner has NOT yet seen the outcome. Do not reveal what happened.');
    tutor.setStudyContext(parts.join('\n\n'));
  }, [c, stage, tr, tutor]);

  if (!c) {
    return (
      <p>
        {tx('Không tìm thấy case study.', 'Case study not found.')} <Link to="/cases" className="text-up underline">{tx('Về thư viện', 'Back to library')}</Link>
      </p>
    );
  }

  async function commit() {
    if (!choice) return;
    await db.put('caseDecisions', { caseId: c!.id, optionId: choice, ts: Date.now() });
    logActivity();
    setStage(3);
  }

  async function toJournal() {
    const id = uid();
    const now = Date.now();
    const opt = c!.options.find((o) => o.id === (choice ?? decision?.optionId));
    await db.put('theses', {
      id,
      title: `Case: ${c!.title.vi}`,
      hypothesis: `${tr(c!.question)}\n\n**${tx('Lựa chọn của tôi', 'My choice')}:** ${opt ? tr(opt.label) : ''}`,
      supportingData: reasoning,
      horizon: c!.period,
      reviewDate: new Date(now + 30 * 86_400_000).toISOString().slice(0, 10),
      invalidation: '',
      confidence: 60,
      status: opt?.verdict === 'best' ? 'validated' : opt?.verdict === 'poor' ? 'invalidated' : 'mixed',
      postmortem: tr(c!.takeaways),
      tags: ['case', c!.id],
      createdAt: now,
      updatedAt: now,
    });
    navigate('/journal', { state: { open: id } });
  }

  const chosen = c.options.find((o) => o.id === (choice ?? decision?.optionId));
  const STAGES: { n: Stage; vi: string; en: string }[] = [
    { n: 1, vi: 'Bối cảnh & dữ liệu', en: 'Context & data' },
    { n: 2, vi: 'Ra quyết định', en: 'Decision' },
    { n: 3, vi: 'Hệ quả bậc 1–2–3', en: 'Consequences' },
  ];

  return (
    <div>
      <PageHeader
        kicker={
          <Link to="/cases" className="hover:underline">
            ← Case Study · {lang === 'vi' ? CAT[c.category].vi : CAT[c.category].en} · {c.period}
          </Link>
        }
        title={tr(c.title)}
        right={
          c.generated ? (
            <div className="flex gap-2">
              <Btn onClick={() => downloadJson(`kinhteai-case-${c.id}.json`, c)}>{tx('Xuất JSON', 'Export JSON')}</Btn>
              <Btn
                variant="danger"
                onClick={async () => {
                  if (confirm(tx('Xóa case study này khỏi thư viện?', 'Delete this case study from your library?'))) {
                    await db.del('cases', c.id);
                    navigate('/cases');
                  }
                }}
              >
                {tx('Xóa', 'Delete')}
              </Btn>
            </div>
          ) : undefined
        }
      />

      {c.generated && (
        <p className="mb-4 rounded-lg border border-gold/40 bg-gold/10 px-3 py-2 text-xs">
          {tx('Case này do AI tạo. Hãy kiểm chứng số liệu trước khi dùng làm căn cứ.', 'This case was written by AI. Verify the figures before relying on them.')}
        </p>
      )}

      <div className="mb-5 flex gap-2">
        {STAGES.map((s) => {
          const reachable = s.n === 1 || (s.n === 2 && stage >= 2) || (s.n === 3 && (stage === 3 || !!decision));
          return (
            <button
              key={s.n}
              disabled={!reachable}
              onClick={() => setStage(s.n)}
              className={`flex-1 rounded-lg border px-3 py-2 text-left text-xs transition disabled:opacity-40 ${stage === s.n ? 'border-gold bg-gold/10' : 'border-line'}`}
            >
              <div className="num font-semibold text-gold">{tx('Giai đoạn', 'Stage')} {s.n}</div>
              <div className="text-ink">{lang === 'vi' ? s.vi : s.en}</div>
            </button>
          );
        })}
      </div>

      {stage === 1 && (
        <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
          <Markdown>{tr(c.context)}</Markdown>
          <Card className="h-fit p-4">
            <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted">{tx('Bảng dữ liệu tại thời điểm đó', 'Dashboard at the time')}</div>
            <table className="w-full text-sm">
              <tbody>
                {c.data.map((d, i) => (
                  <tr key={i} className="border-b border-line last:border-0">
                    <td className="py-1.5 pr-2 text-muted">
                      {tr(d.label)}
                      {d.note && <div className="text-[11px] text-muted/80">{tr(d.note)}</div>}
                    </td>
                    <td className="num py-1.5 text-right font-semibold">{d.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Btn variant="primary" className="mt-4 w-full" onClick={() => setStage(2)}>
              {tx('Sang thử thách ra quyết định →', 'Go to the decision →')}
            </Btn>
          </Card>
        </div>
      )}

      {stage === 2 && (
        <div className="max-w-3xl space-y-4">
          <Card className="border-gold/40 p-4">
            <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-gold">{tx('Câu hỏi', 'The question')}</div>
            <p className="font-serif text-lg">{tr(c.question)}</p>
          </Card>
          {c.options.map((o) => (
            <button
              key={o.id}
              onClick={() => setChoice(o.id)}
              className={`block w-full rounded-xl border p-4 text-left text-sm transition ${choice === o.id ? 'border-gold bg-gold/10' : 'border-line hover:border-muted'}`}
            >
              <span className="num mr-2 font-semibold text-muted">{o.id.toUpperCase()}.</span>
              {tr(o.label)}
            </button>
          ))}
          <label className="block text-sm">
            <span className="text-muted">{tx('Lập luận của bạn (bắt buộc ít nhất 1 câu: vì sao, và rủi ro bậc 2 là gì?)', 'Your reasoning (at least one sentence: why, and what is the second-order risk?)')}</span>
            <textarea value={reasoning} onChange={(e) => setReasoning(e.target.value)} rows={3} className="mt-1 w-full rounded-lg border border-line bg-bg px-3 py-2" />
          </label>
          <div className="flex flex-wrap gap-2">
            <Btn variant="primary" disabled={!choice || reasoning.trim().length < 15} onClick={commit}>
              {tx('Chốt quyết định & xem kết quả', 'Commit & reveal the outcome')}
            </Btn>
            <Btn
              variant="gold"
              disabled={!choice}
              onClick={() =>
                tutor.open({
                  mode: 'socratic',
                  draft: tx(
                    `Tôi chọn phương án ${choice?.toUpperCase()}: "${tr(c.options.find((o) => o.id === choice)!.label)}". Lập luận: ${reasoning || '…'} Hãy phản biện tôi trước khi tôi chốt (đừng tiết lộ kết quả thật).`,
                    `I pick option ${choice?.toUpperCase()}: "${tr(c.options.find((o) => o.id === choice)!.label)}". Reasoning: ${reasoning || '…'} Challenge me before I commit (do not reveal what actually happened).`,
                  ),
                })
              }
            >
              ✦ {tx('Nhờ AI phản biện trước khi chốt', 'Have the AI challenge me first')}
            </Btn>
          </div>
        </div>
      )}

      {stage === 3 && (
        <div className="space-y-5">
          {chosen && (
            <Card className={`p-4 ${chosen.verdict === 'best' ? 'border-up/60 bg-up/5' : chosen.verdict === 'poor' ? 'border-down/60 bg-down/5' : 'border-gold/60 bg-gold/5'}`}>
              <div className="mb-1 text-xs font-semibold uppercase tracking-widest">
                {chosen.verdict === 'best' ? tx('Quyết định tốt nhất', 'Best decision') : chosen.verdict === 'poor' ? tx('Quyết định kém', 'Poor decision') : tx('Quyết định một phần đúng', 'Partly right')}
              </div>
              <p className="text-sm font-semibold">{tr(chosen.label)}</p>
              <p className="mt-1 text-sm">{tr(chosen.feedback)}</p>
            </Card>
          )}
          <div className="grid gap-4 lg:grid-cols-3">
            {(
              [
                ['first', tx('Hệ quả bậc 1', 'First order'), 'border-t-up'],
                ['second', tx('Hệ quả bậc 2', 'Second order'), 'border-t-gold'],
                ['third', tx('Hệ quả bậc 3', 'Third order'), 'border-t-down'],
              ] as const
            ).map(([k, label, cls]) => (
              <Card key={k} className={`border-t-4 p-4 ${cls}`}>
                <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted">{label}</div>
                <Markdown className="!text-sm !leading-6">{tr(c.orders[k])}</Markdown>
              </Card>
            ))}
          </div>
          <Card className="p-4">
            <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-gold">{tx('Bài học chuyển giao', 'Transferable lessons')}</div>
            <Markdown>{tr(c.takeaways)}</Markdown>
          </Card>
          <details className="rounded-xl border border-line p-4 text-sm">
            <summary className="cursor-pointer font-semibold">{tx('Xem nhận xét cho mọi phương án', 'See feedback for every option')}</summary>
            <div className="mt-3 space-y-3">
              {c.options.map((o) => (
                <div key={o.id}>
                  <Tag tone={o.verdict === 'best' ? 'up' : o.verdict === 'poor' ? 'down' : 'gold'}>{o.id.toUpperCase()}</Tag> <span className="font-semibold">{tr(o.label)}</span>
                  <p className="mt-1 text-muted">{tr(o.feedback)}</p>
                </div>
              ))}
            </div>
          </details>
          <div className="flex flex-wrap gap-2">
            <Btn variant="gold" onClick={toJournal}>
              ✎ {tx('Lưu bài học vào Sổ tay', 'Save to the Journal')}
            </Btn>
            <Btn onClick={() => tutor.open({ mode: 'ask', draft: tx('Giải thích sâu hơn vì sao hệ quả bậc 2 của case này lại xảy ra, và tín hiệu nào lẽ ra có thể giúp dự báo nó.', 'Explain in more depth why the second-order effects of this case happened, and which signals could have predicted them.') })}>
              ✦ {tx('Đào sâu với Tutor', 'Dig deeper with the tutor')}
            </Btn>
            <Btn onClick={() => { setStage(2); setChoice(null); }}>↺ {tx('Thử quyết định lại', 'Decide again')}</Btn>
          </div>
          {c.linkedLessons.length > 0 && (
            <div className="text-sm">
              <span className="text-muted">{tx('Bài học liên quan: ', 'Related lessons: ')}</span>
              {c.linkedLessons.map((id) => {
                const f = findLesson(id);
                return f ? (
                  <Link key={id} to={`/lesson/${id}`} className="mr-3 text-up underline">
                    {tr(f.lesson.title)}
                  </Link>
                ) : null;
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

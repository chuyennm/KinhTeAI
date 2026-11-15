import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Markdown } from '../components/Markdown';
import { NotationBox } from '../components/NotationBox';
import { PythonRunner } from '../components/PythonRunner';
import { Quiz } from '../components/Quiz';
import { useTutor } from '../components/TutorContext';
import { Btn, Card, PageHeader, Tabs } from '../components/ui';
import { findLesson, LESSON_TABS, nextLesson, type LessonTab } from '../data/curriculum';
import { db, logActivity, useStore } from '../db/indexedDb';
import { useI18n } from '../i18n';
import { SIMULATORS } from '../simulators';

export function LessonPage() {
  const { lessonId = '' } = useParams();
  const { tx, tr } = useI18n();
  const tutor = useTutor();
  const navigate = useNavigate();
  const found = findLesson(lessonId);
  const progress = useStore('progress').find((p) => p.lessonId === lessonId);
  const [tab, setTab] = useState<LessonTab>('core');
  const [predict, setPredict] = useState('');

  useEffect(() => setTab('core'), [lessonId]);

  // Mark each tab as visited.
  useEffect(() => {
    if (!found) return;
    (async () => {
      const p = (await db.get('progress', lessonId)) ?? { lessonId, tabs: [], bestScore: null, completedAt: null, updatedAt: 0 };
      if (!p.tabs.includes(tab)) {
        await db.put('progress', { ...p, tabs: [...p.tabs, tab], updatedAt: Date.now() });
        logActivity();
      }
    })();
  }, [tab, lessonId, found]);

  // Give the tutor what is on screen.
  useEffect(() => {
    if (!found) return;
    const { lesson, module } = found;
    const body = tab === 'examples' ? tr(lesson.examples) : tab === 'lab' ? tr(lesson.lab.mission) : tr(lesson.core);
    tutor.setStudyContext(`Module ${module.index}: ${module.title.en}\nLesson: ${lesson.title.en}\nTab: ${tab}\n\n${body}`);
  }, [found, tab, tr, tutor]);

  if (!found) {
    return (
      <p>
        {tx('Không tìm thấy bài học.', 'Lesson not found.')} <Link to="/learn" className="text-up underline">{tx('Về lộ trình', 'Back to curriculum')}</Link>
      </p>
    );
  }
  const { lesson, module } = found;
  const next = nextLesson(lesson.id);
  const visited = progress?.tabs ?? [];
  const labels: Record<LessonTab, string> = {
    core: tx('Bản chất cốt lõi', 'Core intuition'),
    examples: tx('Ví dụ thực tế', 'Real-world examples'),
    lab: tx('Phòng thí nghiệm', 'Lab'),
    quiz: tx('Kiểm tra tư duy', 'Concept check'),
  };

  async function finishQuiz(score: number) {
    const p = (await db.get('progress', lesson.id)) ?? { lessonId: lesson.id, tabs: [], bestScore: null, completedAt: null, updatedAt: 0 };
    const best = Math.max(score, p.bestScore ?? 0);
    await db.put('progress', {
      ...p,
      bestScore: best,
      completedAt: p.completedAt ?? (score >= 50 ? Date.now() : null),
      updatedAt: Date.now(),
    });
  }

  const lab = lesson.lab;
  const Sim = lab.kind === 'sim' ? SIMULATORS[lab.sim].Component : null;

  return (
    <div>
      <PageHeader
        kicker={
          <Link to={`/learn/${module.id}`} className="hover:underline">
            Module {module.index} · {tr(module.title)}
          </Link>
        }
        title={tr(lesson.title)}
        sub={tr(lesson.summary)}
        right={
          <div className="flex gap-2">
            <Btn variant="gold" onClick={() => tutor.open({ mode: 'ask' })}>
              ✦ {tx('Hỏi Tutor', 'Ask tutor')}
            </Btn>
            <Btn onClick={() => tutor.open({ mode: 'feynman', draft: tx(`Tôi sẽ giải thích "${lesson.title.vi}" bằng lời của mình: `, `Let me explain "${lesson.title.en}" in my own words: `) })}>
              {tx('Giải thích lại (Feynman)', 'Explain it back')}
            </Btn>
          </div>
        }
      />

      <Tabs tabs={LESSON_TABS.map((id) => ({ id, label: labels[id], done: visited.includes(id) || (id === 'quiz' && progress?.bestScore != null) }))} value={tab} onChange={setTab} />

      <div className="pt-5">
        {tab === 'core' && (
          <div className="grid gap-6 lg:grid-cols-[1fr_260px]">
            <div className="min-w-0">
              {!visited.includes('quiz') && (
                <Card className="mb-5 border-gold/40 p-4">
                  <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-gold">{tx('Dự đoán trước khi đọc', 'Predict before reading')}</div>
                  <p className="text-sm text-muted">
                    {tx(
                      'Đọc tình huống đầu tiên của phần Kiểm tra tư duy và ghi lại câu trả lời bạn đoán. Dự đoán sai rồi được sửa giúp nhớ lâu hơn nhiều so với đọc thụ động.',
                      'Read the first Concept-check scenario and jot down your guess. Being wrong and then corrected is remembered far better than passive reading.',
                    )}
                  </p>
                  <p className="mt-2 text-sm italic">{tr(lesson.quiz[0].scenario)}</p>
                  <input value={predict} onChange={(e) => setPredict(e.target.value)} placeholder={tx('Dự đoán của tôi…', 'My guess…')} className="mt-2 w-full rounded-lg border border-line bg-bg px-3 py-2 text-sm" />
                </Card>
              )}
              <NotationBox lessonId={lesson.id} />
              <Markdown>{tr(lesson.core)}</Markdown>
            </div>
            <aside className="space-y-3 text-sm">
              <Card className="p-4">
                <div className="text-xs uppercase tracking-widest text-muted">{tx('Thời lượng', 'Time')}</div>
                <div className="num text-lg font-semibold">{lesson.minutes} {tx('phút', 'min')}</div>
              </Card>
              <Card className="p-4">
                <div className="mb-1 text-xs uppercase tracking-widest text-muted">{tx('Cách học bài này', 'How to study this')}</div>
                <ol className="list-decimal space-y-1 pl-4 text-muted">
                  <li>{tx('Đọc lõi, chép tay công thức một lần', 'Read the core, copy the formulas by hand once')}</li>
                  <li>{tx('Tự tính lại ví dụ trước khi xem đáp án', 'Rework the examples before looking at the answers')}</li>
                  <li>{tx('Làm nhiệm vụ trong phòng thí nghiệm', 'Do the lab mission')}</li>
                  <li>{tx('Kiểm tra tư duy kèm mức tự tin', 'Concept check with confidence')}</li>
                  <li>{tx('Giải thích lại cho Tutor (Feynman)', 'Explain it back to the tutor')}</li>
                </ol>
              </Card>
            </aside>
          </div>
        )}

        {tab === 'examples' && (
          <div className="max-w-3xl">
            <NotationBox lessonId={lesson.id} open={false} />
            <Markdown>{tr(lesson.examples)}</Markdown>
          </div>
        )}

        {tab === 'lab' && (
          <div className="space-y-4">
            <NotationBox lessonId={lesson.id} open={false} />
            <Card className="border-gold/40 bg-gold/5 p-4">
              <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-gold">{tx('Nhiệm vụ', 'Mission')}</div>
              <p className="text-sm">{tr(lab.mission)}</p>
            </Card>
            {Sim ? (
              <Sim />
            ) : lab.kind === 'python' ? (
              <>
                <PythonRunner initialCode={lab.code} title={lesson.title.en} resetKey={lesson.id} />
                <Btn onClick={() => navigate('/lab', { state: { code: lab.code } })}>{tx('Mở trong Python Lab toàn màn hình →', 'Open in the full Python Lab →')}</Btn>
              </>
            ) : null}
          </div>
        )}

        {tab === 'quiz' && <Quiz key={lesson.id} lessonId={lesson.id} questions={lesson.quiz} onFinish={finishQuiz} />}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
        <Link to={`/learn/${module.id}`} className="text-sm text-muted hover:text-ink">
          ← {tr(module.title)}
        </Link>
        {next && (
          <Link to={`/lesson/${next.lesson.id}`} className="rounded-lg bg-up px-4 py-2 text-sm font-semibold text-navy hover:bg-up/90">
            {tx('Bài tiếp theo', 'Next lesson')}: {tr(next.lesson.title)} →
          </Link>
        )}
      </div>
    </div>
  );
}

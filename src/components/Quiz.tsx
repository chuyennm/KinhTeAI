import { useState } from 'react';
import { db, logActivity } from '../db/indexedDb';
import { useI18n } from '../i18n';
import { ensureCard } from '../services/srs';
import type { QuizQuestion } from '../types';
import { Markdown } from './Markdown';
import { Btn, Card } from './ui';

interface Answer {
  choice: number;
  confidence: number;
}

/**
 * Scenario questions with a confidence rating before the reveal. Stating confidence first
 * is what lets the dashboard measure calibration (are you right as often as you think?).
 */
export function Quiz({
  lessonId,
  questions,
  onFinish,
}: {
  lessonId: string;
  questions: QuizQuestion[];
  onFinish: (score: number) => void;
}) {
  const { tx, tr } = useI18n();
  const [picked, setPicked] = useState<Record<string, number>>({});
  const [conf, setConf] = useState<Record<string, number>>({});
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [round, setRound] = useState(0);

  const CONF = [
    { v: 55, label: tx('Đoán', 'Guessing') },
    { v: 75, label: tx('Khá chắc', 'Fairly sure') },
    { v: 95, label: tx('Rất chắc', 'Very sure') },
  ];

  async function submit(q: QuizQuestion) {
    const choice = picked[q.id];
    const confidence = conf[q.id];
    if (choice === undefined || confidence === undefined) return;
    const correct = !!q.options[choice].correct;
    const next = { ...answers, [q.id]: { choice, confidence } };
    setAnswers(next);
    await db.put('attempts', { questionId: q.id, lessonId, correct, confidence, ts: Date.now() });
    if (!correct) await ensureCard(`q:${q.id}`, Date.now() + 86_400_000); // re-ask tomorrow
    logActivity();
    if (Object.keys(next).length === questions.length) {
      const right = questions.filter((qq) => qq.options[next[qq.id].choice].correct).length;
      onFinish(Math.round((right / questions.length) * 100));
    }
  }

  function retry() {
    setPicked({});
    setConf({});
    setAnswers({});
    setRound((r) => r + 1);
  }

  const done = Object.keys(answers).length === questions.length;
  const right = questions.filter((q) => answers[q.id] && q.options[answers[q.id].choice].correct).length;

  return (
    <div className="space-y-5" key={round}>
      <p className="text-sm text-muted">
        {tx(
          'Chọn đáp án VÀ mức tự tin trước khi xem kết quả. Chuyên gia giỏi không phải người luôn đúng, mà là người biết mình chắc đến đâu.',
          'Pick an answer AND a confidence level before the reveal. A good analyst is not always right — but knows how sure to be.',
        )}
      </p>
      {questions.map((q, qi) => {
        const a = answers[q.id];
        return (
          <Card key={q.id} className="p-4 sm:p-5">
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-gold">
              {tx('Tình huống', 'Scenario')} {qi + 1}/{questions.length}
            </div>
            <Markdown>{tr(q.scenario)}</Markdown>
            <div className="mt-3 space-y-2">
              {q.options.map((o, oi) => {
                const chosen = (a ? a.choice : picked[q.id]) === oi;
                let cls = 'border-line hover:border-muted';
                if (a) {
                  if (o.correct) cls = 'border-up bg-up/10';
                  else if (chosen) cls = 'border-down bg-down/10';
                  else cls = 'border-line opacity-80';
                } else if (chosen) cls = 'border-gold bg-gold/10';
                return (
                  <button
                    key={oi}
                    disabled={!!a}
                    onClick={() => setPicked((p) => ({ ...p, [q.id]: oi }))}
                    className={`block w-full rounded-lg border px-3 py-2.5 text-left text-sm transition ${cls}`}
                  >
                    <div className="flex gap-2">
                      <span className="num font-semibold text-muted">{String.fromCharCode(65 + oi)}.</span>
                      <span className="flex-1">{tr(o.text)}</span>
                      {a && o.correct && <span className="text-up">✓</span>}
                      {a && chosen && !o.correct && <span className="text-down">✗</span>}
                    </div>
                    {a && (
                      <div className={`mt-1.5 border-t border-line/70 pt-1.5 text-[13px] ${o.correct ? 'text-ink' : 'text-muted'}`}>
                        <span className={`font-semibold ${o.correct ? 'text-up' : 'text-down'}`}>
                          {o.correct ? tx('Đúng vì: ', 'Right because: ') : tx('Sai vì: ', 'Wrong because: ')}
                        </span>
                        {tr(o.why)}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            {!a && (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-xs text-muted">{tx('Mức tự tin:', 'Confidence:')}</span>
                {CONF.map((c) => (
                  <button
                    key={c.v}
                    onClick={() => setConf((p) => ({ ...p, [q.id]: c.v }))}
                    className={`rounded-full border px-2.5 py-1 text-xs ${
                      conf[q.id] === c.v ? 'border-gold bg-gold/15 text-gold font-semibold' : 'border-line text-muted hover:text-ink'
                    }`}
                  >
                    {c.label} · {c.v}%
                  </button>
                ))}
                <Btn
                  variant="primary"
                  className="ml-auto"
                  disabled={picked[q.id] === undefined || conf[q.id] === undefined}
                  onClick={() => submit(q)}
                >
                  {tx('Kiểm tra', 'Check')}
                </Btn>
              </div>
            )}
          </Card>
        );
      })}
      {done && (
        <Card className="flex flex-wrap items-center gap-3 p-4">
          <div className="num text-2xl font-semibold">
            <span className={right === questions.length ? 'text-up' : 'text-gold'}>{right}</span>/{questions.length}
          </div>
          <p className="flex-1 text-sm text-muted">
            {right === questions.length
              ? tx('Chính xác. Bài này được đánh dấu hoàn thành.', 'All correct. This lesson is marked complete.')
              : tx('Câu sai đã được đưa vào hàng đợi Ôn tập để hỏi lại vào ngày mai.', 'Missed questions were queued in Review and will come back tomorrow.')}
          </p>
          <Btn onClick={retry}>↺ {tx('Làm lại', 'Retry')}</Btn>
        </Card>
      )}
    </div>
  );
}

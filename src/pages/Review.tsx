import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Markdown } from '../components/Markdown';
import { Btn, Card, PageHeader } from '../components/ui';
import { findQuestion } from '../data/curriculum';
import { glossary } from '../data/glossary';
import { logActivity, useStore } from '../db/indexedDb';
import { useI18n } from '../i18n';
import { ensureCard, gradeCard, isDue, type Grade } from '../services/srs';

export function ReviewPage() {
  const { tx, tr } = useI18n();
  const srs = useStore('srs');
  const progress = useStore('progress');
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState(0);

  // Glossary cards unlock once their lesson has been opened.
  useEffect(() => {
    const opened = new Set(progress.map((p) => p.lessonId));
    glossary.filter((g) => opened.has(g.lesson)).forEach((g) => ensureCard(`g:${g.id}`));
  }, [progress]);

  const queue = useMemo(() => srs.filter((s) => isDue(s)).sort((a, b) => a.due - b.due), [srs]);
  const card = queue[0];
  const upcoming = srs.filter((s) => !isDue(s)).sort((a, b) => a.due - b.due);

  async function grade(g: Grade) {
    if (!card) return;
    await gradeCard(card.cardId, g);
    logActivity();
    setFlipped(false);
    setDone((d) => d + 1);
  }

  let front: ReactNode = null;
  let back: ReactNode = null;
  let source: ReactNode = null;
  if (card?.cardId.startsWith('g:')) {
    const term = glossary.find((g) => `g:${g.id}` === card.cardId);
    if (term) {
      front = <div className="font-serif text-2xl font-semibold">{tr(term.term)}</div>;
      back = <p className="text-base">{tr(term.def)}</p>;
      source = <Link to={`/lesson/${term.lesson}`} className="text-xs text-up underline">{tx('Mở bài học', 'Open lesson')}</Link>;
    }
  } else if (card?.cardId.startsWith('q:')) {
    const found = findQuestion(card.cardId.slice(2));
    if (found) {
      const right = found.question.options.find((o) => o.correct);
      front = <Markdown>{tr(found.question.scenario)}</Markdown>;
      back = (
        <div className="text-sm">
          <div className="font-semibold text-up">{right && tr(right.text)}</div>
          <p className="mt-1 text-muted">{right && tr(right.why)}</p>
        </div>
      );
      source = <Link to={`/lesson/${found.lesson.id}`} className="text-xs text-up underline">{tr(found.lesson.title)}</Link>;
    }
  }

  return (
    <div className="max-w-3xl">
      <PageHeader
        kicker={tx('Lặp lại ngắt quãng', 'Spaced repetition')}
        title={tx('Ôn tập', 'Review')}
        sub={tx(
          'Thẻ thuật ngữ mở khóa khi bạn học bài tương ứng; câu trả lời sai được đưa vào đây tự động. Hãy cố nhớ lại TRƯỚC khi lật thẻ: chính nỗ lực nhớ lại mới làm kiến thức bám chắc.',
          'Term cards unlock as you open lessons; wrong answers land here automatically. Try to recall BEFORE flipping: the effort of retrieval is what makes knowledge stick.',
        )}
      />
      <div className="mb-3 flex justify-between text-sm text-muted">
        <span>
          {tx('Đến hạn', 'Due')}: <span className="num text-ink">{queue.length}</span>
        </span>
        <span>
          {tx('Đã ôn phiên này', 'Reviewed this session')}: <span className="num text-ink">{done}</span>
        </span>
      </div>
      {!card ? (
        <Card className="p-8 text-center">
          <div className="text-3xl text-up">✓</div>
          <p className="mt-2 text-sm text-muted">
            {srs.length === 0
              ? tx('Chưa có thẻ nào. Mở một bài học để mở khóa thẻ thuật ngữ.', 'No cards yet. Open a lesson to unlock its term cards.')
              : tx('Không còn thẻ đến hạn. Quay lại vào ngày mai.', 'Nothing due. Come back tomorrow.')}
          </p>
          {upcoming[0] && (
            <p className="mt-1 text-xs text-muted">
              {tx('Thẻ tiếp theo', 'Next card')}: {new Date(upcoming[0].due).toLocaleString()}
            </p>
          )}
        </Card>
      ) : (
        <Card className="p-6">
          <div className="min-h-[120px]">{front}</div>
          {flipped ? (
            <>
              <div className="my-4 border-t border-line pt-4">{back}</div>
              <div className="mb-3">{source}</div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                <Btn variant="danger" onClick={() => grade(0)}>{tx('Quên', 'Forgot')}</Btn>
                <Btn onClick={() => grade(3)}>{tx('Khó', 'Hard')}</Btn>
                <Btn variant="primary" onClick={() => grade(4)}>{tx('Nhớ', 'Good')}</Btn>
                <Btn variant="gold" onClick={() => grade(5)}>{tx('Dễ', 'Easy')}</Btn>
              </div>
            </>
          ) : (
            <Btn variant="primary" className="mt-4 w-full" onClick={() => setFlipped(true)}>
              {tx('Lật thẻ', 'Show answer')}
            </Btn>
          )}
        </Card>
      )}
    </div>
  );
}

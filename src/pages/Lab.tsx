import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PythonRunner } from '../components/PythonRunner';
import { useTutor } from '../components/TutorContext';
import { Btn, Card, PageHeader } from '../components/ui';
import { allLessons } from '../data/curriculum';
import datasets from '../data/macroDatasets.json';
import { db, useStore } from '../db/indexedDb';
import { useI18n } from '../i18n';

const STARTER = `# KinhTeAI Python Lab — numpy, pandas and scipy run locally in your browser.
datasets()                       # list the bundled datasets

vn = load('vn_macro')
print(vn.tail())

# Hypothesis: faster credit growth this year means higher inflation next year
x = vn.credit_growth[:-1].values
y = vn.cpi_yoy[1:].values
res = ols(y, x, names=['credit_growth_lag1'])
chart(x, y, kind='scatter', fit=True, title='Vietnam: credit growth (t) vs CPI (t+1)',
      xlabel='Credit growth %', ylabel='CPI next year %')
`;

export function LabPage() {
  const { tx, tr } = useI18n();
  const tutor = useTutor();
  const location = useLocation();
  const snippets = useStore('snippets').sort((a, b) => b.updatedAt - a.updatedAt);
  const fromState = (location.state as { code?: string } | null)?.code;
  const [code, setCode] = useState(fromState ?? STARTER);
  const [key, setKey] = useState(fromState ? 'state' : 'starter');

  useEffect(() => {
    tutor.setStudyContext('The learner is in the Python Lab with bundled datasets: ' + Object.keys(datasets).join(', '));
  }, [tutor]);

  const load = (c: string, k: string) => {
    setCode(c);
    setKey(k);
  };
  const pythonLessons = allLessons.filter((x) => x.lesson.lab.kind === 'python');

  return (
    <div>
      <PageHeader
        kicker="Module 6"
        title="Python Lab"
        sub={tx(
          'Python thật (Pyodide/WebAssembly) chạy ngay trong trình duyệt, không cần máy chủ. Lần đầu tải khoảng 15 MB, sau đó hoạt động offline.',
          'Real Python (Pyodide/WebAssembly) running in your browser with no server. About 15 MB on first load, then it works offline.',
        )}
      />
      <PythonRunner initialCode={code} resetKey={key} />

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="p-4">
          <div className="mb-2 text-sm font-semibold">{tx('Bộ dữ liệu có sẵn', 'Bundled datasets')}</div>
          <ul className="space-y-2 text-sm">
            {Object.entries(datasets as Record<string, any>).map(([k, d]) => (
              <li key={k}>
                <code className="rounded bg-panel2 px-1.5 py-0.5 font-mono text-xs text-gold">load('{k}')</code>
                <div className="text-muted">{tr(d.title)}</div>
                <div className="text-[11px] text-muted/80">{Object.keys(d.columns).join(', ')}</div>
                <div className="text-[11px] text-muted/80">{tx('Nguồn', 'Source')}: {d.source}</div>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="p-4">
          <div className="mb-2 text-sm font-semibold">{tx('Bài tập Python theo bài học', 'Lesson notebooks')}</div>
          <ul className="space-y-1 text-sm">
            <li>
              <button className="text-left text-muted hover:text-ink" onClick={() => load(STARTER, 'starter')}>
                ▸ {tx('Mẫu khởi đầu', 'Starter')}
              </button>
            </li>
            {pythonLessons.map(({ lesson, module }) => (
              <li key={lesson.id}>
                <button className="text-left text-muted hover:text-ink" onClick={() => lesson.lab.kind === 'python' && load(lesson.lab.code, lesson.id)}>
                  ▸ M{module.index} · {tr(lesson.title)}
                </button>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="p-4">
          <div className="mb-2 text-sm font-semibold">{tx('Snippet đã lưu', 'Saved snippets')}</div>
          {snippets.length === 0 ? (
            <p className="text-sm text-muted">{tx('Chưa có. Bấm "Lưu snippet" trong editor.', 'None yet. Press "Save snippet" in the editor.')}</p>
          ) : (
            <ul className="space-y-1.5 text-sm">
              {snippets.map((s) => (
                <li key={s.id} className="flex items-center gap-2">
                  <button className="min-w-0 flex-1 truncate text-left text-muted hover:text-ink" onClick={() => load(s.code, s.id + s.updatedAt)}>
                    ▸ {s.title}
                  </button>
                  <Btn variant="danger" className="!px-2 !py-0.5 !text-xs" onClick={() => db.del('snippets', s.id)}>
                    ×
                  </Btn>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
      <Card className="mt-4 p-4 text-sm text-muted">
        <span className="font-semibold text-ink">{tx('Hàm hỗ trợ: ', 'Helpers: ')}</span>
        <code className="font-mono text-xs">load(name)</code> · <code className="font-mono text-xs">datasets()</code> ·{' '}
        <code className="font-mono text-xs">chart(x, y | {'{name: y}'}, kind='line'|'scatter'|'bar', fit=False)</code> ·{' '}
        <code className="font-mono text-xs">ols(y, X, names=None)</code> {tx('→ hệ số, sai số chuẩn, t, p, R²', '→ coef, se, t, p, R²')}
      </Card>
    </div>
  );
}

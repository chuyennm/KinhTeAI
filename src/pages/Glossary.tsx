import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, PageHeader, inputCls } from '../components/ui';
import { findLesson } from '../data/curriculum';
import { glossary } from '../data/glossary';
import { useI18n } from '../i18n';

export function GlossaryPage() {
  const { tx, tr, lang } = useI18n();
  const [q, setQ] = useState('');
  const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const items = glossary
    .filter((g) => !q || norm(`${g.term.vi} ${g.term.en} ${g.def.vi} ${g.def.en}`).includes(norm(q)))
    .sort((a, b) => tr(a.term).localeCompare(tr(b.term), lang));

  return (
    <div>
      <PageHeader
        kicker={tx('Từ điển song ngữ', 'Bilingual glossary')}
        title={tx('Thuật ngữ', 'Glossary')}
        sub={tx('Mỗi thuật ngữ có cả tiếng Việt và tiếng Anh, vì tài liệu chuyên ngành và dữ liệu quốc tế đều dùng tiếng Anh.', 'Every term in Vietnamese and English, because professional material and global data use English.')}
      />
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={tx('Tìm thuật ngữ…', 'Search terms…')} className={`${inputCls} mb-4 max-w-md`} />
      <div className="grid gap-3 md:grid-cols-2">
        {items.map((g) => {
          const l = findLesson(g.lesson);
          return (
            <Card key={g.id} className="p-4">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <span className="font-semibold">{tr(g.term)}</span>
                <span className="text-sm text-muted">{lang === 'vi' ? g.term.en : g.term.vi}</span>
              </div>
              <p className="mt-1 text-sm">{tr(g.def)}</p>
              {l && (
                <Link to={`/lesson/${g.lesson}`} className="mt-1 inline-block text-xs text-up underline">
                  M{l.module.index} · {tr(l.lesson.title)}
                </Link>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

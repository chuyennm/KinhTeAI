import katex from 'katex';
import { notation } from '../data/notation';
import { useI18n } from '../i18n';

function tex(src: string) {
  try {
    return katex.renderToString(src, { throwOnError: false, strict: 'ignore' });
  } catch {
    return src;
  }
}

/** "Symbols in this lesson": every variable used in the formulas, in plain language. */
export function NotationBox({ lessonId, open = true }: { lessonId: string; open?: boolean }) {
  const { tx, tr } = useI18n();
  const items = notation[lessonId];
  if (!items?.length) return null;
  return (
    <details open={open} className="group mb-5 rounded-xl border border-gold/40 bg-gold/5">
      <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm font-semibold">
        <span className="text-gold">∑</span>
        {tx('Ký hiệu trong bài: mỗi chữ cái nghĩa là gì?', 'Symbols in this lesson: what does each letter mean?')}
        <span className="ml-auto text-xs font-normal text-muted group-open:hidden">{tx('bấm để mở', 'tap to open')}</span>
        <span className="ml-auto hidden text-xs font-normal text-muted group-open:inline">{tx('bấm để thu gọn', 'tap to collapse')}</span>
      </summary>
      <dl className="divide-y divide-line/70 border-t border-gold/30 px-4 pb-2">
        {items.map((it, i) => (
          <div key={i} className="grid grid-cols-[minmax(84px,auto)_1fr] gap-3 py-2 text-sm sm:grid-cols-[150px_1fr]">
            <dt className="overflow-x-auto text-ink" dangerouslySetInnerHTML={{ __html: tex(typeof it.sym === 'string' ? it.sym : tr(it.sym)) }} />
            <dd className="text-muted">{tr(it.def)}</dd>
          </div>
        ))}
      </dl>
    </details>
  );
}

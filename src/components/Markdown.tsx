import { useMemo } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import katex from 'katex';
import 'katex/dist/katex.min.css';

function tex(src: string, displayMode: boolean): string {
  try {
    return katex.renderToString(src.trim(), { displayMode, throwOnError: false, output: 'html', strict: 'ignore' });
  } catch {
    return src;
  }
}

/** Markdown + KaTeX → sanitized HTML. Math is rendered first and re-inserted after sanitizing. */
export function renderMarkdown(src: string): string {
  const stash: string[] = [];
  const put = (html: string) => {
    stash.push(html);
    return `@@KTX${stash.length - 1}@@`;
  };
  // Leave fenced code blocks untouched so "$" inside code is not treated as math.
  const parts = src.split(/(```[\s\S]*?```)/g).map((seg, i) => {
    if (i % 2 === 1) return seg;
    return seg
      .replace(/\$\$([\s\S]+?)\$\$/g, (_, m) => put(tex(m, true)))
      .replace(/\\\[([\s\S]+?)\\\]/g, (_, m) => put(tex(m, true)))
      .replace(/\\\(([\s\S]+?)\\\)/g, (_, m) => put(tex(m, false)))
      .replace(/\$(?!\s)([^$\n]+?)(?<!\s)\$/g, (_, m) => put(tex(m, false)));
  });
  const html = marked.parse(parts.join(''), { async: false, gfm: true }) as string;
  const safe = DOMPurify.sanitize(html, { ADD_ATTR: ['target'] });
  return safe.replace(/@@KTX(\d+)@@/g, (_, i) => stash[Number(i)] ?? '');
}

export function Markdown({ children, className = '' }: { children: string; className?: string }) {
  const html = useMemo(() => renderMarkdown(children ?? ''), [children]);
  return <div className={`prose-k ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
}

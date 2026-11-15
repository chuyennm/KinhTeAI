import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { L, Lang } from './types';

interface I18n {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** Pick an inline UI string. */
  tx: (vi: string, en: string) => string;
  /** Pick a bilingual content value. */
  tr: (l: L) => string;
}

const Ctx = createContext<I18n | null>(null);
const KEY = 'kinhteai.lang';

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem(KEY);
    if (saved === 'vi' || saved === 'en') return saved;
    return navigator.language?.toLowerCase().startsWith('vi') ? 'vi' : 'en';
  });

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    localStorage.setItem(KEY, l);
    setLangState(l);
  }, []);

  const value = useMemo<I18n>(
    () => ({
      lang,
      setLang,
      tx: (vi, en) => (lang === 'vi' ? vi : en),
      tr: (l) => l[lang] || l.vi || l.en,
    }),
    [lang, setLang],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n(): I18n {
  const v = useContext(Ctx);
  if (!v) throw new Error('useI18n must be used inside I18nProvider');
  return v;
}

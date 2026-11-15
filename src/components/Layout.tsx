import { useEffect, useState, type ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useI18n } from '../i18n';
import { TutorDrawer } from './TutorDrawer';
import { useTutor } from './TutorContext';

const THEME_KEY = 'kinhteai.theme';

function useTheme(): [string, () => void] {
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) ?? 'dark');
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);
  return [theme, () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))];
}

function useOnline(): boolean {
  const [online, setOnline] = useState(navigator.onLine);
  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => {
      window.removeEventListener('online', on);
      window.removeEventListener('offline', off);
    };
  }, []);
  return online;
}

export function Layout({ children }: { children: ReactNode }) {
  const { tx, lang, setLang } = useI18n();
  const tutor = useTutor();
  const [theme, toggleTheme] = useTheme();
  const online = useOnline();
  const location = useLocation();
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    setMenu(false);
    document.getElementById('main-scroll')?.scrollTo({ top: 0 });
  }, [location.pathname]);

  const nav = [
    { to: '/', icon: '◧', label: tx('Hôm nay', 'Today'), end: true },
    { to: '/learn', icon: '▤', label: tx('Lộ trình học', 'Curriculum') },
    { to: '/cases', icon: '◈', label: tx('Case Study', 'Case studies') },
    { to: '/tools', icon: '◔', label: tx('Mô phỏng', 'Simulators') },
    { to: '/lab', icon: '⌘', label: 'Python Lab' },
    { to: '/review', icon: '↻', label: tx('Ôn tập', 'Review') },
    { to: '/journal', icon: '✎', label: tx('Sổ tay luận điểm', 'Thesis journal') },
    { to: '/glossary', icon: '≡', label: tx('Thuật ngữ', 'Glossary') },
    { to: '/guide', icon: '◎', label: tx('Phương pháp học', 'How to learn') },
    { to: '/settings', icon: '⚙', label: tx('Cài đặt', 'Settings') },
  ];

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
      isActive ? 'bg-white/10 text-white font-semibold' : 'text-slate-300 hover:bg-white/5 hover:text-white'
    }`;

  const sidebar = (
    <nav className="flex h-full flex-col bg-navy text-offwhite">
      <div className="flex items-center gap-2.5 border-b border-white/10 px-4 py-4">
        <img src={`${import.meta.env.BASE_URL}favicon.svg`} alt="" className="h-8 w-8 rounded-lg" />
        <div>
          <div className="font-serif text-lg font-semibold leading-none">
            KinhTe<span className="text-gold">AI</span>
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-slate-400">
            {tx('Kinh tế · Tài chính', 'Economics · Finance')}
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-0.5 overflow-y-auto p-2">
        {nav.map((n) => (
          <NavLink key={n.to} to={n.to} end={n.end} className={linkCls}>
            <span className="w-4 text-center text-gold/90">{n.icon}</span>
            {n.label}
          </NavLink>
        ))}
      </div>
      <div className="flex items-center gap-2 border-t border-white/10 px-4 py-3 text-[11px] text-slate-400">
        <span className={`h-2 w-2 rounded-full ${online ? 'bg-up' : 'bg-gold'}`} />
        {online ? tx('Trực tuyến', 'Online') : tx('Ngoại tuyến — vẫn học được', 'Offline — still works')}
      </div>
    </nav>
  );

  return (
    <div className="flex h-full">
      <div className="hidden w-60 shrink-0 border-r border-line lg:block">{sidebar}</div>
      {menu && (
        <div className="fixed inset-0 z-30 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMenu(false)} />
          <div className="absolute inset-y-0 left-0 w-64 shadow-2xl">{sidebar}</div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-2 border-b border-line bg-panel px-3 py-2 sm:px-5">
          <button className="rounded-lg border border-line px-2.5 py-1.5 text-sm lg:hidden" onClick={() => setMenu(true)} aria-label="Menu">
            ☰
          </button>
          <span className="font-serif font-semibold lg:hidden">
            KinhTe<span className="text-gold">AI</span>
          </span>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex overflow-hidden rounded-lg border border-line text-xs">
              {(['vi', 'en'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1.5 ${lang === l ? 'bg-ink text-bg font-semibold' : 'text-muted hover:text-ink'}`}
                  aria-pressed={lang === l}
                >
                  {l === 'vi' ? 'VI' : 'EN'}
                </button>
              ))}
            </div>
            <button
              onClick={toggleTheme}
              className="rounded-lg border border-line px-2.5 py-1.5 text-xs text-muted hover:text-ink"
              title={tx('Đổi giao diện sáng/tối', 'Toggle light/dark')}
            >
              {theme === 'dark' ? '☀' : '☾'}
            </button>
            <button
              onClick={() => (tutor.isOpen ? tutor.close() : tutor.open())}
              className="rounded-lg bg-gold px-3 py-1.5 text-xs font-semibold text-navy hover:bg-gold/90"
            >
              ✦ AI Tutor
            </button>
          </div>
        </div>
        <main id="main-scroll" className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
      <TutorDrawer />
    </div>
  );
}

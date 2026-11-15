import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react';
import type { TutorMode } from '../services/aiService';

interface OpenOpts {
  mode?: TutorMode;
  /** Text placed in the input box, ready to edit and send. */
  draft?: string;
}

interface TutorApi {
  isOpen: boolean;
  mode: TutorMode;
  draft: string;
  /** Bumps whenever open() is called with a draft, so the drawer can pick it up. */
  draftVersion: number;
  open: (opts?: OpenOpts) => void;
  close: () => void;
  setMode: (m: TutorMode) => void;
  /** Pages describe what is on screen so the tutor can ground its answers. */
  setStudyContext: (text: string) => void;
  getStudyContext: () => string;
}

const Ctx = createContext<TutorApi | null>(null);

export function TutorProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [mode, setMode] = useState<TutorMode>('ask');
  const [draft, setDraft] = useState('');
  const [draftVersion, setDraftVersion] = useState(0);
  const context = useRef('');

  const open = useCallback((opts?: OpenOpts) => {
    if (opts?.mode) setMode(opts.mode);
    if (opts?.draft !== undefined) {
      setDraft(opts.draft);
      setDraftVersion((v) => v + 1);
    }
    setOpen(true);
  }, []);

  const value = useMemo<TutorApi>(
    () => ({
      isOpen,
      mode,
      draft,
      draftVersion,
      open,
      close: () => setOpen(false),
      setMode,
      setStudyContext: (t: string) => {
        context.current = t;
      },
      getStudyContext: () => context.current,
    }),
    [isOpen, mode, draft, draftVersion, open],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useTutor(): TutorApi {
  const v = useContext(Ctx);
  if (!v) throw new Error('useTutor must be used inside TutorProvider');
  return v;
}

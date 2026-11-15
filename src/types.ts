/** A bilingual string. Vietnamese is the primary language; English mirrors it. */
export interface L {
  vi: string;
  en: string;
}
export type Lang = keyof L;

/** Shorthand constructor for bilingual strings. */
export const b = (vi: string, en: string): L => ({ vi, en });

export type SimId = 'supply-demand' | 'central-bank' | 'yield-curve' | 'ratio-analyzer' | 'dcf' | 'python-lab';

export interface QuizOption {
  text: L;
  correct?: boolean;
  /** Why this option is right or wrong. Shown after answering. */
  why: L;
}

export interface QuizQuestion {
  id: string;
  scenario: L;
  options: QuizOption[];
}

export type Lab =
  | { kind: 'sim'; sim: Exclude<SimId, 'python-lab'>; mission: L }
  | { kind: 'python'; code: string; mission: L };

export interface Lesson {
  id: string;
  title: L;
  minutes: number;
  summary: L;
  /** Tab 1 — core intuition & formulas (Markdown + KaTeX). */
  core: L;
  /** Tab 2 — worked numerical examples from Vietnam and global markets. */
  examples: L;
  /** Tab 3 — interactive simulator or pre-loaded Python lab, with an active-learning mission. */
  lab: Lab;
  /** Tab 4 — scenario-based concept check. */
  quiz: QuizQuestion[];
}

export interface Module {
  id: string;
  index: number;
  title: L;
  subtitle: L;
  /** What the learner can do after finishing the module. */
  outcome: L;
  tool: SimId;
  /** Capstone assignment that becomes a draft in the Thesis Journal. */
  capstone: L;
  lessons: Lesson[];
}

export interface CaseDataPoint {
  label: L;
  value: string;
  note?: L;
}

export interface CaseOption {
  id: string;
  label: L;
  verdict: 'best' | 'partial' | 'poor';
  feedback: L;
}

export interface CaseStudy {
  id: string;
  title: L;
  category: 'global' | 'vietnam' | 'corporate' | 'intermarket' | 'generated';
  period: string;
  /** Stage 1 — context and raw data as known at the time. */
  context: L;
  data: CaseDataPoint[];
  /** Stage 2 — decision challenge. */
  question: L;
  options: CaseOption[];
  /** Stage 3 — multi-order consequences. */
  orders: { first: L; second: L; third: L };
  takeaways: L;
  linkedLessons: string[];
  generated?: boolean;
  createdAt?: number;
}

export type ThesisStatus = 'open' | 'validated' | 'invalidated' | 'mixed';

export interface ThesisNote {
  id: string;
  title: string;
  /** Markdown. The falsifiable claim. */
  hypothesis: string;
  /** Markdown. Evidence the claim rests on. */
  supportingData: string;
  horizon: string;
  /** ISO date when the thesis must be re-examined. */
  reviewDate: string;
  /** Markdown. Observable conditions that would prove the thesis wrong. */
  invalidation: string;
  /** Subjective probability (50–99) that the thesis plays out. */
  confidence: number;
  status: ThesisStatus;
  /** Markdown. What actually happened and what was learned. */
  postmortem: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
}

export interface GlossaryTerm {
  id: string;
  term: L;
  def: L;
  lesson: string;
}

export interface LessonProgress {
  lessonId: string;
  tabs: string[];
  bestScore: number | null;
  completedAt: number | null;
  updatedAt: number;
}

export interface QuizAttempt {
  id?: number;
  questionId: string;
  lessonId: string;
  correct: boolean;
  /** Stated confidence in percent (55, 75 or 95). */
  confidence: number;
  ts: number;
}

export interface SrsState {
  cardId: string;
  ease: number;
  interval: number;
  due: number;
  reps: number;
  lapses: number;
}

export interface Snippet {
  id: string;
  title: string;
  code: string;
  updatedAt: number;
}

export interface CaseDecision {
  caseId: string;
  optionId: string;
  ts: number;
}

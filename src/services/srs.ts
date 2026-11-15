import { db } from '../db/indexedDb';
import type { SrsState } from '../types';

/** Spaced repetition (SM-2, simplified). Grades: 0 = forgot, 3 = hard, 4 = good, 5 = easy. */
export type Grade = 0 | 3 | 4 | 5;

const DAY = 86_400_000;

export function nextState(s: SrsState, grade: Grade, now = Date.now()): SrsState {
  let { ease, interval, reps, lapses } = s;
  if (grade === 0) {
    reps = 0;
    lapses += 1;
    interval = 0;
    ease = Math.max(1.3, ease - 0.2);
    return { ...s, ease, interval, reps, lapses, due: now + 10 * 60_000 };
  }
  ease = Math.max(1.3, ease + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02)));
  if (reps === 0) interval = grade === 5 ? 3 : 1;
  else if (reps === 1) interval = grade === 3 ? 3 : 6;
  else interval = Math.round(interval * (grade === 3 ? 1.2 : ease) * (grade === 5 ? 1.3 : 1));
  reps += 1;
  return { ...s, ease, interval, reps, lapses, due: now + interval * DAY };
}

export async function ensureCard(cardId: string, due = Date.now()): Promise<void> {
  const existing = await db.get('srs', cardId);
  if (!existing) {
    await db.put('srs', { cardId, ease: 2.5, interval: 0, due, reps: 0, lapses: 0 });
  }
}

export async function gradeCard(cardId: string, grade: Grade): Promise<void> {
  const s = (await db.get('srs', cardId)) ?? { cardId, ease: 2.5, interval: 0, due: 0, reps: 0, lapses: 0 };
  await db.put('srs', nextState(s, grade));
}

export const isDue = (s: SrsState, now = Date.now()) => s.due <= now;

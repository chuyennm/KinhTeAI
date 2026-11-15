import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import { useEffect, useState } from 'react';
import type {
  CaseDecision,
  CaseStudy,
  LessonProgress,
  QuizAttempt,
  Snippet,
  SrsState,
  ThesisNote,
} from '../types';

interface KinhTeDB extends DBSchema {
  progress: { key: string; value: LessonProgress };
  attempts: { key: number; value: QuizAttempt };
  cases: { key: string; value: CaseStudy };
  caseDecisions: { key: string; value: CaseDecision };
  snippets: { key: string; value: Snippet };
  theses: { key: string; value: ThesisNote };
  srs: { key: string; value: SrsState };
  kv: { key: string; value: { key: string; value: unknown } };
}

export type StoreName = 'progress' | 'attempts' | 'cases' | 'caseDecisions' | 'snippets' | 'theses' | 'srs' | 'kv';
type ValueOf<S extends StoreName> = KinhTeDB[S]['value'];

const STORES: { name: StoreName; keyPath: string; autoIncrement?: boolean }[] = [
  { name: 'progress', keyPath: 'lessonId' },
  { name: 'attempts', keyPath: 'id', autoIncrement: true },
  { name: 'cases', keyPath: 'id' },
  { name: 'caseDecisions', keyPath: 'caseId' },
  { name: 'snippets', keyPath: 'id' },
  { name: 'theses', keyPath: 'id' },
  { name: 'srs', keyPath: 'cardId' },
  { name: 'kv', keyPath: 'key' },
];

let dbPromise: Promise<IDBPDatabase<KinhTeDB>> | null = null;

function getDb() {
  if (!dbPromise) {
    dbPromise = openDB<KinhTeDB>('kinhteai', 1, {
      upgrade(db) {
        for (const s of STORES) {
          if (!db.objectStoreNames.contains(s.name)) {
            db.createObjectStore(s.name, { keyPath: s.keyPath, autoIncrement: s.autoIncrement });
          }
        }
      },
    });
  }
  return dbPromise;
}

// ---- change notification so React views stay live ----
const listeners = new Set<() => void>();
let version = 0;
function notify() {
  version++;
  listeners.forEach((fn) => fn());
}

export const db = {
  async all<S extends StoreName>(store: S): Promise<ValueOf<S>[]> {
    return (await getDb()).getAll(store) as Promise<ValueOf<S>[]>;
  },
  async get<S extends StoreName>(store: S, key: string | number): Promise<ValueOf<S> | undefined> {
    return (await getDb()).get(store, key as never) as Promise<ValueOf<S> | undefined>;
  },
  async put<S extends StoreName>(store: S, value: ValueOf<S>): Promise<void> {
    await (await getDb()).put(store, value as never);
    notify();
  },
  async del(store: StoreName, key: string | number): Promise<void> {
    await (await getDb()).delete(store, key as never);
    notify();
  },
  async kvGet<T>(key: string, fallback: T): Promise<T> {
    const row = await (await getDb()).get('kv', key);
    return row ? (row.value as T) : fallback;
  },
  async kvSet(key: string, value: unknown): Promise<void> {
    await (await getDb()).put('kv', { key, value });
    notify();
  },
};

/** Live read of a whole store. Re-runs whenever anything is written. */
export function useStore<S extends StoreName>(store: S): ValueOf<S>[] {
  const [rows, setRows] = useState<ValueOf<S>[]>([]);
  useEffect(() => {
    let alive = true;
    const load = () => db.all(store).then((r) => alive && setRows(r));
    load();
    listeners.add(load);
    return () => {
      alive = false;
      listeners.delete(load);
    };
  }, [store]);
  return rows;
}

export function useKv<T>(key: string, fallback: T): T {
  const [val, setVal] = useState<T>(fallback);
  useEffect(() => {
    let alive = true;
    const load = () => db.kvGet<T>(key, fallback).then((v) => alive && setVal(v));
    load();
    listeners.add(load);
    return () => {
      alive = false;
      listeners.delete(load);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return val;
}

// ---- activity log (streak) ----
export const dayKey = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export async function logActivity(): Promise<void> {
  const days = await db.kvGet<string[]>('activityDays', []);
  const today = dayKey();
  if (!days.includes(today)) await db.kvSet('activityDays', [...days, today].slice(-730));
}

export function computeStreak(days: string[]): number {
  const set = new Set(days);
  const d = new Date();
  if (!set.has(dayKey(d))) d.setDate(d.getDate() - 1); // today not done yet: streak still alive
  let n = 0;
  while (set.has(dayKey(d))) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}

// ---- backup ----
export interface Backup {
  app: 'KinhTeAI';
  version: 1;
  exportedAt: string;
  stores: Partial<Record<StoreName, unknown[]>>;
}

export async function exportBackup(only?: StoreName[]): Promise<Backup> {
  const stores: Backup['stores'] = {};
  for (const s of STORES) {
    if (only && !only.includes(s.name)) continue;
    stores[s.name] = await db.all(s.name);
  }
  return { app: 'KinhTeAI', version: 1, exportedAt: new Date().toISOString(), stores };
}

/** Merges a backup into the local database (records with the same key are overwritten). */
export async function importBackup(raw: unknown): Promise<number> {
  const data = raw as Backup;
  if (!data || data.app !== 'KinhTeAI' || typeof data.stores !== 'object') {
    throw new Error('Not a KinhTeAI backup file');
  }
  const d = await getDb();
  let count = 0;
  for (const s of STORES) {
    const rows = data.stores[s.name];
    if (!Array.isArray(rows)) continue;
    const tx = d.transaction(s.name, 'readwrite');
    for (const row of rows) {
      if (row && typeof row === 'object') {
        await tx.store.put(row as never);
        count++;
      }
    }
    await tx.done;
  }
  notify();
  return count;
}

export async function wipeAll(): Promise<void> {
  const d = await getDb();
  for (const s of STORES) await d.clear(s.name);
  notify();
}

export function downloadJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export const uid = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

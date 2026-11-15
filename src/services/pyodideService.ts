import datasets from '../data/macroDatasets.json';

/**
 * Lazy Pyodide runner. Nothing is downloaded until the learner presses "Run" for the
 * first time; after that the runtime is served from the service-worker cache.
 */
export type PyStatus = 'idle' | 'loading' | 'ready' | 'running' | 'error';

export interface PyEvent {
  type: 'stdout' | 'stderr';
  text: string;
}

export interface PyResult {
  ok: boolean;
  result?: string | null;
  error?: string;
}

type StatusListener = (s: PyStatus, detail?: string) => void;

let worker: Worker | null = null;
let status: PyStatus = 'idle';
let detail: string | undefined;
let readyPromise: Promise<void> | null = null;
let resolveReady: (() => void) | null = null;
let rejectReady: ((e: Error) => void) | null = null;
let seq = 0;
const pending = new Map<number, { resolve: (r: PyResult) => void; onEvent: (e: PyEvent) => void }>();
const statusListeners = new Set<StatusListener>();

function setStatus(s: PyStatus, d?: string) {
  status = s;
  detail = d;
  statusListeners.forEach((fn) => fn(s, d));
}

/** Flattens the bilingual dataset file into what the Python prelude expects. */
function pythonDatasets() {
  const out: Record<string, { title: string; columns: Record<string, unknown[]> }> = {};
  for (const [key, ds] of Object.entries(datasets as Record<string, any>)) {
    out[key] = { title: ds.title.en, columns: ds.columns };
  }
  return out;
}

function boot(): Promise<void> {
  if (readyPromise) return readyPromise;
  readyPromise = new Promise<void>((resolve, reject) => {
    resolveReady = resolve;
    rejectReady = reject;
  });
  setStatus('loading', 'runtime');
  worker = new Worker(`${import.meta.env.BASE_URL}pyodide-worker.js`);
  worker.onmessage = (e: MessageEvent) => {
    const m = e.data;
    if (m.type === 'status') {
      setStatus(m.status, m.detail);
      if (m.status === 'ready') resolveReady?.();
      if (m.status === 'error') {
        rejectReady?.(new Error(m.detail ?? 'Pyodide failed to load'));
        teardown('error', m.detail);
      }
    } else if (m.type === 'stdout' || m.type === 'stderr') {
      pending.forEach((p) => p.onEvent({ type: m.type, text: m.text }));
    } else if (m.type === 'done') {
      const p = pending.get(m.id);
      if (p) {
        pending.delete(m.id);
        p.resolve({ ok: m.ok, result: m.result, error: m.error });
      }
    }
  };
  worker.onerror = (e) => {
    rejectReady?.(new Error(e.message || 'Worker error'));
    teardown('error', e.message);
  };
  worker.postMessage({ type: 'init', datasets: pythonDatasets() });
  return readyPromise;
}

function teardown(next: PyStatus, d?: string) {
  worker?.terminate();
  worker = null;
  readyPromise = null;
  pending.forEach((p) => p.resolve({ ok: false, error: d ?? 'Interrupted' }));
  pending.clear();
  setStatus(next, d);
}

export const pyodideService = {
  getStatus: (): { status: PyStatus; detail?: string } => ({ status, detail }),
  onStatus(fn: StatusListener): () => void {
    statusListeners.add(fn);
    return () => statusListeners.delete(fn);
  },
  /** Start downloading the runtime without running anything. */
  warmUp: () => boot().catch(() => undefined),
  async run(code: string, onEvent: (e: PyEvent) => void): Promise<PyResult> {
    try {
      await boot();
    } catch (e) {
      return { ok: false, error: (e as Error).message };
    }
    const id = ++seq;
    return new Promise<PyResult>((resolve) => {
      pending.set(id, { resolve, onEvent });
      worker!.postMessage({ type: 'run', id, code });
    });
  },
  /** Kills a runaway script. Python state is lost; the next run boots a fresh interpreter. */
  stop() {
    if (worker) teardown('idle');
  },
};

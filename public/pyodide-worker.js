/* KinhTeAI Python Lab worker — runs Pyodide (CPython on WebAssembly) off the main thread.
   Classic worker on purpose: importScripts() pulls the runtime from the CDN, and the
   service worker caches it after first use so the lab keeps working offline. */
const PYODIDE_URL = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/';
let pyodide = null;

const PRELUDE = `
import json, math
import numpy as np
import pandas as pd

pd.set_option('display.width', 120)
pd.set_option('display.max_columns', 20)
pd.set_option('display.float_format', lambda v: f'{v:,.3f}')

_DATA = json.loads(__DATASETS_JSON__)

def datasets():
    """List the datasets bundled with KinhTeAI."""
    for k, v in _DATA.items():
        cols = ', '.join(v['columns'].keys())
        print(f"{k:16s} {v['title']}\\n{'':16s} columns: {cols}")

def load(name):
    """Return a bundled dataset as a pandas DataFrame, e.g. load('us_macro')."""
    if name not in _DATA:
        raise KeyError(f"Unknown dataset '{name}'. Available: {', '.join(_DATA)}")
    return pd.DataFrame(_DATA[name]['columns'])

def _clean(v):
    out = []
    for a in list(v):
        try:
            f = float(a)
            out.append(None if (math.isnan(f) or math.isinf(f)) else f)
        except (TypeError, ValueError):
            out.append(str(a))
    return out

def chart(x, y, kind='line', title='', xlabel='', ylabel='', fit=False, labels=None):
    """Draw a chart in the output panel.
    y may be one series or a dict {name: series}. kind: 'line' | 'scatter' | 'bar'.
    fit=True adds an OLS trend line to a scatter plot."""
    series = y if isinstance(y, dict) else {ylabel or 'y': y}
    spec = {
        'kind': kind, 'title': title, 'xlabel': xlabel, 'ylabel': ylabel,
        'x': _clean(x),
        'series': [{'name': str(k), 'values': _clean(v)} for k, v in series.items()],
        'labels': [str(a) for a in labels] if labels is not None else None,
    }
    if fit and kind == 'scatter':
        xs = np.asarray(list(x), dtype=float); ys = np.asarray(list(list(series.values())[0]), dtype=float)
        ok = ~(np.isnan(xs) | np.isnan(ys))
        slope, intercept = np.polyfit(xs[ok], ys[ok], 1)
        spec['fit'] = {'slope': float(slope), 'intercept': float(intercept)}
    print('__CHART__' + json.dumps(spec))

def ols(y, X, names=None, show=True):
    """Ordinary least squares with an intercept.
    y: 1-D array-like. X: 1-D or 2-D array-like / DataFrame of regressors.
    Returns a dict with coef, se, t, p, r2, adj_r2, resid, n."""
    from scipy import stats
    if isinstance(X, pd.DataFrame):
        names = names or list(X.columns)
    Xa = np.asarray(X, dtype=float)
    if Xa.ndim == 1:
        Xa = Xa.reshape(-1, 1)
    ya = np.asarray(y, dtype=float)
    ok = ~(np.isnan(ya) | np.isnan(Xa).any(axis=1))
    Xa, ya = Xa[ok], ya[ok]
    n, k = Xa.shape
    names = ['const'] + list(names or [f'x{i+1}' for i in range(k)])
    A = np.column_stack([np.ones(n), Xa])
    beta, *_ = np.linalg.lstsq(A, ya, rcond=None)
    resid = ya - A @ beta
    dof = n - k - 1
    sigma2 = resid @ resid / dof
    cov = sigma2 * np.linalg.inv(A.T @ A)
    se = np.sqrt(np.diag(cov))
    t = beta / se
    p = 2 * (1 - stats.t.cdf(np.abs(t), dof))
    tss = ((ya - ya.mean()) ** 2).sum()
    r2 = 1 - (resid @ resid) / tss
    adj = 1 - (1 - r2) * (n - 1) / dof
    if show:
        print(f"OLS  n={n}  R2={r2:.3f}  adj.R2={adj:.3f}  resid.std={math.sqrt(sigma2):.3f}")
        print(f"{'':14s}{'coef':>10s}{'std.err':>10s}{'t':>9s}{'p-value':>10s}")
        for nm, b_, s_, t_, p_ in zip(names, beta, se, t, p):
            star = '***' if p_ < 0.01 else '**' if p_ < 0.05 else '*' if p_ < 0.1 else ''
            print(f"{nm[:14]:14s}{b_:10.4f}{s_:10.4f}{t_:9.2f}{p_:10.4f} {star}")
    return {'names': names, 'coef': beta, 'se': se, 't': t, 'p': p, 'r2': r2, 'adj_r2': adj, 'resid': resid, 'n': n}
`;

async function init(datasets) {
  postMessage({ type: 'status', status: 'loading', detail: 'runtime' });
  importScripts(PYODIDE_URL + 'pyodide.js');
  pyodide = await loadPyodide({ indexURL: PYODIDE_URL });
  pyodide.setStdout({ batched: (text) => postMessage({ type: 'stdout', text }) });
  pyodide.setStderr({ batched: (text) => postMessage({ type: 'stderr', text }) });
  postMessage({ type: 'status', status: 'loading', detail: 'numpy + pandas' });
  await pyodide.loadPackage(['numpy', 'pandas']);
  pyodide.globals.set('__DATASETS_JSON__', JSON.stringify(datasets));
  pyodide.runPython(PRELUDE);
  postMessage({ type: 'status', status: 'ready' });
}

self.onmessage = async (e) => {
  const msg = e.data;
  try {
    if (msg.type === 'init') {
      await init(msg.datasets);
      return;
    }
    if (msg.type === 'run') {
      if (/\bols\s*\(|scipy/.test(msg.code)) {
        postMessage({ type: 'status', status: 'loading', detail: 'scipy' });
        await pyodide.loadPackage(['scipy']);
      }
      await pyodide.loadPackagesFromImports(msg.code);
      postMessage({ type: 'status', status: 'running' });
      const result = await pyodide.runPythonAsync(msg.code);
      let repr = null;
      if (result !== undefined && result !== null) {
        repr = typeof result === 'object' && result.toString ? result.toString() : String(result);
        if (result.destroy) result.destroy();
      }
      postMessage({ type: 'done', id: msg.id, ok: true, result: repr });
      postMessage({ type: 'status', status: 'ready' });
    }
  } catch (err) {
    const text = String(err && err.message ? err.message : err);
    if (msg.type === 'init') {
      postMessage({ type: 'status', status: 'error', detail: text });
    } else {
      postMessage({ type: 'done', id: msg.id, ok: false, error: text });
      postMessage({ type: 'status', status: 'ready' });
    }
  }
};

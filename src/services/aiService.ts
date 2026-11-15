import type { CaseStudy, Lang } from '../types';

/**
 * BYOK AI service. Everything runs from the browser straight to the provider the
 * user configured — there is no KinhTeAI server. Keys live only in localStorage.
 */
export type ProviderId = 'gemini' | 'openai' | 'deepseek' | 'anthropic' | 'ollama' | 'custom';

export interface AiConfig {
  provider: ProviderId;
  apiKey: string;
  baseUrl: string;
  model: string;
}

export const PROVIDERS: Record<
  ProviderId,
  { label: string; baseUrl: string; model: string; needsKey: boolean; keyUrl?: string }
> = {
  gemini: {
    label: 'Google Gemini',
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai',
    model: 'gemini-2.5-flash',
    needsKey: true,
    keyUrl: 'https://aistudio.google.com/apikey',
  },
  openai: {
    label: 'OpenAI',
    baseUrl: 'https://api.openai.com/v1',
    model: 'gpt-4o-mini',
    needsKey: true,
    keyUrl: 'https://platform.openai.com/api-keys',
  },
  deepseek: {
    label: 'DeepSeek',
    baseUrl: 'https://api.deepseek.com/v1',
    model: 'deepseek-chat',
    needsKey: true,
    keyUrl: 'https://platform.deepseek.com/api_keys',
  },
  anthropic: {
    label: 'Anthropic Claude',
    baseUrl: 'https://api.anthropic.com/v1',
    model: 'claude-sonnet-5-5',
    needsKey: true,
    keyUrl: 'https://console.anthropic.com/settings/keys',
  },
  ollama: {
    label: 'Ollama (local)',
    baseUrl: 'http://localhost:11434/v1',
    model: 'llama3.1',
    needsKey: false,
  },
  custom: {
    label: 'OpenAI-compatible (custom)',
    baseUrl: 'http://localhost:1234/v1',
    model: '',
    needsKey: false,
  },
};

const KEY = 'kinhteai.ai';

export function loadAiConfig(): AiConfig {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const c = JSON.parse(raw) as AiConfig;
      if (c.provider in PROVIDERS) return c;
    }
  } catch {
    /* fall through to default */
  }
  return { provider: 'gemini', apiKey: '', baseUrl: PROVIDERS.gemini.baseUrl, model: PROVIDERS.gemini.model };
}

export function saveAiConfig(c: AiConfig) {
  localStorage.setItem(KEY, JSON.stringify(c));
}

export function isAiConfigured(c = loadAiConfig()): boolean {
  if (!c.baseUrl || !c.model) return false;
  return PROVIDERS[c.provider].needsKey ? c.apiKey.trim().length > 0 : true;
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

async function* sseLines(res: Response): AsyncGenerator<string> {
  const reader = res.body!.getReader();
  const dec = new TextDecoder();
  let buf = '';
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    let i: number;
    while ((i = buf.indexOf('\n')) >= 0) {
      const line = buf.slice(0, i).trim();
      buf = buf.slice(i + 1);
      if (line.startsWith('data:')) yield line.slice(5).trim();
    }
  }
  const tail = buf.trim();
  if (tail.startsWith('data:')) yield tail.slice(5).trim();
}

async function failure(res: Response): Promise<Error> {
  let detail = '';
  try {
    const text = await res.text();
    try {
      const j = JSON.parse(text);
      detail = j?.error?.message ?? j?.message ?? text;
    } catch {
      detail = text;
    }
  } catch {
    /* ignore */
  }
  return new Error(`HTTP ${res.status} — ${String(detail).slice(0, 300)}`);
}

/** Streams a chat completion. Resolves with the full text. */
export async function chatStream(
  messages: ChatMessage[],
  onDelta: (full: string) => void,
  opts: { signal?: AbortSignal; temperature?: number; maxTokens?: number } = {},
): Promise<string> {
  const cfg = loadAiConfig();
  if (!isAiConfigured(cfg)) throw new Error('AI_NOT_CONFIGURED');
  const base = cfg.baseUrl.replace(/\/+$/, '');
  let full = '';

  if (cfg.provider === 'anthropic') {
    const system = messages
      .filter((m) => m.role === 'system')
      .map((m) => m.content)
      .join('\n\n');
    const res = await fetch(`${base}/messages`, {
      method: 'POST',
      signal: opts.signal,
      headers: {
        'content-type': 'application/json',
        'x-api-key': cfg.apiKey.trim(),
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: cfg.model,
        max_tokens: opts.maxTokens ?? 4096,
        system,
        messages: messages.filter((m) => m.role !== 'system'),
        stream: true,
      }),
    });
    if (!res.ok) throw await failure(res);
    for await (const data of sseLines(res)) {
      try {
        const j = JSON.parse(data);
        if (j.type === 'content_block_delta' && j.delta?.type === 'text_delta') {
          full += j.delta.text;
          onDelta(full);
        }
      } catch {
        /* keep-alive or partial line */
      }
    }
    return full;
  }

  const headers: Record<string, string> = { 'content-type': 'application/json' };
  if (cfg.apiKey.trim()) headers.authorization = `Bearer ${cfg.apiKey.trim()}`;
  const res = await fetch(`${base}/chat/completions`, {
    method: 'POST',
    signal: opts.signal,
    headers,
    body: JSON.stringify({
      model: cfg.model,
      messages,
      stream: true,
      temperature: opts.temperature ?? 0.6,
    }),
  });
  if (!res.ok) throw await failure(res);
  for await (const data of sseLines(res)) {
    if (data === '[DONE]') break;
    try {
      const delta = JSON.parse(data)?.choices?.[0]?.delta?.content;
      if (typeof delta === 'string' && delta) {
        full += delta;
        onDelta(full);
      }
    } catch {
      /* keep-alive or partial line */
    }
  }
  return full;
}

// ---------------------------------------------------------------- prompts

export type TutorMode = 'ask' | 'socratic' | 'feynman' | 'roleplay' | 'casegen';

const LANG_RULE: Record<Lang, string> = {
  vi: 'Trả lời bằng tiếng Việt. Giữ thuật ngữ tài chính/kinh tế chuẩn bằng tiếng Anh trong ngoặc đơn ở lần đầu xuất hiện, ví dụ: lợi suất (yield).',
  en: 'Answer in English. When a term has a common Vietnamese equivalent that a Vietnamese learner would meet, add it in parentheses on first use.',
};

const BASE = `You are "KinhTeAI Tutor", a rigorous but warm economics and finance mentor inside a learning app.
Your learner wants to become a competent junior financial analyst: macro, markets, financial statements, valuation and econometrics.
House rules:
- Reason in orders of consequence: first-order (direct), second-order (reactions of other actors), third-order (structural / expectations).
- Prefer numbers, mechanisms and counter-examples over adjectives. Use LaTeX with $...$ for formulas.
- Say plainly when something is uncertain, contested among economists, or after your knowledge cutoff. Never invent statistics; if you cite a figure from memory, mark it as approximate.
- This is education, not personalised investment advice. Do not tell the learner what to buy or sell.
- Be concise: short paragraphs, at most ~250 words unless the learner asks for depth.`;

const MODE_PROMPT: Record<TutorMode, string> = {
  ask: `MODE: Explain. Answer the question directly, then give one intuition or analogy, one worked number, and end with ONE short check question that tests understanding (not recall).`,
  socratic: `MODE: Socratic Critique. The learner states an economic or market thesis. Do NOT agree quickly and do NOT lecture.
1) Restate the thesis in one sentence and name its hidden assumptions.
2) Attack it with the 2–3 strongest second-order risks (e.g. FX pressure, inflation lags, liquidity trap, crowding, reflexivity, base effects, policy reaction function).
3) Ask 2 pointed questions the learner must answer with data, and say what observable evidence would invalidate the thesis.
Stay in this critical stance across turns until the learner's thesis has explicit invalidation criteria and a time horizon; then give a score from 1–10 on logic, evidence, and risk awareness.`,
  feynman: `MODE: Feynman check. The learner will explain a concept in their own words as if teaching a 15-year-old.
Grade the explanation: (a) what is correct, (b) gaps or misconceptions — quote the exact phrase that is wrong, (c) a tighter 3-sentence version, (d) a mastery score 1–5, (e) one follow-up question that probes the weakest part. If the learner has not explained anything yet, ask them to pick a concept and explain it.`,
  roleplay: `MODE: Macro Roleplay. You are a game master running a crisis simulation.
If no scenario is running, create one: give the learner a role (e.g. SBV governor, Fed chair, CIO of a balanced fund, CFO of a leveraged developer), a dated fictional-but-plausible data dashboard (inflation, growth, policy rate, FX, credit, yields), and a decision with constraints. Then STOP and wait.
After each decision: reveal first-, second- and third-order consequences over the next quarters, update the dashboard, and present the next decision. After 3 rounds, grade the learner 1–10 on diagnosis, trade-off awareness and risk management, with specific feedback and what a seasoned policymaker would have done.`,
  casegen: '',
};

export function buildSystemPrompt(mode: TutorMode, lang: Lang, context?: string): string {
  const parts = [BASE, MODE_PROMPT[mode], LANG_RULE[lang]];
  if (context) parts.push(`CURRENT STUDY CONTEXT (what the learner has on screen):\n${context.slice(0, 3500)}`);
  return parts.filter(Boolean).join('\n\n');
}

// ---------------------------------------------------------------- case-study generation

function caseGenPrompt(topic: string, lang: Lang): ChatMessage[] {
  const language = lang === 'vi' ? 'Vietnamese (keep standard English finance terms in parentheses)' : 'English';
  return [
    {
      role: 'system',
      content: `${BASE}\n\nYou write decision-forcing case studies. Output ONLY one valid JSON object, no markdown fences, no commentary.`,
    },
    {
      role: 'user',
      content: `Write a case study about: "${topic}".
Language of all text values: ${language}.
Ground it in real history where your knowledge is solid; figures must be realistic and marked approximate ("≈") when recalled from memory.
Return exactly this JSON shape:
{
  "title": string,
  "period": string,
  "context": string (markdown, 120-200 words: the situation as known AT THE TIME, without revealing the outcome),
  "data": [ { "label": string, "value": string, "note": string } ] (5-7 raw metrics at the decision date),
  "question": string (the decision the learner must take, and in which role),
  "options": [ { "id": "a"|"b"|"c", "label": string, "verdict": "best"|"partial"|"poor", "feedback": string } ] (exactly 3, exactly one "best"),
  "orders": { "first": string, "second": string, "third": string } (markdown; what actually happened, by order of consequence),
  "takeaways": string (markdown bullet list of 3 transferable lessons)
}`,
    },
  ];
}

function extractJson(text: string): unknown {
  const cleaned = text.replace(/```(?:json)?/gi, '').trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start < 0 || end <= start) throw new Error('No JSON object in model output');
  return JSON.parse(cleaned.slice(start, end + 1));
}

const str = (v: unknown, fallback = ''): string => (typeof v === 'string' ? v : fallback);

/** Asks the configured model for a new case study and validates it into the CaseStudy shape. */
export async function generateCaseStudy(
  topic: string,
  lang: Lang,
  onProgress?: (chars: number) => void,
  signal?: AbortSignal,
): Promise<CaseStudy> {
  const text = await chatStream(caseGenPrompt(topic, lang), (full) => onProgress?.(full.length), {
    signal,
    temperature: 0.5,
    maxTokens: 6000,
  });
  const j = extractJson(text) as Record<string, any>;
  const both = (v: unknown) => ({ vi: str(v), en: str(v) });
  const options = Array.isArray(j.options) ? j.options.slice(0, 4) : [];
  if (!str(j.title) || !str(j.context) || options.length < 2 || !j.orders) {
    throw new Error('Model output is missing required case-study fields');
  }
  const verdicts = new Set(['best', 'partial', 'poor']);
  return {
    id: `gen-${Date.now().toString(36)}`,
    category: 'generated',
    generated: true,
    createdAt: Date.now(),
    title: both(j.title),
    period: str(j.period, '—'),
    context: both(j.context),
    data: (Array.isArray(j.data) ? j.data : []).slice(0, 10).map((d: any) => ({
      label: both(d?.label),
      value: str(d?.value, String(d?.value ?? '')),
      note: d?.note ? both(d.note) : undefined,
    })),
    question: both(j.question),
    options: options.map((o: any, i: number) => ({
      id: str(o?.id, String.fromCharCode(97 + i)),
      label: both(o?.label),
      verdict: verdicts.has(o?.verdict) ? o.verdict : 'partial',
      feedback: both(o?.feedback),
    })),
    orders: { first: both(j.orders.first), second: both(j.orders.second), third: both(j.orders.third) },
    takeaways: both(j.takeaways),
    linkedLessons: [],
  };
}

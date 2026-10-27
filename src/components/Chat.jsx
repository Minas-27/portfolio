import { useState, useRef, useEffect, useCallback } from 'react';
import {
  X, ArrowUp, Square, RotateCcw, Check, Copy, ChevronRight, Loader2, MessageSquare, FileText, CornerDownRight,
} from 'lucide-react';
import { ENTRIES, LABELS, PROMPTS, GREETING, FALLBACK, SUGGESTIONS } from '../data/assistant';
import './Chat.css';

/* ── Retrieval ────────────────────────────────────────────────────
   This is a real (small) retrieval system, not a fake one. It ranks
   every entry against the question, surfaces the best match, keeps
   the runners-up as related topics, and refuses to answer below a
   confidence threshold. The agent trace shows exactly what happened:
   the keywords it read, how many entries it searched, what matched
   and how strongly. The answer itself is always Abraham's own words. */

const STOP = new Set([
  'what', 'who', 'when', 'where', 'why', 'how', 'is', 'are', 'was', 'were',
  'the', 'a', 'an', 'and', 'or', 'of', 'to', 'in', 'on', 'for', 'with',
  'he', 'his', 'him', 'you', 'your', 'does', 'do', 'did', 'can', 'could',
  'me', 'about', 'tell', 'i', 'it', 'that', 'this', 'please', 'would',
]);

const normalise = (t) =>
  t.toLowerCase().replace(/[^a-z0-9_\s.]/g, ' ').replace(/\s+/g, ' ').trim();

const keywordsOf = (q) =>
  [...new Set(normalise(q).split(' ').filter((w) => w.length > 2 && !STOP.has(w)))];

function rank(question) {
  const q = normalise(question);
  if (!q) return [];
  const words = new Set(keywordsOf(question));

  return ENTRIES.map((entry) => {
    let score = 0;
    for (const kw of entry.keywords) {
      const k = normalise(kw);
      if (k.includes(' ')) {
        if (q.includes(k)) score += 3 + k.split(' ').length;
      } else if (words.has(k)) {
        score += 2;
      } else if (k.length > 4 && q.includes(k)) {
        score += 1;
      }
    }
    return { entry, score };
  })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);
}

/* Words, not letters: fast enough to feel live, slow enough to read. */
const tokens = (text) => text.split(/(\s+)/).filter(Boolean);

/* Emails and URLs in answers become real links. */
function Linkified({ text }) {
  const parts = text.split(/([\w.+-]+@[\w-]+\.[\w.]+|https?:\/\/[^\s)]+)/g);
  return parts.map((p, i) => {
    if (/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(p)) return <a key={i} href={`mailto:${p}`}>{p}</a>;
    if (/^https?:\/\//.test(p)) {
      return <a key={i} href={p} target="_blank" rel="noopener noreferrer">{p}</a>;
    }
    return <span key={i}>{p}</span>;
  });
}

function Trace({ steps, done, ms }) {
  const [open, setOpen] = useState(false);
  const showList = open || !done;
  return (
    <div className={`trace${done ? ' is-done' : ''}`}>
      <button
        className="trace__head"
        onClick={() => done && setOpen((o) => !o)}
        aria-expanded={showList}
        disabled={!done}
      >
        {done ? <Check size={12} strokeWidth={1.5} aria-hidden="true" /> : <Loader2 size={12} strokeWidth={1.5} className="spin" aria-hidden="true" />}
        <span>{done ? `Worked for ${(ms / 1000).toFixed(1)}s · ${steps.length} steps` : 'Working…'}</span>
        {done && <ChevronRight size={12} strokeWidth={1.5} className="trace__chev" aria-hidden="true" />}
      </button>
      {showList && (
        <ol className="trace__steps">
          {steps.map((s, i) => {
            const live = !done && i === steps.length - 1;
            return (
              <li key={i} className={live ? 'is-live' : ''}>
                <span className="trace__icon" aria-hidden="true">
                  {live ? <Loader2 size={11} strokeWidth={1.5} className="spin" /> : <Check size={11} strokeWidth={2} />}
                </span>
                <span className="trace__label">{s.label}</span>
                {s.detail && <span className="trace__detail">{s.detail}</span>}
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}

function CopyBtn({ text }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      className="msg__tool"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setOk(true);
          setTimeout(() => setOk(false), 1500);
        } catch {
          /* clipboard blocked; nothing to do */
        }
      }}
      aria-label={ok ? 'Copied' : 'Copy answer'}
    >
      {ok ? <Check size={12} strokeWidth={1.5} /> : <Copy size={12} strokeWidth={1.5} />}
      {ok ? 'Copied' : 'Copy'}
    </button>
  );
}

const typing = (el) =>
  el instanceof Element && !!el.closest('input, textarea, select, [contenteditable="true"]');

export default function Chat() {
  const [open, setOpen] = useState(false);
  const [tucked, setTucked] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);

  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const timers = useRef([]);
  const pending = useRef(null); // the answer being streamed, so Stop can finish it

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));

  useEffect(() => () => clearTimers(), []);
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  });
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 80);
  }, [open]);

  /* Stay out of the hero. The name and the stats are the page there. */
  useEffect(() => {
    const onScroll = () => setTucked(window.scrollY < window.innerHeight * 0.72);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Esc closes; "/" opens from anywhere on the page. */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === '/' && !typing(e.target) && !e.metaKey && !e.ctrlKey && !document.querySelector('[data-modal]')) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* Auto-grow the composer up to four lines. */
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 112)}px`;
  }, [input, open]);

  const patchLast = (fn) =>
    setMessages((m) => {
      const next = [...m];
      next[next.length - 1] = fn(next[next.length - 1]);
      return next;
    });

  const finish = useCallback(() => {
    clearTimers();
    const p = pending.current;
    if (p) {
      patchLast((msg) => ({ ...msg, content: p.answer, streaming: false, related: p.related }));
      pending.current = null;
    }
    setBusy(false);
  }, []);

  const send = useCallback(
    (text) => {
      const question = (text ?? input).trim();
      if (!question || busy) return;

      const started = performance.now();
      const results = rank(question);
      const strong = results.filter((r) => r.score >= 2);
      const top = results[0];
      const confident = top && top.score >= 2;
      const answer = confident ? top.entry.answer : FALLBACK;
      const related = confident ? strong.slice(1, 4).map((r) => r.entry.id) : [];
      const sources = confident ? strong.slice(0, 3).map((r) => LABELS[r.entry.id]) : [];
      const kws = keywordsOf(question);

      const steps = [
        { label: 'Read the question', detail: kws.length ? kws.slice(0, 6).join(' · ') : 'no keywords' },
        { label: `Searched ${ENTRIES.length} entries he wrote`, detail: `${strong.length} ${strong.length === 1 ? 'match' : 'matches'}` },
        confident
          ? { label: `Best match: ${LABELS[top.entry.id]}`, detail: `score ${top.score}` }
          : { label: 'Nothing matched closely enough', detail: 'will not guess' },
        { label: confident ? 'Answering in his own words' : 'Saying so, honestly' },
      ];

      setMessages((m) => [
        ...m,
        { role: 'user', content: question },
        { role: 'assistant', content: '', steps: [steps[0]], working: true, streaming: false, sources, related: [] },
      ]);
      setInput('');
      setBusy(true);
      pending.current = { answer, related };

      // The trace fills in step by step.
      [1, 2, 3].forEach((n, i) => {
        later(() => patchLast((msg) => ({ ...msg, steps: steps.slice(0, n + 1) })), 320 * (i + 1));
      });

      // Then the answer streams.
      later(() => {
        const ms = Math.round(performance.now() - started);
        patchLast((msg) => ({ ...msg, working: false, ms, streaming: true }));
        const parts = tokens(answer);
        const step = Math.max(8, Math.min(22, 1400 / parts.length));
        let acc = '';
        parts.forEach((part, i) => {
          later(() => {
            acc += part;
            const snapshot = acc;
            patchLast((msg) => ({ ...msg, content: snapshot }));
            if (i === parts.length - 1) finish();
          }, i * step);
        });
      }, 1300);
    },
    [input, busy, finish],
  );

  const reset = () => {
    clearTimers();
    pending.current = null;
    setBusy(false);
    setMessages([]);
    setInput('');
    inputRef.current?.focus();
  };

  const lastIdx = messages.length - 1;

  return (
    <>
      <button
        className={`chat__launcher${tucked && !open ? ' is-tucked' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close' : 'Ask about Abraham'}
        aria-expanded={open}
        data-magnetic="0.15"
      >
        <span className="chat__launcher-icon" aria-hidden="true">
          {open ? <X size={18} strokeWidth={1.5} /> : <MessageSquare size={18} strokeWidth={1.5} />}
        </span>
        {!open && (
          <span className="chat__launcher-label">
            Ask about me <kbd>/</kbd>
          </span>
        )}
      </button>

      {open && (
        <div className="chat__panel" role="dialog" aria-label="Ask about Abraham">
          <header className="chat__header">
            <span className="chat__avatar" aria-hidden="true">A</span>
            <div className="chat__id">
              <strong>Ask about Abraham</strong>
              <span><i className="chat__online" aria-hidden="true" /> Answers written by him, not generated</span>
            </div>
            {messages.length > 0 && (
              <button onClick={reset} aria-label="New conversation" title="New conversation">
                <RotateCcw size={16} strokeWidth={1.5} />
              </button>
            )}
            <button onClick={() => setOpen(false)} aria-label="Close">
              <X size={18} strokeWidth={1.5} />
            </button>
          </header>

          <div className="chat__scroll" ref={scrollRef} data-lenis-prevent role="log" aria-live="polite">
            <div className="msg msg--assistant">
              <span className="msg__avatar" aria-hidden="true">A</span>
              <div className="msg__body">
                <p className="msg__text">{GREETING}</p>
              </div>
            </div>

            {messages.length === 0 && (
              <div className="chat__starters">
                <p className="chat__kicker">Try asking</p>
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => send(s)}>
                    <span>{s}</span>
                    <ChevronRight size={14} strokeWidth={1.5} aria-hidden="true" />
                  </button>
                ))}
              </div>
            )}

            {messages.map((m, i) =>
              m.role === 'user' ? (
                <div key={i} className="msg msg--user">
                  <p className="msg__bubble">{m.content}</p>
                </div>
              ) : (
                <div key={i} className="msg msg--assistant">
                  <span className="msg__avatar" aria-hidden="true">A</span>
                  <div className="msg__body">
                    <Trace steps={m.steps} done={!m.working} ms={m.ms || 0} />
                    {(m.content || m.streaming) && (
                      <p className="msg__text">
                        <Linkified text={m.content} />
                        {m.streaming && <span className="chat__caret" aria-hidden="true" />}
                      </p>
                    )}
                    {!m.working && !m.streaming && (
                      <div className="msg__foot">
                        {m.sources.length > 0 && (
                          <span className="msg__sources">
                            <FileText size={11} strokeWidth={1.5} aria-hidden="true" />
                            {m.sources.join(' · ')}
                          </span>
                        )}
                        <CopyBtn text={m.content} />
                      </div>
                    )}
                    {i === lastIdx && !busy && m.related.length > 0 && (
                      <div className="chat__follow">
                        {m.related.map((id) => (
                          <button key={id} onClick={() => send(PROMPTS[id])}>
                            <CornerDownRight size={12} strokeWidth={1.5} aria-hidden="true" />
                            {PROMPTS[id]}
                          </button>
                        ))}
                      </div>
                    )}
                    {i === lastIdx && !busy && m.related.length === 0 && !m.sources.length && (
                      <div className="chat__follow">
                        {SUGGESTIONS.slice(0, 3).map((s) => (
                          <button key={s} onClick={() => send(s)}>
                            <CornerDownRight size={12} strokeWidth={1.5} aria-hidden="true" />
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ),
            )}
          </div>

          <form
            className="chat__form"
            onSubmit={(e) => {
              e.preventDefault();
              if (busy) finish();
              else send();
            }}
          >
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder={busy ? 'Answering…' : 'Ask anything about Abraham…'}
              maxLength={300}
              aria-label="Your question"
            />
            {busy ? (
              <button type="submit" aria-label="Stop and show the full answer" className="is-stop">
                <Square size={12} strokeWidth={2} fill="currentColor" />
              </button>
            ) : (
              <button type="submit" disabled={!input.trim()} aria-label="Send">
                <ArrowUp size={16} strokeWidth={1.5} />
              </button>
            )}
          </form>
          <p className="chat__hint" aria-hidden="true">
            <kbd>↵</kbd> send <kbd>⇧↵</kbd> new line <kbd>esc</kbd> close
          </p>
        </div>
      )}
    </>
  );
}

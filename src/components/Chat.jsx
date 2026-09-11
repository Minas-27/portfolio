import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, ArrowUp, Search, FileText, Sparkles } from 'lucide-react';
import { ENTRIES, LABELS, PROMPTS, GREETING, FALLBACK, SUGGESTIONS } from '../data/assistant';
import './Chat.css';

/* ── Retrieval ────────────────────────────────────────────────────
   This is a real (small) retrieval system, not a fake one. It ranks
   every entry against the question, surfaces the best match, keeps
   the runners-up as related topics, and refuses to answer below a
   confidence threshold. The visible "searching" step reflects what
   actually happened, it just happens faster than a human can read. */

const STOP = new Set([
  'what', 'who', 'when', 'where', 'why', 'how', 'is', 'are', 'was', 'were',
  'the', 'a', 'an', 'and', 'or', 'of', 'to', 'in', 'on', 'for', 'with',
  'he', 'his', 'him', 'you', 'your', 'does', 'do', 'did', 'can', 'could',
  'me', 'about', 'tell', 'i', 'it', 'that', 'this', 'please', 'would',
]);

const normalise = (t) =>
  t.toLowerCase().replace(/[^a-z0-9_\s.]/g, ' ').replace(/\s+/g, ' ').trim();

function rank(question) {
  const q = normalise(question);
  if (!q) return [];
  const words = new Set(q.split(' ').filter((w) => w.length > 2 && !STOP.has(w)));

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

/* Split into chunks so the answer arrives in readable pieces rather
   than all at once. Paragraph breaks are preserved. */
function chunk(text) {
  const out = [];
  for (const para of text.split('\n\n')) {
    const words = para.split(' ');
    for (let i = 0; i < words.length; i += 4) {
      out.push((i === 0 && out.length ? '\n\n' : '') + words.slice(i, i + 4).join(' ') + ' ');
    }
  }
  return out;
}

const STAGES = [
  { icon: Search, text: 'Searching his work…' },
  { icon: FileText, text: null }, // filled in with the real hit count
  { icon: Sparkles, text: 'Putting it together…' },
];

export default function Chat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [stage, setStage] = useState(-1);
  const [stageText, setStageText] = useState('');
  const [related, setRelated] = useState([]);
  const busy = stage > -1;

  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const timers = useRef([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));

  useEffect(() => () => clearTimers(), []);
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  });
  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const send = useCallback(
    (text) => {
      const question = (text ?? input).trim();
      if (!question || busy) return;

      const results = rank(question);
      const top = results[0];
      const confident = top && top.score >= 2;
      const answer = confident ? top.entry.answer : FALLBACK;
      const source = confident ? LABELS[top.entry.id] : null;
      const rest = confident
        ? results.slice(1, 4).filter((r) => r.score >= 2).map((r) => r.entry.id)
        : [];

      setMessages((m) => [...m, { role: 'user', content: question }]);
      setInput('');
      setRelated([]);

      // Stage 1, searching
      setStage(0);
      setStageText(STAGES[0].text);

      // Stage 2, what it actually found
      later(() => {
        setStage(1);
        setStageText(
          confident
            ? `Found ${results.filter((r) => r.score >= 2).length} matching ${
                results.filter((r) => r.score >= 2).length === 1 ? 'entry' : 'entries'
              }`
            : 'Nothing matched closely enough',
        );
      }, 420);

      // Stage 3, composing
      later(() => {
        setStage(2);
        setStageText(STAGES[2].text);
      }, 900);

      // Reveal, in chunks
      later(() => {
        setStage(-1);
        const parts = chunk(answer);
        setMessages((m) => [...m, { role: 'assistant', content: '', source }]);
        parts.forEach((part, i) => {
          later(() => {
            setMessages((m) => {
              const next = [...m];
              next[next.length - 1] = {
                ...next[next.length - 1],
                content: next[next.length - 1].content + part,
              };
              return next;
            });
            if (i === parts.length - 1) setRelated(rest);
          }, i * Math.max(14, Math.min(34, 900 / parts.length)));
        });
      }, 1280);
    },
    [input, busy],
  );

  const StageIcon = stage > -1 ? STAGES[stage].icon : null;

  return (
    <>
      <button
        className="chat__launcher"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close' : 'Ask about Abraham'}
        aria-expanded={open}
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
        {!open && <span>Ask about me</span>}
      </button>

      {open && (
        <div className="chat__panel" role="dialog" aria-label="Ask about Abraham">
          <header className="chat__header">
            <div>
              <strong>Ask about Abraham</strong>
              <span>Answers written by him, not generated</span>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close">
              <X size={18} />
            </button>
          </header>

          <div className="chat__scroll" ref={scrollRef}>
            <p className="chat__greeting">{GREETING}</p>

            {messages.map((m, i) => (
              <div key={i} className={`chat__row chat__row--${m.role}`}>
                {m.source && (
                  <span className="chat__source">
                    <FileText size={11} /> {m.source}
                  </span>
                )}
                <div className={`chat__msg chat__msg--${m.role}`}>
                  {m.content}
                  {m.role === 'assistant' && !m.content && <span className="chat__caret" />}
                </div>
              </div>
            ))}

            {busy && (
              <div className="chat__stage" aria-live="polite">
                <StageIcon size={13} />
                <span>{stageText}</span>
                <i className="chat__bar" />
              </div>
            )}

            {!busy && related.length > 0 && (
              <div className="chat__related">
                <span className="chat__related-label">Related</span>
                {related.map((id) => (
                  <button key={id} onClick={() => send(PROMPTS[id])}>
                    {PROMPTS[id]}
                  </button>
                ))}
              </div>
            )}

            {!busy && messages.length === 0 && (
              <div className="chat__suggestions">
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => send(s)}>{s}</button>
                ))}
              </div>
            )}
          </div>

          <form
            className="chat__form"
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={busy ? 'Looking…' : 'Ask about him…'}
              maxLength={300}
              aria-label="Your question"
            />
            <button type="submit" disabled={busy || !input.trim()} aria-label="Send">
              <ArrowUp size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

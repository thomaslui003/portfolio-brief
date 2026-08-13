import type { AttentionItem } from "@/lib/attention";
import type { BookStance } from "@/lib/bookStance";
import type { CalendarEvent } from "@/lib/calendarEvents";
import { policyVerbClass } from "@/lib/format";
import type { Suggestion } from "@/lib/suggestions";
import { BookStanceCard } from "./BookStanceCard";

type Props = {
  stance: BookStance | null;
  attention: AttentionItem[];
  suggestions: Suggestion[];
  nonActions: string[];
  delta: string;
  questions: string[];
  events: CalendarEvent[];
};

export function DecisionView({
  stance,
  attention,
  suggestions,
  nonActions,
  delta,
  questions,
  events,
}: Props) {
  const focus = attention.filter((a) => !a.quiet);
  const quiet = attention.filter((a) => a.quiet);

  return (
    <div className="desk-grid">
      <div className="desk-grid__main">
        {stance ? <BookStanceCard stance={stance} /> : (
          <p className="empty">Book stance appears after the next brief run.</p>
        )}

        <section className="panel" aria-labelledby="attention-heading">
          <header className="panel__head">
            <h2 id="attention-heading">Needs attention</h2>
            <p className="panel__meta">Material items only — quiet names grouped below</p>
          </header>
          {focus.length ? (
            <ol className="attention-list">
              {focus.map((item, i) => (
                <li key={i}>{item.text}</li>
              ))}
            </ol>
          ) : (
            <p className="empty">No material attention items in this brief.</p>
          )}
          {quiet.length ? (
            <p className="quiet-line">{quiet.map((q) => q.text).join(" ")}</p>
          ) : null}
        </section>

        <section className="panel" aria-labelledby="suggest-heading">
          <header className="panel__head">
            <h2 id="suggest-heading">Ranked suggestions</h2>
            <p className="panel__meta">Max 3 · policy verbs only · not orders</p>
          </header>
          {suggestions.length ? (
            <ol className="suggest-list">
              {suggestions.map((s) => (
                <li key={s.rank} className="suggest-card">
                  <div className="suggest-card__top">
                    <span className="suggest-card__rank">{s.rank}</span>
                    <span className={`stance-card__verb ${policyVerbClass(s.verb)}`}>
                      {s.verb}
                    </span>
                    {s.confidence ? (
                      <span className="suggest-card__conf">{s.confidence}</span>
                    ) : null}
                  </div>
                  <p className="suggest-card__title">{s.title}</p>
                  {s.body ? <p className="suggest-card__body">{s.body}</p> : null}
                  {s.falsifier ? (
                    <p className="stance-card__falsifier">
                      <span>Falsifier</span> {s.falsifier}
                    </p>
                  ) : null}
                </li>
              ))}
            </ol>
          ) : (
            <p className="empty">No ranked suggestions parsed from this brief.</p>
          )}
        </section>
      </div>

      <aside className="desk-grid__rail">
        {events.length ? (
          <section className="panel panel--rail" aria-labelledby="cal-heading">
            <header className="panel__head">
              <h2 id="cal-heading">Next on calendar</h2>
              <p className="panel__meta">~21 days · from calendar.md</p>
            </header>
            <ul className="cal-list">
              {events.slice(0, 8).map((e) => (
                <li key={`${e.date}-${e.event}`}>
                  <span className="cal-list__date">{e.startDate ?? e.date}</span>
                  <span className="cal-list__body">
                    <strong>{e.ticker}</strong> {e.event}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {delta ? (
          <section className="panel panel--rail" aria-labelledby="delta-heading">
            <header className="panel__head">
              <h2 id="delta-heading">Vs yesterday</h2>
            </header>
            <p className="rail-copy">{delta}</p>
          </section>
        ) : null}

        {nonActions.length ? (
          <section className="panel panel--rail" aria-labelledby="non-heading">
            <header className="panel__head">
              <h2 id="non-heading">Do not act on</h2>
            </header>
            <ul className="rail-list">
              {nonActions.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {questions.length ? (
          <section className="panel panel--rail" aria-labelledby="q-heading">
            <header className="panel__head">
              <h2 id="q-heading">Open questions</h2>
            </header>
            <ol className="rail-list rail-list--num">
              {questions.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ol>
          </section>
        ) : null}
      </aside>
    </div>
  );
}

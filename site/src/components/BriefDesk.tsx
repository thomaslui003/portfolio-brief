"use client";

import { useEffect, useState } from "react";
import type { Brief } from "@/lib/briefs";
import type { CalendarEvent } from "@/lib/calendarEvents";
import type { HoldingsSnapshot } from "@/lib/holdings";
import { BriefToc } from "./BriefToc";
import { BookView } from "./BookView";
import { DecisionView } from "./DecisionView";
import { MarkdownBody } from "./MarkdownBody";
import { NamesView } from "./NamesView";
import { TapeView } from "./TapeView";
import { DESK_VIEWS, isDeskView, ViewSwitcher, type DeskViewId } from "./ViewSwitcher";

type Props = {
  brief: Brief;
  holdings: HoldingsSnapshot;
  events: CalendarEvent[];
  showTocOnNote?: boolean;
};

function viewFromHash(): DeskViewId {
  if (typeof window === "undefined") return "decision";
  const raw = window.location.hash.replace(/^#/, "");
  return isDeskView(raw) ? raw : "decision";
}

export function BriefDesk({ brief, holdings, events, showTocOnNote = true }: Props) {
  const [view, setView] = useState<DeskViewId>("decision");

  useEffect(() => {
    setView(viewFromHash());
    const onHash = () => setView(viewFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const change = (id: DeskViewId) => {
    setView(id);
    const url = `${window.location.pathname}${window.location.search}#${id}`;
    window.history.replaceState(null, "", url);
  };

  const hint = DESK_VIEWS.find((v) => v.id === view)?.hint;

  return (
    <>
      <ViewSwitcher active={view} onChange={change} />
      <p className="view-switch__lede">{hint}</p>

      {view === "decision" ? (
        <DecisionView
          stance={brief.bookStance}
          attention={brief.attention}
          suggestions={brief.suggestions}
          nonActions={brief.nonActions}
          delta={brief.delta}
          questions={brief.questions}
          events={events}
        />
      ) : null}

      {view === "book" ? (
        <BookView
          holdings={holdings}
          ratings={brief.positionRatings}
          health={brief.health}
        />
      ) : null}

      {view === "tape" ? (
        <TapeView
          asOf={brief.date}
          premarketTape={brief.premarketTape}
          sectorTape={brief.sectorTape}
          regime={brief.regime}
          premarketNarrative={brief.premarketNarrative}
          flowsNarrative={brief.flowsNarrative}
          bookMap={brief.bookMap}
          kpis={brief.kpis}
        />
      ) : null}

      {view === "names" ? (
        <NamesView
          positions={holdings.positions}
          ratings={brief.positionRatings}
          notes={brief.positionNotes}
        />
      ) : null}

      {view === "note" ? (
        <>
          {showTocOnNote ? <BriefToc sections={brief.sections} /> : null}
          <article className="panel">
            <MarkdownBody content={brief.content} />
          </article>
        </>
      ) : null}
    </>
  );
}

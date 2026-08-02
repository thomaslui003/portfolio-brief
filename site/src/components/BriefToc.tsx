import type { BriefSection } from "@/lib/briefs";

const SHORT: Record<string, string> = {
  "market regime (us + asia/hk overnight)": "Regime",
  "money flow / sector rotation": "Flows",
  "portfolio health (quant lens)": "Health",
  "leading indicators (book map)": "KPIs",
  "what needs attention today": "Attention",
  "position notes (fundamental lens)": "Positions",
  "ranked suggestions (max 3)": "Suggestions",
  "explicit non-actions": "Non-actions",
  "delta vs yesterday": "Delta",
  "open questions for next run": "Questions",
  sources: "Sources",
};

function shortLabel(label: string): string {
  return SHORT[label.toLowerCase()] ?? label.replace(/\s*\([^)]*\)\s*/g, "").trim();
}

/** In-page jump nav for longer dual-analyst briefs. */
export function BriefToc({ sections }: { sections: BriefSection[] }) {
  if (sections.length < 4) return null;

  return (
    <nav className="brief-toc" aria-label="Brief sections">
      <p className="brief-toc__label">Jump</p>
      <ul className="brief-toc__list">
        {sections.map((s) => (
          <li key={s.id}>
            <a href={`#${s.id}`}>{shortLabel(s.label)}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

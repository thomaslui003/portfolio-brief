"use client";

export const DESK_VIEWS = [
  { id: "decision", label: "Decision", hint: "Stance, attention, actions" },
  { id: "book", label: "Book", hint: "Weights, P&L, clusters" },
  { id: "tape", label: "Tape", hint: "Premarket and sector rotation" },
  { id: "names", label: "Names", hint: "Thesis and dual-lens ratings" },
  { id: "note", label: "Note", hint: "Full source brief" },
] as const;

export type DeskViewId = (typeof DESK_VIEWS)[number]["id"];

export function isDeskView(v: string): v is DeskViewId {
  return DESK_VIEWS.some((x) => x.id === v);
}

type Props = {
  active: DeskViewId;
  onChange: (id: DeskViewId) => void;
};

export function ViewSwitcher({ active, onChange }: Props) {
  return (
    <nav className="view-switch" aria-label="Desk perspectives">
      {DESK_VIEWS.map((v) => (
        <button
          key={v.id}
          type="button"
          className={active === v.id ? "is-active" : undefined}
          aria-current={active === v.id ? "page" : undefined}
          title={v.hint}
          onClick={() => onChange(v.id)}
        >
          <span className="view-switch__label">{v.label}</span>
          <span className="view-switch__hint">{v.hint}</span>
        </button>
      ))}
    </nav>
  );
}

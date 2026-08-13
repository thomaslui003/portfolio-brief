export function fmtPct(
  n: number | null | undefined,
  digits = 1,
  opts: { signed?: boolean } = {},
): string {
  if (n == null || !Number.isFinite(n)) return "—";
  const signed = opts.signed ?? true;
  const sign = signed && n > 0 ? "+" : "";
  return `${sign}${n.toFixed(digits)}%`;
}

export function fmtMoney(n: number | null | undefined): string {
  if (n == null || !Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: n >= 100 ? 0 : 2,
  });
}

export function signedClass(n: number | null | undefined): string {
  if (n == null || n === 0) return "";
  return n > 0 ? "is-up" : "is-down";
}

export function policyVerbClass(verb: string): string {
  const v = verb.toLowerCase();
  if (v.includes("review")) return "is-review";
  if (v.includes("consider")) return "is-consider";
  if (v.includes("watch")) return "is-watch";
  if (v.includes("trim")) return "is-trim";
  if (v.includes("add")) return "is-add";
  return "is-hold";
}

import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugify } from "@/lib/slugify";

function plainText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(plainText).join("");
  if (typeof node === "object" && "props" in node) {
    const el = node as { props?: { children?: ReactNode } };
    return plainText(el.props?.children);
  }
  return "";
}

function accentClass(label: string): string | undefined {
  const t = label.toLowerCase();
  if (t.includes("premarket")) return "prose-h2--premarket";
  if (t.includes("money flow") || t.includes("sector rotation")) return "prose-h2--flow";
  if (t.includes("leading indicator")) return "prose-h2--kpi";
  if (t.includes("needs attention")) return "prose-h2--attention";
  if (t.includes("position rating")) return "prose-h2--ratings";
  if (t.includes("portfolio recommendation") || t.includes("book-level")) return "prose-h2--stance";
  if (t.includes("ranked suggestion")) return "prose-h2--suggest";
  return undefined;
}

export function MarkdownBody({ content }: { content: string }) {
  const seen = new Set<string>();

  return (
    <div className="prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
          h2: ({ children }) => {
            const label = plainText(children).trim();
            let id = slugify(label) || "section";
            if (seen.has(id)) {
              let n = 2;
              while (seen.has(`${id}-${n}`)) n += 1;
              id = `${id}-${n}`;
            }
            seen.add(id);
            const accent = accentClass(label);
            return (
              <h2 id={id} className={accent}>
                {children}
              </h2>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

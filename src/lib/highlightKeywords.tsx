import type { ReactNode } from "react";

export function highlightKeywords(text: string, keywords: string[]): ReactNode {
  const terms = [...new Set(keywords)].sort((a, b) => b.length - a.length);
  if (terms.length === 0) return text;

  const keywordSet = new Set(terms.map((term) => term.toLowerCase()));
  const matcher = new RegExp(`(${terms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");

  return text.split(matcher).map((part, index) =>
    keywordSet.has(part.toLowerCase()) ? (
      <span className="font-semibold text-red-800" key={`${part}-${index}`}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}

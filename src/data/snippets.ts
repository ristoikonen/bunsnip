// src/data/snippets.ts

export interface CodeSnippet {
  id: string;
  title: string;
  code: string;
  keywords: string[];
}

export const SNIPPET_REGISTRY = {
  mapFilter: {
    id: "map-filter",
    title: "Transforming and Filtering with .map() and .filter()",
    keywords: ["map", "filter"],
    code: `const discountedElectronics = rawProducts
  .filter((p) => p.inStock && p.category === "Electronics")
  .map((p) => ({ ...p, finalPrice: +(p.price * 0.9).toFixed(2) }));`
  },
  satisfiesOp: {
    id: "satisfies-op",
    title: "Safe Object Definition with satisfies",
    keywords: ["satisfies", "as const"],
    code: `const theme = {
  primary: "#0077ff",
} satisfies Record<string, string>;`
  }
} satisfies Record<string, CodeSnippet>; 

// Dynamically compile a strict unique keyword list for your combo lookup
export const ALL_KEYWORDS = Array.from(
  new Set(Object.values(SNIPPET_REGISTRY).flatMap((s) => s.keywords))
);

import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SNIPPET_REGISTRY, ALL_KEYWORDS } from "./data/snippets";
import SelectDropdown from "./components/SelectDropdown";
import CodeCard from "./components/CodeCard";

export default function App() {
  const [selectedKeyword, setSelectedKeyword] = useState<string>("");
  const [selectedSnippetId, setSelectedSnippetId] = useState<string>("map-filter");

  const filteredSnippets = useMemo(() => {
    const list = Object.values(SNIPPET_REGISTRY);
    if (!selectedKeyword) return list;
    return list.filter((snippet) => snippet.keywords.includes(selectedKeyword));
  }, [selectedKeyword]);

  const activeSnippet = useMemo(() => {
    const found = Object.values(SNIPPET_REGISTRY).find(
      (snippet) => snippet.id === selectedSnippetId,
    );
    return found || filteredSnippets[0] || null;
  }, [selectedSnippetId, filteredSnippets]);

  const snippetDropdownOptions = Object.values(SNIPPET_REGISTRY).map((snippet) => ({
    value: snippet.id,
    label: snippet.title,
    keywords: snippet.keywords,
  }));

  const handleKeywordChange = (keyword: string) => {
    setSelectedKeyword(keyword);
    const matches = Object.values(SNIPPET_REGISTRY).filter(
      (snippet) => !keyword || snippet.keywords.includes(keyword),
    );
    if (matches.length > 0) {
      setSelectedSnippetId(matches[0].id);
    }
  };

  const handleSnippetChange = (snippetId: string) => {
    setSelectedSnippetId(snippetId);
    const snippet = Object.values(SNIPPET_REGISTRY).find((item) => item.id === snippetId);
    if (selectedKeyword && snippet && !snippet.keywords.includes(selectedKeyword)) {
      setSelectedKeyword("");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/70 via-blue-50/40 to-transparent"
      />
      <header className="relative border-b border-border/80 bg-white/90">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a className="inline-flex min-w-0 items-center gap-2.5 font-semibold tracking-tight" href="/">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              TS
            </span>
            <span className="flex min-w-0 flex-col">
              <span>BunSnip</span>
              <span className="hidden text-sm font-normal tracking-normal text-muted-foreground sm:block">
                Browse focused examples, filter by operator, and copy a snippet when you need it.
              </span>
            </span>
          </a>

        </div>
      </header>

      <main className="relative mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-14">
        <div className="grid items-start gap-5 lg:grid-cols-[minmax(21rem,1.2fr)_minmax(0,1.8fr)]">
          <Card className="border-border bg-card shadow-sm">
            <CardHeader className="border-b border-border px-5 py-5">
              <CardTitle className="text-base">Find a snippet</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 px-5 py-5">
              <SelectDropdown
                label="Code example"
                value={activeSnippet?.id || ""}
                options={snippetDropdownOptions}
                onChange={handleSnippetChange}
              />
              <SelectDropdown
                label="Filter by keyword"
                value={selectedKeyword}
                options={ALL_KEYWORDS}
                defaultOptionLabel="All keywords"
                onChange={handleKeywordChange}
              />
            </CardContent>
          </Card>

          <section aria-label="Snippet preview" className="min-w-0">
            {activeSnippet ? (
              <CodeCard snippet={activeSnippet} />
            ) : (
              <Card className="flex min-h-64 items-center justify-center border-border bg-card shadow-sm">
                <div className="px-6 text-center">
                  
                  <p className="text-sm font-medium">No matching snippets</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Try a different keyword to browse the library.
                  </p>
                </div>
              </Card>
            )}
          </section>
        </div>

        <footer className="mt-10 border-t border-border pt-5 text-center text-xs text-muted-foreground">
          Examples for TypeScript 7. &copy;Risto Ikonen 2026 <br/>
          Structural UI by shadcn/ui. Presentation logic by React. Vite assembles. Bun packs and runs it all.
        </footer>
      </main>
    </div>
  );
}

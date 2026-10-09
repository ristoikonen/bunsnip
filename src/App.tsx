import { useMemo, useState } from "react";
import { Code2, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
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

  const snippetDropdownOptions = useMemo(
    () =>
      filteredSnippets.map((snippet) => ({
        value: snippet.id,
        label: snippet.title,
      })),
    [filteredSnippets],
  );

  const handleKeywordChange = (keyword: string) => {
    setSelectedKeyword(keyword);
    const matches = Object.values(SNIPPET_REGISTRY).filter(
      (snippet) => !keyword || snippet.keywords.includes(keyword),
    );
    if (matches.length > 0) {
      setSelectedSnippetId(matches[0].id);
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
          <a className="inline-flex items-center gap-2.5 font-semibold tracking-tight" href="/">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Code2 className="size-4" aria-hidden="true" />
            </span>
            <span>BunSnip</span>
          </a>
          <Badge className="gap-1.5 border border-primary/20 bg-primary/10 text-primary" variant="outline">
            <Sparkles className="size-3" aria-hidden="true" />
            TypeScript snippets
          </Badge>
        </div>
      </header>

      <main className="relative mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <section className="mb-8 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            A practical reference
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            TypeScript Operator Code Hub
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
            Browse focused examples, filter by operator, and copy a snippet when you need it.
          </p>
        </section>

        <div className="grid items-start gap-5 lg:grid-cols-[minmax(15rem,0.75fr)_minmax(0,1.6fr)]">
          <Card className="border-border bg-card shadow-sm">
            <CardHeader className="border-b border-border px-5 py-5">
              <CardTitle className="text-base">Find a snippet</CardTitle>
              <CardDescription>Filter the library by keyword or title.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 px-5 py-5">
              <SelectDropdown
                label="Keyword or operator"
                value={selectedKeyword}
                options={ALL_KEYWORDS}
                defaultOptionLabel="All keywords"
                onChange={handleKeywordChange}
              />
              <SelectDropdown
                label="Code example"
                value={activeSnippet?.id || ""}
                options={snippetDropdownOptions}
                onChange={setSelectedSnippetId}
              />
              <div className="flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                <span>Available examples</span>
                <span className="font-medium text-foreground">{filteredSnippets.length}</span>
              </div>
            </CardContent>
          </Card>

          <section aria-label="Snippet preview" className="min-w-0">
            {activeSnippet ? (
              <CodeCard snippet={activeSnippet} />
            ) : (
              <Card className="flex min-h-64 items-center justify-center border-border bg-card shadow-sm">
                <div className="px-6 text-center">
                  <Code2 className="mx-auto mb-3 size-6 text-muted-foreground" aria-hidden="true" />
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
          Small examples for everyday TypeScript
        </footer>
      </main>
    </div>
  );
}

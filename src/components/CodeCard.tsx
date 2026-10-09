import { useState } from "react";
import { Check, Clipboard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { highlightKeywords } from "@/lib/highlightKeywords";
import { type CodeSnippet } from "../data/snippets";

interface CodeCardProps {
  snippet: CodeSnippet;
}

export default function CodeCard({ snippet }: CodeCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy snippet to clipboard:", error);
    }
  };

  return (
    <Card className="overflow-hidden border-border bg-card shadow-sm">
      <CardHeader className="gap-3 border-b border-border px-5 py-5 sm:px-6">
        <div className="flex min-w-0 items-start gap-3">
          <div className="min-w-0">
            <CardTitle className="text-lg leading-snug">
              {highlightKeywords(snippet.title, snippet.keywords)}
            </CardTitle>
          </div>
        </div>
        <div aria-label="Snippet keywords" className="flex flex-wrap gap-2">
          {snippet.keywords.map((keyword) => (
            <Badge className="border-border bg-muted text-muted-foreground" key={keyword} variant="outline">
              {keyword}
            </Badge>
          ))}
        </div>
        <div className="flex justify-end">
          <Button
            aria-label={copied ? "Snippet copied" : "Copy snippet"}
            className="shrink-0"
            onClick={() => void handleCopy()}
            size="sm"
            variant={copied ? "secondary" : "outline"}
          >
            {copied ? (
              <Check data-icon="inline-start" aria-hidden="true" />
            ) : (
              <Clipboard data-icon="inline-start" aria-hidden="true" />
            )}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-3 sm:p-4">
        <div className="overflow-hidden rounded-lg border border-border bg-slate-50">
          <div className="flex h-10 items-center gap-1.5 border-b border-border px-4">
            <span
              aria-label="TypeScript"
              className="inline-flex size-5 items-center justify-center rounded-sm bg-[#3178c6] text-[9px] font-bold leading-none text-white"
            >
              TS
            </span>
            <span className="ml-2 font-mono text-[11px] text-muted-foreground">example.ts</span>
          </div>
          <pre className="overflow-x-auto p-4 text-left font-mono text-[13px] leading-6 text-slate-800 sm:p-5 sm:text-sm">
            <code>{snippet.code}</code>
          </pre>
        </div>
      </CardContent>
      <div aria-live="polite" className="sr-only" role="status">
        {copied ? "Snippet copied to clipboard." : ""}
      </div>
    </Card>
  );
}

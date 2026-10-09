import { useState } from "react";
import { Check, Clipboard } from "lucide-react";
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

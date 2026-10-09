import { useState } from "react";
import { Check, Clipboard, Code2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
      <CardHeader className="gap-4 border-b border-border px-5 py-5 sm:px-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 space-y-2">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Code2 className="size-3.5 text-primary" aria-hidden="true" />
              TypeScript example
            </div>
            <CardTitle className="text-lg leading-snug">{snippet.title}</CardTitle>
            <CardDescription>Ready to copy into your project.</CardDescription>
          </div>
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
        <div aria-label="Snippet keywords" className="flex flex-wrap gap-2">
          {snippet.keywords.map((keyword) => (
            <Badge className="border-border bg-muted text-muted-foreground" key={keyword} variant="outline">
              {keyword}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="p-3 sm:p-4">
        <div className="overflow-hidden rounded-lg border border-border bg-slate-50">
          <div className="flex h-10 items-center gap-1.5 border-b border-border px-4">
            <span className="size-2 rounded-full bg-slate-300" />
            <span className="size-2 rounded-full bg-slate-300" />
            <span className="size-2 rounded-full bg-slate-300" />
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

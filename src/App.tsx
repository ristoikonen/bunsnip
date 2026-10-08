import { useState, useMemo } from "react";
import { SNIPPET_REGISTRY, ALL_KEYWORDS } from "./data/snippets";
import SelectDropdown from "./components/SelectDropdown";
import CodeCard from "./components/CodeCard";

export default function App() {
  const [selectedKeyword, setSelectedKeyword] = useState<string>("");
  const [selectedSnippetId, setSelectedSnippetId] = useState<string>("map-filter");

  // Filter available snippets by keyword
  const filteredSnippets = useMemo(() => {
    const list = Object.values(SNIPPET_REGISTRY);
    if (!selectedKeyword) return list;
    return list.filter((s) => s.keywords.includes(selectedKeyword));
  }, [selectedKeyword]);

  // Track active data
  const activeSnippet = useMemo(() => {
    const found = Object.values(SNIPPET_REGISTRY).find((s) => s.id === selectedSnippetId);
    return found || filteredSnippets[0] || null;
  }, [selectedSnippetId, filteredSnippets]);

  // Format snippet items to fit the object option schema
  const snippetDropdownOptions = useMemo(() => {
    return filteredSnippets.map((s) => ({
      value: s.id,
      label: s.title,
    }));
  }, [filteredSnippets]);

  const handleKeywordChange = (keyword: string) => {
    setSelectedKeyword(keyword);
    const matches = Object.values(SNIPPET_REGISTRY).filter((s) => 
      !keyword || s.keywords.includes(keyword)
    );
    if (matches.length > 0) {
      setSelectedSnippetId(matches[0].id);
    }
  };

  return (
    <div style={{ padding: "32px", maxWidth: "700px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h2>TypeScript Operator Code Hub</h2>
      
      {/* Instance 1: The Keyword Selection Filter */}
      <SelectDropdown
        label="🔍 Find Keywords / Operators:"
        value={selectedKeyword}
        options={ALL_KEYWORDS}
        defaultOptionLabel="-- All Keywords --"
        onChange={handleKeywordChange}
      />

      {/* Instance 2: The Core Code Title Selection */}
      <SelectDropdown
        label="📄 Code Title Selection:"
        value={activeSnippet?.id || ""}
        options={snippetDropdownOptions}
        onChange={(id) => setSelectedSnippetId(id)}
      />

      {/* Preview Snippet Code Card */}
      {activeSnippet && <CodeCard snippet={activeSnippet} />}
    </div>
  );
}

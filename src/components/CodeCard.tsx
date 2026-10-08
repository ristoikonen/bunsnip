// src/components/CodeCard.tsx
import { useState } from "react";
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
      setTimeout(() => setCopied(false), 2000); // Reset state after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div style={{ 
      border: "1px solid #e2e8f0", 
      borderRadius: "8px", 
      padding: "20px", 
      boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
      backgroundColor: "#ffffff",
      position: "relative"
    }}>
      {/* Title & Copy Action header area */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
        <h3 style={{ margin: 0, color: "#1a202c", fontSize: "18px" }}>{snippet.title}</h3>
        
        <button
          onClick={handleCopy}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            background: copied ? "#48bb78" : "#edf2f7",
            color: copied ? "#ffffff" : "#4a5568",
            border: "none",
            padding: "6px 12px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: "500",
            transition: "all 0.2s ease"
          }}
        >
          {/* Material Symbols Outlined Icon */}
          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
            {copied ? "check" : "content_copy"}
          </span>
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      
      {/* Keywords / Tags Row */}
      <div style={{ marginBottom: "16px" }}>
        {snippet.keywords.map((kw) => (
          <span 
            key={kw} 
            style={{ 
              background: "#e2e8f0", 
              color: "#4a5568", 
              padding: "4px 10px", 
              borderRadius: "12px", 
              fontSize: "12px", 
              marginRight: "8px", 
              fontWeight: "500" 
            }}
          >
            #{kw}
          </span>
        ))}
      </div>

      {/* Code window block */}
      <pre style={{ 
        backgroundColor: "#1a202c", 
        color: "#edf2f7", 
        padding: "16px", 
        borderRadius: "6px", 
        overflowX: "auto", 
        fontSize: "14px", 
        lineHeight: "1.5",
        margin: 0
      }}>
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}

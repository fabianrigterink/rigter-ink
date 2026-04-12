"use client";

import { useState } from "react";

export default function BibTeXBlock({ bibtex }: { bibtex: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(bibtex).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 text-xs font-mono text-ink-muted hover:text-ink transition-colors px-2 py-1 rounded border border-border hover:border-ink/20 bg-white"
        aria-expanded={open}
      >
        <span className="text-[10px]">{open ? "▲" : "▼"}</span>
        BibTeX
      </button>

      {open && (
        <div className="mt-2 relative">
          <pre className="font-mono text-sm leading-[1.6] bg-[#1e1e1e] text-[#c9d1d9] rounded-xl overflow-x-auto px-6 py-5 whitespace-pre-wrap">
            {bibtex}
          </pre>
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 text-[10px] font-mono px-2 py-1 rounded bg-white/10 text-[#c9d1d9] hover:bg-white/20 transition-all"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
}

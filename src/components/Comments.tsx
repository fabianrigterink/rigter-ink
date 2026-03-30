"use client";

import Giscus from "@giscus/react";

export default function Comments() {
  return (
    <div className="mt-16 pt-8 border-t border-border-light">
      <Giscus
        repo="frigterink/rigter-ink"
        repoId=""
        category="Blog Comments"
        categoryId=""
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="light"
        lang="en"
        loading="lazy"
      />
      <p className="text-xs text-ink-muted mt-4">
        Comments powered by GitHub Discussions. You&apos;ll need a GitHub account to comment.
        The repo ID and category ID above need to be configured — see{" "}
        <a
          href="https://giscus.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-cerulean hover:text-ink transition-colors underline underline-offset-2"
        >
          giscus.app
        </a>{" "}
        for setup instructions.
      </p>
    </div>
  );
}

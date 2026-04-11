"use client";

import Giscus from "@giscus/react";

export default function Comments() {
  return (
    <div className="mt-16 pt-8 border-t border-border-light">
      <Giscus
        repo="fabianrigterink/rigter-ink"
        repoId="R_kgDOR02tOw"
        category="Announcements"
        categoryId="DIC_kwDOR02tO84C6IWW"
        mapping="pathname"
        strict="0"
        reactionsEnabled="0"
        emitMetadata="0"
        inputPosition="top"
        theme="light"
        lang="en"
        loading="lazy"
      />
    </div>
  );
}

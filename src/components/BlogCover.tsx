"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

interface BlogCoverProps {
  src: string;
  alt?: string;
}

export default function BlogCover({ src, alt }: BlogCoverProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="wide-bleed mb-12">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Expand cover image"
          className="relative block w-full aspect-video p-0 overflow-hidden rounded-xl border border-border-light bg-surface-alt cursor-pointer hover:opacity-95 transition-opacity"
        >
          <Image
            src={src}
            alt={alt ?? ""}
            fill
            priority
            sizes="(max-width: 1080px) 100vw, 1080px"
            className="object-cover"
          />
        </button>
      </div>

      <Lightbox
        slides={[{ src, alt: alt ?? "" }]}
        open={open}
        index={0}
        close={() => setOpen(false)}
        plugins={[Zoom]}
      />
    </>
  );
}

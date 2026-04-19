"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

interface MdxImageProps {
  src?: string;
  alt?: string;
  title?: string;
}

export default function MdxImage({ src, alt, title }: MdxImageProps) {
  const [open, setOpen] = useState(false);

  if (!src) return null;

  return (
    <>
      <span className="block my-8">
        <img
          src={src}
          alt={alt ?? ""}
          className="block w-full rounded border border-border cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => setOpen(true)}
          loading="lazy"
        />
        {title && (
          <span className="block mt-2 text-sm text-ink-muted text-center">
            {title}
          </span>
        )}
      </span>

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

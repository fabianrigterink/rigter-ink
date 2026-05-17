"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

interface MdxImageProps {
  src?: string;
  alt?: string;
  title?: string;
}

const PLACEHOLDER_W = 1600;
const PLACEHOLDER_H = 1067;

export default function MdxImage({ src, alt, title }: MdxImageProps) {
  const [open, setOpen] = useState(false);

  if (!src) return null;

  return (
    <>
      <span className="block my-8">
        <Image
          src={src}
          alt={alt ?? ""}
          width={PLACEHOLDER_W}
          height={PLACEHOLDER_H}
          sizes="(max-width: 720px) 100vw, 720px"
          className="block w-full h-auto rounded border border-border cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => setOpen(true)}
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

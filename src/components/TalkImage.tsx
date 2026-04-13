"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

interface TalkImageProps {
  src: string;
  alt: string;
}

export default function TalkImage({ src, alt }: TalkImageProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <img
        src={src}
        alt={alt}
        className="w-2/3 rounded border border-border cursor-pointer hover:opacity-90 transition-opacity"
        onClick={() => setOpen(true)}
      />

      <Lightbox
        slides={[{ src, alt }]}
        open={open}
        index={0}
        close={() => setOpen(false)}
        plugins={[Zoom]}
      />
    </>
  );
}

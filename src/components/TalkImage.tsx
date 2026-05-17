"use client";

import { useState } from "react";
import Image from "next/image";
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
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block mx-auto w-2/3 cursor-pointer rounded border border-border overflow-hidden hover:opacity-90 transition-opacity p-0"
      >
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={1000}
          sizes="(max-width: 720px) 66vw, 480px"
          className="block w-full h-auto"
        />
      </button>

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

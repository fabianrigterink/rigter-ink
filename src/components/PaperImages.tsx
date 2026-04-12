"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

interface PaperImagesProps {
  journalImage?: string;
  paperImage?: string;
  venueAlt: string;
  titleAlt: string;
}

export default function PaperImages({
  journalImage,
  paperImage,
  venueAlt,
  titleAlt,
}: PaperImagesProps) {
  const [index, setIndex] = useState(-1);

  const slides = [
    journalImage && { src: journalImage, alt: venueAlt },
    paperImage && { src: paperImage, alt: titleAlt },
  ].filter(Boolean) as { src: string; alt: string }[];

  if (slides.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {slides.map((slide, i) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            className="w-full rounded border border-border cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => setIndex(i)}
          />
        ))}
      </div>

      <Lightbox
        slides={slides}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Zoom]}
      />
    </>
  );
}

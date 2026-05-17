"use client";

import { useState } from "react";
import Image from "next/image";
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

  const twoUp = slides.length === 2;

  return (
    <>
      {twoUp ? (
        <div className="flex gap-6 items-start justify-center flex-wrap">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setIndex(i)}
              className="block h-80 sm:h-96 cursor-pointer rounded border border-border overflow-hidden hover:opacity-90 transition-opacity p-0"
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                width={1200}
                height={1600}
                sizes="(max-width: 720px) 80vw, 400px"
                className="block w-auto h-full"
              />
            </button>
          ))}
        </div>
      ) : (
        <div className="flex justify-center">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setIndex(i)}
              className="block w-1/2 cursor-pointer rounded border border-border overflow-hidden hover:opacity-90 transition-opacity p-0"
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                width={1200}
                height={1600}
                sizes="(max-width: 720px) 50vw, 420px"
                className="block w-full h-auto"
              />
            </button>
          ))}
        </div>
      )}

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

"use client";

import { useState } from "react";
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export default function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState(-1);

  const imgNumber = (src: string) => {
    const match = src.match(/IMG_(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  };
  // The camera's counter rolls over from IMG_9999 to IMG_0001. When a trip
  // spans that rollover (numbers at both ends of the range), the low numbers
  // are the later photos, so shift them past the high ones.
  const numbers = photos.map((p) => imgNumber(p.src));
  const wrapped = Math.max(...numbers) - Math.min(...numbers) > 5000;
  const sortKey = (src: string) => {
    const n = imgNumber(src);
    return wrapped && n < 5000 ? n + 10000 : n;
  };
  const ordered = [...photos].sort((a, b) => sortKey(a.src) - sortKey(b.src));

  return (
    <>
      <RowsPhotoAlbum
        photos={ordered}
        targetRowHeight={300}
        spacing={12}
        onClick={({ index }) => setIndex(index)}
      />

      <Lightbox
        slides={ordered}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Zoom]}
      />
    </>
  );
}

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
  const ordered = [...photos].sort((a, b) => imgNumber(a.src) - imgNumber(b.src));

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

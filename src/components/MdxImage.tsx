import Image from "next/image";

interface MdxImageProps {
  src?: string;
  alt?: string;
}

export default function MdxImage({ src, alt }: MdxImageProps) {
  if (!src) return null;

  // External images (Unsplash etc.) — use next/image with fill
  if (src.startsWith("http")) {
    return (
      <span className="block relative w-full aspect-[2/1] my-8 rounded-xl overflow-hidden">
        <Image
          src={src}
          alt={alt ?? ""}
          fill
          className="object-cover"
          sizes="(max-width: 720px) 100vw, 720px"
          loading="lazy"
        />
      </span>
    );
  }

  // Local images
  return (
    <span className="block relative w-full aspect-[2/1] my-8 rounded-xl overflow-hidden">
      <Image
        src={src}
        alt={alt ?? ""}
        fill
        className="object-cover"
        sizes="(max-width: 720px) 100vw, 720px"
        loading="lazy"
      />
    </span>
  );
}

import Link from "next/link";

// 12-color palette: 6 base + 6 lighter variants
const PALETTE: { bg: string; hover: string; darkText?: boolean }[] = [
  { bg: "bg-cerulean",       hover: "hover:bg-cerulean/80" },                  // #007BA7
  { bg: "bg-cerulean-light", hover: "hover:bg-cerulean-light/80" },            // #5BAFD0
  { bg: "bg-orange",         hover: "hover:bg-orange/80",    darkText: true }, // #FFC067
  { bg: "bg-orange-light",   hover: "hover:bg-orange-light/80", darkText: true }, // #FFDAA0
  { bg: "bg-sage",           hover: "hover:bg-sage/80" },                      // #98A869
  { bg: "bg-sage-light",     hover: "hover:bg-sage-light/80", darkText: true },// #BCC99A
  { bg: "bg-pink",           hover: "hover:bg-pink/80" },                      // #C11C84
  { bg: "bg-pink-light",     hover: "hover:bg-pink-light/80" },               // #D96DB3
  { bg: "bg-red",            hover: "hover:bg-red/80" },                       // #CD1C18
  { bg: "bg-red-light",      hover: "hover:bg-red-light/80" },                // #E06B5E
  { bg: "bg-slate",          hover: "hover:bg-slate/80" },                     // #6D8196
  { bg: "bg-slate-light",    hover: "hover:bg-slate-light/80" },              // #9BAEBD
];

function hashTag(tag: string): number {
  // FNV-1a for better distribution across the palette
  let hash = 2166136261;
  for (let i = 0; i < tag.length; i++) {
    hash ^= tag.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash);
}

function getTagColor(tag: string) {
  const idx = hashTag(tag) % PALETTE.length;
  const entry = PALETTE[idx];
  const textClass = entry.darkText ? "text-ink" : "text-white";
  return { bg: entry.bg, hover: entry.hover, text: textClass };
}

interface TagBadgeProps {
  tag: string;
  count?: number;
}

export default function TagBadge({ tag, count }: TagBadgeProps) {
  const color = getTagColor(tag);

  return (
    <Link
      href={`/blog/tag/${encodeURIComponent(tag)}`}
      className={`inline-block text-xs font-mono px-2 py-0.5 rounded transition-colors no-underline ${color.bg} ${color.text} ${color.hover}`}
    >
      {tag}{count !== undefined && ` (${count})`}
    </Link>
  );
}

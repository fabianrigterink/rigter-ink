import Link from "next/link";

interface TagBadgeProps {
  tag: string;
  count?: number;
}

export default function TagBadge({ tag, count }: TagBadgeProps) {
  return (
    <Link
      href={`/tag/${encodeURIComponent(tag)}`}
      className="inline-block text-xs font-mono px-2 py-0.5 rounded transition-colors no-underline bg-surface-alt text-ink-muted hover:text-ink hover:bg-border"
    >
      {tag}{count !== undefined && ` (${count})`}
    </Link>
  );
}

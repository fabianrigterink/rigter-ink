const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

interface Parsed {
  year: string;
  month?: number; // 1-12
  day?: number;
}

function parse(input: string | number | undefined | null): Parsed | null {
  if (input === undefined || input === null) return null;
  if (typeof input === "number") return { year: String(input) };

  const s = input.trim();
  if (!s) return null;

  // Bare 4-digit year: "2024"
  if (/^\d{4}$/.test(s)) return { year: s };

  // ISO-ish: 2024, 2024-06, 2024-06-22
  const iso = s.match(/^(\d{4})(?:-(\d{1,2}))?(?:-(\d{1,2}))?$/);
  if (iso) {
    return {
      year: iso[1],
      month: iso[2] ? parseInt(iso[2], 10) : undefined,
      day: iso[3] ? parseInt(iso[3], 10) : undefined,
    };
  }

  // Try the native Date parser as a last resort.
  const d = new Date(s);
  if (!isNaN(d.getTime())) {
    return {
      year: String(d.getUTCFullYear()),
      month: d.getUTCMonth() + 1,
      day: d.getUTCDate(),
    };
  }

  return null;
}

/** "Apr 2024" — for listing right-rails. Falls back to raw input on failure. */
export function formatDateShort(input: string | number | undefined | null): string {
  const p = parse(input);
  if (!p) return typeof input === "string" ? input : "";
  if (p.month) return `${MONTHS_SHORT[p.month - 1]} ${p.year}`;
  return p.year;
}

/** "22 Apr 2024" — for detail page headers. Falls back to short / raw. */
export function formatDateLong(input: string | number | undefined | null): string {
  const p = parse(input);
  if (!p) return typeof input === "string" ? input : "";
  if (p.day && p.month) return `${p.day} ${MONTHS_SHORT[p.month - 1]} ${p.year}`;
  if (p.month) return `${MONTHS_SHORT[p.month - 1]} ${p.year}`;
  return p.year;
}

/** Just the 4-digit year, for the paper right-rail. */
export function formatYear(input: string | number | undefined | null): string {
  const p = parse(input);
  return p?.year ?? "";
}

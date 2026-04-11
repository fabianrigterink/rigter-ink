export interface Patent {
  slug: string;
  title: string;
  description: string;
  number?: string; // patent number, available once published/granted
  status: "pending" | "published" | "granted";
  date: string; // YYYY-MM (filing date, or grant date if granted)
  url?: string;
  inventors: string[];
}

export function getAllPatents(): Patent[] {
  const patents: Patent[] = [];
  return patents.sort((a, b) => (a.date > b.date ? -1 : 1));
}

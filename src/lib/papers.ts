export interface Paper {
  slug: string;
  title: string;
  description: string;
  venue: string;
  date: string; // YYYY-MM
  url?: string;
  tags: string[];
}

export function getAllPapers(): Paper[] {
  const papers: Paper[] = [];
  return papers.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export interface Talk {
  slug: string;
  title: string;
  description: string;
  event: string;
  location?: string;
  date: string; // YYYY-MM
  url?: string; // slides, recording, etc.
  tags: string[];
}

export function getAllTalks(): Talk[] {
  const talks: Talk[] = [];
  return talks.sort((a, b) => (a.date > b.date ? -1 : 1));
}

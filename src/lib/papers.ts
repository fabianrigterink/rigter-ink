import fs from "fs";
import path from "path";
import matter from "gray-matter";

const PAPERS_DIR = path.join(process.cwd(), "content", "papers");

export interface Paper {
  slug: string;
  title: string;
  authors: string[];
  type: "journal" | "conference" | "preprint" | "thesis";
  thesisType?: "bachelor" | "master" | "phd";
  venue: string;
  volume?: string;
  issue?: string;
  pages?: string;
  year: number;
  date: string; // YYYY-MM for sorting
  doi?: string;
  url?: string;
  bibtex: string;
  journalImage?: string;
  paperImage?: string;
  description: string;
  tags: string[];
}

export function getAllPapers(): Paper[] {
  if (!fs.existsSync(PAPERS_DIR)) return [];

  const files = fs.readdirSync(PAPERS_DIR).filter((f) => f.endsWith(".mdx"));

  const papers = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(PAPERS_DIR, file), "utf-8");
    const { data } = matter(raw);

    return {
      slug,
      title: data.title ?? slug,
      authors: data.authors ?? [],
      type: data.type ?? "journal",
      thesisType: data.thesisType,
      venue: data.venue ?? "",
      volume: data.volume != null ? String(data.volume) : undefined,
      issue: data.issue != null ? String(data.issue) : undefined,
      pages: data.pages != null ? String(data.pages) : undefined,
      year: Number(data.year) ?? 0,
      date: String(data.date ?? ""),
      doi: data.doi,
      url: data.url,
      bibtex: (data.bibtex ?? "").trim(),
      journalImage: data.journalImage,
      paperImage: data.paperImage,
      description: data.description ?? "",
      tags: data.tags ?? [],
    } as Paper;
  });

  return papers.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPaperBySlug(slug: string): Paper | undefined {
  return getAllPapers().find((p) => p.slug === slug);
}

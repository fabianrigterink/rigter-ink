import fs from "fs";
import path from "path";
import matter from "gray-matter";

const TALKS_DIR = path.join(process.cwd(), "content", "talks");

export interface Talk {
  slug: string;
  title: string;
  description: string;
  type: "conference" | "seminar";
  venue: string;
  location: string;
  date: string; // YYYY-MM for sorting
  url?: string;
  previewImage?: string;
}

export function getAllTalks(): Talk[] {
  if (!fs.existsSync(TALKS_DIR)) return [];

  const files = fs.readdirSync(TALKS_DIR).filter((f) => f.endsWith(".mdx"));

  const talks = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(TALKS_DIR, file), "utf-8");
    const { data } = matter(raw);

    return {
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      type: data.type ?? "conference",
      venue: data.venue ?? "",
      location: data.location ?? "",
      date: String(data.date ?? ""),
      url: data.url,
      previewImage: data.previewImage,
    } as Talk;
  });

  return talks.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getTalkBySlug(slug: string): Talk | undefined {
  return getAllTalks().find((t) => t.slug === slug);
}

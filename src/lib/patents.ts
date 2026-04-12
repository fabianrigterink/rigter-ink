import fs from "fs";
import path from "path";
import matter from "gray-matter";

const PATENTS_DIR = path.join(process.cwd(), "content", "patents");

export interface Patent {
  slug: string;
  title: string;
  description: string;
  number?: string;
  date: string; // YYYY-MM for sorting
  publicationDate?: string;
  url?: string;
  inventors: string[];
  assignee?: string;
  previewImage?: string;
}

export function getAllPatents(): Patent[] {
  if (!fs.existsSync(PATENTS_DIR)) return [];

  const files = fs.readdirSync(PATENTS_DIR).filter((f) => f.endsWith(".mdx"));

  const patents = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(PATENTS_DIR, file), "utf-8");
    const { data } = matter(raw);

    return {
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      number: data.number,
      date: String(data.date ?? ""),
      publicationDate: data.publicationDate,
      url: data.url,
      inventors: data.inventors ?? [],
      assignee: data.assignee,
      previewImage: data.previewImage,
    } as Patent;
  });

  return patents.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPatentBySlug(slug: string): Patent | undefined {
  return getAllPatents().find((p) => p.slug === slug);
}

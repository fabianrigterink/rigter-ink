export interface Project {
  slug: string;
  title: string;
  description: string;
  type: "paper" | "patent" | "presentation" | "project";
  date: string;
  url?: string;
  tags: string[];
}

// Placeholder data — replace with real projects later
export function getAllProjects(): Project[] {
  const projects: Project[] = [
    {
      slug: "rigter-ink",
      title: "rigter.ink",
      description: "This personal homepage, built with Next.js 15, Tailwind CSS 4, and MDX.",
      type: "project",
      date: "2026-03",
      url: "https://github.com/fabianrigterink/rigter-ink",
      tags: ["next.js", "react", "tailwind"],
    },
  ];
  return projects.sort((a, b) => (a.date > b.date ? -1 : 1));
}

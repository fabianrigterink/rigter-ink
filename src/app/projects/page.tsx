import { notFound } from "next/navigation";
// import type { Metadata } from "next";
// import { getAllProjects } from "@/lib/projects";
// import TagBadge from "@/components/TagBadge";

// export const metadata: Metadata = {
//   title: "Projects",
//   description: "Papers, patents, presentations, and weekend projects.",
// };

// const typeLabels: Record<string, string> = {
//   paper: "Paper",
//   patent: "Patent",
//   presentation: "Talk",
//   project: "Project",
// };

export default function ProjectsIndex() {
  notFound();
  // const projects = getAllProjects();

  return (
    <div className="max-w-180 mx-auto px-6 py-20">
      <h1 className="font-serif text-[clamp(40px,5vw,64px)] leading-[1.05] tracking-[-2px] text-ink mb-6">
        Projects
      </h1>
      <p className="text-ink-muted mb-12 leading-relaxed">
        Papers, patents, presentations, and weekend projects.
      </p>

      {projects.length === 0 ? (
        <p className="text-ink-muted">Nothing here yet. Check back soon.</p>
      ) : (
        <div className="space-y-8">
          {projects.map((project) => (
            <article key={project.slug} className="group">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-mono text-ink-muted bg-surface-alt px-2 py-0.5 rounded">
                    {typeLabels[project.type] ?? project.type}
                  </span>
                  <time className="text-sm text-ink-muted font-mono">{project.date}</time>
                </div>
                <div>
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-medium text-ink group-hover:text-cerulean transition-colors no-underline"
                    >
                      {project.title} ↗
                    </a>
                  ) : (
                    <h2 className="text-lg font-medium text-ink">
                      {project.title}
                    </h2>
                  )}
                  <p className="text-ink-muted text-sm mt-1 leading-relaxed">
                    {project.description}
                  </p>
                  {project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.tags.map((tag) => (
                        <TagBadge key={tag} tag={tag} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

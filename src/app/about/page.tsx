import type { Metadata } from "next";
import Link from "next/link";
import { GitHubIcon, LinkedInIcon } from "@/components/SocialIcons";

export const metadata: Metadata = {
  title: "About",
  description: "About Fabian Rigterink — Engineering Manager, ML at Baton.",
};

export default function About() {
  return (
    <div className="max-w-180 mx-auto px-6 py-20">
      <h1 className="font-serif text-[clamp(40px,5vw,64px)] leading-[1.05] tracking-[-2px] text-ink mb-10">
        About
      </h1>

      <div className="space-y-5 text-ink-light leading-relaxed max-w-145">
        <p>
          I&apos;m Fabian, an Engineering Manager for Machine Learning at{" "}
          <a href="https://www.baton.io/" className="text-cerulean hover:text-ink transition-colors underline underline-offset-2">
            Baton
          </a>
          . I have a background in research, with interests spanning AI, machine learning,
          data science, and operations research.
        </p>
        <p>
          Before moving into engineering management, I worked as a {"{"}research, applied,
          data{"}"} scientist, building systems that bridge the gap between research and
          production.
        </p>
        <p>
          This site is where I share my writing on technical topics and document my travels.
        </p>
      </div>

      <section className="mt-16">
        <h2 className="font-serif text-2xl tracking-tight text-ink mb-6">Research</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/about/papers"
            className="group flex flex-col gap-3 p-5 border border-border rounded-xl bg-white hover:border-cerulean/40 hover:shadow-sm transition-all no-underline"
          >
            <div className="h-0.75 w-10 rounded-full bg-cerulean" />
            <span className="font-medium text-ink group-hover:text-cerulean transition-colors">Papers</span>
            <span className="text-sm text-ink-muted leading-relaxed">Academic publications and research papers.</span>
          </Link>
          <Link
            href="/about/patents"
            className="group flex flex-col gap-3 p-5 border border-border rounded-xl bg-white hover:border-sage/40 hover:shadow-sm transition-all no-underline"
          >
            <div className="h-0.75 w-10 rounded-full bg-sage" />
            <span className="font-medium text-ink group-hover:text-cerulean transition-colors">Patents</span>
            <span className="text-sm text-ink-muted leading-relaxed">Patent applications and grants.</span>
          </Link>
          <Link
            href="/about/talks"
            className="group flex flex-col gap-3 p-5 border border-border rounded-xl bg-white hover:border-orange/40 hover:shadow-sm transition-all no-underline"
          >
            <div className="h-0.75 w-10 rounded-full bg-orange" />
            <span className="font-medium text-ink group-hover:text-cerulean transition-colors">Talks</span>
            <span className="text-sm text-ink-muted leading-relaxed">Talks and presentations at conferences.</span>
          </Link>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-serif text-2xl tracking-tight text-ink mb-4">Get in touch</h2>
        <p className="text-ink-light leading-relaxed mb-6">
          Feel free to reach out on any of the platforms below.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://github.com/fabianrigterink"
            className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm text-ink-muted bg-white hover:text-ink hover:border-ink/20 transition-all"
          >
            <GitHubIcon className="w-4 h-4 shrink-0" />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/fabianrigterink/"
            className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm text-ink-muted bg-white hover:text-ink hover:border-ink/20 transition-all"
          >
            <LinkedInIcon className="w-4 h-4 shrink-0" />
            LinkedIn
          </a>
          <a
            href="mailto:fabian@rigter.ink"
            className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm text-ink-muted bg-white hover:text-ink hover:border-ink/20 transition-all"
          >
            fabian@rigter.ink
          </a>
        </div>
      </section>
    </div>
  );
}

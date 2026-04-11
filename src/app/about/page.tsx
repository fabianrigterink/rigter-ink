import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "About Fabian Rigterink — Engineering Manager, ML at Baton.",
};

export default function About() {
  return (
    <div className="max-w-[720px] mx-auto px-6 py-20">
      <h1 className="font-serif text-[clamp(32px,4vw,48px)] leading-[1.15] tracking-[-1px] text-ink mb-8">
        About
      </h1>

      <div className="space-y-6 text-ink-light leading-relaxed">
        <p>
          I'm Fabian, an Engineering Manager for Machine Learning at <a href="https://www.baton.io/" className="text-cerulean hover:text-ink transition-colors underline underline-offset-2">Baton</a>.
          I have a background in research, with interests spanning AI, machine learning,
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
        <h2 className="font-serif text-[28px] leading-[1.3] tracking-[-0.3px] text-ink mb-6">
          Research
        </h2>
        <ul className="space-y-2 text-ink-light leading-relaxed">
          <li>
            <Link href="/about/papers" className="text-cerulean hover:text-ink transition-colors underline underline-offset-2">
              Papers
            </Link>
            {" "}— academic publications and research papers.
          </li>
          <li>
            <Link href="/about/patents" className="text-cerulean hover:text-ink transition-colors underline underline-offset-2">
              Patents
            </Link>
            {" "}— patent applications and grants.
          </li>
          <li>
            <Link href="/about/talks" className="text-cerulean hover:text-ink transition-colors underline underline-offset-2">
              Talks
            </Link>
            {" "}— talks and presentations at conferences and meetups.
          </li>
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="font-serif text-[28px] leading-[1.3] tracking-[-0.3px] text-ink mb-6">
          Get in touch
        </h2>
        <p className="text-ink-light leading-relaxed mb-4">
          You can find me on{" "}
          <a href="https://github.com/fabianrigterink" className="text-cerulean hover:text-ink transition-colors underline underline-offset-2">
            GitHub
          </a>{" "}
          and{" "}
          <a href="https://www.linkedin.com/in/fabianrigterink/" className="text-cerulean hover:text-ink transition-colors underline underline-offset-2">
            LinkedIn
          </a>, or reach me by email at{" "}
          <a href="mailto:fabian@rigter.ink" className="text-cerulean hover:text-ink transition-colors underline underline-offset-2">
            fabian@rigter.ink
          </a>.
        </p>
      </section>
    </div>
  );
}

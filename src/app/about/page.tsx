import type { Metadata } from "next";

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
          I'm Fabian Rigterink, an Engineering Manager for Machine Learning at Baton.
          I have a background in research, with interests spanning AI, machine learning,
          data science, and operations research.
        </p>
        <p>
          Before moving into engineering management, I worked as a researcher focusing on
          optimization and machine learning. I enjoy building systems that bridge the gap
          between research and production.
        </p>
        <p>
          Outside of work, I love traveling and photography. I've documented my trips
          across many countries, and you can explore them in the{" "}
          <a href="/travels" className="text-cerulean hover:text-ink transition-colors underline underline-offset-2">
            travels section
          </a>.
        </p>
        <p>
          This site is where I share my writing on technical topics, showcase projects
          and publications, and document my travels. It's built with Next.js and deployed
          on Vercel.
        </p>
      </div>

      <section className="mt-16">
        <h2 className="font-serif text-[28px] leading-[1.3] tracking-[-0.3px] text-ink mb-6">
          Get in touch
        </h2>
        <p className="text-ink-light leading-relaxed mb-4">
          You can find me on{" "}
          <a href="https://github.com/frigterink" className="text-cerulean hover:text-ink transition-colors underline underline-offset-2">
            GitHub
          </a>{" "}
          and{" "}
          <a href="https://linkedin.com/in/frigterink" className="text-cerulean hover:text-ink transition-colors underline underline-offset-2">
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

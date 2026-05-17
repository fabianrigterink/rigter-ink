import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import PostList from "@/components/PostList";

export default function Home() {
  const posts = getAllPosts().slice(0, 6);

  return (
    <div className="max-w-180 mx-auto px-6">
      {/* Hero with gradient banner + bridge cutout */}
      <section className="relative py-8 sm:py-12 min-h-64 sm:min-h-80">
        <div
          className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-screen -z-10 overflow-hidden"
          style={{
            background:
              "linear-gradient(to bottom," +
              " rgb(134,193,211)   0%," +
              " rgb(154,202,214)  12%," +
              " rgb(166,205,212)  24%," +
              " rgb(176,210,212)  37%," +
              " rgb(185,211,208)  49%," +
              " rgb(187,208,201)  62%," +
              " rgb(215,221,207)  74%," +
              " rgb(209,214,210)  87%," +
              " rgb(201,207,205) 100%)",
          }}
        >
          <div
            className="bridge-parallax absolute top-0 bottom-0 pointer-events-none"
            style={{
              left: "70%",
              translate: "-50% 0",
              aspectRatio: "1200 / 2281",
            }}
          >
            <Image
              src="https://res.cloudinary.com/dwp6mzleh/image/upload/f_auto,q_auto/v1779040299/bridge_p1es8b.png"
              alt=""
              fill
              priority
              sizes="(max-width: 640px) 150px, 250px"
              className="object-contain"
            />
          </div>
          <div className="absolute inset-0 bg-white/50 pointer-events-none" />
        </div>
        <h1 className="font-serif text-[clamp(56px,8vw,80px)] leading-[0.95] tracking-[-0.04em] text-ink mb-8">
          Hi, I&apos;m<br />Fabian.
        </h1>
        <p className="text-lg text-ink-light leading-relaxed max-w-145 mb-10">
          Engineering Manager for Machine Learning at{" "}
          <a href="https://www.baton.io/" className="text-link hover:text-ink transition-colors underline underline-offset-2">
            Baton
          </a>
          . I write about AI, machine learning,
          data science, and operations research.
        </p>
        <div className="flex gap-6">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1.5 text-link hover:text-ink transition-colors font-medium"
          >
            Read the blog
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href="/about"
            className="group inline-flex items-center gap-1.5 text-link hover:text-ink transition-colors font-medium"
          >
            About me
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>

      {/* Recent posts */}
      <section className="pt-8 sm:pt-12 pb-24">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="section-h2 mb-0 whitespace-nowrap">
            Latest from the blog
          </h2>
          <div className="flex-1 h-px bg-border" />
        </div>

        <PostList posts={posts} />

        <Link
          href="/blog"
          className="group inline-flex items-center gap-1.5 mt-8 text-sm text-link hover:text-ink transition-colors font-medium"
        >
          All posts
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </section>
    </div>
  );
}

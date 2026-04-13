import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-180 mx-auto px-6 py-20 text-center">
      <h1 className="font-serif text-[clamp(40px,5vw,64px)] leading-[1.05] tracking-[-2px] text-ink mb-4">
        404
      </h1>
      <p className="text-lg text-ink-muted mb-8">
        This page doesn&apos;t exist — maybe the URL changed, or it was just a figment of the internet&apos;s imagination.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          href="/"
          className="text-cerulean hover:text-ink transition-colors font-medium underline underline-offset-2"
        >
          Go home
        </Link>
        <Link
          href="/blog"
          className="text-cerulean hover:text-ink transition-colors font-medium underline underline-offset-2"
        >
          Read the blog
        </Link>
      </div>
    </div>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-180 mx-auto px-6 py-20 text-center">
      <h1 className="page-h1 bg-gradient-to-r from-peach via-magenta to-indigo bg-clip-text text-transparent">
        404
      </h1>
      <p className="page-lede max-w-145 mx-auto">
        This page doesn&apos;t exist — maybe the URL changed, or it was just a figment of the internet&apos;s imagination.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          href="/"
          className="text-link hover:text-ink transition-colors font-medium underline underline-offset-2"
        >
          Go home
        </Link>
        <Link
          href="/blog"
          className="text-link hover:text-ink transition-colors font-medium underline underline-offset-2"
        >
          Read the blog
        </Link>
      </div>
    </div>
  );
}

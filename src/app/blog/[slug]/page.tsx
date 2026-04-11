import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import Comments from "@/components/Comments";
import TagBadge from "@/components/TagBadge";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.description,
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // Dynamic import of the MDX file
  let MDXContent;
  try {
    MDXContent = (await import(`@/../content/blog/${slug}.mdx`)).default;
  } catch {
    notFound();
  }

  return (
    <div className="max-w-[720px] mx-auto px-6 py-20">
      <Link
        href="/blog"
        className="text-sm text-ink-muted hover:text-ink transition-colors mb-8 inline-block"
      >
        ← Back to blog
      </Link>

      <header className="mb-12">
        <h1 className="font-serif text-[clamp(32px,4vw,48px)] leading-[1.15] tracking-[-1px] text-ink mb-4">
          {post.meta.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-ink-muted">
          <time className="font-mono">{post.meta.date}</time>
          <span>·</span>
          <span>{post.meta.readingTime}</span>
        </div>
        {post.meta.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {post.meta.tags.map((tag: string) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        )}
      </header>

      <article className="prose">
        <MDXContent />
      </article>

      <Comments />
    </div>
  );
}

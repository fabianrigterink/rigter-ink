import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts } from "@/lib/posts";
import PostList, { POSTS_PER_PAGE } from "@/components/PostList";

interface Props {
  params: Promise<{ page: string }>;
}

export async function generateStaticParams() {
  const allPosts = getAllPosts();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  // Page 1 is handled by /blog, so start from 2
  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    page: String(i + 2),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params;
  return {
    title: `Blog — Page ${page}`,
    description: "Writing about AI, machine learning, data science, and operations research.",
  };
}

export default async function BlogPage({ params }: Props) {
  const { page: pageStr } = await params;
  const page = parseInt(pageStr, 10);

  if (isNaN(page) || page < 2) notFound();

  const allPosts = getAllPosts();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

  if (page > totalPages) notFound();

  const start = (page - 1) * POSTS_PER_PAGE;
  const posts = allPosts.slice(start, start + POSTS_PER_PAGE);

  return (
    <div className="max-w-[720px] mx-auto px-6 py-20">
      <h1 className="font-serif text-[clamp(32px,4vw,48px)] leading-[1.15] tracking-[-1px] text-ink mb-4">
        Blog
      </h1>
      <p className="text-ink-muted mb-12 leading-relaxed">
        Writing about AI, machine learning, data science, and operations research.
      </p>
      <PostList posts={posts} currentPage={page} totalPages={totalPages} />
    </div>
  );
}

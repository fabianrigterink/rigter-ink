import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import PostList, { POSTS_PER_PAGE } from "@/components/PostList";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing about AI, machine learning, data science, and operations research.",
};

export default function BlogIndex() {
  const allPosts = getAllPosts();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const posts = allPosts.slice(0, POSTS_PER_PAGE);

  return (
    <div className="max-w-180 mx-auto px-6 py-20">
      <h1 className="page-h1">Blog</h1>
      <p className="page-lede">
        Writing about AI, machine learning, data science, and operations research.
      </p>
      <PostList posts={posts} currentPage={1} totalPages={totalPages} />
    </div>
  );
}

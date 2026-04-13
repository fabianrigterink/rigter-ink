import { getAllPosts, type PostMeta } from "./posts";
import { getAllPapers, type Paper } from "./papers";

export interface TagCount {
  tag: string;
  count: number;
}

export function getAllTags(): TagCount[] {
  const posts = getAllPosts();
  const papers = getAllPapers();
  const counts = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  for (const paper of papers) {
    for (const tag of paper.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}

export function getPapersByTag(tag: string): Paper[] {
  return getAllPapers().filter((paper) => paper.tags.includes(tag));
}

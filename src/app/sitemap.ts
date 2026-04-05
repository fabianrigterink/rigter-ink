import type { MetadataRoute } from "next";
import { getAllPosts, getAllTags } from "@/lib/posts";
import { getAllProjects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = "https://rigter.ink";
  const now = new Date();

  const posts = getAllPosts();
  const tags = getAllTags();
  const projects = getAllProjects();

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    // { url: `${siteUrl}/projects`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/travels`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly" as const,
    priority: 0.8,
  }));

  const tagPages: MetadataRoute.Sitemap = tags.map(({ tag }) => ({
    url: `${siteUrl}/blog/tag/${encodeURIComponent(tag)}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.4,
  }));

  return [...staticPages, ...postPages, ...tagPages];
}

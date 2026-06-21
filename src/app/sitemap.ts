import type { MetadataRoute } from "next";
import { getPublishedPosts, getAllTags } from "@/lib/posts";

const BASE_URL = "https://burningfalls-blog.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPublishedPosts();
  const tags = getAllTags();

  const postEntries = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const tagEntries = tags.map((tag) => ({
    url: `${BASE_URL}/tags/${encodeURIComponent(tag)}`,
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [
    { url: BASE_URL, changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/blog`, changeFrequency: "daily", priority: 0.9 },
    ...postEntries,
    ...tagEntries,
  ];
}

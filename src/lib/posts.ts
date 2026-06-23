import { posts } from "@/.velite";

// velite s.path()는 "posts/hello-world" 형태로 반환 — URL slug용으로 "/" → "-" 변환, 날짜 prefix 제거
export function slugify(path: string): string {
  return path.replace(/\//g, "-").replace(/-(\d{4}-\d{2}-\d{2})-/, "-");
}

export function getPublishedPosts() {
  return posts
    .filter((p) => p.published)
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

export function getPostBySlug(urlSlug: string) {
  return posts.find(
    (p) => slugify(p.slug) === urlSlug && p.published
  );
}

export function getAllTags(): string[] {
  return [...new Set(posts.flatMap((p) => p.tags))].sort();
}

export function getAllCategories(): string[] {
  return [
    ...new Set(
      posts.map((p) => p.category).filter(Boolean) as string[]
    ),
  ].sort();
}

export function getPostsByTag(tag: string) {
  return getPublishedPosts().filter((p) => p.tags.includes(tag));
}

export type PostMeta = {
  title: string;
  description: string;
  date: string;
  slug: string;
  tags: string[];
  category?: string;
};

export function getSearchablePosts(): PostMeta[] {
  return getPublishedPosts().map(({ title, description, date, slug, tags, category }) => ({
    title,
    description,
    date,
    slug: slugify(slug),
    tags,
    category,
  }));
}

export type CategoryGroup = {
  category: string;
  posts: PostMeta[];
};

export function getPostsGroupedByCategory(): CategoryGroup[] {
  const published = getPublishedPosts();
  const map = new Map<string, PostMeta[]>();

  for (const post of published) {
    const cat = post.category ?? "미분류";
    if (!map.has(cat)) map.set(cat, []);
    map.get(cat)!.push({
      title: post.title,
      description: post.description,
      date: post.date,
      slug: slugify(post.slug),
      tags: post.tags,
      category: post.category,
    });
  }

  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([category, posts]) => ({ category, posts }));
}

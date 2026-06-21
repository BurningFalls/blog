import { posts } from "@/.velite";

// velite s.path()는 "posts/hello-world" 형태로 반환 — URL slug용으로 "/" → "-" 변환
export function slugify(path: string): string {
  return path.replace(/\//g, "-");
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

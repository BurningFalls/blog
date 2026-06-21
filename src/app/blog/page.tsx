import { Suspense } from "react";
import type { Metadata } from "next";
import { PostCard } from "@/components/post/PostCard";
import { TagFilter } from "@/components/filter/TagFilter";
import { getPublishedPosts, getAllTags } from "@/lib/posts";

export const metadata: Metadata = {
  title: "블로그",
  description: "모든 포스트 목록",
};

type Props = {
  searchParams: Promise<{ tag?: string }>;
};

export default async function BlogPage({ searchParams }: Props) {
  const { tag } = await searchParams;
  const allPosts = getPublishedPosts();
  const allTags = getAllTags();
  const filtered = tag ? allPosts.filter((p) => p.tags.includes(tag)) : allPosts;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-1">블로그</h1>
        <p className="text-sm text-muted-foreground">{allPosts.length}개의 포스트</p>
      </div>

      {allTags.length > 0 && (
        <div className="mb-8">
          <Suspense fallback={null}>
            <TagFilter tags={allTags} />
          </Suspense>
        </div>
      )}

      {filtered.length > 0 ? (
        <div>
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">
          {tag ? `"${tag}" 태그의 포스트가 없습니다.` : "포스트가 없습니다."}
        </p>
      )}
    </div>
  );
}

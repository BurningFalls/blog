import { Suspense } from "react";
import { PostCard } from "@/components/post/PostCard";
import { TagFilter } from "@/components/filter/TagFilter";
import { getPublishedPosts, getAllTags } from "@/lib/posts";

type Props = {
  searchParams: Promise<{ tag?: string; category?: string }>;
};

export default async function HomePage({ searchParams }: Props) {
  const { tag, category } = await searchParams;
  const allPosts = getPublishedPosts();
  const allTags = getAllTags();

  const filtered = allPosts
    .filter((p) => !tag || p.tags.includes(tag))
    .filter((p) => !category || p.category === category);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-1">블로그</h1>
        <p className="text-muted-foreground text-sm">
          개발 경험과 기술 지식을 기록합니다.
        </p>
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

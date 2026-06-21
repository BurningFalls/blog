import type { Metadata } from "next";
import { PostCard } from "@/components/post/PostCard";
import { getAllTags, getPostsByTag } from "@/lib/posts";

type Props = {
  params: Promise<{ tag: string }>;
};

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({ tag: encodeURIComponent(tag) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  return { title: `#${decoded}` };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const posts = getPostsByTag(decoded);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8">
        <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">태그</p>
        <h1 className="text-2xl font-bold text-foreground">#{decoded}</h1>
        <p className="text-sm text-muted-foreground mt-1">{posts.length}개의 포스트</p>
      </div>

      {posts.length > 0 ? (
        <div>
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">포스트가 없습니다.</p>
      )}
    </div>
  );
}

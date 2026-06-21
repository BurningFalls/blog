import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedPosts, getPostBySlug, slugify } from "@/lib/posts";
import { MDXContent } from "@/components/post/MDXContent";
import { TableOfContents } from "@/components/post/TableOfContents";
import { GiscusComment } from "@/components/comment/GiscusComment";
import { formatDate } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getPublishedPosts();
  return posts.map((post) => ({ slug: slugify(post.slug) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="lg:grid lg:grid-cols-[1fr_200px] lg:gap-10">
        <article>
          {/* 헤더 */}
          <header className="mb-8">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
              <Link href="/" className="hover:text-foreground transition-colors">
                홈
              </Link>
              <span>/</span>
              <span>{post.title}</span>
            </div>

            <h1 className="text-2xl font-bold text-foreground leading-snug mb-3">
              {post.title}
            </h1>

            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              {post.metadata.readingTime && (
                <>
                  <span>·</span>
                  <span>읽기 {post.metadata.readingTime}분</span>
                </>
              )}
            </div>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-4">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/?tag=${tag}`}
                    className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </header>

          {/* 본문 */}
          <MDXContent code={post.body} />

          {/* 댓글 */}
          <div className="mt-16 pt-8 border-t border-border">
            <GiscusComment />
          </div>
        </article>

        {/* 목차 (데스크탑) */}
        <aside className="hidden lg:block">
          <div className="sticky top-20">
            <TableOfContents toc={post.toc} />
          </div>
        </aside>
      </div>
    </div>
  );
}

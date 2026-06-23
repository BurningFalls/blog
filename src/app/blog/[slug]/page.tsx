import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedPosts, getPostBySlug, slugify, getPostsGroupedByCategory } from "@/lib/posts";
import { MDXContent } from "@/components/post/MDXContent";
import { TableOfContents } from "@/components/post/TableOfContents";
import { PostNavSidebar } from "@/components/post/PostNavSidebar";
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

  const groups = getPostsGroupedByCategory();

  return (
    <div className="mx-auto px-4 py-10 w-full max-w-[calc(48rem+220px+40px+220px+40px)] xl:flex xl:gap-10 xl:items-start xl:justify-center">
      <aside className="hidden xl:block w-[220px] shrink-0 sticky top-20 self-start">
        <PostNavSidebar groups={groups} />
      </aside>
      <article className="min-w-0 max-w-3xl w-full mx-auto xl:mx-0">
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

        <MDXContent code={post.body} />

        <div className="mt-16 pt-8 border-t border-border">
          <GiscusComment />
        </div>
      </article>
      <aside className="hidden xl:block w-[220px] shrink-0 sticky top-20 self-start">
        <TableOfContents toc={post.toc} />
      </aside>
    </div>
  );
}

import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { slugify, type PostMeta } from "@/lib/posts";

type Props = {
  post: PostMeta;
};

export function PostCard({ post }: Props) {
  return (
    <article className="group border-b border-border py-6 last:border-0">
      <Link href={`/blog/${slugify(post.slug)}`} className="block space-y-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.category && (
            <>
              <span>·</span>
              <span>{post.category}</span>
            </>
          )}
        </div>

        <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
          {post.title}
        </h2>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {post.description}
        </p>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </Link>
    </article>
  );
}

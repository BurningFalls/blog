"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CategoryGroup } from "@/lib/posts";

type Props = {
  groups: CategoryGroup[];
};

export function PostNavSidebar({ groups }: Props) {
  const pathname = usePathname();

  return (
    <nav className="text-sm w-[220px] overflow-y-auto" style={{ maxHeight: "calc(100vh - 8rem)" }}>
      <ul className="space-y-4">
        {groups.map(({ category, posts }) => (
          <li key={category}>
            <p className="font-semibold text-foreground mb-1.5 text-xs uppercase tracking-wider">
              {category}
            </p>
            <ul className="space-y-0.5">
              {posts.map((post) => {
                const href = `/blog/${post.slug}`;
                const isActive = pathname === href;
                return (
                  <li key={post.slug}>
                    <Link
                      href={href}
                      className={`block text-sm py-1 px-3 rounded-md break-words transition-colors ${
                        isActive
                          ? "bg-muted text-foreground font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      {post.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
}

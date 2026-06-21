"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SearchDialog } from "@/components/search/SearchDialog";
import { cn } from "@/lib/utils";
import type { PostMeta } from "@/lib/posts";

const navLinks = [
  { href: "/", label: "홈" },
  { href: "/blog", label: "블로그" },
];

type Props = {
  searchablePosts: PostMeta[];
};

export function Header({ searchablePosts }: Props) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto max-w-3xl px-4 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-bold text-lg text-foreground hover:text-primary transition-colors"
        >
          BurningFalls
        </Link>

        <nav className="flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-1.5 rounded-md text-sm transition-colors",
                pathname === link.href
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {link.label}
            </Link>
          ))}
          <SearchDialog posts={searchablePosts} />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

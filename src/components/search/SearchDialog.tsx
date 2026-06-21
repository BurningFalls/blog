"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { Search, X } from "lucide-react";
import type { PostMeta } from "@/lib/posts";

type Props = {
  posts: PostMeta[];
};

export function SearchDialog({ posts }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const fuse = new Fuse(posts, {
    keys: [
      { name: "title", weight: 0.6 },
      { name: "description", weight: 0.3 },
      { name: "tags", weight: 0.1 },
    ],
    threshold: 0.4,
    minMatchCharLength: 2,
  });

  const results = query.length >= 2 ? fuse.search(query).slice(0, 8) : [];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [open]);

  const handleSelect = (slug: string) => {
    setOpen(false);
    router.push(`/blog/${slug}`);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        aria-label="검색 (⌘K)"
        className="rounded-md p-2 hover:bg-muted transition-colors cursor-pointer"
      >
        <Search size={18} className="text-foreground" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
      <div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <div className="relative w-full max-w-lg bg-card border border-border rounded-xl shadow-2xl overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
          <Search size={16} className="text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="포스트 검색..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          <button onClick={() => setOpen(false)} className="shrink-0">
            <X size={16} className="text-muted-foreground hover:text-foreground transition-colors" />
          </button>
        </div>

        {results.length > 0 ? (
          <ul className="max-h-80 overflow-y-auto py-2">
            {results.map(({ item }) => (
              <li key={item.slug}>
                <button
                  onClick={() => handleSelect(item.slug)}
                  className="w-full text-left px-4 py-3 hover:bg-muted transition-colors"
                >
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                    {item.description}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        ) : query.length >= 2 ? (
          <p className="px-4 py-6 text-sm text-center text-muted-foreground">
            검색 결과가 없습니다.
          </p>
        ) : (
          <p className="px-4 py-6 text-sm text-center text-muted-foreground">
            검색어를 2자 이상 입력하세요.
          </p>
        )}
      </div>
    </div>
  );
}

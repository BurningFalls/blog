"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
  tags: string[];
};

export function TagFilter({ tags }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTag = searchParams.get("tag");

  const handleTag = (tag: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (tag) {
      params.set("tag", tag);
    } else {
      params.delete("tag");
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleTag(null)}
        className={cn(
          "px-3 py-1 text-xs rounded-full border transition-colors",
          !currentTag
            ? "bg-primary text-primary-foreground border-primary"
            : "border-border text-muted-foreground hover:text-foreground hover:border-foreground"
        )}
      >
        전체
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleTag(tag)}
          className={cn(
            "px-3 py-1 text-xs rounded-full border transition-colors",
            currentTag === tag
              ? "bg-primary text-primary-foreground border-primary"
              : "border-border text-muted-foreground hover:text-foreground hover:border-foreground"
          )}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}

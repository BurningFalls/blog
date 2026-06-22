"use client";

import { useEffect, useRef, useState } from "react";

type TocEntry = {
  title: string;
  url: string;
  items: TocEntry[];
};

type Props = {
  toc: TocEntry[];
};

function flattenToc(entries: TocEntry[]): string[] {
  return entries.flatMap((e) => [e.url, ...flattenToc(e.items)]);
}

function TocLink({
  item,
  depth,
  activeId,
}: {
  item: TocEntry;
  depth: number;
  activeId: string;
}) {
  const isActive = activeId === item.url;

  return (
    <li>
      <a
        href={item.url}
        style={{ paddingLeft: `${12 + depth * 12}px` }}
        className={`block text-sm py-1 break-words transition-colors border-l-2 ${
          isActive
            ? "border-foreground text-foreground font-medium"
            : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground"
        }`}
      >
        {item.title}
      </a>
      {item.items.length > 0 && (
        <ul>
          {item.items.map((child) => (
            <TocLink
              key={child.url}
              item={child}
              depth={depth + 1}
              activeId={activeId}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export function TableOfContents({ toc }: Props) {
  const [activeId, setActiveId] = useState("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const allIds = flattenToc(toc).map((url) => url.slice(1));

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(`#${entry.target.id}`);
            break;
          }
        }
      },
      { rootMargin: "0px 0px -70% 0px", threshold: 0 }
    );

    for (const id of allIds) {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    }

    return () => observerRef.current?.disconnect();
  }, [toc]);

  if (toc.length === 0) return null;

  return (
    <nav
      className="text-sm w-[200px] overflow-y-auto"
      style={{
        maxHeight: "calc(100vh - 8rem)",
      }}
    >
      <p className="font-semibold text-foreground mb-3 text-xs uppercase tracking-wider">
        목차
      </p>
      <ul className="space-y-0.5">
        {toc.map((item) => (
          <TocLink key={item.url} item={item} depth={0} activeId={activeId} />
        ))}
      </ul>
    </nav>
  );
}

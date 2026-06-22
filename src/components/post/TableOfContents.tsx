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
  const [bottomOffset, setBottomOffset] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // 헤딩 활성화 추적
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

  // 푸터가 올라올수록 목차 bottom을 밀어올림
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    function update() {
      const footerTop = footer!.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;
      const overflow = viewportHeight - footerTop + 32;
      setBottomOffset(overflow > 0 ? overflow : 0);
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  if (toc.length === 0) return null;

  return (
    <nav
      className="text-sm w-[200px] overflow-y-auto transition-[max-height] duration-150"
      style={{
        maxHeight: `calc(100vh - 8rem - ${bottomOffset}px)`,
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

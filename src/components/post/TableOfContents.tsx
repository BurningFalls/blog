"use client";

type TocEntry = {
  title: string;
  url: string;
  items: TocEntry[];
};

type Props = {
  toc: TocEntry[];
};

function TocLink({ item, depth = 0 }: { item: TocEntry; depth?: number }) {
  return (
    <li>
      <a
        href={item.url}
        style={{ paddingLeft: `${depth * 12}px` }}
        className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-0.5"
      >
        {item.title}
      </a>
      {item.items.length > 0 && (
        <ul>
          {item.items.map((child) => (
            <TocLink key={child.url} item={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

export function TableOfContents({ toc }: Props) {
  if (toc.length === 0) return null;

  return (
    <nav className="text-sm">
      <p className="font-semibold text-foreground mb-3 text-xs uppercase tracking-wider">
        목차
      </p>
      <ul className="space-y-0.5">
        {toc.map((item) => (
          <TocLink key={item.url} item={item} />
        ))}
      </ul>
    </nav>
  );
}

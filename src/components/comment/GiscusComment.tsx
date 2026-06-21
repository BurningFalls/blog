"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

export function GiscusComment() {
  const { resolvedTheme } = useTheme();

  return (
    <Giscus
      repo="burningfalls/blog"
      repoId="REPLACE_WITH_REPO_ID"
      category="Announcements"
      categoryId="REPLACE_WITH_CATEGORY_ID"
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      lang="ko"
      loading="lazy"
    />
  );
}

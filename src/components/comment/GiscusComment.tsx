"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

export function GiscusComment() {
  const { resolvedTheme } = useTheme();

  return (
    <Giscus
      repo="burningfalls/blog"
      repoId="R_kgDOTAySUA"
      category="Announcements"
      categoryId="DIC_kwDOTAySUM4C_lnS"
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

import { defineConfig, s } from "velite";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import type { Options as PrettyCodeOptions } from "rehype-pretty-code";

const prettyCodeOptions: PrettyCodeOptions = {
  theme: {
    light: "github-light",
    dark: "github-dark",
  },
  keepBackground: false,
};

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    clean: true,
  },
  collections: {
    posts: {
      name: "Post",
      pattern: "posts/**/*.mdx",
      schema: s.object({
        title: s.string().max(99),
        description: s.string().max(200),
        date: s.isodate(),
        slug: s.path(),
        tags: s.array(s.string()).default([]),
        category: s.string().optional(),
        published: s.boolean().default(true),
        toc: s.toc(),
        metadata: s.metadata(),
        body: s.mdx(),
      }),
    },
  },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, prettyCodeOptions],
    ],
  },
});

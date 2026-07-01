import type { BlogModule, BlogPostMeta } from "@/shared/types";

const modules = import.meta.glob<BlogModule>("./*.mdx", { eager: true });

interface LoadedPost {
  slug: string;
  meta: BlogPostMeta;
  module: BlogModule;
}

function load(): LoadedPost[] {
  return Object.entries(modules).map(([path, mod]) => {
    const slug = path.replace("./", "").replace(/\.mdx$/, "");
    return {
      slug,
      meta: mod.frontmatter,
      module: mod,
    };
  });
}

export const allPosts: LoadedPost[] = load().sort(
  (a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
);

export function getPostBySlug(slug: string): LoadedPost | undefined {
  return allPosts.find((p) => p.slug === slug || p.meta.slug === slug);
}

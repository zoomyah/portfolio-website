/// <reference types="vite/client" />

declare module "*.mdx" {
  const Component: React.ComponentType;
  export const frontmatter: {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    cover: string;
    readingTime: number;
  };
  export default Component;
}

interface ImportMetaEnv {
  readonly VITE_FORMSPREE_ENDPOINT?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export {};

import { MDXProvider } from "@mdx-js/react";
import type { BlogModule } from "@/shared/types";

interface PostBodyProps {
  module: BlogModule;
}

const components = {
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props} target={props.href?.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" />
  ),
};

export function PostBody({ module }: PostBodyProps) {
  const Content = module.default;
  return (
    <MDXProvider components={components}>
      <div className="prose-editorial">
        <Content />
      </div>
    </MDXProvider>
  );
}

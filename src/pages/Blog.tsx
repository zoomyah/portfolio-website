import { useUiStore } from "@/store/useUiStore";
import { t } from "@/i18n/strings";
import { allPosts } from "@/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PostCard } from "@/components/blog/PostCard";

export default function Blog() {
  const locale = useUiStore((s) => s.locale);

  return (
    <div className="relative isolate pt-32 md:pt-40">
      <section className="relative pb-16">
        <div aria-hidden="true" className="pointer-events-none absolute left-8 top-0 hidden h-16 w-16 md:block [transform-style:preserve-3d]">
          <div className="animate-float-spin h-full w-full rotate-45 border border-accent/50 bg-accent/5" />
        </div>
        <Container>
          <SectionHeading
            eyebrowKey="blogEyebrow"
            titleKey="blogTitle"
            subtitleKey="blogSubtitle"
          />
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            {allPosts.map((post, i) => (
              <PostCard key={post.slug} post={post.meta} index={i} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}

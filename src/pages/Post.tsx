import { Link, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Clock } from "lucide-react";
import { useUiStore } from "@/store/useUiStore";
import { t } from "@/i18n/strings";
import { getPostBySlug } from "@/content";
import { Container } from "@/components/ui/Container";
import { PostBody } from "@/components/blog/PostBody";
import { Button } from "@/components/ui/Button";

export default function Post() {
  const { slug } = useParams<{ slug: string }>();
  const locale = useUiStore((s) => s.locale);
  const reduce = useReducedMotion();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <div className="pt-40 pb-32">
        <Container size="prose" className="text-center">
          <h1 className="font-display text-4xl">{t(locale, "notFoundTitle")}</h1>
          <p className="mt-4 text-muted">{t(locale, "notFoundBody")}</p>
          <div className="mt-8">
            <Button as="link" href="/blog" variant="ghost" size="md">
              {t(locale, "blogBack")}
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  const date = new Date(post.meta.date).toLocaleDateString(
    locale === "ar" ? "ar-EG" : "en-GB",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <article className="pt-32 md:pt-40">
      <Container size="prose">
        <Link
          to="/blog"
          className="link-underline inline-flex items-center gap-2 font-mono text-xs uppercase tracking-eyebrow text-muted hover:text-accent"
        >
          <ArrowLeft size={14} />
          {t(locale, "blogBack")}
        </Link>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8"
        >
          <div className="flex items-center gap-4 font-mono text-xs text-muted">
            <span>{date}</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={12} />
              {post.meta.readingTime} {t(locale, "blogReadingTime")}
            </span>
          </div>

          <h1 className="mt-5 font-display text-4xl md:text-5xl font-medium leading-[1.08] tracking-tight">
            {post.meta.title}
          </h1>
          <p className="mt-5 text-lg text-muted leading-relaxed">{post.meta.excerpt}</p>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-10 overflow-hidden border border-edge/10"
        >
          <img
            src={post.meta.cover}
            alt={post.meta.title}
            className="w-full aspect-[16/9] object-cover"
          />
        </motion.div>
      </Container>

      <Container size="prose" className="mt-16">
        <PostBody module={post.module} />
      </Container>

      <Container size="prose" className="mt-24">
        <Button as="link" href="/blog" variant="ghost" size="md">
          <ArrowLeft size={14} />
          {t(locale, "blogBack")}
        </Button>
      </Container>
    </article>
  );
}

import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { BlogPostMeta } from "@/shared/types";
import { useUiStore } from "@/store/useUiStore";
import { t } from "@/i18n/strings";

interface PostCardProps {
  post: BlogPostMeta;
  index?: number;
}

export function PostCard({ post, index = 0 }: PostCardProps) {
  const locale = useUiStore((s) => s.locale);
  const reduce = useReducedMotion();
  const date = new Date(post.date).toLocaleDateString(
    locale === "ar" ? "ar-EG" : "en-GB",
    { year: "numeric", month: "short", day: "numeric" }
  );

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: (index % 6) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link
        to={`/blog/${post.slug}`}
        className="block overflow-hidden border border-edge/10 bg-surface/40 transition-all duration-500 hover:border-edge/25 hover:-translate-y-1"
      >
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={post.cover}
            alt={post.title}
            loading="lazy"
            className="h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:opacity-100 group-hover:scale-[1.04]"
          />
        </div>

        <div className="p-6 md:p-8">
          <div className="flex items-center gap-3 font-mono text-xs text-muted">
            <span>{date}</span>
            <span>·</span>
            <span>
              {post.readingTime} {t(locale, "blogReadingTime")}
            </span>
          </div>

          <h3 className="mt-4 font-display text-2xl md:text-3xl font-medium leading-tight group-hover:text-accent transition-colors duration-300">
            {post.title}
          </h3>

          <p className="mt-3 text-muted leading-relaxed line-clamp-2">{post.excerpt}</p>

          <div className="mt-6 flex items-center gap-2 font-mono text-xs uppercase tracking-eyebrow text-muted group-hover:text-accent transition-colors">
            <span>Read</span>
            <ArrowUpRight
              size={14}
              className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useUiStore } from "@/store/useUiStore";
import { t } from "@/i18n/strings";
import { projects } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function WorkPreview() {
  const locale = useUiStore((s) => s.locale);
  const reduce = useReducedMotion();
  const featured = projects.slice(0, 3);

  return (
    <section className="py-24 md:py-32 border-t border-edge/10">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <SectionHeading
            eyebrowKey="workEyebrow"
            titleKey="workTitle"
            subtitleKey="workSubtitle"
          />
          <Link
            to="/work"
            className="link-underline font-mono text-xs uppercase tracking-eyebrow text-accent"
          >
            {t(locale, "workViewAll")} →
          </Link>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-12">
          {featured.map((project, i) => {
            const span =
              i === 0
                ? "md:col-span-7"
                : i === 1
                ? "md:col-span-5"
                : "md:col-span-12";
            return (
              <motion.div
                key={project.slug}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`group ${span}`}
              >
                <Link
                  to={`/work/${project.slug}`}
                  className="block relative overflow-hidden border border-edge/10 bg-surface/40"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={project.cover}
                      alt={project.title}
                      loading="lazy"
                      className="h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:opacity-100 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/10 to-transparent" />
                  <div aria-hidden="true" className="pointer-events-none absolute right-5 top-5 z-10 h-9 w-9 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [transform-style:preserve-3d]">
                    <div className="animate-float-spin h-full w-full rotate-45 border border-accent/70 bg-accent/10 backdrop-blur-sm" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs uppercase tracking-eyebrow text-accent">
                        {project.category}
                      </span>
                      <span className="font-mono text-xs text-muted">{project.year}</span>
                    </div>
                    <h3 className="mt-3 font-display text-2xl md:text-3xl font-medium leading-tight">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted max-w-md line-clamp-2">
                      {project.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-2 font-mono text-xs text-muted">
                      <span>{project.tech.slice(0, 3).join(" · ")}</span>
                      <ArrowUpRight
                        size={14}
                        className="text-accent transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

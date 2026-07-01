import { Link, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { useUiStore } from "@/store/useUiStore";
import { t } from "@/i18n/strings";
import { getProjectBySlug } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const locale = useUiStore((s) => s.locale);
  const reduce = useReducedMotion();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <div className="pt-40 pb-32">
        <Container size="prose" className="text-center">
          <h1 className="font-display text-4xl">{t(locale, "notFoundTitle")}</h1>
          <p className="mt-4 text-muted">{t(locale, "notFoundBody")}</p>
          <div className="mt-8">
            <Button as="link" href="/work" variant="ghost" size="md">
              {t(locale, "caseBack")}
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  const blocks: Array<[Parameters<typeof t>[1], string]> = [
    ["caseOverview", project.caseStudy.overview],
    ["caseChallenge", project.caseStudy.challenge],
    ["caseSolution", project.caseStudy.solution],
    ["caseOutcome", project.caseStudy.outcome],
  ];

  const fade = {
    initial: reduce ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" } as const,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  };

  return (
    <article className="pt-32 md:pt-40">
      {/* Hero */}
      <Container>
        <motion.div initial={fade.initial} animate={{ opacity: 1, y: 0 }} transition={fade.transition}>
          <Link
            to="/work"
            className="link-underline inline-flex items-center gap-2 font-mono text-xs uppercase tracking-eyebrow text-muted hover:text-accent"
          >
            <ArrowLeft size={14} />
            {t(locale, "caseBack")}
          </Link>

          <div className="mt-8 flex items-center gap-3">
            <span className="eyebrow flex items-center gap-3">
              <span className="h-px w-8 bg-accent/60" />
              {t(locale, "caseEyebrow")} · {project.category}
            </span>
            <span className="font-mono text-xs text-muted">{project.year}</span>
          </div>

          <h1 className="mt-6 font-display text-4xl md:text-6xl font-medium leading-[1.05] tracking-tight max-w-4xl">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted leading-relaxed">
            {project.excerpt}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {project.tech.map((tag) => (
              <Chip key={tag} as="div" className="px-2.5 py-1 text-[0.625rem]">
                {tag}
              </Chip>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            {project.liveUrl && (
              <Button as="link" href={project.liveUrl} external variant="primary" size="md">
                <ExternalLink size={14} />
                {t(locale, "caseLive")}
              </Button>
            )}
            {project.repoUrl && (
              <Button as="link" href={project.repoUrl} external variant="ghost" size="md">
                <Github size={14} />
                {t(locale, "caseRepo")}
              </Button>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={fade.initial}
          whileInView={fade.whileInView}
          viewport={fade.viewport}
          transition={fade.transition}
          className="mt-16 overflow-hidden border border-edge/10"
        >
          <img
            src={project.cover}
            alt={project.title}
            className="w-full aspect-[16/9] object-cover"
          />
        </motion.div>
      </Container>

      {/* Body */}
      <Container size="prose" className="mt-24">
        <div className="space-y-16">
          {blocks.map(([key, body], i) => (
            <motion.section
              key={key}
              initial={fade.initial}
              whileInView={fade.whileInView}
              viewport={fade.viewport}
              transition={{ ...fade.transition, delay: i * 0.04 }}
            >
              <h2 className="font-display text-2xl md:text-3xl font-medium mb-5">
                <span className="text-accent font-mono text-xs align-top mr-3">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {t(locale, key)}
              </h2>
              <p className="text-ink/90 leading-relaxed text-lg">{body}</p>
            </motion.section>
          ))}
        </div>
      </Container>

      {/* Gallery */}
      {project.caseStudy.gallery.length > 0 && (
        <Container className="mt-24">
          <p className="eyebrow mb-6">{t(locale, "caseGallery")}</p>
          <div className="grid gap-6 md:grid-cols-3">
            {project.caseStudy.gallery.map((src, i) => (
              <motion.div
                key={src + i}
                initial={fade.initial}
                whileInView={fade.whileInView}
                viewport={fade.viewport}
                transition={{ ...fade.transition, delay: i * 0.08 }}
                className="overflow-hidden border border-edge/10 aspect-[4/3]"
              >
                <img src={src} alt={`${project.title} ${i + 1}`} className="h-full w-full object-cover" loading="lazy" />
              </motion.div>
            ))}
          </div>
        </Container>
      )}

      <Container className="mt-32">
        <Button as="link" href="/work" variant="ghost" size="md">
          <ArrowLeft size={14} />
          {t(locale, "caseBack")}
        </Button>
      </Container>
    </article>
  );
}

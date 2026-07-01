import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useUiStore } from "@/store/useUiStore";
import { t } from "@/i18n/strings";
import { projects, getAllTechTags } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectFilters } from "@/components/work/ProjectFilters";
import { ProjectCard } from "@/components/work/ProjectCard";

export default function Work() {
  const locale = useUiStore((s) => s.locale);
  const [active, setActive] = useState<string | null>(null);
  const tags = useMemo(() => getAllTechTags(), []);

  const filtered = useMemo(
    () => (active ? projects.filter((p) => p.tech.includes(active)) : projects),
    [active]
  );

  return (
    <div className="relative isolate pt-32 md:pt-40">
      <section className="relative pb-16">
        <div aria-hidden="true" className="pointer-events-none absolute right-8 top-0 hidden h-16 w-16 md:block [transform-style:preserve-3d]">
          <div className="animate-float-spin h-full w-full rotate-45 border border-accent/50 bg-accent/5" />
        </div>
        <Container>
          <SectionHeading
            eyebrowKey="workEyebrow"
            titleKey="workTitle"
            subtitleKey="workSubtitle"
          />
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <ProjectFilters
            tags={tags}
            active={active}
            onChange={setActive}
            count={filtered.length}
          />

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>

          {filtered.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-16 text-center text-muted font-mono text-sm"
            >
              —
            </motion.p>
          )}
        </Container>
      </section>
    </div>
  );
}

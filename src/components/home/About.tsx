import { motion, useReducedMotion } from "framer-motion";
import { useUiStore } from "@/store/useUiStore";
import { t } from "@/i18n/strings";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WireframeGlobe } from "@/components/three/WireframeGlobe";

const skills = [
  ["React", "TypeScript"],
  ["Node.js", "Go"],
  ["PostgreSQL", "Redis"],
  ["Kubernetes", "AWS"],
];

const stats: Array<[Parameters<typeof t>[1], string]> = [
  ["aboutStatsYears", "10+"],
  ["aboutStatsProjects", "40+"],
  ["aboutStatsClients", "12"],
];

export function About() {
  const locale = useUiStore((s) => s.locale);
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden py-24 md:py-32 border-t border-edge/10">
      <WireframeGlobe className="-right-40 top-1/2 h-[30rem] w-[30rem] -translate-y-1/2 opacity-30 md:opacity-40" opacity={0.5} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-bg via-bg/60 to-transparent" />
      <Container>
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionHeading
              eyebrowKey="aboutEyebrow"
              titleKey="aboutTitle"
            />
          </div>

          <div className="md:col-span-7 md:pl-8">
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-2xl md:text-3xl font-light leading-[1.35] text-ink"
            >
              {t(locale, "aboutBody")}
            </motion.p>

            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-px bg-edge/10 border border-edge/10">
              {skills.flat().map((s) => (
                <div
                  key={s}
                  className="bg-bg px-4 py-5 font-mono text-xs uppercase tracking-eyebrow text-muted hover:text-accent transition-colors"
                >
                  {s}
                </div>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-3 gap-8">
              {stats.map(([key, value]) => (
                <div key={key}>
                  <div className="font-display text-4xl md:text-5xl font-medium text-accent">
                    {value}
                  </div>
                  <div className="mt-2 eyebrow">{t(locale, key)}</div>
                </div>
              ))}
            </div>

            <p className="mt-12 eyebrow">{t(locale, "aboutSkillsTitle")}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

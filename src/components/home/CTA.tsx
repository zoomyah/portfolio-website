import { motion, useReducedMotion } from "framer-motion";
import { useUiStore } from "@/store/useUiStore";
import { t } from "@/i18n/strings";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section3DAccent } from "@/components/three/Section3DAccent";

export function CTA() {
  const locale = useUiStore((s) => s.locale);
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden py-24 md:py-40 border-t border-edge/10">
      <Section3DAccent className="-right-24 top-1/2 hidden -translate-y-1/2 h-[26rem] w-[26rem] opacity-40 md:block" />
      <Container size="prose" className="relative text-center flex flex-col items-center">
        <motion.span
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="eyebrow flex items-center gap-3"
        >
          <span className="h-px w-8 bg-accent/60" />
          {t(locale, "ctaEyebrow")}
          <span className="h-px w-8 bg-accent/60" />
        </motion.span>

        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-display text-4xl md:text-6xl font-medium leading-[1.02] tracking-tight"
        >
          {t(locale, "ctaTitle")}
        </motion.h2>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 text-lg text-muted max-w-xl leading-relaxed"
        >
          {t(locale, "ctaBody")}
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12"
        >
          <Button as="link" href="/contact" variant="primary" size="lg">
            {t(locale, "ctaButton")}
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}

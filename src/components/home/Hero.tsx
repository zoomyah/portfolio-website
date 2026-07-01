import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useUiStore } from "@/store/useUiStore";
import { t } from "@/i18n/strings";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const locale = useUiStore((s) => s.locale);
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };
  const item = {
    hidden: reduce ? {} : { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
  };

  return (
    <section className="relative overflow-hidden pt-40 pb-24 md:pt-52 md:pb-32">
      <Container>
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className="eyebrow flex items-center gap-3">
            <span className="h-px w-10 bg-accent/60" />
            {t(locale, "heroEyebrow")}
          </motion.div>

          <h1 className="mt-8 font-display font-medium leading-[0.98] tracking-tight text-[clamp(2.75rem,8vw,6.5rem)]">
            <motion.span variants={item} className="block">
              {t(locale, "heroTitleLine1")}
            </motion.span>
            <motion.span
              variants={item}
              className="block italic text-accent"
              style={{ fontVariationSettings: '"opsz" 144' }}
            >
              {t(locale, "heroTitleLine2")}
            </motion.span>
          </h1>

          <motion.p
            variants={item}
            className="mt-10 max-w-xl text-lg leading-relaxed text-muted"
          >
            {t(locale, "heroSubtitle")}
          </motion.p>

          <motion.div variants={item} className="mt-12 flex flex-wrap items-center gap-4">
            <Button as="link" href="/work" variant="primary" size="lg">
              {t(locale, "heroPrimary")}
            </Button>
            <Button as="link" href="/contact" variant="ghost" size="lg">
              {t(locale, "heroSecondary")}
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-24 hidden md:flex items-center gap-3 text-muted"
        >
          <ArrowDown size={14} className="animate-bounce" />
          <span className="font-mono text-xs uppercase tracking-eyebrow">
            {t(locale, "heroScroll")}
          </span>
        </motion.div>
      </Container>
    </section>
  );
}

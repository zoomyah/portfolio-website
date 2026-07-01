import { motion, useReducedMotion } from "framer-motion";
import { Cloud, Compass, LayoutTemplate, Sparkles, Webhook, type LucideIcon } from "lucide-react";
import { useUiStore } from "@/store/useUiStore";
import { t } from "@/i18n/strings";
import { services } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const iconMap: Record<string, LucideIcon> = {
  LayoutTemplate,
  Webhook,
  Cloud,
  Compass,
};

export function ServicesPreview() {
  const locale = useUiStore((s) => s.locale);
  const reduce = useReducedMotion();

  return (
    <section className="py-24 md:py-32 border-t border-edge/10">
      <Container>
        <SectionHeading
          eyebrowKey="servicesEyebrow"
          titleKey="servicesTitle"
          subtitleKey="servicesSubtitle"
        />

        <div className="mt-16 grid gap-px bg-edge/10 border border-edge/10 sm:grid-cols-2">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Sparkles;
            return (
              <motion.div
                key={service.id}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group bg-bg p-8 md:p-10 transition-colors duration-500 hover:bg-surface/60"
              >
                <div className="flex items-start justify-between">
                  <div className="h-11 w-11 inline-flex items-center justify-center border border-edge/20 text-accent transition-transform duration-500 group-hover:-translate-y-0.5">
                    <Icon size={18} strokeWidth={1.25} />
                  </div>
                  <span className="font-mono text-xs text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-8 font-display text-2xl font-medium">
                  {service.title}
                </h3>
                <p className="mt-3 text-muted leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

import { motion } from "framer-motion";
import { useUiStore } from "@/store/useUiStore";
import { t } from "@/i18n/strings";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrowKey: Parameters<typeof t>[1];
  titleKey: Parameters<typeof t>[1];
  subtitleKey?: Parameters<typeof t>[1];
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrowKey,
  titleKey,
  subtitleKey,
  align = "left",
  className,
}: SectionHeadingProps) {
  const locale = useUiStore((s) => s.locale);
  const alignClasses =
    align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn("flex flex-col gap-4", alignClasses)}
    >
      <span className="eyebrow flex items-center gap-3">
        <span className="h-px w-8 bg-accent/60" />
        {t(locale, eyebrowKey)}
      </span>
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.05] max-w-2xl">
        {t(locale, titleKey)}
      </h2>
      {subtitleKey && (
        <p className="text-muted max-w-xl text-base leading-relaxed">
          {t(locale, subtitleKey)}
        </p>
      )}
    </motion.div>
  );
}

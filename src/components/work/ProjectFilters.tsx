import { motion } from "framer-motion";
import { useUiStore } from "@/store/useUiStore";
import { t } from "@/i18n/strings";
import { Chip } from "@/components/ui/Chip";

interface ProjectFiltersProps {
  tags: string[];
  active: string | null;
  onChange: (tag: string | null) => void;
  count: number;
}

export function ProjectFilters({ tags, active, onChange, count }: ProjectFiltersProps) {
  const locale = useUiStore((s) => s.locale);
  const resultLabel = count === 1 ? t(locale, "workResult") : t(locale, "workResults");

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="eyebrow mb-4">{t(locale, "workFiltersLabel")}</p>
        <div className="flex flex-wrap gap-2">
          <Chip active={active === null} onClick={() => onChange(null)}>
            {t(locale, "workAll")}
          </Chip>
          {tags.map((tag) => (
            <Chip key={tag} active={active === tag} onClick={() => onChange(tag)}>
              {tag}
            </Chip>
          ))}
        </div>
      </div>

      <motion.div
        key={count}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="font-mono text-xs uppercase tracking-eyebrow text-muted"
      >
        <span className="text-accent">{count}</span> {resultLabel}
      </motion.div>
    </div>
  );
}

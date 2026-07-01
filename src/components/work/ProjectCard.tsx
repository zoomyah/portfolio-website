import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/shared/types";
import { Chip } from "@/components/ui/Chip";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index?: number;
  className?: string;
}

export function ProjectCard({ project, index = 0, className }: ProjectCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: (index % 6) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className={cn("group", className)}
    >
      <Link
        to={`/work/${project.slug}`}
        className="block relative overflow-hidden border border-edge/10 bg-surface/40 transition-colors duration-500 hover:border-edge/25"
      >
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={project.cover}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:opacity-100 group-hover:scale-[1.04]"
          />
        </div>

        <div className="p-6 md:p-7">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-eyebrow text-accent">
              {project.category}
            </span>
            <span className="font-mono text-xs text-muted">·</span>
            <span className="font-mono text-xs text-muted">{project.year}</span>
          </div>

          <h3 className="mt-3 font-display text-2xl font-medium leading-tight group-hover:text-accent transition-colors duration-300">
            {project.title}
          </h3>

          <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-2">
            {project.excerpt}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.slice(0, 4).map((tag) => (
              <Chip key={tag} as="div" className="px-2.5 py-1 text-[0.625rem]">
                {tag}
              </Chip>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2 font-mono text-xs uppercase tracking-eyebrow text-muted group-hover:text-accent transition-colors">
            <span>Case study</span>
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

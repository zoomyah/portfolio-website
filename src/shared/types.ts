export type Locale = "en" | "ar";
export type Theme = "dark" | "light";

export type ProjectCategory = "web" | "mobile" | "data" | "system";

export interface CaseStudy {
  overview: string;
  challenge: string;
  solution: string;
  outcome: string;
  gallery: string[];
}

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  tech: string[];
  cover: string;
  excerpt: string;
  year: number;
  liveUrl?: string;
  repoUrl?: string;
  caseStudy: CaseStudy;
}

export interface Service {
  id: string;
  icon: string; // lucide icon name
  title: string;
  description: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string; // ISO
  excerpt: string;
  cover: string;
  readingTime: number;
}

export interface BlogModule {
  default: React.ComponentType;
  frontmatter: BlogPostMeta;
}

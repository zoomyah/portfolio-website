import type { Service } from "@/shared/types";

export const services: Service[] = [
  {
    id: "web-architecture",
    icon: "LayoutTemplate",
    title: "Web Architecture",
    description:
      "Type-safe frontend foundations — module boundaries, state shape, and rendering strategies that survive team turnover and feature creep.",
  },
  {
    id: "api-design",
    icon: "Webhook",
    title: "API Design",
    description:
      "Contracts that engineers on both ends trust. Versioning, error models, and documentation that makes onboarding a non-event.",
  },
  {
    id: "cloud-devops",
    icon: "Cloud",
    title: "Cloud & DevOps",
    description:
      "Observable, repeatable deployments. CI/CD, infrastructure as code, and the quiet alarms that catch regressions before users do.",
  },
  {
    id: "technical-consulting",
    icon: "Compass",
    title: "Technical Consulting",
    description:
      "Architecture reviews, risk audits, and second opinions. I read the codebase, then write a short report your team will actually finish.",
  },
];

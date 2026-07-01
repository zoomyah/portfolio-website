import type { Project } from "@/shared/types";

const IMG = "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=";
const SIZE = "&image_size=landscape_16_9";

const enc = (s: string) => encodeURIComponent(s);

const covers = {
  web: enc(
    "dark moody analytics dashboard with real-time charts and data visualizations on a wooden desk, warm golden rim light, cinematic editorial product photography"
  ),
  mobile: enc(
    "smartphone resting on minimalist dark walnut desk showing a sleek finance app interface, warm golden rim light, editorial product photography, shallow depth of field"
  ),
  data: enc(
    "abstract data visualization with glowing nodes and golden connection lines on a deep charcoal background, cinematic, editorial tech aesthetic"
  ),
  blog1: enc(
    "open laptop with code on screen in a dark room lit by a warm desk lamp, moody editorial photography, golden highlights"
  ),
  blog2: enc(
    "design sketches color swatches and a brass ruler on a dark desk with warm golden light, editorial flat lay"
  ),
};

export const projectCovers = {
  web: `${IMG}${covers.web}${SIZE}`,
  mobile: `${IMG}${covers.mobile}${SIZE}`,
  data: `${IMG}${covers.data}${SIZE}`,
  blog1: `${IMG}${covers.blog1}${SIZE}`,
  blog2: `${IMG}${covers.blog2}${SIZE}`,
};

export const projects: Project[] = [
  {
    slug: "atlas-realtime-dashboard",
    title: "Atlas — Realtime Operations Dashboard",
    category: "web",
    tech: ["React", "TypeScript", "WebSockets", "Node.js", "Redis"],
    cover: projectCovers.web,
    excerpt:
      "A streaming operations console for a logistics platform — sub-second updates across 40k concurrent operators.",
    year: 2024,
    liveUrl: "https://example.com/atlas",
    repoUrl: "https://github.com/example/atlas",
    caseStudy: {
      overview:
        "Atlas is the internal control surface for a fleet operations team. It ingests live telemetry from tens of thousands of vehicles and renders it into a calm, scannable console that operators actually want to use during 12-hour shifts.",
      challenge:
        "The previous console buckled under load: every WebSocket reconnect triggered a full re-fetch, the UI jank at ~40Hz updates, and operators had built a parallel spreadsheet workflow because they didn't trust the numbers on screen.",
      solution:
        "I introduced a delta-only protocol over a multiplexed WebSocket, a ring-buffer store on the client, and a render scheduler that batches updates to one frame. The map and tables reconcile against a single source of truth so the numbers always agree.",
      outcome:
        "Update latency dropped from 1.8s to 120ms p95, the console holds 40k concurrent operators on a third of the prior fleet, and the spreadsheet workaround was retired within two weeks of rollout.",
      gallery: [projectCovers.web, projectCovers.data, projectCovers.blog1],
    },
  },
  {
    slug: "ledger-mobile-finance",
    title: "Ledger — Personal Finance App",
    category: "mobile",
    tech: ["Flutter", "Dart", "PostgreSQL", "Go"],
    cover: projectCovers.mobile,
    excerpt:
      "A privacy-first personal finance app that runs on-device classification and never sends a transaction to a server.",
    year: 2023,
    liveUrl: "https://example.com/ledger",
    repoUrl: "https://github.com/example/ledger",
    caseStudy: {
      overview:
        "Ledger is a personal finance app that categorizes transactions on-device. It syncs bank data through a regulated aggregator, then never lets a single transaction leave the phone.",
      challenge:
        "Users wanted smart categorization but were unwilling to ship transaction-level data to a cloud model. The on-device classifier had to run in under 200ms on a mid-range Android without burning the battery.",
      solution:
        "I built a tiered classifier: a small rule engine handles the 80% case instantly, and a quantized TFLite model handles the long tail. The Go backend is reduced to auth and a sync cursor — no transaction data ever lands on disk.",
      outcome:
        "Median classification time is 64ms, the app ships at a 14MB binary, and the privacy posture became the headline of the launch — driving a 3x lift in trial conversion.",
      gallery: [projectCovers.mobile, projectCovers.blog2, projectCovers.web],
    },
  },
  {
    slug: "drift-pipeline-platform",
    title: "Drift — Streaming Data Platform",
    category: "data",
    tech: ["Python", "Kafka", "ClickHouse", "Kubernetes"],
    cover: projectCovers.data,
    excerpt:
      "A self-serve streaming platform that lets analysts ship pipelines without filing a ticket.",
    year: 2024,
    liveUrl: "https://example.com/drift",
    repoUrl: "https://github.com/example/drift",
    caseStudy: {
      overview:
        "Drift is an internal platform that turns Kafka topics into queryable ClickHouse tables with schemas analysts can declare in YAML — no infra ticket required.",
      challenge:
        "Analysts waited 3–6 weeks for the data team to onboard a new stream. The backlog was growing faster than headcount, and shadow pipelines were sprouting in spreadsheets.",
      solution:
        "I built a declarative onboarding flow: an analyst writes a small YAML spec, Drift validates it against the topic schema, provisions the ClickHouse materialized views, and wires up backfill — all behind a single PR review.",
      outcome:
        "Time-to-query dropped from 4 weeks to under 2 hours. The platform now serves 200+ analysts and 1.2B rows/day with a single on-call engineer.",
      gallery: [projectCovers.data, projectCovers.web, projectCovers.blog1],
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllTechTags(): string[] {
  const set = new Set<string>();
  projects.forEach((p) => p.tech.forEach((tag) => set.add(tag)));
  return Array.from(set).sort();
}

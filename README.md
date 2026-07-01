# M. Yahya — Editorial Portfolio

A production-grade developer portfolio built around the **Editorial-Technical Dark** aesthetic: deep charcoal canvas, warm-white type, a single gold accent, a variable Fraunces display face, and quiet, staggered motion. Designed as a CV-grade first impression for international and regional recruiters.

[![React](https://img.shields.io/badge/React-18-149ECA?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind-3-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-latest-EF4444?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License: MIT](https://img.shields.io/badge/License-MIT-22C55E)](./LICENSE)

## Features

| Area | What's here |
|------|-------------|
| **Aesthetic** | Editorial-Technical Dark — `#0B0B0C` base, `#C9A227` gold accent, Fraunces + Manrope + JetBrains Mono, film-grain overlay, faint grid gradient |
| **i18n** | Full English + Arabic dictionary with RTL flipping via `document.dir` |
| **Theming** | Dark default + elegant cream (`#F5F2EA`) light theme, persisted via `zustand` |
| **Routing** | `react-router-dom` v7 — Home, Work, CaseStudy, Blog, Post, Contact |
| **Content** | Projects & services as typed TS data; blog posts as MDX with `import.meta.glob` + `rehype-highlight` |
| **Motion** | Staggered hero reveal, scroll-into-view fade-up, hover lift, page transitions; respects `prefers-reduced-motion` |
| **Contact** | Underline-style form posting to Formspree, with success/error/unconfigured states |
| **Images** | Trae `text_to_image` endpoint with concrete, realistic prompts |
| **Responsive** | Desktop-first, mobile-adaptive, hamburger nav, ≥44px touch targets |

## Architecture

```
Browser ──▶ React SPA (react-router-dom)
              ├─ Pages (Home / Work / CaseStudy / Blog / Post / Contact)
              ├─ Components (ui / layout / home / work / blog)
              ├─ Data (projects.ts / services.ts)
              ├─ Content (*.mdx → import.meta.glob)
              ├─ Store (zustand: locale + theme, persisted)
              └─ External services (Formspree for contact, Vercel for hosting)
```

> Architecture diagram placeholder — drop a rendered diagram of the above flow here.

## Quick Start

```bash
git clone <repo-url> && cd portfolio-website
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

To enable the contact form, copy `.env.example` to `.env` and set your Formspree endpoint:

```bash
cp .env.example .env
# edit VITE_FORMSPREE_ENDPOINT
```

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check (`tsc -b`) + production build |
| `npm run preview` | Preview the production build locally |
| `npm run check` | Type-check only (no emit) |

## Screenshots

> Placeholder — capture the Home hero, the Work grid, and a Case Study page here once deployed.

## Tech Stack

- **React 18** + **TypeScript** + **Vite 6**
- **Tailwind CSS 3** with CSS-variable design tokens (dark/light)
- **zustand** for UI state (locale + theme, persisted)
- **framer-motion** for motion
- **MDX** (`@mdx-js/rollup`) + `rehype-highlight` for blog content
- **lucide-react** for icons
- **Google Fonts**: Fraunces, Manrope, JetBrains Mono

## Project Structure

```
src/
├── components/
│   ├── ui/         # Button, Chip, Card, SectionHeading, Grain, Container
│   ├── layout/     # Navbar, Footer, PageTransition, Layout
│   ├── home/       # Hero, About, ServicesPreview, WorkPreview, CTA
│   ├── work/       # ProjectCard, ProjectFilters
│   └── blog/       # PostCard, PostBody
├── pages/          # Home, Work, CaseStudy, Blog, Post, Contact
├── data/           # projects.ts, services.ts
├── content/        # *.mdx blog posts
├── store/          # useUiStore (zustand)
├── i18n/           # strings.ts (en/ar)
├── shared/         # types.ts
├── utils/          # contact.ts
├── styles/         # globals.css
└── App.tsx
```

## Roadmap

- [ ] Hidden admin panel for content editing (MVP2)
- [ ] SSG prerendering via `vite-plugin-ssr` for SEO
- [ ] Vitest unit tests for critical components
- [ ] Lighthouse ≥ 90 audit pass + image optimization

## License

[MIT](./LICENSE) © M. Yahya

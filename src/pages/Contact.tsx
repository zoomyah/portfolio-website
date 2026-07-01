import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, Send } from "lucide-react";
import { useUiStore } from "@/store/useUiStore";
import { t } from "@/i18n/strings";
import { submitContact, isFormspreeConfigured } from "@/utils/contact";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WireframeGlobe } from "@/components/three/WireframeGlobe";

type Status = "idle" | "sending" | "success" | "error";

const socials = [
  { label: "GitHub", href: "https://github.com", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "Email", href: "mailto:hello@example.com", icon: Mail },
];

export default function Contact() {
  const locale = useUiStore((s) => s.locale);
  const reduce = useReducedMotion();
  const configured = isFormspreeConfigured();

  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!configured) return;
    setStatus("sending");
    const { ok } = await submitContact(form);
    setStatus(ok ? "success" : "error");
    if (ok) setForm({ name: "", email: "", message: "" });
  }

  const fade = {
    initial: reduce ? false : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" } as const,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  };

  return (
    <div className="pt-32 md:pt-40">
      <section className="pb-16">
        <Container>
          <SectionHeading
            eyebrowKey="contactEyebrow"
            titleKey="contactTitle"
            subtitleKey="contactSubtitle"
          />
        </Container>
      </section>

      <section className="relative isolate overflow-hidden pb-24">
        <WireframeGlobe className="-right-32 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 opacity-25" opacity={0.5} />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-bg via-bg/80 to-bg/20" />
        <Container>
          <div className="grid gap-16 md:grid-cols-12">
            <motion.form
              onSubmit={handleSubmit}
              initial={fade.initial}
              whileInView={fade.whileInView}
              viewport={fade.viewport}
              transition={fade.transition}
              className="md:col-span-7 space-y-10"
            >
              {!configured && (
                <p className="border border-accent/30 bg-accent/5 px-5 py-4 text-sm text-ink/90 leading-relaxed">
                  {t(locale, "contactUnset")}{" "}
                  <a
                    href="mailto:hello@example.com"
                    className="text-accent underline underline-offset-4"
                  >
                    hello@example.com
                  </a>
                </p>
              )}

              {status === "success" && (
                <p className="border border-accent/40 bg-accent/10 px-5 py-4 text-sm text-accent">
                  {t(locale, "contactSuccess")}
                </p>
              )}
              {status === "error" && (
                <p className="border border-red-500/40 bg-red-500/5 px-5 py-4 text-sm text-red-400">
                  {t(locale, "contactError")}
                </p>
              )}

              <div>
                <label htmlFor="name" className="eyebrow block mb-3">
                  {t(locale, "contactName")}
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input-underline"
                />
              </div>

              <div>
                <label htmlFor="email" className="eyebrow block mb-3">
                  {t(locale, "contactEmail")}
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input-underline"
                />
              </div>

              <div>
                <label htmlFor="message" className="eyebrow block mb-3">
                  {t(locale, "contactMessage")}
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="input-underline resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending" || !configured}
                className="inline-flex items-center gap-2 bg-accent text-[#0B0B0C] border border-accent px-6 py-3 font-mono text-xs uppercase tracking-eyebrow transition-all duration-300 hover:bg-transparent hover:text-accent disabled:opacity-50 disabled:pointer-events-none"
              >
                {status === "sending" ? t(locale, "contactSending") : t(locale, "contactSubmit")}
                <Send size={13} />
              </button>
            </motion.form>

            <motion.aside
              initial={fade.initial}
              whileInView={fade.whileInView}
              viewport={fade.viewport}
              transition={{ ...fade.transition, delay: 0.1 }}
              className="md:col-span-5 md:pl-8 space-y-12"
            >
              <div>
                <p className="eyebrow mb-4">{t(locale, "contactDirect")}</p>
                <a
                  href="mailto:hello@example.com"
                  className="font-display text-2xl md:text-3xl font-medium link-underline"
                >
                  hello@example.com
                </a>
              </div>

              <div>
                <p className="eyebrow mb-4">{t(locale, "contactSocial")}</p>
                <div className="flex flex-col gap-px border border-edge/10 bg-edge/10">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between bg-bg px-5 py-4 transition-colors hover:bg-surface/60"
                    >
                      <span className="inline-flex items-center gap-3">
                        <s.icon size={16} className="text-muted group-hover:text-accent transition-colors" />
                        <span className="text-sm">{s.label}</span>
                      </span>
                      <ArrowUpRight
                        size={14}
                        className="text-muted group-hover:text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <p className="eyebrow mb-4">Location</p>
                <p className="text-muted leading-relaxed">{t(locale, "contactLocation")}</p>
              </div>
            </motion.aside>
          </div>
        </Container>
      </section>
    </div>
  );
}

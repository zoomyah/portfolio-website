import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";
import { useUiStore } from "@/store/useUiStore";
import { t } from "@/i18n/strings";
import { Container } from "@/components/ui/Container";

const socials = [
  { label: "GitHub", href: "https://github.com", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "Email", href: "mailto:hello@example.com", icon: Mail },
];

export function Footer() {
  const locale = useUiStore((s) => s.locale);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-edge/10 mt-32">
      <Container>
        <div className="py-16 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link to="/" className="font-display text-2xl font-semibold">
              {t(locale, "brandName")}
            </Link>
            <p className="mt-4 text-muted max-w-sm leading-relaxed">
              {t(locale, "footerTagline")}
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow mb-4">{t(locale, "footerNav")}</p>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="link-underline text-sm text-muted hover:text-ink">
                  {t(locale, "navHome")}
                </Link>
              </li>
              <li>
                <Link to="/work" className="link-underline text-sm text-muted hover:text-ink">
                  {t(locale, "navWork")}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="link-underline text-sm text-muted hover:text-ink">
                  {t(locale, "navBlog")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="link-underline text-sm text-muted hover:text-ink">
                  {t(locale, "navContact")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="eyebrow mb-4">{t(locale, "footerSocial")}</p>
            <div className="flex items-center gap-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="h-10 w-10 inline-flex items-center justify-center border border-edge/20 text-muted hover:text-accent hover:border-accent transition-colors"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
            <p className="mt-6 text-xs text-muted">{t(locale, "contactLocation")}</p>
          </div>
        </div>

        <div className="py-6 border-t border-edge/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-mono text-xs text-muted">
            © {year} {t(locale, "brandName")}. {t(locale, "footerRights")}
          </p>
          <p className="font-mono text-xs text-muted">{t(locale, "footerColophon")}</p>
        </div>
      </Container>
    </footer>
  );
}

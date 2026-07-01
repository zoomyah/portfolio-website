import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useUiStore } from "@/store/useUiStore";
import { t } from "@/i18n/strings";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const navItems = [
  { to: "/", key: "navHome" as const },
  { to: "/work", key: "navWork" as const },
  { to: "/blog", key: "navBlog" as const },
  { to: "/contact", key: "navContact" as const },
];

export function Navbar() {
  const locale = useUiStore((s) => s.locale);
  const theme = useUiStore((s) => s.theme);
  const toggleLocale = useUiStore((s) => s.toggleLocale);
  const toggleTheme = useUiStore((s) => s.toggleTheme);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-bg/80 backdrop-blur-md border-b border-edge/10"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <Container>
        <nav className="flex h-16 md:h-20 items-center justify-between">
          <Link to="/" className="group flex flex-col leading-none">
            <span className="font-display text-lg font-semibold tracking-tight">
              {t(locale, "brandName")}
            </span>
            <span className="eyebrow mt-1">{t(locale, "brandRole")}</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "link-underline font-mono text-xs uppercase tracking-eyebrow transition-colors",
                    isActive ? "text-accent" : "text-muted hover:text-ink"
                  )
                }
              >
                {t(locale, item.key)}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleLocale}
              aria-label={t(locale, "toggleLocale")}
              className="h-9 w-9 inline-flex items-center justify-center border border-edge/20 text-muted hover:text-ink hover:border-edge/40 transition-colors font-mono text-xs"
            >
              {locale === "en" ? "ع" : "EN"}
            </button>
            <button
              onClick={toggleTheme}
              aria-label={t(locale, "toggleTheme")}
              className="h-9 w-9 inline-flex items-center justify-center border border-edge/20 text-muted hover:text-ink hover:border-edge/40 transition-colors"
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <Button as="link" href="/contact" variant="ghost" size="sm">
              {t(locale, "navCta")}
            </Button>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="md:hidden h-10 w-10 inline-flex items-center justify-center text-ink"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </Container>

      {open && (
        <div className="md:hidden border-t border-edge/10 bg-bg/95 backdrop-blur-md">
          <Container>
            <div className="flex flex-col py-6 gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "py-3 font-mono text-sm uppercase tracking-eyebrow border-b border-edge/5",
                      isActive ? "text-accent" : "text-ink"
                    )
                  }
                >
                  {t(locale, item.key)}
                </NavLink>
              ))}
              <div className="flex items-center gap-3 pt-5">
                <button
                  onClick={toggleLocale}
                  className="h-9 px-4 inline-flex items-center justify-center border border-edge/20 font-mono text-xs"
                >
                  {locale === "en" ? "العربية" : "English"}
                </button>
                <button
                  onClick={toggleTheme}
                  className="h-9 w-9 inline-flex items-center justify-center border border-edge/20"
                >
                  {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
                </button>
              </div>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}

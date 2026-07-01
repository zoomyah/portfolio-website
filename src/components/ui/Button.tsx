import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

const base =
  "inline-flex items-center justify-center gap-2 font-mono uppercase tracking-eyebrow transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-[#0B0B0C] border border-accent hover:bg-transparent hover:text-accent",
  ghost:
    "bg-transparent text-ink border border-edge/30 hover:border-accent hover:text-accent",
};

const sizes: Record<Size, string> = {
  sm: "text-[0.6875rem] px-4 py-2.5",
  md: "text-xs px-6 py-3",
  lg: "text-xs px-8 py-4",
};

interface ButtonAsLink extends ButtonBaseProps {
  as?: "link";
  href: string;
  external?: boolean;
  children: React.ReactNode;
}

interface ButtonAsButton
  extends ButtonBaseProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: "button";
  children: React.ReactNode;
}

type ButtonProps = ButtonAsLink | ButtonAsButton;

function isInternal(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (props.as === "link") {
    const { href, external, children, ...rest } = props as ButtonAsLink;
    const useExternal = external || !isInternal(href);

    if (useExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...rest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link to={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { as, children, ...rest } = props as ButtonAsButton;
  void as;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

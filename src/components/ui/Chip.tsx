import { cn } from "@/lib/utils";

type ChipOwnProps = {
  active?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ChipButtonProps = ChipOwnProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    as?: "button";
  };

type ChipDivProps = ChipOwnProps &
  Omit<React.HTMLAttributes<HTMLSpanElement>, "className" | "children"> & {
    as: "div";
  };

type Props = ChipButtonProps | ChipDivProps;

const chipBase =
  "inline-flex items-center gap-1.5 border px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-eyebrow transition-colors duration-300";

function resolveClasses(active?: boolean, className?: string) {
  return cn(
    chipBase,
    active
      ? "border-accent text-accent bg-accent/5"
      : "border-edge/20 text-muted hover:border-edge/40 hover:text-ink",
    className
  );
}

export function Chip(props: Props) {
  const classes = resolveClasses(props.active, props.className);

  if (props.as === "div") {
    const { as: _as, active: _a, className: _c, children, ...rest } = props;
    void _as;
    void _a;
    void _c;
    return (
      <span className={classes} {...rest}>
        {children}
      </span>
    );
  }

  const { as: _as, active: _a, className: _c, children, ...rest } = props;
  void _as;
  void _a;
  void _c;
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}

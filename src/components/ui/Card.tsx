import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

export function Card({ interactive = false, className, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        "bg-surface/60 border border-edge/10 backdrop-blur-sm",
        interactive && "transition-all duration-500 hover:border-edge/25 hover:bg-surface",
        className
      )}
      {...rest}
    />
  );
}

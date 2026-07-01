import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "prose" | "wide";
}

const sizes: Record<NonNullable<ContainerProps["size"]>, string> = {
  default: "max-w-7xl",
  wide: "max-w-[88rem]",
  prose: "max-w-prose",
};

export function Container({ size = "default", className, ...rest }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-6 sm:px-8", sizes[size], className)} {...rest} />
  );
}

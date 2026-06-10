import { cn } from "@/shared/utils/cn";

interface SpacerProps {
  size: number;
  className?: string;
}

export default function Spacer({
  size,
  className,
}: SpacerProps) {
  // Multiply values by 4 to get pixels
  const space = size * 4;

  return (
    <span
      className={cn("block w-px h-px min-w-px min-h-px select-none", className)}
      style={{
        marginTop: `calc(${space}px - 1px)`,
      }}
      aria-hidden="true"
    />
  );
}
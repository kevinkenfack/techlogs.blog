import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type HighlightAccentProps = {
  children: ReactNode;
  withHalo?: boolean;
};

export const HighlightAccent = ({
  children,
  withHalo = true,
}: HighlightAccentProps) => (
  <span
    className={cn(
      "relative inline [box-decoration-break:clone] [-webkit-box-decoration-break:clone]",
      withHalo &&
        "bg-linear-to-b from-transparent from-[80%] to-primary/30 bg-no-repeat"
    )}
  >
    <span className="relative z-10 bg-linear-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent [box-decoration-break:clone] [-webkit-box-decoration-break:clone] font-bold">
      {children}
    </span>
  </span>
);

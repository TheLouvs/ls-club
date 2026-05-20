import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "success" | "warning" | "danger" | "info" | "premium" | "purple";

const tones: Record<Tone, { bg: string; color: string; border?: string }> = {
  neutral: { bg: "#132B1E", color: "#7A8A7A" },
  success: { bg: "rgba(201,168,76,0.12)", color: "#C9A84C" },
  warning: { bg: "rgba(224,160,32,0.12)", color: "#E8A020" },
  danger: { bg: "rgba(192,64,64,0.12)", color: "#E05050" },
  info: { bg: "rgba(74,124,191,0.12)", color: "#7AAEE8" },
  premium: {
    bg: "linear-gradient(135deg, rgba(201,168,76,0.15), rgba(232,201,122,0.15))",
    color: "#C9A84C",
    border: "1px solid rgba(201,168,76,0.35)",
  },
  purple: { bg: "rgba(176,128,224,0.12)", color: "#B080E0" },
};

export function Badge({
  children,
  tone = "neutral",
  size = "sm",
  className,
  uppercase = false,
}: {
  children: ReactNode;
  tone?: Tone;
  size?: "xs" | "sm" | "md";
  className?: string;
  uppercase?: boolean;
}) {
  const t = tones[tone];
  const padding = size === "xs" ? "1.5px 6px" : size === "sm" ? "3px 9px" : "5px 11px";
  const fontSize = size === "xs" ? 9 : size === "sm" ? 10 : 11;

  return (
    <span
      className={cn("inline-flex items-center gap-1 font-bold rounded-full whitespace-nowrap", className)}
      style={{
        background: t.bg,
        color: t.color,
        border: t.border,
        padding,
        fontSize,
        letterSpacing: uppercase ? 0.6 : 0,
        textTransform: uppercase ? "uppercase" : "none",
        lineHeight: 1.2,
      }}
    >
      {children}
    </span>
  );
}

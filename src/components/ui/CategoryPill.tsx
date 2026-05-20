import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type Category =
  | "drive"
  | "fer"
  | "approche"
  | "bunker"
  | "putting"
  | "mental"
  | "strategie"
  | "regles";

export const CATEGORY_META: Record<Category, { label: string; color: string; bg: string; gradient: string }> = {
  drive: {
    label: "Drive",
    color: "#E05050",
    bg: "rgba(192,64,64,0.12)",
    gradient: "linear-gradient(145deg, #4A1818, #6A2828)",
  },
  fer: {
    label: "Fer",
    color: "#E8A020",
    bg: "rgba(224,160,32,0.12)",
    gradient: "linear-gradient(145deg, #4A2A10, #6A4018)",
  },
  approche: {
    label: "Approche",
    color: "#C9A84C",
    bg: "rgba(201,168,76,0.12)",
    gradient: "linear-gradient(145deg, #1A3410, #2D4D1A)",
  },
  bunker: {
    label: "Bunker",
    color: "#DFC060",
    bg: "rgba(223,192,96,0.12)",
    gradient: "linear-gradient(145deg, #4A3A10, #6A5A18)",
  },
  putting: {
    label: "Putting",
    color: "#7AAEE8",
    bg: "rgba(74,124,191,0.12)",
    gradient: "linear-gradient(145deg, #102A4A, #1A3D5C)",
  },
  mental: {
    label: "Mental",
    color: "#B080E0",
    bg: "rgba(176,128,224,0.12)",
    gradient: "linear-gradient(145deg, #2A1A4A, #3D2A6A)",
  },
  strategie: {
    label: "Stratégie",
    color: "#7ACCA0",
    bg: "rgba(74,191,160,0.12)",
    gradient: "linear-gradient(145deg, #102A2A, #1A4A4A)",
  },
  regles: {
    label: "Règles",
    color: "#7A8A7A",
    bg: "#132B1E",
    gradient: "linear-gradient(145deg, #1A2A1A, #2A3D2A)",
  },
};

export function CategoryPill({
  category,
  icon: Icon,
  active = false,
  size = "sm",
  className,
  onClick,
}: {
  category: Category;
  icon?: LucideIcon;
  active?: boolean;
  size?: "sm" | "md";
  className?: string;
  onClick?: () => void;
}) {
  const meta = CATEGORY_META[category];
  const padding = size === "sm" ? "5px 11px" : "7px 14px";
  const fontSize = size === "sm" ? 11 : 13;
  const iconSize = size === "sm" ? 11 : 13;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 font-semibold rounded-full whitespace-nowrap transition-all",
        onClick ? "cursor-pointer hover:scale-105 active:scale-95" : "cursor-default",
        className
      )}
      style={{
        background: active ? meta.color : meta.bg,
        color: active ? "#0F2318" : meta.color,
        padding,
        fontSize,
        border: active ? "none" : `1px solid ${meta.color}33`,
        lineHeight: 1.2,
      }}
    >
      {Icon && <Icon size={iconSize} />}
      {meta.label}
    </button>
  );
}

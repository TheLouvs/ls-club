import { cn } from "@/lib/utils";

type Size = "xs" | "sm" | "md" | "lg" | "xl";
type Variant = "green" | "blue" | "gold" | "purple" | "pink" | "orange";

const sizes: Record<Size, { box: number; font: number; ring: number }> = {
  xs: { box: 22, font: 9, ring: 2 },
  sm: { box: 28, font: 11, ring: 2 },
  md: { box: 36, font: 13, ring: 2.5 },
  lg: { box: 48, font: 17, ring: 3 },
  xl: { box: 64, font: 23, ring: 3 },
};

const gradients: Record<Variant, string> = {
  green: "linear-gradient(135deg, #1B3A2A, #2A5A3A)",
  blue: "linear-gradient(135deg, #2A5C8F, #5A8AC0)",
  gold: "linear-gradient(135deg, #9A6A10, #C9A84C)",
  purple: "linear-gradient(135deg, #6A2A9A, #A050C0)",
  pink: "linear-gradient(135deg, #B02A5C, #D85A8A)",
  orange: "linear-gradient(135deg, #B05A10, #E8883A)",
};

export function Avatar({
  initials,
  variant = "green",
  size = "md",
  status,
  level,
  className,
}: {
  initials: string;
  variant?: Variant;
  size?: Size;
  status?: "online" | "offline";
  level?: string | number;
  className?: string;
}) {
  const { box, font, ring } = sizes[size];

  return (
    <div
      className={cn("relative flex-shrink-0", className)}
      style={{ width: box, height: box }}
    >
      <div
        className="rounded-full flex items-center justify-center font-bold text-white"
        style={{
          width: "100%",
          height: "100%",
          fontSize: font,
          background: gradients[variant],
          boxShadow: "inset 0 -1.5px 3px rgba(0,0,0,0.18), 0 1.5px 4px rgba(0,0,0,0.08)",
        }}
      >
        {initials}
      </div>

      {status === "online" && (
        <span
          className="absolute rounded-full"
          style={{
            width: ring + 4,
            height: ring + 4,
            background: "#C9A84C",
            border: `${ring - 1}px solid #0F2318`,
            bottom: 0,
            right: 0,
          }}
        />
      )}

      {level !== undefined && (
        <span
          className="absolute font-bold text-white rounded-full flex items-center justify-center"
          style={{
            top: -4,
            right: -4,
            minWidth: Math.round(box * 0.4),
            height: Math.round(box * 0.4),
            padding: "0 4px",
            fontSize: Math.max(8, Math.round(font * 0.7)),
            background: "linear-gradient(135deg, #C9A84C, #E8C97A)",
            border: "1.5px solid #0F2318",
            boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
          }}
        >
          {level}
        </span>
      )}
    </div>
  );
}

type Variant = "green" | "blue" | "gold";

const gradients: Record<Variant, string> = {
  green: "linear-gradient(135deg, #1B3A2A, #2A5A3A)",
  blue: "linear-gradient(135deg, #2A5C8F, #5A8AC0)",
  gold: "linear-gradient(135deg, #9A6A10, #C9A84C)",
};

export function Avatar({ initials, variant = "green", size = 44 }: {
  initials: string;
  variant?: Variant;
  size?: number;
}) {
  return (
    <div
      className="rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.36,
        background: gradients[variant],
        boxShadow: "inset 0 -2px 4px rgba(0,0,0,0.15), 0 2px 6px rgba(0,0,0,0.08)",
      }}
    >
      {initials}
    </div>
  );
}

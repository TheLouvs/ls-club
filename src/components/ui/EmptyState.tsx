import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export function EmptyState({
  icon: Icon,
  emoji,
  title,
  description,
  action,
}: {
  icon?: LucideIcon;
  emoji?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="card-white p-8 md:p-12 text-center">
      <div
        className="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center"
        style={{ background: "rgba(201,168,76,0.1)" }}
      >
        {Icon ? <Icon size={24} style={{ color: "#C9A84C" }} /> : <span className="text-2xl">{emoji}</span>}
      </div>
      <p className="font-serif font-bold text-base mb-1" style={{ color: "#F5F0E8" }}>
        {title}
      </p>
      {description && (
        <p className="text-xs max-w-sm mx-auto mb-3" style={{ color: "#7A8A7A" }}>
          {description}
        </p>
      )}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}

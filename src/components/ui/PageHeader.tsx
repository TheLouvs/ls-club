import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3 mb-5">
      <div className="min-w-0 flex-1">
        {eyebrow && (
          <p
            className="text-[10px] font-bold tracking-widest uppercase mb-1"
            style={{ color: "#7A8A7A" }}
          >
            {eyebrow}
          </p>
        )}
        <h1
          className="font-serif font-bold text-2xl md:text-[28px] leading-tight"
          style={{ color: "#F5F0E8" }}
        >
          {title}
        </h1>
        {description && (
          <p className="text-xs md:text-sm mt-1" style={{ color: "#7A8A7A" }}>
            {description}
          </p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}

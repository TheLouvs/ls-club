"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

type ToastTone = "success" | "error" | "info";

type Toast = {
  id: number;
  tone: ToastTone;
  message: string;
};

type ToastContextValue = {
  show: (message: string, tone?: ToastTone) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const show = useCallback((message: string, tone: ToastTone = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, tone, message }]);
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div
        className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2 pointer-events-none"
        aria-live="polite"
      >
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const inT = setTimeout(() => setVisible(true), 16);
    const outT = setTimeout(() => setVisible(false), 3000);
    const removeT = setTimeout(onDismiss, 3300);
    return () => {
      clearTimeout(inT);
      clearTimeout(outT);
      clearTimeout(removeT);
    };
  }, [onDismiss]);

  const palette =
    toast.tone === "success"
      ? { bg: "#0D1A09", color: "#FFFFFF", icon: CheckCircle, accent: "#C9A84C" }
      : toast.tone === "error"
      ? { bg: "#0D1A09", color: "#FFFFFF", icon: AlertCircle, accent: "#E05050" }
      : { bg: "#0D1A09", color: "#FFFFFF", icon: Info, accent: "#5A8AC0" };

  const Icon = palette.icon;

  return (
    <div
      className="pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-lg min-w-[260px] max-w-[420px]"
      style={{
        background: palette.bg,
        color: palette.color,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 0.25s ease, transform 0.25s ease",
        boxShadow: "0 12px 32px rgba(0,0,0,0.3)",
      }}
    >
      <Icon size={16} style={{ color: palette.accent, flexShrink: 0 }} />
      <span className="text-sm font-medium flex-1">{toast.message}</span>
      <button
        onClick={onDismiss}
        className="opacity-50 hover:opacity-100 flex-shrink-0"
        aria-label="Fermer"
      >
        <X size={14} />
      </button>
    </div>
  );
}

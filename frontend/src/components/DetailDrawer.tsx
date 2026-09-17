"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

type DetailDrawerProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export function DetailDrawer({ open, onClose, title, children }: DetailDrawerProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <button
        type="button"
        className="absolute inset-0 bg-charcoal/45"
        aria-label="Close"
        onClick={onClose}
      />
      <aside className="relative z-10 flex h-full w-full max-w-md flex-col bg-white shadow-2xl animate-in slide-in-from-right">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h3 className="text-lg font-semibold text-forest">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-muted hover:bg-cream hover:text-forest"
            aria-label="Close drawer"
          >
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
      </aside>
    </div>
  );
}

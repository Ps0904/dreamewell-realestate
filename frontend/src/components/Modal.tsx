"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  wide?: boolean;
};

export function Modal({ open, onClose, title, children, wide }: ModalProps) {
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
    <div className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-charcoal/45"
        aria-label="Close"
        onClick={onClose}
      />
      <div
        className={`relative z-10 max-h-[90vh] w-full overflow-y-auto rounded-t-2xl bg-white shadow-xl sm:rounded-xl ${
          wide ? "sm:max-w-2xl" : "sm:max-w-lg"
        }`}
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-border bg-white px-5 py-4">
          <h3 className="text-lg font-semibold text-forest">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-muted hover:bg-cream hover:text-forest"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

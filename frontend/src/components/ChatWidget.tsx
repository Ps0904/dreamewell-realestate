"use client";

import { MessageCircle } from "lucide-react";

export function ChatWidget() {
  return (
    <button
      type="button"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-sm border border-border bg-[#fffcf7] px-4 py-2.5 text-sm font-medium text-forest shadow-[0_8px_24px_rgba(19,38,31,0.12)] transition-shadow hover:shadow-[0_10px_28px_rgba(19,38,31,0.16)]"
    >
      <MessageCircle size={16} />
      Chat with us
    </button>
  );
}

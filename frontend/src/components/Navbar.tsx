"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Bell } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/marketing", label: "Marketing" },
  { href: "/inventory", label: "Inventory" },
];

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"EN" | "TA">("EN");

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-[#fffcf7]/92 backdrop-blur-md">
      <div className="container-premium flex h-16 items-center justify-between gap-4 md:h-[72px]">
        <Link href="/" className="flex items-center shrink-0">
          <img
            src={`${basePath}/logo.png`}
            alt="Dream Well Ventures Pvt Ltd"
            className="h-12 w-auto object-contain md:h-14"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-[13px] font-medium tracking-wide transition-colors ${
                  active ? "text-forest" : "text-charcoal/65 hover:text-forest"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute -bottom-[22px] left-0 right-0 h-[2px] bg-forest" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <div className="flex items-center rounded-md border border-border p-0.5 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setLang("EN")}
              className={`rounded px-2.5 py-1.5 transition-colors ${
                lang === "EN" ? "bg-forest text-white" : "text-muted hover:text-forest"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang("TA")}
              className={`rounded px-2.5 py-1.5 transition-colors ${
                lang === "TA" ? "bg-forest text-white" : "text-muted hover:text-forest"
              }`}
            >
              தமிழ்
            </button>
          </div>

          <button
            type="button"
            className="rounded-md p-2 text-muted transition-colors hover:bg-cream hover:text-forest"
            aria-label="Notifications"
          >
            <Bell className="h-4.5 w-4.5" size={18} />
          </button>

          <button
            type="button"
            className="rounded-md border border-forest bg-forest px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-forest-deep"
          >
            Login
          </button>
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-forest md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-white md:hidden">
          <div className="container-premium flex flex-col gap-1 py-3">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-md px-3 py-2.5 text-sm font-medium ${
                    active ? "bg-cream text-forest" : "text-charcoal/80"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-2 flex items-center justify-between border-t border-border px-3 pt-3">
              <div className="flex items-center rounded-md border border-border p-0.5 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setLang("EN")}
                  className={`rounded px-2.5 py-1.5 ${
                    lang === "EN" ? "bg-forest text-white" : "text-muted"
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLang("TA")}
                  className={`rounded px-2.5 py-1.5 ${
                    lang === "TA" ? "bg-forest text-white" : "text-muted"
                  }`}
                >
                  தமிழ்
                </button>
              </div>
              <button
                type="button"
                className="rounded-md bg-forest px-4 py-2 text-sm font-semibold text-white"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

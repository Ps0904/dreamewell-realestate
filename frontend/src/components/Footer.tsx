import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-forest-deep text-white">
      <div className="container-premium flex flex-col gap-10 py-14 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <p className="font-display text-2xl font-medium">Dreamwell Ventures</p>
          <p className="mt-3 text-sm leading-relaxed text-white/65">
            From productive land to reliable farm supply — holdings and protein from working farms
            across Tamil Nadu.
          </p>
        </div>

        <div className="flex gap-16 text-sm">
          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-straw">
              Modules
            </p>
            <ul className="space-y-2.5 text-white/70">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/marketing" className="hover:text-white">
                  Marketing
                </Link>
              </li>
              <li>
                <Link href="/inventory" className="hover:text-white">
                  Inventory
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-straw">
              Visit
            </p>
            <ul className="space-y-2.5 text-white/70">
              <li>Coimbatore, Tamil Nadu</li>
              <li>hello@dreamwellventures.in</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-premium flex flex-col gap-2 py-4 text-[11px] uppercase tracking-[0.14em] text-white/45 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} Dreamwell Ventures</p>
          <p>Farm land & protein supply</p>
        </div>
      </div>
    </footer>
  );
}

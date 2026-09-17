import Link from "next/link";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function Footer() {
  return (
    <footer className="bg-forest-deep text-white">
      <div className="container-premium flex flex-col gap-10 py-14 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <img
            src={`${basePath}/logo.png`}
            alt="Dream Well Ventures Pvt Ltd"
            className="h-16 w-auto object-contain md:h-[4.5rem]"
          />
          <p className="mt-4 text-sm leading-relaxed text-white/65">
            From productive land to reliable farm supply — holdings and protein from working farms
            across Tamil Nadu.
          </p>
        </div>

        <div className="flex flex-col gap-10 text-sm sm:flex-row sm:gap-16">
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
          <div className="max-w-xs">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-straw">
              Contact
            </p>
            <ul className="space-y-2.5 text-white/70">
              <li>
                2nd Floor, 22/1 Nilla Cottage, GST Road Hallam-Madurai Main Road, Near State Bank of
                India Pasumalai, Madurai - 625004
              </li>
              <li>
                <a href="mailto:support@dreamwellventures.com" className="hover:text-white">
                  support@dreamwellventures.com
                </a>
              </li>
              <li>
                <a href="tel:+919585720548" className="hover:text-white">
                  +91 95857 20548
                </a>
                <span className="mx-1.5 text-white/35">·</span>
                <a href="tel:+919080108106" className="hover:text-white">
                  +91 90801 08106
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-premium flex flex-col gap-2 py-4 text-[11px] uppercase tracking-[0.14em] text-white/45 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} Dream Well Ventures Pvt Ltd</p>
          <p>Farm land & protein supply</p>
        </div>
      </div>
    </footer>
  );
}

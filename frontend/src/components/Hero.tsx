import { MediaImage } from "./MediaImage";
import Link from "next/link";
import { images, tickerItems, heroHighlights } from "@/data/mock";

export function Hero() {
  return (
    <section className="relative min-h-[86vh] overflow-hidden md:min-h-[92vh]">
      <MediaImage
        src={images.hero}
        alt="Open sunny grassland farmland in Tamil Nadu"
        priority
        className="absolute inset-0 h-full w-full object-cover object-[center_40%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(19,38,31,0.82)_0%,rgba(19,38,31,0.42)_48%,rgba(19,38,31,0.18)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/70 via-transparent to-forest-deep/20" />

      <div className="container-premium relative flex min-h-[86vh] flex-col justify-end pb-28 pt-24 md:min-h-[92vh] md:justify-center md:pb-36 md:pt-20">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-3.5 py-1.5 text-[11px] font-medium tracking-wide text-white/90">
            <span className="h-1.5 w-1.5 rounded-full bg-straw" />
            12 active farms · Western Tamil Nadu
          </div>

          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-straw">
            Farm land & protein supply
          </p>

          <h1 className="font-display text-[3.15rem] font-medium leading-[0.95] tracking-tight text-white md:text-7xl lg:text-[5.1rem]">
            Productive Land.
            <span className="mt-1 block italic text-straw">Trusted Supply.</span>
          </h1>

          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/78 md:text-base">
            Discover farm opportunities and connect directly with reliable poultry and protein
            supply.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/marketing" className="btn-light">
              Explore Farm Opportunities
            </Link>
            <Link href="/inventory" className="btn-secondary">
              View Farm Supply
            </Link>
          </div>
        </div>

        <div className="mt-14 hidden grid-cols-3 gap-px overflow-hidden border border-white/15 bg-white/10 md:grid md:max-w-xl">
          {heroHighlights.map((item) => (
            <div key={item.label} className="bg-forest-deep/35 px-5 py-4 backdrop-blur-[2px]">
              <p className="font-display text-2xl font-medium text-white">{item.value}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-white/60">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 overflow-hidden border-t border-white/10 bg-forest py-2.5">
        <div className="ticker-track text-[11px] font-medium uppercase tracking-[0.18em] text-white/80">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={`${item}-${i}`} className="flex items-center">
              <span className="px-8">{item}</span>
              <span className="text-gold">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

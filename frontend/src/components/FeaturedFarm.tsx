import { MediaImage } from "./MediaImage";
import Link from "next/link";
import { featuredFarm } from "@/data/mock";
import { StatusBadge } from "./StatusBadge";
import { SectionHeader } from "./SectionHeader";

export function FeaturedFarm() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-[radial-gradient(circle_at_70%_40%,rgba(184,154,90,0.12),transparent_60%)]" />
      <div className="container-premium">
        <SectionHeader
          eyebrow="Signature listing"
          title={featuredFarm.title}
          description="A working Pollachi estate — tiled sheds, coconut grove, and soil that already produces."
        />

        <div className="grid overflow-hidden border border-border bg-white lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative min-h-[340px] lg:min-h-[520px]">
            <MediaImage
              src={featuredFarm.image}
              alt={featuredFarm.name}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute bottom-5 left-5 rounded-sm bg-white/95 px-4 py-3">
              <p className="text-[10px] uppercase tracking-[0.16em] text-sage">Acreage</p>
              <p className="font-display text-2xl text-forest">{featuredFarm.acreage}</p>
            </div>
          </div>
          <div className="flex flex-col justify-center bg-[#f7f3ea] p-8 md:p-10 lg:p-12">
            <StatusBadge status={featuredFarm.availability} />
            <h3 className="font-display mt-4 text-3xl font-medium text-forest md:text-4xl">
              {featuredFarm.name}
            </h3>
            <p className="mt-1 text-sm text-sage">{featuredFarm.location}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted md:text-[15px]">
              {featuredFarm.description}
            </p>

            <dl className="mt-8 space-y-4 border-t border-border pt-6">
              <div className="flex justify-between gap-4 text-sm">
                <dt className="uppercase tracking-[0.12em] text-[11px] text-muted">Farm type</dt>
                <dd className="font-medium text-charcoal">{featuredFarm.type}</dd>
              </div>
              <div className="flex justify-between gap-4 text-sm">
                <dt className="uppercase tracking-[0.12em] text-[11px] text-muted">Availability</dt>
                <dd className="font-medium text-charcoal">{featuredFarm.availability}</dd>
              </div>
              <div className="flex justify-between gap-4 text-sm">
                <dt className="uppercase tracking-[0.12em] text-[11px] text-muted">Pricing</dt>
                <dd className="font-medium text-forest">{featuredFarm.price}</dd>
              </div>
            </dl>

            <div className="mt-8">
              <Link href="/marketing" className="btn-primary">
                View Property
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

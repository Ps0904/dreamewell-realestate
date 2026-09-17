import Link from "next/link";
import { Hero } from "@/components/Hero";
import { MetricStrip } from "@/components/MetricStrip";
import { SectionHeader } from "@/components/SectionHeader";
import { PortfolioCard } from "@/components/PortfolioCard";
import { ProductCard } from "@/components/ProductCard";
import { FeaturedFarm } from "@/components/FeaturedFarm";
import {
  homeMetrics,
  portfolioItems,
  proteinSupply,
  supplyActivity,
  trustPoints,
} from "@/data/mock";

export default function HomePage() {
  const featured = portfolioItems.slice(0, 2);
  const rest = portfolioItems.slice(2);

  return (
    <>
      <Hero />
      <MetricStrip metrics={homeMetrics} />

      <section className="py-16 md:py-24">
        <div className="container-premium">
          <SectionHeader
            eyebrow="The land"
            title="Explore Our Farm Portfolio"
            description="Working acreage, tiled farm sheds, and groves across Pollachi, Namakkal, and the Coimbatore belt."
            action={
              <Link href="/marketing" className="btn-outline hidden md:inline-flex">
                View All Listings
              </Link>
            }
          />
          <div className="grid gap-4 md:grid-cols-2">
            {featured.map((item) => (
              <PortfolioCard key={item.id} {...item} featured />
            ))}
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((item) => (
              <PortfolioCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-[#fffcf7] py-16 md:py-24">
        <div className="container-premium">
          <SectionHeader
            eyebrow="From the yard"
            title="Fresh Supply, Direct From the Farm"
            description="Eggs, birds, and meat from Tamil Nadu farms — with farm origin, quantity, and a clear price."
            action={
              <Link href="/inventory" className="btn-outline hidden md:inline-flex">
                Open Inventory
              </Link>
            }
          />
          <div className="grid gap-5 md:grid-cols-3">
            {proteinSupply.map((item) => (
              <ProductCard
                key={item.id}
                category={item.category}
                title={item.title}
                quantity={item.quantity}
                price={item.price}
                status={item.status}
                image={item.image}
              />
            ))}
          </div>
        </div>
      </section>

      <FeaturedFarm />

      <section className="py-16 md:py-20">
        <div className="container-premium">
          <SectionHeader
            eyebrow="This morning"
            title="Recent Supply Activity"
            description="What left the farms today — eggs, birds, and meat."
          />
          <div className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
            {supplyActivity.map((item) => (
              <div key={item.label} className="bg-[#fffcf7] px-7 py-8">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sage">
                    {item.label}
                  </p>
                  <span className="text-xs text-muted">{item.when}</span>
                </div>
                <p className="font-display mt-4 text-[1.65rem] font-medium leading-snug text-forest">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-forest py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-straw/30 blur-3xl" />
        </div>
        <div className="container-premium relative">
          <SectionHeader
            light
            eyebrow="How we work"
            title="Built Around Real Farms"
            description="Land you can visit. Supply you can count. Quiet claims, verified holdings."
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {trustPoints.map((point) => (
              <div key={point.title} className="border-t border-white/15 pt-6">
                <h3 className="font-display text-xl font-medium text-white">{point.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

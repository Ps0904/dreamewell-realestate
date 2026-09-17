"use client";

import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { PropertyCard } from "@/components/PropertyCard";
import { ProductCard } from "@/components/ProductCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Modal } from "@/components/Modal";
import {
  marketingProperties,
  productListings,
  campaigns as initialCampaigns,
  enquiries as initialEnquiries,
  type CampaignStatus,
  type EnquiryStatus,
} from "@/data/mock";

const enquiryStatuses: EnquiryStatus[] = ["New", "Contacted", "Qualified", "Closed"];

export default function MarketingPage() {
  const [campaignList, setCampaignList] = useState(initialCampaigns);
  const [enquiryList, setEnquiryList] = useState(initialEnquiries);
  const [campaignOpen, setCampaignOpen] = useState(false);
  const [enquiryQuery, setEnquiryQuery] = useState("");
  const [enquiryFilter, setEnquiryFilter] = useState<"All" | EnquiryStatus>("All");
  const [form, setForm] = useState({
    name: "",
    audience: "",
    product: "",
    status: "Draft" as CampaignStatus,
  });

  const filteredEnquiries = useMemo(() => {
    return enquiryList.filter((e) => {
      const matchesQuery =
        !enquiryQuery ||
        e.customer.toLowerCase().includes(enquiryQuery.toLowerCase()) ||
        e.interest.toLowerCase().includes(enquiryQuery.toLowerCase()) ||
        e.location.toLowerCase().includes(enquiryQuery.toLowerCase());
      const matchesStatus = enquiryFilter === "All" || e.status === enquiryFilter;
      return matchesQuery && matchesStatus;
    });
  }, [enquiryList, enquiryQuery, enquiryFilter]);

  function createCampaign(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return;
    setCampaignList((prev) => [
      {
        id: `c-${Date.now()}`,
        name: form.name,
        audience: form.audience || "General",
        product: form.product || "Farm Supply",
        status: form.status,
        reach: form.status === "Draft" ? "—" : "0",
        enquiries: 0,
      },
      ...prev,
    ]);
    setForm({ name: "", audience: "", product: "", status: "Draft" });
    setCampaignOpen(false);
  }

  function updateEnquiryStatus(id: string, status: EnquiryStatus) {
    setEnquiryList((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
  }

  return (
    <div>
      <div className="relative overflow-hidden bg-forest">
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute right-10 top-0 h-40 w-40 rounded-full bg-straw/40 blur-3xl" />
        </div>
        <div className="container-premium relative flex flex-col gap-2 py-12 md:flex-row md:items-end md:justify-between md:py-16">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-straw">
              Dreamwell Ventures
            </p>
            <h1 className="font-display text-4xl font-medium tracking-tight text-white md:text-5xl">
              Marketing
            </h1>
            <p className="mt-3 max-w-xl text-sm text-white/70 md:text-[15px]">
              Present Tamil Nadu farm properties and local supply to serious buyers.
            </p>
          </div>
        </div>
      </div>

      <div className="container-premium space-y-16 py-12 md:py-16">
        {/* Featured Properties */}
        <section>
          <SectionHeader
            eyebrow="Real Estate"
            title="Featured Properties"
            description="Farm listings with tiled sheds, Chettinad holdings, and Pollachi acreage."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {marketingProperties.map((p) => (
              <PropertyCard key={p.id} {...p} />
            ))}
          </div>
        </section>

        {/* Product Listings */}
        <section>
          <SectionHeader
            eyebrow="Supply"
            title="Product Listings"
            description="Current farm products available for commercial buyers and distributors."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {productListings.map((p) => (
              <ProductCard
                key={p.id}
                title={p.name}
                quantity={`${p.available} ${p.unit}`}
                price={p.price}
                image={p.image}
                unitLabel="Available"
              />
            ))}
          </div>
        </section>

        {/* Campaigns */}
        <section>
          <SectionHeader
            eyebrow="Outreach"
            title="Campaigns"
            description="Track campaigns promoting farm properties and protein supply."
            action={
              <button
                type="button"
                onClick={() => setCampaignOpen(true)}
                className="btn-primary !py-2.5 !text-sm"
              >
                <Plus size={16} />
                Create Campaign
              </button>
            }
          />

          <div className="overflow-hidden rounded-xl border border-border bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="border-b border-border bg-cream/60 text-xs uppercase tracking-wide text-muted">
                  <tr>
                    <th className="px-5 py-3.5 font-semibold">Campaign</th>
                    <th className="px-5 py-3.5 font-semibold">Audience</th>
                    <th className="px-5 py-3.5 font-semibold">Product</th>
                    <th className="px-5 py-3.5 font-semibold">Status</th>
                    <th className="px-5 py-3.5 font-semibold">Reach</th>
                    <th className="px-5 py-3.5 font-semibold">Enquiries</th>
                  </tr>
                </thead>
                <tbody>
                  {campaignList.map((c) => (
                    <tr key={c.id} className="border-b border-border last:border-0 hover:bg-ivory/80">
                      <td className="px-5 py-4 font-medium text-charcoal">{c.name}</td>
                      <td className="px-5 py-4 text-muted">{c.audience}</td>
                      <td className="px-5 py-4 text-muted">{c.product}</td>
                      <td className="px-5 py-4">
                        <StatusBadge status={c.status} />
                      </td>
                      <td className="px-5 py-4 text-muted">{c.reach}</td>
                      <td className="px-5 py-4 font-medium text-forest">{c.enquiries}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Enquiries */}
        <section>
          <SectionHeader
            eyebrow="Leads"
            title="Customer Enquiries"
            description="Manage buyer interest across farm properties and protein supply."
          />

          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                value={enquiryQuery}
                onChange={(e) => setEnquiryQuery(e.target.value)}
                placeholder="Search customers, interest, or location..."
                className="w-full rounded-lg border border-border bg-white py-2.5 pl-9 pr-3 text-sm outline-none ring-forest/20 focus:ring-2"
              />
            </div>
            <select
              value={enquiryFilter}
              onChange={(e) => setEnquiryFilter(e.target.value as "All" | EnquiryStatus)}
              className="rounded-lg border border-border bg-white px-3 py-2.5 text-sm outline-none"
            >
              <option value="All">All statuses</option>
              {enquiryStatuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="overflow-hidden rounded-xl border border-border bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="border-b border-border bg-cream/60 text-xs uppercase tracking-wide text-muted">
                  <tr>
                    <th className="px-5 py-3.5 font-semibold">Customer</th>
                    <th className="px-5 py-3.5 font-semibold">Interest</th>
                    <th className="px-5 py-3.5 font-semibold">Location</th>
                    <th className="px-5 py-3.5 font-semibold">Date</th>
                    <th className="px-5 py-3.5 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEnquiries.map((e) => (
                    <tr key={e.id} className="border-b border-border last:border-0 hover:bg-ivory/80">
                      <td className="px-5 py-4 font-medium text-charcoal">{e.customer}</td>
                      <td className="px-5 py-4 text-muted">{e.interest}</td>
                      <td className="px-5 py-4 text-muted">{e.location}</td>
                      <td className="px-5 py-4 text-muted">{e.date}</td>
                      <td className="px-5 py-4">
                        <select
                          value={e.status}
                          onChange={(ev) =>
                            updateEnquiryStatus(e.id, ev.target.value as EnquiryStatus)
                          }
                          className="rounded-md border border-border bg-white px-2 py-1.5 text-xs font-medium outline-none"
                        >
                          {enquiryStatuses.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                  {filteredEnquiries.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-5 py-10 text-center text-muted">
                        No enquiries match your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>

      <Modal open={campaignOpen} onClose={() => setCampaignOpen(false)} title="Create Campaign">
        <form onSubmit={createCampaign} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
              Campaign Name
            </label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-forest/20"
              placeholder="e.g. Pollachi Investor Week"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
                Audience
              </label>
              <input
                value={form.audience}
                onChange={(e) => setForm((f) => ({ ...f, audience: e.target.value }))}
                className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-forest/20"
                placeholder="Property Investors"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
                Product
              </label>
              <input
                value={form.product}
                onChange={(e) => setForm((f) => ({ ...f, product: e.target.value }))}
                className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-forest/20"
                placeholder="Farm Properties"
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) =>
                setForm((f) => ({ ...f, status: e.target.value as CampaignStatus }))
              }
              className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none"
            >
              <option value="Draft">Draft</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Active">Active</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setCampaignOpen(false)}
              className="rounded-lg px-4 py-2.5 text-sm font-medium text-muted hover:bg-cream"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary !py-2.5 !text-sm">
              Create Campaign
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { Download, Filter, Plus, Search, Eye } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { DetailDrawer } from "@/components/DetailDrawer";
import { Modal } from "@/components/Modal";
import {
  inventoryItems as initialItems,
  inventoryKpis,
  inventoryTypes,
  farms,
  type InventoryCategory,
} from "@/data/mock";
import { InventoryTypeCard } from "@/components/InventoryTypeCard";

const tabs = ["All", "Eggs", "Poultry", "Meat", "Live Birds"] as const;

type InventoryItem = (typeof initialItems)[number];

export default function InventoryPage() {
  const [items, setItems] = useState(initialItems);
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const [query, setQuery] = useState("");
  const [farmFilter, setFarmFilter] = useState("All");
  const [availability, setAvailability] = useState("All");
  const [selected, setSelected] = useState<InventoryItem | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [stockForm, setStockForm] = useState({
    product: "",
    category: "Eggs" as InventoryCategory,
    farm: farms[0],
    available: "",
    unit: "Trays",
  });

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesTab = tab === "All" || item.category === tab;
      const matchesQuery =
        !query ||
        item.product.toLowerCase().includes(query.toLowerCase()) ||
        item.farm.toLowerCase().includes(query.toLowerCase());
      const matchesFarm = farmFilter === "All" || item.farm === farmFilter;
      const matchesAvailability =
        availability === "All" || item.status === availability;
      return matchesTab && matchesQuery && matchesFarm && matchesAvailability;
    });
  }, [items, tab, query, farmFilter, availability]);

  function addStock(e: React.FormEvent) {
    e.preventDefault();
    if (!stockForm.product.trim() || !stockForm.available) return;
    const newItem: InventoryItem = {
      id: `inv-${Date.now()}`,
      product: stockForm.product,
      category: stockForm.category,
      farm: stockForm.farm,
      available: Number(stockForm.available),
      reserved: 0,
      unit: stockForm.unit,
      status: Number(stockForm.available) < 500 ? "Low Stock" : "In Stock",
      lastUpdated: "Just now",
      todayMovement: Number(stockForm.available),
    };
    setItems((prev) => [newItem, ...prev]);
    setStockForm({
      product: "",
      category: "Eggs",
      farm: farms[0],
      available: "",
      unit: "Trays",
    });
    setAddOpen(false);
  }

  return (
    <div>
      <div className="relative overflow-hidden bg-forest">
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute left-8 top-0 h-40 w-40 rounded-full bg-straw/40 blur-3xl" />
        </div>
        <div className="container-premium relative py-12 md:py-16">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-straw">
            Dreamwell Ventures
          </p>
          <h1 className="font-display text-4xl font-medium tracking-tight text-white md:text-5xl">
            Inventory
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/70 md:text-[15px]">
            Track poultry, farm produce, and daily supply categories built for South Indian markets.
          </p>
        </div>
      </div>

      <div className="container-premium py-10 md:py-12">
        <SectionHeader
          eyebrow="Categories"
          title="Inventory Types"
          description="Supply categories rooted in Tamil Nadu farms, kitchens, and local demand."
        />
        <div className="mb-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {inventoryTypes.map((item) => (
            <InventoryTypeCard key={item.id} {...item} />
          ))}
        </div>

        {/* KPIs */}
        <div className="mb-10 grid grid-cols-2 gap-3 md:grid-cols-5">
          {inventoryKpis.map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-sm border border-border bg-[#fffcf7] px-4 py-4 md:px-5"
            >
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
                {kpi.label}
              </p>
              <p className="mt-1.5 font-display text-xl font-medium text-forest md:text-2xl">
                {kpi.value}
              </p>
            </div>
          ))}
        </div>

        <SectionHeader
          eyebrow="Stock"
          title="Farm Inventory"
          description="Operational view of available, reserved, and moving stock."
        />

        {/* Toolbar */}
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1 lg:max-w-md">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search inventory..."
              className="w-full rounded-lg border border-border bg-white py-2.5 pl-9 pr-3 text-sm outline-none ring-forest/20 focus:ring-2"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setShowFilters((v) => !v)}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2.5 text-sm font-medium text-charcoal hover:bg-cream"
            >
              <Filter size={15} />
              Filter
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2.5 text-sm font-medium text-charcoal hover:bg-cream"
            >
              <Download size={15} />
              Export
            </button>
            <button
              type="button"
              onClick={() => setAddOpen(true)}
              className="btn-primary !py-2.5 !text-sm"
            >
              <Plus size={16} />
              Add Stock
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="mb-4 grid gap-3 rounded-xl border border-border bg-white p-4 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
                Farm
              </label>
              <select
                value={farmFilter}
                onChange={(e) => setFarmFilter(e.target.value)}
                className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none"
              >
                <option value="All">All Farms</option>
                {farms.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
                Availability
              </label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none"
              >
                <option value="All">All</option>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
                Date
              </label>
              <select className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none">
                <option>Today</option>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
              </select>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="mb-4 -mx-1 overflow-x-auto px-1">
          <div className="flex min-w-max gap-1 border-b border-border">
            {tabs.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`px-4 py-2.5 text-sm font-medium transition-colors ${
                  tab === t
                    ? "border-b-2 border-forest text-forest"
                    : "text-muted hover:text-forest"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-hidden rounded-xl border border-border bg-white md:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="border-b border-border bg-cream/60 text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-5 py-3.5 font-semibold">Product</th>
                  <th className="px-5 py-3.5 font-semibold">Category</th>
                  <th className="px-5 py-3.5 font-semibold">Farm</th>
                  <th className="px-5 py-3.5 font-semibold">Available</th>
                  <th className="px-5 py-3.5 font-semibold">Reserved</th>
                  <th className="px-5 py-3.5 font-semibold">Unit</th>
                  <th className="px-5 py-3.5 font-semibold">Status</th>
                  <th className="px-5 py-3.5 font-semibold">Last Updated</th>
                  <th className="px-5 py-3.5 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-border last:border-0 hover:bg-ivory/80"
                  >
                    <td className="px-5 py-4 font-medium text-charcoal">{item.product}</td>
                    <td className="px-5 py-4 text-muted">{item.category}</td>
                    <td className="px-5 py-4 text-muted">{item.farm}</td>
                    <td className="px-5 py-4 font-semibold text-forest">
                      {item.available.toLocaleString("en-IN")}
                    </td>
                    <td className="px-5 py-4 text-muted">
                      {item.reserved.toLocaleString("en-IN")}
                    </td>
                    <td className="px-5 py-4 text-muted">{item.unit}</td>
                    <td className="px-5 py-4">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="px-5 py-4 text-muted">{item.lastUpdated}</td>
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => setSelected(item)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest hover:underline"
                      >
                        <Eye size={14} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-5 py-12 text-center text-muted">
                      No inventory items match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile cards */}
        <div className="space-y-3 md:hidden">
          {filtered.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelected(item)}
              className="w-full rounded-xl border border-border bg-white p-4 text-left"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-forest">{item.product}</p>
                  <p className="mt-1 text-xs text-muted">
                    {item.category} · {item.farm}
                  </p>
                </div>
                <StatusBadge status={item.status} />
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 border-t border-border pt-3 text-xs">
                <div>
                  <p className="text-muted">Available</p>
                  <p className="mt-0.5 font-semibold text-charcoal">
                    {item.available.toLocaleString("en-IN")}
                  </p>
                </div>
                <div>
                  <p className="text-muted">Reserved</p>
                  <p className="mt-0.5 font-semibold text-charcoal">
                    {item.reserved.toLocaleString("en-IN")}
                  </p>
                </div>
                <div>
                  <p className="text-muted">Updated</p>
                  <p className="mt-0.5 font-semibold text-charcoal">{item.lastUpdated}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <DetailDrawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.product ?? "Stock Detail"}
      >
        {selected && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <StatusBadge status={selected.status} />
              <span className="text-xs text-muted">{selected.lastUpdated}</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-border p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
                  Current Available
                </p>
                <p className="mt-2 text-2xl font-semibold text-forest">
                  {selected.available.toLocaleString("en-IN")}
                </p>
                <p className="text-xs text-muted">{selected.unit.toLowerCase()}</p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
                  Reserved
                </p>
                <p className="mt-2 text-2xl font-semibold text-charcoal">
                  {selected.reserved.toLocaleString("en-IN")}
                </p>
                <p className="text-xs text-muted">{selected.unit.toLowerCase()}</p>
              </div>
            </div>

            <div className="rounded-lg border border-border p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
                Today&apos;s Movement
              </p>
              <p className="mt-2 text-xl font-semibold text-success">
                +{selected.todayMovement.toLocaleString("en-IN")}
              </p>
            </div>

            <dl className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-border pb-3">
                <dt className="text-muted">Farm</dt>
                <dd className="font-medium text-charcoal">{selected.farm}</dd>
              </div>
              <div className="flex justify-between border-b border-border pb-3">
                <dt className="text-muted">Category</dt>
                <dd className="font-medium text-charcoal">{selected.category}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Unit</dt>
                <dd className="font-medium text-charcoal">{selected.unit}</dd>
              </div>
            </dl>

            {/* Simple movement visualization */}
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
                Stock Movement (7 days)
              </p>
              <div className="flex h-28 items-end gap-1.5">
                {[40, 55, 35, 70, 48, 82, 65].map((h, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t bg-forest/80"
                      style={{ height: `${h}%` }}
                    />
                    <span className="text-[9px] text-muted">
                      {["M", "T", "W", "T", "F", "S", "S"][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </DetailDrawer>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add Stock">
        <form onSubmit={addStock} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
              Product
            </label>
            <input
              required
              value={stockForm.product}
              onChange={(e) => setStockForm((f) => ({ ...f, product: e.target.value }))}
              className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-forest/20"
              placeholder="e.g. Farm Fresh Eggs"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
                Category
              </label>
              <select
                value={stockForm.category}
                onChange={(e) =>
                  setStockForm((f) => ({
                    ...f,
                    category: e.target.value as InventoryCategory,
                  }))
                }
                className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none"
              >
                <option value="Eggs">Eggs</option>
                <option value="Poultry">Poultry</option>
                <option value="Meat">Meat</option>
                <option value="Live Birds">Live Birds</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
                Farm
              </label>
              <select
                value={stockForm.farm}
                onChange={(e) => setStockForm((f) => ({ ...f, farm: e.target.value }))}
                className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none"
              >
                {farms.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
                Available Quantity
              </label>
              <input
                required
                type="number"
                min={1}
                value={stockForm.available}
                onChange={(e) => setStockForm((f) => ({ ...f, available: e.target.value }))}
                className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-forest/20"
                placeholder="8400"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
                Unit
              </label>
              <select
                value={stockForm.unit}
                onChange={(e) => setStockForm((f) => ({ ...f, unit: e.target.value }))}
                className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none"
              >
                <option>Trays</option>
                <option>Birds</option>
                <option>Kg</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setAddOpen(false)}
              className="rounded-lg px-4 py-2.5 text-sm font-medium text-muted hover:bg-cream"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary !py-2.5 !text-sm">
              Add Stock
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

type Metric = { value: string; label: string };

export function MetricStrip({ metrics }: { metrics: Metric[] }) {
  return (
    <section className="bg-ivory">
      <div className="container-premium grid grid-cols-2 md:grid-cols-4">
        {metrics.map((m, i) => (
          <div
            key={m.label}
            className={`px-4 py-9 text-center md:px-6 md:py-12 ${
              i !== 0 ? "md:border-l md:border-border" : ""
            }`}
          >
            <p className="font-display text-[2.15rem] font-medium tracking-tight text-forest md:text-4xl">
              {m.value}
            </p>
            <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.16em] text-sage">
              {m.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

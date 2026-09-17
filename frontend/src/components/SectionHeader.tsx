type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  light?: boolean;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  light,
}: SectionHeaderProps) {
  return (
    <div className="mb-9 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {eyebrow && (
          <p
            className={`mb-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] ${
              light ? "text-straw/80" : "text-sage"
            }`}
          >
            {eyebrow}
          </p>
        )}
        <h2
          className={`font-display text-[2rem] font-medium leading-[1.1] tracking-tight md:text-[2.55rem] ${
            light ? "text-white" : "text-forest"
          }`}
        >
          {title}
        </h2>
        {description && (
          <p
            className={`mt-3 max-w-xl text-sm leading-relaxed md:text-[15px] ${
              light ? "text-white/70" : "text-muted"
            }`}
          >
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

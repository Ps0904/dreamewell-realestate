type StatusBadgeProps = {
  status: string;
  tone?: "success" | "warning" | "neutral" | "danger" | "info";
};

const tones: Record<NonNullable<StatusBadgeProps["tone"]>, string> = {
  success: "bg-success/10 text-success",
  warning: "bg-warning/15 text-warning",
  danger: "bg-danger/10 text-danger",
  neutral: "bg-cream text-muted",
  info: "bg-forest/10 text-forest",
};

export function statusTone(status: string): NonNullable<StatusBadgeProps["tone"]> {
  const s = status.toLowerCase();
  if (["available", "in stock", "active", "new", "qualified"].includes(s)) return "success";
  if (["limited", "low stock", "scheduled", "contacted", "under offer"].includes(s)) return "warning";
  if (["out of stock", "closed", "reserved"].includes(s)) return "danger";
  if (["draft", "completed"].includes(s)) return "neutral";
  return "info";
}

export function StatusBadge({ status, tone }: StatusBadgeProps) {
  const resolved: NonNullable<StatusBadgeProps["tone"]> = tone ?? statusTone(status);
  return (
    <span
      className={`inline-flex items-center rounded px-2 py-0.5 text-[11px] font-semibold tracking-wide uppercase ${tones[resolved]}`}
    >
      {status}
    </span>
  );
}

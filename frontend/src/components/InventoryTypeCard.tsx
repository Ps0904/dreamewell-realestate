import { MediaImage } from "./MediaImage";

type InventoryTypeCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  highlight: string;
  image: string;
};

export function InventoryTypeCard({
  eyebrow,
  title,
  description,
  highlight,
  image,
}: InventoryTypeCardProps) {
  return (
    <article className="card-lift group overflow-hidden border border-border bg-[#fffcf7]">
      <div className="relative aspect-[16/10] overflow-hidden bg-cream">
        <MediaImage
          src={image}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
          {eyebrow}
        </p>
        <h3 className="font-display mt-1.5 text-xl font-medium text-forest">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
        <p className="mt-4 border-t border-border pt-4 text-sm font-semibold text-forest">
          {highlight}
        </p>
      </div>
    </article>
  );
}

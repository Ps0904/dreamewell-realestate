import { MediaImage } from "./MediaImage";
import { StatusBadge } from "./StatusBadge";

type ProductCardProps = {
  category?: string;
  title: string;
  quantity: string;
  price: string;
  status?: string;
  image: string;
  unitLabel?: string;
};

export function ProductCard({
  category,
  title,
  quantity,
  price,
  status,
  image,
  unitLabel,
}: ProductCardProps) {
  return (
    <article className="card-lift group overflow-hidden border border-border bg-[#fffcf7]">
      <div className="relative aspect-[16/10] overflow-hidden">
        <MediaImage
          src={image}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-5">
        {category && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
            {category}
          </p>
        )}
        <div className="mt-1 flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-medium text-forest">{title}</h3>
          {status && <StatusBadge status={status} />}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-muted">
              {unitLabel ?? "Available"}
            </p>
            <p className="mt-1 text-sm font-semibold text-charcoal">{quantity}</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wide text-muted">Price</p>
            <p className="mt-1 text-sm font-semibold text-forest">{price}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

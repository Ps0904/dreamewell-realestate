import { MediaImage } from "./MediaImage";
import { MapPin } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

type PropertyCardProps = {
  name: string;
  acreage: string;
  location: string;
  price?: string;
  status: string;
  image: string;
  enquiries?: number;
  description?: string;
  ctaLabel?: string;
};

export function PropertyCard({
  name,
  acreage,
  location,
  price,
  status,
  image,
  enquiries,
  description,
  ctaLabel = "View Listing",
}: PropertyCardProps) {
  return (
    <article className="card-lift group overflow-hidden border border-border bg-[#fffcf7]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <MediaImage
          src={image}
          alt={name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute left-3 top-3">
          <StatusBadge status={status} />
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl font-medium text-forest">{name}</h3>
            <p className="mt-1 text-sm font-medium text-charcoal">{acreage}</p>
          </div>
          {price && <p className="shrink-0 text-sm font-semibold text-forest">{price}</p>}
        </div>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
          <MapPin size={14} className="shrink-0" />
          {location}
        </p>
        {description && <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>}
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          {typeof enquiries === "number" ? (
            <span className="text-xs text-muted">{enquiries} enquiries</span>
          ) : (
            <span />
          )}
          <button type="button" className="btn-outline !py-1.5 !px-3 !text-xs">
            {ctaLabel}
          </button>
        </div>
      </div>
    </article>
  );
}

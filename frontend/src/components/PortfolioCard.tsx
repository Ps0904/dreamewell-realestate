import { MediaImage } from "./MediaImage";
import Link from "next/link";
import { MapPin } from "lucide-react";

type PortfolioCardProps = {
  title: string;
  description: string;
  location: string;
  status: string;
  image: string;
  featured?: boolean;
};

export function PortfolioCard({
  title,
  description,
  location,
  status,
  image,
  featured,
}: PortfolioCardProps) {
  return (
    <article
      className={`card-lift group relative overflow-hidden bg-forest-deep ${
        featured ? "min-h-[360px] md:min-h-[440px]" : "min-h-[280px]"
      }`}
    >
      <MediaImage
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/25 to-transparent" />
      <div className="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-forest">
        {status}
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
        <p className="flex items-center gap-1.5 text-[11px] text-white/70">
          <MapPin size={12} />
          {location}
        </p>
        <h3 className="font-display mt-1.5 text-2xl font-medium text-white">{title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/75">{description}</p>
        <Link
          href="/marketing"
          className="mt-4 inline-flex text-xs font-semibold uppercase tracking-[0.14em] text-straw hover:text-white"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}

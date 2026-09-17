type MediaImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

function withBasePath(src: string) {
  if (!src || src.startsWith("http://") || src.startsWith("https://") || src.startsWith("data:")) {
    return src;
  }
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return src.startsWith("/") ? `${base}${src}` : src;
}

export function MediaImage({ src, alt, className, priority }: MediaImageProps) {
  return (
    // Native img so local photos load without Next image proxy
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={withBasePath(src)}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );
}

import type { SiteImage } from "@/content/images";

export function ResponsiveImage({
  image,
  sizes,
  className,
  alt = image.alt,
  priority = false,
}: {
  image: SiteImage;
  sizes: string;
  className?: string;
  alt?: string;
  priority?: boolean;
}) {
  return (
    // The static export supplies its own real srcset because Next's optimizer is disabled.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src={image.src}
      srcSet={`${image.mobileSrc} ${image.mobileWidth}w, ${image.src} ${image.width}w`}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
    />
  );
}

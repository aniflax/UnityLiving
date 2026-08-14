export function GalleryMarquee({
  images,
}: {
  images: { src: string; alt: string }[];
}) {
  const doubled = [...images, ...images];
  return (
    <div className="group relative overflow-hidden py-2" aria-label="Interiors gallery">
      <div className="animate-marquee flex w-max gap-4 group-hover:[animation-play-state:paused]">
        {doubled.map((image, i) => (
          <figure key={`${image.alt}-${i}`} className="w-[280px] shrink-0 md:w-[380px]">
            <img
              src={image.src}
              alt={image.alt}
              width={1200}
              height={900}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover"
            />
          </figure>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}

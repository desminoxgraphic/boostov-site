import { preload } from "react-dom";
import { IMAGES, type ImageName } from "@/lib/images.generated";

type PhotoProps = {
  name: ImageName;
  alt: string;
  /** CSS sizes attribute: how wide the image renders, so the browser picks the right file. */
  sizes: string;
  /** LCP image: preloaded, eager, high priority. */
  priority?: boolean;
  className?: string;
};

const srcset = (name: ImageName, ext: "avif" | "webp") => IMAGES[name].widths.map((w) => `/products/${name}-${w}.${ext} ${w}w`).join(", ");

/**
 * Responsive product photo: AVIF with WebP fallback, exact sizes, blur placeholder,
 * intrinsic width/height so the layout never shifts. Images come from scripts/build-images.py.
 */
export function Photo({ name, alt, sizes, priority, className }: PhotoProps) {
  const img = IMAGES[name];
  const fallback = `/products/${name}-${img.widths.find((w) => w >= 640) ?? img.width}.webp`;
  if (priority) preload(fallback, { as: "image", imageSrcSet: srcset(name, "avif"), imageSizes: sizes, fetchPriority: "high", type: "image/avif" });
  return <picture className={className}>
    <source type="image/avif" srcSet={srcset(name, "avif")} sizes={sizes} />
    <source type="image/webp" srcSet={srcset(name, "webp")} sizes={sizes} />
    <img
      src={fallback}
      alt={alt}
      width={img.width}
      height={img.height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding={priority ? "sync" : "async"}
      // Transparent cutouts get no blur, it would stay visible around them.
      style={img.alpha ? undefined : { backgroundImage: `url(${img.blur})`, backgroundSize: "cover" }}
    />
  </picture>;
}

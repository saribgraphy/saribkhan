import { readFileSync } from "node:fs";
import { join } from "node:path";
import { imageSize } from "image-size";
import Image from "next/image";
import { Copy } from "@/components/ui/copy";
import { Protected } from "./protected";

export type StackImage = { image: string; label?: string; alt?: string };

/** Reads each image's real size once (cached at build) so nothing jumps as it loads. */
async function withSizes(items: readonly StackImage[]) {
  "use cache";
  return items.map((item) => {
    try {
      const { width, height } = imageSize(readFileSync(join(process.cwd(), "public", decodeURI(item.image))));
      if (width && height) return { ...item, width, height };
    } catch {}
    return { ...item, width: 1600, height: 1000 };
  });
}

/**
 * Images one after another at the column's width and their own height, each
 * with an optional caption. Used for the Work archive and case file
 * showcases. Right-click, dragging and long-press saving are blocked.
 *
 * With columns={2} the images flow into two masonry columns instead, each
 * keeping its own height, so a long archive stays a short scroll.
 */
export async function ImageStack({
  items,
  sizes = "(max-width: 768px) 100vw, 592px",
  bleed = true,
  columns = 1,
  altFallback = "",
}: {
  items: readonly StackImage[];
  sizes?: string;
  /** Let the frame run slightly past the text column (off inside panels). */
  bleed?: boolean;
  columns?: 1 | 2;
  /** Alt text for images that have neither alt text nor a caption. */
  altFallback?: string;
}) {
  if (!items.length) return null;
  const sized = await withSizes(items);

  return (
    <ul className={columns === 2 ? `columns-2 gap-3 max-sm:gap-2 ${bleed ? "-mx-4 max-md:mx-0" : ""}` : "grid gap-10"}>
      {sized.map(({ width, height, ...item }, i) => (
        <li key={`${item.image}-${i}`} className={columns === 2 ? "mb-3 break-inside-avoid max-sm:mb-2" : undefined}>
          <figure className="grid gap-3">
            <Protected className={`frame !p-1.5 max-md:!p-1 ${bleed && columns === 1 ? "-mx-4 max-md:mx-0" : ""}`}>
              <Image
                src={item.image}
                alt={item.alt || item.label || altFallback}
                width={width}
                height={height}
                sizes={sizes}
                draggable={false}
                className="pointer-events-none h-auto w-full rounded-[4px] ring-[0.5px] ring-black/10 select-none max-md:rounded-[6px]"
              />
            </Protected>
            {item.label ? (
              <figcaption className="t-ui font-normal text-muted">
                <Copy>{item.label}</Copy>
              </figcaption>
            ) : null}
          </figure>
        </li>
      ))}
    </ul>
  );
}

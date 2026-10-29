import { readFileSync } from "node:fs";
import { join } from "node:path";
import { imageSize } from "image-size";
import Image from "next/image";
import { Copy } from "@/components/ui/copy";
import { Protected } from "./protected";

export type StackImage = { image: string; label?: string };

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
 */
export async function ImageStack({
  items,
  sizes = "(max-width: 768px) 100vw, 592px",
  bleed = true,
}: {
  items: readonly StackImage[];
  sizes?: string;
  /** Let the frame run slightly past the text column (off inside panels). */
  bleed?: boolean;
}) {
  if (!items.length) return null;
  const sized = await withSizes(items);

  return (
    <ul className="grid gap-10">
      {sized.map(({ width, height, ...item }, i) => (
        <li key={`${item.image}-${i}`}>
          <figure className="grid gap-3">
            <Protected className={`frame !p-1.5 max-md:!p-1 ${bleed ? "-mx-4 max-md:mx-0" : ""}`}>
              <Image
                src={item.image}
                alt={item.label || "Work sample"}
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

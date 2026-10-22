import { readFileSync } from "node:fs";
import { join } from "node:path";
import { imageSize } from "image-size";
import Image from "next/image";
import { gallery, workLabels } from "@/content/projects";
import { Copy } from "@/components/ui/copy";
import { SectionLabel } from "@/components/ui/view";
import { Protected } from "./protected";

/** Reads each image's real size once (cached at build) so nothing jumps as it loads. */
async function withSizes(items: typeof gallery) {
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
 * The archive under the Work note: images at the column's width and their own
 * height, one after another, to browse while scrolling. Added in the CMS.
 */
export async function WorkGallery() {
  if (!gallery.length) return null;
  const items = await withSizes(gallery);

  return (
    <section className="mt-16">
      <SectionLabel>{workLabels.gallery}</SectionLabel>
      <ul className="grid gap-10">
        {items.map(({ width, height, ...item }, i) => {
          return (
            <li key={`${item.image}-${i}`}>
              <figure className="grid gap-3">
                <Protected className="frame -mx-4 !p-1.5 max-md:mx-0 max-md:!p-1">
                  <Image
                    src={item.image}
                    alt={item.label || "Work sample"}
                    width={width}
                    height={height}
                    sizes="(max-width: 768px) 100vw, 592px"
                    draggable={false}
                    className="pointer-events-none h-auto w-full rounded-[4px] ring-[0.5px] max-md:rounded-[6px] ring-black/10 select-none"
                  />
                </Protected>
                {item.label ? (
                  <figcaption className="t-ui font-normal text-muted">
                    <Copy>{item.label}</Copy>
                  </figcaption>
                ) : null}
              </figure>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

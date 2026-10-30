import { gallery, workLabels } from "@/content/projects";
import { SectionLabel } from "@/components/ui/view";
import { ImageStack } from "./image-stack";

/**
 * The archive under the Work note: a two-column masonry of the strongest
 * pieces, each at its own height. Added in the CMS.
 */
export function WorkGallery() {
  if (!gallery.length) return null;

  return (
    <section className="mt-16">
      <SectionLabel>{workLabels.gallery}</SectionLabel>
      <ImageStack items={gallery} columns={2} sizes="(max-width: 768px) 50vw, 310px" altFallback="Design work by Sarib Khan" />
    </section>
  );
}

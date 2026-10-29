import { gallery, workLabels } from "@/content/projects";
import { SectionLabel } from "@/components/ui/view";
import { ImageStack } from "./image-stack";

/**
 * The archive under the Work note: images at the column's width and their own
 * height, one after another, to browse while scrolling. Added in the CMS.
 */
export function WorkGallery() {
  if (!gallery.length) return null;

  return (
    <section className="mt-16">
      <SectionLabel>{workLabels.gallery}</SectionLabel>
      <ImageStack items={gallery} />
    </section>
  );
}

import { splitPlaceholders } from "@/lib/utils";

/**
 * Renders brief copy verbatim. Any [bracketed] part is shown as a visible
 * placeholder (dotted underline, muted) so unfilled items can't hide.
 */
export function Copy({ children }: { children?: string | null }) {
  if (!children) return null;
  return (
    <>
      {splitPlaceholders(children).map((part, i) =>
        part.startsWith("[") && part.endsWith("]") ? (
          <span key={i} className="ph">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

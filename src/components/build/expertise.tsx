import { Copy } from "@/components/ui/copy";
import { expertise } from "@/content/touchpoints";
import { Lottie } from "./lottie";

/**
 * Areas of expertise, with the animated illustrations recovered from the old
 * Framer site. They're drawn on a near-black canvas, so the section matches
 * it. On wide screens each illustration sits beside its text at a fixed
 * width rather than spanning the column, so it never gets oversized.
 */
export function Expertise() {
  if (!expertise.length) return null;

  return (
    <div className="-mx-4 overflow-hidden rounded-[14px] bg-[#080808] shadow-[0_0.5px_3px_#21222333,0_8px_24px_-8px_#21222340] ring-[0.5px] ring-white/10 max-md:mx-0">
      <ul className="divide-y divide-white/[0.08]">
        {expertise.map((item) => (
          <li key={item.title} className="flex items-center gap-6 p-4 max-sm:flex-col max-sm:items-stretch max-sm:gap-1 max-sm:p-3">
            <Lottie
              src={`/lottie/${item.animation}.json`}
              label={`${item.title}, animated illustration`}
              className="w-[260px] shrink-0 max-sm:w-full"
            />
            <div className="grid gap-1.5 pr-2 max-sm:px-2 max-sm:pb-3">
              <h3 className="text-[15px] leading-6 font-medium tracking-[-0.015em] text-white">{item.title}</h3>
              <p className="t-ui font-normal text-white/60">
                <Copy>{item.body}</Copy>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

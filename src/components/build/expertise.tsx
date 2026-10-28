import { Copy } from "@/components/ui/copy";
import { expertise } from "@/content/home";
import { Lottie } from "./lottie";

/**
 * Areas of expertise, with the animated illustrations recovered from the old
 * Framer site, recoloured for the light theme (purple accent kept). Each one
 * sits in a soft tile at a fixed width beside its text on wide screens, so it
 * never gets oversized; on phones it stacks above the text.
 */
export function Expertise() {
  if (!expertise.length) return null;

  return (
    <ul className="card -mx-4 divide-y divide-line !bg-white max-md:mx-0">
      {expertise.map((item) => (
        <li key={item.title} className="flex items-center gap-6 p-3 max-sm:flex-col max-sm:items-stretch max-sm:gap-3">
          <div className="w-[240px] shrink-0 overflow-hidden rounded-[7px] bg-[#F6F6F4] ring-[0.5px] ring-black/[0.06] max-sm:w-full">
            <Lottie src={`/lottie/light/${item.animation}.json`} label={`${item.title}, animated illustration`} className="w-full" />
          </div>
          <div className="grid gap-1.5 pr-3 max-sm:px-1 max-sm:pb-2">
            <h3 className="text-[15px] leading-6 font-medium tracking-[-0.015em] text-ink">{item.title}</h3>
            <p className="t-ui font-normal text-body">
              <Copy>{item.body}</Copy>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

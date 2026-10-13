import {
  BookOpen,
  Browsers,
  Code,
  ListChecks,
  Palette,
  PenNib,
  Sparkle,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import { capabilities } from "@/content/touchpoints";

const icons = {
  browsers: Browsers,
  list: ListChecks,
  code: Code,
  palette: Palette,
  users: UsersThree,
  book: BookOpen,
  pen: PenNib,
  sparkle: Sparkle,
};

export function Capabilities() {
  return (
    <ul className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
      {capabilities.map((c) => {
        const Icon = icons[c.icon];
        return (
          <li key={c.title} className="flex gap-3.5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white text-ink shadow-card" aria-hidden>
              <Icon size={15} />
            </span>
            <span className="grid gap-1">
              <span className="t-ui font-medium text-ink">{c.title}</span>
              <span className="t-ui font-normal text-body">{c.body}</span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

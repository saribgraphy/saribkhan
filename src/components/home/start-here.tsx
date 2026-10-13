import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { startHere } from "@/content/home";

export function StartHere() {
  return (
    <ul className="grid gap-3 sm:grid-cols-3">
      {startHere.map((card) => (
        <li key={card.href}>
          <Link
            href={card.href}
            className="card group flex h-full flex-col justify-between gap-6 px-4 pt-3.5 pb-4 hover:bg-white"
          >
            <span className="grid gap-1">
              <span className="t-ui font-medium text-ink">{card.title}</span>
              <span className="t-ui font-normal text-muted">{card.body}</span>
            </span>
            <ArrowRight
              size={14}
              className="text-faint transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:text-ink"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

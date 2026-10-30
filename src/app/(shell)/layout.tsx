import "../globals.css";
import { Suspense } from "react";
import { CommandMenu } from "@/components/shell/command-menu";
import { Interaction } from "@/components/shell/interaction";
import { MobileNav } from "@/components/shell/mobile-nav";
import { PanelProvider } from "@/components/shell/panel-context";
import { PanelHost } from "@/components/shell/panel-host";
import { RightRail } from "@/components/shell/right-rail";
import { Sidebar } from "@/components/shell/sidebar";

/**
 * The app shell: fixed rails, dashed grid rules, a narrow reading column,
 * and hosts for the right-side panels and the command menu.
 */
export default function ShellLayout({ children }: LayoutProps<"/">) {
  return (
    <PanelProvider>
      <div className="relative min-h-dvh overflow-x-clip bg-paper">
        <GridRules />
        <Sidebar />
        <MobileNav />

        <main className="relative mx-auto flex min-h-dvh max-w-[var(--container)] justify-center">
          <RightRail />
          <div className="view-host relative z-[1] w-full max-w-[var(--column)] px-5 pt-[104px] pb-24 md:px-0 min-[1200px]:pt-[120px]">
            {children}
          </div>
        </main>

        <div className="bottom-mask" aria-hidden />
      </div>

      <Suspense fallback={null}>
        <PanelHost />
      </Suspense>
      <CommandMenu />
      <Interaction />
    </PanelProvider>
  );
}

function GridRules() {
  return (
    <div aria-hidden>
      <span className="edge-strip left-0" />
      <span className="edge-strip right-0 -scale-x-100" />
      <span className="grid-rule hidden left-[calc(50%-var(--container)/2)] min-[1200px]:block" />
      <span className="grid-rule hidden left-[calc(50%-var(--column)/2-1px)] md:block" />
      <span className="grid-rule hidden left-[calc(50%+var(--column)/2)] md:block" />
      <span className="grid-rule hidden left-[calc(50%+var(--container)/2)] min-[1200px]:block" />
    </div>
  );
}

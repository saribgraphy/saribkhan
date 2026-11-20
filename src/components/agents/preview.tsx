"use client";

import { DesktopTower, DeviceMobile, Eye, X } from "@phosphor-icons/react";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { PROJECTS, type Project } from "./content";
import { track } from "./track";

const Ctx = createContext<(slug: string) => void>(() => {});
export const usePreview = () => useContext(Ctx);

/**
 * The eye-button preview: a full-screen overlay with the client's live site
 * inside, so visitors look around the work without leaving the page. The site
 * comes through /api/preview as a cleaned, script-free copy, in an iframe
 * sandboxed with no scripts, popups, navigation or forms.
 */
export function PreviewProvider({ children }: { children: React.ReactNode }) {
  const [project, setProject] = useState<Project | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [mobile, setMobile] = useState(false);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);

  // Show the site as soon as its content is parsed. Waiting for the full load
  // event can take 20s+ on image-heavy sites (every listing photo).
  useEffect(() => {
    if (!project || loaded) return;
    const id = window.setInterval(() => {
      const state = frame.current?.contentDocument?.readyState;
      if (state === "interactive" || state === "complete") {
        const body = frame.current?.contentDocument?.body;
        if (body && body.childElementCount > 0) setLoaded(true);
      }
    }, 150);
    return () => clearInterval(id);
  }, [project, loaded]);

  const close = useCallback((fromHistory = false) => {
    setProject(null);
    document.documentElement.style.removeProperty("overflow");
    if (!fromHistory && history.state?.agPreview) history.back();
  }, []);

  const open = useCallback((slug: string) => {
    const p = PROJECTS.find((x) => x.slug === slug);
    if (!p) return;
    track("preview_open", { slug });
    setLoaded(false);
    setProject(p);
    document.documentElement.style.overflow = "hidden";
    history.pushState({ agPreview: true }, "");
    requestAnimationFrame(() => closeBtn.current?.focus());
  }, []);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const onPop = () => close(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("popstate", onPop);
    };
  }, [project, close]);

  return (
    <Ctx.Provider value={open}>
      {children}
      {project ? (
        <div
          className="ag-preview"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.name} preview`}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="ag-preview-panel">
            <div className="ag-overlay-bar">
              <span className="truncate text-[15px] font-medium text-ink">{project.name}</span>
              <span className="flex items-center gap-1">
                <span className="ag-seg" role="group" aria-label="Preview width">
                  <button type="button" aria-pressed={!mobile} onClick={() => setMobile(false)} aria-label="Desktop width">
                    <DesktopTower size={15} />
                  </button>
                  <button type="button" aria-pressed={mobile} onClick={() => setMobile(true)} aria-label="Mobile width">
                    <DeviceMobile size={15} />
                  </button>
                </span>
                <button ref={closeBtn} type="button" onClick={() => close()} aria-label="Close preview" className="ag-icon-btn">
                  <X size={17} />
                </button>
              </span>
            </div>
            <div className="ag-preview-stage">
              {!loaded ? <div className="ag-cal-skeleton" aria-hidden /> : null}
              <iframe
                ref={frame}
                key={project.slug}
                title={`${project.name} preview`}
                src={`/api/preview/${project.slug}`}
                className={cn("ag-preview-frame", mobile && "ag-preview-frame-mobile", !loaded && "opacity-0")}
                sandbox="allow-same-origin"
                referrerPolicy="no-referrer"
                onLoad={() => setLoaded(true)}
              />
            </div>
          </div>
        </div>
      ) : null}
    </Ctx.Provider>
  );
}

/** The eye button on a work card. */
export function EyeButton({ slug }: { slug: string }) {
  const open = usePreview();
  return (
    <button type="button" className="ag-eye" onClick={() => open(slug)} aria-label="Look around this site">
      <Eye size={18} weight="bold" />
      <span>Look around</span>
    </button>
  );
}

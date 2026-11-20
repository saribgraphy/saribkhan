"use client";

import { DesktopTower, DeviceMobile, Eye, X } from "@phosphor-icons/react";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { DEMO_HOSTS, PROJECTS, type Project } from "./content";
import { track } from "./track";

/** A project can be previewed if it has a page URL, or a live demo on one of Sarib's own domains. */
function previewable(p: Project | undefined): p is Project & { preview: NonNullable<Project["preview"]> } {
  if (!p?.preview) return false;
  if (p.preview.kind === "page") return true;
  try {
    return DEMO_HOSTS.includes(new URL(p.preview.url).hostname);
  } catch {
    return false;
  }
}

const Ctx = createContext<(slug: string) => void>(() => {});
export const usePreview = () => useContext(Ctx);

/**
 * The eye-button preview: a full-screen overlay with the project inside, so
 * visitors look around the work without leaving the page. Public pages come
 * through /api/preview as a cleaned, script-free copy (sandboxed with no
 * scripts, popups, navigation or forms). Live demos on Sarib's own domains
 * keep their scripts but still can't open popups or navigate the page.
 */
export function PreviewProvider({ children }: { children: React.ReactNode }) {
  const [project, setProject] = useState<Project | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [mobile, setMobile] = useState(false);
  const closeBtn = useRef<HTMLButtonElement>(null);

  const close = useCallback((fromHistory = false) => {
    setProject(null);
    document.documentElement.style.removeProperty("overflow");
    if (!fromHistory && history.state?.agPreview) history.back();
  }, []);

  const open = useCallback((slug: string) => {
    const p = PROJECTS.find((x) => x.slug === slug);
    if (!previewable(p)) return;
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

  const src = project?.preview
    ? project.preview.kind === "page"
      ? `/api/preview/${project.slug}`
      : project.preview.url
    : undefined;

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
              <span className="t-ui truncate font-medium text-ink">{project.name}</span>
              <span className="flex items-center gap-1">
                <span className="ag-seg" role="group" aria-label="Preview width">
                  <button type="button" aria-pressed={!mobile} onClick={() => setMobile(false)} aria-label="Desktop width">
                    <DesktopTower size={14} />
                  </button>
                  <button type="button" aria-pressed={mobile} onClick={() => setMobile(true)} aria-label="Mobile width">
                    <DeviceMobile size={14} />
                  </button>
                </span>
                <button ref={closeBtn} type="button" onClick={() => close()} aria-label="Close preview" className="ag-icon-btn">
                  <X size={16} />
                </button>
              </span>
            </div>
            <div className="ag-preview-stage">
              {!loaded ? <div className="ag-cal-skeleton" aria-hidden /> : null}
              <iframe
                key={project.slug}
                title={`${project.name} preview`}
                src={src}
                className={cn("ag-preview-frame", mobile && "ag-preview-frame-mobile", !loaded && "opacity-0")}
                sandbox={project.preview?.kind === "demo" ? "allow-scripts allow-same-origin" : "allow-same-origin"}
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

/** The eye button on a card or a mockup. Disabled, with a placeholder, until the project has a preview link. */
export function EyeButton({ slug, label = "See it work" }: { slug: string; label?: string }) {
  const open = usePreview();
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!previewable(p)) {
    return (
      <span className="t-label inline-flex items-center gap-1.5">
        <Eye size={14} /> <span className="ph">[{p?.name ?? slug} preview link]</span>
      </span>
    );
  }
  return (
    <button type="button" className="btn btn-outline btn-sm" onClick={() => open(slug)}>
      <Eye size={14} />
      {label}
    </button>
  );
}

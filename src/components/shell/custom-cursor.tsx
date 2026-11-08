"use client";

import { useEffect, useRef } from "react";

/** What turns the arrow into the pointing hand. */
const CLICKABLE = 'a[href], button:not(:disabled), [role="button"], [role="radio"], [role="tab"], [role="option"], summary, label[for], select';
/** Fields keep the system text cursor, so the caret position stays obvious. */
const TYPING = 'input:not([type="checkbox"]):not([type="radio"]):not([type="button"]):not([type="submit"]), textarea, [contenteditable="true"]';

/**
 * The custom cursor from the old Framer site: a white arrow with a black
 * outline, and a pointing hand over anything clickable. Only on devices with a
 * mouse or trackpad; touch screens and text fields keep the system cursor.
 * Each shape is drawn so its tip sits exactly on the pointer.
 */
export function CustomCursor() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!el || !fine.matches) return;

    const html = document.documentElement;
    let shown = false;
    let shape = "";

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      const target = e.target as Element | null;
      const next = target?.closest(TYPING) ? "none" : target?.closest(CLICKABLE) ? "hand" : "arrow";
      if (next !== shape) {
        shape = next;
        el.dataset.shape = next;
      }
      if (!shown) {
        shown = true;
        el.dataset.shown = "";
      }
    };
    const onLeave = (e: MouseEvent) => {
      if (e.relatedTarget) return;
      shown = false;
      delete el.dataset.shown;
    };

    html.classList.add("custom-cursor");
    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerdown", onMove, { passive: true });
    document.addEventListener("mouseout", onLeave);
    return () => {
      html.classList.remove("custom-cursor");
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerdown", onMove);
      document.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <div ref={root} className="cursor" aria-hidden>
      {/* Arrow: tip at (1, 1) of a 19×21 box, drawn at 35×38. */}
      <svg className="cursor-arrow" width="35" height="38" viewBox="0 0 19 21" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.98586 1.73978C1.61463 1.55198 1.19057 1.87332 1.27066 2.28112L4.54819 18.9714C4.63951 19.4364 5.26686 19.5251 5.48363 19.1035L8.57389 13.0953C8.75708 12.7396 9.01868 12.4296 9.33859 12.1893C9.65849 11.949 10.0286 11.7843 10.4213 11.7075L17.1442 10.3873C17.6128 10.2953 17.6967 9.66353 17.2737 9.45059L1.98586 1.73978Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.43717 0.847544C1.32264 0.28374 0.0488247 1.24929 0.289307 2.4739L3.56684 19.1641C3.84085 20.5595 5.72245 20.8259 6.37288 19.5609L9.46307 13.5528C9.57713 13.3313 9.73986 13.1386 9.93904 12.989C10.1382 12.8394 10.3687 12.7368 10.6132 12.689L17.3368 11.3687C18.738 11.0935 18.999 9.19971 17.7233 8.55749L2.43717 0.847544ZM1.98577 1.73998C1.61454 1.55219 1.19049 1.87353 1.27057 2.28133L4.5481 18.9716C4.63942 19.4366 5.26677 19.5253 5.48354 19.1037L8.5738 13.0955C8.75699 12.7399 9.01859 12.4298 9.3385 12.1895C9.6584 11.9492 10.0286 11.7845 10.4212 11.7077L17.1441 10.3875C17.6127 10.2955 17.6966 9.66374 17.2736 9.4508L1.98577 1.73998Z"
          fill="black"
        />
      </svg>
      {/* Pointing hand: fingertip near (6.4, 0.7) of a 22×22 box, drawn at 39×40. */}
      <svg className="cursor-hand" width="39" height="40" viewBox="0 0 22 22" fill="none">
        <path
          d="M4.65481 16.9398C4.24981 16.3998 3.84481 15.4548 3.03481 14.2398C2.62981 13.5648 1.41481 12.2148 1.00981 11.6748C0.739808 11.1348 0.739808 10.8648 0.874808 10.3248C1.00981 9.51484 1.81981 8.83984 2.76481 8.83984C3.43981 8.83984 4.11481 9.37985 4.65481 9.78485C4.92481 10.0548 5.32981 10.5948 5.59981 10.8648C5.86981 11.1348 5.86981 11.2698 6.13981 11.5398C6.40981 11.9448 6.54481 12.2148 6.40981 11.6748C6.27481 10.9998 6.13981 9.91984 5.86981 8.83984C5.73481 8.02984 5.59981 7.89485 5.46481 7.35485C5.32981 6.67985 5.19481 6.27484 5.05981 5.59984C4.92481 5.19484 4.78981 4.11484 4.65481 3.57484C4.51981 2.89984 4.51981 1.68484 5.05981 1.14484C5.46481 0.739845 6.27481 0.604845 6.81481 0.874845C7.48981 1.27985 7.89481 2.22485 8.02981 2.62985C8.29981 3.30485 8.56981 4.24984 8.70481 5.32984C8.97481 6.67984 9.37981 8.70485 9.37981 9.10985C9.37981 8.56985 9.24481 7.62485 9.37981 7.08485C9.51481 6.67985 9.78481 6.13984 10.3248 6.00484C10.7298 5.86984 11.1348 5.86984 11.5398 5.86984C11.9448 6.00484 12.3498 6.27484 12.6198 6.54484C13.1598 7.35484 13.1598 9.10984 13.1598 8.97484C13.2948 8.43484 13.2948 7.35484 13.5648 6.81484C13.6998 6.54484 14.2398 6.27484 14.5098 6.13984C14.9148 6.00484 15.4548 6.00484 15.8598 6.13984C16.1298 6.13984 16.6698 6.54484 16.8048 6.81484C17.0748 7.21984 17.2098 8.56985 17.3448 9.10985C17.3448 9.24485 17.4798 8.56984 17.7498 8.16484C18.2898 7.35484 20.1798 7.08484 20.3148 8.97484C20.3148 9.91984 20.3148 9.78485 20.3148 10.4598C20.3148 11.1348 20.3148 11.5398 20.3148 12.0798C20.3148 12.6198 20.1798 13.8348 20.0448 14.3748C19.9098 14.7798 19.5048 15.7248 19.0998 16.2648C19.0998 16.2648 17.6148 17.8848 17.4798 18.6948C17.3448 19.5048 17.3448 19.5048 17.3448 20.0448C17.3448 20.5848 17.4798 21.2598 17.4798 21.2598C17.4798 21.2598 16.3998 21.3948 15.8598 21.2598C15.3198 21.1248 14.6448 20.1798 14.5098 19.7748C14.2398 19.3698 13.8348 19.3698 13.5648 19.7748C13.2948 20.3148 12.6198 21.2598 12.0798 21.2598C11.1348 21.3948 9.24481 21.2598 7.89481 21.2598C7.89481 21.2598 8.16481 19.9098 7.62481 19.3698C7.21981 18.9648 6.54481 18.2898 6.13981 17.8848L4.65481 16.9398Z"
          fill="white"
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M15.8599 17.3449V12.7549" stroke="black" strokeWidth="0.99" strokeLinecap="round" />
        <path d="M13.1599 17.3449L13.0249 12.7549" stroke="black" strokeWidth="0.99" strokeLinecap="round" />
        <path d="M10.46 12.7549V17.3449" stroke="black" strokeWidth="0.99" strokeLinecap="round" />
      </svg>
    </div>
  );
}

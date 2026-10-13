"use client";

import { Dialog } from "@base-ui/react/dialog";
import { X } from "@phosphor-icons/react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClosed?: () => void;
  label: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

/** Right-side panel. Always mounted, visibility driven by `open` (Kumo rule). */
export function SidePanel({ open, onOpenChange, onClosed, label, title, description, children, footer }: Props) {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => onOpenChange(next)}
      onOpenChangeComplete={(next) => {
        if (!next) onClosed?.();
      }}
    >
      <Dialog.Portal>
        <Dialog.Backdrop className="panel-backdrop" />
        <Dialog.Popup className="panel" aria-label={typeof title === "string" ? title : label}>
          <div className="flex h-14 shrink-0 items-center justify-between border-b border-line px-6">
            <span className="t-mono text-muted">{label}</span>
            <Dialog.Close
              className="-mr-2 flex size-8 items-center justify-center rounded-md text-muted hover:bg-tint hover:text-ink"
              aria-label="Close panel"
            >
              <X size={16} weight="regular" />
            </Dialog.Close>
          </div>
          <div className="flex-1 overflow-y-auto overscroll-contain px-6 pt-8 pb-10">
            {title ? (
              <div className="mb-8 grid gap-2">
                <Dialog.Title className="text-[24px] leading-[30px] font-semibold tracking-[-0.015em] text-ink">
                  {title}
                </Dialog.Title>
                {description ? (
                  <Dialog.Description className="t-body">{description}</Dialog.Description>
                ) : null}
              </div>
            ) : null}
            {children}
          </div>
          {footer ? <div className="shrink-0 border-t border-line px-6 py-4">{footer}</div> : null}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

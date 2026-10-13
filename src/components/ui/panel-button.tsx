"use client";

import { usePanels, type PanelName } from "@/components/shell/panel-context";

type Props = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> & { panel: PanelName };

/** Any button that opens one of the form panels. */
export function PanelButton({ panel, type = "button", ...props }: Props) {
  const { open } = usePanels();
  return <button type={type} {...props} onClick={() => open(panel)} />;
}

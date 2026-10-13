"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

const money = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

function NumberField({
  label,
  value,
  onChange,
  prefix,
  suffix,
  step = 1,
  min = 0,
  max,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
  min?: number;
  max?: number;
}) {
  const id = useId();
  return (
    <label htmlFor={id} className="grid gap-1.5">
      <span className="t-label">{label}</span>
      <span className="flex h-10 items-center gap-1 rounded-lg bg-white px-3 shadow-card focus-within:shadow-[0_0_0_1.5px_var(--ink)]">
        {prefix ? <span className="t-mono text-muted">{prefix}</span> : null}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          value={Number.isFinite(value) ? value : ""}
          step={step}
          min={min}
          max={max}
          onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
          className="no-input-spinner t-mono w-full min-w-0 bg-transparent text-[13px] text-ink outline-none"
        />
        {suffix ? <span className="t-mono text-muted">{suffix}</span> : null}
      </span>
    </label>
  );
}

/** "One deal" calculator. Fully client side. */
export function Calculator({ compact = false }: { compact?: boolean }) {
  const [price, setPrice] = useState(5000);
  const [calls, setCalls] = useState(60);
  const [rate, setRate] = useState(20);
  const [lift, setLift] = useState(2);

  const extraStudents = Math.max(0, calls) * (Math.max(0, lift) / 100);
  const extraRevenue = extraStudents * Math.max(0, price);
  const current = Math.max(0, calls) * (Math.max(0, rate) / 100) * Math.max(0, price);
  const studentsLabel = extraStudents >= 10 ? Math.round(extraStudents).toString() : extraStudents.toFixed(1).replace(/\.0$/, "");

  return (
    <div className="card !bg-white p-1.5">
      <div className="card-inset grid gap-4 p-4">
        <div className={cn("grid gap-3", compact ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2 sm:grid-cols-4")}>
          <NumberField label="Offer price" prefix="$" value={price} onChange={setPrice} step={500} />
          <NumberField label="Calls a month" value={calls} onChange={setCalls} />
          <NumberField label="Close rate" suffix="%" value={rate} onChange={setRate} max={100} />
          <NumberField label="Design lift" suffix="%" value={lift} onChange={setLift} step={0.5} max={100} />
        </div>
      </div>
      <div className="grid gap-1.5 px-4 pt-4 pb-3.5">
        <p className="text-[15px] leading-6 font-medium tracking-[-0.015em] text-ink" aria-live="polite">
          If better design lifts your close rate by just {lift}%, that&apos;s{" "}
          <span className="t-mono rounded bg-tint px-1 text-[14px]">{studentsLabel}</span> more students and{" "}
          <span className="t-mono rounded bg-tint px-1 text-[14px]">{money(extraRevenue)}</span> more a month.
        </p>
        <p className="t-label">
          Change the {lift}% to whatever feels honest. The point still stands.
          {current > 0 ? <span className="text-faint"> Today: about {money(current)} a month from calls.</span> : null}
        </p>
      </div>
    </div>
  );
}

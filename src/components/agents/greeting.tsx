"use client";

import { useBooking } from "./booking";

/** "Hi Sarah," when the link carries ?n=Sarah. Sits in the breadcrumb row, so it never shifts the layout. */
export function Greeting() {
  const { name } = useBooking();
  return name ? <span className="text-ink">Hi {name},</span> : null;
}

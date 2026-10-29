"use client";

import { ArrowCounterClockwise, CalendarCheck, CaretLeft, CaretRight, Clock } from "@phosphor-icons/react";
import { useMemo, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const ALL_TIMES = ["9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", "3:00 PM", "4:30 PM", "6:00 PM", "7:30 PM"];

const subscribeNoop = () => () => {};
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const sameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString();
const monthLabel = (d: Date) => d.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
const longDate = (d: Date) => d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });

/** Weekdays from tomorrow, for the next four weeks. */
const isAvailable = (d: Date, today: Date) => {
  const diff = (startOfDay(d).getTime() - today.getTime()) / 86_400_000;
  return diff >= 1 && diff <= 28 && d.getDay() !== 0 && d.getDay() !== 6;
};

/** A stable, slightly different set of open times for each date. */
const timesFor = (d: Date) => ALL_TIMES.filter((_, i) => (d.getDate() * 7 + i * 3) % 5 !== 0);

/** The coach booking card: a month calendar, then times, then a confirmation. All sample data. */
export function BookingCard() {
  // Today is read on the client only, so the server and browser never disagree.
  const todayKey = useSyncExternalStore(subscribeNoop, () => new Date().toDateString(), () => null);
  const today = useMemo(() => (todayKey ? startOfDay(new Date(todayKey)) : null), [todayKey]);

  // Months that have open dates; the calendar starts on the first of them.
  const range = useMemo(() => {
    if (!today) return null;
    const first = new Date(today);
    first.setDate(first.getDate() + 1);
    while (!isAvailable(first, today)) first.setDate(first.getDate() + 1);
    const last = new Date(today);
    last.setDate(last.getDate() + 28);
    const index = (d: Date) => d.getFullYear() * 12 + d.getMonth();
    return { min: index(first), max: index(last) };
  }, [today]);
  const [monthOffset, setMonthOffset] = useState(0);
  const [day, setDay] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);

  const monthIndex = range ? range.min + monthOffset : null;
  const month = monthIndex !== null ? new Date(Math.floor(monthIndex / 12), monthIndex % 12, 1) : null;
  const cells: (Date | null)[] = month
    ? [
        ...Array<null>(month.getDay()).fill(null),
        ...Array.from(
          { length: new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate() },
          (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1),
        ),
      ]
    : [];

  const reset = () => {
    setBooked(false);
    setDay(null);
    setTime(null);
  };

  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-full bg-iris-soft text-[13px] font-semibold text-iris" aria-hidden>
          YC
        </span>
        <span className="grid">
          <span className="text-[15px] leading-6 font-medium tracking-[-0.015em] text-ink">Your coach</span>
          <span className="t-ui inline-flex items-center gap-1 font-normal text-muted">
            <Clock size={12} /> 30 min call
          </span>
        </span>
      </div>
      <p className="t-ui mt-3 font-normal text-body">
        This is where a coach introduces themselves in a couple of lines, in their own words.
      </p>

      <div className="mt-5 min-h-[332px]">
        {booked && day && time ? (
          <div key="ok" className="fold-in grid gap-3 rounded-xl bg-iris-soft p-5">
            <span className="flex size-9 items-center justify-center rounded-full bg-iris text-white">
              <CalendarCheck size={17} />
            </span>
            <p className="text-[17px] leading-6 font-semibold tracking-[-0.015em] text-ink">Call booked</p>
            <p className="t-ui font-normal text-body">
              {longDate(day)} at {time}
            </p>
            <p className="t-label">This is a demo, so nothing was actually booked.</p>
            <button onClick={reset} className="t-ui mt-1 inline-flex items-center gap-1.5 self-start text-muted hover:text-ink">
              <ArrowCounterClockwise size={13} /> Pick another time
            </button>
          </div>
        ) : !today || !month ? (
          <div className="h-[332px] rounded-xl bg-paper-3" aria-hidden />
        ) : (
          <div className="grid gap-5">
            <div>
              <div className="mb-3 flex items-center justify-between">
                <span className="t-ui font-medium text-ink">{monthLabel(month)}</span>
                <span className="flex gap-1">
                  <button
                    aria-label="Previous month"
                    disabled={monthOffset === 0}
                    onClick={() => setMonthOffset((m) => m - 1)}
                    className="flex size-7 items-center justify-center rounded-md text-muted hover:bg-tint hover:text-ink disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    <CaretLeft size={13} />
                  </button>
                  <button
                    aria-label="Next month"
                    disabled={!range || monthIndex === range.max}
                    onClick={() => setMonthOffset((m) => m + 1)}
                    className="flex size-7 items-center justify-center rounded-md text-muted hover:bg-tint hover:text-ink disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    <CaretRight size={13} />
                  </button>
                </span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center">
                {WEEKDAYS.map((w, i) => (
                  <span key={i} className="t-label pb-1 text-[11px]">
                    {w}
                  </span>
                ))}
                {cells.map((d, i) => {
                  if (!d) return <span key={i} />;
                  const open = isAvailable(d, today);
                  const selected = day && sameDay(d, day);
                  return (
                    <button
                      key={i}
                      disabled={!open}
                      aria-pressed={!!selected}
                      aria-label={longDate(d)}
                      onClick={() => {
                        setDay(d);
                        setTime(null);
                      }}
                      className={cn(
                        "relative mx-auto flex size-9 items-center justify-center rounded-full text-[13px] tabular-nums",
                        selected
                          ? "bg-iris font-semibold text-white"
                          : open
                            ? "font-medium text-ink hover:bg-iris-soft hover:text-iris"
                            : "text-faint",
                      )}
                    >
                      {d.getDate()}
                      {sameDay(d, today) && !selected ? (
                        <span className="absolute bottom-1 size-1 rounded-full bg-faint" aria-hidden />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>

            {day ? (
              <div key={day.toDateString()} className="fold-in grid gap-3">
                <span className="t-ui font-medium text-ink">{longDate(day)}</span>
                <div className="grid grid-cols-3 gap-2 max-sm:grid-cols-2">
                  {timesFor(day).map((t) => (
                    <button
                      key={t}
                      aria-pressed={time === t}
                      onClick={() => setTime(t)}
                      className={cn(
                        "t-ui h-9 rounded-lg font-medium",
                        time === t ? "bg-iris text-white" : "bg-paper-3 text-ink-2 hover:bg-iris-soft hover:text-iris",
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <button
                  disabled={!time}
                  onClick={() => setBooked(true)}
                  className="t-ui mt-1 h-10 rounded-lg bg-iris font-medium text-white disabled:opacity-40"
                >
                  {time ? `Book ${time}` : "Pick a time"}
                </button>
              </div>
            ) : (
              <p className="t-label">Pick a date to see open times.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

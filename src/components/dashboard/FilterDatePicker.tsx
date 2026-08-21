"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { IconChevronLeft, IconChevronRight } from "@/components/icons";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"] as const;

type Props = {
  value: string;
  onChange: (value: string) => void;
  label: string;
};

function parseDisplayDate(value: string): Date | null {
  const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec(value.trim());
  if (!match) return null;
  const month = Number(match[1]) - 1;
  const day = Number(match[2]);
  const year = Number(match[3]);
  const date = new Date(year, month, day);
  if (
    Number.isNaN(date.getTime()) ||
    date.getFullYear() !== year ||
    date.getMonth() !== month ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
}

function toDisplayDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function buildCalendarDays(viewDate: Date) {
  const firstDay = startOfMonth(viewDate);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const gridStart = new Date(firstDay);
  gridStart.setDate(firstDay.getDate() - startOffset);

  return Array.from({ length: 42 }, (_, index) => {
    const day = new Date(gridStart);
    day.setDate(gridStart.getDate() + index);
    return day;
  });
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M3 9h18M8 3v4M16 3v4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function FilterDatePicker({
  value,
  onChange,
  label,
  stacked,
  align = "left",
}: Props & { stacked?: boolean; align?: "left" | "right" }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const selectedDate = parseDisplayDate(value);
  const [viewDate, setViewDate] = useState(() => selectedDate ?? new Date());
  const today = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  useEffect(() => {
    const parsed = parseDisplayDate(value);
    if (!parsed) return;
    const next = startOfMonth(parsed);
    setViewDate((curr) =>
      curr.getFullYear() === next.getFullYear() &&
      curr.getMonth() === next.getMonth()
        ? curr
        : next,
    );
  }, [value]);

  const monthLabel = viewDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const days = buildCalendarDays(viewDate);

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative",
        stacked
          ? "flex w-full flex-col items-stretch gap-1"
          : "inline-flex items-center gap-2",
      )}
    >
      <span
        className={cn(
          "shrink-0 text-xs text-[#617385]",
          stacked && "font-medium text-[rgba(29,54,80,0.80)]",
        )}
      >
        {label}
      </span>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex h-10 items-center gap-2 rounded-lg border bg-white px-3 text-sm text-icr-navy transition-colors",
          stacked ? "w-full min-w-0" : "min-w-[148px]",
          open
            ? "border-icr-orange shadow-[0_0_0_2px_rgba(246,134,31,0.15)]"
            : "border-[#DBDDE2]",
        )}
      >
        <span className="min-w-0 flex-1 text-left">{value}</span>
        <CalendarIcon className="shrink-0 text-[#617385]" />
      </button>

      <div
        className={cn(
          "absolute top-[calc(100%+8px)] z-40 w-[min(292px,calc(100vw-2rem))] rounded-xl border border-[#DBDDE2] bg-white p-3 shadow-[0_8px_24px_rgba(16,24,40,0.12)] transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]",
          align === "right"
            ? "right-0 left-auto origin-top-right"
            : "left-0 right-auto origin-top-left",
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-1 scale-[0.98] opacity-0",
        )}
      >
        <div className="flex items-center justify-between gap-2">
          <p className="px-1 text-sm font-medium text-icr-navy">{monthLabel}</p>
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setViewDate((d) => addMonths(d, -1))}
              className="grid size-8 place-items-center rounded-md text-icr-navy hover:bg-[#F8F9FA]"
              aria-label="Previous month"
            >
              <IconChevronLeft size={14} />
            </button>
            <button
              type="button"
              onClick={() => setViewDate((d) => addMonths(d, 1))}
              className="grid size-8 place-items-center rounded-md text-icr-navy hover:bg-[#F8F9FA]"
              aria-label="Next month"
            >
              <IconChevronRight size={14} />
            </button>
          </div>
        </div>

        <div className="mt-2 flex flex-col gap-1">
          <div className="grid grid-cols-7 gap-0.5">
            {WEEKDAYS.map((day) => (
              <div
                key={day}
                className="flex h-8 items-center justify-center text-[11px] font-medium text-[#9AA1A8]"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-0.5">
            {days.map((day) => {
              const inMonth = day.getMonth() === viewDate.getMonth();
              const selected = selectedDate
                ? isSameDay(day, selectedDate)
                : false;
              const isToday = isSameDay(day, today);

              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  onClick={() => {
                    onChange(toDisplayDate(day));
                    setViewDate(startOfMonth(day));
                    setOpen(false);
                  }}
                  className={cn(
                    "relative flex h-9 items-center justify-center rounded-lg text-xs",
                    selected
                      ? "border border-icr-orange font-medium text-icr-orange"
                      : inMonth
                        ? "text-icr-navy hover:bg-icr-orange-soft"
                        : "text-[#C4C4C4]",
                  )}
                >
                  {day.getDate()}
                  {isToday && !selected ? (
                    <span className="absolute bottom-1 size-1 rounded-full bg-icr-orange" />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

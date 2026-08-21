"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FilterScopeBadge } from "@/components/dashboard/FilterScopeBadge";
import {
  IconArrowDown,
  IconArrowUp,
  IconChevronDown,
  IconChevronRight,
} from "@/components/icons";
import { cn } from "@/lib/utils";

type LeadMode = "open" | "closed" | "both";
type Breakdown = "department" | "region";
type TrendKind = "up" | "down-good" | "bad";

type BreakdownItem = {
  label: string;
  value: string;
  right?: string;
  trend?: TrendKind;
};

type Metric = {
  title: string;
  value: string;
  aside?: string;
  trend: string;
  trendKind: TrendKind;
  baseline: string;
  hint?: string;
  items: BreakdownItem[];
};

const openMetrics: Metric[] = [
  {
    title: "Active Leads",
    value: "175",
    trend: "+75%",
    trendKind: "up",
    baseline: "173",
    items: [
      { label: "Intake", value: "8", right: "+33% vs last month", trend: "up" },
      { label: "Sales", value: "34", right: "+10% vs last month", trend: "up" },
      { label: "Engineering", value: "61", right: "+13% vs last month", trend: "up" },
      { label: "Operations", value: "3.14", right: "-42% vs last month", trend: "bad" },
      { label: "Collaborative review", value: "30", right: "+50% vs last month", trend: "up" },
      { label: "Commercial", value: "28", right: "-33% vs last month", trend: "bad" },
    ],
  },
  {
    title: "Median Lead Age",
    value: "6d",
    trend: "-29%",
    trendKind: "down-good",
    baseline: "9d",
    items: [
      { label: "Intake", value: "0.5d", right: "8d Baseline" },
      { label: "Sales", value: "2d", right: "9d Baseline" },
      { label: "Engineering", value: "12d", right: "12.5d Baseline" },
      { label: "Operations", value: "3.5d", right: "9d Baseline" },
      { label: "Collaborative review", value: "4d", right: "10d Baseline" },
      { label: "Commercial", value: "9d", right: "9d Baseline" },
    ],
  },
  {
    title: "SLA compliance",
    value: "86%",
    aside: "24 SLA Tagged",
    trend: "+5%",
    trendKind: "up",
    baseline: "95%",
    items: [
      { label: "Intake", value: "100%", right: "25% Baseline" },
      { label: "Sales", value: "94%", right: "81% Baseline" },
      { label: "Engineering", value: "79%", right: "82% Baseline" },
      { label: "Operations", value: "186%", right: "58% Baseline" },
      { label: "Collaborative review", value: "80%", right: "93% Baseline" },
      { label: "Commercial", value: "96%", right: "79% Baseline" },
    ],
  },
  {
    title: "Breached",
    value: "24",
    trend: "+33%",
    trendKind: "bad",
    baseline: "9",
    items: [
      { label: "Intake", value: "0", right: "1 Baseline" },
      { label: "Sales", value: "2", right: "1 Baseline" },
      { label: "Engineering", value: "13", right: "1 Baseline" },
      { label: "Operations", value: "2", right: "1 Baseline" },
      { label: "Collaborative review", value: "6", right: "0 Baseline" },
      { label: "Commercial", value: "1", right: "1 Baseline" },
    ],
  },
  {
    title: "Currently Blocked",
    value: "22",
    aside: "Avg 6.5d",
    trend: "-29%",
    trendKind: "down-good",
    baseline: "31",
    hint: "12 Blocked on ICR · 10 Blocked on Customer",
    items: [
      { label: "Intake", value: "2" },
      { label: "Sales", value: "5" },
      { label: "Engineering", value: "7" },
      { label: "Operations", value: "0" },
      { label: "Collaborative review", value: "7" },
      { label: "Commercial", value: "1" },
    ],
  },
];

const closedMetrics: Metric[] = [
  {
    title: "Closed this period",
    value: "60",
    trend: "+13%",
    trendKind: "up",
    baseline: "27",
    items: [
      { label: "Completed", value: "55" },
      { label: "Abandoned this month", value: "5" },
    ],
  },
  {
    title: "Median cycle time",
    value: "12d",
    trend: "+100%",
    trendKind: "bad",
    baseline: "9d",
    items: [
      { label: "Intake", value: "0.5d", right: "8d Baseline" },
      { label: "Sales", value: "2d", right: "9d Baseline" },
      { label: "Engineering", value: "12d", right: "12.5d Baseline" },
      { label: "Operations", value: "3.5d", right: "9d Baseline" },
      { label: "Collaborative review", value: "4d", right: "10d Baseline" },
      { label: "Commercial", value: "9d", right: "7.9d Baseline" },
    ],
  },
  {
    title: "SLA Compliance",
    value: "87%",
    aside: "8 SLA Tagged",
    trend: "+21%",
    trendKind: "up",
    baseline: "72%",
    items: [
      { label: "Intake", value: "100%", right: "25% Baseline" },
      { label: "Sales", value: "94%", right: "81% Baseline" },
      { label: "Engineering", value: "79%", right: "82% Baseline" },
      { label: "Operations", value: "85%", right: "58% Baseline" },
      { label: "Collaborative review", value: "80%", right: "93% Baseline" },
      { label: "Commercial", value: "96%", right: "79% Baseline" },
    ],
  },
  {
    title: "Breached",
    value: "8",
    trend: "-47%",
    trendKind: "down-good",
    baseline: "7",
    items: [
      { label: "Intake", value: "0", right: "0 Baseline" },
      { label: "Sales", value: "2", right: "1 Baseline" },
      { label: "Engineering", value: "3", right: "1 Baseline" },
      { label: "Operations", value: "1", right: "0 Baseline" },
      { label: "Collaborative review", value: "1", right: "0 Baseline" },
      { label: "Commercial", value: "1", right: "0 Baseline" },
    ],
  },
  {
    title: "Artifacts Uploaded",
    value: "130",
    trend: "+29%",
    trendKind: "up",
    baseline: "101",
    items: [
      { label: "Calculations", value: "55", right: "12 Revised" },
      { label: "Drawings", value: "50", right: "4 Revised" },
      { label: "Quotations", value: "25", right: "0 Revised" },
    ],
  },
];

function trendColor(kind: TrendKind) {
  return kind === "bad" ? "text-[#B3261E]" : "text-[#067647]";
}

function Trend({ value, kind }: { value: string; kind: TrendKind }) {
  const Arrow = kind === "down-good" ? IconArrowDown : IconArrowUp;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 self-end whitespace-nowrap text-[10px] leading-[14px]",
        trendColor(kind),
      )}
    >
      <span className="inline-flex items-center gap-0.5 font-medium">
        <Arrow size={12} />
        {value}
      </span>
      <span className="font-normal">vs last month</span>
    </span>
  );
}

function ModeToggle({
  mode,
  onChange,
}: {
  mode: LeadMode;
  onChange: (m: LeadMode) => void;
}) {
  const options: { id: LeadMode; label: string }[] = [
    { id: "open", label: "Open Leads" },
    { id: "closed", label: "Closed Leads" },
    { id: "both", label: "Both" },
  ];
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pill, setPill] = useState({
    left: 0,
    width: 0,
    ready: false,
    animate: false,
  });

  useLayoutEffect(() => {
    const idx = options.findIndex((o) => o.id === mode);
    const btn = btnRefs.current[idx];
    if (!btn) return;
    const left = btn.offsetLeft;
    const width = btn.offsetWidth;
    setPill((prev) => ({
      left,
      width,
      ready: true,
      animate: prev.ready,
    }));
  }, [mode]);

  return (
    <div className="relative inline-flex w-full rounded-lg border border-[rgba(13,24,61,0.10)] bg-white p-1 lg:w-auto lg:border-[rgba(13,24,61,0.15)]">
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute top-1 bottom-1 rounded-[7px] border border-[#F6861F] bg-icr-tint",
          pill.animate &&
            "transition-[left,width,opacity] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          pill.ready ? "opacity-100" : "opacity-0",
        )}
        style={{ left: pill.left, width: pill.width }}
      />
      {options.map((opt, i) => (
        <button
          key={opt.id}
          ref={(el) => {
            btnRefs.current[i] = el;
          }}
          type="button"
          onClick={() => onChange(opt.id)}
          className={cn(
            "relative z-10 flex-1 rounded-[7px] px-2.5 py-1 text-xs font-medium leading-[15.6px] transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] lg:flex-none",
            mode === opt.id ? "text-icr-orange" : "text-[rgba(29,54,80,0.8)]",
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function CollapseToggle({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-expanded={open}
      onClick={onClick}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded text-icr-navy",
        "p-0 lg:bg-[#F8F9FA] lg:p-1.5",
        open && "lg:bg-[rgba(246,134,31,0.12)] lg:text-icr-orange",
      )}
    >
      <span className="inline-flex lg:hidden">
        {open ? <IconChevronDown size={12} /> : <IconChevronRight size={12} />}
      </span>
      <span
        className={cn(
          "hidden transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] lg:inline-flex",
          open && "rotate-180",
        )}
      >
        <IconChevronDown size={12} />
      </span>
    </button>
  );
}

function MetricColumn({
  metric,
  open,
  onToggle,
}: {
  metric: Metric;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1.5 border-b border-[#DBDDE2] px-0 py-2 last:border-b-0 lg:gap-3 lg:border-r lg:border-b-0 lg:px-4 lg:pb-4 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0">
      <div className="flex items-center gap-1.5 lg:justify-between lg:gap-2">
        <div className="min-w-0 text-xs font-medium leading-[16.2px] text-[rgba(29,54,80,0.8)] lg:flex-1 lg:text-sm lg:leading-[18.9px]">
          {metric.title}
        </div>
        <CollapseToggle open={open} onClick={onToggle} />
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-end gap-2">
          <div className="text-lg font-medium leading-[24.3px] text-icr-navy lg:text-2xl lg:leading-[32.4px]">
            {metric.value}
          </div>
          {metric.aside ? (
            <div className="pb-0.5 text-xs leading-3 text-[#475467] lg:text-sm lg:leading-[14px]">
              {metric.aside}
            </div>
          ) : null}
          <Trend value={metric.trend} kind={metric.trendKind} />
        </div>
        <div className="flex items-center gap-1 pb-1 text-[10px] leading-[14px] text-[#475467] lg:pb-0">
          <span className="font-normal">Baseline Median</span>
          <span className="font-medium">{metric.baseline}</span>
        </div>
      </div>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className={cn(
              "rounded-lg bg-[linear-gradient(0deg,rgba(255,255,255,0.97),rgba(255,255,255,0.97)),#1D3650] px-4 pt-1 pb-3 transition-opacity duration-300 lg:rounded-none lg:bg-transparent lg:px-0 lg:pt-3 lg:pb-0 lg:border-t lg:border-[#DBDDE2]",
              open ? "opacity-100" : "opacity-0",
            )}
          >
            <div className="mb-2 hidden text-[10px] font-medium tracking-wide text-[#6A7282] uppercase lg:block">
              Current month breakdown
            </div>
            {metric.hint ? (
              <div className="mb-2 flex flex-wrap items-center gap-2 text-[10px] leading-[14px] text-icr-navy">
                {metric.hint.split(" · ").map((part, i) => {
                  const [count, ...rest] = part.split(" ");
                  return (
                    <span key={part} className="inline-flex items-end gap-1">
                      {i > 0 ? (
                        <span className="mx-0.5 inline-block size-[2.5px] self-center rounded-full bg-[rgba(29,54,80,0.45)]" />
                      ) : null}
                      <strong className="font-medium">{count}</strong>
                      <span className="font-normal">{rest.join(" ")}</span>
                    </span>
                  );
                })}
              </div>
            ) : null}
            <div className="flex flex-col gap-2">
              {metric.items.map((item) => (
                <div
                  className="flex items-center justify-between gap-2 text-[10px] leading-[14px] text-icr-navy lg:text-xs lg:leading-[18px]"
                  key={`${metric.title}-${item.label}`}
                >
                  <div className="flex items-end gap-1">
                    <strong className="font-medium">{item.value}</strong>
                    <span className="font-normal">{item.label}</span>
                  </div>
                  {item.right ? (
                    <div className="flex items-center gap-1 whitespace-nowrap text-right text-[rgba(29,54,80,0.70)]">
                      {item.trend ? (
                        <>
                          <span
                            className={cn("font-medium", trendColor(item.trend))}
                          >
                            {item.right.split(" ")[0]}
                          </span>
                          <span className="font-normal">vs last month</span>
                        </>
                      ) : item.right.includes("Baseline") ? (
                        <>
                          <span className="font-medium">
                            {item.right.replace(" Baseline", "")}
                          </span>
                          <span>Baseline</span>
                        </>
                      ) : (
                        item.right
                      )}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryPanel({
  title,
  metrics,
  breakdown,
  onBreakdownChange,
}: {
  title: string;
  metrics: Metric[];
  breakdown: Breakdown;
  onBreakdownChange: (b: Breakdown) => void;
}) {
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const anyOpen = openKeys.length > 0;
  const allOpen = openKeys.length === metrics.length;
  const breakdownBtnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [breakdownPill, setBreakdownPill] = useState({
    left: 0,
    width: 0,
    ready: false,
    animate: false,
  });

  useLayoutEffect(() => {
    const idx = breakdown === "department" ? 0 : 1;
    const btn = breakdownBtnRefs.current[idx];
    if (!btn) return;
    const left = btn.offsetLeft;
    const width = btn.offsetWidth;
    setBreakdownPill((prev) => ({
      left,
      width,
      ready: true,
      animate: prev.ready,
    }));
  }, [breakdown]);

  useEffect(() => {
    setOpenKeys([]);
  }, [title]);

  function toggleOne(title: string) {
    setOpenKeys((curr) =>
      curr.includes(title) ? curr.filter((t) => t !== title) : [...curr, title],
    );
  }

  function toggleAll() {
    setOpenKeys(allOpen ? [] : metrics.map((m) => m.title));
  }

  return (
    <div className="flex w-full flex-col rounded-[14px] border border-[#DBDDE2] bg-white pt-3">
      <div className="flex flex-col gap-2 px-3 pb-2 lg:gap-4">
        <div className="flex flex-col items-stretch gap-2 lg:h-8 lg:flex-row lg:items-center lg:justify-between lg:gap-3">
          <h3 className="m-0 text-xs font-medium leading-[15px] text-icr-navy lg:text-sm lg:leading-[17.5px]">
            {title}
          </h3>
          <div
            className={cn(
              "grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
              "grid-rows-[1fr] opacity-100 lg:grid-rows-[1fr]",
              anyOpen
                ? "lg:opacity-100"
                : "lg:pointer-events-none lg:grid-rows-[0fr] lg:opacity-0",
            )}
          >
            <div className="min-h-0 overflow-hidden">
              <div className="relative inline-flex w-full rounded-lg border border-[rgba(13,24,61,0.15)] bg-white p-1 lg:w-auto lg:overflow-hidden lg:p-0">
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute top-1 bottom-1 rounded-[7px] border border-[#F6861F] bg-icr-tint lg:hidden",
                    breakdownPill.animate &&
                      "transition-[left,width,opacity] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
                    breakdownPill.ready ? "opacity-100" : "opacity-0",
                  )}
                  style={{
                    left: breakdownPill.left,
                    width: breakdownPill.width,
                  }}
                />
                <button
                  ref={(el) => {
                    breakdownBtnRefs.current[0] = el;
                  }}
                  type="button"
                  onClick={() => onBreakdownChange("department")}
                  className={cn(
                    "relative z-10 h-auto flex-1 rounded-[7px] px-2.5 py-1 text-xs font-medium leading-[15.6px] lg:h-8 lg:flex-none lg:rounded-none lg:px-3 lg:py-0",
                    breakdown === "department"
                      ? "text-icr-orange lg:bg-[rgba(246,134,31,0.08)]"
                      : "text-[rgba(29,54,80,0.8)]",
                  )}
                >
                  Breakdown by Department
                </button>
                <button
                  ref={(el) => {
                    breakdownBtnRefs.current[1] = el;
                  }}
                  type="button"
                  onClick={() => onBreakdownChange("region")}
                  className={cn(
                    "relative z-10 h-auto flex-1 rounded-[7px] px-2.5 py-1 text-xs font-medium leading-[15.6px] lg:h-8 lg:flex-none lg:rounded-none lg:border-l lg:border-[rgba(13,24,61,0.15)] lg:px-3 lg:py-0",
                    breakdown === "region"
                      ? "text-icr-orange lg:bg-[rgba(246,134,31,0.08)]"
                      : "text-[rgba(29,54,80,0.8)]",
                  )}
                >
                  Breakdown by Region
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-stretch lg:flex-row lg:items-start">
          {metrics.map((m) => (
            <MetricColumn
              key={m.title}
              metric={m}
              open={openKeys.includes(m.title)}
              onToggle={() => toggleOne(m.title)}
            />
          ))}
        </div>
      </div>

      <div className="flex h-9 items-center rounded-b-[13px] border border-[#DBDDE2] bg-[linear-gradient(0deg,rgba(246,134,31,0.01),rgba(246,134,31,0.01)),white] px-3 py-2 lg:h-[49px] lg:rounded-b-[14px] lg:border-0 lg:border-t lg:bg-white">
        <button
          type="button"
          onClick={toggleAll}
          className="inline-flex items-center gap-1.5 text-[10px] font-medium leading-[17.44px] text-icr-orange lg:text-xs"
        >
          {anyOpen ? "Hide Current month breakdown" : "View Current month breakdown"}
          <span
            className={cn(
              "inline-flex transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
              anyOpen && "rotate-180",
            )}
          >
            <IconChevronDown size={14} />
          </span>
        </button>
      </div>
    </div>
  );
}

export function SummarySection() {
  const [mode, setMode] = useState<LeadMode>("open");
  const [breakdown, setBreakdown] = useState<Breakdown>("department");

  return (
    <section className="flex flex-col gap-3 rounded-[14px] border border-[#DBDDE2] bg-white p-3 lg:gap-4 lg:p-4">
      <div className="flex flex-col gap-2.5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="m-0 text-sm font-medium leading-[17.5px] text-icr-navy lg:text-base lg:leading-5">
              <span className="lg:hidden">Summary of current workload </span>
              <span className="hidden lg:inline">
                Summary of current workload and completed outcomes
              </span>
            </h2>
            <FilterScopeBadge />
          </div>
          <p className="mt-0 mb-0 text-xs leading-[16.8px] text-[rgba(29,54,80,0.65)]">
            <span className="lg:hidden">
              Track performance against last month and the 6-month median.
            </span>
            <span className="hidden lg:inline">
              Track current performance against last month and the median over
              the previous 6 months.
            </span>
          </p>
        </div>
        <div className="w-full lg:w-auto">
          <ModeToggle mode={mode} onChange={setMode} />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {mode === "both" ? (
          <>
            <SummaryPanel
              title="Open Leads this month"
              metrics={openMetrics}
              breakdown={breakdown}
              onBreakdownChange={setBreakdown}
            />
            <SummaryPanel
              title="Closed Leads this month"
              metrics={closedMetrics}
              breakdown={breakdown}
              onBreakdownChange={setBreakdown}
            />
          </>
        ) : (
          <SummaryPanel
            title={
              mode === "open"
                ? "Open Leads this month"
                : "Closed Leads this month"
            }
            metrics={mode === "open" ? openMetrics : closedMetrics}
            breakdown={breakdown}
            onBreakdownChange={setBreakdown}
          />
        )}
      </div>
    </section>
  );
}

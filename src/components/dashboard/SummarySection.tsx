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

const collapseMs = 500;
const collapseEase = "duration-500 ease-in-out";
const collapseGrid = cn(
  "grid transition-[grid-template-rows] motion-reduce:transition-none",
  collapseEase,
);
const chevronMotion = cn(
  "inline-flex origin-center transition-transform motion-reduce:transition-none",
  collapseEase,
);

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
        "inline-flex items-center gap-1 self-end whitespace-nowrap text-[10px] leading-[14px] tracking-[-0.4px]",
        trendColor(kind),
      )}
    >
      <span className="inline-flex items-center gap-0.5 font-[500]">
        <Arrow size={12} />
        {value}
      </span>
      <span className="font-[400]">vs last month</span>
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
    <div className="relative inline-flex w-full rounded-[8px] border border-[rgba(13,24,61,0.10)] bg-white p-1 lg:w-auto lg:border-[rgba(13,24,61,0.15)]">
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute top-1 bottom-1 rounded-[6px] border border-[#F6861F] bg-icr-tint",
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
            "relative z-10 flex-1 rounded-[6px] px-2.5 py-1 text-xs font-medium leading-[15.6px] transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] lg:flex-none",
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
        open &&
          "lg:border lg:border-icr-orange lg:bg-[rgba(246,134,31,0.12)] lg:text-icr-orange",
      )}
    >
      <span className="inline-flex lg:hidden">
        {open ? (
          <IconChevronDown size={12} />
        ) : (
          <IconChevronRight size={12} />
        )}
      </span>
      <span
        className={cn(
          "hidden origin-center transition-transform motion-reduce:transition-none lg:inline-flex",
          collapseEase,
          open && "rotate-180",
        )}
      >
        <IconChevronDown size={12} />
      </span>
    </button>
  );
}

function BreakdownHint({ hint }: { hint: string }) {
  return (
    <div className="mb-2 flex flex-wrap items-center gap-2 text-[10px] leading-[14px] tracking-[-0.4px] text-icr-navy">
      {hint.split(" · ").map((part, i) => {
        const [count, ...rest] = part.split(" ");
        return (
          <span key={part} className="inline-flex items-end gap-1">
            {i > 0 ? (
              <span className="mx-0.5 inline-block size-[2.5px] self-center rounded-full bg-[rgba(29,54,80,0.45)]" />
            ) : null}
            <span className="font-[500]">{count}</span>
            <span className="font-[400]">{rest.join(" ")}</span>
          </span>
        );
      })}
    </div>
  );
}

function BreakdownItems({
  metric,
  tone = "colored",
}: {
  metric: Metric;
  tone?: "muted" | "colored";
}) {
  return (
    <div className="flex flex-col gap-2">
      {metric.items.map((item) => (
        <div
          className="flex items-center justify-between gap-2 text-[10px] leading-[14px] tracking-[-0.4px] text-icr-navy lg:text-xs lg:leading-[18px]"
          key={`${metric.title}-${item.label}`}
        >
          <div className="flex items-end gap-1">
            <span className="font-[500]">{item.value}</span>
            <span className="font-[400]">{item.label}</span>
          </div>
          {item.right ? (
            <div className="flex items-center gap-1 whitespace-nowrap text-right">
              {item.trend ? (
                tone === "muted" ? (
                  <span className="font-[400] text-[rgba(29,54,80,0.70)]">
                    {item.right}
                  </span>
                ) : (
                  <>
                    <span className={cn("font-[500]", trendColor(item.trend))}>
                      {item.right.split(" ")[0]}
                    </span>
                    <span className="font-[400] text-[rgba(29,54,80,0.70)]">
                      vs last month
                    </span>
                  </>
                )
              ) : item.right.includes("Baseline") ? (
                <>
                  <span
                    className={cn(
                      tone === "muted"
                        ? "font-[400] text-[rgba(29,54,80,0.70)]"
                        : "font-[500] text-[rgba(29,54,80,0.70)]",
                    )}
                  >
                    {item.right.replace(" Baseline", "")}
                  </span>
                  <span className="font-[400] text-[rgba(29,54,80,0.70)]">
                    Baseline
                  </span>
                </>
              ) : (
                <span className="font-[400] text-[rgba(29,54,80,0.70)]">
                  {item.right}
                </span>
              )}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function MetricTop({
  metric,
  individualOpen,
  collectiveOpen,
  onToggle,
  showDivider,
  isLast,
}: {
  metric: Metric;
  individualOpen: boolean;
  collectiveOpen: boolean;
  onToggle: () => void;
  showDivider: boolean;
  isLast: boolean;
}) {
  return (
    <div
      className={cn(
        "flex h-full min-w-0 flex-col gap-1.5 border-b border-[#DBDDE2] px-0 py-2 lg:gap-3 lg:border-b-0 lg:px-4",
        "transition-[padding] motion-reduce:transition-none",
        collapseEase,
        collectiveOpen ? "pb-0" : "pb-3",
        showDivider && "lg:border-l lg:border-[#DBDDE2]",
        !showDivider && "lg:pl-0",
        isLast && "border-b-0 lg:pr-0",
      )}
    >
      <div className="flex items-center gap-1.5 lg:justify-between lg:gap-2">
        <div className="min-w-0 text-xs font-medium leading-[16.2px] text-[rgba(29,54,80,0.8)] lg:flex-1 lg:text-sm lg:leading-[18.9px]">
          {metric.title}
        </div>
        <CollapseToggle open={individualOpen} onClick={onToggle} />
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
        <div className="flex items-center gap-1 pb-1 text-[10px] leading-[14px] tracking-[-0.4px] text-[#475467] lg:pb-0">
          <span className="font-[400]">Baseline Median</span>
          <span className="font-[500]">{metric.baseline}</span>
        </div>
      </div>

      <div
        className={cn(
          collapseGrid,
          individualOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className={cn(
              "bg-[#F8F9FA] px-3 pt-2 pb-[22px] lg:px-4",
              collectiveOpen ? "rounded-t-lg rounded-b-none" : "rounded-lg",
            )}
          >
            <div className="mb-2 text-[10px] font-medium tracking-wide text-[#6A7282] uppercase">
              Current month breakdown
            </div>
            {metric.hint ? <BreakdownHint hint={metric.hint} /> : null}
            <BreakdownItems metric={metric} tone="muted" />
          </div>
        </div>
      </div>
    </div>
  );
}

function CollectiveCell({
  metric,
  showDivider,
  isLast,
}: {
  metric: Metric;
  showDivider: boolean;
  isLast: boolean;
}) {
  return (
    <div
      className={cn(
        "h-full",
        showDivider && "lg:border-l lg:border-[#DBDDE2]",
      )}
    >
      <div
        className={cn(
          "px-0 py-3 lg:px-4 lg:py-3",
          !showDivider && "lg:pl-0",
          isLast && "lg:pr-0",
        )}
      >
        {metric.hint ? <BreakdownHint hint={metric.hint} /> : null}
        <BreakdownItems metric={metric} tone="colored" />
      </div>
    </div>
  );
}

function SummaryPanel({
  title,
  metrics,
}: {
  title: string;
  metrics: Metric[];
}) {
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [collectiveOpen, setCollectiveOpen] = useState(false);
  const [breakdown, setBreakdown] = useState<Breakdown>("department");
  const anyIndividual = openKeys.length > 0;
  const mobileAllOpen =
    metrics.length > 0 && openKeys.length === metrics.length;
  const showBreakdownTabs = mobileAllOpen;
  const showBreakdownTabsDesktop = collectiveOpen || anyIndividual;
  const collectiveRef = useRef<HTMLDivElement>(null);
  const [collectiveHeight, setCollectiveHeight] = useState(0);
  const breakdownBtnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [breakdownPill, setBreakdownPill] = useState({
    left: 0,
    width: 0,
    ready: false,
    animate: false,
  });

  useLayoutEffect(() => {
    const el = collectiveRef.current;
    if (!el) return;
    const measure = () => setCollectiveHeight(el.scrollHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [metrics]);

  useLayoutEffect(() => {
    const idx = breakdown === "department" ? 0 : 1;
    const btn = breakdownBtnRefs.current[idx];
    if (!btn) return;
    const left = btn.offsetLeft;
    const width = btn.offsetWidth;
    if (width === 0) return;
    setBreakdownPill((prev) => ({
      left,
      width,
      ready: true,
      animate: prev.ready,
    }));
  }, [breakdown, collectiveOpen, anyIndividual, mobileAllOpen]);

  useEffect(() => {
    setOpenKeys([]);
    setCollectiveOpen(false);
  }, [title]);

  function toggleOne(metricTitle: string) {
    setOpenKeys((curr) =>
      curr.includes(metricTitle)
        ? curr.filter((t) => t !== metricTitle)
        : [...curr, metricTitle],
    );
  }

  function toggleFooterBreakdown() {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (isDesktop) {
      setCollectiveOpen((v) => !v);
      return;
    }
    setOpenKeys((curr) =>
      curr.length === metrics.length ? [] : metrics.map((m) => m.title),
    );
  }

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-[14px] border border-[#DBDDE2] bg-white pt-3">
      <div className="flex flex-col gap-2 px-3 lg:gap-4">
        <div className="flex flex-col items-stretch gap-2 lg:h-8 lg:flex-row lg:items-center lg:justify-between lg:gap-3">
          <h3 className="m-0 text-xs font-medium leading-[15px] text-icr-navy lg:text-sm lg:leading-[17.5px]">
            {title}
          </h3>
          <div
            className={cn(
              collapseGrid,
              "transition-opacity motion-reduce:transition-none",
              collapseEase,
              showBreakdownTabs
                ? "grid-rows-[1fr] opacity-100"
                : "pointer-events-none grid-rows-[0fr] opacity-0",
              showBreakdownTabsDesktop
                ? "lg:pointer-events-auto lg:grid-rows-[1fr] lg:opacity-100"
                : "lg:pointer-events-none lg:grid-rows-[0fr] lg:opacity-0",
            )}
          >
            <div className="min-h-0 overflow-hidden">
              <div className="relative inline-flex w-full rounded-[8px] border border-[rgba(13,24,61,0.10)] bg-white p-1 lg:w-auto lg:border-[rgba(13,24,61,0.15)]">
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute top-1 bottom-1 rounded-[6px] border border-[#F6861F] bg-icr-tint",
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
                  onClick={() => setBreakdown("department")}
                  className={cn(
                    "relative z-10 flex-1 rounded-[6px] px-2.5 py-1 text-xs font-medium leading-[15.6px] transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] lg:flex-none lg:px-3",
                    breakdown === "department"
                      ? "text-icr-orange"
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
                  onClick={() => setBreakdown("region")}
                  className={cn(
                    "relative z-10 flex-1 rounded-[6px] px-2.5 py-1 text-xs font-medium leading-[15.6px] transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] lg:flex-none lg:px-3",
                    breakdown === "region"
                      ? "text-icr-orange"
                      : "text-[rgba(29,54,80,0.8)]",
                  )}
                >
                  Breakdown by Region
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 lg:items-stretch">
          {metrics.map((m, i) => (
            <div key={m.title} className="min-w-0 lg:h-full">
              <MetricTop
                metric={m}
                individualOpen={openKeys.includes(m.title)}
                collectiveOpen={collectiveOpen}
                onToggle={() => toggleOne(m.title)}
                showDivider={i > 0}
                isLast={i === metrics.length - 1}
              />
            </div>
          ))}
        </div>
      </div>

      <div
        className="hidden overflow-hidden motion-reduce:transition-none lg:block"
        style={{
          height: collectiveOpen ? collectiveHeight : 0,
          transition: `height ${collapseMs}ms ease-in-out`,
        }}
      >
        <div ref={collectiveRef}>
          <div className="border-t border-[#DBDDE2] bg-[#F8F9FA]">
            <div className="grid grid-cols-1 px-3 lg:grid-cols-5 lg:items-stretch">
              {metrics.map((m, i) => (
                <CollectiveCell
                  key={m.title}
                  metric={m}
                  showDivider={i > 0}
                  isLast={i === metrics.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-9 items-center gap-3 rounded-b-[13px] border-t border-[#DBDDE2] bg-[linear-gradient(0deg,rgba(246,134,31,0.005),rgba(246,134,31,0.005)),#fff] py-2 pr-0.5 pl-3 lg:h-[49px] lg:rounded-b-[14px]">
        <button
          type="button"
          onClick={toggleFooterBreakdown}
          className="inline-flex items-center gap-1.5 text-[10px] font-[500] leading-[17.44px] text-icr-orange lg:text-xs"
        >
          <span className="lg:hidden">
            {mobileAllOpen
              ? "Hide Current month breakdown"
              : "View Current month breakdown"}
          </span>
          <span className="hidden lg:inline">
            {collectiveOpen
              ? "Hide Current month breakdown"
              : "View Current month breakdown"}
          </span>
          <span
            className={cn(
              chevronMotion,
              "lg:hidden",
              mobileAllOpen && "rotate-180",
            )}
          >
            <IconArrowDown size={14} />
          </span>
          <span
            className={cn(
              chevronMotion,
              "hidden lg:inline-flex",
              collectiveOpen && "rotate-180",
            )}
          >
            <IconArrowDown size={14} />
          </span>
        </button>
      </div>
    </div>
  );
}

export function SummarySection() {
  const [mode, setMode] = useState<LeadMode>("open");

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
            />
            <SummaryPanel
              title="Closed Leads this month"
              metrics={closedMetrics}
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
          />
        )}
      </div>
    </section>
  );
}

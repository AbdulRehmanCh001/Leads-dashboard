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
const fadeMs = 600;
const collapseEase = "duration-500 ease-in-out";
const fadeEase = "duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)]";
const collapseGrid = cn(
  "grid transition-[grid-template-rows] motion-reduce:transition-none",
  collapseEase,
);
const chevronMotion = cn(
  "inline-flex origin-center transition-transform motion-reduce:transition-none",
  collapseEase,
);

type ExpandAnim = "height" | "fade";

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
  collectiveHint?: string;
  footnote?: string;
  individualItems: BreakdownItem[];
  collectiveItems: BreakdownItem[];
};

const openMetrics: Metric[] = [
  {
    title: "Active Leads",
    value: "175",
    trend: "+75%",
    trendKind: "up",
    baseline: "173",
    individualItems: [
      { label: "Intake", value: "8", right: "+33% vs last month", trend: "up" },
      { label: "Sales", value: "34", right: "+10% vs last month", trend: "up" },
      { label: "Engineering", value: "61", right: "+13% vs last month", trend: "up" },
      { label: "Operations", value: "3.14", right: "-42% vs last month", trend: "bad" },
      { label: "Collaborative review", value: "30", right: "+50% vs last month", trend: "up" },
      { label: "Commercial", value: "28", right: "-33% vs last month", trend: "bad" },
    ],
    collectiveItems: [],
  },
  {
    title: "Median Lead Age",
    value: "6d",
    trend: "-29%",
    trendKind: "down-good",
    baseline: "9d",
    individualItems: [
      { label: "Intake", value: "0.5d", right: "8d Baseline" },
      { label: "Sales", value: "2d", right: "9d Baseline" },
      { label: "Engineering", value: "12d", right: "12.5d Baseline" },
      { label: "Operations", value: "3.5d", right: "9d Baseline" },
      { label: "Collaborative review", value: "4d", right: "10d Baseline" },
      { label: "Commercial", value: "9d", right: "9d Baseline" },
    ],
    collectiveItems: [
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
    individualItems: [
      { label: "Intake", value: "100%", right: "25% Baseline" },
      { label: "Sales", value: "94%", right: "81% Baseline" },
      { label: "Engineering", value: "79%", right: "82% Baseline" },
      { label: "Operations", value: "186%", right: "58% Baseline" },
      { label: "Collaborative review", value: "80%", right: "93% Baseline" },
      { label: "Commercial", value: "96%", right: "79% Baseline" },
    ],
    collectiveItems: [
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
    individualItems: [
      { label: "Intake", value: "0", right: "1 Baseline" },
      { label: "Sales", value: "2", right: "1 Baseline" },
      { label: "Engineering", value: "13", right: "1 Baseline" },
      { label: "Operations", value: "2", right: "1 Baseline" },
      { label: "Collaborative review", value: "6", right: "0 Baseline" },
      { label: "Commercial", value: "1", right: "1 Baseline" },
    ],
    collectiveItems: [
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
    collectiveHint: "12 Blocked on ICR · 10 Blocked on Customer",
    individualItems: [
      { label: "Intake", value: "2" },
      { label: "Sales", value: "5" },
      { label: "Engineering", value: "7" },
      { label: "Operations", value: "0" },
      { label: "Collaborative review", value: "7" },
      { label: "Commercial", value: "1" },
    ],
    collectiveItems: [
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
    individualItems: [
      { label: "Completed", value: "55" },
      { label: "Abandoned this month", value: "5" },
    ],
    collectiveItems: [
      { label: "Blocked on ICR", value: "55" },
      { label: "Blocked on Customer", value: "10" },
    ],
  },
  {
    title: "Median cycle time",
    value: "12d",
    trend: "+100%",
    trendKind: "bad",
    baseline: "9d",
    footnote:
      "Velocity time includes only completed leads. Abandoned leads excluded.",
    individualItems: [
      { label: "Intake", value: "0.5d", right: "8d Baseline" },
      { label: "Sales", value: "2d", right: "9d Baseline" },
      { label: "Engineering", value: "14d", right: "12d Baseline" },
      { label: "Operations", value: "3.5d", right: "7.5d Baseline" },
      { label: "Collaborative review", value: "4d", right: "9d Baseline" },
      { label: "Commercial", value: "9d", right: "10d Baseline" },
    ],
    collectiveItems: [
      { label: "Intake", value: "0.5d", right: "8d Baseline" },
      { label: "Sales", value: "2d", right: "9d Baseline" },
      { label: "Engineering", value: "12d", right: "12.5d Baseline" },
      { label: "Operations", value: "0", right: "9d Baseline" },
      { label: "Collaborative review", value: "7", right: "10d Baseline" },
      { label: "Commercial", value: "1", right: "9d Baseline" },
    ],
  },
  {
    title: "SLA Compliance",
    value: "87%",
    aside: "8 SLA Tagged",
    trend: "+21%",
    trendKind: "up",
    baseline: "72%",
    individualItems: [
      { label: "Intake", value: "75%", right: "25% Baseline" },
      { label: "Sales", value: "67%", right: "81% Baseline" },
      { label: "Engineering", value: "96%", right: "82% Baseline" },
      { label: "Operations", value: "100%", right: "58% Baseline" },
      { label: "Collaborative review", value: "77%", right: "93% Baseline" },
      { label: "Commercial", value: "91%", right: "79% Baseline" },
    ],
    collectiveItems: [
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
    value: "8",
    trend: "-47%",
    trendKind: "down-good",
    baseline: "7",
    individualItems: [
      { label: "Intake", value: "1", right: "0 Baseline" },
      { label: "Sales", value: "2", right: "1 Baseline" },
      { label: "Engineering", value: "1", right: "1 Baseline" },
      { label: "Operations", value: "0", right: "0 Baseline" },
      { label: "Collaborative review", value: "3", right: "0 Baseline" },
      { label: "Commercial", value: "1", right: "0 Baseline" },
    ],
    collectiveItems: [
      { label: "Intake", value: "0", right: "0 Baseline" },
      { label: "Sales", value: "2", right: "1 Baseline" },
      { label: "Engineering", value: "13", right: "1 Baseline" },
      { label: "Operations", value: "2", right: "0 Baseline" },
      { label: "Collaborative review", value: "6", right: "0 Baseline" },
      { label: "Commercial", value: "1", right: "0 Baseline" },
    ],
  },
  {
    title: "Artifacts Uploaded",
    value: "130",
    trend: "+29%",
    trendKind: "up",
    baseline: "101",
    individualItems: [
      { label: "Calculations", value: "55", right: "12 Revised" },
      { label: "Drawings", value: "50", right: "4 Revised" },
      { label: "Quotations", value: "25", right: "0 Revised" },
    ],
    collectiveItems: [
      { label: "Calculations", value: "55", right: "12 Revised" },
      { label: "Drawings", value: "50", right: "4 Revised" },
      { label: "Quotations", value: "25", right: "0 Revised" },
    ],
  },
];

const breakdownBoxPad =
  "px-3 pt-2 pb-[22px] lg:px-2 lg:pt-2 lg:pb-3";

const breakdownCellPad =
  "px-0 py-3 lg:pr-2 lg:pt-2 lg:pb-3";

function BreakdownFootnote({ text }: { text: string }) {
  return (
    <div className="mt-2 flex items-stretch gap-2">
      <span className="w-[2px] shrink-0 bg-[#DBDDE2]" aria-hidden />
      <p className="min-w-0 text-[10px] leading-[140%] tracking-[-0.04em] text-[rgba(29,54,80,0.65)]">
        {text}
      </p>
    </div>
  );
}

function trendColor(kind: TrendKind) {
  return kind === "bad" ? "text-[#B3261E]" : "text-[#067647]";
}

function Trend({ value, kind }: { value: string; kind: TrendKind }) {
  const Arrow = kind === "down-good" ? IconArrowDown : IconArrowUp;
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-end gap-0.5 self-end text-[10px] leading-[14px] tracking-[-0.4px] lg:gap-0.5 min-[1700px]:gap-1",
        trendColor(kind),
      )}
    >
      <span className="inline-flex items-center gap-0.5 whitespace-nowrap font-[500]">
        <Arrow size={12} />
        {value}
      </span>
      <span className="hidden whitespace-nowrap font-[400] min-[1700px]:inline">
        vs last month
      </span>
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
  const fadeTimer = useRef<number | null>(null);
  const [pill, setPill] = useState({
    left: 0,
    width: 0,
    ready: false,
  });
  const [pillVisible, setPillVisible] = useState(true);
  const [displayMode, setDisplayMode] = useState(mode);

  useLayoutEffect(() => {
    const idx = options.findIndex((o) => o.id === displayMode);
    const btn = btnRefs.current[idx];
    if (!btn) return;
    setPill({
      left: btn.offsetLeft,
      width: btn.offsetWidth,
      ready: true,
    });
  }, [displayMode]);

  useEffect(() => {
    return () => {
      if (fadeTimer.current) window.clearTimeout(fadeTimer.current);
    };
  }, []);

  function selectMode(next: LeadMode) {
    if (next === mode) return;
    if (fadeTimer.current) window.clearTimeout(fadeTimer.current);
    setPillVisible(false);
    onChange(next);
    fadeTimer.current = window.setTimeout(() => {
      setDisplayMode(next);
      fadeTimer.current = window.setTimeout(() => setPillVisible(true), 30);
    }, 280);
  }

  return (
    <div className="relative inline-flex w-full rounded-[8px] border border-[rgba(13,24,61,0.10)] bg-white p-1 lg:w-auto lg:border-[rgba(13,24,61,0.15)]">
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute top-1 bottom-1 rounded-[6px] border border-[#F6861F] bg-icr-tint transition-opacity duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
          pill.ready && pillVisible ? "opacity-100" : "opacity-0",
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
          onClick={() => selectMode(opt.id)}
          className={cn(
            "relative z-10 flex-1 rounded-[6px] px-2.5 py-1 text-xs font-medium leading-[15.6px] transition-colors duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)] lg:flex-none",
            displayMode === opt.id
              ? "text-icr-orange"
              : "text-[rgba(29,54,80,0.8)]",
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function CollapseToggle({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden
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
    </span>
  );
}

function BreakdownHint({ hint }: { hint: string }) {
  return (
    <div className="mb-2 flex flex-wrap items-center gap-2 text-[10px] leading-[140%] tracking-[-0.04em] text-icr-navy">
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
  items,
  metricTitle,
  tone = "colored",
}: {
  items: BreakdownItem[];
  metricTitle: string;
  tone?: "muted" | "colored";
}) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <div
          className="flex items-start justify-between gap-2 text-[10px] leading-[140%] tracking-[-0.04em] text-icr-navy"
          key={`${metricTitle}-${item.label}`}
        >
          <div className="flex min-w-0 flex-1 items-end gap-1">
            <span className="shrink-0 font-[500]">{item.value}</span>
            <span className="min-w-0 font-[400]">{item.label}</span>
          </div>
          {item.right ? (
            <div className="flex shrink-0 items-center gap-1 whitespace-nowrap text-right">
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

function MetricHoverTooltip({
  metric,
  align = "start",
}: {
  metric: Metric;
  align?: "start" | "end";
}) {
  if (metric.individualItems.length === 0) return null;
  return (
    <div
      className={cn(
        "pointer-events-none absolute top-full z-[60] mt-1 hidden w-max origin-top",
        "rounded-[12px] border border-[#E8EEF4] bg-white py-2.5 pl-4 pr-2",
        "opacity-0 shadow-[0_8px_28px_rgba(16,24,40,0.14)]",
        "transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]",
        "group-hover/metric:opacity-100",
        "lg:block lg:min-w-[148px] lg:max-w-[min(320px,calc(100vw-4rem))]",
        "2xl:left-0 2xl:right-auto 2xl:min-w-full 2xl:max-w-none 2xl:origin-top-left",
        align === "end"
          ? "right-0 left-auto origin-top-right 2xl:left-0 2xl:right-auto"
          : "left-0 origin-top-left",
      )}
    >
      <div className="mb-2 text-[10px] font-medium tracking-wide text-[#6A7282] uppercase">
        Current month breakdown
      </div>
      {metric.hint ? <BreakdownHint hint={metric.hint} /> : null}
      <BreakdownItems
        items={metric.individualItems}
        metricTitle={`hover-${metric.title}`}
        tone="colored"
      />
    </div>
  );
}

function MetricTop({
  metric,
  individualOpen,
  collectiveOpen,
  animMode,
  isFadingOut,
  onToggle,
  showDivider,
  isLast,
  tooltipAlign = "start",
}: {
  metric: Metric;
  individualOpen: boolean;
  collectiveOpen: boolean;
  animMode: ExpandAnim;
  isFadingOut: boolean;
  onToggle: () => void;
  showDivider: boolean;
  isLast: boolean;
  tooltipAlign?: "start" | "end";
}) {
  const showPanel = individualOpen || isFadingOut;
  const [fadeVisible, setFadeVisible] = useState(false);

  useEffect(() => {
    if (!showPanel) {
      setFadeVisible(false);
      return;
    }
    if (animMode !== "fade") {
      setFadeVisible(true);
      return;
    }
    if (isFadingOut) {
      setFadeVisible(false);
      return;
    }
    setFadeVisible(false);
    const t = window.setTimeout(() => setFadeVisible(true), 20);
    return () => window.clearTimeout(t);
  }, [showPanel, animMode, isFadingOut, metric.title]);

  const useHeight = animMode === "height";
  const panelOpacity =
    useHeight || fadeVisible ? "opacity-100" : "opacity-0";
  const headerShifted = useHeight ? showPanel : fadeVisible;

  return (
    <div
      className={cn(
        "group/metric relative flex h-full min-w-0 flex-col gap-1.5 border-b border-[#DBDDE2] px-0 py-2 lg:gap-2 lg:border-b-0 lg:pr-2 lg:pt-2 2xl:gap-3 2xl:pr-4",
        "transition-[padding] motion-reduce:transition-none",
        collapseEase,
        collectiveOpen ? "pb-0 lg:pb-0" : "pb-3 lg:pb-4",
        showDivider ? "lg:pl-2.5 2xl:pl-4" : "lg:pl-3 2xl:pl-3",
        isLast && "border-b-0",
        "lg:hover:z-50",
      )}
    >
      {showDivider ? (
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute top-0 left-0 hidden w-px bg-[#DBDDE2] lg:block",
            collectiveOpen ? "bottom-0" : "bottom-3 lg:bottom-4",
          )}
        />
      ) : null}
      <button
        type="button"
        aria-expanded={showPanel}
        onClick={onToggle}
        className={cn(
          "flex w-full cursor-pointer items-center gap-1.5 border-0 bg-transparent p-0 text-left transition-transform motion-reduce:transition-none lg:justify-between lg:gap-1 2xl:gap-2",
          fadeEase,
          headerShifted && "lg:translate-x-[5px]",
        )}
      >
        <span className="min-w-0 text-xs font-medium leading-[16.2px] text-[rgba(29,54,80,0.8)] lg:flex-1 lg:text-[11px] lg:leading-[15px] 2xl:text-sm 2xl:leading-[18.9px]">
          {metric.title}
        </span>
        <CollapseToggle open={showPanel} />
      </button>

      <div className="relative">
        <button
          type="button"
          onClick={onToggle}
          className="flex w-full min-w-0 cursor-pointer flex-col gap-2 border-0 bg-transparent p-0 text-left 2xl:gap-3"
        >
          <div className="flex w-full min-w-0 flex-wrap items-end gap-x-1.5 gap-y-1 min-[1700px]:gap-1">
            <div className="shrink-0 text-lg font-medium leading-[24.3px] tracking-normal text-icr-navy lg:text-xl lg:leading-[28px] lg:tracking-[-0.04em] 2xl:text-2xl 2xl:leading-[32.4px] 2xl:tracking-[-0.05em]">
              {metric.value}
            </div>
            {metric.aside ? (
              <div className="shrink-0 pb-0.5 text-[10px] leading-3 whitespace-nowrap text-[#475467] lg:text-[10px] lg:leading-[12px] 2xl:text-sm 2xl:leading-none 2xl:tracking-[-0.05em]">
                {metric.aside}
              </div>
            ) : null}
            <Trend value={metric.trend} kind={metric.trendKind} />
          </div>
          <div className="flex items-center gap-1 pb-1 text-[10px] leading-[14px] tracking-[-0.4px] text-[#475467] lg:pb-0">
            <span className="font-[400]">Baseline Median</span>
            <span className="font-[500]">{metric.baseline}</span>
          </div>
        </button>
        {!showPanel ? (
          <MetricHoverTooltip metric={metric} align={tooltipAlign} />
        ) : null}
      </div>

      <div
        className={cn(
          "lg:-mr-2",
          useHeight
            ? cn(
                collapseGrid,
                showPanel ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )
            : cn(
                "grid",
                showPanel ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              ),
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <button
            type="button"
            onClick={onToggle}
            className={cn(
              "w-full cursor-pointer border-0 bg-[#F8F9FA] text-left",
              breakdownBoxPad,
              collectiveOpen ? "rounded-t-lg rounded-b-none" : "rounded-lg",
              !useHeight &&
                cn(
                  "transition-opacity motion-reduce:transition-none",
                  fadeEase,
                ),
              panelOpacity,
            )}
          >
            <div className="mb-2 text-[10px] font-medium tracking-wide text-[#6A7282] uppercase">
              Current month breakdown
            </div>
            {metric.hint ? <BreakdownHint hint={metric.hint} /> : null}
            <BreakdownItems
              items={metric.individualItems}
              metricTitle={metric.title}
              tone="muted"
            />
            {metric.footnote ? (
              <BreakdownFootnote text={metric.footnote} />
            ) : null}
          </button>
        </div>
      </div>
    </div>
  );
}

function CollectiveCell({
  metric,
  showDivider,
  isLast,
  fading,
}: {
  metric: Metric;
  showDivider: boolean;
  isLast: boolean;
  fading: boolean;
}) {
  return (
    <div className="relative h-full">
      {showDivider ? (
        <span
          aria-hidden
          className="pointer-events-none absolute top-0 bottom-3 left-0 hidden w-px bg-[#DBDDE2] lg:block"
        />
      ) : null}
      <div
        className={cn(
          breakdownCellPad,
          showDivider ? "lg:pl-2.5 2xl:pl-4" : "lg:pl-3",
          "transition-opacity motion-reduce:transition-none",
          fadeEase,
          fading ? "opacity-0" : "opacity-100",
        )}
      >
        {metric.collectiveHint ? (
          <BreakdownHint hint={metric.collectiveHint} />
        ) : null}
        <BreakdownItems
          items={metric.collectiveItems}
          metricTitle={metric.title}
          tone="colored"
        />
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
  const [animModes, setAnimModes] = useState<Record<string, ExpandAnim>>({});
  const [fadingKeys, setFadingKeys] = useState<string[]>([]);
  const [collectiveOpen, setCollectiveOpen] = useState(false);
  const [breakdown, setBreakdown] = useState<Breakdown>("department");
  const [breakdownFading, setBreakdownFading] = useState(false);
  const anyIndividual = openKeys.length > 0;
  const mobileAllOpen =
    metrics.length > 0 && openKeys.length === metrics.length;
  const showBreakdownTabs = mobileAllOpen;
  const showBreakdownTabsDesktop = collectiveOpen;
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
    setAnimModes({});
    setFadingKeys([]);
    setCollectiveOpen(false);
    setBreakdown("department");
    setBreakdownFading(false);
  }, [title]);

  function selectBreakdown(next: Breakdown) {
    if (next === breakdown || breakdownFading) return;
    setBreakdownFading(true);
    window.setTimeout(() => {
      setBreakdown(next);
      window.setTimeout(() => setBreakdownFading(false), 20);
    }, fadeMs);
  }

  function toggleOne(metricTitle: string) {
    if (fadingKeys.includes(metricTitle)) return;
    const desktop = window.matchMedia("(min-width: 1024px)").matches;

    if (openKeys.includes(metricTitle)) {
      if (openKeys.length === 1 || !desktop) {
        setAnimModes((m) => ({ ...m, [metricTitle]: "height" }));
        setOpenKeys((curr) => curr.filter((t) => t !== metricTitle));
        return;
      }
      setAnimModes((m) => ({ ...m, [metricTitle]: "fade" }));
      setFadingKeys((keys) => [...keys, metricTitle]);
      window.setTimeout(() => {
        setOpenKeys((curr) => curr.filter((t) => t !== metricTitle));
        setFadingKeys((keys) => keys.filter((t) => t !== metricTitle));
      }, fadeMs);
      return;
    }

    const mode: ExpandAnim =
      !desktop || openKeys.length === 0 ? "height" : "fade";
    setAnimModes((m) => ({ ...m, [metricTitle]: mode }));
    setOpenKeys((curr) => [...curr, metricTitle]);
  }

  function toggleFooterBreakdown() {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (isDesktop) {
      setCollectiveOpen((v) => !v);
      return;
    }
    setOpenKeys((curr) => {
      if (curr.length === metrics.length) {
        const nextModes: Record<string, ExpandAnim> = {};
        metrics.forEach((m) => {
          nextModes[m.title] = "height";
        });
        setAnimModes(nextModes);
        setFadingKeys([]);
        return [];
      }
      const nextModes: Record<string, ExpandAnim> = {};
      metrics.forEach((m) => {
        nextModes[m.title] = "height";
      });
      setAnimModes(nextModes);
      setFadingKeys([]);
      return metrics.map((m) => m.title);
    });
  }

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-[14px] border border-[#DBDDE2] bg-white pt-3 lg:overflow-visible">
      <div className="relative z-10 flex flex-col gap-2 overflow-visible px-3 lg:gap-4 lg:px-0">
        <div className="flex flex-col items-stretch gap-2 lg:h-8 lg:flex-row lg:items-center lg:justify-between lg:gap-3 lg:px-3">
          <h3 className="m-0 text-xs font-medium leading-[15px] text-icr-navy lg:text-sm lg:leading-[17.5px]">
            {title}
          </h3>
          <div
            className={cn(
              "overflow-hidden transition-opacity motion-reduce:transition-none",
              fadeEase,
              showBreakdownTabs
                ? "pointer-events-auto max-h-20 opacity-100"
                : "pointer-events-none max-h-0 opacity-0",
              showBreakdownTabsDesktop
                ? "lg:pointer-events-auto lg:max-h-20 lg:opacity-100"
                : "lg:pointer-events-none lg:max-h-0 lg:opacity-0",
            )}
          >
            <div className="min-h-0">
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
                  onClick={() => selectBreakdown("department")}
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
                  onClick={() => selectBreakdown("region")}
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
            <div
              key={m.title}
              className="relative z-0 min-w-0 overflow-visible lg:h-full lg:hover:z-50"
            >
              <MetricTop
                metric={m}
                individualOpen={openKeys.includes(m.title)}
                collectiveOpen={collectiveOpen}
                animMode={animModes[m.title] ?? "height"}
                isFadingOut={fadingKeys.includes(m.title)}
                onToggle={() => toggleOne(m.title)}
                showDivider={i > 0}
                isLast={i === metrics.length - 1}
                tooltipAlign={i >= metrics.length - 2 ? "end" : "start"}
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
            <div className="grid grid-cols-1 lg:grid-cols-5 lg:items-stretch">
              {metrics.map((m, i) => (
                <CollectiveCell
                  key={m.title}
                  metric={m}
                  showDivider={i > 0}
                  isLast={i === metrics.length - 1}
                  fading={breakdownFading}
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
  const showOpen = mode === "open" || mode === "both";
  const showClosed = mode === "closed" || mode === "both";

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

      <div className="flex flex-col">
        <div
          className={cn(
            collapseGrid,
            showOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
        >
          <div
            className={cn(
              "min-h-0",
              showOpen ? "overflow-visible" : "overflow-hidden",
            )}
          >
            <div
              className={cn(showOpen && showClosed && "mb-4 lg:mb-6")}
            >
              <SummaryPanel
                title="Open Leads this month"
                metrics={openMetrics}
              />
            </div>
          </div>
        </div>
        <div
          className={cn(
            collapseGrid,
            showClosed ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
        >
          <div
            className={cn(
              "min-h-0",
              showClosed ? "overflow-visible" : "overflow-hidden",
            )}
          >
            <SummaryPanel
              title="Closed Leads this month"
              metrics={closedMetrics}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

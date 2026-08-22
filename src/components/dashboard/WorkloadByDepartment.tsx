"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useDashboardFilters } from "@/components/dashboard/DashboardFilters";
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

type DetailRow = {
  count: string;
  label: string;
  avg: string;
};

type Artifact = {
  count: string;
  label: string;
};

type Dept = {
  name: string;
  icon: string;
  velocity: string;
  baseline: string;
  active: number;
  change: string;
  up: boolean;
  details: DetailRow[];
  artifacts?: Artifact[];
};

const departments: Dept[] = [
  {
    name: "Intake",
    icon: "/assets/icons/intake.svg",
    velocity: "1d",
    baseline: "8d",
    active: 8,
    change: "+33%",
    up: true,
    details: [
      { count: "8", label: "At Risk", avg: "2d" },
      { count: "8", label: "Breached", avg: "4d" },
    ],
  },
  {
    name: "Sales",
    icon: "/assets/icons/sales.png",
    velocity: "2d",
    baseline: "9d",
    active: 34,
    change: "+10%",
    up: true,
    details: [
      { count: "8", label: "At Risk", avg: "2d" },
      { count: "8", label: "Breached", avg: "4d" },
    ],
  },
  {
    name: "Engineering",
    icon: "/assets/icons/engineering.svg",
    velocity: "14d",
    baseline: "12d",
    active: 61,
    change: "+13%",
    up: true,
    details: [
      { count: "8", label: "At Risk", avg: "2d" },
      { count: "8", label: "Breached", avg: "4d" },
    ],
    artifacts: [
      { count: "21", label: "Calculation" },
      { count: "52", label: "Drawings" },
    ],
  },
  {
    name: "Operations",
    icon: "/assets/icons/operations.svg",
    velocity: "3.5d",
    baseline: "7.5d",
    active: 14,
    change: "-12%",
    up: false,
    details: [
      { count: "8", label: "At Risk", avg: "2d" },
      { count: "8", label: "Breached", avg: "4d" },
    ],
  },
  {
    name: "Collaborative review",
    icon: "/assets/icons/Collaborative.svg",
    velocity: "4d",
    baseline: "9d",
    active: 28,
    change: "+12%",
    up: true,
    details: [
      { count: "8", label: "At Risk", avg: "2d" },
      { count: "8", label: "Breached", avg: "4d" },
    ],
  },
  {
    name: "Commercial",
    icon: "/assets/icons/commercial.svg",
    velocity: "9d",
    baseline: "10d",
    active: 30,
    change: "+11%",
    up: true,
    details: [
      { count: "8", label: "At Risk", avg: "2d" },
      { count: "8", label: "Breached", avg: "4d" },
    ],
    artifacts: [{ count: "21", label: "Quotations" }],
  },
];

function WorkloadTooltip({ dept }: { dept: Dept }) {
  return (
    <div className="pointer-events-none absolute top-full left-0 z-30 mt-1 hidden w-max min-w-[148px] origin-top scale-[0.98] rounded-[10px] border border-[#E8EEF4] bg-white px-3 py-2.5 opacity-0 shadow-[0_8px_28px_rgba(16,24,40,0.14)] transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/dept:scale-100 group-hover/dept:opacity-100 lg:block">
      <div className="mb-2 text-[10px] font-medium leading-[14px] tracking-[0.04em] text-[#6A7282] uppercase">
        {dept.name}
      </div>
      <div className="flex flex-col gap-1.5">
        {dept.details.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between gap-3"
          >
            <div className="flex items-end gap-1 text-[10px] leading-[14px] text-icr-navy">
              <span className="font-medium">{row.count}</span>
              <span className="font-normal">{row.label}</span>
            </div>
            <div className="flex items-center gap-1 whitespace-nowrap text-[10px] leading-[14px] text-[#617285]">
              <span className="font-medium text-icr-navy">{row.avg}</span>
              <span className="font-normal">Avg time</span>
            </div>
          </div>
        ))}
      </div>
      {dept.artifacts ? (
        <div className="mt-2.5 flex flex-col gap-1.5 border-t border-[#E8EEF4] pt-2.5">
          <div className="text-xs font-medium leading-[14.4px] text-icr-navy">
            Artifacts
          </div>
          <div className="flex flex-wrap items-center gap-1.5 text-[10px] leading-[14px] text-icr-navy">
            {dept.artifacts.map((a, i) => (
              <span key={a.label} className="inline-flex items-center gap-1.5">
                {i > 0 ? (
                  <span className="size-[2.5px] rounded-full bg-[rgba(29,54,80,0.45)]" />
                ) : null}
                <span className="inline-flex items-end gap-1">
                  <span className="font-medium">{a.count}</span>
                  <span className="font-normal">{a.label}</span>
                </span>
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function DesktopChevron({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "hidden shrink-0 items-center justify-center rounded p-1.5 lg:inline-flex",
        open
          ? "bg-[rgba(246,134,31,0.12)] text-icr-orange ring-1 ring-icr-orange"
          : "bg-[#F8F9FA] text-icr-navy",
      )}
    >
      <span className={cn(chevronMotion, open && "rotate-180")}>
        <IconChevronDown size={12} />
      </span>
    </span>
  );
}

function columnPad(isFirst: boolean, isLast: boolean) {
  return cn(!isFirst && "lg:pl-4", !isLast && "lg:pr-4");
}

function MobileBreakdown({ dept }: { dept: Dept }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg bg-[#F8F9FA] px-3 py-3">
      <div className="flex flex-col gap-2">
        {dept.details.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between gap-2"
          >
            <div className="flex items-end gap-1">
              <span className="text-[10px] font-medium leading-[14px] tracking-[-0.4px] text-icr-navy">
                {row.count}
              </span>
              <span className="text-[10px] leading-[14px] tracking-[-0.4px] text-icr-navy">
                {row.label}
              </span>
            </div>
            <div className="flex items-center gap-1 whitespace-nowrap text-[10px] leading-[14px] tracking-[-0.4px] text-[#617285]">
              <span className="font-[500] text-icr-navy">{row.avg}</span>
              <span className="font-[400]">Avg time</span>
            </div>
          </div>
        ))}
      </div>

      {dept.artifacts ? (
        <div className="flex flex-col gap-2">
          <div className="text-xs font-medium leading-[14.4px] text-icr-navy">
            Artifacts
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {dept.artifacts.map((a, i) => (
              <div key={a.label} className="flex items-center gap-2">
                {i > 0 ? (
                  <span className="h-[2.5px] w-[2.5px] rounded-full bg-[rgba(29,54,80,0.45)]" />
                ) : null}
                <div className="flex items-end gap-1">
                  <span className="text-[10px] font-medium leading-[14px] text-icr-navy">
                    {a.count}
                  </span>
                  <span className="text-[10px] leading-[14px] text-icr-navy">
                    {a.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <button
        type="button"
        className="inline-flex w-full items-center gap-1.5 text-[10px] font-medium leading-[17.44px] text-icr-navy"
      >
        <span className="min-w-0 flex-1 text-left">Filter in Lead Register</span>
        <IconChevronDown size={14} />
      </button>
    </div>
  );
}

function DeptColumn({
  dept,
  detailsOpen,
  individualOpen,
  onToggleIndividual,
  isFirst,
  isLast,
  highlighted,
}: {
  dept: Dept;
  detailsOpen: boolean;
  individualOpen: boolean;
  onToggleIndividual: () => void;
  isFirst: boolean;
  isLast: boolean;
  highlighted: boolean;
}) {
  const Arrow = dept.up ? IconArrowUp : IconArrowDown;

  return (
    <div
      className={cn(
        "group/dept relative flex h-full min-w-0 flex-col",
        highlighted && "bg-[rgba(246,134,31,0.06)]",
        "hover:z-30",
        columnPad(isFirst, isLast),
      )}
    >
      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={onToggleIndividual}
          className="flex w-full items-center gap-1 py-1 text-left lg:pointer-events-none"
        >
          <span className="inline-flex size-[18px] shrink-0">
            <img
              src={dept.icon}
              alt=""
              width={18}
              height={18}
              className="size-[18px]"
            />
          </span>
          <div
            className={cn(
              "min-w-0 truncate text-xs font-medium leading-[16.8px]",
              highlighted
                ? "text-icr-orange"
                : "text-[rgba(29,54,80,0.80)] lg:text-icr-navy",
            )}
          >
            {dept.name}
          </div>
          <span className="inline-flex shrink-0 text-icr-navy lg:hidden">
            {individualOpen ? (
              <IconChevronDown size={12} />
            ) : (
              <IconChevronRight size={12} />
            )}
          </span>
          <DesktopChevron open={detailsOpen} />
        </button>

        <div className="flex flex-col gap-2">
          <div className="flex items-end gap-1">
            <span className="text-lg font-medium leading-[24.3px] text-icr-navy lg:text-xl lg:leading-[27px] lg:tracking-[-0.6px]">
              {dept.velocity}
            </span>
            <span className="pb-0.5 text-[10px] leading-[14px] tracking-[-0.4px] text-icr-navy">
              Velocity Time
            </span>
          </div>

          <div className="flex items-center gap-1 border-t border-[#DBDDE2] pt-2 text-[10px] leading-[14px] tracking-[-0.4px] text-[#475467] lg:border-0 lg:pt-0">
            <span className="font-[400]">Baseline Median</span>
            <span className="font-[500]">{dept.baseline}</span>
          </div>

          <div className="relative border-t border-[#DBDDE2] pt-2">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-end gap-1">
                <span className="text-xs font-medium leading-[14.4px] tracking-[-0.36px] text-icr-navy">
                  {dept.active}
                </span>
                <span className="text-[10px] leading-[14px] tracking-[-0.4px] text-icr-navy">
                  Active
                </span>
              </div>
              <div
                className={cn(
                  "inline-flex items-center gap-1 text-[10px] leading-[14px] tracking-[-0.4px]",
                  dept.up ? "text-[#067647]" : "text-[#B3261E]",
                )}
              >
                <span className="inline-flex items-center gap-0.5 font-[500]">
                  <Arrow size={12} />
                  {dept.change}
                </span>
                <span className="font-[400] text-[rgba(29,54,80,0.70)]">
                  vs last month
                </span>
              </div>
            </div>
            {!detailsOpen ? <WorkloadTooltip dept={dept} /> : null}
          </div>
        </div>

        <div
          className={cn(
            collapseGrid,
            "lg:hidden",
            individualOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="pt-1">
              <MobileBreakdown dept={dept} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BreakdownCell({
  dept,
  isFirst,
  isLast,
}: {
  dept: Dept;
  isFirst: boolean;
  isLast: boolean;
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col gap-3 py-3",
        columnPad(isFirst, isLast),
      )}
    >
      <div className="flex flex-col gap-3">
        {dept.details.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between gap-2"
          >
            <div className="flex items-end gap-1">
              <span className="text-[10px] font-medium leading-[14px] tracking-[-0.4px] text-icr-navy">
                {row.count}
              </span>
              <span className="text-[10px] leading-[14px] tracking-[-0.4px] text-icr-navy">
                {row.label}
              </span>
            </div>
            <div className="flex items-center gap-1 whitespace-nowrap text-[10px] leading-[14px] tracking-[-0.4px] text-[#617285]">
              <span className="font-[500] text-icr-navy">{row.avg}</span>
              <span className="font-[400]">Avg time</span>
            </div>
          </div>
        ))}
      </div>

      {dept.artifacts ? (
        <div className="flex flex-col gap-3">
          <div className="text-xs font-medium leading-[14.4px] text-icr-navy">
            Artifacts
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {dept.artifacts.map((a, i) => (
              <div key={a.label} className="flex items-center gap-2">
                {i > 0 ? (
                  <span className="h-[2.5px] w-[2.5px] rounded-full bg-[rgba(29,54,80,0.45)]" />
                ) : null}
                <div className="flex items-end gap-1">
                  <span className="text-[10px] font-medium leading-[14px] text-icr-navy">
                    {a.count}
                  </span>
                  <span className="text-[10px] leading-[14px] text-icr-navy">
                    {a.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <button
        type="button"
        className="inline-flex w-full items-center gap-1.5 text-[10px] font-medium leading-[17.44px] text-icr-navy"
      >
        <span className="min-w-0 flex-1 text-left">Filter in Lead Register</span>
        <IconChevronDown size={14} />
      </button>
    </div>
  );
}

export function WorkloadByDepartment() {
  const { department, departmentActive } = useDashboardFilters();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const detailsRef = useRef<HTMLDivElement>(null);
  const [detailsHeight, setDetailsHeight] = useState(0);

  useLayoutEffect(() => {
    const el = detailsRef.current;
    if (!el) return;

    const measure = () => setDetailsHeight(el.scrollHeight);
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  function toggleIndividual(name: string) {
    if (window.matchMedia("(min-width: 1024px)").matches) return;
    setOpenKeys((curr) =>
      curr.includes(name) ? curr.filter((n) => n !== name) : [...curr, name],
    );
  }

  return (
    <section className="relative z-0 flex flex-col overflow-visible rounded-[10px] border border-[#DBDDE2] bg-white pt-4">
      <div className="flex flex-col gap-2 px-3 lg:flex-row lg:items-center lg:gap-2.5 lg:px-4">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
          <h2 className="m-0 text-sm font-medium leading-[17.5px] text-icr-navy lg:text-base lg:leading-5">
            Workload by department
          </h2>
          <FilterScopeBadge />
        </div>
        <div className="flex flex-wrap items-center gap-1">
          <span className="text-sm font-medium leading-[18.62px] text-icr-orange lg:text-base lg:leading-[21.28px]">
            24
          </span>
          <span className="text-xs leading-[16.2px] text-icr-orange lg:text-sm lg:leading-[18.9px]">
            Awaiting Project number
          </span>
          <span className="mx-0.5 inline-flex items-center self-stretch pt-0.5">
            <span className="h-[2.5px] w-[2.5px] rounded-full bg-[rgba(29,54,80,0.45)]" />
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] leading-[14px] text-[#475467] lg:text-xs lg:leading-[16.8px]">
            <span className="font-normal">Oldest</span>
            <span className="font-medium">4d</span>
          </span>
        </div>
      </div>

      <div className="mt-4 px-3 lg:px-4">
        <div className="flex flex-col items-stretch lg:flex-row lg:items-stretch">
          {departments.map((dept, i) => (
            <div
              key={dept.name}
              className={cn(
                "relative min-w-0 flex-1 border-b border-[#DBDDE2] py-4 last:border-b-0 lg:border-b-0 lg:py-0 lg:pb-3",
                i > 0 && "lg:border-l lg:border-[#DBDDE2]",
              )}
            >
              <DeptColumn
                dept={dept}
                detailsOpen={detailsOpen}
                individualOpen={openKeys.includes(dept.name)}
                onToggleIndividual={() => toggleIndividual(dept.name)}
                isFirst={i === 0}
                isLast={i === departments.length - 1}
                highlighted={departmentActive && department === dept.name}
              />
            </div>
          ))}
        </div>
      </div>

      <div
        className="hidden overflow-hidden motion-reduce:transition-none lg:block"
        style={{
          height: detailsOpen ? detailsHeight : 0,
          transition: `height ${collapseMs}ms ease-in-out`,
        }}
      >
        <div ref={detailsRef}>
          <div className="rounded-b-[14px] border-t-[0.5px] border-[#DBDDE2] bg-[#F8F9FA]">
            <div className="px-3 lg:px-4">
              <div className="flex flex-col lg:flex-row">
                {departments.map((dept, i) => (
                  <div
                    key={dept.name}
                    className={cn(
                      "min-w-0 flex-1 border-b border-[#DBDDE2] last:border-b-0 lg:border-b-0",
                      i > 0 && "lg:border-l lg:border-[#DBDDE2]",
                    )}
                  >
                    <BreakdownCell
                      dept={dept}
                      isFirst={i === 0}
                      isLast={i === departments.length - 1}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden h-9 items-center gap-3 border-t border-[#DBDDE2] bg-[linear-gradient(0deg,rgba(246,134,31,0.005),rgba(246,134,31,0.005)),#fff] py-2 pr-0.5 pl-3 lg:flex lg:h-[49px]">
        <button
          type="button"
          onClick={() => setDetailsOpen((v) => !v)}
          className="inline-flex items-center gap-1.5 text-[10px] font-medium leading-[17.44px] text-icr-orange lg:text-xs"
        >
          {detailsOpen
            ? "Hide Current month details"
            : "View Current month details"}
          <span className={cn(chevronMotion, detailsOpen && "rotate-180")}>
            <IconArrowDown size={14} />
          </span>
        </button>
      </div>
    </section>
  );
}

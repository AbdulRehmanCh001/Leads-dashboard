"use client";

import { useState } from "react";
import { useDashboardFilters } from "@/components/dashboard/DashboardFilters";
import { FilterScopeBadge } from "@/components/dashboard/FilterScopeBadge";
import { IconArrowDown, IconArrowUp, IconChevronDown } from "@/components/icons";
import { cn } from "@/lib/utils";

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

function ChevronBtn({
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
        "inline-flex shrink-0 items-center justify-center rounded p-1.5 transition-colors duration-200",
        open
          ? "bg-[rgba(246,134,31,0.06)] text-icr-orange ring-1 ring-icr-orange"
          : "bg-[#F8F9FA] text-icr-navy",
      )}
    >
      <span
        className={cn(
          "inline-flex transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          open && "rotate-180",
        )}
      >
        <IconChevronDown size={12} />
      </span>
    </button>
  );
}

function DeptColumn({
  dept,
  open,
  onToggle,
  showDetails,
  isFirst,
  highlighted,
}: {
  dept: Dept;
  open: boolean;
  onToggle: () => void;
  showDetails: boolean;
  isFirst: boolean;
  highlighted: boolean;
}) {
  const Arrow = dept.up ? IconArrowUp : IconArrowDown;
  const detailsVisible = showDetails && open;
  const pad = isFirst ? "lg:pr-4" : "lg:px-4";

  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 flex-col rounded-lg transition-colors duration-200",
        highlighted && "bg-[rgba(246,134,31,0.06)]",
      )}
    >
      <div className="flex flex-col gap-3">
        <div className={cn("flex items-center gap-1 py-1", pad)}>
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
              "min-w-0 flex-1 truncate text-xs font-medium leading-[16.8px]",
              highlighted
                ? "text-icr-orange"
                : "text-[rgba(29,54,80,0.80)] lg:text-icr-navy",
            )}
          >
            {dept.name}
          </div>
          <ChevronBtn open={open && showDetails} onClick={onToggle} />
        </div>

        <div className={cn("flex flex-col gap-2", pad)}>
          <div className="flex flex-col gap-3 lg:gap-2">
            <div className="flex items-end gap-1">
              <span className="text-lg font-medium leading-[14.4px] text-icr-navy lg:text-xl lg:tracking-[-0.6px]">
                {dept.velocity}
              </span>
              <span className="pb-px text-[10px] leading-[14px] tracking-[-0.4px] text-icr-navy">
                Velocity Time
              </span>
            </div>
            <div className="flex items-center gap-1 text-[10px] leading-[14px] tracking-[-0.4px] text-[#475467]">
              <span className="font-normal">Baseline Median</span>
              <span className="font-medium">{dept.baseline}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 border-t border-[#DBDDE2] py-2">
            <div className="flex items-end gap-1">
              <span className="text-xs font-medium leading-[14.4px] tracking-[-0.36px] text-icr-navy">
                {dept.active}
              </span>
              <span className="text-[10px] leading-[14px] tracking-[-0.4px] text-icr-navy">
                Active
              </span>
            </div>
            <div className="inline-flex items-center gap-1 text-[10px] leading-[14px] tracking-[-0.4px] text-[#617285]">
              <span className="inline-flex items-center gap-0.5 font-medium">
                <Arrow size={12} />
                {dept.change}
              </span>
              <span className="font-normal">vs last month</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          detailsVisible ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className={cn(
              "pt-2 pb-4 transition-opacity duration-300",
              pad,
              detailsVisible ? "opacity-100" : "opacity-0",
            )}
          >
            <div className="flex min-h-[145px] flex-col gap-4 rounded-lg bg-[#F8F9F9] p-2">
              <div className="flex flex-1 flex-col gap-2">
                {dept.details.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-2"
                  >
                    <div className="flex items-end gap-1">
                      <span className="text-[10px] font-medium leading-[14px] text-icr-navy">
                        {row.count}
                      </span>
                      <span className="text-[10px] leading-[14px] text-icr-navy">
                        {row.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] leading-[14px] text-[#617285]">
                      <span className="font-medium">{row.avg}</span>
                      <span className="font-normal">Avg time</span>
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
                <span className="min-w-0 flex-1 text-left">
                  Filter in Lead Register
                </span>
                <IconChevronDown size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WorkloadByDepartment() {
  const { department, departmentActive } = useDashboardFilters();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  function toggleOne(name: string) {
    if (!detailsOpen) {
      setDetailsOpen(true);
      setOpenKeys([name]);
      return;
    }
    setOpenKeys((curr) => {
      const next = curr.includes(name)
        ? curr.filter((n) => n !== name)
        : [...curr, name];
      if (next.length === 0) setDetailsOpen(false);
      return next;
    });
  }

  function toggleAll() {
    if (detailsOpen) {
      setDetailsOpen(false);
      setOpenKeys([]);
      return;
    }
    setDetailsOpen(true);
    setOpenKeys(departments.map((d) => d.name));
  }

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-[#DBDDE2] bg-white pt-4 lg:rounded-2xl">
      <div className="flex flex-col gap-3 px-3 lg:flex-row lg:items-center lg:gap-2.5 lg:px-4">
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

      <div className="flex flex-col gap-2">
        <div className="flex flex-col items-stretch px-0 lg:flex-row lg:items-start lg:px-4">
          {departments.map((dept, i) => (
            <div
              key={dept.name}
              className={cn(
                "min-w-0 flex-1 border-b border-[#DBDDE2] px-3 py-4 last:border-b-0 lg:border-b-0 lg:px-0 lg:py-0",
                i > 0 && "lg:border-l lg:border-[#DBDDE2]",
              )}
            >
              <DeptColumn
                dept={dept}
                open={openKeys.includes(dept.name)}
                onToggle={() => toggleOne(dept.name)}
                showDetails={detailsOpen}
                isFirst={i === 0}
                highlighted={departmentActive && department === dept.name}
              />
            </div>
          ))}
        </div>

        <div className="flex h-9 items-center rounded-b-[13px] border border-[#DBDDE2] bg-white px-3 py-2 lg:h-[49px] lg:rounded-b-[14px] lg:border-0 lg:border-t">
          <button
            type="button"
            onClick={toggleAll}
            className="inline-flex items-center gap-1.5 text-[10px] font-medium leading-[17.44px] text-icr-orange lg:text-xs"
          >
            {detailsOpen
              ? "Hide Current month details"
              : "View Current month details"}
            <span
              className={cn(
                "inline-flex transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
                detailsOpen && "rotate-180",
              )}
            >
              <IconChevronDown size={14} />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

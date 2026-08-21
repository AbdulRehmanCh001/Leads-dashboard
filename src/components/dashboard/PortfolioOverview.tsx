"use client";

import { useMemo } from "react";
import { useDashboardFilters } from "@/components/dashboard/DashboardFilters";
import { FilterScopeBadge } from "@/components/dashboard/FilterScopeBadge";
import { IconInfo } from "@/components/icons";
import { cn } from "@/lib/utils";

type BarItem = {
  label: string;
  current: number;
  previous: number;
  completedLastMonth: number;
  baselineMedian: number;
};

const regionItems: BarItem[] = [
  {
    label: "North America",
    current: 91,
    previous: 78,
    completedLastMonth: 96,
    baselineMedian: 31,
  },
  {
    label: "EMEA",
    current: 79,
    previous: 72,
    completedLastMonth: 84,
    baselineMedian: 28,
  },
  {
    label: "APAC",
    current: 70,
    previous: 64,
    completedLastMonth: 73,
    baselineMedian: 24,
  },
];

const customerItems: BarItem[] = [
  {
    label: "North shore Energy",
    current: 17,
    previous: 14,
    completedLastMonth: 18,
    baselineMedian: 9,
  },
  {
    label: "Ardent Chemicals",
    current: 15,
    previous: 13,
    completedLastMonth: 16,
    baselineMedian: 8,
  },
  {
    label: "Bluewater systems",
    current: 14,
    previous: 12,
    completedLastMonth: 15,
    baselineMedian: 7,
  },
  {
    label: "Maritech Group",
    current: 13,
    previous: 11,
    completedLastMonth: 14,
    baselineMedian: 6,
  },
];

const productItems: BarItem[] = [
  {
    label: "Quickflange",
    current: 88,
    previous: 76,
    completedLastMonth: 92,
    baselineMedian: 30,
  },
  {
    label: "Techwrap",
    current: 71,
    previous: 68,
    completedLastMonth: 75,
    baselineMedian: 26,
  },
];

function SnapshotTooltip({ item }: { item: BarItem }) {
  return (
    <div
      className="relative w-[220px] rounded-2xl bg-white px-5 py-4 text-left shadow-[0_8px_28px_rgba(16,24,40,0.18)]"
      role="tooltip"
    >
      <div className="text-sm font-bold leading-5 text-icr-navy">{item.label}</div>
      <div className="mt-2 text-[13px] leading-5 text-icr-navy">
        <span className="font-bold">{item.current}</span> Total Leads this month
      </div>
      <div className="mt-0.5 text-[13px] leading-5 text-icr-navy">
        <span className="font-bold">{item.completedLastMonth}</span> Completed
        Last month.
      </div>
      <div className="my-3 h-px bg-icr-border" />
      <div className="text-[13px] leading-5 text-icr-navy">
        Baseline Median <span className="font-bold">{item.baselineMedian}</span>
      </div>
      <span
        className="absolute top-full left-1/2 -mt-px -translate-x-1/2 border-x-[7px] border-t-[8px] border-x-transparent border-t-white"
        aria-hidden
      />
    </div>
  );
}

function ChartCard({
  title,
  items,
  max,
  onBarClick,
}: {
  title: string;
  items: BarItem[];
  max: number;
  onBarClick?: (label: string) => void;
}) {
  return (
    <div className="overflow-visible rounded-[14px] border border-icr-border bg-icr-surface py-4 lg:rounded-[10px] lg:p-4">
      <h3 className="mb-4 mt-0 px-3 text-xs font-medium leading-[15px] text-icr-navy lg:mb-3.5 lg:px-0 lg:text-sm lg:font-semibold">
        {title}
      </h3>
      {items.map((item) => (
        <button
          type="button"
          className={cn(
            "group relative mb-4 flex w-full flex-col gap-1.5 px-3 text-left last:mb-0 lg:mb-3 lg:grid lg:grid-cols-[110px_1fr_28px] lg:items-center lg:gap-2 lg:px-0",
            onBarClick && "cursor-pointer rounded-md hover:bg-[#F8F9FA]",
            !onBarClick && "cursor-default",
          )}
          key={item.label}
          onClick={() => onBarClick?.(item.label)}
        >
          <div className="pointer-events-none invisible absolute bottom-full left-1/2 z-30 mb-2.5 -translate-x-1/2 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-visible:visible group-focus-visible:opacity-100">
            <SnapshotTooltip item={item} />
          </div>
          <div className="text-[10px] leading-[18px] text-[#6D7280] lg:text-xs lg:leading-4 lg:text-icr-navy">
            {item.label}
          </div>
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <div className="relative h-[7px] overflow-hidden rounded">
                <span
                  className="relative block h-full rounded bg-icr-bar-prev lg:bg-icr-bar-prev"
                  style={{ width: `${(item.previous / max) * 100}%` }}
                />
              </div>
              <div className="relative h-[7px] overflow-hidden rounded">
                <span
                  className="relative block h-full rounded bg-[#D9AB82]"
                  style={{ width: `${(item.current / max) * 100}%` }}
                />
              </div>
            </div>
            <div className="w-7 shrink-0 text-right text-[10px] font-medium leading-[18px] text-[#6D7280] lg:hidden">
              {item.current}
            </div>
          </div>
          <div className="hidden text-right text-xs font-semibold text-icr-navy lg:block">
            {item.current}
          </div>
        </button>
      ))}
      <div className="mt-1 flex justify-between px-3 text-[10px] leading-[18px] text-[#6D7280] lg:ml-[110px] lg:px-0 lg:pr-7 lg:text-[11px] lg:text-icr-muted">
        <span>0</span>
        <span>{Math.round(max * 0.25)}</span>
        <span>{Math.round(max * 0.5)}</span>
        <span>{Math.round(max * 0.75)}</span>
        <span>{max}</span>
      </div>
      <div className="mt-4 flex justify-center gap-5 text-[10px] leading-[14px] text-icr-navy lg:mt-3 lg:gap-4 lg:text-xs lg:text-icr-muted">
        <span className="inline-flex items-center gap-1">
          <i className="inline-block h-2 w-2 rounded-full bg-[#D9AB82]" /> Current
          month
        </span>
        <span className="inline-flex items-center gap-1">
          <i className="inline-block h-2 w-2 rounded-full bg-[#D9D9D9]" /> Previous
          month
        </span>
      </div>
    </div>
  );
}

export function PortfolioOverview() {
  const {
    region,
    product,
    regionActive,
    productActive,
    setRegion,
    setProduct,
  } = useDashboardFilters();

  const regions = useMemo(
    () =>
      regionActive
        ? regionItems.filter((item) => item.label === region)
        : regionItems,
    [region, regionActive],
  );

  const products = useMemo(
    () =>
      productActive
        ? productItems.filter((item) => item.label === product)
        : productItems,
    [product, productActive],
  );

  return (
    <section className="overflow-visible rounded-[14px] border border-[#DBDDE2] bg-white p-4 lg:rounded-xl lg:border-icr-border lg:p-5 lg:shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="mb-3 flex items-start justify-between gap-3 lg:mb-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="m-0 text-sm font-medium leading-[17.5px] text-icr-navy lg:text-lg lg:font-bold">
              Portfolio overview
            </h2>
            <FilterScopeBadge />
          </div>
          <p className="mt-0.5 mb-0 text-xs leading-[16.8px] text-[rgba(29,54,80,0.65)] lg:text-[13px] lg:text-icr-muted">
            Current vs previous month workload
          </p>
        </div>
        <div className="hidden items-center gap-1.5 text-xs text-icr-muted lg:inline-flex">
          <IconInfo />
          Click bar to filter leads in the register below.
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 overflow-visible lg:grid-cols-3 lg:gap-4">
        <ChartCard
          title="Region Snapshot"
          max={100}
          items={regions}
          onBarClick={(label) => {
            if (
              label === "North America" ||
              label === "EMEA" ||
              label === "APAC"
            ) {
              setRegion(label);
            }
          }}
        />
        <ChartCard title="Top Customer" max={20} items={customerItems} />
        <ChartCard
          title="Product Snapshot"
          max={100}
          items={products}
          onBarClick={(label) => {
            if (label === "Quickflange" || label === "Techwrap") {
              setProduct(label);
            }
          }}
        />
      </div>
    </section>
  );
}

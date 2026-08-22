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
    previous: 96,
    completedLastMonth: 96,
    baselineMedian: 31,
  },
  {
    label: "EMEA",
    current: 79,
    previous: 63,
    completedLastMonth: 84,
    baselineMedian: 28,
  },
  {
    label: "APAC",
    current: 70,
    previous: 68,
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

const TICKS = [0, 0.25, 0.5, 0.75, 1] as const;
const BAR_CURRENT = "#D9AB82";
const BAR_PREV = "#DCDFE4";
const GRID_STROKE = "#DBDDE2";
const LABEL_MUTED = "#667085";
const GRID_LINE_HEIGHT = 188;

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

function ChartGridLines() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
    >
      {TICKS.map((tick) => (
        <span
          key={tick}
          className="absolute top-0 bottom-0 -translate-x-1/2"
          style={{
            left: `${tick * 100}%`,
            width: "0.5px",
            backgroundImage: `repeating-linear-gradient(to bottom, ${GRID_STROKE} 0px, ${GRID_STROKE} 4px, transparent 4px, transparent 8px)`,
          }}
        />
      ))}
    </div>
  );
}

function AxisLabels({ max }: { max: number }) {
  return (
    <div className="relative mt-2.5 h-[18px] overflow-visible">
      {TICKS.map((tick) => (
        <span
          key={tick}
          className="absolute top-0 -translate-x-1/2 text-[10px] leading-[18px] font-[400]"
          style={{
            left: `${tick * 100}%`,
            color: LABEL_MUTED,
          }}
        >
          {Math.round(max * tick)}
        </span>
      ))}
    </div>
  );
}

function BarRow({
  item,
  max,
  onBarClick,
}: {
  item: BarItem;
  max: number;
  onBarClick?: (label: string) => void;
}) {
  const currentPct = (item.current / max) * 100;

  return (
    <button
      type="button"
      className={cn(
        "group relative grid w-full grid-cols-[108px_minmax(0,1fr)] items-center gap-x-3 bg-transparent text-left",
        onBarClick ? "cursor-pointer" : "cursor-default",
      )}
      onClick={() => onBarClick?.(item.label)}
    >
      <div className="pointer-events-none invisible absolute bottom-full left-1/2 z-30 mb-2.5 -translate-x-1/2 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-visible:visible group-focus-visible:opacity-100">
        <SnapshotTooltip item={item} />
      </div>
      <div
        className="text-right text-[10px] leading-[18px] font-[400]"
        style={{ color: LABEL_MUTED }}
      >
        {item.label}
      </div>
      <div className="relative z-[1] min-w-0">
        <div className="flex flex-col gap-1">
          <div className="relative h-1.5 w-full">
            <span
              className="absolute top-0 left-0 block h-full rounded-full"
              style={{
                width: `${(item.previous / max) * 100}%`,
                backgroundColor: BAR_PREV,
              }}
            />
          </div>
          <div className="relative h-1.5 w-full">
            <span
              className="absolute top-0 left-0 block h-full rounded-full"
              style={{
                width: `${currentPct}%`,
                backgroundColor: BAR_CURRENT,
              }}
            />
            <span
              className="absolute top-1/2 z-[2] -translate-y-1/2 pl-1.5 text-[10px] leading-[18px] font-[500]"
              style={{ left: `${currentPct}%`, color: LABEL_MUTED }}
            >
              <span className="bg-white px-0.5">{item.current}</span>
            </span>
          </div>
        </div>
      </div>
    </button>
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
    <div className="flex h-full flex-col overflow-visible rounded-[14px] border border-[#DBDDE2] bg-white py-4 lg:rounded-[10px] lg:p-4">
      <h3 className="mb-4 mt-0 px-3 text-xs font-semibold leading-[15px] text-icr-navy lg:px-0 lg:text-sm">
        {title}
      </h3>

      <div className="px-3 lg:hidden">
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 z-0">
            <ChartGridLines />
          </div>
          <div className="relative z-[1] flex flex-col items-stretch gap-[26px]">
            {items.map((item) => (
              <button
                type="button"
                key={item.label}
                className={cn(
                  "group relative flex w-full flex-col gap-1.5 bg-transparent text-left",
                  onBarClick ? "cursor-pointer" : "cursor-default",
                )}
                onClick={() => onBarClick?.(item.label)}
              >
                <div className="pointer-events-none invisible absolute bottom-full left-1/2 z-30 mb-2.5 -translate-x-1/2 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-visible:visible group-focus-visible:opacity-100">
                  <SnapshotTooltip item={item} />
                </div>
                <div
                  className="text-[10px] leading-[18px] font-[400]"
                  style={{ color: LABEL_MUTED }}
                >
                  {item.label}
                </div>
                <div className="relative">
                  <div className="flex flex-col gap-1">
                    <div className="relative h-1.5 w-full">
                      <span
                        className="absolute top-0 left-0 block h-full rounded-full"
                        style={{
                          width: `${(item.previous / max) * 100}%`,
                          backgroundColor: BAR_PREV,
                        }}
                      />
                    </div>
                    <div className="relative h-1.5 w-full">
                      <span
                        className="absolute top-0 left-0 block h-full rounded-full"
                        style={{
                          width: `${(item.current / max) * 100}%`,
                          backgroundColor: BAR_CURRENT,
                        }}
                      />
                      <span
                        className="absolute top-1/2 z-[2] -translate-y-1/2 pl-1.5 text-[10px] leading-[18px] font-[500]"
                        style={{
                          left: `${(item.current / max) * 100}%`,
                          color: LABEL_MUTED,
                        }}
                      >
                        <span className="bg-white px-0.5">{item.current}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
        <AxisLabels max={max} />
      </div>

      <div className="hidden lg:block">
        <div
          className="relative"
          style={{ height: GRID_LINE_HEIGHT }}
        >
          <div className="pointer-events-none absolute inset-y-0 right-0 left-[120px] z-0">
            <ChartGridLines />
          </div>
          <div className="relative z-[1] flex h-full flex-col justify-center gap-[26px]">
            {items.map((item) => (
              <BarRow
                key={item.label}
                item={item}
                max={max}
                onBarClick={onBarClick}
              />
            ))}
          </div>
        </div>
        <div className="pl-[120px]">
          <AxisLabels max={max} />
        </div>
      </div>

      <div className="mt-auto flex justify-center gap-5 pt-4 text-[10px] leading-[14px] text-icr-navy lg:gap-4 lg:pt-3.5 lg:text-xs">
        <span className="inline-flex items-center gap-1.5">
          <i
            className="inline-block h-[3px] w-3 rounded-full"
            style={{ backgroundColor: BAR_CURRENT }}
          />
          Current month
        </span>
        <span className="inline-flex items-center gap-1.5">
          <i
            className="inline-block h-[3px] w-3 rounded-full"
            style={{ backgroundColor: BAR_PREV }}
          />
          Previous month
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
    <section className="overflow-visible rounded-[14px] border border-[#DBDDE2] bg-white p-4 lg:rounded-xl lg:p-5">
      <div className="mb-3 flex items-start justify-between gap-3 lg:mb-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="m-0 text-sm font-medium leading-[17.5px] text-icr-navy lg:text-lg lg:font-bold">
              Portfolio overview
            </h2>
            <FilterScopeBadge />
          </div>
          <p className="mt-0.5 mb-0 text-xs leading-[16.8px] text-[rgba(29,54,80,0.65)] lg:text-[13px] lg:text-[#667085]">
            Current vs previous month workload
          </p>
        </div>
        <div className="hidden items-center gap-1.5 text-xs text-[#667085] lg:inline-flex">
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

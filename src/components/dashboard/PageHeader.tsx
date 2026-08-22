"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import {
  DEPARTMENT_ALL,
  DEPARTMENT_OPTIONS,
  PRODUCT_ALL,
  PRODUCT_OPTIONS,
  REGION_OPTIONS,
  useDashboardFilters,
} from "@/components/dashboard/DashboardFilters";
import { FilterDatePicker } from "@/components/dashboard/FilterDatePicker";
import {
  IconChevronDown,
  IconGlobe,
  IconInfo,
  IconRefresh,
} from "@/components/icons";
import { useMobileNav } from "@/components/dashboard/MobileNav";
import { cn } from "@/lib/utils";

const periods = ["Week", "Month", "Quarter", "Year", "Custom"] as const;

const chipClass =
  "inline-flex h-10 items-center gap-2 rounded-lg border border-icr-border bg-icr-surface px-3 text-sm text-icr-navy";

export function PageHeader() {
  const { toggleFilters, filtersOpen, activeCount } = usePageHeaderMobile();

  return (
    <div className="flex items-start justify-between gap-4 lg:gap-4">
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <h1 className="m-0 text-[20px] font-medium leading-[29px] text-[#101828] lg:font-bold lg:leading-7 lg:text-icr-navy">
          Welcome back, Olivia
        </h1>
        <p className="m-0 text-sm leading-[20.3px] text-[#475467] lg:text-base lg:leading-6">
          Summary from Last activity 30 days
        </p>
      </div>
      <div className="hidden items-center gap-2 rounded-lg border border-[#E9EBEE] bg-white px-3 py-2.5 text-[12px] text-[#6C7C8D] lg:inline-flex">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 font-medium leading-5 text-[#6C7C8D]"
        >
          <IconRefresh size={12} />
          Refresh
        </button>
        <span
          aria-hidden
          className="mx-0.5 h-3 w-px shrink-0 self-center bg-[#DBDDE2]"
        />
        <span className="font-normal">Updated 11:38 PM</span>
      </div>
      <div className="flex shrink-0 items-start gap-2 lg:hidden">
        <button
          type="button"
          aria-label="Refresh"
          onClick={() => window.location.reload()}
          className="inline-flex items-center justify-center rounded-lg border border-[rgba(13,24,61,0.10)] bg-white px-3 py-[9px]"
        >
          <IconRefresh size={12} className="text-[#6C7C8D]" />
        </button>
        <button
          type="button"
          aria-expanded={filtersOpen}
          onClick={toggleFilters}
          className={cn(
            "inline-flex items-center gap-0.5 rounded-[10px] border px-2 py-[5px]",
            activeCount > 0
              ? "border-icr-orange bg-icr-tint"
              : "border-[rgba(13,24,61,0.10)] bg-white",
          )}
        >
          <img
            src="/assets/icons/filter.svg"
            alt=""
            width={20}
            height={20}
            className={cn(
              "size-5",
              activeCount > 0 ? "opacity-100" : "opacity-70",
            )}
          />
          {activeCount > 0 ? (
            <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-[5px] bg-icr-orange px-1.5 text-[10px] leading-[14px] text-white">
              {activeCount}
            </span>
          ) : null}
        </button>
      </div>
    </div>
  );
}

function usePageHeaderMobile() {
  const { toggleFilters, filtersOpen } = useMobileNav();
  const { activeCount } = useDashboardFilters();
  return { toggleFilters, filtersOpen, activeCount };
}

function FilterDropdown({
  label,
  open,
  onToggle,
  children,
  active,
  alwaysActive,
  leading,
  chevronSize = 14,
  id,
}: {
  label: ReactNode;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
  active?: boolean;
  alwaysActive?: boolean;
  leading?: ReactNode;
  chevronSize?: number;
  id?: string;
}) {
  const highlighted = alwaysActive || active;

  return (
    <div className="relative">
      <button
        id={id}
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className={cn(
          chipClass,
          highlighted &&
            "border-icr-orange bg-icr-orange-soft shadow-[0_4px_14px_rgba(246,134,31,0.22)]",
        )}
      >
        {leading}
        {label}
        <span
          className={cn(
            "inline-flex transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
            open && "rotate-180",
          )}
        >
          <IconChevronDown size={chevronSize} />
        </span>
      </button>
      <div
        className={cn(
          "absolute top-[calc(100%+8px)] left-0 z-30 min-w-full origin-top transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-1 scale-[0.98] opacity-0",
        )}
      >
        <div className="overflow-hidden rounded-lg border border-icr-border bg-white py-1 shadow-[0_8px_24px_rgba(16,24,40,0.12)]">
          {children}
        </div>
      </div>
    </div>
  );
}

export function FilterBar() {
  const {
    region,
    department,
    product,
    setRegion,
    setDepartment,
    setProduct,
    clearFilters,
    activeCount,
    regionActive,
    departmentActive,
    productActive,
  } = useDashboardFilters();

  const [period, setPeriod] = useState<(typeof periods)[number]>("Month");
  const [regionOpen, setRegionOpen] = useState(false);
  const [deptOpen, setDeptOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [baselineOpen, setBaselineOpen] = useState(false);
  const [baseline, setBaseline] = useState("Previous 6 months");
  const [fromDate, setFromDate] = useState("09-10-2025");
  const [toDate, setToDate] = useState("09-10-2025");
  const [customPanelOpen, setCustomPanelOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const periodTrackRef = useRef<HTMLDivElement>(null);
  const periodBtnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [periodPill, setPeriodPill] = useState({ left: 0, width: 0, ready: false });

  function measurePeriodPill() {
    const idx = periods.indexOf(period);
    const btn = periodBtnRefs.current[idx];
    const track = periodTrackRef.current;
    if (!btn || !track) return;
    setPeriodPill({
      left: btn.offsetLeft,
      width: btn.offsetWidth,
      ready: true,
    });
  }

  useLayoutEffect(() => {
    measurePeriodPill();
  }, [period]);

  useEffect(() => {
    window.addEventListener("resize", measurePeriodPill);
    return () => window.removeEventListener("resize", measurePeriodPill);
  }, [period]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) {
        setRegionOpen(false);
        setDeptOpen(false);
        setProductOpen(false);
        setBaselineOpen(false);
        setCustomPanelOpen(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function closeMenus() {
    setRegionOpen(false);
    setDeptOpen(false);
    setProductOpen(false);
    setBaselineOpen(false);
  }

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative hidden flex-wrap items-start justify-between gap-4 lg:flex",
      )}
    >
      <div className="flex flex-wrap items-center gap-2.5">
        <FilterDropdown
          id="dashboard-region-filter"
          alwaysActive
          chevronSize={16}
          open={regionOpen}
          onToggle={() => {
            setDeptOpen(false);
            setProductOpen(false);
            setBaselineOpen(false);
            setRegionOpen((v) => !v);
          }}
          leading={
            <IconGlobe size={16} className="text-icr-orange" />
          }
          label={
            <>
              <span className="text-[13px] text-icr-muted">Region:</span>
              {regionActive ? region : "All"}
            </>
          }
        >
          {REGION_OPTIONS.map((item) => (
            <button
              key={item}
              type="button"
              className={cn(
                "flex w-full px-3 py-2 text-left text-sm hover:bg-[#F8F9FA]",
                item === region
                  ? "bg-icr-orange-soft font-medium text-icr-orange"
                  : "text-icr-navy",
              )}
              onClick={() => {
                setRegion(item);
                setRegionOpen(false);
              }}
            >
              {item}
            </button>
          ))}
        </FilterDropdown>

        <FilterDropdown
          id="dashboard-department-filter"
          active={departmentActive}
          chevronSize={24}
          open={deptOpen}
          onToggle={() => {
            setRegionOpen(false);
            setProductOpen(false);
            setBaselineOpen(false);
            setDeptOpen((v) => !v);
          }}
          label={departmentActive ? department : DEPARTMENT_ALL}
        >
          {DEPARTMENT_OPTIONS.map((item) => (
            <button
              key={item}
              type="button"
              className={cn(
                "flex w-full px-3 py-2 text-left text-sm hover:bg-[#F8F9FA]",
                item === department
                  ? "bg-icr-orange-soft font-medium text-icr-orange"
                  : "text-icr-navy",
              )}
              onClick={() => {
                setDepartment(item);
                setDeptOpen(false);
              }}
            >
              {item}
            </button>
          ))}
        </FilterDropdown>

        <FilterDropdown
          id="dashboard-product-filter"
          active={productActive}
          chevronSize={24}
          open={productOpen}
          onToggle={() => {
            setRegionOpen(false);
            setDeptOpen(false);
            setBaselineOpen(false);
            setProductOpen((v) => !v);
          }}
          label={productActive ? product : PRODUCT_ALL}
        >
          {PRODUCT_OPTIONS.map((item) => (
            <button
              key={item}
              type="button"
              className={cn(
                "flex w-full px-3 py-2 text-left text-sm hover:bg-[#F8F9FA]",
                item === product
                  ? "bg-icr-orange-soft font-medium text-icr-orange"
                  : "text-icr-navy",
              )}
              onClick={() => {
                setProduct(item);
                setProductOpen(false);
              }}
            >
              {item}
            </button>
          ))}
        </FilterDropdown>

        {activeCount > 0 ? (
          <button
            type="button"
            onClick={() => {
              clearFilters();
              closeMenus();
            }}
            className="text-[13px] font-medium text-icr-orange"
          >
            {activeCount === 1
              ? "Clear filters"
              : `Clear ${activeCount} filters`}
          </button>
        ) : null}
      </div>

      <div className="relative flex flex-wrap items-center gap-2">
        <div className="relative">
          <div
            ref={periodTrackRef}
            className="relative inline-flex h-[42px] items-center rounded-[10px] bg-white p-1"
            style={{
              outline: "1px solid rgba(13, 24, 61, 0.15)",
              outlineOffset: "-1px",
            }}
          >
            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute top-1 bottom-1 rounded-lg bg-icr-tint outline outline-1 outline-offset-[-1px] outline-[rgba(246,134,31,0.55)] transition-[left,width,opacity] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
                periodPill.ready ? "opacity-100" : "opacity-0",
              )}
              style={{ left: periodPill.left, width: periodPill.width }}
            />
            {periods.map((p, i) => {
              const active = period === p;
              return (
                <button
                  key={p}
                  ref={(el) => {
                    periodBtnRefs.current[i] = el;
                  }}
                  type="button"
                  className={cn(
                    "relative z-10 flex h-full items-center gap-1 rounded-[8px] px-2.5 text-[12px] font-medium leading-[15.6px] transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
                    active ? "text-[#F6861F]" : "text-[#617385]",
                  )}
                  onClick={() => {
                    setPeriod(p);
                    closeMenus();
                    if (p === "Custom") {
                      setCustomPanelOpen(true);
                    } else {
                      setCustomPanelOpen(false);
                    }
                  }}
                >
                  {p}
                </button>
              );
            })}
          </div>

          <div
            className={cn(
              "absolute top-[calc(100%+8px)] right-0 z-30 origin-top-right transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
              customPanelOpen
                ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                : "pointer-events-none -translate-y-1 scale-[0.98] opacity-0",
            )}
          >
            <div className="inline-flex items-center gap-3 whitespace-nowrap rounded-xl border border-[#DBDDE2] bg-white px-3 py-2.5 shadow-[0_8px_24px_rgba(16,24,40,0.12)]">
              <FilterDatePicker
                label="From"
                value={fromDate}
                onChange={setFromDate}
              />
              <FilterDatePicker
                label="To"
                value={toDate}
                onChange={setToDate}
              />
              <button
                type="button"
                className="h-10 shrink-0 rounded-lg bg-icr-orange px-4 text-sm font-medium text-white"
                onClick={() => setCustomPanelOpen(false)}
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        <div
          className="relative inline-flex h-[44px] items-stretch rounded-[10px] bg-white"
          style={{
            outline: "1px solid rgba(13, 24, 61, 0.15)",
            outlineOffset: "-1px",
          }}
        >
          <span className="group/baseline relative inline-flex items-center gap-1 rounded-l-[10px] bg-[#E8EEF4] py-[14px] pr-3 pl-[14px] text-[12px] font-medium leading-4 text-[#617385]">
            Baseline Median
            <span className="relative inline-flex">
              <IconInfo size={12} className="cursor-help" />
              <span className="pointer-events-none invisible absolute top-[calc(100%+10px)] left-1/2 z-50 w-[280px] -translate-x-1/2 opacity-0 transition-opacity duration-150 group-hover/baseline:visible group-hover/baseline:opacity-100">
                <span className="relative block rounded-2xl bg-white px-4 py-3 text-left text-[12px] font-normal leading-[18px] text-icr-navy shadow-[0_8px_28px_rgba(16,24,40,0.18)]">
                  <span
                    className="absolute bottom-full left-1/2 -mb-px -translate-x-1/2 border-x-[7px] border-b-[8px] border-x-transparent border-b-white"
                    aria-hidden
                  />
                  Past Average shows the middle value of the period selected for
                  all metrics, not including the current time period. It
                  provides a comparison against today&apos;s number to see if
                  current performance is normal or unusual.
                </span>
              </span>
            </span>
          </span>
          <button
            type="button"
            aria-expanded={baselineOpen}
            onClick={() => {
              setRegionOpen(false);
              setDeptOpen(false);
              setProductOpen(false);
              setBaselineOpen((v) => !v);
            }}
            className="inline-flex items-center gap-2 rounded-r-[10px] border-l border-[rgba(13,24,61,0.15)] bg-white px-3 text-[12px] font-medium leading-4 text-[#617385]"
          >
            {baseline}
            <span
              className={cn(
                "inline-flex transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
                baselineOpen && "rotate-180",
              )}
            >
              <IconChevronDown size={12} />
            </span>
          </button>
          <div
            className={cn(
              "absolute top-[calc(100%+8px)] right-0 z-30 min-w-full origin-top transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
              baselineOpen
                ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                : "pointer-events-none -translate-y-1 scale-[0.98] opacity-0",
            )}
          >
            <div className="overflow-hidden rounded-lg border border-icr-border bg-white py-1 shadow-[0_8px_24px_rgba(16,24,40,0.12)]">
              {[
                "Previous 6 months",
                "Previous 3 months",
                "Previous 12 months",
              ].map((item) => (
                <button
                  key={item}
                  type="button"
                  className={cn(
                    "flex w-full px-3 py-2 text-left text-sm hover:bg-[#F8F9FA]",
                    item === baseline
                      ? "bg-icr-orange-soft font-medium text-icr-orange"
                      : "text-icr-navy",
                  )}
                  onClick={() => {
                    setBaseline(item);
                    setBaselineOpen(false);
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

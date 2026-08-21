"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  DEPARTMENT_ALL,
  PRODUCT_ALL,
  REGION_ALL,
  REGION_OPTIONS,
  useDashboardFilters,
  type DepartmentFilter,
  type ProductFilter,
  type RegionFilter,
} from "@/components/dashboard/DashboardFilters";
import { FilterDatePicker } from "@/components/dashboard/FilterDatePicker";
import { useMobileNav } from "@/components/dashboard/MobileNav";
import {
  IconChevronDown,
  IconClose,
  IconInfo,
} from "@/components/icons";
import { cn } from "@/lib/utils";

const periods = ["Week", "Month", "Quarter", "Year", "Custom"] as const;
type Period = (typeof periods)[number];

const baselines = [
  "Previous 6 months",
  "Previous 3 months",
  "Previous 12 months",
] as const;

const departmentChips = [
  "Intake",
  "Sales",
  "Engineering",
  "Operations",
  "Collaborative review",
  "Commercial",
] as const;

const productChips = ["Quickflange", "Techwrap"] as const;

function RadioDot({ selected }: { selected: boolean }) {
  return (
    <span
      className={cn(
        "relative inline-flex size-3 shrink-0 overflow-hidden rounded-full outline outline-[1.2px] outline-offset-[-1.2px]",
        selected
          ? "outline-icr-orange"
          : "outline-[rgba(13,24,61,0.10)]",
      )}
    >
      <span
        className={cn(
          "absolute top-1/2 left-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full",
          selected ? "bg-icr-orange" : "bg-[#FEFEFE]",
        )}
      />
    </span>
  );
}

function SheetSelect({
  value,
  open,
  onToggle,
  options,
  onSelect,
}: {
  value: string;
  open: boolean;
  onToggle: () => void;
  options: readonly string[];
  onSelect: (v: string) => void;
}) {
  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between rounded-lg border border-[rgba(13,24,61,0.10)] bg-white py-1.5 pr-1.5 pl-2.5 text-left"
      >
        <span className="text-xs font-medium leading-[16.8px] text-[rgba(29,54,80,0.65)]">
          {value}
        </span>
        <span
          className={cn(
            "inline-flex size-6 items-center justify-center transition-transform duration-300",
            open && "rotate-180",
          )}
        >
          <IconChevronDown size={12} className="text-icr-navy" />
        </span>
      </button>
      <div
        className={cn(
          "absolute top-[calc(100%+6px)] right-0 left-0 z-20 origin-top overflow-hidden rounded-lg border border-icr-border bg-white py-1 shadow-[0_8px_24px_rgba(16,24,40,0.12)] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-1 scale-[0.98] opacity-0",
        )}
      >
        {options.map((item) => (
          <button
            key={item}
            type="button"
            className={cn(
              "flex w-full px-3 py-2 text-left text-sm hover:bg-[#F8F9FA]",
              item === value
                ? "bg-icr-orange-soft font-medium text-icr-orange"
                : "text-icr-navy",
            )}
            onClick={() => {
              onSelect(item);
              onToggle();
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export function MobileFiltersSheet() {
  const { filtersOpen, setFiltersOpen } = useMobileNav();
  const {
    region,
    department,
    product,
    setRegion,
    setDepartment,
    setProduct,
    clearFilters,
  } = useDashboardFilters();

  const [period, setPeriod] = useState<Period>("Month");
  const [baseline, setBaseline] = useState<string>(baselines[0]);
  const [draftRegion, setDraftRegion] = useState<RegionFilter>(region);
  const [draftDept, setDraftDept] = useState<DepartmentFilter>(department);
  const [draftProduct, setDraftProduct] = useState<ProductFilter>(product);
  const [fromDate, setFromDate] = useState("09-10-2025");
  const [toDate, setToDate] = useState("09-10-2025");
  const [baselineMenu, setBaselineMenu] = useState(false);
  const [regionMenu, setRegionMenu] = useState(false);
  const [visible, setVisible] = useState(false);
  const periodBtnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [periodPill, setPeriodPill] = useState({
    left: 0,
    width: 0,
    ready: false,
  });

  function measurePeriodPill() {
    const idx = periods.indexOf(period);
    const btn = periodBtnRefs.current[idx];
    if (!btn) return;
    setPeriodPill({
      left: btn.offsetLeft,
      width: btn.offsetWidth,
      ready: true,
    });
  }

  useLayoutEffect(() => {
    if (!filtersOpen) return;
    measurePeriodPill();
  }, [period, filtersOpen, visible]);

  useEffect(() => {
    if (!filtersOpen) return;
    window.addEventListener("resize", measurePeriodPill);
    return () => window.removeEventListener("resize", measurePeriodPill);
  }, [period, filtersOpen]);

  useEffect(() => {
    if (filtersOpen) {
      setDraftRegion(region);
      setDraftDept(department);
      setDraftProduct(product);
      setBaselineMenu(false);
      setRegionMenu(false);
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }
    setVisible(false);
  }, [filtersOpen, region, department, product]);

  useEffect(() => {
    if (!filtersOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [filtersOpen]);

  const draftCount =
    Number(draftRegion !== REGION_ALL) +
    Number(draftDept !== DEPARTMENT_ALL) +
    Number(draftProduct !== PRODUCT_ALL);

  function close() {
    setVisible(false);
    window.setTimeout(() => setFiltersOpen(false), 280);
  }

  function apply() {
    setRegion(draftRegion);
    setDepartment(draftDept);
    setProduct(draftProduct);
    close();
  }

  function clear() {
    setDraftRegion(REGION_ALL);
    setDraftDept(DEPARTMENT_ALL);
    setDraftProduct(PRODUCT_ALL);
    setPeriod("Month");
    setBaseline(baselines[0]);
    clearFilters();
  }

  if (!filtersOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        aria-label="Close filters"
        className={cn(
          "absolute inset-0 bg-[rgba(16,24,40,0.45)] transition-opacity duration-300",
          visible ? "opacity-100" : "opacity-0",
        )}
        onClick={close}
      />
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 flex max-h-[92vh] flex-col rounded-t-xl bg-white px-4 pt-3 pb-6 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          visible ? "translate-y-0" : "translate-y-full",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
      >
        <div className="absolute top-[2px] left-1/2 h-[5px] w-9 -translate-x-1/2 rounded-[2.5px] bg-[#D0D4E3]" />

        <div className="flex items-center gap-2 pt-1">
          <div className="min-w-0 flex-1 text-base font-[350] leading-5 text-icr-navy">
            Filters
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={close}
            className="grid size-6 place-items-center text-icr-navy"
          >
            <IconClose size={14} />
          </button>
        </div>

        <div className="mt-2 min-h-0 flex-1 overflow-y-auto border-t border-[rgba(13,24,61,0.10)] pt-4">
          <div className="flex flex-col gap-6 pb-2">
            <div className="flex flex-col gap-1">
              <div className="text-sm font-medium leading-[18.9px] text-[rgba(29,54,80,0.80)]">
                Time period
              </div>
              <div className="relative flex w-full rounded-[10px] border border-[rgba(13,24,61,0.10)] bg-white p-0.5">
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute top-0.5 bottom-0.5 rounded-lg bg-icr-tint outline outline-1 outline-offset-[-1px] outline-[rgba(246,134,31,0.55)] transition-[left,width,opacity] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
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
                      onClick={() => setPeriod(p)}
                      className={cn(
                        "relative z-10 flex h-[30px] flex-1 items-center justify-center rounded-lg px-1 text-center text-xs font-medium leading-[16.8px] transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
                        active
                          ? "text-icr-orange"
                          : "text-[rgba(29,54,80,0.65)]",
                      )}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
              {period === "Custom" ? (
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <FilterDatePicker
                    stacked
                    label="From"
                    value={fromDate}
                    onChange={setFromDate}
                  />
                  <FilterDatePicker
                    stacked
                    align="right"
                    label="To"
                    value={toDate}
                    onChange={setToDate}
                  />
                </div>
              ) : null}
            </div>

            <div className="flex flex-col gap-1">
              <div className="inline-flex items-center gap-1 text-sm font-medium leading-[18.9px] text-[rgba(29,54,80,0.80)]">
                Baseline Median
                <IconInfo size={14} className="text-[#4A5E73]" />
              </div>
              <SheetSelect
                value={baseline}
                open={baselineMenu}
                onToggle={() => {
                  setRegionMenu(false);
                  setBaselineMenu((v) => !v);
                }}
                options={baselines}
                onSelect={setBaseline}
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="text-sm font-medium leading-[18.9px] text-[rgba(29,54,80,0.80)]">
                Region
              </div>
              <SheetSelect
                value={draftRegion}
                open={regionMenu}
                onToggle={() => {
                  setBaselineMenu(false);
                  setRegionMenu((v) => !v);
                }}
                options={REGION_OPTIONS}
                onSelect={(v) => setDraftRegion(v as RegionFilter)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium leading-[18.9px] text-[rgba(29,54,80,0.80)]">
                Department
              </div>
              <div className="grid grid-cols-2 gap-2">
                {departmentChips.map((item) => {
                  const selected = draftDept === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() =>
                        setDraftDept(
                          selected
                            ? DEPARTMENT_ALL
                            : (item as DepartmentFilter),
                        )
                      }
                      className={cn(
                        "flex items-center gap-1 rounded-[10px] px-2 py-1.5 text-left outline outline-1 outline-offset-[-1px]",
                        selected
                          ? "bg-[#FEFEFE] outline-icr-orange"
                          : "bg-white outline-[rgba(13,24,61,0.10)]",
                      )}
                    >
                      <span className="grid size-5 place-items-center">
                        <RadioDot selected={selected} />
                      </span>
                      <span
                        className={cn(
                          "min-w-0 flex-1 text-xs leading-[16.8px]",
                          selected
                            ? "font-medium text-icr-orange"
                            : "font-normal text-[rgba(29,54,80,0.65)]",
                        )}
                      >
                        {item === "Intake" ? "Input" : item}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium leading-[18.9px] text-[rgba(29,54,80,0.80)]">
                Products
              </div>
              <div className="grid grid-cols-2 gap-2">
                {productChips.map((item) => {
                  const selected = draftProduct === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() =>
                        setDraftProduct(
                          selected ? PRODUCT_ALL : (item as ProductFilter),
                        )
                      }
                      className={cn(
                        "flex items-center gap-1 rounded-[10px] px-2 py-1.5 text-left outline outline-1 outline-offset-[-1px]",
                        selected
                          ? "bg-[#FEFEFE] outline-icr-orange"
                          : "bg-white outline-[rgba(13,24,61,0.10)]",
                      )}
                    >
                      <span className="grid size-5 place-items-center">
                        <RadioDot selected={selected} />
                      </span>
                      <span
                        className={cn(
                          "min-w-0 text-xs leading-[16.8px]",
                          selected
                            ? "font-medium text-icr-orange"
                            : "font-normal text-[rgba(29,54,80,0.65)]",
                        )}
                      >
                        {item === "Quickflange" ? "QuickFlange" : item}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 gap-2 pt-4">
          <button
            type="button"
            onClick={clear}
            className="flex h-9 flex-1 items-center justify-center rounded-[10px] border border-[rgba(13,24,61,0.10)] text-sm font-medium leading-[14px] text-[rgba(29,54,80,0.65)]"
          >
            Clear Filter
          </button>
          <button
            type="button"
            onClick={apply}
            className="flex h-9 flex-1 items-center justify-center gap-1 rounded-lg border border-icr-orange bg-icr-orange px-3.5 text-sm font-[350] leading-[14px] text-white shadow-[0_1px_2px_rgba(16,24,40,0.05)]"
          >
            <span className="inline-flex size-5 items-center justify-center rounded bg-white text-xs font-medium leading-3 text-icr-orange">
              {draftCount}
            </span>
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
}

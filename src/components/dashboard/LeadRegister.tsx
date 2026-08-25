"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDashboardFilters } from "@/components/dashboard/DashboardFilters";
import type { LeadDetail } from "@/components/dashboard/LeadDetailDrawer";
import {
  IconBreached,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconSearch,
  IconSort,
  IconWarning,
} from "@/components/icons";
import { cn } from "@/lib/utils";

const LeadDetailDrawer = dynamic(
  () =>
    import("@/components/dashboard/LeadDetailDrawer").then((m) => ({
      default: m.LeadDetailDrawer,
    })),
  { ssr: false },
);

const leads: LeadDetail[] = [
  {
    id: "QF-1048",
    title: "Offshore flange reinforcement",
    customer: "Northshore Energy",
    product: "Quickflange",
    region: "EMEA",
    department: "Intake",
    age: "0d",
    status: "At Risk",
  },
  {
    id: "TW-2331",
    title: "Composite repair assessment",
    customer: "Ardent Chemicals",
    product: "Techwrap",
    region: "APAC",
    department: "Intake",
    age: "1d",
    status: "Within SLA",
  },
  {
    id: "QF-1052",
    title: "Pipeline connection review",
    customer: "Maritech Group",
    product: "Quickflange",
    region: "North America",
    department: "Sales",
    age: "1d",
    status: "Breached",
  },
  {
    id: "QF-1039",
    title: "Platform tie-in package",
    customer: "Raven Industrial",
    product: "Quickflange",
    region: "North America",
    department: "Commercial",
    age: "5d",
    status: "Within SLA",
  },
  {
    id: "TW-2318",
    title: "Cooling line repair scope",
    customer: "Delta Offshore",
    product: "Techwrap",
    region: "EMEA",
    department: "Engineering",
    age: "6d",
    status: "Within SLA",
  },
  {
    id: "QF-1027",
    title: "Emergency clamp calculation",
    customer: "Helix Process",
    product: "Techwrap",
    region: "North America",
    department: "Commercial",
    age: "7d",
    status: "At Risk",
  },
  {
    id: "TW-2299",
    title: "Storage line integrity review",
    customer: "Pelagic Resources",
    product: "Techwrap",
    region: "EMEA",
    department: "Operations",
    age: "8d",
    status: "Within SLA",
  },
];

const deptDot: Record<string, string> = {
  Intake: "#DAB729",
  Sales: "#F6861F",
  Commercial: "#9FB98E",
  Engineering: "#B49475",
  Operations: "#C0A3AD",
  "Collaborative review": "#C0A3AD",
};

const columns = [
  {
    key: "lead",
    label: "Lead",
    className: "min-w-[164px] w-[164px] 2xl:min-w-0 2xl:w-[18%]",
  },
  {
    key: "customer",
    label: "Customer",
    className: "min-w-[200px] 2xl:min-w-0 2xl:w-[14%]",
  },
  {
    key: "product",
    label: "Product",
    className: "min-w-[200px] 2xl:min-w-0 2xl:w-[11%]",
  },
  {
    key: "region",
    label: "Region",
    className: "min-w-[200px] 2xl:min-w-0 2xl:w-[10%] text-left",
  },
  {
    key: "department",
    label: "Department",
    className: "min-w-[200px] 2xl:min-w-0 2xl:w-[13%]",
  },
  {
    key: "state",
    label: "State",
    className: "min-w-[100px] 2xl:min-w-0 2xl:w-[9%] text-center",
  },
  {
    key: "age",
    label: "Age / Cycle",
    className: "min-w-[100px] 2xl:min-w-0 2xl:w-[8%] text-center",
  },
  {
    key: "status",
    label: "Status",
    className: "min-w-[120px] 2xl:min-w-0 2xl:w-[10%] text-center",
  },
  {
    key: "action",
    label: "Action",
    className: "w-[80px] min-w-[80px] shrink-0 text-center",
  },
] as const;

const actionStickyClass =
  "relative sticky right-0 z-20 2xl:static 2xl:z-auto";

const actionStickyShadow =
  "before:pointer-events-none before:absolute before:inset-y-0 before:right-full before:w-3 before:bg-gradient-to-l before:from-[rgba(16,24,40,0.14)] before:to-transparent shadow-[-4px_0_11px_rgba(0,0,0,0.12)] lg:before:hidden lg:shadow-none";

function StatusBadge({ status }: { status: LeadDetail["status"] }) {
  if (status === "At Risk") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FCF3E0] px-[7px] py-0.5 text-[10px] font-medium leading-[15px] text-[#DD9800]">
        <IconWarning size={9} />
        At Risk
      </span>
    );
  }
  if (status === "Breached") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FCE0E0] px-[7px] py-0.5 text-[10px] font-medium leading-[15px] text-[#EC0004]">
        <IconBreached size={9} />
        Breached
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-[#ECF0F5] px-[7px] py-0.5 text-[10px] font-medium leading-[15px] text-[#617385]">
      Within SLA
    </span>
  );
}

function FilterChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1 overflow-hidden rounded-[10px] border border-icr-orange bg-[#FFFAF5] py-1.5 pr-1.5 pl-3 text-xs font-medium leading-[17.4px] text-icr-orange">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label}`}
        className="inline-flex size-5 items-center justify-center rounded-lg text-icr-orange"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path
            d="M3.5 3.5l5 5M8.5 3.5l-5 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </span>
  );
}

export function LeadRegister() {
  const {
    region,
    department,
    product,
    regionActive,
    departmentActive,
    productActive,
    clearRegion,
    clearDepartment,
    clearProduct,
  } = useDashboardFilters();

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<LeadDetail | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showActionShadow, setShowActionShadow] = useState(true);
  const tableScrollRef = useRef<HTMLDivElement>(null);

  const hasFilters = regionActive || departmentActive || productActive;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads.filter((lead) => {
      if (regionActive && lead.region !== region) return false;
      if (departmentActive && lead.department !== department) return false;
      if (productActive && lead.product !== product) return false;
      if (!q) return true;
      return (
        lead.id.toLowerCase().includes(q) ||
        lead.customer.toLowerCase().includes(q) ||
        lead.title.toLowerCase().includes(q)
      );
    });
  }, [
    query,
    region,
    department,
    product,
    regionActive,
    departmentActive,
    productActive,
  ]);

  useEffect(() => {
    const el = tableScrollRef.current;
    if (!el) return;

    function updateShadow() {
      if (!el) return;
      const remaining = el.scrollWidth - el.clientWidth - el.scrollLeft;
      setShowActionShadow(remaining > 2);
    }

    updateShadow();
    el.addEventListener("scroll", updateShadow, { passive: true });
    window.addEventListener("resize", updateShadow);
    return () => {
      el.removeEventListener("scroll", updateShadow);
      window.removeEventListener("resize", updateShadow);
    };
  }, [filtered.length]);

  function openLead(lead: LeadDetail) {
    setSelected(lead);
    setDrawerOpen(true);
  }

  function closeDrawer() {
    setDrawerOpen(false);
  }

  return (
    <>
      <section className="flex min-w-0 flex-col gap-4 overflow-hidden rounded-[14px] border border-[rgba(13,24,61,0.15)] bg-white py-3 lg:gap-5 lg:py-3.5 2xl:gap-6 2xl:py-4">
        <div className="flex flex-col gap-2.5 px-[10px] lg:flex-row lg:items-start lg:gap-2.5 lg:px-3 2xl:px-4">
          <div className="min-w-0 flex-1">
            <h2 className="m-0 text-sm font-medium leading-[17.5px] text-icr-navy lg:text-[15px] lg:leading-[19px] 2xl:text-base 2xl:leading-5">
              Lead register
            </h2>
            <p className="m-0 text-xs leading-[16.8px] text-[rgba(29,54,80,0.65)]">
              Full list of leads. Selecting a section above filters this table
              automatically.
            </p>
          </div>
          <label className="flex h-8 w-full shrink-0 items-center gap-2 overflow-hidden rounded-[7px] border border-[#E6EBF1] bg-white px-2.5 text-xs text-[#6C7C8D] lg:h-8 lg:w-[220px] lg:rounded-lg lg:text-[11px] 2xl:h-9 2xl:w-[280px] 2xl:text-xs">
            <IconSearch size={14} />
            <input
              type="search"
              placeholder="Search leads or customers…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full border-none bg-transparent text-icr-navy outline-none placeholder:text-[#6C7C8D]"
            />
          </label>
        </div>

        {hasFilters ? (
          <div className="flex flex-wrap items-center gap-2 px-3 lg:px-4">
            {regionActive ? (
              <FilterChip
                label={`Region: ${region}`}
                onRemove={clearRegion}
              />
            ) : null}
            {departmentActive ? (
              <FilterChip
                label={`Department: ${department}`}
                onRemove={clearDepartment}
              />
            ) : null}
            {productActive ? (
              <FilterChip
                label={`Product: ${product}`}
                onRemove={clearProduct}
              />
            ) : null}
          </div>
        ) : null}

        <div
          ref={tableScrollRef}
          className="min-w-0 overflow-x-auto 2xl:overflow-x-hidden"
        >
          <table className="w-full min-w-[1100px] border-collapse 2xl:min-w-0 2xl:table-fixed">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={cn(
                      "h-[36px] border-b border-[rgba(13,24,61,0.1)] bg-[#F8F9FA] py-2.5 text-left text-[10px] font-medium uppercase leading-[15px] tracking-[0.25px] text-[#617385] 2xl:h-[39px] 2xl:py-3",
                      col.key === "lead" || col.key === "customer"
                        ? "px-3 2xl:px-4"
                        : col.key === "action"
                          ? "px-1.5 2xl:px-2"
                          : "px-2.5 2xl:px-3",
                      col.key === "action" && "text-center",
                      col.className,
                      col.key === "action" &&
                        cn(
                          actionStickyClass,
                          "bg-[#F8F9FA]",
                          showActionShadow && actionStickyShadow,
                        ),
                    )}
                  >
                    <span
                      className={cn(
                        "inline-flex items-center gap-1",
                        (col.key === "state" ||
                          col.key === "age" ||
                          col.key === "status" ||
                          col.key === "action") &&
                          "justify-center",
                      )}
                    >
                      {col.label}
                      {col.key !== "action" ? (
                        <IconSort className="opacity-80" />
                      ) : null}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-10 text-center text-sm text-[#617385]"
                  >
                    No leads match the current filters.
                  </td>
                </tr>
              ) : (
                filtered.map((lead) => (
                  <tr key={lead.id} className="group">
                    <td className="h-[56px] border-b border-[rgba(13,24,61,0.1)] px-3 py-3 align-middle 2xl:h-[68px] 2xl:px-4 2xl:py-4">
                      <div className="flex min-w-0 flex-col justify-start gap-0">
                        <span className="truncate text-xs font-medium leading-[17.4px] text-icr-navy 2xl:text-sm 2xl:leading-[20.3px]">
                          {lead.id}
                        </span>
                        <span className="truncate text-[11px] leading-[15px] text-[#9AA1A8] 2xl:text-xs 2xl:leading-[16.8px]">
                          {lead.title}
                        </span>
                      </div>
                    </td>
                    <td className="h-[56px] border-b border-[rgba(13,24,61,0.1)] px-3 py-3 align-middle whitespace-nowrap text-[10px] font-medium leading-[15px] text-icr-navy 2xl:h-[68px] 2xl:max-w-0 2xl:truncate 2xl:px-4 2xl:py-4">
                      {lead.customer}
                    </td>
                    <td className="h-[56px] max-w-0 truncate border-b border-[rgba(13,24,61,0.1)] px-2.5 py-3 align-middle text-[10px] font-medium leading-[15px] text-icr-navy 2xl:h-[68px] 2xl:px-3 2xl:py-4">
                      {lead.product}
                    </td>
                    <td className="h-[56px] max-w-0 truncate border-b border-[rgba(13,24,61,0.1)] px-2.5 py-3 text-left align-middle text-[10px] font-medium leading-[15px] text-icr-navy 2xl:h-[68px] 2xl:px-3 2xl:py-4">
                      {lead.region}
                    </td>
                    <td className="h-[56px] max-w-0 border-b border-[rgba(13,24,61,0.1)] px-2.5 py-3 align-middle text-[10px] font-medium leading-[15px] text-icr-navy 2xl:h-[68px] 2xl:px-3 2xl:py-4">
                      <span className="inline-flex max-w-full items-center gap-1.5">
                        <span
                          className="size-1.5 shrink-0 rounded-full lg:hidden"
                          style={{
                            backgroundColor:
                              deptDot[lead.department] ?? "#617385",
                          }}
                        />
                        <span className="truncate">{lead.department}</span>
                      </span>
                    </td>
                    <td className="h-[56px] border-b border-[rgba(13,24,61,0.1)] px-2.5 py-3 text-center align-middle 2xl:h-[68px] 2xl:px-3 2xl:py-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E9FDF3] px-[7px] py-0.5 text-[10px] font-medium leading-[15px] text-[#0D9B91]">
                        <span className="size-1.5 rounded-full bg-[#0D9B91]" />
                        Active
                      </span>
                    </td>
                    <td className="h-[56px] border-b border-[rgba(13,24,61,0.1)] px-2.5 py-3 text-center align-middle text-[10px] font-medium leading-[15px] text-icr-navy 2xl:h-[68px] 2xl:px-3 2xl:py-4">
                      {lead.age}
                    </td>
                    <td className="h-[56px] border-b border-[rgba(13,24,61,0.1)] px-2.5 py-3 text-center align-middle 2xl:h-[68px] 2xl:px-3 2xl:py-4">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td
                      className={cn(
                        actionStickyClass,
                        "h-[56px] border-b border-[rgba(13,24,61,0.1)] bg-white px-1.5 py-3 text-center align-middle 2xl:h-[68px] 2xl:px-2 2xl:py-4",
                        showActionShadow && actionStickyShadow,
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => openLead(lead)}
                        className="inline-flex h-8 w-10 items-center justify-center gap-2 rounded-[8px] bg-[#F8F9FA] text-icr-navy transition-colors hover:bg-[#ECF0F5] 2xl:h-9 2xl:w-12"
                        aria-label={`Open ${lead.id}`}
                      >
                        <IconChevronRight size={12} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex min-w-0 flex-col items-stretch gap-3 px-2 lg:flex-row lg:items-center lg:justify-between lg:px-3 lg:py-2.5 lg:pr-2 2xl:px-4 2xl:py-3 2xl:pr-3">
          <div className="hidden items-center gap-2 text-[13px] text-[#434343] lg:inline-flex 2xl:gap-2.5 2xl:text-base">
            Show by:
            <button
              type="button"
              className="inline-flex h-8 w-[100px] items-center justify-between rounded-lg border border-[#E9EBEE] bg-[#F8FAFB] px-2.5 text-[13px] text-[#7E848A] opacity-75 2xl:h-10 2xl:w-[122px] 2xl:rounded-xl 2xl:px-3 2xl:text-base"
            >
              7 items
              <IconChevronDown size={12} />
            </button>
          </div>
          <div className="mx-auto flex h-9 max-w-full items-center justify-center gap-1.5 overflow-x-auto px-2 lg:mx-0 2xl:h-11 2xl:gap-2">
            <button
              type="button"
              className="grid size-8 shrink-0 place-items-center text-[#5C5F6A] 2xl:size-10"
              aria-label="Previous page"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              <IconChevronLeft size={12} />
            </button>
            {[1, 2].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n)}
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-full text-[11px] font-medium capitalize leading-5 2xl:size-10 2xl:text-xs 2xl:leading-6",
                  page === n ? "bg-icr-navy text-white" : "text-[#474B57]",
                )}
              >
                {n}
              </button>
            ))}
            <span className="grid size-8 shrink-0 place-items-center text-xs font-medium text-[#474B57] 2xl:size-10 2xl:text-sm">
              …
            </span>
            {[23, 24].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n)}
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-full text-[11px] font-medium capitalize leading-5 2xl:size-10 2xl:text-xs 2xl:leading-6",
                  page === n ? "bg-icr-navy text-white" : "text-[#474B57]",
                )}
              >
                {n}
              </button>
            ))}
            <button
              type="button"
              className="grid size-8 shrink-0 place-items-center text-[#0E1422] 2xl:size-10"
              aria-label="Next page"
              onClick={() => setPage((p) => Math.min(24, p + 1))}
            >
              <IconChevronRight size={12} />
            </button>
          </div>
        </div>
      </section>

      <LeadDetailDrawer
        lead={selected}
        open={drawerOpen}
        onClose={closeDrawer}
      />
    </>
  );
}

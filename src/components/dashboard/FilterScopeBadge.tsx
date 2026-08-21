"use client";

import { useDashboardFilters } from "@/components/dashboard/DashboardFilters";

export function FilterScopeBadge() {
  const { scopeLabel } = useDashboardFilters();
  if (!scopeLabel) return null;

  return (
    <span className="inline-flex shrink-0 items-center rounded-full bg-[#ECF0F5] px-2 py-0.5 text-[10px] font-medium leading-[14px] text-icr-navy">
      {scopeLabel}
    </span>
  );
}

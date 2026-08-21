"use client";

import type { ReactNode } from "react";
import { DashboardFiltersProvider } from "@/components/dashboard/DashboardFilters";
import { MobileNavProvider } from "@/components/dashboard/MobileNav";

export function DashboardProviders({ children }: { children: ReactNode }) {
  return (
    <DashboardFiltersProvider>
      <MobileNavProvider>{children}</MobileNavProvider>
    </DashboardFiltersProvider>
  );
}

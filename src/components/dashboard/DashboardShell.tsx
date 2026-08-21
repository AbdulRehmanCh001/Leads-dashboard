"use client";

import dynamic from "next/dynamic";
import { useMobileNav } from "@/components/dashboard/MobileNav";
import { FilterBar, PageHeader } from "@/components/dashboard/PageHeader";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { SummarySection } from "@/components/dashboard/SummarySection";
import { TopBar } from "@/components/dashboard/TopBar";

function SectionSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-[14px] border border-[#DBDDE2] bg-white ${className ?? "h-48"}`}
    />
  );
}

const PortfolioOverview = dynamic(
  () =>
    import("@/components/dashboard/PortfolioOverview").then((m) => ({
      default: m.PortfolioOverview,
    })),
  { loading: () => <SectionSkeleton className="h-56" /> },
);

const WorkloadByDepartment = dynamic(
  () =>
    import("@/components/dashboard/WorkloadByDepartment").then((m) => ({
      default: m.WorkloadByDepartment,
    })),
  { loading: () => <SectionSkeleton className="h-72" /> },
);

const LeadRegister = dynamic(
  () =>
    import("@/components/dashboard/LeadRegister").then((m) => ({
      default: m.LeadRegister,
    })),
  { loading: () => <SectionSkeleton className="h-96" /> },
);

const MobileFiltersSheet = dynamic(
  () =>
    import("@/components/dashboard/MobileFiltersSheet").then((m) => ({
      default: m.MobileFiltersSheet,
    })),
  { ssr: false },
);

function MobileFiltersIsland() {
  const { filtersOpen } = useMobileNav();
  if (!filtersOpen) return null;
  return <MobileFiltersSheet />;
}

export function DashboardShell() {
  return (
    <>
      <div className="flex min-h-screen items-start bg-icr-bg">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col overflow-x-hidden">
          <TopBar />
          <main className="flex min-w-0 flex-col gap-3 overflow-x-hidden px-4 py-4 pb-12 lg:gap-4 lg:px-6 lg:pt-6 lg:pb-[60px]">
            <div className="flex flex-col gap-3 lg:gap-5">
              <PageHeader />
              <FilterBar />
            </div>
            <SummarySection />
            <PortfolioOverview />
            <WorkloadByDepartment />
            <LeadRegister />
          </main>
        </div>
      </div>
      <MobileFiltersIsland />
    </>
  );
}

import { DashboardProviders } from "@/components/dashboard/DashboardProviders";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export function Dashboard() {
  return (
    <DashboardProviders>
      <DashboardShell />
    </DashboardProviders>
  );
}

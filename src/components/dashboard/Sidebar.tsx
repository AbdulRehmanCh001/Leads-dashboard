"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useMobileNav } from "@/components/dashboard/MobileNav";
import { cn } from "@/lib/utils";

const allLeadsSubs = [
  "Pipeline Overview",
  "Sales",
  "Engineering",
  "Commercial",
  "History",
] as const;

const userSubs = ["Overview", "Users", "Groups", "Policies"] as const;

const navRow =
  "flex w-full items-center gap-2.5 py-2.5 pr-3 pl-4 text-left";
const navLabel =
  "text-[14px] font-[350] leading-5 whitespace-nowrap text-[#6C7C8D]";
const subLabel =
  "text-[14px] font-[350] leading-5 whitespace-nowrap text-[rgba(29,54,80,0.65)]";
const chevron =
  "h-4 w-4 shrink-0 object-contain transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]";
const navIcon = "size-5 shrink-0 object-contain";

function NavLabel({
  children,
  className,
  collapsed,
}: {
  children: ReactNode;
  className?: string;
  collapsed: boolean;
}) {
  return (
    <span
      className={cn(
        "min-w-0 flex-1 overflow-hidden transition-all duration-200",
        collapsed && "pointer-events-none max-w-0 flex-none opacity-0",
      )}
    >
      <span className={cn("block", navLabel, className)}>{children}</span>
    </span>
  );
}

function Submenu({
  open,
  children,
}: {
  open: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
      )}
      aria-hidden={!open}
    >
      <div className="min-h-0 overflow-hidden">
        <div
          className={cn(
            "pl-6 transition-[padding,opacity] duration-300",
            open ? "py-2.5 opacity-100" : "py-0 opacity-0",
          )}
        >
          <div className="flex w-full flex-col border-l border-[rgba(13,24,61,0.15)] pl-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarNav({
  collapsed,
  setCollapsed,
  onNavigate,
  mobile,
}: {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  onNavigate?: () => void;
  mobile?: boolean;
}) {
  const [allLeadsOpen, setAllLeadsOpen] = useState(true);
  const [userMgmtOpen, setUserMgmtOpen] = useState(true);
  const allOpen = allLeadsOpen && !collapsed;
  const userOpen = userMgmtOpen && !collapsed;

  return (
    <>
      <div
        className={cn(
          "box-border flex h-10 w-full shrink-0 items-center justify-between self-stretch",
          collapsed ? "justify-center pl-0" : "pl-5",
        )}
      >
        <div
          className={cn(
            "relative h-5 w-[51.9px] shrink-0 overflow-hidden transition-[width,opacity] duration-200",
            collapsed && "w-0 opacity-0",
          )}
        >
          <img
            src="/assets/images/logo.svg"
            alt="ICR"
            className="h-5 w-auto max-w-none"
          />
        </div>
        <button
          type="button"
          aria-label={
            mobile
              ? "Close menu"
              : collapsed
                ? "Expand sidebar"
                : "Collapse sidebar"
          }
          onClick={() => {
            if (mobile) onNavigate?.();
            else setCollapsed(!collapsed);
          }}
          className="grid size-9 shrink-0 place-items-center rounded-md"
        >
          <img
            className="h-5 w-5"
            src="/assets/icons/sidebarHumberger.svg"
            alt=""
          />
        </button>
      </div>

      <div className="flex w-full flex-1 flex-col">
        <div
          className={cn(
            "w-full py-4",
            collapsed ? "flex justify-center px-0" : "pr-3 pl-4",
          )}
        >
          <button
            type="button"
            onClick={onNavigate}
            aria-label="New Lead"
            className={cn(
              "inline-flex items-center justify-center gap-1 overflow-hidden rounded-[10px] bg-icr-orange text-white transition-colors hover:bg-[#e57818]",
              collapsed
                ? "size-10"
                : "w-full px-4 py-2.5 text-[12px] font-[350] leading-[17.4px]",
            )}
          >
            <img
              className="size-4 shrink-0"
              src="/assets/icons/newLead.svg"
              alt=""
            />
            {!collapsed ? <span>New Lead</span> : null}
          </button>
        </div>

        <div className="flex w-full flex-col">
          <button
            type="button"
            className={navRow}
            onClick={() => {
              if (collapsed) setCollapsed(false);
              else setAllLeadsOpen((v) => !v);
            }}
          >
            <img
              className={navIcon}
              src="/assets/icons/SidebarLeeds.svg"
              alt=""
            />
            <NavLabel collapsed={collapsed}>All Leads</NavLabel>
            {!collapsed ? (
              <img
                className={cn(chevron, allOpen && "rotate-180")}
                src="/assets/icons/chevronUp.svg"
                alt=""
              />
            ) : null}
          </button>
          <Submenu open={allOpen}>
            {allLeadsSubs.map((item) => (
              <button
                key={item}
                type="button"
                className="flex h-10 w-full flex-col justify-center rounded-lg px-3 py-2.5 text-left"
                onClick={onNavigate}
              >
                <span className={subLabel}>{item}</span>
              </button>
            ))}
          </Submenu>
        </div>

        <button type="button" className={navRow} onClick={onNavigate}>
          <img
            className={navIcon}
            src="/assets/icons/dashboardIcon.svg"
            alt=""
          />
          <NavLabel collapsed={collapsed} className="font-medium text-icr-orange">
            Dashboard
          </NavLabel>
        </button>

        <button type="button" className={navRow} onClick={onNavigate}>
          <img
            className={navIcon}
            src="/assets/icons/customers.svg"
            alt=""
          />
          <NavLabel
            collapsed={collapsed}
            className="text-[rgba(29,54,80,0.65)]"
          >
            Customers
          </NavLabel>
        </button>

        <div className="flex w-full flex-col">
          <button
            type="button"
            className={navRow}
            onClick={() => {
              if (collapsed) setCollapsed(false);
              else setUserMgmtOpen((v) => !v);
            }}
          >
            <img
              className={navIcon}
              src="/assets/icons/userManagement.svg"
              alt=""
            />
            <NavLabel collapsed={collapsed}>User Management</NavLabel>
            {!collapsed ? (
              <img
                className={cn(chevron, userOpen && "rotate-180")}
                src="/assets/icons/chevronUp.svg"
                alt=""
              />
            ) : null}
          </button>
          <Submenu open={userOpen}>
            {userSubs.map((item) => (
              <button
                key={item}
                type="button"
                className="flex h-10 w-full flex-col justify-center px-3 py-2.5 text-left"
                onClick={onNavigate}
              >
                <span className={subLabel}>{item}</span>
              </button>
            ))}
          </Submenu>
        </div>

        <div className="pt-0.5">
          <button type="button" className={navRow} onClick={onNavigate}>
            <img
              className="size-4 shrink-0 object-contain"
              src="/assets/icons/support.svg"
              alt=""
            />
            <NavLabel
              collapsed={collapsed}
              className="text-[rgba(29,54,80,0.65)]"
            >
              Support
            </NavLabel>
          </button>
        </div>
      </div>
    </>
  );
}

export function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useMobileNav();
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <aside
        className={cn(
          "sticky top-0 hidden h-screen min-h-screen w-60 shrink-0 flex-col items-start overflow-x-hidden overflow-y-auto border-r border-[#e6ebf1] bg-white text-[14px] text-[#6C7C8D] transition-[width,padding] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] lg:flex",
          collapsed ? "w-[72px] p-3" : "w-60 p-3",
        )}
      >
        <SidebarNav collapsed={collapsed} setCollapsed={setCollapsed} />
      </aside>

      {mounted ? (
        <>
          <div
            className={cn(
              "fixed inset-0 z-40 bg-[rgba(16,24,40,0.45)] transition-opacity duration-300 lg:hidden",
              sidebarOpen
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0",
            )}
            onClick={() => setSidebarOpen(false)}
            aria-hidden={!sidebarOpen}
          />
          <aside
            className={cn(
              "fixed top-0 left-0 z-50 flex h-screen w-[min(280px,85vw)] flex-col overflow-x-hidden overflow-y-auto border-r border-[#e6ebf1] bg-white p-3 text-[14px] text-[#6C7C8D] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] lg:hidden",
              sidebarOpen ? "translate-x-0" : "-translate-x-full",
            )}
          >
            <SidebarNav
              collapsed={false}
              setCollapsed={setCollapsed}
              onNavigate={() => setSidebarOpen(false)}
              mobile
            />
          </aside>
        </>
      ) : null}
    </>
  );
}

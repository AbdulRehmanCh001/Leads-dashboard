"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useMobileNav } from "@/components/dashboard/MobileNav";
import {
  IconChevronDown,
  IconGlobeOutline,
  IconHelp,
  IconSearch,
} from "@/components/icons";
import { cn } from "@/lib/utils";

const topRegions = ["Global", "North America", "EMEA", "APAC"] as const;

export function TopBar() {
  const { toggleSidebar } = useMobileNav();
  const [open, setOpen] = useState(false);
  const [topRegion, setTopRegion] =
    useState<(typeof topRegions)[number]>("Global");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-auto min-h-[56px] items-center justify-between gap-3 border-b border-[#E6EBF1] bg-white px-4 py-2 lg:h-[52px] lg:px-4 lg:py-2 2xl:h-[61px] 2xl:gap-4 2xl:px-5 2xl:py-3">
      <div className="flex items-center gap-0 lg:hidden">
        <button
          type="button"
          aria-label="Open menu"
          onClick={toggleSidebar}
          className="inline-flex rounded-md bg-white p-2.5"
        >
          <img
            src="/assets/icons/Menu.svg"
            alt=""
            width={20}
            height={20}
            className="size-5"
          />
        </button>
        <img
          src="/assets/images/logo.svg"
          alt="ICR"
          className="h-[18px] w-auto"
        />
        <button
          type="button"
          aria-label="Search"
          className="inline-flex rounded-md bg-white p-2.5"
        >
          <IconSearch size={20} className="text-[rgba(29,54,80,0.8)]" />
        </button>
      </div>

      <div ref={ref} className="relative hidden lg:block">
        <button
          id="top-region-filter"
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-1.5 rounded-[8px] border border-[#E9EBEE] bg-white px-2.5 py-1.5 text-icr-navy 2xl:gap-2 2xl:rounded-[10px] 2xl:px-3 2xl:py-2"
        >
          <IconGlobeOutline size={13} className="text-icr-navy" />
          <span className="text-[11px] font-semibold text-[#6A7282] 2xl:text-sm">
            REGION
          </span>
          <span className="text-[13px] font-semibold text-icr-navy 2xl:text-base">
            {topRegion}
          </span>
          <span
            className={cn(
              "inline-flex transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
              open && "rotate-180",
            )}
          >
            <IconChevronDown size={14} className="text-[#6A7282]" />
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
            {topRegions.map((item) => (
              <button
                key={item}
                type="button"
                className={cn(
                  "flex w-full px-3 py-2 text-left text-sm hover:bg-[#F8F9FA]",
                  item === topRegion
                    ? "font-medium text-icr-orange"
                    : "text-icr-navy",
                )}
                onClick={() => {
                  setTopRegion(item);
                  setOpen(false);
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 lg:gap-2 2xl:gap-3">
        <label className="hidden h-8 w-[220px] items-center gap-2 rounded-lg border border-[#E6EBF1] bg-white px-2.5 text-[11px] text-[#6C7C8D] lg:flex 2xl:h-9 2xl:w-[280px] 2xl:text-xs">
          <IconSearch size={14} />
          <input
            type="search"
            placeholder="Search leads or customers…"
            className="w-full border-none bg-transparent text-icr-navy outline-none placeholder:text-[#6C7C8D]"
          />
        </label>
        <button
          type="button"
          className="hidden size-7 place-items-center rounded-[10px] text-[#6A7282] lg:grid 2xl:size-8"
          aria-label="Help"
        >
          <IconHelp size={15} />
        </button>
        <div className="flex items-center gap-1 lg:hidden">
          <button
            type="button"
            aria-label="Settings"
            className="inline-flex items-center justify-center rounded-md bg-white p-2.5"
          >
            <img
              src="/assets/icons/settings.svg"
              alt=""
              width={20}
              height={20}
              className="size-5"
            />
          </button>
          <button
            type="button"
            aria-label="Notifications"
            className="inline-flex items-center justify-center rounded-md bg-white p-2.5"
          >
            <img
              src="/assets/icons/Notification.svg"
              alt=""
              width={20}
              height={20}
              className="size-5"
            />
          </button>
        </div>
        <Image
          src="/assets/images/user.png"
          alt=""
          width={40}
          height={40}
          className="size-10 rounded-full object-cover outline outline-1 outline-[rgba(29,54,80,0.10)] lg:size-7 2xl:size-8"
          priority
        />
      </div>
    </header>
  );
}

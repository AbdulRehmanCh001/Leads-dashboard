"use client";

import { useEffect, useState } from "react";
import {
  IconBell,
  IconChevronDown,
  IconClock,
  IconClose,
  IconDoc,
  IconDownload,
  IconMenu,
  IconPencil,
  IconPin,
  IconTagX,
  IconUpload,
  IconUser,
} from "@/components/icons";
import { cn } from "@/lib/utils";

export type LeadDetail = {
  id: string;
  title: string;
  customer: string;
  product: string;
  region: string;
  department: string;
  age: string;
  status: "At Risk" | "Within SLA" | "Breached";
};

type DocStatus = "Pending" | "Revision" | "Done";

const documents: {
  name: string;
  date: string;
  status: DocStatus;
  dept: string;
}[] = [
  {
    name: "Quote (Rev 1)",
    date: "Feb 12, 2026",
    status: "Pending",
    dept: "Commercial",
  },
  {
    name: "Quote",
    date: "Feb 12, 2026",
    status: "Revision",
    dept: "Commercial",
  },
  {
    name: "Engineering package",
    date: "Feb 12, 2026",
    status: "Done",
    dept: "Engineering",
  },
  {
    name: "Intake Form",
    date: "Feb 12, 2026",
    status: "Done",
    dept: "Customer",
  },
];

const activities = [
  {
    icon: "doc" as const,
    parts: [
      { t: "Nina P.", bold: true },
      { t: "Uploaded", bold: false },
      { t: "Engineering Package", bold: true },
    ],
    time: "15 hours ago",
    person: "Nina P.",
    tag: "Engineering",
  },
  {
    icon: "pin" as const,
    parts: [
      { t: "John Doe", bold: true },
      { t: "Pinned", bold: false },
      { t: "Nina P.", bold: true },
    ],
    time: "23 hours ago",
    person: "Nina P.",
    tag: "Sales → Engineering",
  },
  {
    icon: "up" as const,
    parts: [
      { t: "SAP ID", bold: true },
      { t: "assigned", bold: false },
    ],
    time: "1d ago",
    person: "John d.",
    tag: "Sales",
  },
  {
    icon: "user" as const,
    parts: [
      { t: "John Doe", bold: true },
      { t: "Self Assigned", bold: false },
    ],
    time: "2d ago",
    person: "John d.",
    tag: "Sales",
  },
  {
    icon: "doc" as const,
    parts: [
      { t: "New Lead", bold: true },
      { t: "Created", bold: false },
    ],
    time: "2d ago",
    person: "Annie",
    tag: "Customer",
  },
];

const infoCells = [
  { label: "SAP ID", value: "---", edit: true },
  { label: "Owner", value: "John Doe" },
  { label: "Region", value: "UK" },
  { label: "Created at", value: "3d ago" },
  { label: "Current Status", value: "Step 1 - Intake" },
  { label: "Cycles", value: "3 cycles" },
  { label: "Revisions", value: "1st" },
  { label: "Form type", value: "1" },
];

function DocStatusPill({ status }: { status: DocStatus }) {
  if (status === "Done") {
    return (
      <span className="inline-flex rounded-full bg-[#ECF5F0] px-2 py-1.5 text-[9px] font-medium leading-[13.5px] text-[#21B972]">
        Done
      </span>
    );
  }
  return (
    <span className="inline-flex rounded-full bg-[#FCF6E8] px-2 py-1.5 text-[9px] font-medium leading-[13.5px] text-[#EEB029]">
      {status}
    </span>
  );
}

function ActivityIcon({ type }: { type: (typeof activities)[0]["icon"] }) {
  if (type === "pin") return <IconPin size={16} />;
  if (type === "user") return <IconUser size={16} />;
  if (type === "up") return <IconChevronDown size={16} className="rotate-180" />;
  return <IconDoc size={16} />;
}

export function LeadDetailDrawer({
  lead,
  open,
  onClose,
}: {
  lead: LeadDetail | null;
  open: boolean;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tab, setTab] = useState<"comments" | "activity">("activity");
  const [infoOpen, setInfoOpen] = useState(true);

  useEffect(() => {
    if (open) {
      setMounted(true);
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
      return () => cancelAnimationFrame(id);
    }
    setVisible(false);
    const t = window.setTimeout(() => setMounted(false), 320);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!mounted || !lead) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-x-hidden" role="dialog" aria-modal="true">
      <button
        type="button"
        aria-label="Close overlay"
        className={cn(
          "absolute inset-0 bg-[rgba(29,54,80,0.28)] transition-opacity duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          visible ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
      />
      <aside
        className={cn(
          "absolute top-0 right-0 flex h-full w-full max-w-[448px] flex-col overflow-x-hidden overflow-y-auto bg-white p-4 shadow-[-8px_0_32px_rgba(16,24,40,0.12)] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          visible ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex w-full flex-col items-center gap-3.5">
          <div className="flex w-full max-w-[416px] flex-col gap-2">
            <div className="flex items-start gap-6">
              <div className="flex min-w-0 flex-1 flex-wrap items-start gap-1">
                <span className="inline-flex items-center gap-1 rounded-md border border-[rgba(29,54,80,0.15)] bg-white px-2 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#21B972]" />
                  <span className="text-[10px] font-medium leading-[15px] text-[#21B972]">
                    Active Lead
                  </span>
                </span>
                <span className="inline-flex items-center gap-1 rounded-md border border-[rgba(29,54,80,0.15)] bg-white px-2 py-1 text-[10px] font-medium leading-[15px] text-[rgba(29,54,80,0.7)]">
                  <IconClock size={12} className="text-[#617385]" />
                  Updated 30 mins ago
                </span>
                <span className="inline-flex items-center gap-1 rounded-md border border-[rgba(29,54,80,0.15)] bg-white px-2 py-1 text-[10px] font-medium leading-[15px] text-[rgba(29,54,80,0.7)]">
                  <span className="inline-flex size-2.5 rounded-sm border border-icr-orange" />
                  Revision
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  className="grid size-[23px] place-items-center rounded-md border border-[#DDE1E5] text-icr-navy"
                  aria-label="More"
                >
                  <IconMenu size={12} />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="grid size-[23px] place-items-center rounded-md border border-[rgba(29,54,80,0.15)] bg-white text-icr-navy"
                  aria-label="Close"
                >
                  <IconClose size={12} />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="m-0 text-sm font-medium leading-[16.8px] text-icr-navy">
                {lead.title}
              </h2>
              <div className="relative flex items-start gap-1 pt-0.5">
                <p className="m-0 line-clamp-2 flex-1 pr-4 text-xs leading-[16.8px] text-[rgba(29,54,80,0.7)]">
                  This description serves to demonstrate the text&apos;s
                  functionality. It is confined to 2 lines, after which it will
                  not be visible.
                </p>
                <button
                  type="button"
                  className="mt-auto shrink-0 text-icr-navy"
                  aria-label="Edit description"
                >
                  <IconPencil size={12} />
                </button>
              </div>
              <div className="mt-1 h-px w-full bg-[#EAECF0]" />
            </div>
          </div>

          <div className="flex w-full max-w-[416px] items-start gap-1">
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1">
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-md border border-[rgba(29,54,80,0.15)] bg-white px-2 py-1 text-xs font-medium leading-[18px] text-[rgba(29,54,80,0.7)]"
              >
                <IconDoc size={12} />
                Review Form
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-md border border-[rgba(29,54,80,0.15)] bg-white px-2 py-1 text-xs font-medium leading-[18px] text-[rgba(29,54,80,0.7)]"
              >
                <IconBell size={12} className="text-[#617385]" />
                Nudge
              </button>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-md border border-[rgba(29,54,80,0.1)] bg-white px-2 py-[5px] text-[11px] font-medium leading-[14.3px] text-[#617385]"
            >
              High Priority
              <IconChevronDown size={14} className="text-[rgba(29,54,80,0.7)]" />
            </button>
          </div>

          <div className="flex w-full max-w-[416px] flex-col gap-1.5">
            <div className="flex items-center gap-1.5">
              <div className="flex-1 text-xs font-medium leading-[14.4px] text-icr-navy">
                Lead Info
              </div>
              <button
                type="button"
                onClick={() => setInfoOpen((v) => !v)}
                className="text-[8px] font-medium leading-[9.6px] text-icr-orange underline"
              >
                {infoOpen ? "Show less" : "Show more"}
              </button>
            </div>
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
                infoOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="flex flex-col gap-1">
                  <div className="grid grid-cols-4 gap-1">
                    {infoCells.slice(0, 4).map((cell) => (
                      <div
                        key={cell.label}
                        className="relative flex flex-col rounded-lg bg-[#ECF0F5] px-3 py-2"
                      >
                        <span className="text-[8px] font-medium leading-3 text-[rgba(29,54,80,0.5)]">
                          {cell.label}
                        </span>
                        <span className="text-xs font-medium leading-[18px] text-[rgba(29,54,80,0.7)]">
                          {cell.value}
                        </span>
                        {cell.edit ? (
                          <span className="absolute top-[3px] right-2 text-[#617385]">
                            <IconPencil size={10} />
                          </span>
                        ) : null}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-4 gap-1">
                    {infoCells.slice(4).map((cell) => (
                      <div
                        key={cell.label}
                        className="flex flex-col rounded-lg bg-[#ECF0F5] px-3 py-2"
                      >
                        <span className="text-[8px] font-medium leading-3 text-[rgba(29,54,80,0.5)]">
                          {cell.label}
                        </span>
                        <span className="text-xs font-medium leading-[18px] text-[rgba(29,54,80,0.7)]">
                          {cell.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full max-w-[416px] flex-wrap items-center gap-1 rounded-lg border border-[#DDE1E5] p-1">
            {["Offshore Operations", "High Priority Task"].map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-md bg-[#FDF1E6] px-1.5 py-1 text-[10px] leading-[14px] text-icr-navy"
              >
                {tag}
                <button type="button" aria-label={`Remove ${tag}`}>
                  <IconTagX size={10} className="text-[rgba(29,54,80,0.7)]" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex w-full max-w-[416px] flex-col gap-1.5 rounded-[10px] border border-[#DDE1E5] p-3">
            <div className="text-xs font-medium leading-[14.4px] text-icr-navy">
              Documents
            </div>
            <div className="h-px w-full bg-[#EAECF0]" />
            <div className="flex flex-col gap-1.5">
              {documents.map((doc) => (
                <div
                  key={doc.name}
                  className="flex items-center rounded-md bg-white p-1"
                >
                  <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                    <span className="text-[10px] font-medium leading-[15px] text-[rgba(29,54,80,0.7)]">
                      {doc.name}
                    </span>
                    <span className="text-[7px] font-medium leading-[10.5px] text-[rgba(29,54,80,0.42)]">
                      {doc.date}
                    </span>
                  </div>
                  <div className="flex w-[90px] justify-center">
                    <DocStatusPill status={doc.status} />
                  </div>
                  <div className="flex w-[124px] justify-center">
                    <span className="inline-flex rounded-full bg-[#ECF0F5] px-2 py-1.5 text-[9px] font-medium leading-[13.5px] text-[rgba(29,54,80,0.7)]">
                      {doc.dept}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="grid size-[18px] place-items-center rounded border border-[#DDE1E5] text-[#617385]"
                    aria-label={`Download ${doc.name}`}
                  >
                    <IconDownload size={10} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="flex min-h-[79px] w-full flex-col items-center justify-center gap-1 rounded-md border border-dashed border-icr-orange bg-[rgba(246,134,31,0.06)] px-3 py-4 text-center"
              >
                <IconUpload className="text-icr-orange" />
                <span className="text-[10px] font-medium text-icr-navy">
                  Drop files here or click to upload
                </span>
                <span className="text-[9px] text-[rgba(29,54,80,0.55)]">
                  PDF, DOCX, DWG, XLSX up to 25MB
                </span>
              </button>
            </div>
          </div>

          <div className="flex w-full max-w-[417px] flex-col gap-3.5 rounded-[10px] border border-[#DDE1E5] p-3">
            <div className="flex rounded-lg bg-[#ECF0F5] p-0.5">
              <button
                type="button"
                onClick={() => setTab("comments")}
                className={cn(
                  "inline-flex flex-1 items-center justify-center gap-1 rounded-[7px] px-2 py-1.5 text-[10px] font-medium",
                  tab === "comments"
                    ? "bg-white text-icr-orange"
                    : "text-[#617385]",
                )}
              >
                Comments & Feedback
              </button>
              <button
                type="button"
                onClick={() => setTab("activity")}
                className={cn(
                  "inline-flex flex-1 items-center justify-center gap-1 rounded-[7px] px-2 py-1.5 text-[10px] font-medium",
                  tab === "activity"
                    ? "bg-white text-icr-orange"
                    : "text-[#617385]",
                )}
              >
                Activity History
                <span
                  className={cn(
                    "inline-flex h-3.5 min-w-3.5 items-center justify-center rounded px-1 text-[10px] font-medium leading-[13.5px] text-white",
                    tab === "activity" ? "bg-icr-orange" : "bg-[#617385]",
                  )}
                >
                  5
                </span>
              </button>
            </div>

            {tab === "activity" ? (
              <div className="flex flex-col gap-1.5">
                <div className="text-xs font-medium leading-[14.4px] text-icr-navy">
                  Activity History
                </div>
                <div className="h-px w-full bg-[#EAECF0]" />
                <div className="flex flex-col">
                  {activities.map((item, i) => (
                    <div
                      key={`${item.time}-${i}`}
                      className={cn(
                        "flex flex-col gap-2 bg-white py-3",
                        i < activities.length - 1 &&
                          "border-b border-[#ECF0F5]",
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="shrink-0 text-[#617385]">
                          <ActivityIcon type={item.icon} />
                        </span>
                        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-0.5 text-[11px] leading-[15.95px] text-[#617385]">
                          {item.parts.map((p, pi) => (
                            <span
                              key={`${pi}-${p.t}`}
                              className={p.bold ? "font-medium" : "font-normal"}
                            >
                              {p.t}
                            </span>
                          ))}
                        </div>
                        <span className="shrink-0 text-[10px] leading-[14px] text-[#97A4B0]">
                          {item.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 pl-[26px]">
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-medium leading-[14px] text-[#97A4B0]">
                          <IconUser size={12} />
                          {item.person}
                        </span>
                        <span className="inline-flex rounded-full bg-[#ECF0F5] px-2 py-1.5 text-[9px] font-medium leading-[13.5px] text-[rgba(29,54,80,0.7)]">
                          {item.tag}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-[#617385]">
                No comments yet
              </div>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}

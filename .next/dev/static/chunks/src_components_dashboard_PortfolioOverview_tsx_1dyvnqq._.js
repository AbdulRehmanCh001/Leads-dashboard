(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/dashboard/PortfolioOverview.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PortfolioOverview",
    ()=>PortfolioOverview
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$DashboardFilters$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/DashboardFilters.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$FilterScopeBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/FilterScopeBadge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/icons/index.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const regionItems = [
    {
        label: "North America",
        current: 91,
        previous: 78,
        completedLastMonth: 96,
        baselineMedian: 31
    },
    {
        label: "EMEA",
        current: 79,
        previous: 72,
        completedLastMonth: 84,
        baselineMedian: 28
    },
    {
        label: "APAC",
        current: 70,
        previous: 64,
        completedLastMonth: 73,
        baselineMedian: 24
    }
];
const customerItems = [
    {
        label: "North shore Energy",
        current: 17,
        previous: 14,
        completedLastMonth: 18,
        baselineMedian: 9
    },
    {
        label: "Ardent Chemicals",
        current: 15,
        previous: 13,
        completedLastMonth: 16,
        baselineMedian: 8
    },
    {
        label: "Bluewater systems",
        current: 14,
        previous: 12,
        completedLastMonth: 15,
        baselineMedian: 7
    },
    {
        label: "Maritech Group",
        current: 13,
        previous: 11,
        completedLastMonth: 14,
        baselineMedian: 6
    }
];
const productItems = [
    {
        label: "Quickflange",
        current: 88,
        previous: 76,
        completedLastMonth: 92,
        baselineMedian: 30
    },
    {
        label: "Techwrap",
        current: 71,
        previous: 68,
        completedLastMonth: 75,
        baselineMedian: 26
    }
];
function SnapshotTooltip({ item }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-[220px] rounded-2xl bg-white px-5 py-4 text-left shadow-[0_8px_28px_rgba(16,24,40,0.18)]",
        role: "tooltip",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm font-bold leading-5 text-icr-navy",
                children: item.label
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 text-[13px] leading-5 text-icr-navy",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-bold",
                        children: item.current
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this),
                    " Total Leads this month"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
                lineNumber: 96,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-0.5 text-[13px] leading-5 text-icr-navy",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-bold",
                        children: item.completedLastMonth
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this),
                    " Completed Last month."
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "my-3 h-px bg-icr-border"
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
                lineNumber: 103,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-[13px] leading-5 text-icr-navy",
                children: [
                    "Baseline Median ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-bold",
                        children: item.baselineMedian
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
                        lineNumber: 105,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute top-full left-1/2 -mt-px -translate-x-1/2 border-x-[7px] border-t-[8px] border-x-transparent border-t-white",
                "aria-hidden": true
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
        lineNumber: 91,
        columnNumber: 5
    }, this);
}
_c = SnapshotTooltip;
function ChartCard({ title, items, max, onBarClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "overflow-visible rounded-[14px] border border-icr-border bg-icr-surface py-4 lg:rounded-[10px] lg:p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "mb-4 mt-0 px-3 text-xs font-medium leading-[15px] text-icr-navy lg:mb-3.5 lg:px-0 lg:text-sm lg:font-semibold",
                children: title
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
                lineNumber: 128,
                columnNumber: 7
            }, this),
            items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("group relative mb-4 flex w-full flex-col gap-1.5 px-3 text-left last:mb-0 lg:mb-3 lg:grid lg:grid-cols-[110px_1fr_28px] lg:items-center lg:gap-2 lg:px-0", onBarClick && "cursor-pointer rounded-md hover:bg-[#F8F9FA]", !onBarClick && "cursor-default"),
                    onClick: ()=>onBarClick?.(item.label),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pointer-events-none invisible absolute bottom-full left-1/2 z-30 mb-2.5 -translate-x-1/2 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-visible:visible group-focus-visible:opacity-100",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SnapshotTooltip, {
                                item: item
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
                                lineNumber: 143,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
                            lineNumber: 142,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-[10px] leading-[18px] text-[#6D7280] lg:text-xs lg:leading-4 lg:text-icr-navy",
                            children: item.label
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
                            lineNumber: 145,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex min-w-0 items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex min-w-0 flex-1 flex-col gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative h-[7px] overflow-hidden rounded",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "relative block h-full rounded bg-icr-bar-prev lg:bg-icr-bar-prev",
                                                style: {
                                                    width: `${item.previous / max * 100}%`
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
                                                lineNumber: 151,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
                                            lineNumber: 150,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative h-[7px] overflow-hidden rounded",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "relative block h-full rounded bg-[#D9AB82]",
                                                style: {
                                                    width: `${item.current / max * 100}%`
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
                                                lineNumber: 157,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
                                            lineNumber: 156,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
                                    lineNumber: 149,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-7 shrink-0 text-right text-[10px] font-medium leading-[18px] text-[#6D7280] lg:hidden",
                                    children: item.current
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
                                    lineNumber: 163,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
                            lineNumber: 148,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden text-right text-xs font-semibold text-icr-navy lg:block",
                            children: item.current
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
                            lineNumber: 167,
                            columnNumber: 11
                        }, this)
                    ]
                }, item.label, true, {
                    fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
                    lineNumber: 132,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-1 flex justify-between px-3 text-[10px] leading-[18px] text-[#6D7280] lg:ml-[110px] lg:px-0 lg:pr-7 lg:text-[11px] lg:text-icr-muted",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "0"
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
                        lineNumber: 173,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: Math.round(max * 0.25)
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
                        lineNumber: 174,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: Math.round(max * 0.5)
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
                        lineNumber: 175,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: Math.round(max * 0.75)
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
                        lineNumber: 176,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: max
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
                        lineNumber: 177,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
                lineNumber: 172,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 flex justify-center gap-5 text-[10px] leading-[14px] text-icr-navy lg:mt-3 lg:gap-4 lg:text-xs lg:text-icr-muted",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-flex items-center gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "inline-block h-2 w-2 rounded-full bg-[#D9AB82]"
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
                                lineNumber: 181,
                                columnNumber: 11
                            }, this),
                            " Current month"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
                        lineNumber: 180,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-flex items-center gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "inline-block h-2 w-2 rounded-full bg-[#D9D9D9]"
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
                                lineNumber: 185,
                                columnNumber: 11
                            }, this),
                            " Previous month"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
                        lineNumber: 184,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
                lineNumber: 179,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
        lineNumber: 127,
        columnNumber: 5
    }, this);
}
_c1 = ChartCard;
function PortfolioOverview() {
    _s();
    const { region, product, regionActive, productActive, setRegion, setProduct } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$DashboardFilters$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDashboardFilters"])();
    const regions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PortfolioOverview.useMemo[regions]": ()=>regionActive ? regionItems.filter({
                "PortfolioOverview.useMemo[regions]": (item)=>item.label === region
            }["PortfolioOverview.useMemo[regions]"]) : regionItems
    }["PortfolioOverview.useMemo[regions]"], [
        region,
        regionActive
    ]);
    const products = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PortfolioOverview.useMemo[products]": ()=>productActive ? productItems.filter({
                "PortfolioOverview.useMemo[products]": (item)=>item.label === product
            }["PortfolioOverview.useMemo[products]"]) : productItems
    }["PortfolioOverview.useMemo[products]"], [
        product,
        productActive
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "overflow-visible rounded-[14px] border border-[#DBDDE2] bg-white p-4 lg:rounded-xl lg:border-icr-border lg:p-5 lg:shadow-[0_1px_2px_rgba(16,24,40,0.04)]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 flex items-start justify-between gap-3 lg:mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "m-0 text-sm font-medium leading-[17.5px] text-icr-navy lg:text-lg lg:font-bold",
                                        children: "Portfolio overview"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
                                        lineNumber: 224,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$FilterScopeBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FilterScopeBadge"], {}, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
                                        lineNumber: 227,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
                                lineNumber: 223,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-0.5 mb-0 text-xs leading-[16.8px] text-[rgba(29,54,80,0.65)] lg:text-[13px] lg:text-icr-muted",
                                children: "Current vs previous month workload"
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
                                lineNumber: 229,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
                        lineNumber: 222,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden items-center gap-1.5 text-xs text-icr-muted lg:inline-flex",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IconInfo"], {}, void 0, false, {
                                fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
                                lineNumber: 234,
                                columnNumber: 11
                            }, this),
                            "Click bar to filter leads in the register below."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
                        lineNumber: 233,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
                lineNumber: 221,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 gap-3 overflow-visible lg:grid-cols-3 lg:gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChartCard, {
                        title: "Region Snapshot",
                        max: 100,
                        items: regions,
                        onBarClick: (label)=>{
                            if (label === "North America" || label === "EMEA" || label === "APAC") {
                                setRegion(label);
                            }
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
                        lineNumber: 239,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChartCard, {
                        title: "Top Customer",
                        max: 20,
                        items: customerItems
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
                        lineNumber: 253,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChartCard, {
                        title: "Product Snapshot",
                        max: 100,
                        items: products,
                        onBarClick: (label)=>{
                            if (label === "Quickflange" || label === "Techwrap") {
                                setProduct(label);
                            }
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
                        lineNumber: 254,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
                lineNumber: 238,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/dashboard/PortfolioOverview.tsx",
        lineNumber: 220,
        columnNumber: 5
    }, this);
}
_s(PortfolioOverview, "YQYVI8yQpAjCV4UNSPsd83hbiCE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$DashboardFilters$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDashboardFilters"]
    ];
});
_c2 = PortfolioOverview;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "SnapshotTooltip");
__turbopack_context__.k.register(_c1, "ChartCard");
__turbopack_context__.k.register(_c2, "PortfolioOverview");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/dashboard/PortfolioOverview.tsx [app-client] (ecmascript, next/dynamic entry)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/dashboard/PortfolioOverview.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_components_dashboard_PortfolioOverview_tsx_1dyvnqq._.js.map
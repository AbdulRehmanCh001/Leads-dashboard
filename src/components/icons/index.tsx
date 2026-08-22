import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base(props: IconProps, size = 16) {
  const { size: s = size, ...rest } = props;
  return { width: s, height: s, fill: "none", viewBox: "0 0 24 24", ...rest };
}

export function IconPlus(props: IconProps) {
  return (
    <svg {...base(props)} stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function IconChevronDown(props: IconProps) {
  return (
    <svg {...base(props, 14)} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function IconChevronUp(props: IconProps) {
  return (
    <svg {...base(props, 14)} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 15l-6-6-6 6" />
    </svg>
  );
}

export function IconChevronRight(props: IconProps) {
  return (
    <svg {...base(props, 14)} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export function IconChevronLeft(props: IconProps) {
  return (
    <svg {...base(props, 14)} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

export function IconCollapse(props: IconProps) {
  return (
    <svg {...base(props, 18)} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M4 7h7M4 12h7M4 17h7M15 8l4 4-4 4" />
    </svg>
  );
}

export function IconLayers(props: IconProps) {
  return (
    <svg {...base(props, 18)} stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 12l9 5 9-5" />
      <path d="M3 16l9 5 9-5" />
    </svg>
  );
}

export function IconGrid(props: IconProps) {
  return (
    <svg {...base(props, 18)} stroke="currentColor" strokeWidth="1.7">
      <rect x="3" y="3" width="7" height="7" rx="1.2" />
      <rect x="14" y="3" width="7" height="7" rx="1.2" />
      <rect x="3" y="14" width="7" height="7" rx="1.2" />
      <rect x="14" y="14" width="7" height="7" rx="1.2" />
    </svg>
  );
}

export function IconUsers(props: IconProps) {
  return (
    <svg {...base(props, 18)} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19c.6-3 2.8-4.5 5.5-4.5S14 16 14.5 19" />
      <circle cx="16.5" cy="8.5" r="2.4" />
      <path d="M15 14.5c2 .3 3.6 1.5 4.2 4.5" />
    </svg>
  );
}

export function IconUser(props: IconProps) {
  return (
    <svg {...base(props, 18)} stroke="currentColor" strokeWidth="1.7">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 19c1-3.5 3.5-5 7-5s6 1.5 7 5" strokeLinecap="round" />
    </svg>
  );
}

export function IconHelp(props: IconProps) {
  return (
    <svg {...base(props, 18)} stroke="currentColor" strokeWidth="1.7">
      <circle cx="12" cy="12" r="9" />
      <path d="M9.6 9.2a2.5 2.5 0 114 2c-.7.5-1.1 1-1.1 2" strokeLinecap="round" />
      <circle cx="12" cy="16.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconSearch(props: IconProps) {
  return (
    <svg {...base(props, 16)} stroke="currentColor" strokeWidth="1.8">
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconGlobe(props: IconProps) {
  const { size: s = 16, ...rest } = props;
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.99935 11.3333L10.666 10L8.70068 8.67935L7.40535 8.59668L6.66602 9.33335L7.99935 11.3333H9.99935Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.54227 2.02361C4.79294 1.69761 1.69761 4.79294 2.02361 8.54227C2.27161 11.3949 4.60494 13.7283 7.45761 13.9763C11.2069 14.3023 14.3023 11.2076 13.9763 7.45761C13.7283 4.60561 11.3949 2.27227 8.54227 2.02361Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.63477 5.30697L5.3341 7.33297L6.0041 6.00297L8.66743 5.33297L9.45543 2.18164"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconGlobeOutline(props: IconProps) {
  return (
    <svg {...base(props, 16)} stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18" />
    </svg>
  );
}

export function IconBell(props: IconProps) {
  return (
    <svg {...base(props, 18)} stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
      <path d="M6 16h12l-1.2-2.2a6.5 6.5 0 01-.8-3.3V9a4 4 0 10-8 0v1.5c0 1.2-.3 2.3-.8 3.3L6 16z" />
      <path d="M10 18a2 2 0 004 0" />
    </svg>
  );
}

export function IconRefresh(props: IconProps) {
  return (
    <svg {...base(props, 16)} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M20 12a8 8 0 11-2.3-5.6" />
      <path d="M20 4v5h-5" />
    </svg>
  );
}

export function IconInfo(props: IconProps) {
  return (
    <svg {...base(props, 14)} stroke="currentColor" strokeWidth="1.7">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" strokeLinecap="round" />
      <circle cx="12" cy="8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconSort(props: IconProps) {
  return (
    <svg {...base(props, 10)} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M3 8l2.5-3L8 8M3 11l2.5 3L8 11" />
    </svg>
  );
}

export function IconArrowUp(props: IconProps) {
  return (
    <svg {...base(props, 12)} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}

export function IconArrowDown(props: IconProps) {
  return (
    <svg {...base(props, 12)} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M19 12l-7 7-7-7" />
    </svg>
  );
}

export function IconWarning(props: IconProps) {
  return (
    <svg {...base(props, 12)} stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
      <path d="M12 4l9 16H3L12 4z" />
      <path d="M12 10v4" strokeLinecap="round" />
      <circle cx="12" cy="16.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconXCircle(props: IconProps) {
  return (
    <svg {...base(props, 12)} stroke="currentColor" strokeWidth="1.7">
      <circle cx="12" cy="12" r="8" />
      <path d="M9 9l6 6M15 9l-6 6" strokeLinecap="round" />
    </svg>
  );
}

export function IconInbox(props: IconProps) {
  return (
    <svg {...base(props, 16)} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
      <path d="M4 8l2-4h12l2 4v10H4V8z" />
      <path d="M4 10h4.5l1.5 2h4l1.5-2H20" />
    </svg>
  );
}

export function IconHandshake(props: IconProps) {
  return (
    <svg {...base(props, 16)} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 13l2.5 2.5a2 2 0 002.8 0L16 13" />
      <path d="M4 11l3-3 3 2 3-3 3 3" />
      <path d="M4 11v5M20 11v5" />
    </svg>
  );
}

export function IconHardHat(props: IconProps) {
  return (
    <svg {...base(props, 16)} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
      <path d="M4 14h16v2H4z" />
      <path d="M6 14a6 6 0 0112 0" />
      <path d="M12 5v3" strokeLinecap="round" />
    </svg>
  );
}

export function IconGear(props: IconProps) {
  return (
    <svg {...base(props, 16)} stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2M12 19v2M4.9 6.5l1.4 1.4M17.7 16.1l1.4 1.4M3 12h2M19 12h2M4.9 17.5l1.4-1.4M17.7 7.9l1.4-1.4" strokeLinecap="round" />
    </svg>
  );
}

export function IconChat(props: IconProps) {
  return (
    <svg {...base(props, 16)} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
      <path d="M5 6h9a2 2 0 012 2v5a2 2 0 01-2 2H9l-3 3v-3H5a2 2 0 01-2-2V8a2 2 0 012-2z" />
      <path d="M14 8h3a2 2 0 012 2v5a2 2 0 01-2 2h-1v3l-3-3" />
    </svg>
  );
}

export function IconDoc(props: IconProps) {
  return (
    <svg {...base(props, 16)} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
      <path d="M7 3h7l4 4v14H7V3z" />
      <path d="M14 3v4h4" />
      <path d="M10 12h6M10 16h6" strokeLinecap="round" />
    </svg>
  );
}

export function IconClose(props: IconProps) {
  return (
    <svg {...base(props, 14)} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <svg {...base(props, 14)} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconClock(props: IconProps) {
  return (
    <svg {...base(props, 12)} stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v5l3 2" strokeLinecap="round" />
    </svg>
  );
}

export function IconPencil(props: IconProps) {
  return (
    <svg {...base(props, 12)} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
      <path d="M14 5l5 5-10 10H4v-5L14 5z" />
    </svg>
  );
}

export function IconDownload(props: IconProps) {
  return (
    <svg {...base(props, 12)} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4v10M8 10l4 4 4-4" />
      <path d="M5 18h14" />
    </svg>
  );
}

export function IconUpload(props: IconProps) {
  return (
    <svg {...base(props, 18)} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 16V6M8 9l4-4 4 4" />
      <path d="M5 18h14" />
    </svg>
  );
}

export function IconPin(props: IconProps) {
  return (
    <svg {...base(props, 14)} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
      <path d="M12 17v4" strokeLinecap="round" />
      <path d="M8 4h8l-1 6 2 2v2H7v-2l2-2L8 4z" />
    </svg>
  );
}

export function IconTagX(props: IconProps) {
  return (
    <svg {...base(props, 10)} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}

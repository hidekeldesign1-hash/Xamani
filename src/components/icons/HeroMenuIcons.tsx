import { type SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base: IconProps = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export function ColumnIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 4v16" />
      <path d="M8 4h3l1 2h3v14h-7V4z" />
      <path d="M6 20h10" />
      <path d="M9 8h2M9 11h2M9 14h2" />
    </svg>
  );
}

export function ChartIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="M8 15l3-4 3 2 4-6" />
      <path d="M18 7v0" strokeWidth={2} />
    </svg>
  );
}

export function TeamIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="8" r="2.5" />
      <path d="M6 19v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1" />
      <circle cx="5" cy="10" r="1.8" />
      <path d="M3 19v-0.5a2.5 2.5 0 0 1 2.5-2.5" />
      <circle cx="19" cy="10" r="1.8" />
      <path d="M21 19v-0.5a2.5 2.5 0 0 0-2.5-2.5" />
    </svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M4 10h16" />
      <circle cx="12" cy="15" r="2" />
      <path d="M12 13.5v1.5l1 1" />
    </svg>
  );
}

export function CompassIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8" />
      <polygon
        points="12,6 14,12 12,18 10,12"
        fill="currentColor"
        stroke="none"
        opacity="0.85"
      />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function HomeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 10.5 12 4l8 6.5" />
      <path d="M6 9.5V19h12V9.5" />
      <path d="M10 19v-5h4v5" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

export type HeroMenuIconName =
  | "column"
  | "chart"
  | "team"
  | "calendar"
  | "compass"
  | "home"
  | "menu";

const MAP = {
  column: ColumnIcon,
  chart: ChartIcon,
  team: TeamIcon,
  calendar: CalendarIcon,
  compass: CompassIcon,
  home: HomeIcon,
  menu: MenuIcon,
} as const;

export function HeroMenuIcon({
  name,
  className = "h-4 w-4",
}: {
  name: HeroMenuIconName;
  className?: string;
}) {
  const Icon = MAP[name];
  return <Icon className={className} />;
}

import { type HTMLAttributes } from "react";

interface SectionContainerProps extends HTMLAttributes<HTMLElement> {
  as?: "section" | "div" | "article";
  contained?: boolean;
}

export default function SectionContainer({
  as: Tag = "section",
  contained = true,
  className = "",
  children,
  ...props
}: SectionContainerProps) {
  return (
    <Tag
      className={`section-padding w-full ${contained ? "mx-auto max-w-7xl" : ""} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}

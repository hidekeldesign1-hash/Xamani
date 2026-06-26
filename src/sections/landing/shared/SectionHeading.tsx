interface SectionHeadingProps {
  before?: string;
  highlight: string;
  after?: string;
  className?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  before = "",
  highlight,
  after = "",
  className = "",
  align = "left",
}: SectionHeadingProps) {
  return (
    <h2
      className={`font-ambit text-display-lg text-xamani-silver ${align === "center" ? "text-center" : ""} ${className}`}
    >
      {before}
      <span className="relative mx-1 inline-block">
        <span className="relative z-10">{highlight}</span>
        <span
          className="absolute inset-x-0 bottom-1 top-1/2 -z-0 bg-xamani-cyan/20"
          aria-hidden="true"
        />
      </span>
      {after}
    </h2>
  );
}

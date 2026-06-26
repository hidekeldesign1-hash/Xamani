interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export default function TestimonialCard({
  quote,
  name,
  role,
  company,
}: TestimonialCardProps) {
  return (
    <article className="glass-panel flex h-full flex-col rounded-card-lg p-6 sm:p-8">
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-xamani-cyan/30 bg-xamani-cyan/10 font-ambit text-lg text-xamani-cyan">
          {name.charAt(0)}
        </div>
        <div>
          <h3 className="font-ambit text-base text-xamani-silver">{name}</h3>
          <p className="font-archia text-xs uppercase tracking-wider text-xamani-silver-muted">
            {role} · {company}
          </p>
        </div>
      </div>
      <blockquote className="font-archia text-sm leading-relaxed text-xamani-silver/90 sm:text-base">
        &ldquo;{quote}&rdquo;
      </blockquote>
    </article>
  );
}

interface ExpertCardProps {
  name: string;
  role: string;
  bio: string;
  avatarSrc?: string;
}

export default function ExpertCard({
  name,
  role,
  bio,
  avatarSrc,
}: ExpertCardProps) {
  return (
    <article className="glass-panel rounded-card p-6">
      <div className="mb-4 h-14 w-14 overflow-hidden rounded-full border border-xamani-silver/20 bg-xamani-navy-light">
        {avatarSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatarSrc} alt={name} className="h-full w-full object-cover" />
        ) : null}
      </div>
      <h3 className="font-ambit text-lg text-xamani-silver">{name}</h3>
      <p className="mb-3 font-archia text-xs uppercase tracking-wider text-xamani-cyan">
        {role}
      </p>
      <p className="font-archia text-sm leading-relaxed text-xamani-silver-muted">
        {bio}
      </p>
    </article>
  );
}

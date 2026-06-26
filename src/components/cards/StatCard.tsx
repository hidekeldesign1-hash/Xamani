interface StatCardProps {
  value: string;
  label: string;
}

export default function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="glass-panel flex flex-col items-center gap-2 rounded-card-lg p-8 text-center">
      <span className="font-ambit text-display-md text-xamani-silver">
        {value}
      </span>
      <span className="font-archia text-sm text-xamani-silver-muted">
        {label}
      </span>
    </div>
  );
}

interface Props {
  label: string;
  value: string;
  change: string;
}

export function MetricCard({ label, value, change }: Props) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-zinc-900
        bg-[#111111]
        p-6
        hover:bg-[#151515]
        transition-colors
      "
    >
      <div className="text-sm text-zinc-500">{label}</div>

      <div className="mt-5 flex items-end justify-between">
        <div className="text-4xl font-semibold tracking-tight">{value}</div>

        <div className="text-xs text-zinc-500">{change}</div>
      </div>
    </div>
  );
}

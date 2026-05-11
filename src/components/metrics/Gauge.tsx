interface Props {
  label: string;
  value: string;
  unit: string;
}

export function GaugeCard({ label, value, unit }: Props) {
  return (
    <div className="rounded-3xl border border-zinc-900 bg-[#111111] p-6">
      <div className="text-sm text-zinc-500">{label}</div>

      <div className="mt-4 text-3xl font-semibold">
        {value}
        <span className="text-sm text-zinc-500 ml-1">{unit}</span>
      </div>
    </div>
  );
}

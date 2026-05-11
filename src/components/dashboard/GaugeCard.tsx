export function GaugeCard({ title, value, unit }: any) {
    return (
        <div
            className="
            rounded-3xl
            border
            border-zinc-900
            bg-[#111111]
            p-6
            "
        >
            <div className="text-sm text-zinc-500">
                {title}
            </div>

            <div className="mt-4 text-4xl font-semibold tracking-tight">
                {value}
                <span className="text-lg text-zinc-500 ml-1">
                    {unit}
                </span>
            </div>
        </div>
    );
}

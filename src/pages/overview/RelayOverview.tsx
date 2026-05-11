import { GaugeCard } from "../../components/dashboard/GaugeCard";

import { Panel } from "../../components/dashboard/Panel";

import { SystemLoadChart } from "../../components/charts/SystemLoadChart";

import { useMetricsStore } from "../../stores/metrics.store";

import { TrafficChart } from "../../components/charts/TrafficChart";

import { LatencyHistogram } from "../../components/charts/LatencyHistogram";

export function RelayOverview() {
    const metrics = useMetricsStore();

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-semibold">
                        Media Relay Overview
                    </h1>

                    <p className="text-sm text-zinc-500 mt-1">
                        Realtime ingest → relay → delivery observability
                    </p>
                </div>

                <div
                    className="
                        px-4
                        py-2
                        rounded-xl
                        bg-zinc-900
                        border
                        border-zinc-800
                        text-sm
                        text-zinc-400
                ">
                    LIVE
                </div>
            </div>

            {/* GAUGES */}
            <div className="grid grid-cols-4 gap-5">
                <GaugeCard
                    title="Active Streams"
                    value={Math.floor(metrics.activeStreams ?? 0)}
                    unit=""
                />

                <GaugeCard
                    title="CPU Usage"
                    value={(metrics.cpuUsage ?? 0).toFixed(1)}
                    unit="%"
                />

                <GaugeCard
                    title="Memory Usage"
                    value={(metrics.memoryUsage ?? 0).toFixed(1)}
                    unit="%"
                />

                <GaugeCard
                    title="Bandwidth"
                    value={(metrics.bandwidth ?? 0).toFixed(0)}
                    unit="Mbps"
                />
            </div>

            {/* TIMELINE */}
            <Panel
                title="System Load"
                description="CPU, memory and bandwidth utilization timeline
                "
            >
                <div className="h-[320px]">
                    <SystemLoadChart />
                </div>
            </Panel>

            <div className="grid grid-cols-2 gap-5">
                <Panel
                    title="Traffic Rate"
                    description="Ingest and delivery rate"
                >
                    <div className="h-[280px]">
                        <TrafficChart />
                    </div>
                </Panel>

                <Panel
                    title="Latency Distribution"
                    description="Stream latency histogram"
                >
                    <div className="h-[280px]">
                        <LatencyHistogram />
                    </div>
                </Panel>
            </div>
        </div>
    );
}

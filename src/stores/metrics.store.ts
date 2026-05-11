import { create } from 'zustand';

export interface Point {
    index: number;
    value: number;
}

interface MetricsStore {
    activeStreams: number;
    cpuUsage: number;
    memoryUsage: number;
    bandwidth: number;
    ingestRate: number;
    deliveryRate: number;
    errorRate: number;
    latencyP95: number;
    cpuSeries: Point[];
    memorySeries: Point[];
    bandwidthSeries: Point[];
    latencySeries: Point[];
    tick: number;

    pushMetrics: (metrics: Partial<MetricsStore>) => void;
}

export const useMetricsStore = create<MetricsStore>((set) => ({
    activeStreams: 0,
    cpuUsage: 0,
    memoryUsage: 0,
    bandwidth: 0,

    ingestRate: 0,
    deliveryRate: 0,
    errorRate: 0,

    latencyP95: 0,

    cpuSeries: [],
    memorySeries: [],
    bandwidthSeries: [],
    latencySeries: [],

    tick: 0,

    pushMetrics: (metrics) =>
        set((state) => {
            const tick = state.tick + 1;

            const cpuSeries = [
                ...state.cpuSeries,
                {
                    index: tick,
                    value: metrics.cpuUsage || 0,
                },
            ].slice(-60);

            const memorySeries = [
                ...state.memorySeries,
                {
                    index: tick,
                    value: metrics.memoryUsage || 0,
                },
            ].slice(-60);

            const bandwidthSeries = [
                ...state.bandwidthSeries,
                {
                    index: tick,
                    value: metrics.bandwidth || 0,
                },
            ].slice(-60);

            const latencySeries = [
                ...state.latencySeries,
                {
                    index: tick,
                    value: metrics.latencyP95 || 0,
                },
            ].slice(-60);

            return {
                ...state,
                ...metrics,

                tick,

                cpuSeries,
                memorySeries,
                bandwidthSeries,
                latencySeries,
            };
        }),
}));

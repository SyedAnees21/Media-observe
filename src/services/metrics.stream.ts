import { listen } from '@tauri-apps/api/event';

import { useMetricsStore } from '../stores/metrics.store';

export async function startMetricsStream() {
  await listen('metrics-update', (event) => {
    const payload = event.payload as any;

    useMetricsStore.getState().pushMetrics({
      activeStreams: payload.relay_active_streams,
      cpuUsage: payload.relay_cpu_usage,
      memoryUsage: payload.relay_memory_usage,
      bandwidth: payload.relay_bandwidth_mbps,
      ingestRate: payload.relay_streams_ingested_total,
      deliveryRate: payload.relay_streams_delivered_total,
      errorRate: payload.relay_errors_total,
      latencyP95: payload.relay_latency_ms,
    });
  });
}

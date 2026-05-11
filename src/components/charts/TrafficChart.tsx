import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useMetricsStore } from '../../stores/metrics.store';

export function TrafficChart() {
  const { ingestRate, deliveryRate } = useMetricsStore();

  const data = Array.from({
    length: 30,
  }).map((_, i) => ({
    index: i,

    ingest: ingestRate + Math.random() * 3,

    delivery: deliveryRate + Math.random() * 3,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <XAxis dataKey="index" tick={false} axisLine={false} tickLine={false} />

        <YAxis axisLine={false} tickLine={false} />

        <Tooltip />

        <Area
          type="linear"
          dataKey="ingest"
          stroke="#d4d4d8"
          fill="#18181b"
          isAnimationActive={false}
        />

        <Area
          type="linear"
          dataKey="delivery"
          stroke="#71717a"
          fill="#111111"
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

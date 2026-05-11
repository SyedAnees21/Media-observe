import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useMetricsStore } from '../../stores/metrics.store';

export function SystemLoadChart() {
  const { cpuSeries, memorySeries, bandwidthSeries } = useMetricsStore();

  const merged = cpuSeries.map((p, i) => ({
    index: p.index,
    cpu: p.value,
    memory: memorySeries[i]?.value || 0,
    bandwidth: bandwidthSeries[i]?.value || 0,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={merged}>
        <XAxis dataKey="index" tick={false} axisLine={false} tickLine={false} />

        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{
            fill: '#71717a',
          }}
        />

        <Tooltip />

        <Line
          type="linear"
          dataKey="cpu"
          stroke="#d4d4d8"
          dot={false}
          isAnimationActive={false}
        />

        <Line
          type="linear"
          dataKey="memory"
          stroke="#71717a"
          dot={false}
          isAnimationActive={false}
        />

        <Line
          type="linear"
          dataKey="bandwidth"
          stroke="#52525b"
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

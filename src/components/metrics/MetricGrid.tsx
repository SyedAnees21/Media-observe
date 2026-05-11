import { MetricCard } from './MetricCard';

const metrics = [
  {
    label: 'Active Streams',
    value: '12,482',
    change: '+2.3%',
  },
  {
    label: 'Throughput',
    value: '4.8 Gbps',
    change: '+1.2%',
  },
  {
    label: 'Latency',
    value: '38 ms',
    change: '-5%',
  },
  {
    label: 'Error Rate',
    value: '0.12%',
    change: 'Stable',
  },
];

export function MetricsGrid() {
  return (
    <div className="grid grid-cols-4 gap-5">
      {metrics.map((metric) => (
        <MetricCard
          key={metric.label}
          label={metric.label}
          value={metric.value}
          change={metric.change}
        />
      ))}
    </div>
  );
}

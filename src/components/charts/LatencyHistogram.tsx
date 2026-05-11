import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const buckets = [
  { range: '0-20', value: 12 },
  { range: '20-50', value: 42 },
  { range: '50-100', value: 28 },
  { range: '100-200', value: 16 },
  { range: '200+', value: 6 },
];

export function LatencyHistogram() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={buckets}>
        <XAxis
          dataKey="range"
          axisLine={false}
          tickLine={false}
          tick={{
            fill: '#71717a',
          }}
        />

        <YAxis axisLine={false} tickLine={false} />

        <Tooltip />

        <Bar dataKey="value" fill="#27272a" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

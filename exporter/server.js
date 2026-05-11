import express from 'express';
import client from 'prom-client';

const app = express();
const register = new client.Registry();

client.collectDefaultMetrics({ register });

/* =========================
   GAUGES (current state)
========================= */

const activeStreams = new client.Gauge({
  name: 'relay_active_streams',
  help: 'Currently active media streams',
});

const cpuUsage = new client.Gauge({
  name: 'relay_cpu_usage',
  help: 'CPU usage percentage',
});

const memoryUsage = new client.Gauge({
  name: 'relay_memory_usage',
  help: 'Memory usage percentage',
});

const bandwidth = new client.Gauge({
  name: 'relay_bandwidth_mbps',
  help: 'Network bandwidth usage',
});

/* =========================
   COUNTERS (monotonic)
========================= */

const totalIngested = new client.Counter({
  name: 'relay_streams_ingested_total',
  help: 'Total streams ingested',
});

const totalDelivered = new client.Counter({
  name: 'relay_streams_delivered_total',
  help: 'Total streams delivered',
});

const totalErrors = new client.Counter({
  name: 'relay_errors_total',
  help: 'Total errors encountered',
});

/* =========================
   HISTOGRAM (distribution)
========================= */

const latencyHistogram = new client.Histogram({
  name: 'relay_latency_ms',
  help: 'Stream end-to-end latency',
  buckets: [10, 20, 50, 100, 200, 500, 1000],
});

/* Register metrics */
register.registerMetric(activeStreams);
register.registerMetric(cpuUsage);
register.registerMetric(memoryUsage);
register.registerMetric(bandwidth);
register.registerMetric(totalIngested);
register.registerMetric(totalDelivered);
register.registerMetric(totalErrors);
register.registerMetric(latencyHistogram);

/* =========================
   SIMULATION LOOP
========================= */

let ingestCounter = 0;
let deliveryCounter = 0;
let errorCounter = 0;

setInterval(() => {
  const active = 8000 + Math.random() * 4000;
  const cpu = 30 + Math.random() * 40;
  const memory = 40 + Math.random() * 30;
  const bWidth = 200 + Math.random() * 800;

  activeStreams.set(active);
  cpuUsage.set(cpu);
  memoryUsage.set(memory);
  bandwidth.set(bWidth);

  ingestCounter += Math.floor(Math.random() * 8);

  deliveryCounter += Math.floor(Math.random() * 8);

  if (Math.random() < 0.08) {
    errorCounter += 1;
  }

  totalIngested.inc(ingestCounter);
  totalDelivered.inc(deliveryCounter);
  totalErrors.inc(errorCounter);

  for (let i = 0; i < 30; i++) {
    latencyHistogram.observe(20 + Math.random() * 250);
  }
}, 1000);
// setInterval(() => {
//   // Gauges
//   activeStreams.set(8000 + Math.random() * 4000);
//   cpuUsage.set(20 + Math.random() * 60);
//   memoryUsage.set(30 + Math.random() * 50);
//   bandwidth.set(100 + Math.random() * 900);

//   // Counters (monotonic)
//   totalIngested.inc(Math.floor(Math.random() * 5));
//   totalDelivered.inc(Math.floor(Math.random() * 5));

//   if (Math.random() < 0.1) {
//     totalErrors.inc(1);
//   }

//   // Histogram
//   latencyHistogram.observe(20 + Math.random() * 300);

// }, 1000);

/* =========================
   STREAM SESSION MOCK DATA
========================= */

let sessions = [];

function randomSession(id) {
  return {
    id,

    stream: `stream-${id}`,

    region: ['us-east', 'eu-west', 'asia-sg'][Math.floor(Math.random() * 3)],

    bitrate: 1000 + Math.random() * 5000,

    viewers: 10 + Math.random() * 2000,

    latency: 20 + Math.random() * 150,
  };
}

for (let i = 0; i < 12; i++) {
  sessions.push(randomSession(i));
}

/* =========================
   Topology Mock Data
========================= */
const relayNodes = [
  {
    id: 'ingest-us',
    region: 'US-East',
    status: 'healthy',
    cpu: 42,
    streams: 2400,
  },

  {
    id: 'relay-eu',
    region: 'EU-West',
    status: 'healthy',
    cpu: 51,
    streams: 1800,
  },

  {
    id: 'relay-asia',
    region: 'Asia-SG',
    status: 'warning',
    cpu: 76,
    streams: 3200,
  },

  {
    id: 'edge-cdn',
    region: 'Global Edge',
    status: 'healthy',
    cpu: 28,
    streams: 8400,
  },
];

app.get('/sessions', (_, res) => {
  sessions = sessions.map((s) => ({
    ...s,
    viewers: s.viewers + Math.floor(Math.random() * 20),

    latency: 20 + Math.random() * 150,
  }));

  res.json(sessions);
});

app.get('/topology', (_, res) => {
  const updated = relayNodes.map((node) => ({
    ...node,

    cpu: Math.max(10, Math.min(95, node.cpu + (Math.random() * 10 - 5))),

    streams: node.streams + Math.floor(Math.random() * 200 - 100),
  }));

  res.json(updated);
});

/* Endpoint */
app.get('/metrics', async (_, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(3001, () => {
  console.log('Media relay metrics running on :3001');
});

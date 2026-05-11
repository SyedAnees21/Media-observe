import { Panel } from '../../components/dashboard/Panel';

import { RelayTopology } from '../../components/dashboard/RelayTopology';

import { StreamSessionsTable } from '../../components/dashboard/StreamSessionTable';

export function OverviewPage() {
  return (
    <div className="space-y-8">
      <div className="mb-10 text-left">
        <h1
          className="
          text-3xl
          font-semibold
          tracking-tight
          text-left
        ">
          MediaStream Observability
        </h1>

        <p className="mt-2 text-sm text-zinc-500 max-w-2xl mx-auto leading-relaxed">
          Real-time observability platform for media relay infrastructure.
          Monitor stream health, node performance, latency distribution, and
          traffic flow across globally distributed relay clusters.
        </p>
      </div>

      <Panel
        title="Relay Topology"
        description="Global relay node graph"
      >
        <div className="h-[260px]">
          <RelayTopology />
        </div>
      </Panel>

      <Panel
        title="Active Streams"
        description="Live relay sessions"
      >
        <StreamSessionsTable />
      </Panel>
    </div>
  );
}

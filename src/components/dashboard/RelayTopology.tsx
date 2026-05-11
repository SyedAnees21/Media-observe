import { useEffect, useState } from 'react';
import { fetch } from '@tauri-apps/plugin-http';

interface RelayNode {
  id: string;

  region: string;

  status: string;

  cpu: number;

  streams: number;
}

export function RelayTopology() {
  const [nodes, setNodes] = useState<RelayNode[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('http://localhost:3001/topology');

        const data = await res.json();

        setNodes(data);
      } catch (err) {
        console.error('Topology fetch failed', err);
      }
    }

    load();

    const interval = setInterval(load, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="
      flex
      items-center
      justify-between
      gap-4
      h-full
    "
    >
      {nodes.map((node, i) => (
        <div
          key={node.id}
          className="
            flex
            items-center
            gap-4
            flex-1
          "
        >
          {/* NODE */}
          <div
            className="
            flex-1
            rounded-3xl
            border
            border-zinc-800
            bg-zinc-900
            p-5
            min-h-[140px]
          "
          >
            <div
              className="
              flex
              items-center
              justify-between
            "
            >
              <div
                className="
                text-sm
                text-zinc-300
                font-medium
              "
              >
                {node.id}
              </div>

              <div
                className={`
                w-2
                h-2
                rounded-full

                ${node.status === 'healthy' ? 'bg-zinc-300' : 'bg-zinc-500'}
              `}
              />
            </div>

            <div
              className="
              mt-2
              text-xs
              text-zinc-500
            "
            >
              {node.region}
            </div>

            <div
              className="
              mt-6
              space-y-2
            "
            >
              <div
                className="
                flex
                items-center
                justify-between
                text-sm
              "
              >
                <span
                  className="
                  text-zinc-500
                "
                >
                  CPU
                </span>

                <span>{Math.floor(node.cpu)}%</span>
              </div>

              <div
                className="
                flex
                items-center
                justify-between
                text-sm
              "
              >
                <span
                  className="
                  text-zinc-500
                "
                >
                  Streams
                </span>

                <span>{node.streams}</span>
              </div>
            </div>
          </div>

          {/* CONNECTION */}
          {i < nodes.length - 1 && (
            <div
              className="
              w-16
              h-[2px]
              bg-zinc-800
              shrink-0
            "
            />
          )}
        </div>
      ))}
    </div>
  );
}

import { Activity } from 'lucide-react';

const items = [
  {
    id: 'overview',
    label: 'Overview',
  },

  {
    id: 'relay',
    label: 'Relay Analytics',
  },

  {
    id: 'nodes',
    label: 'Nodes',
  },

  {
    id: 'traffic',
    label: 'Traffic',
  },

  {
    id: 'alerts',
    label: 'Alerts',
  },
];

interface Props {
  page: string;

  setPage: (page: string) => void;
}

export function TopNavbar({ page, setPage }: Props) {
  return (
    <header
      className="
      h-14
      border-b
      border-[#232323]
      bg-[#111111]
      px-6
      flex
      items-center
      justify-between
      shrink-0
    "
    >
      {/* LEFT */}
      <div
        className="
        flex
        items-center
        gap-3
      "
      >
        <Activity
          size={18}
          className="
            text-neutral-300
          "
        />

        <span
          className="
          text-sm
          tracking-[0.2em]
          uppercase
          text-neutral-100
          font-medium
        "
        >
          Mediastream Observe.
        </span>
      </div>

      {/* CENTER */}
      <nav
        className="
        flex
        items-center
        gap-2
      "
      >
        {items.map((item) => {
          const active = page === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`
                px-4
                py-2
                rounded-xl
                text-sm
                transition-all duration-200 ease-out
                duration-200

                ${
                  active
                    ? `
                      bg-zinc-800
                      text-zinc-100
                    `
                    : `
                      text-zinc-500
                      hover:text-zinc-200
                      hover:bg-zinc-900
                    `
                }
              `}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* RIGHT */}
      <div
        className="
        flex
        items-center
        gap-2
      "
      >
        <div className="w-2 h-2 rounded-full bg-zinc-300" />
        <span className="text-xs text-neutral-500">Connected</span>
      </div>
    </header>
  );
}

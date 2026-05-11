import { useEffect, useState } from 'react';
import { fetch } from '@tauri-apps/plugin-http';

export function StreamSessionsTable() {
    const [sessions, setSessions] = useState<any[]>([]);

    useEffect(() => {
        async function load() {
            const res = await fetch('http://localhost:3001/sessions');

            const data = await res.json();

            console.log(data);
            setSessions(data);
        }

        load();

        const interval = setInterval(load, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="
            overflow-hidden
            rounded-2xl
            border
            border-zinc-900
            "
        >
            <table className="w-full text-sm">
                <thead className=" bg-zinc-900 text-zinc-500">
                    <tr>
                        <th className="p-4 text-left">Stream</th>
                        <th className="p-4 text-left">Region</th>
                        <th className="p-4 text-left">Bitrate</th>
                        <th className="p-4 text-left">Viewers</th>
                        <th className="p-4 text-left">Latency</th>
                    </tr>
                </thead>

                <tbody>
                    {sessions.map((s) => (
                        <tr
                            key={s.id}
                            className="border-t border-zinc-900"
                        >
                            <td className="p-4">{s.stream}</td>
                            <td className="p-4 text-zinc-400">
                                {s.region}
                            </td>
                            <td className="p-4">{Math.floor(s.bitrate)} kbps</td>
                            <td className="p-4">{s.viewers}</td>
                            <td className="p-4">{Math.floor(s.latency)} ms</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

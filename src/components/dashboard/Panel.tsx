import { ReactNode } from 'react';

export function Panel({
    title,
    description,
    children,
}: {
    title: string;
    description: string;
    children: ReactNode;
}) {
    return (
        <div
            className="
            rounded-3xl
            border
            border-zinc-900
            bg-[#111111]
            p-6
        "
        >
            <div className="mb-5">
                <h2 className="text-lg font-medium">{title}</h2>

                <p className="text-sm text-zinc-500 mt-1">{description}</p>
            </div>

            {children}
        </div>
    );
}

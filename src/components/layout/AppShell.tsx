import { ReactNode } from 'react';
import { TopNavbar } from './Navbar';

interface Props {
  children: ReactNode;
  page: string;

  setPage: (page: string) => void;
}

export function AppShell({ children, page, setPage }: Props) {
  return (
    <div className="h-screen bg-[#090909] text-zinc-100 flex flex-col">
      <TopNavbar page={page} setPage={setPage} />

      <main className="flex-1 overflow-auto">
        <div className="max-w-[1600px] mx-auto p-8">{children}</div>
      </main>
    </div>
  );
}

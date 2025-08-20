// import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
// import { type BreadcrumbItem } from '@/types';
// import { type ReactNode } from 'react';

// interface AppLayoutProps {
//     children: ReactNode;
//     breadcrumbs?: BreadcrumbItem[];
// }

// export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
//     <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
//         {children}
//     </AppLayoutTemplate>
// );

import { Link, usePage } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import type { AppPageProps } from '@/types/global';

export default function AppLayout({ children }: PropsWithChildren) {
  const { props } = usePage<AppPageProps>();
  const userName = props.auth?.user?.name ?? 'User';

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="px-6 py-4 font-bold text-xl">Money Manager</div>
        <nav className="px-3 space-y-1">
          <Link className="block px-3 py-2 rounded hover:bg-gray-100" href={route('dashboard')}>Dashboard</Link>
          <Link className="block px-3 py-2 rounded hover:bg-gray-100" href={route('relations.index')}>Relation</Link>
          <Link className="block px-3 py-2 rounded hover:bg-gray-100" href={route('transactions.index')}>Transaction</Link>
          <a className="block px-3 py-2 rounded hover:bg-gray-100" href="#">About</a>
          <a className="block px-3 py-2 rounded hover:bg-gray-100" href="#">Contact</a>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1">
        {/* Topbar */}
        <header className="h-16 bg-white shadow flex items-center justify-between px-6">
          <div />
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">{userName}</span>
            <img
              className="w-8 h-8 rounded-full object-cover"
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}`}
              alt="avatar"
            />
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

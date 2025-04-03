"use client";

import { useRouter, usePathname } from 'next/navigation';
import Sidebar from './components/sidebar/sidebar';

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <div className="flex">
      {isAdminRoute && <Sidebar />}
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default ClientLayout;

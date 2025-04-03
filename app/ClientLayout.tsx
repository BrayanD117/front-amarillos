"use client";

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from "react";
import Sidebar from './components/sidebar/sidebar';

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const pathname = usePathname();
  const isAllowedRoute = pathname.startsWith('/admin') || pathname.startsWith('/vehiculos') || pathname.startsWith('/usuarios');

  return (
    <div className="flex">
      {isAllowedRoute && (
        <Sidebar
          isOpen={sidebarOpen}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          isMobile={isMobile}
        />
      )}
      <main
        className={`flex-1 transition-all duration-300 ${
          !isMobile && sidebarOpen ? "ml-50" : "ml-0"
        }`}
      >
        {children}
      </main>
    </div>
  );
};

export default ClientLayout;

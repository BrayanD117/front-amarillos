'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";

const Sidebar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`h-screen p-4 shadow-md transition-transform duration-300 ease-in-out ${isOpen ? 'bg-yellow-100 translate-x-0' : 'bg-yellow-100 -translate-x-full'} md:translate-x-0`}>
      <button 
        className="mb-4 p-2 bg-yellow-200 rounded cursor-pointer"
        onClick={toggleSidebar}
      >
        {isOpen ? <IoCloseSharp /> : <GiHamburgerMenu />}
      </button>
      {isOpen && (
        <ul className="space-y-2">
          <li>
            <button
              className="w-full text-left bg-transparent hover:bg-yellow-200 text-gray-700 font-medium py-2 px-4 rounded cursor-pointer"
              onClick={() => router.push('/admin/panel')}
            >
              Inicio
            </button>
          </li>
          <li>
            <button
              className="w-full text-left bg-transparent hover:bg-yellow-200 text-gray-700 font-medium py-2 px-4 rounded cursor-pointer"
              onClick={() => router.push('/admin/usuarios')}
            >
              Usuarios
            </button>
          </li>
          <li>
            <button
              className="w-full text-left bg-transparent hover:bg-yellow-200 text-gray-700 font-medium py-2 px-4 rounded cursor-pointer"
              onClick={() => router.push('/admin/vehiculos')}
            >
              Vehículos
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;

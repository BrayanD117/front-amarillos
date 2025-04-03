"use client";

import { useRouter } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";

const Sidebar = ({ isOpen, toggleSidebar }: { isOpen: boolean, toggleSidebar: () => void }) => {
    const router = useRouter();
  
    const handleLogout = async () => {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/autenticacion/logout`, {
          method: 'POST',
          credentials: 'include',
        });
        router.push("/");
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
    };
  
    return (
      <>
        <button
          className="fixed z-50 top-4 left-4 p-2 bg-yellow-200 rounded cursor-pointer"
          onClick={toggleSidebar}
        >
          {isOpen ? <IoCloseSharp /> : <GiHamburgerMenu />}
        </button>
  
        <div
          className={`fixed h-screen w-50 p-4 shadow-md bg-yellow-100 transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <ul className="space-y-2 mt-10">
            <li>
              <button
                className="w-full rounded-lg text-left bg-transparent hover:bg-yellow-200 text-gray-700 font-medium py-2 px-4 rounded cursor-pointer"
                onClick={() => router.push("/admin/panel")}
              >
                Inicio
              </button>
            </li>
            <li>
              <button
                className="w-full rounded-lg text-left bg-transparent hover:bg-yellow-200 text-gray-700 font-medium py-2 px-4 rounded cursor-pointer"
                onClick={() => router.push("/admin/usuarios")}
              >
                Usuarios
              </button>
            </li>
            <li>
              <button
                className="w-full rounded-lg text-left bg-transparent hover:bg-yellow-200 text-gray-700 font-medium py-2 px-4 rounded cursor-pointer"
                onClick={() => router.push("/admin/vehiculos")}
              >
                Vehículos
              </button>
            </li>
          </ul>
          <div className="mt-5">
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg w-full cursor-pointer"
              onClick={handleLogout}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </>
    );
  };
  
  export default Sidebar;
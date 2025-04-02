'use client';

import { useRouter } from 'next/navigation';

const DashboardPage = () => {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          className="bg-yellow-100 p-6 rounded-lg shadow-md cursor-pointer"
          onClick={() => router.push('/usuarios')}
        >
          <h2 className="text-xl font-semibold text-gray-700">Usuarios</h2>
          <p className="text-gray-600">Gestiona los usuarios de la plataforma.</p>
        </div>
        <div 
          className="bg-yellow-100 p-6 rounded-lg shadow-md cursor-pointer"
          onClick={() => router.push('/vehiculos')}
        >
          <h2 className="text-xl font-semibold text-gray-700">Vehículos</h2>
          <p className="text-gray-600">Gestiona los vehículos disponibles.</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

interface Vehicle {
  id: number;
  idUsuario: number;
  idTarjeta: number;
  idEstado: number;
  interno: string;
  placa: string;
  marca: string;
  linea: string;
  modelo: number;
  cilindrada: number;
  color: string;
  idServicio: number;
  importacion: string;
  fechaImportacion: Date;
  puertas: number;
  fechaMatricula: Date;
  fechaExpedicion: Date;
  organismo: string;
  qr: string;
}

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const page = 1;
        const limit = 10;
        let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/vehiculos?page=${page}&limit=${limit}`;
        
        if (searchTerm) {
          url += `&search=${encodeURIComponent(searchTerm)}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        if (data.success) {
          setVehicles(data.data.vehicles);
        }
      } catch (error) {
        console.error('Error al obtener vehículos:', error);
      }
    };

    const debounceSearch = setTimeout(() => {
      fetchVehicles();
    }, 500);

    return () => clearTimeout(debounceSearch);
  }, [searchTerm]);

  const handleUpdate = (id: number) => {
    router.push(`/vehiculos/actualizar?id=${id}`);
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este vehículo? Esta acción no se puede deshacer.');
    if (confirmDelete) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/vehiculos/${id}`, {
          method: 'DELETE',
        });

        const data = await response.json();
        if (data.success) {
          toast.success(data.message);
          setVehicles(prevVehicles => prevVehicles.filter(vehicle => vehicle.id !== id));
        } else {
          toast.error(data.message || 'Error al eliminar el vehículo');
        }
      } catch (error) {
        console.error('Error al eliminar vehículo:', error);
        toast.error('Error al procesar la solicitud de eliminación');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Lista de Vehículos</h1>
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-300 ease-in-out cursor-pointer" 
            onClick={() => router.push('/vehiculos/crear')}
          >
          Agregar Vehículo
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Buscar por marca o modelo..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Filtrar por año</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
          </select>
          <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Filtrar por color</option>
            <option value="rojo">Rojo</option>
            <option value="azul">Azul</option>
            <option value="negro">Negro</option>
            <option value="blanco">Blanco</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Marca</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Modelo</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Placa</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Color</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {vehicles.map((vehicle, index) => (
                <tr key={index} className="hover:bg-gray-50 transition duration-150">
                  <td className="py-4 px-4 text-sm text-gray-700">{vehicle.marca}</td>
                  <td className="py-4 px-4 text-sm text-gray-700">{vehicle.modelo}</td>
                  <td className="py-4 px-4 text-sm text-gray-700">{vehicle.placa}</td>
                  <td className="py-4 px-4 text-sm text-gray-700">
                    <span className="px-3 py-1 rounded-full bg-red-100 text-red-800">{vehicle.color}</span>
                  </td>
                  <td className="py-4 px-4 text-sm space-x-2">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md transition duration-300 ease-in-out cursor-pointer" onClick={() => handleUpdate(vehicle.id)}>
                      Editar
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md transition duration-300 ease-in-out cursor-pointer" onClick={() => handleDelete(vehicle.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Paginación */}
      <div className="mt-6 flex justify-center">
        <nav className="flex space-x-2">
          <button className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300">
            Anterior
          </button>
          <button className="px-3 py-1 rounded-md bg-blue-500 text-white">1</button>
          <button className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300">
            Siguiente
          </button>
        </nav>
      </div>
    </div>
  )
}

export default VehiclesPage;
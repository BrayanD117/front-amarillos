'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

interface Usuario {
  id: number;
  usuario: string;
  idRol: number;
  idEstado: number;
  Persona: {
    primerNombre: string;
    segundoNombre?: string;
    primerApellido: string;
    segundoApellido?: string;
    numeroDocumento: string;
    TipoDocumento?: {
      nombre: string;
    };
    GrupoSanguineo?: {
      nombre: string;
    };
    CategoriaLicencias?: {
      nombre: string;
    };
  };
}

const VehiclesUpdatePage = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const controller = new AbortController();
    const delayDebounce = setTimeout(async () => {
      try {
        const limit = 10;
        let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/usuarios?page=${page}&limit=${limit}`;
        if (searchTerm) {
          const upperCaseSearchTerm = searchTerm.toUpperCase();
          url += `&search=${encodeURIComponent(upperCaseSearchTerm)}`;
        }
  
        const res = await fetch(url, { signal: controller.signal, credentials: 'include' });
        const data = await res.json();
  
        if (data.ok) {
          setUsuarios(data.usuarios);
          setTotalPages(data.totalPages || 1);
        }
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          console.error('Error al obtener usuarios:', error);
        }
      }
    }, 700);
  
    return () => {
      clearTimeout(delayDebounce);
      controller.abort();
    };
  }, [searchTerm, page]);
  


  const handleUpdate = (id: number) => {
    router.push(`/usuarios/actualizar/${id}`);
  };

  const handleDelete = async (id: number) => {
    const confirm = window.confirm('¿Estás seguro de eliminar este usuario? Esta acción no se puede deshacer.');
    if (!confirm) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/usuarios/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      const data = await res.json();
      if (data.ok) {
        toast.success('Usuario eliminado correctamente');
        setUsuarios(prev => prev.filter(u => u.id !== id));
      } else {
        toast.error(data.msg || 'Error al eliminar usuario');
      }
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      toast.error('Error del servidor al eliminar el usuario');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Lista de Usuarios</h1>
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-300 ease-in-out cursor-pointer"
          onClick={() => router.push('/usuarios/crear')}
        >
          Agregar Usuario
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Buscar por número de documento"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Nombre</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Documento</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Tipo Documento</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {usuarios.map((usuario, index) => (
                <tr key={index} className="hover:bg-gray-50 transition duration-150">
                  <td className="py-4 px-4 text-sm text-gray-700">
                    {usuario.Persona.primerNombre} {usuario.Persona.segundoNombre || ''} {usuario.Persona.primerApellido}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-700">{usuario.Persona.numeroDocumento}</td>
                  <td className="py-4 px-4 text-sm text-gray-700">{usuario.Persona.TipoDocumento?.nombre || '-'}</td>
                  <td className="py-4 px-4 text-sm space-x-2">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md" onClick={() => handleUpdate(usuario.id)}>
                      Editar
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md" onClick={() => handleDelete(usuario.id)}>
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
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="px-3 py-1 rounded-md bg-blue-500 text-white">{page}</span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
          >
            Siguiente
          </button>
        </nav>
      </div>

    </div>
  )
}

export default VehiclesUpdatePage;
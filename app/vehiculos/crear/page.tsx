"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';

interface Usuario {
  id: number;
}

interface Estado {
  id: number;
  nombre: string;
}

interface Servicio {
  id: number;
  nombre: string;
}

interface Combustible {
  id: number;
  nombre: string;
}

interface VehiculoFormData {
  cedula: string;
  idUsuario?: number;
  usuario?: Usuario;
  idEstado: number;
  estado?: Estado;
  interno: string;
  placa: string;
  marca: string;
  linea: string;
  modelo: number;
  cilindrada: number;
  color: string;
  idServicio: number;
  servicio?: Servicio;
  clase: string;
  carroceria: string;
  idCombustible: number;
  capacidad: number;
  motor: string;
  chasis: string;
  importacion: string;
  fechaImportacion: string;
  puertas: number;
  fechaMatricula: string;
  fechaExpedicion: string;
  organismo: string;
  qr: string;
}

interface Opciones {
  usuarios: Usuario[];
  estados: Estado[];
  servicios: Servicio[];
  combustibles: Combustible[];
}

const VehiclesForm: React.FC = () => {
  const router = useRouter();
  const today = new Date().toISOString().split('T')[0];

  const [opciones, setOpciones] = useState<Opciones>({
    usuarios: [],
    estados: [],
    servicios: [],
    combustibles: []
  });
  
  const [formData, setFormData] = useState<VehiculoFormData>({
    cedula: '',
    idUsuario: undefined,
    interno: '',
    placa: '',
    marca: '',
    linea: '',
    modelo: 2024,
    idEstado: 0,
    estado: undefined,
    cilindrada: 0,
    color: '',
    idServicio: 0,
    servicio: undefined,
    clase: '',
    carroceria: '',
    capacidad: 0,
    motor: '',
    chasis: '',
    importacion: '',
    fechaImportacion: today,
    puertas: 0,
    fechaMatricula: today,
    fechaExpedicion: today,
    organismo: '',
    qr: '',
    idCombustible: 0,
  });

  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOpciones = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/vehiculos/opciones`);
        if (response.ok) {
          const data = await response.json();
          setOpciones(data.data);
        } else {
          console.error('Error al obtener opciones');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchOpciones();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.idEstado === 0 || formData.idServicio === 0 || formData.idCombustible === 0) {
      toast.error('Por favor, seleccione una opción válida para Estado, Servicio y Combustible.');
      return;
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/vehiculos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success('Vehículo creado exitosamente.');
        setFormData({
          cedula: '',
          idUsuario: undefined,
          interno: '',
          placa: '',
          marca: '',
          linea: '',
          modelo: 2024,
          idEstado: 0,
          estado: undefined,
          cilindrada: 0,
          color: '',
          idServicio: 0,
          servicio: undefined,
          clase: '',
          carroceria: '',
          idCombustible: 0,
          capacidad: 0,
          motor: '',
          chasis: '',
          importacion: '',
          fechaImportacion: '',
          puertas: 0,
          fechaMatricula: '',
          fechaExpedicion: '',
          organismo: '',
          qr: '',
        });
        setTimeout(() => {
          router.push('/vehiculos');
        }, 2000);
        
      } else {
        const data = await response.json();
        toast.error(data.message || 'Error al crear vehículo');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al procesar la solicitud');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setError('');
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[800px] border border-yellow-100">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold text-center text-gray-500 mb-6">Registro de Vehículo</h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Cédula del Usuario:</label>
              <input
                type="text"
                name="cedula"
                value={formData.cedula}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 text-gray-500 px-3 py-2"
                required
                placeholder="Ingrese la cédula del usuario"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Estado:</label>
              <select
                name="idEstado"
                value={formData.idEstado}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 text-gray-500 px-3 py-2"
                required
              >
                <option value={0} disabled>Seleccione un estado</option>
                {opciones?.estados?.map(estado => (
                  <option key={estado.id} value={estado.id}>{estado.nombre}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Interno:</label>
              <input
                type="text"
                name="interno"
                value={formData.interno}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 text-gray-500 px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Placa:</label>
              <input
                type="text"
                name="placa"
                value={formData.placa}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 text-gray-500 px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Marca:</label>
              <input
                type="text"
                name="marca"
                value={formData.marca}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 text-gray-500 px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Línea:</label>
              <input
                type="text"
                name="linea"
                value={formData.linea}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 text-gray-500 px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Modelo:</label>
              <input
                type="number"
                name="modelo"
                value={formData.modelo}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 text-gray-500 px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Cilindrada:</label>
              <input
                type="number"
                name="cilindrada"
                value={formData.cilindrada}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 text-gray-500 px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Color:</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 text-gray-500 px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Servicio:</label>
              <select
                name="idServicio"
                value={formData.idServicio}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 text-gray-500 px-3 py-2"
                required
              >
                <option value={0} disabled>Seleccione un servicio</option>
                {opciones?.servicios?.map(servicio => (
                  <option key={servicio.id} value={servicio.id}>{servicio.nombre}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Clase:</label>
              <input
                type="text"
                name="clase"
                value={formData.clase}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 text-gray-500 px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Carrocería:</label>
              <input
                type="text"
                name="carroceria"
                value={formData.carroceria}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 text-gray-500 px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Combustible:</label>
              <select
                name="idCombustible"
                value={formData.idCombustible}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 text-gray-500 px-3 py-2"
                required
              >
                <option value={0} disabled>Seleccione un combustible</option>
                {opciones?.combustibles?.map(combustible => (
                  <option key={combustible.id} value={combustible.id}>{combustible.nombre}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Capacidad:</label>
              <input
                type="number"
                name="capacidad" 
                value={formData.capacidad}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 text-gray-500 px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Puertas:</label>
              <input
                type="number"
                name="puertas"
                value={formData.puertas}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 text-gray-500 px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Motor:</label>
              <input
                type="text"
                name="motor"
                value={formData.motor}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 text-gray-500 px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Chasis:</label>
              <input
                type="text"
                name="chasis"
                value={formData.chasis}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 text-gray-500 px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Importación:</label>
              <input
                type="text"
                name="importacion"
                value={formData.importacion}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 text-gray-500 px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Fecha Importación:</label>
              <input
                type="date"
                name="fechaImportacion"
                value={formData.fechaImportacion}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 text-gray-500 px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Fecha Matrícula:</label>
              <input
                type="date"
                name="fechaMatricula"
                value={formData.fechaMatricula}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 text-gray-500 px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Fecha Expedición:</label>
              <input
                type="date"
                name="fechaExpedicion"
                value={formData.fechaExpedicion}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 text-gray-500 px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Organismo:</label>
              <input
                type="text"
                name="organismo"
                value={formData.organismo}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 text-gray-500 px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">QR:</label>
              <input
                type="text"
                name="qr"
                value={formData.qr}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 text-gray-500 px-3 py-2"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 cursor-pointer mt-6"
          >
            Registrar Vehículo
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default VehiclesForm;
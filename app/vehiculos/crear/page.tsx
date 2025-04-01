"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Usuario {
  id: number;
}

interface Tarjeta {
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
  idUsuario: number;
  usuario?: Usuario;
  idTarjeta: number;
  tarjeta?: Tarjeta;
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
  importacion: string;
  fechaImportacion: Date;
  puertas: number;
  fechaMatricula: Date;
  fechaExpedicion: Date;
  organismo: string;
  qr: string;
  chasis: string;
  motor: string;
  cilindraje: number;
  idCombustible: number;
  capacidadPasajeros: number;
  capacidadCarga: number;
  pesoSeco: number;
  pesoBruto: number;
}

interface Opciones {
  usuarios: Usuario[];
  tarjetas: Tarjeta[];
  estados: Estado[];
  servicios: Servicio[];
  combustibles: Combustible[];
}

const VehiclesForm: React.FC = () => {
  const router = useRouter();
  const [opciones, setOpciones] = useState<Opciones>({
    usuarios: [],
    tarjetas: [],
    estados: [],
    servicios: [],
    combustibles: []
  });
  
  const [formData, setFormData] = useState<VehiculoFormData>({
    idUsuario: 0,
    idTarjeta: 0,
    idEstado: 0,
    interno: '',
    placa: '',
    marca: '',
    linea: '',
    modelo: 2024,
    cilindrada: 0,
    color: '',
    idServicio: 0,
    importacion: '',
    fechaImportacion: new Date(),
    puertas: 0,
    fechaMatricula: new Date(),
    fechaExpedicion: new Date(),
    organismo: '',
    qr: '',
    chasis: '',
    motor: '',
    cilindraje: 0,
    idCombustible: 0,
    capacidadPasajeros: 0,
    capacidadCarga: 0,
    pesoSeco: 0,
    pesoBruto: 0
  });

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
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/vehiculos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        router.push('/vehiculos');
      } else {
        console.error('Error al crear vehículo');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Usuario:</label>
              <select
                name="idUsuario"
                value={formData.idUsuario}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 text-gray-500 px-3 py-2"
                required
              >
                <option value="">Seleccione un usuario</option>
                {opciones?.usuarios?.map(usuario => (
                  <option key={usuario.id} value={usuario.id}>Usuario {usuario.id}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Tarjeta:</label>
              <select
                name="idTarjeta"
                value={formData.idTarjeta}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 text-gray-500 px-3 py-2"
                required
              >
                <option value="">Seleccione una tarjeta</option>
                {opciones?.tarjetas?.map(tarjeta => (
                  <option key={tarjeta.id} value={tarjeta.id}>Tarjeta {tarjeta.id}</option>
                ))}
              </select>
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
                <option value="">Seleccione un estado</option>
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
                <option value="">Seleccione un servicio</option>
                {opciones?.servicios?.map(servicio => (
                  <option key={servicio.id} value={servicio.id}>{servicio.nombre}</option>
                ))}
              </select>
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
                <option value="">Seleccione un combustible</option>
                {opciones?.combustibles?.map(combustible => (
                  <option key={combustible.id} value={combustible.id}>{combustible.nombre}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Capacidad de Pasajeros:</label>
              <input
                type="number"
                name="capacidadPasajeros" 
                value={formData.capacidadPasajeros}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 text-gray-500 px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Capacidad de Carga:</label>
              <input
                type="number"
                name="capacidadCarga"
                value={formData.capacidadCarga}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 text-gray-500 px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Peso Seco:</label>
              <input
                type="number"
                name="pesoSeco"
                value={formData.pesoSeco}
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
                value={formData.fechaImportacion.toISOString().split('T')[0]}
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
              <label className="block text-sm font-medium text-gray-700">Fecha Matrícula:</label>
              <input
                type="date"
                name="fechaMatricula"
                value={formData.fechaMatricula.toISOString().split('T')[0]}
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
                value={formData.fechaExpedicion.toISOString().split('T')[0]}
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
    </div>
  );
};

export default VehiclesForm;
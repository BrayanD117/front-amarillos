"use client"

import React, { useState } from 'react';

interface VehiculoFormData {
  marca: string;
  modelo: string;
  año: number;
  placa: string;
  color: string;
}

const VehiclesForm: React.FC = () => {
  const [formData, setFormData] = useState<VehiculoFormData>({
    marca: '',
    modelo: '',
    año: 2024,
    placa: '',
    color: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos del vehículo:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 border border-yellow-100">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold text-center text-gray-500 mb-6">Registro de Vehículo</h2>
          
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
            <label className="block text-sm font-medium text-gray-700">Modelo:</label>
            <input
              type="text"
              name="modelo"
              value={formData.modelo}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 text-gray-500 px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Año:</label>
            <input
              type="number"
              name="año"
              value={formData.año}
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

          <button 
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 cursor-pointer"
          >
            Registrar Vehículo
          </button>
        </form>
      </div>
    </div>
  );
};

export default VehiclesForm;
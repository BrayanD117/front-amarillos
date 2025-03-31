import React from 'react'

const VehiclesPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Vehículos</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Marca</th>
              <th className="py-2 px-4 border-b">Modelo</th>
              <th className="py-2 px-4 border-b">Año</th>
              <th className="py-2 px-4 border-b">Placa</th>
              <th className="py-2 px-4 border-b">Color</th>
              <th className="py-2 px-4 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b">Toyota</td>
              <td className="py-2 px-4 border-b">Corolla</td>
              <td className="py-2 px-4 border-b">2020</td>
              <td className="py-2 px-4 border-b">ABC-123</td>
              <td className="py-2 px-4 border-b">Rojo</td>
              <td className="py-2 px-4 border-b">
                <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Editar</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default VehiclesPage;
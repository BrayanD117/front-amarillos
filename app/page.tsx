"use client";
import { useState } from 'react';
import { useRouter } from "next/navigation";

const HomePage = () => {

  const [usuario, setUsuario] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/autenticacion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usuario, contrasenia }),
        credentials: 'include'
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Error al iniciar sesión')
        return
      }

      router.replace('/admin/panel');

    } catch {
      setError('Error de conexión con el servidor')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 border border-yellow-100">
        <h1 className="text-2xl font-bold text-center text-gray-500 mb-6">Iniciar sesión</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-yellow-500">¡Bienvenido a Amarillos!</h2>
            <p className="text-sm text-gray-600 mt-2">
              Tu plataforma integral para conectar con servicios de transporte confiables. 
              Encuentra conductores verificados y viaja con seguridad a tu destino.
            </p>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center font-medium">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="usuario" className="block text-sm font-medium text-gray-700">
              Usuario
            </label>
            <input
              id="usuario"
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 text-gray-500 px-3 py-2"
              placeholder="Ingresa tu usuario"
            />
          </div>

          <div>
            <label htmlFor="contrasenia" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              id="contrasenia"
              type="password"
              value={contrasenia}
              onChange={(e) => setContrasenia(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 text-gray-500 px-3 py-2"
              placeholder="Ingresa tu contraseña"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 cursor-pointer"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  )
}

export default HomePage
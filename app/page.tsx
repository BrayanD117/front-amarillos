const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-yellow-200 to-orange-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 border border-yellow-100">
        <h1 className="text-2xl font-bold text-center text-gray-500 mb-6">Iniciar sesión</h1>
        <form className="space-y-4">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-yellow-500">¡Bienvenido a Amarillos!</h2>
            <p className="text-sm text-gray-600 mt-2">
              Tu plataforma integral para conectar con servicios de transporte confiables. 
              Encuentra conductores verificados y viaja con seguridad a tu destino.
            </p>
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Usuario
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 block w-full rounded-md border border-gray-300 text-gray-500 px-3 py-2"
              placeholder="Ingresa tu usuario"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
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
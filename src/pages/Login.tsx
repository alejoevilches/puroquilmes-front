export default function Login() {
  return (
    <section className="flex gap-10 flex-col justify-center items-center h-screen bg-gradient-to-t from-puroquilmes-400 via-puroquilmes-200 to-puroquilmes-50">
      <h2 className="text-4xl font-bold text-center mb-6 text-puroquilmes-800">Bienvenido!</h2>
      <form className="p-8 rounded-lg shadow-md w-96">          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              name="email" 
              id="email" 
              className="w-full px-3 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-puroquilmes-500 text-puroquilmes-800"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input 
              type="password" 
              name="password" 
              id="password" 
              className="w-full px-3 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-puroquilmes-500 text-puroquilmes-800"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-puroquilmes-600 text-white py-2 px-4 rounded-md hover:bg-puroquilmes-700 transition-colors duration-200 font-medium"
          >
            Iniciar Sesión
          </button>
      </form>
    </section>
  );
} 
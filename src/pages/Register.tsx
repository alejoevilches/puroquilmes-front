import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegister } from '../hooks/useRegister';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [dni, setDni] = useState('');
  const [telefono, setTelefono] = useState('');
  const navigate = useNavigate();
  const { register, loading, error, success } = useRegister();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register({ email, password, nombre, apellido, dni, telefono });
  };

  return (
    <section className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-t from-puroquilmes-400 via-puroquilmes-200 to-puroquilmes-50">
      <h2 className="text-3xl font-bold text-center mb-6 text-puroquilmes-800">Crear cuenta</h2>
      <form onSubmit={handleSubmit} className="p-8 rounded-lg shadow-md w-96 bg-white">
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            Cuenta creada exitosamente. <button type="button" className="underline ml-2" onClick={() => navigate('/login')}>Iniciar sesión</button>
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-3 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-puroquilmes-500 text-puroquilmes-800" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
          <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-3 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-puroquilmes-500 text-puroquilmes-800" />
        </div>
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input type="text" id="nombre" value={nombre} onChange={e => setNombre(e.target.value)} required className="w-full px-3 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-puroquilmes-500 text-puroquilmes-800" />
        </div>
        <div className="mb-4">
          <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
          <input type="text" id="apellido" value={apellido} onChange={e => setApellido(e.target.value)} required className="w-full px-3 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-puroquilmes-500 text-puroquilmes-800" />
        </div>
        <div className="mb-4">
          <label htmlFor="dni" className="block text-sm font-medium text-gray-700 mb-1">DNI</label>
          <input type="text" id="dni" value={dni} onChange={e => setDni(e.target.value)} required className="w-full px-3 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-puroquilmes-500 text-puroquilmes-800" />
        </div>
        <div className="mb-6">
          <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
          <input type="text" id="telefono" value={telefono} onChange={e => setTelefono(e.target.value)} required className="w-full px-3 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-puroquilmes-500 text-puroquilmes-800" />
        </div>
        <button type="submit" disabled={loading} className={`w-full py-2 px-4 rounded-md transition-colors duration-200 font-medium ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-puroquilmes-600 hover:bg-puroquilmes-700'} text-white`}>
          {loading ? 'Creando cuenta...' : 'Crear cuenta'}
        </button>
      </form>
      <button type="button" className="mt-4 underline text-puroquilmes-700" onClick={() => navigate('/login')}>¿Ya tienes cuenta? Inicia sesión</button>
    </section>
  );
}
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(email, password);
      
      if (success) {
        navigate('/');
      } else {
        setError('Credenciales inválidas. Por favor, verifica tu email y contraseña.');
      }
    } catch (err) {
      setError('Error de conexión. Por favor, intenta nuevamente.');
      console.error('Error durante el login:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex gap-10 flex-col justify-center items-center h-screen bg-gradient-to-t from-puroquilmes-400 via-puroquilmes-200 to-puroquilmes-50">
      <h2 className="text-4xl font-bold text-center mb-6 text-puroquilmes-800">Bienvenido!</h2>
      <form onSubmit={handleSubmit} className="p-8 rounded-lg shadow-md w-96">
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-puroquilmes-500 text-puroquilmes-800"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
          <input 
            type="password" 
            name="password" 
            id="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-puroquilmes-500 text-puroquilmes-800"
          />
        </div>
        <button 
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md transition-colors duration-200 font-medium ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-puroquilmes-600 hover:bg-puroquilmes-700'
          } text-white`}
        >
          {loading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
        </button>
      </form>
    </section>
  );
} 
import { useState } from 'react';

export interface RegisterData {
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
}

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const register = async (data: RegisterData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setSuccess(true);
      } else {
        const res = await response.json();
        setError(res.message || 'Error al crear la cuenta');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error, success };
}
